// App.js

import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Intro from "./pages/Intro";
import Login from "./pages/Login";
import Main from "./pages/Main";
import Main2 from "./pages/Main2";
import Policy from "./pages/Policy";
import Setting from "./pages/Setting";
import "./css/reset.css";
import "./css/style.css";
import { GoogleLogin } from "react-google-login";
import { getUserInfo } from "./api/getUserInfo";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const initLogin = async () => {
      const userInfo = await getUserInfo();
      setIsLogin(!!userInfo);
      if (userInfo && userInfo.userId) {
        setUserId(userInfo.userId);
      }
    };
    initLogin();
  }, []);

  const spaceMappingAddress = userId ? `/space/${userId}` : "/";

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/login" element={<Login isLogin={isLogin} setIsLogin={setIsLogin} />} />
        {/* <Route
          path="/main"
          element={isLogin ? <Navigate to={spaceMappingAddress} /> : <Navigate to="/" />}
        /> */}
        <Route path={spaceMappingAddress} element={<Main isLogin={isLogin} spaceMappingAddress={spaceMappingAddress} />} />
        <Route path="/main2" element={<Main2 />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="*" element={<div>404</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
