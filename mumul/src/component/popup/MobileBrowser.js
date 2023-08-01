import React from "react";
import Close from "../../img/icon/close.png";

const MobileBrowser = ({ onClose }) =>  {
  const handleOpenInBrowser = () => {
    const externalUrl = "https://mumul.space"; // 외부 링크 URL
    window.open(externalUrl, "_system"); // 인앱 브라우저 대신 시스템의 기본 브라우저로 이동
  };
  return (
    <div className="popupWrap">
      <div className="popup">
        <div className="popupContainer">
          <div className="popupHeader">
            <img src={Close} alt="close" onClick={onClose} />
          </div>
          <div className="popupContent delPopup">
            <p className="popupTitle">🏃‍♀️외부 브라우저로 이동해야 합니다🏃‍♀️</p>
            <p className="subTitle">
             인앱 브라우저에서는 구글 로그인이 허용되지 않습니다.
            </p>
          </div>
          <div className="popupFooter">
            <button className="btnOk" onClick={handleOpenInBrowser}>
              네, 이동합니다
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
export default MobileBrowser;