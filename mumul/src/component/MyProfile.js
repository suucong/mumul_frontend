import React, { useEffect, useState } from "react";
import ProfileEdit from "../component/popup/ProfileEdit";
import MyprofileImg from "../img/Ellipse 104.png";
import InstaLogo from "../img/icon/instaLogo.jpeg";
import CloseIcon from "../img/icon/close.png"; 
import { getFollowingNumber } from "../api/getFollowingNumber";
import { getFollwerNumber } from "../api/getFollowerNumber";


function MyProfile({ userId, name, picture, introduce, instaId, link, followSelected, setFollowSelected }) {
  const [modal, setModal] = useState(false);
  const [followingNumber, setFollowingNumber] = useState(null);
  const [followerNumber, setFollowerNumber] = useState(null);

  const onClickEdit = () => {
    setModal(true);
  };

  const onClose = () => {
    setModal(false);
  };

  const onClickFollowing = () => {
    setFollowSelected(true);
    console.log(followSelected);
  }

  const onClickFollower = () => {
    setFollowSelected(false);
    console.log(followSelected);
  }

  useEffect(() => {
    getFollowingNumber(userId)
      .then((result) => {
        setFollowingNumber(result);
      })
      .catch((error) => {
        console.error('getFollowingNumber Error: ', error.message);
      });
    getFollwerNumber(userId)
      .then((result) => {
        setFollowerNumber(result);
      })
      .catch((error) => {
        console.error('getFollowerNumber Error: ', error.message)
      })
  }, [userId]);

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
          <p className={`follower ${followSelected ? 'followerGray' : ''}`} onClick={onClickFollower}>
            팔로워 <span className="num">{followerNumber}</span>
          </p>
          <p className={`following ${followSelected ? '' : 'followingGray'}`} onClick={onClickFollowing}>
            팔로잉 <span className="num">{followingNumber}</span>
          </p>
        </div>
      </div>
      {modal && <ProfileEdit onClose={onClose} name={name} picture={picture} instaId={instaId} introduce={introduce} userId={userId} link={link}></ProfileEdit>}
    </div>
  );
}

export default MyProfile;
