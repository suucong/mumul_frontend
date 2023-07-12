import React, { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Intro from "./pages/Intro";
import Login from "./pages/Login";
import Main from "./pages/Main";
import Policy from "./pages/Policy";
import Setting from "./pages/Setting";
import "./css/reset.css";
import "./css/style.css";


function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [followSelected, setFollowSelected] = useState(true);
  
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Intro isLogin={isLogin}/>} />
        <Route path="/login" element={<Login isLogin={isLogin} setIsLogin={setIsLogin}/>} />
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