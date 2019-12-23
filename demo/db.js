// 封装使用mysql
const mysql = require('mysql')

const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'my_test',
    connectionLimit: 10
})

const query = (sql, args) => {
    return new Promise((resolve, reject) => {
        pool.getConnection((err, connection) => {
            if(err) {
                reject(err)
                return
            }

            connection.query(sql, args, (error, results) => {
                connection.release()

                if(error) {
                    reject(error)
                    return
                }

                resolve(results)

            })
        })
    })
}

// 查询
const sql = 'SELECT * FROM users'
async function getData(sql) {
    const results = await query(sql)
    console.log('The result is ', results)
    return results
}

getData(sql)