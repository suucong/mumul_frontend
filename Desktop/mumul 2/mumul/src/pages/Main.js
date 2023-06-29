import React, { useState, useEffect} from "react";
import Header from "../component/Header";
import SendCommnet from "../component/SendCommnet";
import ReceiveComment from "../component/ReciveComment";
import MyProfile from "../component/MyProfile";
import QuestionerProfile from "../component/QuestionerProfile";
import Storyslide from "../component/Storyslide";
import { useParams } from "react-router-dom";
import { getSpaceInfo } from "../api/getSpaceInfo";
import { getUserInfo } from "../api/getUserInfo";

function Main({ isLogin }) {
  const { id } = useParams();
  const [info, setInfo] = useState({
    userId: '',
    picture: '',
    name: '',
  });
  const [currentUserInfo, setCurrentUserInfo] = useState({
    userId: '',
    picture: '',
    name: '',
  });

  useEffect(() => {
    const initUserInfo = async () => {
      const newInfo = await getSpaceInfo(id);
      const userInfo = await getUserInfo();
      setCurrentUserInfo(userInfo);
      setInfo(newInfo);
    };
    initUserInfo();
  }, []);

  const [activeIndex, setActiveIndex] = useState(0);

  const tabContArr = [
    {
      id: 0,
      tabTitle: "받은 질문",
      tabCont: <ReceiveComment></ReceiveComment>,
    },
    {
      id: 1,
      tabTitle: "보낸 질문",
      tabCont: <SendCommnet></SendCommnet>,
    },
  ];

  return (
    <div className="wrap">
      <Header isLogin={isLogin}></Header>
      <div className="contentWrap">
        <Storyslide></Storyslide>
        {currentUserInfo.userId === info.userId ? (
          <MyProfile
            name={currentUserInfo.name}
            picture={currentUserInfo.picture}
          ></MyProfile>
        ) : (
          <QuestionerProfile
            name={info.name}
            picture={info.picture}
            currentUserInfo={currentUserInfo}
          ></QuestionerProfile>
        )}
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
