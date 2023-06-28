import React, { useState } from "react";
import ProfileEdit from "../component/popup/ProfileEdit";
import MyprofileImg from "../img/Ellipse 104.png";
import InstaLogo from "../img/icon/instaLogo.jpeg";

function MyProfile() {
  const [modal, setModal] = useState(false);

  const onClickEdit = () => {
    setModal(true);
  };

  const onClose = () => {
    setModal(false);
  };

  return (
    <div className="myProfileWrap">
      <div className="profile">
        <img src={MyprofileImg} alt="myprofile" />
        <button className="editProfile" onClick={onClickEdit}>
          프로필수정
        </button>
      </div>
      <div className="myInfo">
        <p className="id">
          sliver-0-stack
          <span className="intro">개발합시다</span>
        </p>
        <p className="snsLink">
          <img src={InstaLogo} alt="instaLogo" />

          <a href="https://www.instagram.com/2ruka_/" target="_blank">
            <span>https://www.instagram.com/2ruka_/</span>
          </a>
        </p>
        <p className="mylink">
          <span>🔗</span>
          <a
            href="https://chatter-collar-f24.notion.site/3e70104e6d4d45b6b96c52e77664f067"
            target="_blank"
          >
            https://chatter-collar-f24.notion.site/3e70104e6d4d45b6b96c52e77664f067
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
      {modal && <ProfileEdit onClose={onClose}></ProfileEdit>}
    </div>
  );
}

export default MyProfile;
