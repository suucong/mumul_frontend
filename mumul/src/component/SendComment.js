import React, { useState, useEffect, useRef } from "react";

import More from "./../img/icon/icMore.png";
import Bin from "./../img/icon/icBin.png";
import { getSpaceInfo } from "../api/getSpaceInfo";
import Delete from "./popup/QDelete";
import ADelete from "./popup/ADelete";
import { getSentComment } from "../api/Q&A/getSentComment"; 
import UntilAnswering from "./UntilAnswering";
import AnonymousAnswer from "./AnonymousAnswer";
import moment from "moment";
import "moment/locale/ko"; // 한국어 
import AnswerBtn from "./AnswerButton";
import Profile2 from "./../img/Ellipse 104.png";
import Loading from "./Loading";
import { getPSentComment } from "../api/Q&A/getPSentComment";

function SendComment({ spaceId, info, currentUserInfo }) {
  const [page, setPage] = useState(0);  // 페이지 번호 상태값 추가 
  const [pageSize, setPageSize] = useState(5);     // 페이지 크기 상태값 추가 
  const [loading, setLoading] = useState(false);    // 로딩 상태값 추가 
  const [allDataFetched, setAllDataFetched] = useState(false);    // 모든 데이터를 가져왔는지 여부를 나타내는 상태값 추가 
  const [fetchingMoreData, setFetchingMoreData] = useState(false);
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

  // 선택한 질문의 고유 ID를 상태값에 저장
  const [selectedQuestionId, setSelectedQuestionId] = useState([]);
  // 선택한 답변의 고유 ID를 상태값에 저장
  const [selectedAnswerId, setSelectedAnswerId] = useState([]);
  const [selectedSpaceId, setSelectedSpaceId] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState([]);
  // 질문 삭제 상태값
  const [deleteStates, setDeleteStates] = useState({});

  const fetchData = async (isInitialFetch = true) => {
    try {
      setLoading(true);

      // isInitialFetch가 true일 경우에만 페이지 번호를 초기화
      if (isInitialFetch) {
        setPage(0);
      }

      const spaInfo = await getSpaceInfo(spaceId);
      const response = await getPSentComment(spaceId, page, pageSize);

      const newComments = isInitialFetch
        ? response.data
        : [...sentComments, ...response.data];
      setSentComments(newComments);
      setSpaceOwner(spaInfo);

      // deleteStates 배열을 모든 질문에 대해 초기화
      const initialDeleteStates = newComments.map(() => false);
      setDeleteStates(initialDeleteStates);
      a_setDeleteStates(initialDeleteStates);
      setShareStates(initialDeleteStates);

      // 모든 데이터를 불러온 경우에는 더 이상 데이터를 불러오지 않도록 설정
      if (response.data.length === 0) {
        setAllDataFetched(true);
      }

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Error fetching data: ", error);
    }
  };

  const spinnerRef = useRef(null);

  useEffect(() => {
    fetchData();
  }, [spaceId, pageSize]);

  useEffect(() => {
    const fetchDataOnScroll = async () => {
      if (fetchingMoreData || allDataFetched) {
        return;   // 이미 데이터를 불러오는 중이거나 모든 데이터를 불러왔으면 종료
      }
      setFetchingMoreData(true);
      const response = await getPSentComment(spaceId, page + 1, pageSize);
      setFetchingMoreData(false);

      if (response.data.length === 0) {
        setAllDataFetched(true);
        return;
      }

      setSentComments((prevData) => [
        ...prevData,
        ...response.data.map((item) => ({ ...item, key: item.id})),
      ]);
      setPage((prevPage) => prevPage + 1);
    };

    const observer = new IntersectionObserver(async (entries) => {
      const [entry] = entries;
      if (entry.isIntersecting) {
        await fetchDataOnScroll();
      }
    });

    observer.observe(spinnerRef.current);

    return () => {
      observer.disconnect();
    }
  }, [spinnerRef, page, pageSize, allDataFetched, fetchingMoreData]);


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

  return (
    <>
      {sentComments.length === 0 && <>
      <div className="commentWrap questionWrap">
        <div className="profileArea">
          <img src={spaceOwner.picture} alt="profile1" className="questioner" />
        </div>
        <div className="cnt">
          <p className="Nicname">익명의 토끼</p>
          <p className="min">20분 전🔒</p>
          <p className="commentCnt">
            보낸 질문이 없어요! 새로운 질문을 작성해주세요!
          </p>
        </div>
      </div>
      <div className="commentWrap answerWrap">
        <div className="profileArea">
          <img src={Profile2} alt="profile2" className="respondent" />
        </div>
        <div className="cnt">
          <AnswerBtn></AnswerBtn>
        </div>
      </div>
      </>}
      {sentComments
        .slice()
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
        {loading && <Loading/>}
        <div ref={spinnerRef}/>
    </>
  );
}

export default SendComment;


// 질문 등록 시간과 현재 시간 사이의 차이를 계산하는 함수
function getTimeDifference(createdTime) {
  return moment(createdTime).locale("ko").fromNow();
}