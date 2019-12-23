// mysql模块是node操作mysql的引擎，可以在node.js环境下对mysql数据库进行建表，增删改查等操作
const mysql = require('mysql')

const connection = mysql.createConnection({
    host: 'localhost', // 数据库地址
    user: 'root', // 数据库用户root
    password: 'root', // 数据库密码
    database: 'my_test' // 操作的数据库名
})

// 建议的连接方式：
connection.connect(function(err) {
    if(err) {
        console.error('error connection: ' + err.stack)
        return
    }

    console.log('connected as id ' + connection.threadId)
})

// 查询
const sql = 'SELECT * FROM users'
connection.query(sql, (error, results, fields) => {
    if(error) throw error
    console.log('The result is: ', results)
})

connection.end()