import React from 'react';
import { useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';
import MuiAlert from '@material-ui/lab/Alert';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import CircularProgress from '@material-ui/core/CircularProgress';

// 컴포넌트
// 공통 처리
import IsEmpty from "../common/IsEmpty";
// 로그인 체크
import CheckLogin from "../CheckLogin";
// 하단
import Footer from "./Footer";
// 모델
import MapModel from "../../models/MapModel";

const iconList = [
  "0.jpg", "1.jpg", "2.jpg","3.jpg", "4.jpg", "5.jpg",
  "6.jpg", "7.jpg", "8.jpg","9.jpg", "10.jpg", "11.jpg",
  "12.jpg", "13.jpg", "14.jpg","15.jpg", "16.jpg", "17.jpg",
  "18.jpg", "19.jpg", "20.jpg","21.jpg", "22.jpg", "23.jpg",
  "24.jpg", "25.jpg", "26.jpg","27.jpg", "28.jpg", "29.jpg",
  "30.jpg", "31.jpg", "32.jpg","33.jpg", "34.jpg", "35.jpg",
  "36.jpg", "37.jpg", "38.jpg","39.jpg", "40.jpg", "41.jpg"
];

function Alert(props) {
  const handleOnReload = () => {
    props.setReload(props.reload + 1);
  }

  return (
    <>
      <MuiAlert elevation={6} variant="filled" {...props} />
      <div className="filed-map_reload_button">
        <Button variant="contained" color="warning" type="button" onClick={handleOnReload}>
          리로드
        </Button>
      </div>
    </>
  );
}

function LinearProgressWithLabel(props) {
  return (
    <Box display="flex" alignItems="center">
      <Box width="100%" mr={1}>
        <LinearProgress variant="determinate" {...props} className={props.className} />
      </Box>
      <Box minWidth={35}>
        <Typography variant="body2" className="field-map_status_info_text">{`${Math.round(props.value,)}%`}</Typography>
      </Box>
    </Box>
  );
}

const drawDangerMap = (canvas, context) => {
  context.fillStyle = "#c00000";
  context.globalAlpha = 0.5;
  context.fillRect(100,50,100,50);
}

const drawImageMap = (mapName, x, y) => {
  let image = document.getElementById("map_image");

  if (document.getElementById("map")) {
    let canvas = document.getElementById("map");
    let context = canvas.getContext("2d");
    // 맵 이미지 그리기
    context.drawImage(image, x, y, 154, 185, 0, 0, 300, 180);

    // drawDangerMap(canvas, context);

    // 맵에 현재위치 글씨 그리기
    context.font = "20px Comic Sans MS";
    context.lineWidth = 6;
    context.fillStyle = "#000000";
    context.strokeStyle = "#ffffff";
    context.strokeText("내위치", 122, 72);
    context.fillText("내위치", 122, 72);
  }
}

const StatusBar = (props) => {
  const mapData = props.children.data[0];

  return (
    <>
      <div className="field-map_status_character">
        <img src={"/character/" + iconList[mapData.char_icon]} />
      </div>
      <div className="field-map_status_info">
        <div>
          <span>체력</span>
          <LinearProgressWithLabel value={Math.round(mapData.char_life_min / mapData.char_life_max * 100)} className="field-map_status_info_background_red" />
        </div>
        <div>
          <span>스테미너</span>
          <LinearProgressWithLabel value={Math.round(mapData.char_sta_min / mapData.char_sta_max * 100)} className="field-map_status_info_background_yellow" />
        </div>
        <div>
          <span>공격력</span>
          <div>{mapData.char_attack}</div>
        </div>
        <div>
          <span>방어력</span>
          <div>{mapData.char_defense}</div>
        </div>
      </div>
    </>
  );
}

const MapRender = (props) => {
  // 연못
  // drawImageMap(154, 102);
  // 소각장
  // drawImageMap(204, 102);
  // 폐가촌
  // drawImageMap(204, 51);
  // 묘지
  // drawImageMap(255, 51);
  // 성당
  // drawImageMap(306, 51);
  // 공사현장
  // drawImageMap(306, 102);
  // 박물관
  // drawImageMap(358, 102);
  // 주택가
  // drawImageMap(358, 153);
  // 분교
  // drawImageMap(409, 153);
  // 주유소
  // drawImageMap(358, 204);
  // 우체국
  // drawImageMap(306, 204);
  // 상점가
  // drawImageMap(306, 255);
  // 선착장
  // drawImageMap(306, 306);
  // 등대
  // drawImageMap(306, 357);
  // 보건소
  // drawImageMap(255, 204);
  // 신 주택가
  // drawImageMap(204, 204);
  // 학교
  // drawImageMap(154, 204);
  // 삼림지대
  // drawImageMap(102, 204);
  // 소방서
  // drawImageMap(102, 255);
  // 절
  // drawImageMap(102, 306);
  // 산악지대
  // drawImageMap(154, 153);
  // 터널
  // drawImageMap(204, 153);
  // 경찰서
  // drawImageMap(154, 255);

  // drawDangerMap(canvas, ctx);

  const mapData = props.children.data[0];

  // 맵 그리기
  drawImageMap(mapData.map_name, mapData.map_x, mapData.map_y);

  return (
    <>
      <div className="field-map_div">
        <p className="field-map_color_red">
          <span className="field-map_title_style">{mapData.map_name} ({mapData.map_code})</span>
        </p>
      </div>
      <div className="field-map">
        <canvas className="field-map_view" id="map" />
      </div>
    </>
  );
}

const Field = (props) => {
  let history = useHistory();
  const account = props.params;
  const character = account.character != null ? account.character : null;

  // 맵 데이터
  const [mapData, setMapData] = React.useState({});
  // 로딩
  const [reload, setReload] = React.useState(0);
  // 에러
  const [error, setError] = React.useState(null);
  // 로딩
  const [loading, setLoading] = React.useState(false);
  // 이동 처리 체크
  const [moveCheck, setMoveCheck] = React.useState(!IsEmpty(mapData) && !IsEmpty(mapData.data) ? mapData.data.map_code : "");

  CheckLogin(account, 3);

  // 캐릭터와 필드정보 취득
  MapModel({moveCheck, character, reload, setMapData, setError, setLoading});

  return (
    <div className="home-list">
      { !IsEmpty(error) ? <Alert severity="error" reload={reload} setReload={setReload}>{error.msg != null ? error.msg : "데이터 취득중 에러가 발생했습니다."}</Alert> : "" }
      { !IsEmpty(loading) && loading === true ? <CircularProgress disableShrink className="progress" /> : "" }
      {
        !IsEmpty(mapData) && !IsEmpty(mapData.data) ?
          <StatusBar>{mapData}</StatusBar>
        : ""
      }
      {
        !IsEmpty(mapData) && !IsEmpty(mapData.data) ?
          <MapRender>{mapData}</MapRender>
        : ""
      }
      {
        !IsEmpty(mapData) && !IsEmpty(mapData.data) ?
          <Footer mapData={mapData} setMoveCheck={setMoveCheck} />
        : ""
      }
      <img id="map_image" src="/map.jpg" />
    </div>
  );
}

export default Field;