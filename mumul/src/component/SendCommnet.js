import React, { useState } from "react";

import Profile1 from "./../img/Ellipse 103.png";
import Profile2 from "./../img/Ellipse 104.png";
import Heart from "./../img/icHeaderBlack.png";
import LineHeart from "./../img/icHeartWhite.png";
import More from "./../img/icon/icMore.png";
import Share from "./../img/icon/icShare.png";
import Good from "./../img/icon/icGood.png";
import GoodRed from "./../img/icon/icGoodRed.png";
import InstaLogo from "./../img/icon/instaLogo.jpeg";
import CopyLink from "./../img/icon/CopyLink.png";
import Bin from "./../img/icon/icBin.png";

import Delete from "./../component/popup/Delete";

function SendCommnet() {
  //하트 상태값
  const [heartState, setHeartState] = useState(false);
  //좋아요 상태값
  const [goodState, setGoodState] = useState(false);
  // 빈 하트
  const [heart, setHeart] = useState(LineHeart);
  //빈 좋아요
  const [good, setGood] = useState(Good);
  //삭제 상태값
  const [del, setDelete] = useState(false);
  const [del_1, setDelete_1] = useState(false);
  //공유하기 상태값
  const [share, setShare] = useState(false);
  const [share_1, setShare_1] = useState(false);
  //공유하기 모달 오픈 상태값
  const [shareModal, setShareModal] = useState(false);
  //삭제 모달 오픈 상태값
  const [delModal, setDelModal] = useState(false);
  //하트 상태값에 따른 이미지 변경 함수
  const clickHeart = () => {
    if (heartState) {
      setHeartState(false);
      setHeart(LineHeart);
    } else {
      setHeartState(true);
      setHeart(Heart);
    }
  };

  //좋아요 상태값에 따른 이미지 변경 함수
  const clickGood = () => {
    if (goodState) {
      setGoodState(false);
      setGood(Good);
    } else {
      setGoodState(true);
      setGood(GoodRed);
    }
  };

  //삭제 상태값에 따른 더보기 버튼
  const clickMore = () => {
    if (del) {
      setDelete(false);
    } else {
      setDelete(true);
    }
  };

  const clickMore_1 = () => {
    if (del_1) {
      setDelete_1(false);
    } else {
      setDelete_1(true);
    }
  };
  //삭제하기 클릭 시 모달 오픈
  const showDelModal = () => {
    setDelModal(true);
    setDelete(false);
    setDelete_1(false);
  };

  // 삭제 팝업  닫기
  const onClose = () => {
    setDelModal(false);
    setDelete(false);
  };

  //공유하기  오픈
  const showShareModal = () => {
    if (share) {
      setShareModal(false);
      setShare(false);
    } else {
      setShareModal(true);
      setShare(true);
    }
  };

  //공유하기  오픈
  const showShareModal_1 = () => {
    if (share_1) {
      setShareModal(false);
      setShare_1(false);
    } else {
      setShareModal(true);
      setShare_1(true);
    }
  };
  const onClickcopy = () => {
    setShare(false);
    alert("링크가 복사 되었습니다");
  };
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
            <img src={heart} alt="하트" onClick={clickHeart} />
          </div>
          <div className="more">
            <img src={More} alt="more" onClick={clickMore} />
            {del && (
              <div className="del" onClick={showDelModal}>
                <p>
                  <img src={Bin} alt="btin" />
                  삭제하기
                </p>
              </div>
            )}
          </div>
          <div className="share">
            <img src={Share} alt="share" onClick={showShareModal} />
            {share && (
              <div className="sharePopup">
                <p>
                  <img src={InstaLogo} alt="insta" />
                  스토리
                </p>
                <p onClick={onClickcopy}>
                  <img src={CopyLink} alt="link" />
                  링크 복사
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="commentWrap answerWrap">
        <div className="profileArea">
          <img src={Profile2} alt="profile2" className="respondent" />
        </div>
        <div className="cnt">
          <p className="Nicname">냥냥이</p>
          <p className="min">방금 전🔒</p>
          <p className="commentCnt">
            스벅 창가자리 가서 맥 키보드 쾅쾅 내리 치는 편입니다.
          </p>
          <div className="heart">
            <img src={good} alt="good" onClick={clickGood} />
          </div>
          <div className="more">
            <img src={More} alt="more" onClick={clickMore_1} />
            {del_1 && (
              <div className="del" onClick={showDelModal}>
                <p>
                  <img src={Bin} alt="btin" />
                  삭제하기
                </p>
              </div>
            )}
          </div>
          <div className="share">
            <img src={Share} alt="share" onClick={showShareModal_1} />
            {share_1 && (
              <div className="sharePopup">
                <p>
                  <img src={InstaLogo} alt="insta" />
                  스토리
                </p>
                <p onClick={onClickcopy}>
                  <img src={CopyLink} alt="link" />
                  링크 복사
                </p>
              </div>
            )}
          </div>
        </div>
        {/* 삭제하기 팝업  */}
        {delModal && <Delete onClose={onClose}></Delete>}
        {/* -- 삭제하기 팝업 */}
      </div>
    </>
  );
}

export default SendCommnet;
