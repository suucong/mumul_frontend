import React, { useState, useEffect} from "react";
import Header from "../component/Header";
import SendComment from "../component/SendComment";
import ReceiveComment from "../component/ReceiveComment";
import MyProfile from "../component/MyProfile";
import QuestionerProfile from "../component/QuestionerProfile";
import Storyslide from "../component/Storyslide";
import { useParams } from "react-router-dom";
import { getSpaceInfo } from "../api/getSpaceInfo";
import { getUserInfo } from "../api/getUserInfo";


function Main({isLogin,setIsLogin}) {
  const {id} = useParams();
  const [info, setInfo] = useState({
    userId: '',
    picture: '',
    name: '',
  });
  const [currentUserInfo, setCurrentUserInfo] = useState({
    userId: '',
    picture: '',
    name: '',
    introduce: '',
    instaId: '',
    link: '',
  });

  useEffect(() => {
    const initUserInfo = async () => {
      const newInfo = await getSpaceInfo(id);
      const userInfo = await getUserInfo();
      setCurrentUserInfo(userInfo);
      setInfo(newInfo);
    };
    initUserInfo();
  }, [id]);

  const [activeIndex, setActiveIndex] = useState(0);

  const tabContArr = [
    {
      id: 0,
      tabTitle: "받은 질문",
      tabCont: <ReceiveComment spaceId={id} currentUserInfo={currentUserInfo}></ReceiveComment>,
    },
    {
      id: 1,
      tabTitle: "보낸 질문",
      tabCont: <SendComment spaceId={id}></SendComment>,
    },
  ];

  console.log('현재 스페이스주인: '+info.userId);
  console.log('현재 로그인유저: '+currentUserInfo.userId);

  // 유저의 고유 아이디를 사용하여 매핑
  return (
    <div className="wrap">
      <Header isLogin={isLogin} setIsLogin={setIsLogin}></Header>
      <div className="contentWrap">
        <Storyslide spaceId={id}></Storyslide>
        {currentUserInfo.userId === info.userId ? (
            <MyProfile userId={currentUserInfo.userId} name={currentUserInfo.name} picture={currentUserInfo.picture} introduce={currentUserInfo.introduce} instaId={currentUserInfo.instaId} link={currentUserInfo.link} ></MyProfile>
          ) : (
            <QuestionerProfile info={info} spaceId={info.userId} currentUserId={currentUserInfo.userId}name={info.name} picture={info.picture} currentUserInfo={currentUserInfo}></QuestionerProfile>
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