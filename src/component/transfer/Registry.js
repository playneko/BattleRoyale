import React from 'react';
import { useHistory, useParams } from "react-router-dom";
import MuiAlert from '@material-ui/lab/Alert';
import Input from '@material-ui/core/Input';
import Radio from '@material-ui/core/Radio';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import InputLabel from '@material-ui/core/InputLabel';
import AccountCircle from '@material-ui/icons/AccountCircle';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CircularProgress from '@material-ui/core/CircularProgress';

// 컴포넌트
// 모델
import TransferModel from "../../models/TransferModel";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} className="transfer-error" />;
}

const Registry = (props) => {
  let { id } = useParams();
  let history = useHistory();
  const [character, setCharacter] = React.useState({iconName: "남자1번", iconVal: "0", charIcon: "0.jpg", charSex: "1"});
  const [charData, setCharData] = React.useState({});
  const [result, setResult] = React.useState({success: false});
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const iconList = [
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
  const account = props.params;

  // 전학수속 처리
  TransferModel({charData, setResult, setError, setLoading});

  const handleOnSubmit = (e) => {
    e.preventDefault();

    setCharData({
      transfer: true,
      gameNo: id,
      userId: account.userId,
      charIcon: e.target.charIcon.value,
      charName: e.target.charName.value,
      charSex: e.target.charSex.value
    });
  };

  const handleOnIconChange = (event) => {
    const iconNumber = event.target.value;
    setCharacter({
      ...character,
      iconVal: iconNumber,
      iconName: iconList[iconNumber].name,
      charIcon: iconList[iconNumber].icon
    });
  }

  const handleOnSexChange = (event) => {
    const sexNumber = event.target.value;
    setCharacter({
      ...character,
      charSex: sexNumber
    });
  }

  if (result != null && result.success === true) {
    history.push("/switch/" + id);
  }

  return (
    <>
      <p className="home-color_red">
        <span className="home-title_style">전학 수속</span>
      </p>
      <form onSubmit={handleOnSubmit} className="transfer-form_group">
        { error ? <Alert severity="error">전학 수속중 에러가 발생했습니다.</Alert> : "" }
        <div className="transfer-form">
          <div className="transfer-form_character">
            <InputLabel htmlFor="character-icon"><img src={"/character/" + character.charIcon} id="character" /></InputLabel>
            <Select
              native
              name="charIcon"
              value={character.charIcon}
              onChange={handleOnIconChange}
              inputProps={{
                charIcon: 'charIcon',
                id: 'character-icon',
              }}
            >
              <option value={character.iconVal}>{character.iconName}</option>
              {
                iconList.map((item, idx) => (
                  <option value={idx}>{item.name}</option>
                ))
              }
            </Select>
          </div>
          <div className="transfer-form_username">
            <InputLabel htmlFor="character-name">캐릭터명을 입력해 주세요.</InputLabel>
            <Input
              name="charName"
              type="text"
              startAdornment={
                <InputAdornment position="start">
                  <AccountCircle />
                </InputAdornment>
              }
            />
          </div>
          <div className="transfer-form_usersex">
            <FormLabel component="legend">성별</FormLabel>
            <RadioGroup aria-label="gender" name="charSex" value={character.charSex} onChange={handleOnSexChange}>
              <FormControlLabel value="1" control={<Radio />} label="남자" />
              <FormControlLabel value="2" control={<Radio />} label="여자" />
            </RadioGroup>
          </div>
        </div>
        <div className="transfer-button">
        {
          loading != null && loading === true ?
            <CircularProgress disableShrink className="progress" /> :
            <Button variant="contained" color="secondary" type="submit">
              수속하기
            </Button>
        }
        </div>
      </form>
    </>
  );
}

export default Registry;