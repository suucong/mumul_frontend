import React, { useState } from "react";

import MyprofileImg from "../img/Ellipse 105.png";
import InstaLogo from "../img/icon/instaLogo.jpeg";

import QuestionRegister from "./popup/QuestionRegister";

function QuestionerProfile() {
  const [queModal, setQueModal] = useState(false);

  const showQueModal = () => {
    setQueModal(true);
  };

  const onClose = () => {
    setQueModal(false);
  };
  return (
    <>
      <div className="myProfileWrap">
        <div className="profile">
          <img src={MyprofileImg} alt="myprofile" />
          <div className="QueBtnWrap">
            <button className="followingBtn">팔로잉</button>
            <button className="QueBtn" onClick={showQueModal}>
              무물하기
            </button>
          </div>
        </div>
        <div className="myInfo">
          <p className="id">
            Gold-0-stack
            <span className="intro">맑은 공기 맑은 정신</span>
          </p>
          <p className="snsLink">
            <img src={InstaLogo} alt="instaLogo" />

            <a href="https://www.instagram.com/2ruka_/" target="_blank">
              <span>https://www.instagram.com/2ruka_/</span>
            </a>
          </p>
          <div className="follow">
            <p className="follower">
              팔로워 <span className="num">15</span>
            </p>
            <p className="following">
              팔로잉 <span className="num">15</span>
            </p>
          </div>
        </div>
      </div>
      {queModal && <QuestionRegister onClose={onClose}></QuestionRegister>}
    </>
  );
}

export default QuestionerProfile;
