import React from 'react';
import { useHistory, useParams } from "react-router-dom";
import Button from '@material-ui/core/Button';
import MuiAlert from '@material-ui/lab/Alert';
import CircularProgress from '@material-ui/core/CircularProgress';

// 컴포넌트
// 모델
import FieldModel from "../models/FieldModel";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const SwithMap = (props) => {
  const swithData = props.children.data[0];
  console.log(swithData);

  // 수학여행 출발 대기
  if (swithData.char_field === 1) {
    return TransferSuccess(swithData);
  } else {
    return (
      <></>
    );
  }
}

const TransferSuccess = (props) => {
  const charList = [
    {name: "남자1번", icon: "0.jpg"},{name: "남자2번", icon: "1.jpg"},{name: "남자3번", icon: "2.jpg"},
    {name: "남자4번", icon: "3.jpg"},{name: "남자5번", icon: "4.jpg"},{name: "남자6번", icon: "5.jpg"},
    {name: "남자7번", icon: "6.jpg"},{name: "남자8번", icon: "7.jpg"},{name: "남자9번", icon: "8.jpg"},
    {name: "남자10번", icon: "9.jpg"},{name: "남자11번", icon: "10.jpg"},{name: "남자12번", icon: "11.jpg"},
    {name: "남자13번", icon: "12.jpg"},{name: "남자14번", icon: "13.jpg"},{name: "남자15번", icon: "14.jpg"},
    {name: "남자16번", icon: "15.jpg"},{name: "남자17번", icon: "16.jpg"},{name: "남자18번", icon: "17.jpg"},
    {name: "남자19번", icon: "18.jpg"},{name: "남자20번", icon: "19.jpg"},{name: "남자21번", icon: "20.jpg"},
    {name: "여자1번", icon: "21.jpg"},{name: "여자2번", icon: "22.jpg"},{name: "여자3번", icon: "23.jpg"},
    {name: "여자4번", icon: "24.jpg"},{name: "여자5번", icon: "25.jpg"},{name: "여자6번", icon: "26.jpg"},
    {name: "여자7번", icon: "27.jpg"},{name: "여자8번", icon: "28.jpg"},{name: "여자9번", icon: "29.jpg"},
    {name: "여자10번", icon: "30.jpg"},{name: "여자11번", icon: "31.jpg"},{name: "여자12번", icon: "32.jpg"},
    {name: "여자13번", icon: "33.jpg"},{name: "여자14번", icon: "34.jpg"},{name: "여자15번", icon: "35.jpg"},
    {name: "여자16번", icon: "36.jpg"},{name: "여자17번", icon: "37.jpg"},{name: "여자18번", icon: "38.jpg"},
    {name: "여자19번", icon: "39.jpg"},{name: "여자20번", icon: "40.jpg"},{name: "여자21번", icon: "41.jpg"}
  ];

  return (
    <>
      <p className="home-color_red">
        <span className="home-title_style">전학수속 종료</span>
      </p>
      <div className="field-transfer_form">
        <p className="field-transfer_character"><img src={"/character/" + charList[props.char_icon].icon} /></p>
        <span>클래스 : 3학년A반</span><br/>
        <span>번호 : {charList[props.char_icon].name}</span><br/>
        <span>이름 : {props.char_name}</span><br/>
        <span>체력 : {props.char_life_min}/{props.char_life_max}</span><br/>
        <span>스테미너 : {props.char_sta_min}/{props.char_sta_max}</span><br/>
        <span>공격력 : {props.char_attack}</span><br/>
        <span>방어력 : {props.char_defense}</span>
      </div>
      <div className="field-transfer_success_content">
        <p>{props.char_name} {props.char_sex === 1 ? "군" : "양"}이구나</p>
        <p>이제 막 전학 했지만, 내일은 수학여행이야.</p>
        <p>시간에 맞춰서, 늦지 말고 와~!</p>
        <Button variant="contained" color="warning" type="button" className="field-transfer_success_button">
          수학여행 출발
        </Button>
      </div>
    </>
  );
}

const Field = (props) => {
  let { id } = useParams();
  let history = useHistory();
  const [charData, setCharData] = React.useState(null);
  const [fieldData, setFieldData] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const account = props.params;

  // 캐릭터와 필드정보 취득
  FieldModel({id, account, setCharData, setFieldData, setError, setLoading});

  // 전학수속으로 이동
  const handleOnTransfer = () => {
    history.push("/transfer/" + id);
  };

  React.useEffect(() => {
    const timer = setInterval(() => {
      if (charData != null && charData.success === false) {
        handleOnTransfer(id);
      }
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="home-list">
      { error != null ? <Alert severity="error">데이터 취득중 에러가 발생 했습니다.</Alert> : "" }
      { loading != null && loading === true ? <CircularProgress disableShrink className="progress" /> : "" }
      {
        charData != null && charData.success === true ? <SwithMap>{charData}</SwithMap> : ""
      }
    </div>
  );
}

export default Field;