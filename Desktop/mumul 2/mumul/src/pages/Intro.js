import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "../component/Header";
import Comment from "../component/Comment";
import { getTestHello } from "../api/getTestHello";
// import axios from "axios";

const Intro = () => {
  // const [hello, setHello] = useState('');

  // useEffect(() => {
  //   const initHello = async () => {
  //     const newHello = await getTestHello();
  //     setHello(newHello);
  //   };
  //   initHello();
  // }, []);

  // useEffect(() => {
  //   axios.get('/api/message')
  //   .then(response => setHello(response.data))
  //   .catch(error => console.log(error))
  // }, []);


  return (
    <div className="wrap intro">
      <Header></Header>
      <div className="contentWrap">
        {/* <div>{hello}</div> */}
        <p className="introTitle">🐇토끼🐇로 무물에 녹아 들자</p>
        <Comment></Comment>
        <Link to="/main" className="goSpace">
          <button className="space">스페이스 입장</button>
        </Link>
        <Link to="/policy" className="goPolicy">
          <p>PRIVACY POLICY</p>
        </Link>
      </div>
    </div>
  );
};

export default Intro;


