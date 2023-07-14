import { Link } from "react-router-dom";
import Comment from "../component/Comment";
import React, { useState, useEffect } from "react";
import { getUserInfo } from "../api/getUserInfo";
import { useNavigate } from "react-router-dom";

const Intro = () => {
  const navigate = useNavigate();
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

  const handleIntroSpace = () => {
    const response = getUserInfo();
    if(response === false) {
      navigate('/login');
      return;
    } else {
      setCurrentUserInfo(response);
      navigate(`/${currentUserInfo.userId}`);
      setIsLogin(true);
    }
  }

  return (
    <div className="wrap intro">
      <div className="contentWrap">
        <p className="introTitle">🐇토끼🐇로 무물에 녹아 들자</p>
        <Comment></Comment>
        <button className="space" onClick={handleIntroSpace}>스페이스 입장</button>
        <Link to="/policy" className="goPolicy">
          <p>PRIVACY POLICY</p>
        </Link>
      </div>
    </div>
  );
};

export default Intro;