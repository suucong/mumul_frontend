import React, { useState, useEffect } from "react";
import QuestionRegister from "./popup/QuestionRegister";
import InstaLogo from "../img/icon/instaLogo.jpeg";

import { postFollow } from "../api/postFollow";
import { postUnFollow } from "../api/postUnFollow";
import { getIsFollow } from "../api/getIsFollow";
import { getUserInfo } from "../api/getUserInfo";
import { getFollowingNumber } from "../api/getFollowingNumber";
import { getFollwerNumber } from "../api/getFollowerNumber";

function QuestionerProfile({info, spaceId, currentUserId, name, picture, currentUserInfo, followSelected, setFollowSelected }) {
  const [queModal, setQueModal] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followingNumber, setFollowingNumber] = useState(null);
  const [followerNumber, setFollowerNumber] = useState(null);
  const [userInfo, setUserInfo] = useState({
    userId: '',
  });

  const onClickFollowing = () => {
    setFollowSelected(true);
    console.log(followSelected);
  }

  const onClickFollower = () => {
    setFollowSelected(false);
    console.log(followSelected);
  }

  useEffect(() => {
    const initUserInfo = async () => {
      const currentUserInfo = await getUserInfo();
      setUserInfo(currentUserInfo);
    };
    initUserInfo();
    getIsFollow(spaceId, currentUserId)
      .then((result) => {
        setIsFollowing(result);
      })
      .catch((error) => {
        console.error('getIsFollow Error: ', error.message);
      });

    getFollowingNumber(spaceId)
      .then((result) => {
        setFollowingNumber(result);
      })
      .catch((error) => {
        console.error('getFollowingNuber Error: ', error.message);
      });

    getFollwerNumber(spaceId)
      .then((result) => {
        setFollowerNumber(result);
      })
      .catch((error) => {
        console.error('getFollowerNumber Error: ', error.message);
      }) 
  }, [spaceId, currentUserId, followSelected]);

  const showQueModal = () => {
    if (userInfo.userId === undefined) {
      alert('로그인 하세요.');
      return;
    }
    setQueModal(true);
  };

  const onClose = () => {
    setQueModal(false);
  };


  const toggleFollowing = () => {
    if (userInfo.userId === undefined) {
      alert('로그인 하세요.');
      return;
    }
    if(isFollowing) {
      // 언팔로우
      postUnFollow(spaceId, currentUserId);
    } else {
      postFollow(spaceId, currentUserId);
    }
    setIsFollowing(!isFollowing);
  };

  return (
    <>
      <div className="myProfileWrap">
        <div className="profile">
          <img src={picture} alt="myprofile" />
          <div className="QueBtnWrap">
          {isFollowing ? (
              <button className="followingBtn" onClick={toggleFollowing}>
                팔로잉
              </button>
            ) : (
              <button className="followBtn" onClick={toggleFollowing}>
                팔로우
              </button>
            )}
            <button className="QueBtn" onClick={showQueModal}>
              무물하기
            </button>
          </div>
        </div>
        <div className="myInfo">
          <p className="id">
            {name}
            <span className="intro">맑은 공기 맑은 정신</span>
          </p>
          <p className="snsLink">
            <img src={InstaLogo} alt="instaLogo" />
            <a href="https://www.instagram.com/2ruka_/" target="_blank">
              <span>https://www.instagram.com/2ruka_/</span>
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
      </div>
      {queModal && <QuestionRegister info={info} currentUserInfo={currentUserInfo} onClose={onClose}></QuestionRegister>}
    </>
  );
}

export default QuestionerProfile;