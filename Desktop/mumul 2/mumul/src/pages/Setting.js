import React, { useState } from "react";
import Header from "../component/Header";
import NoneMember from "../component/popup/NoneMember";

function Setting() {
  const [settingModal, setSettingModal] = useState(false);

  const onOpenModal = () => {
    setSettingModal(true);
  };

  const onClose = () => {
    setSettingModal(false);
  };
  return (
    <div className="wrap">
      <Header></Header>
      <div className="contentWrap setting">
        <div className="switchWrap">
          <div>
            <p className="label">이메일 알림</p>
            <p>질문, 답변이 도착하면 아래 이메일로 알려줘요</p>
            <p className="email">dev.choiey@gmail.com</p>
          </div>
          <div className="switch">
            <label className="switch">
              <input type="checkbox" />
              <span className="slider round"></span>
            </label>
          </div>
        </div>
        <div className="switchWrap">
          <div>
            <p className="label">스페이스 일시 중지</p>
            <p>사람들로부터 질문을 받지 않아요</p>
          </div>
          <div className="switch">
            <label className="switch">
              <input type="checkbox" />
              <span className="slider round"></span>
            </label>
          </div>
        </div>
        <div>
          <p className="label">계정 관리</p>
          <button className="btnRed nonMemberBtn" onClick={onOpenModal}>
            회원 탈퇴
          </button>
        </div>
      </div>
      {settingModal && <NoneMember onClose={onClose}></NoneMember>}
    </div>
  );
}

export default Setting;
