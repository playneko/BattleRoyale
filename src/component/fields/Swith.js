import React from 'react';

// 컴포넌트
// 전학수속 처리
import TransferUpdate from "./fields/TransferUpdate";

// 필드값을 체크해서 페이지 표시
const SwithMap = (props) => {
  const setCharData = props.children.setCharData;
  const setFieldData = props.children.setFieldData;
  const setError = props.children.setError;
  const setLoading = props.children.setLoading;
  const fieldData = props.children.fieldData;
  const swithData = props.children.charData.data[0];

  console.log(swithData);

  // 수학여행 출발 대기
  if (swithData.char_field === 1) {
    console.log("1111");
    return TransferUpdate(swithData, setCharData, setError, setLoading);
  } else if (swithData.char_field === 2) {
    console.log("2222");
    // return TransferSuccess(swithData, setCharData, setError, setLoading);
  } else {
    console.log("0000");
    return (
      <></>
    );
  }
}

export default SwithMap;