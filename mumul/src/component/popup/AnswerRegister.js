import React, { useState } from "react";
import Close from "../../img/icon/close.png";
import Profile1 from "../../img/Ellipse 102.png";
import Profile2 from "../../img/Ellipse 103.png";

function AnswerRegister({ CloseAnswerModal }) {
  let [inputCount, setInputCount] = useState(0);
  const [btn, setBtn] = useState(false);

  const onTextareaHandler = (e) => {
    setInputCount(e.target.value.length);
  };
  const clickBtn = () => {
    setBtn(!btn);
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
                <img src={Profile2} alt="profile" className="questioner" />
              </div>
              <div>
                <p className="myId id">익명의 토끼</p>
                <p className="queCnt">
                  초심자도 정상에 오를 만한 노원의 산 알려주세요!
                </p>
              </div>
            </div>
            <div className="profile">
              <div>
                <img src={Profile1} alt="profile" className="respondent" />
              </div>
              <div>
                <p className="myId id">stack-0-slack</p>
                {btn ? (
                  <button className="openBtn" onClick={clickBtn}>
                    📢공개 답변
                  </button>
                ) : (
                  <button className="openBtn" onClick={clickBtn}>
                    🔒질문자에게만 보이는 답변
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
            <button className="btnSave">남기기</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnswerRegister;
