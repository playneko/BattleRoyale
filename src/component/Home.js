import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Avatar from '@material-ui/core/Avatar';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';

// 컴포넌트
// 모델

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
}));

const Home = () => {
  const classes = useStyles();

  return (
    <div className="home-list">
      <List dense className={classes.root}>
        <ListItem key="0" button className="home-list_div">
          <ListItemAvatar>
            <Avatar src="/character/42.jpg" className="home-list_avatar"/>
            <div className="home-list_content">
              <span className="home-list_title">제 13401회 프로그램</span><br/>
              <span className="home-list_datetime">프로그램 시작일시 : 2021년 2월 1일 월요일 22시 07분</span><br/>
              <span className="home-list_datetime">프로그램 종료일시 : 2021년 2월 1일 월요일 23시 25분</span><br/>
              <span className="home-list_status_0">진행상태 : </span><span className="home-list_status_1">전학수속 접수중</span>
            </div>
          </ListItemAvatar>
        </ListItem>
        {/* <ListItem key="0" button className="home-list_div">
          <ListItemAvatar>
            <Avatar src="/character/42.jpg" className="home-list_avatar"/>
          </ListItemAvatar>
        </ListItem> */}
      </List>
    </div>
  );
}

export default Home;