import React, { useState } from "react";
import ProfileEdit from "../component/popup/ProfileEdit";
import MyprofileImg from "../img/Ellipse 104.png";
import InstaLogo from "../img/icon/instaLogo.jpeg";
import CloseIcon from "../img/icon/close.png"; 

function MyProfile({ userId, name, picture, introduce, instaId, link }) {
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
        <img src={picture} alt="myprofile" />
        <button className="editProfile" onClick={onClickEdit}>
          프로필수정
        </button>
      </div>
      <div className="myInfo">
        <p className="id">
          {name}
          <span className="intro">{introduce}</span>
        </p>
        <p className="snsLink">
          <img src={InstaLogo} alt="instaLogo" />

          <a href={'https://www.instagram.com/' + instaId} target="_blank">
            <span>{instaId}</span>
          </a>
        </p>
        <p className="mylink">
          <span>🔗</span>
          <a
            href={link}
            target="_blank"
          >
            {link}
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
      {modal && <ProfileEdit onClose={onClose} name={name} picture={picture} instaId={instaId} introduce={introduce} userId={userId} link={link}></ProfileEdit>}
    </div>
  );
}

export default MyProfile;
