import React from "react";
import Close from "../../img/icon/close.png";

function Delete({ onClose }) {
  return (
    <div className="popupWrap">
      <div className="popup">
        <div className="popupContainer">
          <div className="popupHeader">
            <img src={Close} alt="close" onClick={onClose} />
          </div>
          <div className="popupContent delPopup">
            <p className="popupTitle">정말로 삭제를 원하시나요?</p>
            <p className="subTitle">
              데이터는 즉시 삭제되어 복구 불가능합니다.
            </p>
          </div>
          <div className="popupFooter">
            <button className="btnRed">삭제</button>
            <button className="btnCancel" onClick={onClose}>
              취소
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Delete;
