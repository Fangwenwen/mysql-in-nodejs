import mysql from 'mysql'
import CONFIG from '../config.json'

const mysql_config = {
    host: CONFIG.MYSQL_CONFIG.HOST,
    user: CONFIG.MYSQL_CONFIG.USER,
    password: CONFIG.MYSQL_CONFIG.password,
    database: CONFIG.MYSQL_CONFIG.DATABASE,
    connectionLimit: CONFIG.MYSQL_CONFIG.CONNECTION_LIMIT
}

class MySQLResult {
    constructor(data, errMsg) {
        if(typeof data === 'string') {
            this.errMsg = data
            data = null
            errMsg = null
        }

        if(data) {
            this.data = data
        }

        if(errMsg) {
            this.errMsg = errMsg
        }
    }
}

export default class MySQL {
    static mysqlPool

    static init() {
        MySQL.mysqlPool = mysql.createPool(mysql_config)
        console.log('数据库连接池初始化')
    }

    static getConnection() {
        return new Promise((resolve, reject) => {
            MySQL.mysqlPool.getConnection((err, connection) => {
                if(err) {
                    console.log('MYSQL获取连接失败', err)
                    resolve(null)
                    return
                }

                resolve(connection)
            })
        })
    }

    static execSQL(sql, args) {
        return new Promise(async (resolve, reject) => {
            const connection = await MySQL.getConnection()
            if(connection == null) {
                console.log('没有可用的MYSQL连接')
                resolve(new MySQLResult('没有可用的MYSQL连接'))
                return
            }

            connection.query(sql, args, (error, results) => {
                connection.release()
                if(error) {
                    console.log('MYSQL执行失败：', error)
                    resolve(new MySQLResult('MYSQL执行失败'))
                    return
                }

                resolve(new MySQLResult(results))
            })
        })
    }

    // 插入一条数据
    static async insertItem(table, data) {
        let sql = 'INSERT INTO ?? SET ?',
            args = [table, data]
        let mysqlRes = await MySQL.execSQL(sql, args)
        mysqlRes.data = mysqlRes.data == null ? null : mysqlRes.data.insertId
        return mysqlRes
    }

    // 更新一条数据
    static async updateItemById(table, data, id) {
        let sql = 'UPDATE ?? SET ? WHERE id = ?',
            args = [table, data, id]
        let mysqlRes = await MySQL.execSQL(sql, args)
        return mysqlRes
    }

    // 根据Id获取一条数据
    static async getItemById(table, id) {
        let sql = 'SELECT * FROM ?? WHERE id = ?',
            args = [table, id]
        let mysqlRes = await MySQL.execSQL(sql, args)
        mysqlRes.data = mysqlRes.data == null ? null : mysqlRes.data[0]
        return mysqlRes
    }
    
}