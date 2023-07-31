import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { getUserInfo } from "../src/api/getUserInfo";
import Intro from "./pages/Intro";
import Login from "./pages/Login";
import Main from "./pages/Main";
import Policy from "./pages/Policy";
import Setting from "./pages/Setting";
import "./css/reset.css";
import "./css/style.css";
import KakaoAuthHandle from "./component/KakaoAuthHandle";


function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [followSelected, setFollowSelected] = useState(true);
  const [hasRequestedCallback, setHasRequestedCallback] = useState(false);

  useEffect(() => {
    const initUserInfo = async () => {
      const response = await getUserInfo();
      if(response === false) {
        setIsLogin(false);
        return;
      } else {
        setIsLogin(true);
      }
    };
    initUserInfo();
  }, [isLogin, setIsLogin]);
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Intro isLogin={isLogin} setIsLogin={setIsLogin}/>} />
        <Route path="/login" element={<Login isLogin={isLogin} setIsLogin={setIsLogin}
        hasRequestedCallback={hasRequestedCallback} setHasRequestedCallback={setHasRequestedCallback}/>} />
        <Route exact path="/login/kakao" Component={KakaoAuthHandle}/>
        <Route path="/:id" element={<Main isLogin={isLogin} setIsLogin={setIsLogin} 
        followSelected={followSelected} setFollowSelected={setFollowSelected}/>} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/setting" element={<Setting isLogin={isLogin} setIsLogin={setIsLogin}/>} />
        <Route path="*" element={<div>404</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;