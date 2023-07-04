import React, { useState } from "react";
import Close from "../../img/icon/close.png";
import Profile1 from "../../img/Ellipse 102.png";
import Profile2 from "../../img/Ellipse 103.png";
import { useParams } from "react-router-dom";
import {createAnswer} from "../../api/createAnswer";

function AnswerRegister({ CloseAnswerModal , currentUserInfo, questionId, sentUserId, sentUserPic, questionText}) {

  console.log("questionId: "+ questionId);

  const { id } = useParams();
  let [inputCount, setInputCount] = useState(0);
  const [btn, setBtn] = useState(true);
  //답변 텍스트를 저장하기 위한 state 변수
  const [answerText, setAnswerText] = useState("");


  const onTextareaHandler = (e) => {
    setInputCount(e.target.value.length);
    setAnswerText(e.target.value);
  };
  const clickBtn = () => {
    setBtn(!btn);
  };

    // 답변 등록하는 API
  const registerAnswer = async () => {
    try {
      await createAnswer(id, currentUserInfo, answerText, btn, questionId);
      CloseAnswerModal(); // 질문 등록 후 팝업을 닫습니다.
      window.location.reload();
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error("로그인이 필요합니다.");
        // 로그인이 필요한 경우에 대한 처리를 추가합니다.
      } else {
        console.error("답변 등록에 실패함:", error);
        // 필요한 에러 처리 로직을 추가합니다.
      }
    }
  };

  return (
    <div className="popupWrap">
      <div className="popup registerPopup">
        <div className="popupContainer">
          <div className="popupHeader">
            <img src={Close} alt="close" onClick={CloseAnswerModal} />
          </div>
          <div className="popupContent">
            <div className="profile que">
              <div>
                <img src={sentUserPic} alt="profile" className="questioner" />
              </div>
              <div>
                <p className="myId id">{sentUserId}</p>
                <p className="queCnt">
                  {questionText}
                </p>
              </div>
            </div>
            <div className="profile">
              <div>
                <img src={currentUserInfo.picture} alt="profile" className="respondent" />
              </div>
              <div>
                <p className="myId id">{currentUserInfo.name}</p>
                {btn ? (
                  <button className="openBtn" onClick={clickBtn}>
                  🔒질문자에게만 보이는 답변
                </button>
                ) : (
                  <button className="openBtn" onClick={clickBtn}>
                  📢공개 답변
                </button>
                )}
              </div>
            </div>
            <div className="text">
              <textarea maxLength="500" onChange={onTextareaHandler}></textarea>
            </div>
          </div>
          <div className="popupFooter">
            <p className="countNum">
              <span>{inputCount}</span>
              <span>/500</span>
            </p>
            <button className="btnSave" onClick={registerAnswer}>남기기</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnswerRegister;
