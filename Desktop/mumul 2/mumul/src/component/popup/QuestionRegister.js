import React, { useState } from "react";
import Close from "../../img/icon/close.png";
import Profile1 from "../../img/Ellipse 102.png";
function QuestionRegister({ onClose }) {
  let [inputCount, setInputCount] = useState(0);
  const [btn, setBtn] = useState(false);

  const clickOpenBtn = () => {
    setBtn(!btn);
  };

  const onTextareaHandler = (e) => {
    setInputCount(e.target.value.length);
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
                <img src={Profile1} alt="profile" />
              </div>
              <div>
                <p className="myId">stack-0-slack</p>
                {btn ? (
                  <button className="openBtn" onClick={clickOpenBtn}>
                    🔒공개 무물하기
                  </button>
                ) : (
                  <button className="openBtn" onClick={clickOpenBtn}>
                    🔒 토끼로 녹아 들기
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
            <button className="btnSave">남기기</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuestionRegister;
