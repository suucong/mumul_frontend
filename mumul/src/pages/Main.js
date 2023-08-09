import React, { useState, useEffect} from "react";
import Header from "../component/Header";
import SendComment from "../component/SendComment";
import ReceiveComment from "../component/ReceiveComment";
import MyProfile from "../component/MyProfile";
import QuestionerProfile from "../component/QuestionerProfile";
import { useParams } from "react-router-dom";
import { getSpaceInfo } from "../api/getSpaceInfo";
import { getUserInfo } from "../api/getUserInfo";

function Main({isLogin, setIsLogin, followSelected, setFollowSelected}) {
  const { id } = useParams();

  const [isNotFound, setIsNotFound] = useState(true);

  const [info, setInfo] = useState({
    userId: '',
    picture: '',
    name: '',
    introduce: '',
    instaId: '',
    link: '',
    spaceStop: '',
    alertSpace: '',
  });
  const [currentUserInfo, setCurrentUserInfo] = useState({
    userId: '',
    picture: '',
    name: '',
    introduce: '',
    instaId: '',
    link: '',
    spaceStop: '',
  });

  useEffect(() => {
    const initUserInfo = async () => {
      const newInfo = await getSpaceInfo(id);
      const token = localStorage.getItem('token');
  
      if (token !== null) {
        const userInfo = await getUserInfo();
        if(userInfo === false) {
          setIsLogin(false);
        }
        setCurrentUserInfo(userInfo);
      }
      if (newInfo === false) {
        setIsNotFound(true);
      } else {
        setIsNotFound(false);
        setInfo(newInfo);
      }
    };
  
    initUserInfo();
  }, [id, isLogin, followSelected]);
  

  const [activeIndex, setActiveIndex] = useState(0);

  const tabContArr = [
    {
      id: 0,
      tabTitle: "받은 무물",
      tabCont: <ReceiveComment spaceId={id} currentUserInfo={currentUserInfo}></ReceiveComment>,
    },
    {
      id: 1,
      tabTitle: "보낸 무물",
      tabCont: <SendComment spaceId={id} currentUserInfo={currentUserInfo}></SendComment>,
    },
  ];


  return (
    <div className="wrap">
      {isNotFound ? (
        <div></div>
      ) : (
        <>
      <div className="wrap">
      <Header isLogin={isLogin} setIsLogin={setIsLogin} currentUserInfo={currentUserInfo}></Header>
      <div className="contentWrap">
        {/* <Storyslide spaceId={id} followSelected={followSelected}></Storyslide> */}
        {currentUserInfo.userId === info.userId ? (
            <MyProfile currentUserInfo={currentUserInfo}
            followSelected={followSelected} setFollowSelected={setFollowSelected}></MyProfile>
          ) : (
            <QuestionerProfile spaceUserInfo={info} currentUserInfo={currentUserInfo} 
            followSelected={followSelected} setFollowSelected={setFollowSelected}
            isLogin={isLogin}></QuestionerProfile>
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
        </>
      )}
    </div>
  );
}

export default Main;