import React, { useState } from "react";
import Close from "../../img/icon/close.png";
import { deleteUser } from "../../api/User/deleteUser";
import { useNavigate } from "react-router-dom";

function NoneMember({ onClose, currentUserInfo, setIsLogin }) {
  const navigate = useNavigate();
  const [active, setActive] = useState(true);

  const onChange = (e) => {
    if (e.target.value === "회원탈퇴") {
      setActive(false);
    } else {
      setActive(true);
    }
  };

  const handleWithdrawal = () => {
    if (!active) {
      deleteUser(currentUserInfo.userId);
      setIsLogin(false);
      navigate("/");
      window.location.reload(); 
    }
  };

  return (
    <div className="popupWrap">
      <div className="popup">
        <div className="popupContainer">
          <div className="popupHeader">
            <img src={Close} alt="close" onClick={onClose} />
          </div>
          <div className="popupContent noneMember">
            <p className="popupTitle">정말로 탈퇴하시겠습니까?</p>
            <p className="subTitle">
              아래에 '회원탈퇴' 라고 입력한 뒤 진행해 주세요
            </p>
            <div className="inputArea">
              <input type="text" placeholder="회원탈퇴" onChange={onChange} />
            </div>
          </div>
          <div className="popupFooter">
              <button className={active ? "btnStorke" : "btnRed"} onClick={handleWithdrawal}>
                회원탈퇴
              </button>
            <button className="btnCancel" onClick={onClose}>
              취소
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NoneMember;
