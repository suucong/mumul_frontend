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
      if (userInfo && userInfo.userId) {
        navigate(`/space/${userInfo.userId}`);
      }
    };

    if (isLogin) {
      initLogin();
    }
  }, [isLogin, navigate]);

  return (
    <div className="wrap">
      {/* 컴포넌트 내용 */}
    </div>
  );
};

export default Login;
