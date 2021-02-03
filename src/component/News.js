import React from 'react';
import Avatar from '@material-ui/core/Avatar';

// 컴포넌트
// 모델

const News = (props) => {

  return (
    <>
      <p className="home-color_red">
        <span className="home-title_style">진행 상황</span>
      </p>
      <div>
        <Avatar src="/character/42.jpg" className="home-list_avatar"/>
        <div className="home-avatar_content">
          <span>여러분, 모두 건강하게 잘 지내나?</span><br/>
          <span>그럼, 지금까지의 상황입니다.</span><br/>
          <span>오늘 하루도 힘내~!</span>
        </div>
      </div>
    </>
  );
}

export default News;