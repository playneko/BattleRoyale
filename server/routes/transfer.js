const express = require('express');
const connection = require('../sql/mysql');
const { body, validationResult } = require('express-validator');
const router = express.Router();

// 전학 수속 처리
router.post('/transfer', [
    body('gameNo').not().isEmpty().trim().escape().withMessage('데이터에 오류가 있습니다.'),
    body('userId').not().isEmpty().trim().escape().withMessage('데이터에 오류가 있습니다.'),
    body('charIcon').not().isEmpty().trim().escape().withMessage('캐릭터를 선택해 주세요.'),
    body('charName').not().isEmpty().trim().escape().withMessage('캐릭터명을 입력해 주세요.'),
    body('charSex').not().isEmpty().trim().escape().withMessage('성별을 선택해 주세요.')
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const body = req.body;
    let sql = "";
    sql += " INSERT INTO game_character ";
    sql += " (no, game_no, user_id, char_name, char_sex, char_icon, char_field, char_life_min, char_life_max, char_sta_min, char_sta_max, char_attack, char_defense, map_code, reg_date) ";
    sql += " VALUES(0, ?, ?, ?, ?, ?, 1, 200, 200, 400, 400, 5, 10, 'E-10', now()) ";
    let params = [
        body.gameNo,
        body.userId,
        body.charName,
        body.charSex,
        body.charIcon
    ];

    connection.query(sql, params, (error, rows, fields) => {
        if (error) {
            const errors = [{msg: "등록중 에러가 발생했습니다."}];
            return res.status(500).json({ errors: errors });
        } else {
            res.json({
                success: true,
                insertId: rows.insertId
            })
        }
    });
});

// 수학여행 출발 처리
// 교실에서 나가기 처리
router.post('/transferUpdate', [
    body('no').not().isEmpty().trim().escape().withMessage('데이터에 오류가 있습니다.'),
    body('gameNo').not().isEmpty().trim().escape().withMessage('데이터에 오류가 있습니다.'),
    body('userId').not().isEmpty().trim().escape().withMessage('데이터에 오류가 있습니다.'),
    body('fieldNo').not().isEmpty().trim().escape().withMessage('데이터에 오류가 있습니다.')
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const body = req.body;
    let sql = "";
    sql += " UPDATE game_character ";
    sql += " SET char_field = ? ";
    sql += " WHERE no = ? AND game_no = ? AND user_id = ? ";
    let params = [body.fieldNo, body.no, body.gameNo, body.userId];

    connection.query(sql, params, (error, rows, fields) => {
        if (error) {
            const errors = [{msg: "처리중 에러가 발생했습니다."}];
            return res.status(500).json({ errors: errors });
        } else {
            req.session.character.char_field = body.fieldNo;
            res.json({
                success: true
            })
        }
    });
});

connection.end;

module.exports = router;