import React from 'react';
import { BrowserRouter as Router, Switch, Route, useHistory } from 'react-router-dom';
import { makeStyles, createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';

// 컴포넌트
// Header
import Header from "./component/Header";
// 로그인
import Login from "./component/Login";
// 로그아웃
import Logout from "./component/Logout";
// 회원가입
import Registry from "./component/Registry";
// 게임 리스트
import Home from "./component/Home";
// 생존자 명단
import Life from "./component/Life";
// 진행 상황
import News from "./component/News";
// 우승자
import Rank from "./component/Rank";
// 게시판
import Board from "./component/Board";
// 게임 필드
import Field from "./component/fields/Field";
// 전학수속 접수
import TransferRegistry from "./component/transfer/Registry";
// 전학수속 갱신
import TransferUpdate from "./component/transfer/Update";
// 전학수속 완료
import TransferSuccess from "./component/transfer/Success";
// 페이지 스위치
import SwitchPage from "./component/SwitchPage";
// 404 NotFound
import NotFound from "./component/NotFound";
// 모델
import SessionModel from "./models/SessionModel";
// CSS
import './styles/App.css';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
}));

const colorTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#020202',
    },
    secondary: {
      main: '#4e342e',
    },
  },
});

function App() {
  let history = useHistory();
  const classes = useStyles();
  const [error, setError] = React.useState(null);
  const [account, setAccount] = React.useState({
    auth: false,
    userNo: "",
    userId: "",
    userName: "",
    userImage: "",
    userDate: ""
  });
  const [isLogin, setIsLogin] = React.useState(0);
  const [myTheme, setMyTheme] = React.useState(colorTheme);

  // 로그인 유무 취득
  SessionModel(isLogin, setAccount, setError);

  // 세션 취득 에러가 발생했을 경우
  if (error != null && error === true) {
    history.push("/");
  }

  // 로그인 유무를 체크후 헤더에 넘겨주기
  const handleOnLoginout = (e) => {
    if (e === true) {
      setIsLogin(isLogin + 1);
    } else {
      setIsLogin(0);
      setAccount({
        auth: false
      });
    }
  };

  return (
    <Router>
      <ThemeProvider theme={myTheme}>
      <div className={classes.root}>
        <CssBaseline />
        <Header params={account} />
        <main
          className={classes.content + " main"}
        >
          <div className={classes.drawerHeader} />
          <Typography paragraph>
            <Switch>
            {
              account.auth ? <Route exact path="/" render={() => <NotFound />} /> : ""
            }
            {
              account.auth ? <Route path="/home" render={() => <Home />} /> : account.auth === false ? <Route exact path="/" render={() => <Login params={handleOnLoginout} />} /> : ""
            }
            <Route path="/switch/:id" render={() => <SwitchPage params={{account: account, isLogin: isLogin, setIsLogin: setIsLogin}} />} />
            <Route path="/user/registry" render={() => <Registry />} />
            <Route path="/user/logout" render={() => <Logout params={handleOnLoginout} />} />
            <Route path="/transfer/register/:id" render={() => <TransferRegistry params={account} />} />
            <Route path="/transfer/update/:id" render={() => <TransferUpdate params={account} />} />
            <Route path="/transfer/success/:id" render={() => <TransferSuccess params={account} />} />
            <Route path="/field/map" render={() => <Field params={account} />} />
            <Route path="/life" render={() => <Life />} />
            <Route path="/news" render={() => <News />} />
            <Route path="/rank" render={() => <Rank />} />
            <Route path="/board" render={() => <Board />} />
            <Route path="/404" render={() => <NotFound />} />
            <Route path="*" render={() => <NotFound />} />
            </Switch>
          </Typography>
        </main>
      </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;
