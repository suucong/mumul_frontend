import React, { useState, useEffect } from "react";
import Close from "../../img/icon/close.png";
import tokki1 from "../../img/Ellipse 102.png";
import tokki2 from "../../img/Ellipse 103.png";
import tokki3 from "../../img/Ellipse 104.png";
import tokki4 from "../../img/Ellipse 105.png";
import tokki5 from "../../img/Ellipse 106.png";
import tokki6 from "../../img/Ellipse 107.png";
import tokki7 from "../../img/Ellipse 108.png";
import tokki8 from "../../img/Ellipse 109.png";
import tokki9 from "../../img/Ellipse 110.png";
import tokki10 from "../../img/Ellipse 111.png";
import { useParams } from "react-router-dom";
import { createQuestion } from "../../api/Q&A/createQuestion";

function QuestionRegister({ info, currentUserInfo, onClose }) {
  const { id } = useParams();
  let [inputCount, setInputCount] = useState(0);
  const [btn, setBtn] = useState(true);
  const [questionText, setQuestionText] = useState(""); // 질문 텍스트를 저장하기 위한 state 변수
  const [randomImage, setRandomImage] = useState(""); // 랜덤 이미지를 저장하기 위한 state 변수

  useEffect(() => {
    randomizeImage();
  }, [btn]);

  const clickOpenBtn = () => {
    setBtn(!btn);
    randomizeImage();
  };

  const randomizeImage = () => {
    const tokkiImages = [tokki1, tokki2, tokki3, tokki4, tokki5, tokki6, tokki7, tokki8, tokki9, tokki10];
    if (btn) {
      const randomIndex = Math.floor(Math.random() * tokkiImages.length);
      setRandomImage(tokkiImages[randomIndex]);
    } else {
      setRandomImage(currentUserInfo.picture);
    }
  };


  const onTextareaHandler = (e) => {
    setInputCount(e.target.value.length);
    setQuestionText(e.target.value);
  };

  // 질문 등록하는 API
  const registerQuestion = async () => {
    try {
      await createQuestion(info, id, currentUserInfo, questionText, btn,randomImage);
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
                <img src={randomImage} alt="profile" />
              </div>
              <div>
                {btn ? (
                  <>
                    <p className="myId">익명의 토끼</p>
                    <button className="openBtn" onClick={clickOpenBtn}>
                     🐰 토끼로 녹아들기
                    </button>
                  </>
                ) : (
                  <>
                    <p className="myId">{currentUserInfo.name}</p>
                    <button className="openBtn" onClick={clickOpenBtn}>
                     👤 공개 무물하기
                    </button>
                  </>
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