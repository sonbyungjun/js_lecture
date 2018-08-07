const mysql = require('mysql');

var connection = mysql.createConnection({
    host : "saint2030.synology.me",
    port : 3306,
    user : "root",
    password : "qudwnsl1",
    database : "saint2030",
})

module.exports = connection;
// 디비 연결 정보


