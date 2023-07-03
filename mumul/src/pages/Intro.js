import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../component/Header";
import Comment from "../component/Comment";
import { getUserInfo } from "../api/getUserInfo";

const Intro = () => {
  const [info, setInfo] = useState({
    userId: ''
  });

  useEffect(() => {
    const initUserInfo = async() => {
      const currentUserInfo = await getUserInfo();
      setInfo(currentUserInfo);
    };
    initUserInfo();
  }, []);

  return (
    <div className="wrap intro">
      <Header></Header>
      <div className="contentWrap">
        <p className="introTitle">🐇토끼🐇로 무물에 녹아 들자</p>
        <Comment></Comment>
        {info.userId !== undefined || window.localStorage.getItem("token") !== null ? (
          <Link to={'/space/' + info.userId} className="goSpace">
            <button className="space">스페이스 입장</button>
          </Link>
        ) : (
          <Link to="/login" className="goSpace">
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
