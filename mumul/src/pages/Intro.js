import { Link } from "react-router-dom";
import Comment from "../component/Comment";
import React, { useState, useEffect } from "react";
import { getUserInfo } from "../api/getUserInfo";

const Intro = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [currentUserInfo, setCurrentUserInfo] = useState({
    userId: '',
    picture: '',
    name: '',
  });

  useEffect(() => {
    const initUserInfo = async () => {
      const response = await getUserInfo();
      if(response === false) {
        setIsLogin(false);
        return;
      } else {
        setCurrentUserInfo(response);
        setIsLogin(true);
      }
    };
    initUserInfo();
  }, []);

  return (
    <div className="wrap intro">
      <div className="contentWrap">
        <p className="introTitle">🐇토끼🐇로 무물에 녹아 들자</p>
        <Comment></Comment>
        <Link
          to={isLogin ? `/space/${currentUserInfo.userId}` : "/login"}
          className="goSpace">
          <button className="space">스페이스 입장</button>
        </Link>
        <Link to="/policy" className="goPolicy">
          <p>PRIVACY POLICY</p>
        </Link>
      </div>
    </div>
  );
};

export default Intro;