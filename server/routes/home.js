const express = require('express');
const connection = require('../sql/mysql');
const router = express.Router();

// 리스트 취득
router.post('/lists', (req, res) => {
    let sql = "";
    sql += " SELECT no, start_date, end_date, status ";
    sql += " FROM game_list ";
    sql += " ORDER BY no DESC ";
    sql += " LIMIT 0, 10 ";
    let params = [];

    connection.query(sql, params, (error, rows, fields) => {
        if (error) {
            const errors = [{msg: "에러가 발생했습니다."}];
            return res.status(500).json({ errors: errors });
        } else {
            res.json({
                list: rows
            })
        }
    });
});

connection.end;

module.exports = router;