import React, { useState } from "react";
import { Link } from "react-router-dom";
import Profile from "./../img/Ellipse 102.png";
import { logoutUserToken } from "../api/logoutUserToken";

function Header({ isLogin, setIsLogin, currentUserInfo }) {
  const [modal, setModal] = useState(false);

  return (
    <header className="header">
      <h1 className="title"> MUMUL</h1>
      <div className="profile" onClick={() => setModal(!modal)}>
      <img
          src={localStorage.getItem('token') !== null ? currentUserInfo.picture : Profile}
          alt="profile"
        />
      </div>
      {modal && (
        <HeaderPopup isLogin={isLogin} setIsLogin={setIsLogin} currentUserInfo={currentUserInfo}/>
      )}
    </header>
  );
}

function HeaderPopup({ isLogin, setIsLogin, currentUserInfo }) {
  const token = localStorage.getItem("token");

  const handleLogout = async () => {
    try {
      const result = await logoutUserToken();
      if (result) {
        // 로그아웃 성공
        setIsLogin(false);
        window.location.reload();
      } else {
      }
    } catch (error) {
      console.error("로그아웃 오류: ", error.message);
    }
  };

  const handleClickMySpace = () => {
    if (currentUserInfo.userId === '') {
      alert("로그인 하세요.");
      return;
    }
  };

  return (
    <ul className="headerPopup">
      <li className="list" onClick={handleClickMySpace}>
        <Link to={localStorage.getItem('token') !== null ? '/space/' + currentUserInfo.userId : '#'}>
          <p>내 스페이스</p>
        </Link>
      </li>
      <li className="list" onClick={handleLogout}>
        <Link to="/login">
          <p>{(token === null) ? "로그인" : "로그아웃"}</p>
        </Link>
      </li>
      <li className="list" onClick={handleClickMySpace}>
        <Link to={currentUserInfo.userId !== '' ? '/setting' : '#'}>
          <p>설정</p>
        </Link>
      </li>
    </ul>
  );
}

export default Header;
