import React, { useState, useEffect } from "react";
import QuestionRegister from "./popup/QuestionRegister";
import Storyslide from "./Storyslide";

import { postFollow } from "../api/Follow/postFollow";
import { postUnFollow } from "../api/Follow/postUnFollow";
import { getIsFollow } from "../api/Follow/getIsFollow";
import { getIsFollower } from "../api/Follow/getIsFollower";
import { getFollowingNumber } from "../api/Follow/getFollowingNumber";
import { getFollwerNumber } from "../api/Follow/getFollowerNumber";
import { getFollowerList } from "../api/Follow/getFollowerList";

function QuestionerProfile({ spaceUserInfo, currentUserInfo, followSelected, setFollowSelected }) {
  const [queModal, setQueModal] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);
  const [followingNumber, setFollowingNumber] = useState(null);
  const [followerNumber, setFollowerNumber] = useState(null);
  const [followerList, setFollowerList] = useState([]);
  const [isCurrentUserFollowing, setIsCurrentUserFollowing] = useState(false);

  const onClickFollowing = () => {
    setFollowSelected(true);
  }

  const onClickFollower = () => {
    setFollowSelected(false);
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
      getIsFollower(spaceUserInfo.userId)
        .then((result) => {
          setIsCurrentUserFollowing(result);
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
      getFollowerList(spaceUserInfo.userId)
        .then((result) => {
          setFollowerList(result);
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


  const toggleFollowing = async () => {
    if (currentUserInfo.userId === '') {
      alert('로그인 하세요.');
      return;
    }
    if(isFollowing) {
      // 언팔로우
      await postUnFollow(spaceUserInfo.userId);
      const followerList_ = await getFollowerList(spaceUserInfo.userId);
      setFollowerList(followerList_);
      await getFollwerNumber(spaceUserInfo.userId)
      .then((result) => {
        setFollowerNumber(result);
      })
      .catch((error) => {
        console.error('getFollowerNumber Error: ', error.message);
      }) 
      // window.location.reload();
    } else {
      await postFollow(spaceUserInfo.userId);
      const followerList_ = await getFollowerList(spaceUserInfo.userId);
      setFollowerList(followerList_);
      await getFollwerNumber(spaceUserInfo.userId)
      .then((result) => {
        setFollowerNumber(result);
      })
      .catch((error) => {
        console.error('getFollowerNumber Error: ', error.message);
      }) 
      // window.location.reload();
    }
    setIsFollowing(!isFollowing);
  };

  return (
    <>
      <Storyslide spaceId={spaceUserInfo.userId} followSelected={followSelected} followerList={followerList}></Storyslide>
      <div className="myProfileWrap">
        <div className="profile">
          <img src={spaceUserInfo.picture} alt="myprofile" />
          <div className="QueBtnWrap">
          {spaceUserInfo.stopSpace ? null : (
            isFollowing ? (
              <button className="followingBtn" onClick={toggleFollowing}>
                팔로잉
              </button>
            ) : (
              <button className="followBtn" onClick={toggleFollowing}>
                팔로우
              </button>
            )
          )}
            {!spaceUserInfo.stopSpace && (
                  <button className="QueBtn" onClick={showQueModal}>
                    무물하기
                  </button>
                )}
          </div>
        </div>
        <div className="myInfo">
        <div className="id">
            <div>
              {spaceUserInfo.name}
              {isCurrentUserFollowing ? (
                <button className="followMeBtn">나를 팔로우함</button>
              ) : (
                ""
              )}
            </div>
            <div>
              <span className="intro">{spaceUserInfo.introduce}</span>
            </div>
          </div>
          {spaceUserInfo.instaId === "" || spaceUserInfo.instaId === null? (
            ""
          ) : (
            <div className="snsLink svg">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none" // Remove fill attribute to preserve transparency
                stroke="#2855c1"
                strokeWidth="2" // Set the stroke width (for icon shapes)
                strokeLinecap="round"
                strokeLinejoin="round"
                className="mr-1 h-5 w-5"
                // y="100" // Vertical offset to move the image downwards
              >
                {/* Your SVG path and shapes */}
                <rect
                  width="20"
                  height="20"
                  x="2"
                  y="2"
                  rx="5"
                  ry="5"
                  fill="none" // Set fill to "none" for transparent background
                ></rect>
                <path
                  d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"
                  fill="none" // Set fill to "none" for transparent background
                ></path>
                <line
                  x1="17.5"
                  x2="17.51"
                  y1="6.5"
                  y2="6.5"
                  fill="none" // Set fill to "none" for transparent background
                ></line>
              </svg>

              <a
                href={"https://www.instagram.com/" + spaceUserInfo.instaId}
                target="_blank"
                rel="noreferrer"
              >
                <div className="instaId">
                  @ <span>{spaceUserInfo.instaId}</span>
                </div>
              </a>
            </div>
          )}

          {spaceUserInfo.link === "" || spaceUserInfo.link === null? (
            ""
          ) : (
            <div className="mylink">
              <span>🔗</span>
              <a href={spaceUserInfo.link} target="_blank" rel="noreferrer">
                {spaceUserInfo.link}
              </a>
            </div>
          )}
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