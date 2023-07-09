import React, { useEffect, useState } from "react";
import Header from "../component/Header";
import NoneMember from "../component/popup/NoneMember";
import { getUserInfo } from "../api/getUserInfo";
import { putStopSpace } from "../api/User/putStopSpace";
import { putAlertSpace } from "../api/User/putAlertSpace"; 

function Setting({isLogin, setIsLogin}) {
  const [settingModal, setSettingModal] = useState(false);
  const [currentUserInfo, setCurrentUserInfo] = useState({
    userId: '',
    picture: '',
    name: '',
    email: '',
    introduce: '',
    instaId: '',
    link: '',
    stopSpace: false,
    alertSpace: false,
  });

  useEffect(() => {
    const getCurrentUserInfo = async () => {
      const token = localStorage.getItem('token');
      
      if(token !== null) {
        const userInfo = await getUserInfo();
        setCurrentUserInfo(userInfo);
      }
    };
    getCurrentUserInfo();
  }, []);

  const onOpenModal = () => {
    setSettingModal(true);
  };

  const onClose = () => {
    setSettingModal(false);
  };

  const handleSwitchToggle = async () => {
    try {
      await putStopSpace(currentUserInfo.userId, !currentUserInfo.stopSpace);
      setCurrentUserInfo(prevState => ({
        ...prevState,
        stopSpace: !prevState.stopSpace
      }));
    } catch (error) {
      console.error("Error toggling stopSpace:", error);
    }
  };

  const handleAlertSwitchToggle = async () => {
    try {
      await putAlertSpace(currentUserInfo.userId, !currentUserInfo.alertSpace);
      setCurrentUserInfo(prevState => ({
        ...prevState,
        alertSpace: !prevState.alertSpace
      }));
    } catch (error) {
      console.error("Error toggling stopSpace:", error);
    }
  };
  

  return (
    <div className="wrap">
      <Header isLogin={isLogin} setIsLogin={setIsLogin} currentUserInfo={currentUserInfo} onChange={handleSwitchToggle}></Header>
      <div className="contentWrap setting">
        <div className="switchWrap">
          <div>
            <p className="label">이메일 알림</p>
            <p>질문, 답변이 도착하면 아래 이메일로 알려줘요</p>
            <p className="email">{currentUserInfo.email}</p>
          </div>
          <div className="switch">
            <label className="switch">
              <input type="checkbox" checked={currentUserInfo.alertSpace} onChange={handleAlertSwitchToggle}/>
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
              <input type="checkbox" checked={currentUserInfo.stopSpace} onChange={handleSwitchToggle}/>
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
      {settingModal && <NoneMember currentUserInfo={currentUserInfo} onClose={onClose}></NoneMember>}
    </div>
  );
}

export default Setting;
