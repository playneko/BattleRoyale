import React from 'react';
import { useHistory } from "react-router-dom";
import MuiAlert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';

// 컴포넌트
// 모델
import LogoutModel from "../models/LogoutModel";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Logout = (props) => {
  let history = useHistory();
  const [users, setUsers] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  // 로그아웃 처리
  LogoutModel({setUsers, setError, setLoading});

  const handleOnRedirect = () => {
    props.params(false);
    history.push("/");
  };

  // 로그아웃 성공의 경우
  if (users != null && users.success === true) {
    handleOnRedirect();
  }

  return (
    <>
      <div className="login-form">
        { error != null ? <Alert severity="error">로그아웃 처리중 에러가 발생했습니다.</Alert> : "" }
        <div className={loading != null && loading === true ? "login-form_show" : "login-form_hidden"}>
          <CircularProgress disableShrink />
        </div>
      </div>
    </>
  );
}

export default Logout;