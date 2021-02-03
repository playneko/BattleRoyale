import React from 'react';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import MuiAlert from '@material-ui/lab/Alert';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';

// 컴포넌트
// 모델
import LoginModel from "../models/LoginModel";

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  margin: {
    margin: theme.spacing(1),
  },
  withoutLabel: {
    marginTop: theme.spacing(3),
  },
  textField: {
    width: '25ch',
    color: '#fff',
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Login = (props) => {
  let history = useHistory();
  const classes = useStyles();
  const [account, setAccount] = React.useState({});
  const [users, setUsers] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  // 로그인 처리
  LoginModel({account, setUsers, setError, setLoading});

  const handleOnSubmit = (e) => {
    e.preventDefault();

    setAccount({
      userLogin: true,
      userId: e.target.userId.value,
      userPw: e.target.userPw.value
    });
  };

  // 회원가입 페이지로 이동
  const handleOnRegistry = () => {
    history.push("/user/registry");
  };

  const handleOnRedirect = () => {
    props.params(true);
    history.push("/home");
  };

  // 로그인 성공의 경우
  if (users != null && users.success === true) {
    handleOnRedirect();
  }

  return (
    <div className="login">
      <p>신세기의 시작. 한 나라가 무너졌다.</p>
      <p>완전실업률 15% 돌파. 실업자 1천만명. 등교거부 학생 80만명.</p>
      <p>급증하는 소년 범죄!</p>
      <p>자신을 잃은 어른들은 아이들을 두려워해, 결국, 하나의 법안을 가결했다.</p>
      <p className="login-color_red">『신세기 교육 개혁법 【통칭 BR 법】』</p>
      <p>전국의 중학교 3학년 중 무작위로 한반을 선별.</p>
      <p><span className="login-color_red">『최후의 한명』</span>이 남을 때까지 싸운다.</p>
      <p>끝까지 살아남는 학생만이 집으로 돌아갈수 있다는<span className="login-color_red">『살인게임』</span>이었다...</p>
      <p className="login-color_red">
        <span className="login-logo_style">Battle Royale</span>
      </p>
      <div className="login-form">
        <form onSubmit={handleOnSubmit} className="login-form_group">
          { error || (users != null && users.errors) ? <Alert severity="error">IDまたは、パスワードを確認して下さい。</Alert> : "" }
          <TextField
            label="ID"
            id="margin-normal"
            name="userId"
            className={classes.textField}
            helperText="IDを入力して下さい。"
          />
          <TextField
            label="パスワード"
            id="margin-normal"
            type="password"
            name="userPw"
            className={classes.textField}
            helperText="パスワードを入力して下さい。"
          />
          <div className={loading === null || loading === false ? "login-form_show" : "login-form_hidden"}>
            <Button variant="contained" color="secondary" type="submit">
              ログイン
            </Button>{' '}
            <Button variant="contained" color="warning" type="button" onClick={handleOnRegistry}>
              会員登録
            </Button>
          </div>
          <div className={loading != null && loading === true ? "login-form_show" : "login-form_hidden"}>
            <CircularProgress disableShrink />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;