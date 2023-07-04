import React, { useState, useEffect } from "react";
import QuestionRegister from "./popup/QuestionRegister";
import InstaLogo from "../img/icon/instaLogo.jpeg";

import { postFollow } from "../api/postFollow";
import { postUnFollow } from "../api/postUnFollow";
import { getIsFollow } from "../api/getIsFollow";

function QuestionerProfile({info, spaceId, currentUserId, name, picture, currentUserInfo, token }) {
  const [queModal, setQueModal] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  useEffect(() => {
    getIsFollow(spaceId, currentUserId)
      .then((result) => {
        setIsFollowing(result);
        setIsFollowing(result);
      })
      .catch((error) => {
        console.error('getIsFollow Error: ', error.message);
      });
  }, [spaceId, currentUserId]);

  const showQueModal = () => {
    setQueModal(true);
  };

  const onClose = () => {
    setQueModal(false);
  };

  const toggleFollowing = () => {
    if(isFollowing) {
      // 언팔로우
      postUnFollow(spaceId, currentUserId);
    } else {
      // 팔로우
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
            <p className="follower">
              팔로우 <span className="num">15</span>
            </p>
            <p className="following">
              팔로잉 <span className="num">15</span>
            </p>
          </div>
        </div>
      </div>
      {queModal && <QuestionRegister info={info} currentUserInfo={currentUserInfo} onClose={onClose} token={token}></QuestionRegister>}
    </>
  );
}

export default QuestionerProfile;