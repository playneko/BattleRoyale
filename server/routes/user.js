const express = require('express');
const connection = require('../sql/mysql');
const { body, validationResult } = require('express-validator');
const router = express.Router();

// 로그인 유무체크
router.get('/isLogin', (req, res) => {
    let isLogin = false;
    let userNo = 0;
    let userId = "";
    let userName = "";
    let userImage = "";
    let userDate = "";
    let character = null;
    if (req.session.isLogin === undefined) {
        isLogin = false;
    } else {
        isLogin = true;
        userNo = req.session.no;
        userId = req.session.user_id;
        userName = req.session.user_name;
        userImage = req.session.user_image;
        userDate = req.session.user_joindate;
        character = req.session.character;
    }
    res.json({
        auth: isLogin,
        userNo: userNo,
        userId: userId,
        userName: userName,
        userImage: userImage,
        userDate: userDate,
        character: character
    })
});

// 로그인 처리
router.post('/login', [
    body('userId').not().isEmpty().trim().escape().withMessage('아이디를 입력해 주세요.'),
    body('userPw').not().isEmpty().trim().escape().withMessage('비밀번호를 입력해 주세요.')
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const body = req.body;
    let sql = "";
    sql += " SELECT no, user_id, user_name, user_image, user_joindate ";
    sql += " FROM game_member ";
    sql += " WHERE user_id = ? ";
    sql += " AND user_pass = ? ";
    sql += " LIMIT 0, 1 ";
    let params = [body.userId, body.userPw];

    connection.query(sql, params, (error, rows, fields) => {
        if (error) {
            const errors = [{msg: "에러가 발생했습니다."}];
            return res.status(500).json({ errors: errors });
        } else {
            const result = rows[0];
            if (!rows[0] || result.no < 1) {
                return res.status(400).json({ errors: [{msg: "아이디 또는 비밀번호가 일치하지 않습니다."}] });
            } else {
                req.session.isLogin = true;
                req.session.no = result.no;
                req.session.user_id = result.user_id;
                req.session.user_name = result.user_name;
                req.session.user_image = result.user_image;
                req.session.user_joindate = result.user_joindate;
                res.json({
                    success: true
                })
            }
        }
    });
});

// 로그아웃 처리
router.post('/logout', (req, res) => {
    req.session.destroy();
    res.json({
        success: true
    })
});

// 회원가입 처리
router.post('/registry', [
    body('userId').not().isEmpty().trim().escape().withMessage('아이디를 입력해 주세요.'),
    body('userPw').not().isEmpty().trim().escape().withMessage('비밀번호를 입력해 주세요.'),
    body('userName').not().isEmpty().trim().escape().withMessage('이름을 입력해 주세요.')
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const body = req.body;
    let sql = "";
    sql += " INSERT INTO game_member ";
    sql += " (no, user_id, user_pass, user_name, user_image, user_joindate) ";
    sql += " VALUES(0, ?, ?, ?, ?, now()) ";
    let params = [
        body.userId,
        body.userPw,
        body.userName,
        '/character/000.png'
    ];

    connection.query(sql, params, (error, rows, fields) => {
        if (error) {
            // console.log(error);
            const errors = [{msg: "등록중 에러가 발생했습니다."}];
            return res.status(500).json({ errors: errors });
        } else {
            // console.log(rows.insertId);
            res.json({
                success: true,
                insertId: rows.insertId
            })
        }
    });
});

connection.end;

module.exports = router;