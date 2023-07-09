// App.js

import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useParams } from "react-router-dom";
import Intro from "./pages/Intro";
import Login from "./pages/Login";
import Main from "./pages/Main";
import Main2 from "./pages/Main2";
import Policy from "./pages/Policy";
import Setting from "./pages/Setting";
import {getQuestionShare} from "./api/Q&A/getQuestionShare";
import ShareComment from "./component/ShareComment";
import {getUserInfo} from "./api/getUserInfo";
import "./css/reset.css";
import "./css/style.css";


function App() {
  const [isLogin, setIsLogin] = useState(false);
  const [followSelected, setFollowSelected] = useState(true);
  const [questionShareData, setQuestionShareData] = useState(null);
  const [currentUserInfo, setCurrentUserInfo] = useState(null); // currentUserInfo 초기화
  const questionId = localStorage.getItem('questionId');

  const QuestionShareRoute = () => {

    useEffect(() => {
      const fetchQuestionShareData =  () => {
        try {
          const data =  getQuestionShare(questionId);
          setQuestionShareData(data);
        } catch (error) {
          console.error("Error fetching question share data:", error);
        }
      };

      fetchQuestionShareData();
    });

  // questionShareData와 currentUserInfo를 이용해 데이터를 렌더링하는 컴포넌트를 반환합니다.
  return questionShareData && currentUserInfo ? (
    <ShareComment
      questionShareData={questionShareData}
      currentUserInfo={currentUserInfo}
    />
  ) : null;
};


useEffect(() => {
  const fetchUserInfo = async () => {
    try {
      // 로그인 상태에 따라 currentUserInfo를 설정합니다.
      if (isLogin) {
        // 로그인된 사용자 정보를 가져와서 currentUserInfo를 설정합니다.
        const userInfo = await getUserInfo(); // getUserInfo는 사용자 정보를 가져오는 함수로 적절하게 대체해야 합니다.
        setCurrentUserInfo(userInfo);
      } else {
        setCurrentUserInfo(null); // 로그아웃 상태라면 currentUserInfo를 null로 설정합니다.
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  fetchUserInfo();
}, [isLogin]);


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Intro isLogin={isLogin}/>} />
        <Route path="/login" element={<Login isLogin={isLogin} setIsLogin={setIsLogin}/>} />
        <Route path="/space/:id" element={<Main isLogin={isLogin} setIsLogin={setIsLogin} 
        followSelected={followSelected} setFollowSelected={setFollowSelected}/>} />
          <Route path="/space/:id/" element={<Main isLogin={isLogin} setIsLogin={setIsLogin} 
        followSelected={followSelected} setFollowSelected={setFollowSelected}/>} />
        <Route path="/main2" element={<Main2 />} />
        <Route path="/policy" element={<Policy />} />
        <Route path="/setting" element={<Setting isLogin={isLogin} setIsLogin={setIsLogin}/>} />
        <Route
          path={`/spaces/${questionId}/get`}
          element={<QuestionShareRoute />}
        />
        <Route path="*" element={<div>404</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;