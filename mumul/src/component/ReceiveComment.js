import React, { useState, useEffect } from "react";

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
import Comment from "./../img/icon/icChat.png";
import AnonymousAnswer from "./AnonymousAnswer";
import Delete from "./popup/Delete";
import AnswerRegister from "./popup/AnswerRegister";
import { getReceivedComment } from "../api/getReceivedComment";
import { getSpaceInfo } from "../api/getSpaceInfo";
import UntilAnswering from "./UntilAnswering";
import { DateTimeFormatter, LocalDateTime, ChronoUnit } from "js-joda";
import { ZoneId, ZoneRulesProvider } from "js-joda-timezone";


function ReceiveComment({ spaceId }) {

 

  /* questionDTO
    private Long id;
    private String sentUserPic;
    private String questionText;
    private LocalDateTime createdTime;
    private List<AnswerDTO> answers;
    private String userId; // 질문자 닉네임 또는 "익명"
    private Boolean isAnonymous; // "익명"으로 질문했는지 여부
    */
  // console.log("received spaceId: "+ spaceId);

  // const [received, setReceived] = useState({
  //   id: '',
  //   sentUserPic: '',
  //   questionText: '',
  //   createdTime:'',
  //   answers:'',
  //   userId: '',
  //   isAnonymous:''
  // });

  const [receivedComments, setReceivedComments] = useState([]);

  const [spaceOwner, setSpaceOwner] = useState({
    userId: "",
    picture: "",
    name: "",
  });

  useEffect(() => {
    const fetchReceivedComments = async () => {
      try {
        const spaInfo = await getSpaceInfo(spaceId);
        const received = await getReceivedComment(spaceId);

        console.log("received:", received);

        const receivedArray = Object.values(received.data).map(
          (item) => item || {}
        );
        console.log("receivedArray:", receivedArray);
        setReceivedComments(receivedArray);
        setSpaceOwner(spaInfo);
      } catch (error) {
        console.error("Error fetching received comments:", error);
      }
    };

    fetchReceivedComments();
  }, [spaceId]);

  // 질문데이터 배열 상태값
  const [questionData, setQuestionData] = useState([]);

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

  const [answerModal, setAnswerMoal] = useState(false);

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
  };

  // 삭제 팝업  닫기
  const onClose = (e) => {
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
  const showAnswerModal = () => {
    setAnswerMoal(true);
  };

  const CloseAnswerModal = () => {
    setAnswerMoal(false);
  };

  const onClickcopy = () => {
    setShare(false);
    alert("링크가 복사 되었습니다");
  };

  // Check if receivedComments is an array
  if (!Array.isArray(receivedComments)) {
    return <p>No received comments</p>;
  }

  //   const timeDifference = getTimeDifference(questionTime);
  // console.log(timeDifference); // 예: "5분 전"

  return (
    <>
      {receivedComments.map((received, index) => (
        <>
          <div key={index} className="commentWrap questionWrap">
            <div className="profileArea">
              <img
                src={received.sentUserPic}
                alt="profile1"
                className="questioner"
              />
            </div>
            <div className="cnt">
              <p className="Nicname">{received.userId}</p>
              <p className="min">{received.createdTime}</p>
              <p className="commentCnt">{received.questionText}</p>
              <div className="heart">
                <img src={heart} alt="하트" onClick={clickHeart} />
                <img
                  src={Comment}
                  alt="comment"
                  className="chat"
                  onClick={showAnswerModal}
                />
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
              <img
                src={spaceOwner.picture}
                alt="profile2"
                className="respondent"
              />
            </div>
            <div className="cnt">
              {received.answers == null ? (
                <UntilAnswering></UntilAnswering>
              ) : (
                <AnonymousAnswer></AnonymousAnswer>
              )}

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
      ))}
    </>
  );
}

export default ReceiveComment;

// 질문 등록 시간과 현재 시간 사이의 차이를 계산하는 함수
function getTimeDifference(createdTime) {

  ZoneRulesProvider.getRules("Asia/Seoul"); // "Asia/Seoul" 시간대 등록
const koreaSeoulZoneId = ZoneId.of("Asia/Seoul"); // "Asia/Seoul" 시간대 설정


  const currentTime = LocalDateTime.now(koreaSeoulZoneId);
  const parsedCreatedTime = LocalDateTime.parse(createdTime, DateTimeFormatter.ISO_DATE_TIME);
  const zonedCreatedTime = parsedCreatedTime.atZone(koreaSeoulZoneId);
  const timeDiff = zonedCreatedTime.until(currentTime, ChronoUnit.MINUTES);
  

  console.log("parsedCreatedTime: ", parsedCreatedTime);

  console.log("timeDiff: ", timeDiff);

  if (timeDiff < 1) {
    return "방금 전";
  } else if (timeDiff < 60) {
    return `${timeDiff}분 전`;
  } else if (timeDiff < 60 * 24) {
    const hours = Math.floor(timeDiff / 60);
    return `${hours}시간 전`;
  } else if (timeDiff < 60 * 24 * 7) {
    const days = Math.floor(timeDiff / (60 * 24));
    return `${days}일 전`;
  } else if (timeDiff < 60 * 24 * 30) {
    const weeks = Math.floor(timeDiff / (60 * 24 * 7));
    return `${weeks}주 전`;
  } else if (timeDiff < 60 * 24 * 365) {
    const months = Math.floor(timeDiff / (60 * 24 * 30));
    return `${months}달 전`;
  } else {
    const years = Math.floor(timeDiff / (60 * 24 * 365));
    return `${years}년 전`;
  }
}
