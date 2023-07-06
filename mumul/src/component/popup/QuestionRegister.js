import React, { useState, useEffect } from "react";
import Close from "../../img/icon/close.png";
import Profile1 from "../../img/Ellipse 102.png";
import axios from "axios"; // Import axios for making API requests
import { useParams } from "react-router-dom";
import { getSpaceInfo } from "../../api/getSpaceInfo";
import { createQuestion } from "../../api/Q&A/createQuestion";
import { Comment } from "../Comment";

function QuestionRegister({info, currentUserInfo, onClose }) {
  const { id } = useParams();
  let [inputCount, setInputCount] = useState(0);
  const [btn, setBtn] = useState(true);
  const [questionText, setQuestionText] = useState(""); // 질문 텍스트를 저장하기 위한 state 변수

  const clickOpenBtn = () => {
    setBtn(!btn);
  };

  const onTextareaHandler = (e) => {
    setInputCount(e.target.value.length);
    setQuestionText(e.target.value);
  };

  // 질문 등록하는 API
  const registerQuestion = async () => {
    try {
      await createQuestion(info, id, currentUserInfo, questionText, btn);
      onClose(); // 질문 등록 후 팝업을 닫습니다.
      window.location.reload();
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error("로그인이 필요합니다.");
        // 로그인이 필요한 경우에 대한 처리를 추가합니다.
      } else {
        console.error("질문 등록에 실패함:", error);
        // 필요한 에러 처리 로직을 추가합니다.
      }
    }
  };

  return (
    <div className="popupWrap">
      <div className="popup registerPopup">
        <div className="popupContainer">
          <div className="popupHeader">
            <img src={Close} alt="close" onClick={onClose} />
          </div>
          <div className="popupContent">
            <div className="profile">
              <div>
                <img src={currentUserInfo.picture} alt="profile" />
              </div>
              <div>
                <p className="myId">{currentUserInfo.name}</p>
                {btn ? (
                  <button className="openBtn" onClick={clickOpenBtn}>
                    🔒 토끼로 녹아 들기
                  </button>
                ) : (
                  <button className="openBtn" onClick={clickOpenBtn}>
                    🔓 공개 무물하기
                  </button>
                )}
              </div>
            </div>
            <div className="text">
              <textarea maxLength="500" onChange={onTextareaHandler} />
            </div>
          </div>
          <div className="popupFooter">
            <p className="countNum">
              <span>{inputCount}</span>
              <span>/500</span>
            </p>
            <button className="btnSave" onClick={registerQuestion}>
              남기기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuestionRegister;