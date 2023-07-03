import React, { useState } from "react";
import { Link } from "react-router-dom";
import Profile from "./../img/Ellipse 102.png";

import {logoutUserToken} from "../api/logoutUserToken";

function Header({isLogin, setIsLogin}) {
  const [modal, setModal] = useState(false);

  return (
    <header className="header">
      <h1 className="title"> MUMUL</h1>
      <div className="profile" onClick={() => setModal(!modal)}>
        <img src={Profile} alt="profile" />
      </div>
      {modal && <HeaderPopup isLogin={isLogin} setIsLogin={setIsLogin}></HeaderPopup>}
    </header>
  );
}

function HeaderPopup({isLogin, setIsLogin}) {
  const handleLogout = async () => {
    try {
      const result = await logoutUserToken();
      if(result) {
        // 로그아웃 성공
        console.log('로그아웃 성공');
        setIsLogin(false);
        console.log(isLogin);
      } else {
        console.log('로그아웃 실패')
      }
    } catch (error) {
      console.error('로그아웃 오류: ', error.message);
    }
  };

  return (
    <ul className="headerPopup">
      <li className="list">
        <Link to="/main">
          <p>내 스페이스</p>
        </Link>
      </li>
      <li className="list" onClick={handleLogout}>
        <Link to="/login">
          <p>로그아웃</p>
        </Link>
      </li>
      <li className="list">
        <Link to="/setting">
          <p>설정</p>
        </Link>
      </li>
    </ul>
  );
}

export default Header;
