import React, { useState, useEffect } from "react";

import Heart from "./../img/icHeaderBlack.png";
import LineHeart from "./../img/icHeartWhite.png";
import More from "./../img/icon/icMore.png";
import Share from "./../img/icon/icShare.png";
import Good from "./../img/icon/icGood.png";
import GoodRed from "./../img/icon/icGoodRed.png";
import InstaLogo from "./../img/icon/instaLogo.jpeg";
import CopyLink from "./../img/icon/CopyLink.png";
import Bin from "./../img/icon/icBin.png";
import { getSpaceInfo } from "../api/getSpaceInfo";
import Delete from "./popup/QDelete";
import ADelete from "./popup/ADelete";
import { getSentComment } from "../api/Q&A/getSentComment"; 
import UntilAnswering from "./UntilAnswering";
import AnonymousAnswer from "./AnonymousAnswer";
import moment from "moment";
import "moment/locale/ko"; // 한국어 

function SendComment({ spaceId, info, currentUserInfo }) {
  const [sentComments, setSentComments] = useState([]);
  // 답변 삭제 상태값
  const [a_deleteStates, a_setDeleteStates] = useState({});

  const [spaceOwner, setSpaceOwner] = useState({
    userId: "",
    picture: "",
    name: "",
  });

  // 질문 공유 상태값
  const [shareStates, setShareStates] = useState({});

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
  //질문 삭제 모달 오픈 상태값
  const [delModal, setDelModal] = useState(false);
  //답변 삭제 모달 오픈 상태값
  const [a_delModal, a_setDelModal] = useState(false);
  //하트 상태값에 따른 이미지 변경 함수

  // 선택한 질문의 고유 ID를 상태값에 저장
  const [selectedQuestionId, setSelectedQuestionId] = useState([]);
  
  // 선택한 답변의 고유 ID를 상태값에 저장
  const [selectedAnswerId, setSelectedAnswerId] = useState([]);

  const [selectedSpaceId, setSelectedSpaceId] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState([]);
  // 질문 삭제 상태값
  const [deleteStates, setDeleteStates] = useState({});


  useEffect(() => {
    const fetchSentComments = async () => {
      try {
        const spaInfo = await getSpaceInfo(spaceId);
        const sent = await getSentComment(spaceId);

        console.log("sent:", sent);

        const sentArray = Object.values(sent.data).map((item) => item || {});
        console.log("sentArray:", sentArray);
        setSentComments(sentArray);
        setSpaceOwner(spaInfo);
        // deleteStates 배열을 모든 질문에 대해 초기화
        const initialDeleteStates = sentArray.map(() => false);
        setDeleteStates(initialDeleteStates);
        a_setDeleteStates(initialDeleteStates);
        setShareStates(initialDeleteStates);
      } catch (error) {
        console.error("Error fetching sent comments:", error);
      }
    };

    fetchSentComments();
  }, [spaceId]);



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

  // 클릭한 질문에 대한 삭제 상태값 변경
  const clickMore = (index) => {
    setDeleteStates((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = !newStates[index];
      return newStates;
    });
  };

  // 클릭한 답변에 대한 삭제 상태값 변경
  const clickMore_1 = (index) => {
    a_setDeleteStates((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = !newStates[index];
      return newStates;
    });
  };

  // 질문 삭제하기 클릭 시 모달 오픈
  const showDelModal = (questionId, spaceId, userId) => {
    setSelectedQuestionId(questionId); // 선택한 질문의 ID를 상태값에 저장
    setSelectedSpaceId(spaceId); // 선택한 질문의 스페이스 ID를 상태값에 저장
    setSelectedUserId(userId); // 선택한 질문의 유저 ID를 상태값에 저장
    setDelModal(true);
  };

  
// 답변 삭제하기 클릭 시 모달 오픈
const a_showDelModal = (answerId, spaceId, userId) => {
  console.log("answerId: ", answerId);
  setSelectedAnswerId(answerId); // 선택한 질문의 ID를 상태값에 저장
  setSelectedSpaceId(spaceId); // 선택한 질문의 스페이스 ID를 상태값에 저장
  setSelectedUserId(userId); // 선택한 질문의 유저 ID를 상태값에 저장
  a_setDelModal(true);
};


  // 삭제 팝업  닫기
  const onClose = () => {
    setDelModal(false);
    setDelete(false);
    a_setDelModal(false);
  };


  // 클릭한 질문에 대한 공유하기 상태값 변경
  const clickMore_s = (index) => {
    setShareStates((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = !newStates[index];
      return newStates;
    });
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


  const onClickCopy = (questionId, spaceId) => {
    setShareStates("");
    navigator.clipboard.writeText(`localhost:3000/spaces/${spaceId}/#sent/${questionId}`);
    alert("링크가 복사 되었습니다");
  };

  return (
    <>
      {sentComments.length === 0 && <p>첫 질문을 보내 보세요👻</p>}
      {sentComments
        .slice()
        .reverse()
        .filter(sent => {
          // 현재 로그인한 유저가 질문 보낸 유저가 아니라면
          if (currentUserInfo.userId !== sent.sendingUserId) {
            // isAnonymous가 false인 sent만 반환
            return sent.isAnonymous === false;
          }
          return true;
        })
        .map((sent, index) => (


          <React.Fragment key={sent.id}>
    
            <div className="commentWrap questionWrap">
              <div className="profileArea">
                <img
                  src={sent.sentUserPic}
                  alt="profile1"
                  className="questioner"
                />
              </div>

              <div className="cnt">
                <p className="Nicname">{sent.userId}</p>
                <p className="min">{getTimeDifference(sent.createdTime)}</p>
                <p className="commentCnt"> {sent.questionText} </p>
                <div className="heart">
                  <img src={heart} alt="하트" onClick={clickHeart} />
                </div>

                <div className="more">
                  <img src={More} alt="more" onClick={() => clickMore(index)} />
                  {deleteStates[index] && (
                    <div
                      className="del"
                      onClick={() =>
                        showDelModal(sent.id, spaceId, currentUserInfo.userId)
                      }
                    >
                      <p>
                        <img src={Bin} alt="btin" />
                        삭제하기
                      </p>
                    </div>
                  )}
                </div>

                <div className="share">
                  <img src={Share} alt="share" onClick={() => clickMore_s(index)}  />
                  {shareStates[index] && (
                    <div className="sharePopup">
                      <p onClick={() => onClickCopy(sent.id, spaceId)}>
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
                  src={sent.receivedUserPic}
                  alt="profile2"
                  className="respondent"
                />
              </div>
              <div className="cnt">
                <p className="Nicname">{sent.receivedUserName}</p>

                {sent.answers.length === 0 ? (
                  <UntilAnswering></UntilAnswering>
                ) : (
                  <>
                    <p className="min">
                      {getTimeDifference(sent.answers[0].createdTime)}
                    </p>
                    <AnonymousAnswer
                      question={sent}
                      answers={sent.answers}
                      currentUserInfo={currentUserInfo}
                    />
                  </>
                )}
                <div className="heart">
                  <img src={good} alt="good" onClick={clickGood} />
                </div>

                {sent.answers.length === 0 ? (
                  ""
                ) : (
                  <>
                    <div className="more">
                      <img
                        src={More}
                        alt="more"
                        onClick={() => clickMore_1(index)}
                      />
                      {a_deleteStates[index] && (
                        <div
                          className="del"
                          onClick={() =>
                            a_showDelModal(
                              sent.answers[0].id,
                              spaceId,
                              currentUserInfo.userId
                            )
                          }
                        >
                          <p>
                            <img src={Bin} alt="btin" />
                            삭제하기
                          </p>
                        </div>
                      )}
                    </div>
                  </>
                )}

              </div>



              {/* 질문 삭제하기 팝업  */}
              {delModal && (
                <Delete
                  questionId={selectedQuestionId}
                  spaceId={selectedSpaceId} // 스페이스 ID 전달
                  userId={selectedUserId} // 유저 ID 전달
                  onClose={onClose}
                ></Delete>
              )}

              {/* 답변 삭제하기 팝업  */}
              {a_delModal && (
                <ADelete
                  answerId={selectedAnswerId}
                  spaceId={selectedSpaceId} // 스페이스 ID 전달
                  userId={selectedUserId} // 유저 ID 전달
                  onClose={onClose}
                ></ADelete>
              )}
            </div>
          </React.Fragment>
        ))}
    </>
  );
}

export default SendComment;


// 질문 등록 시간과 현재 시간 사이의 차이를 계산하는 함수
function getTimeDifference(createdTime) {
  return moment(createdTime).locale("ko").fromNow();
}