import React, { useState } from "react";
import Header from "../component/Header";
import SendCommnet from "../component/SendCommnet";
import ReceiveComment from "../component/ReciveComment";
import MyProfile from "../component/MyProfile";
import Storyslide from "../component/Storyslide";
import QuestionerProfile from "../component/QuestionerProfile";

function Main() {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabContArr = [
    {
      id: 0,
      tabTitle: "받은 질문",
      tabCont: (
        <div>
          <ReceiveComment></ReceiveComment>
        </div>
      ),
    },
    {
      id: 1,
      tabTitle: "보낸 질문",
      tabCont: (
        <div>
          <SendCommnet></SendCommnet>
        </div>
      ),
    },
  ];

  return (
    <div className="wrap">
      <Header></Header>
      <div className="contentWrap">
        <Storyslide></Storyslide>
        {/*  로그인 : 질문자 일 때 */}
        <QuestionerProfile></QuestionerProfile>
        {/*  로그인 : 질문자 일 때 */}
        <ul className="tabMenu">
          {tabContArr.map((item) => (
            <li
              className={activeIndex === item.id ? "is-active" : ""}
              onClick={() => setActiveIndex(item.id)}
              key={item.id}
            >
              {item.tabTitle}
            </li>
          ))}
        </ul>
        <div>
          {tabContArr
            .filter((item) => activeIndex === item.id)
            .map((item) => (
              <div key={item.id}>{item.tabCont}</div>
            ))}
        </div>
      </div>
    </div>
  );
}

export default Main;
