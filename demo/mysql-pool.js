const mysql = require('mysql')

// 数据连接池
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'my_test',
    connectionLimit: 10
})

const sql = 'SELECT * FROM users'
pool.getConnection(function(err, connection) {
    if(err) throw err

    connection.query(sql, (error, results) => {
        console.log('The result is: ', results)

        connection.release()

        if(error) throw error
    })
})