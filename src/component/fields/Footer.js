import React from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SearchIcon from '@material-ui/icons/Search';
import CardTravel from '@material-ui/icons/CardTravel';
import KeyboardArrowUp from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';

// 컴포넌트
// 공통 처리
import IsEmpty from "../common/IsEmpty";
// 모델
import CompasModel from "../../models/CompasModel";

const compasButton = (iconNumber, compasCode, compasName, setMoveMap) => {
  const moveMap = () => {
    setMoveMap(compasCode);
  }

  return (
    <>
    {
      !IsEmpty(compasCode) ?
        <ListItem button onClick={() => moveMap()}>
          <ListItemIcon>
            { iconNumber === 1 ? <KeyboardArrowRight /> : "" }
            { iconNumber === 2 ? <KeyboardArrowLeft /> : "" }
            { iconNumber === 3 ? <KeyboardArrowDown /> : "" }
            { iconNumber === 4 ? <KeyboardArrowUp /> : "" }
          </ListItemIcon>
          <ListItemText primary={compasName} />
        </ListItem>
      : ""
    }
    </>
  );
}

const ListItemButton = (iconNumber, text) => {
  return (
    <ListItem button>
      <ListItemIcon>
        { iconNumber === 1 ? <SearchIcon /> : "" }
        { iconNumber === 2 ? <CardTravel /> : "" }
      </ListItemIcon>
      <ListItemText primary={text} />
    </ListItem>
  );
}

const Footer = (props) => {
  const mapData = props.mapData.data[0];
  const setMoveCheck = props.setMoveCheck;
  // 맵 데이터
  const [moveMap, setMoveMap] = React.useState(mapData.map_code);
  // 에러
  const [error, setError] = React.useState(null);
  // 로딩
  const [loading, setLoading] = React.useState(false);

  // 필드 이동
  CompasModel({mapData, moveMap, setMoveCheck, setError, setLoading});
  console.log(moveMap);

  return (
    <>
      <List component="nav" className="field-map_footer">
      { compasButton(1, mapData.move_east, "동쪽으로 이동하기", setMoveMap) }
      { compasButton(2, mapData.move_west, "서쪽으로 이동하기", setMoveMap) }
      { compasButton(4, mapData.move_north, "북쪽으로 이동하기", setMoveMap) }
      { compasButton(3, mapData.move_south, "남쪽으로 이동하기", setMoveMap) }
      { ListItemButton(1, "탐색하기") }
      { ListItemButton(2, "소지품") }
      </List>
    </>
  );
}

export default Footer;