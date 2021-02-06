const express = require('express');
const connection = require('../sql/mysql');
const { body, validationResult } = require('express-validator');
const router = express.Router();

// 게임 캐릭터 취득
router.post('/character', (req, res) => {
    const body = req.body;

    let sql = "";
    sql += " SELECT no, game_no, user_id, char_name, char_sex, char_icon, char_dept, char_field, ";
    sql += " char_life_min, char_life_max, char_sta_min, char_sta_max, char_attack, char_defense ";
    sql += " FROM game_character ";
    sql += " WHERE game_no = ? AND user_id = ? ";
    sql += " LIMIT 0, 1 ";
    let params = [body.gameNo, body.userId];

    connection.query(sql, params, (error, rows, fields) => {
        if (error) {
            const errors = [{msg: "에러가 발생했습니다."}];
            return res.status(500).json({ errors: errors });
        } else {
            if (rows[0] && rows[0].no > 0) {
                req.session.character = rows[0];
            }
            res.json({
                success: rows[0] && rows[0].no > 0 ? true : false,
                data: rows
            })
        }
    });
});

// 게임 필드 취득
router.post('/mapdata', (req, res) => {
    const body = req.body;

    let sql = "";
    sql += " SELECT *, ";
    sql += " ( ";
    sql += "     SELECT map_name ";
    sql += "     FROM game_map ";
    sql += "     WHERE map_code = map.move_north ";
    sql += "     LIMIT 0, 1 ";
    sql += " ) AS map_north, ";
    sql += " ( ";
    sql += "     SELECT map_name ";
    sql += "     FROM game_map ";
    sql += "     WHERE map_code = map.move_south ";
    sql += "     LIMIT 0, 1 ";
    sql += " ) AS map_south, ";
    sql += " ( ";
    sql += "     SELECT map_name ";
    sql += "     FROM game_map ";
    sql += "     WHERE map_code = map.move_east ";
    sql += "     LIMIT 0, 1 ";
    sql += " ) AS map_east, ";
    sql += " ( ";
    sql += "     SELECT map_name ";
    sql += "     FROM game_map ";
    sql += "     WHERE map_code = map.move_west ";
    sql += "     LIMIT 0, 1 ";
    sql += " ) AS map_west ";
    sql += " FROM game_map map ";
    sql += " INNER JOIN game_character chr ";
    sql += " ON map.map_code = chr.map_code ";
    sql += " WHERE chr.game_no = ? ";
    sql += " AND chr.user_id = ? ";
    sql += " LIMIT 0, 1 ";
    let params = [body.gameNo, body.userId];

    connection.query(sql, params, (error, rows, fields) => {
        if (error) {
            const errors = [{msg: "에러가 발생했습니다."}];
            return res.status(500).json({ errors: errors });
        } else {
            res.json({
                data: rows
            })
        }
    });
});

// 맵 이동 처리
router.post('/mapmove', [
    body('gameNo').not().isEmpty().trim().escape().withMessage('데이터에 오류가 있습니다.'),
    body('userId').not().isEmpty().trim().escape().withMessage('데이터에 오류가 있습니다.'),
    body('mapCode').not().isEmpty().trim().escape().withMessage('데이터에 오류가 있습니다.')
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const body = req.body;
    let sql = "";
    sql += " UPDATE game_character ";
    sql += " SET map_code = ? ";
    sql += " WHERE game_no = ? AND user_id = ? ";
    let params = [body.mapCode, body.gameNo, body.userId];

    connection.query(sql, params, (error, rows, fields) => {
        if (error) {
            const errors = [{msg: "처리중 에러가 발생했습니다."}];
            return res.status(500).json({ errors: errors });
        } else {
            req.session.character.char_field = body.mapCode;
            res.json({
                success: true
            })
        }
    });
});

connection.end;

module.exports = router;