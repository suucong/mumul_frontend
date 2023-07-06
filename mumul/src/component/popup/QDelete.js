import React from "react";
import Close from "../../img/icon/close.png";
import { deleteQuestion } from "../../api/Q&A/deleteQuestion";

function QDelete({ questionId,  onClose , spaceId, userId}) {

  
    const delete_ = async () => {
      try {
        await deleteQuestion(spaceId, questionId, userId);
        onClose(); // 질문 삭제 후 팝업을 닫습니다.
        window.location.reload();
      } catch (error) {
        if (error.response && error.response.status === 401) {
          console.error("로그인이 필요합니다.");
          // 로그인이 필요한 경우에 대한 처리를 추가합니다.
        } else {
          console.error("질문 삭제에 실패함:", error);
          // 필요한 에러 처리 로직을 추가합니다.
        }
      }
    };


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
            <button className="btnRed" onClick={delete_}>삭제</button>
            <button className="btnCancel" onClick={onClose}>
              취소
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QDelete;
