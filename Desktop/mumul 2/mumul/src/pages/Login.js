import React from "react";

import Rabbit from "./../img/Group 12.png";
import Goggle from "./../img/icon/icGoggle.png";
import Cacao from "./../img/icon/icCacao.png";

const Login = () => {
  return (
    <div className="wrap">
      <div className="content">
        <h1 className="title">MUMUL</h1>
        <div className="loginWrap">
          <div className="img">
            <img src={Rabbit} alt="rabbit" />
          </div>
          <div>
            <div className="text">
              <p className="loginTitle">
                바쁘다 바빠 현대 사회!<br></br>
                반가워 난 토끼야🐰
              </p>
              <p className="loginDecs">
                MUMUL 스페이스를 만드려면 로그인을 해야 돼
              </p>
            </div>
            <div className="buttonWrap">
              <button>
                <img src={Goggle} alt="" />
                Google 계정으로 계속
              </button>
              <button>
                <img src={Cacao} alt="" />
                Kakao 계정으로 계속
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
