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
    sql += " SELECT map.*, chr.*, ";
    sql += "   map_north.map_name as north_map_name, ";
    sql += "   map_north.prohibition_area as north_prohibition_area, ";
    sql += "   map_south.map_name as south_map_name, ";
    sql += "   map_south.prohibition_area as south_prohibition_area, ";
    sql += "   map_east.map_name as east_map_name, ";
    sql += "   map_east.prohibition_area as east_prohibition_area, ";
    sql += "   map_west.map_name as west_map_name, ";
    sql += "   map_west.prohibition_area as west_prohibition_area ";
    sql += " FROM game_map map ";
    sql += " INNER JOIN game_character chr ";
    sql += " ON map.map_code = chr.map_code ";
    sql += " LEFT JOIN game_map map_north ";
    sql += " ON map.move_north = map_north.map_code ";
    sql += " LEFT JOIN game_map map_south ";
    sql += " ON map.move_south = map_south.map_code ";
    sql += " LEFT JOIN game_map map_east ";
    sql += " ON map.move_east = map_east.map_code ";
    sql += " LEFT JOIN game_map map_west ";
    sql += " ON map.move_west = map_west.map_code ";
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
    sql += " SET map_code = ?, timeout = CURRENT_TIMESTAMP ";
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