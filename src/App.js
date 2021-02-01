import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { makeStyles, createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';

// 컴포넌트
// Header
import Header from "./component/Header";
// 로그인
import Login from "./component/Login";
// 회원가입
import Registry from "./component/Registry";
// 게임 리스트
import Home from "./component/Home";
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
  const classes = useStyles();
  const [isLogin, setIsLogin] = React.useState(0);
  const [myTheme, setMyTheme] = React.useState(colorTheme);

  // 로그인 유무 취득
  SessionModel(setIsLogin);

  // 로그인 유무를 체크후 헤더에 넘겨주기
  const handleOnLoginout = (e) => {
    if (e === true) {
      setIsLogin(isLogin + 1);
    } else {
      setIsLogin(0);
    }
  };

  return (
    <Router>
      <ThemeProvider theme={myTheme}>
      <div className={classes.root}>
        <CssBaseline />
        <Header params={isLogin} />
        <main
          className={classes.content}
        >
          <div className={classes.drawerHeader} />
          <Typography paragraph>
            <Switch>
            {
              isLogin ?
                <Route exact path="/" render={() => <Home />} /> : <Route exact path="/" render={() => <Login params={handleOnLoginout} />} />
            }
            <Route path="/user/registry" render={() => <Registry />} />
            </Switch>
          </Typography>
        </main>
      </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;
