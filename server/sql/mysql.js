// mysql 모듈 불러오기
const mysql = require('mysql');

// mysql 커넥션 생성
const dbCon = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "userid",
    password: "password",
    database: "akibatv_cocoa"
});

// mysql 접속
dbCon.connect();

module.exports = dbCon;
