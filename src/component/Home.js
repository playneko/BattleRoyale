import React from 'react';
import moment from 'moment';
import { useHistory } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import MuiAlert from '@material-ui/lab/Alert';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import CircularProgress from '@material-ui/core/CircularProgress';

// 컴포넌트
// 모델
import HomeModel from "../models/HomeModel";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
}));

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Home = () => {
  let history = useHistory();
  const classes = useStyles();
  const [lists, setLists] = React.useState(null);
  const [error, setError] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  // 리스트 취득
  HomeModel({setLists, setError, setLoading});

  // 게임 필드로 이동
  const handleOnGameStart = (fieldNo) => {
    history.push("/field/" + fieldNo);
  };

  return (
    <div className="home-list">
      { error != null ? <Alert severity="error">데이터 취득중 에러가 발생 했습니다.</Alert> : "" }
      <List dense className={classes.root}>
      {
        lists != null && lists['list'] != null ?
          lists['list'].map((item, idx) => (
            <ListItem key={idx} button className="home-list_div" onClick={() => handleOnGameStart(item.no)}>
              <ListItemAvatar>
                <Avatar src="/character/42.jpg" className="home-list_avatar"/>
                <div className="home-list_content">
                  <span className="home-list_title">제 {item.no}회 프로그램</span><br/>
                  <span className="home-list_datetime">프로그램 시작일시 : {moment(item.start_date).format('YYYY년 M월 D일 h시 m분')}</span><br/>
                  <span className="home-list_datetime">프로그램 종료일시 : {moment(item.end_date).format('YYYY년 M월 D일 h시 m분')}</span><br/>
                  <span className="home-list_status_0">진행상태 : </span>
                  { item.status === 1 ? <span className="home-list_status_1">게임중</span> : item.status === 9 ? <span className="home-list_status_1">게임종료</span> : "준비중" }
                </div>
              </ListItemAvatar>
            </ListItem>
          ))
        : ""
      }
      </List>
      { loading != null && loading === true ? <CircularProgress disableShrink className="progress" /> : "" }
    </div>
  );
}

export default Home;