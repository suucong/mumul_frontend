import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Profile from "./../img/Ellipse 102.png";
import { logoutUserToken } from "../api/logoutUserToken";
import { getUserInfo } from "../api/getUserInfo";

function Header({ isLogin, setIsLogin }) {
  const [modal, setModal] = useState(false);
  const [userInfo, setUserInfo] = useState({
    userId: '',
    name: '',
    picture: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentUserInfo = await getUserInfo();
        setUserInfo(currentUserInfo);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  

  return (
    <header className="header">
      <h1 className="title"> MUMUL</h1>
      <div className="profile" onClick={() => setModal(!modal)}>
      <img
          src={userInfo.userId !== undefined ? userInfo.picture : Profile}
          alt="profile"
        />
      </div>
      {modal && (
        <HeaderPopup isLogin={isLogin} setIsLogin={setIsLogin} />
      )}
    </header>
  );
}

function HeaderPopup({ isLogin, setIsLogin }) {
  const token = localStorage.getItem("token");
  const [userInfo, setUserInfo] = useState({
    userId: '',
    name: '',
    picture: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentUserInfo = await getUserInfo();
        setUserInfo(currentUserInfo);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleLogout = async () => {
    try {
      const result = await logoutUserToken();
      if (result) {
        // 로그아웃 성공
        console.log("로그아웃 성공");
        setIsLogin(false);
        console.log(isLogin);
        window.location.reload();
      } else {
        console.log("로그아웃 실패");
      }
    } catch (error) {
      console.error("로그아웃 오류: ", error.message);
    }
  };

  const handleClickMySpace = () => {
    if (userInfo.userId === undefined) {
      alert("로그인 하세요.");
      return;
    }
  };

  return (
    <ul className="headerPopup">
      <li className="list" onClick={handleClickMySpace}>
        <Link to={userInfo.userId !== undefined ? '/space/' + userInfo.userId : '#'}>
          <p>내 스페이스</p>
        </Link>
      </li>
      <li className="list" onClick={handleLogout}>
        <Link to="/login">
          <p>{(!token || token === "null") ? "로그인" : "로그아웃"}</p>
        </Link>
      </li>
      <li className="list" onClick={handleClickMySpace}>
        <Link to={userInfo.userId !== undefined ? '/setting' : '#'}>
          <p>설정</p>
        </Link>
      </li>
    </ul>
  );
}

export default Header;
