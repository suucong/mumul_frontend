import React, { useRef, useState } from "react";
import Close from "../../img/icon/close.png";
import MyprofileImg from "../../img/Ellipse 104.png";

function ProfileEdit({ onClose }) {
  const imageInput = useRef();

  const onClickInput = () => {
    imageInput.current.click();
  };

  return (
    <div className="popupWrap">
      <div className="popup">
        <div className="popupContainer">
          <div className="popupHeader">
            <img src={Close} alt="close" onClick={onClose} />
          </div>
          <div className="profilePopup">
            <div className="profileArea">
              <img src={MyprofileImg} alt="myprofile" />
              <span className="editTxt" onClick={onClickInput}>
                Edit
              </span>

              <input
                type="file"
                accept="image/*"
                ref={imageInput}
                className="fileInput"
              />
            </div>
            <div className="inputWrap">
              <div>
                <label for="Nickname">닉네임</label>
                <input type="text" id="Nickname" />
                <label for="introduce">소개</label>
                <input type="text" id="introduce" />
                <label for="sns">SNS 링크</label>
                <input type="text" id="sns" />
                <label for="link">링크</label>
                <input type="text" id="link" />
              </div>
              <div className="btn">
                <button className="editProfile active">수정하기</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileEdit;
