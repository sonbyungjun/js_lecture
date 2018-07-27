const mysql = require('mysql');

var connection = mysql.createConnection({
    host : "localhost",
    port : 3306,
    user : "root",
    password : "111111",
    database : "study-db",
})

module.exports = connection;
// 디비 연결 정보


