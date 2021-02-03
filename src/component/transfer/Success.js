import React from 'react';
import { useHistory, useParams } from "react-router-dom";
import MuiAlert from '@material-ui/lab/Alert';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

// 컴포넌트
// 로그인 체크
import CheckLogin from "../CheckLogin";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const Success = (props) => {
  // URL 아이디값
  let { id } = useParams();
  let history = useHistory();
  const account = props.params;
  const character = account.character != null ? account.character : null;
  // 결과
  const [result, setResult] = React.useState({});
  // 에러
  const [error, setError] = React.useState(null);
  // 로딩
  const [loading, setLoading] = React.useState(false);

  console.log(props);
  CheckLogin(account, 2);

  if (account != null && account.auth === true) {
    return (
      <div>
        { error != null ? <Alert severity="error">{error.msg}</Alert> : "" }
        { loading != null && loading === true ? <CircularProgress disableShrink className="progress" /> : "" }
        <p className="home-color_red">
          <span className="home-title_style">등록 완료</span>
        </p>
        <div className="field-transfer_success_content">
          <p>눈을 뜨자, 교실 같은 곳에 있었다. 분명 수학여행에 갔는데…?</p>
          <p>「맞아, 수학여행 가는 버스 안에서 갑자기 졸음이 와서…」</p>
          <p>주위를 둘러보자, 다른 학생들도 있었다. 자세히 보자, 모두 은색의 목걸이가 채워져 있는것을 깨달았다.</p>
          <p>목을 만지자, 차가운 금속의 느낌이 전해져 왔다.</p>
          <p>모두와 같이, 저 은색 목걸이가 채워져 있다.</p>
          <p>규칙적인 발소리와 함께 앞문으로, 한 남자와 중무장을 한 군사들이 들어왔다.</p>
          <Avatar src="/character/42.jpg" className="field-list_avatar"/>
          <p>「안녕, 1학년때 담임이었던 사카모치입니다. 이번에도 특별히 여러분을 맡게 되었습니다. 잘 부탁합니다.</p>
          <p>이 나라는 여러분 덕분에, 완전히 맛이 가버렸습니다.</p>
          <p>그래서, 훌륭한 분들은 고심끝에 이 법을 만들었습니다.</p>
        </div>
        <p className="home-color_red">
          <span className="home-title_style">■ BATTLE ROYALE ■</span>
        </p>
        <div className="field-transfer_success_content">
          <p>자, 오늘은 특별히 여러분 모두 살인을 조금 해봅시다.</p>
          <p>마지막 한 사람이 남을 때까지입니다.</p>
          <p>반칙이란 건 없습니다. 무슨수를 쓰든 좋아요.</p>
          <p>아, 말하는걸 잊었군요. 이 지역은 섬이고, 여긴 섬의 분교입니다.</p>
          <p>선생님은 여기에서 여러분 모두가 노력 하는걸, 지켜 봐줄 겁니다. 외롭지 않겠죠?</p>
          <p>여기를 나가면 어디로 가도 상관없어요.</p>
          <p>참, 계속 섬 전체에 방송을 합니다.</p>
          <p>모두가 가지고 있는 지도에 따라, 몇시부터 이 지역은 위험하다고 알려줍니다.</p>
          <p>지도를 잘 보고, 나침반과 지형을 참조해서</p>
          <p>신속히 그 지역을 떠나세요.</p>
          <p>어째서냐고 한다면, 여러분 목의 목걸이를 봐주세요.</p>
          <p>내부 센서가 심장박동을 모니터해 여러분의 위치나 행동을 전파로 알려줍니다.</p>
          <p>제한시간을 넘어서도 금지지역에 있거나 불온한 행동을 하면 목걸이는 폭발할 겁니다.</p>
          <p>억지로 빼려고 해도 폭발하니까 주의하세요. 믿지 못한다면 시험해봐도 나쁘진 않겠죠.</p>
          <p>알겠어요? 그러니까, 건물 안에 있어도 안돼요.</p>
          <p>굴 속에서 숨어 있어도 전파는 닿습니다.</p>
          <p>아, 그래, 생각난 김에. 건물 안에 숨는것은 자유입니다.</p>
          <p>그리고 또 하나. 시간제한이 있어요.</p>
          <p><span className="field-transfer_success_warnning">금지구역이 모두 설정 될때까지</span>입니다.</p>
          <p>몇명이 남아 있어도 컴퓨터가 작동해서</p>
          <p>남아있는 사람 전원의 목걸이가 빵! 하고 폭발. 우승자는 없습니다.</p>
          <p>…왜 이런 일을 하냐고?</p>
          <p>너희 탓이야. 너희 탓. 너흰 어른들을 깔보잖아. 거기까진 좋아</p>
          <p>하지만 이건, 기억해둬.</p>
          <p className="field-transfer_success_message">「인생은 게임이다. 모두가 필사적으로 싸워서 가치 있는 어른이 되자는 거다.」</p>
          <p>자, 그러면 한 사람씩, 이 가방을 가지고 교실을 나가세요.</p>
          <p>아, 아빠 엄마에게 이미 말해뒀으니까 맘편히 싸우세요.</p>
        </div>
        <div className="field-transfer_success_button">
          <Button variant="contained" color="warning" type="button">
            교실에서 나간다
          </Button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="home-list">
        <CircularProgress disableShrink className="progress" />
      </div>
    );
  }
}

export default Success;