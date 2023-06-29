// Login.js

import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { postLoginToken } from "../api/postLoginToken";
import GoogleLogin from "../component/GoogleLogin";
import Rabbit from "./../img/Group 12.png";
import { getUserInfo } from "../api/getUserInfo";

const Login = ({ isLogin, setIsLogin }) => {
  const navigate = useNavigate();

  const onGoogleSignIn = async (res) => {
    const { credential } = res;
    const result = await postLoginToken(credential, setIsLogin);
    setIsLogin(result);
  };

  useEffect(() => {
    const initLogin = async () => {
      const userInfo = await getUserInfo();
      if (localStorage.getItem("token") !== null) {
        navigate(`/space/${userInfo.userId}`);
      }
    };

    if (isLogin) {
      initLogin();
    }
  }, [isLogin, navigate]);

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
                바쁘다 바빠 현대 사회!<br />
                반가워 난 토끼야🐰
              </p>
              <p className="loginDecs">
                MUMUL 스페이스를 만드려면 로그인을 해야 돼
              </p>
            </div>
            <div className="buttonWrap">
              {/* <GoogleLoginButton /> */}
              <GoogleLogin onGoogleSignIn={onGoogleSignIn} text="로그인" />
              {/* <button>
                <img src={Goggle} alt="" />
                Google 계정으로 계속
              </button> */}
              {/* <button>
                <img src={Cacao} alt="" />
                Kakao 계정으로 계속
              </button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
