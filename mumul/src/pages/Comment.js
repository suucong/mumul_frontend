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
            MUMUL(무물)은 무슨 뜻이고 어떤 사이트인가요? 
          </p>
        
        </div>
      </div>


      <div className="commentWrap answerWrap">
        <div className="profileArea">
          <img src={Profile1} alt="profile1" className="respondent" />
        </div>
        <div className="cnt">
          <p className="Nicname">MUMUL 개발자</p>
          <p className="min">방금 전</p>
          <p className="commentCnt">
            무물이란 <strong>'무엇이든 물어보세요'</strong> 의 줄임말로, MUMUL은 익명 혹은 닉네임으로 자유롭게 문답하는 사이트입니다 😎
          </p>
        
        </div>
      </div>
    </>
  );
}

export default Comment;