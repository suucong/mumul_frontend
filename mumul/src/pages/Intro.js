import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Header from "../component/Header";
import Comment from "../component/Comment";
import { getUserInfo } from "../api/getUserInfo";
import { LocalDateTime } from "js-joda";


const Intro = ({isLogin}) => {
  console.log("new Date: ", new Date());
  const currentDateTime = LocalDateTime.now();
  console.log("Current LocalDateTime: ", currentDateTime);
  

  const [userInfo, setUserInfo] = useState({
    userId: '',
    picture: '',
    name: '',
    introduce: '',
    instaId: '',
    link: '',
    spaceStop: '',
  });

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (localStorage.getItem('token') === null) {
        return;
      }
      const currenUuserInfo = await getUserInfo();
      setUserInfo(currenUuserInfo);
    };
    fetchUserInfo();
  }, [isLogin]);

  return (
    <div className="wrap intro">
      <Header currentUserInfo={userInfo}></Header>
      <div className="contentWrap">
        <p className="introTitle">🐇토끼🐇로 무물에 녹아 들자</p>
        <Comment></Comment>
        {(localStorage.getItem('token') === null) ? (
            <Link to="/login" className="goSpace">
              <button className="space">스페이스 입장</button>
            </Link>
          ) : (
            <Link to={`/space/${userInfo.userId}`} className="goSpace">
              <button className="space">스페이스 입장</button>
            </Link>
        )}
        <Link to="/policy" className="goPolicy">
          <p>PRIVACY POLICY</p>
        </Link>
      </div>
    </div>
  );
};

export default Intro;