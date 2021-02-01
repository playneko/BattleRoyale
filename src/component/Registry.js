import React from 'react';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import MuiAlert from '@material-ui/lab/Alert';
import TextField from '@material-ui/core/TextField';
import CircularProgress from '@material-ui/core/CircularProgress';

// 컴포넌트
// 모델
import RegistryModel from "../models/RegistryModel";

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
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Registry = (props) => {
  let history = useHistory();
  const classes = useStyles();
  const [account, setAccount] = React.useState({});
  const [users, setUsers] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  // 로그인 처리
  RegistryModel({account, setUsers, setError, setLoading});

  const handleOnSubmit = (e) => {
    e.preventDefault();

    setAccount({
      userRegistry: true,
      user_id: e.target.user_id.value,
      user_pw: e.target.user_pw.value,
      user_name: e.target.user_name.value
    });
  };

  const handleOnRedirect = () => {
    history.push("/");
  };

  // 회원가입 성공의 경우
  if (users != null && users.success === true) {
    handleOnRedirect();
  }

  return (
    <>
      <div className="registry-form">
        <form onSubmit={handleOnSubmit} className="registry-form_group">
          {error ? <Alert severity="error">会員情報登録中エラーが発生しました。</Alert> : ""}
          <TextField
            label="ID"
            id="margin-normal"
            name="user_id"
            className={classes.textField}
            helperText="IDを入力して下さい。"
          /><br/>
          <TextField
            label="パスワード"
            id="margin-normal"
            type="password"
            name="user_pw"
            className={classes.textField}
            helperText="パスワードを入力して下さい。"
          /><br/>
          <TextField
            label="お名前"
            id="margin-normal"
            name="user_name"
            className={classes.textField}
            helperText="お名前を入力して下さい。"
          />
          <div className={loading === null || loading === false ? "registry-form_show" : "registry-form_hidden"}>
            <Button variant="contained" color="secondary" type="submit">
              登録する
            </Button>
          </div>
          <div className={loading != null && loading === true ? "registry-form_show" : "registry-form_hidden"}>
            <CircularProgress disableShrink color="secondary" />
          </div>
        </form>
      </div>
    </>
  );
}

export default Registry;