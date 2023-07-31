import React, { useEffect, useState } from "react";
import ProfileEdit from "../component/popup/ProfileEdit";
import InstaLogo from "../img/icon/instaLogo.jpeg";
import { getFollowingNumber } from "../api/Follow/getFollowingNumber";
import { getFollwerNumber } from "../api/Follow/getFollowerNumber";
import { getFollowerList } from "../api/Follow/getFollowerList";
import Storyslide from "./Storyslide";


function MyProfile({ currentUserInfo, followSelected, setFollowSelected }) {
  const [modal, setModal] = useState(false);
  const [followingNumber, setFollowingNumber] = useState(null);
  const [followerNumber, setFollowerNumber] = useState(null);
  const [followerList, setFollowerList] = useState([]);

  const onClickEdit = () => {
    setModal(true);
  };

  const onClose = () => {
    setModal(false);
  };

  const onClickFollowing = () => {
    setFollowSelected(true);
  }

  const onClickFollower = () => {
    setFollowSelected(false);
  }

  useEffect(() => {
    if(currentUserInfo.userId === '' || currentUserInfo.userId === undefined) {
      return;
    } else {getFollowingNumber(currentUserInfo.userId)
      .then((result) => {
        setFollowingNumber(result);
      })
      .catch((error) => {
        console.error('getFollowingNumber Error: ', error.message);
      });
    getFollwerNumber(currentUserInfo.userId)
      .then((result) => {
        setFollowerNumber(result);
      })
      .catch((error) => {
        console.error('getFollowerNumber Error: ', error.message)
      })
    getFollowerList(currentUserInfo.userId)
      .then((result) => {
        setFollowerList(result);
      })
      .catch((error) => {
        console.error('getFollowerList Error: ', error.message);
      })
    }
  }, [currentUserInfo.userId]);

  return (
    <>
    <Storyslide spaceId={currentUserInfo.userId} followSelected={followSelected} followerList={followerList}></Storyslide>
    <div className="myProfileWrap">
      <div className="profile">
        <img src={currentUserInfo.picture} alt="myprofile" />
        <button className="editProfile" onClick={onClickEdit}>
          프로필수정
        </button>
      </div>
      <div className="myInfo">
        <div>
          <p className="id">
            {currentUserInfo.name}
          </p>
        </div>
        <div>
          <p className="id">
            <span className="intro">{currentUserInfo.introduce}</span>
          </p>
        </div>
        <p className="snsLink">
          <img src={InstaLogo} alt="instaLogo" />

          <a href={'https://www.instagram.com/' + currentUserInfo.instaId} target="_blank" rel="noreferrer">
            <span>{currentUserInfo.instaId}</span>
          </a>
        </p>
        <p className="mylink">
          <span>🔗</span>
          <a
            href={currentUserInfo.link}
            target="_blank"
            rel="noreferrer"
          >
            {currentUserInfo.link}
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
      {modal && <ProfileEdit onClose={onClose} currentUserInfo={currentUserInfo} ></ProfileEdit>}
    </div>
    </>
  );
}

export default MyProfile;
