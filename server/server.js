const express = require('express');
var session = require('express-session');
var FileStore = require('session-file-store')(session)
const bodyParser = require('body-parser');
const userRouter = require('./routes/user');
const homeRouter = require('./routes/home');
const fieldRouter = require('./routes/field');
const transferRouter = require('./routes/transfer');
const port = process.env.PORT || 3001;

const app = express();

// 세션정보 생성
app.use(session({
    secret: 'abcdefgh!@#!@#ijklmnopq',
    resave: false,
    saveUninitialized: true,
    store: new FileStore()
}));

// JSON처리
app.use(bodyParser.json());

// 라우터
app.use('/user', userRouter);
app.use('/home', homeRouter);
app.use('/field', fieldRouter);
app.use('/transfer', transferRouter);

// 서버 활성화
app.listen(port, ()=>{
	console.log(`Playneko Express Server v0.1`);
	console.log(`                ┌──────────┐`);
	console.log(`               ┌┤          ├┐`);
	console.log(`               ││ Playneko ││`);
	console.log(`               ││  Express ││`);
	console.log(`               └┤          ├┘`);
	console.log(`                ├──────────┤`);
	console.log(`                │□  □  □  □│`);
	console.log(`        ╔╦╦  ───┤          ├───────┻┳|―-∩`);
	console.log(`        ╠╬╬╬╣ □ │          │ □ □ □ ┳┻|　　ヽ`);
	console.log(`        ╠╬╬╬╣   │□  □  □  □│       ┻┳|　●  |`);
	console.log(`        ╠╬╬╬╣ □ │          │ □ □ □ ┳┻|▼) _ノ`);
	console.log(`        ╠╬╬╬╣   │ ┌──┬──┐  │       ┻┳|￣　)`);
	console.log(`        ╠╬╬╬╣ □ │ │//‖//│  │ □ □ □ ┳ﾐ(￣ ／`);
	console.log(`        ╚╩╩╩╝───┴─┴──┴──┴──┴───────┻┳T￣|`);
	console.log(`          (C) Copyright 2021~ Playneko.`);
	console.log(`------------------------------------------------`);
    console.log(`Playneko Market React Express is running on ${port}`);
});
