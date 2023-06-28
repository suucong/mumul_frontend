import React from "react";

import Profile1 from "./../img/Ellipse 103.png";
import Profile2 from "./../img/Ellipse 104.png";
import Heart from "./../img/icHeaderBlack.png";
import More from "./../img/icon/icMore.png";
import Share from "./../img/icon/icShare.png";
import Good from "./../img/icon/icGood.png";

function Comment() {
  return (
    <>
      <div className="commentWrap questionWrap">
        <div className="profileArea">
          <img src={Profile1} alt="profile1" className="questioner" />
        </div>
        <div className="cnt">
          <p className="Nicname">익명의 토끼</p>
          <p className="min">20분 전🔒</p>
          <p className="commentCnt">
            중요한 결정을 내려야 할 때 찾는 장소가 있나요? 마음 속의 장소도
            좋아요. <br></br>그곳은 어떤 곳인가요?
          </p>
          <div className="heart">
            <img src={Heart} alt="하트" />
          </div>
          <div className="more">
            <img src={More} alt="more" />
          </div>
          <div className="share">
            <img src={Share} alt="share" />
          </div>
        </div>
      </div>
      <div className="commentWrap answerWrap">
        <div className="profileArea">
          <img src={Profile2} alt="profile1" className="respondent" />
        </div>
        <div className="cnt">
          <p className="Nicname">냥냥이</p>
          <p className="min">방금 전🔒</p>
          <p className="commentCnt">
            스벅 창가자리 가서 맥 키보드 쾅쾅 내리 치는 편입니다.
          </p>
          <div className="heart">
            <img src={Good} alt="good" />
          </div>
          <div className="more">
            <img src={More} alt="more" />
          </div>
          <div className="share">
            <img src={Share} alt="share" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Comment;
