import React from "react";

import Profile1 from "./../img/Ellipse 113.png";
import Profile2 from "./../img/Ellipse 106.png";


function Comment() {
  return (
    <>
      <div className="commentWrap questionWrap">
        <div className="profileArea">
          <img src={Profile2} alt="profile1" className="questioner" />
        </div>
        <div className="cnt">
          <p className="Nicname">익명의 토끼</p>
          <p className="min">20분 전</p>
          <p className="commentCnt">
            아침마다 출근하기 진짜 싫으면 어떡하죠?
          </p>
        
        </div>
      </div>


      <div className="commentWrap answerWrap">
        <div className="profileArea">
          <img src={Profile1} alt="profile1" className="respondent" />
        </div>
        <div className="cnt">
          <p className="Nicname">카페인은 내 친구</p>
          <p className="min">방금 전</p>
          <p className="commentCnt">
            점심 먹으러 회사 간다고 정신승리 하세요
          </p>
        
        </div>
      </div>
    </>
  );
}

export default Comment;