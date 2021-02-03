import React from 'react';
import Avatar from '@material-ui/core/Avatar';

const NotFound = () => {
  return (
    <>
      <p className="home-color_red">
        <span className="home-title_style">ERROR</span>
      </p>
      <div>
        <Avatar src="/character/42.jpg" className="home-list_avatar"/>
        <div className="notfound-avatar_content">
          <p>시스템의 오류로 인해 프로그램이 정상구동에 실패 했습니다.</p>
          <p>다시 한번 홈으로 가서 살육게임에 참가를 바랍니다.</p>
          <p>그럼 오늘 하루도 힘내~!</p>
        </div>
      </div>
    </>
  );
}

export default NotFound;