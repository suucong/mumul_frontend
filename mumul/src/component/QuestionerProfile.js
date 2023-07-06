import React, { useState, useEffect } from "react";
import QuestionRegister from "./popup/QuestionRegister";
import InstaLogo from "../img/icon/instaLogo.jpeg";

import { postFollow } from "../api/Follow/postFollow";
import { postUnFollow } from "../api/Follow/postUnFollow";
import { getIsFollow } from "../api/Follow/getIsFollow";
import { getFollowingNumber } from "../api/Follow/getFollowingNumber";
import { getFollwerNumber } from "../api/Follow/getFollowerNumber";

function QuestionerProfile({ spaceUserInfo, currentUserInfo, followSelected, setFollowSelected }) {
  const [queModal, setQueModal] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followingNumber, setFollowingNumber] = useState(null);
  const [followerNumber, setFollowerNumber] = useState(null);

  const onClickFollowing = () => {
    setFollowSelected(true);
    console.log(followSelected);
  }

  const onClickFollower = () => {
    setFollowSelected(false);
    console.log(followSelected);
  }

  useEffect(() => {
    if (currentUserInfo.userId !== '') {
      getIsFollow(spaceUserInfo.userId)
      .then((result) => {
        setIsFollowing(result);
      })
      .catch((error) => {
        console.error('getIsFollow Error: ', error.message);
      });
    }
    getFollowingNumber(spaceUserInfo.userId)
      .then((result) => {
        setFollowingNumber(result);
      })
      .catch((error) => {
        console.error('getFollowingNuber Error: ', error.message);
      });

    getFollwerNumber(spaceUserInfo.userId)
      .then((result) => {
        setFollowerNumber(result);
      })
      .catch((error) => {
        console.error('getFollowerNumber Error: ', error.message);
      }) 
  }, [currentUserInfo.userId, spaceUserInfo.userId, followSelected]);

  const showQueModal = () => {
    if (currentUserInfo.userId === '') {
      alert('로그인 하세요.');
      return;
    }
    setQueModal(true);
  };

  const onClose = () => {
    setQueModal(false);
  };


  const toggleFollowing = () => {
    if (currentUserInfo.userId === '') {
      alert('로그인 하세요.');
      return;
    }
    if(isFollowing) {
      // 언팔로우
      postUnFollow(spaceUserInfo.userId);
      window.location.reload();
    } else {
      postFollow(spaceUserInfo.userId);
      window.location.reload();
    }
    setIsFollowing(!isFollowing);
  };

  return (
    <>
      <div className="myProfileWrap">
        <div className="profile">
          <img src={spaceUserInfo.picture} alt="myprofile" />
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
            {!spaceUserInfo.stopSpace && (
                  <button className="QueBtn" onClick={showQueModal}>
                    무물하기
                  </button>
                )}
          </div>
        </div>
        <div className="myInfo">
          <p className="id">
            {spaceUserInfo.name}
            <span className="intro">{spaceUserInfo.introduce}</span>
          </p>
          <p className="snsLink">
            <img src={InstaLogo} alt="instaLogo" />
            <a href={'https://www.instagram.com/' + spaceUserInfo.instaId} target="_blank" rel="noreferrer">
              <span>{spaceUserInfo.instaId}</span>
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
      </div>
      {queModal && <QuestionRegister info={spaceUserInfo} currentUserInfo={currentUserInfo} onClose={onClose}></QuestionRegister>}
    </>
  );
}

export default QuestionerProfile;