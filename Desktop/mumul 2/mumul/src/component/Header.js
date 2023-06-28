import React, { useState } from "react";
import { Link } from "react-router-dom";
import Profile from "./../img/Ellipse 102.png";

function Header() {
  const [modal, setModal] = useState(false);

  return (
    <header className="header">
      <h1 className="title"> MUMUL</h1>
      <div className="profile" onClick={() => setModal(!modal)}>
        <img src={Profile} alt="profile" />
      </div>
      {modal && <HeaderPopup></HeaderPopup>}
    </header>
  );
}

function HeaderPopup() {
  return (
    <ul className="headerPopup">
      <li className="list">
        <Link to="/main">
          <p>내 스페이스</p>
        </Link>
      </li>
      <li className="list">
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
