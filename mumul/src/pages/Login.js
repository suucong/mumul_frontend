import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import { postLoginToken } from "../api/postLoginToken";
// import {GoogleLogin} from "@react-oauth/google";
// import {GoogleOAuthProvider} from "@react-oauth/google";
import { useGoogleLogin } from "@react-oauth/google";
import Rabbit from "./../img/Group 12.png";
import { getUserInfo } from "../api/getUserInfo";
import Goggle from "./../img/icon/icGoggle.png";
import Cacao from "./../img/icon/icCacao.png";
import axios from "axios";

const Login = ({ isLogin, setIsLogin, hasRequestedCallback, setHasRequestedCallback }) => {
  const navigate = useNavigate();
  const KAKAO_AUTH_URL = "https://kauth.kakao.com/oauth/authorize?client_id=aef338ad0a5650a845dd1ce3f5ff8571&redirect_uri=https://mumul.space/login/kakao&response_type=code";

  const GoogleSocialLogin = useGoogleLogin({
    scope: "email profile",
    ux_mode: "redirect",
    // redirect_uri: "http://localhost:3000/login",
    flow: "auth-code",
  });

  const kakaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
}

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const codeFromURL = queryParams.get("code");
    
    if (!isLogin && !hasRequestedCallback && codeFromURL) {
      setHasRequestedCallback(true);
      axios
        .get(`/v1/oauth/login/callback?code=${codeFromURL}`, {
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
          },
          withCredentials: true,
          crossDomain: true,
        })
        .then(response => {
          const authToken = response.headers['authorization'];

          localStorage.setItem('token', authToken);
          setIsLogin(true);
        })
        .catch((error) => {
          console.error(error);
        });
    }

    if (isLogin) {
      const initLogin = async () => {
        const userInfo = await getUserInfo();
        if (userInfo === false) {
          setIsLogin(false);
        }
        navigate(`/${userInfo.userId}`);
        setHasRequestedCallback(false);
      };
      initLogin();
    }
  }, [isLogin, setHasRequestedCallback, navigate, setIsLogin]);

  // useEffect(() => {
  //   const initLogin = async () => {
  //     if (!isLogin) {
  //       return;
  //     }
  //     const userInfo = await getUserInfo();
  //     if(userInfo === false) {
  //       setIsLogin(false);
  //     }
  //     navigate(`/${userInfo.userId}`);
  //     setHasRequestedCallback(false);
  //   };
  //   if (isLogin) {
  //     initLogin();
  //   }
  // }, [isLogin, navigate, setIsLogin]);

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
                바쁘다 바빠 현대 사회!
                <br />
                반가워 난 토끼야🐰
              </p>
              <p className="loginDecs">MUMUL 스페이스를 만드려면 로그인을 해야 돼</p>
            </div>
            <div className="buttonWrap">
            {/* <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
                <GoogleLogin
                    onSuccess={(res) => {
                        onGoogleSignIn(res);
                    }}
                    onFailure={(err) => {
                        console.log(err);
                    }}
                    width='300px'
                />
            </GoogleOAuthProvider> */}
              {/* <GoogleLogin onGoogleSignIn={onGoogleSignIn} text="로그인" /> */}
            <button onClick={kakaoLogin}>
              <img src={Cacao} alt="" />
              Kakao 계정으로 계속
            </button>
            <button onClick={GoogleSocialLogin}>
              <img src={Goggle} alt="" />
              Google 계정으로 계속
            </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
