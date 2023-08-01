import React from "react";
import Close from "../../img/icon/close.png";

const MobileBrowser = ({ onClose }) =>  {
  return (
    <div className="popupWrap">
      <div className="popup">
        <div className="popupContainer_">
          <div className="popupHeader">
            <img src={Close} alt="close" onClick={onClose} />
          </div>
          <div className="popupContent delPopup">
            <p className="popupTitle">🏃‍♀️외부 브라우저로 이동해야 합니다🏃‍♀️</p>
            <p className="subTitle">
             구글의 보안 정책으로 인해 인앱 브라우저에서는 구글 로그인이 허용되지 않습니다.<br/>
             카카오톡 로그인을 이용해주세요!
            </p>
          </div>
          <div className="popupFooter">
            <button className="btnOk" onClick={onClose}>
              네, 알겠습니다.
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default MobileBrowser;