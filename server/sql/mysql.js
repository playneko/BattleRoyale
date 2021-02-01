// mysql 모듈 불러오기
const mysql = require('mysql');

// mysql 커넥션 생성
const dbCon = mysql.createConnection({
    host: "10.0.1.27",
    port: 3306,
    user: "playneko",
    password: "tjqtjqgo4781",
    database: "akibatv_cocoa"
});

// mysql 접속
dbCon.connect();

module.exports = dbCon;