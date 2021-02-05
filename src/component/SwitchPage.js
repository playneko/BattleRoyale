import React from 'react';
import { useHistory, useParams } from "react-router-dom";
import MuiAlert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';

// 컴포넌트
// 모델
import CharacterModel from "../models/CharacterModel";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

// 필드값을 체크해서 페이지 전이
const SwitchPage = (props) => {
  // URL 아이디값
  let { id } = useParams();
  let history = useHistory();

  // 캐릭터 데이터
  const [charData, setCharData] = React.useState(null);
  // 에러
  const [error, setError] = React.useState(null);
  // 로딩
  const [loading, setLoading] = React.useState(false);
  // 계정 정보
  const account = props.params.account;
  // 로그인 체크
  const isLogin = props.params.isLogin;
  const setIsLogin = props.params.setIsLogin;

  // 캐릭터와 필드정보 취득
  CharacterModel({id, account, setCharData, setError, setLoading});

  // 전학 수속
  if (charData != null && charData.success === false) {
    history.push("/transfer/register/" + id);
  } else if (charData != null && charData.success === true) {
    const data = charData.data[0];

    // 로그인 정보 갱신
    setIsLogin(isLogin + 1);

    if (data.char_field === 1) {
      history.push("/transfer/update/" + id);
    } else if (data.char_field === 2) {
      history.push("/transfer/success/" + id);
    } else if (data.char_field === 3) {
      history.push("/field/map/");
    }
  }

  return (
    <div className="home-list">
      { error != null ? <Alert severity="error">{error.msg}</Alert> : "" }
      { loading != null && loading === true ? <CircularProgress disableShrink className="progress" /> : "" }
    </div>
  );
}

export default SwitchPage;