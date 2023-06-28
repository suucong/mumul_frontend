import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Intro from "./pages/Intro";
import Login from "./pages/Login";
import Main from "./pages/Main";
import Main2 from "./pages/Main2";
import Policy from "./pages/Policy";
import Setting from "./pages/Setting";
import "./css/reset.css";
import "./css/style.css";
import { GoogleLogin } from 'react-google-login';
import { useState, useEffect } from "react";
import { getUserInfo } from "./api/getUserInfo";

function App() {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const initLogin = async () => {
      const name = await getUserInfo();
      setIsLogin(!!name);
    };
    initLogin();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Intro />} />
        {/* <Route path="/login" element={<Login/>}/> */}
        <Route path="/login" element={<Login isLogin={isLogin} setIsLogin={setIsLogin}/>} /> 
        <Route path="/main" element={<Main />} />
        <Route path="/main2" element={<Main2 />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/setting" element={<Setting />} />
        <Route path="*" element={<>404</>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
