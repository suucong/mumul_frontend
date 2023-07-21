import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import { getFollowingList } from "../api/Follow/getFollowingList";
import { getSpaceInfo } from "../api/getSpaceInfo";
import { getFollowerList } from "../api/Follow/getFollowerList";


function Storyslide({spaceId, followSelected}) {
  const [swiperRef, setSwiperRef] = useState(null);
  const [followingList, setFollowingList] = useState([]);
  const [followerList, setFollowerList] = useState([]);
  const [spaceInfo, setSpaceInfo] = useState({
    userId: '',
    picture: '',
    name: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getFollowingList(spaceId);
        const followerlist = await getFollowerList(spaceId);
        const spaceUserInfo = await getSpaceInfo(spaceId);

        setSpaceInfo(spaceUserInfo);
        setFollowingList(response);
        setFollowerList(followerlist);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [spaceId]);

  const prevHandler = () => {
    swiperRef.slidePrev();
  };

  const nextHandler = () => {
    swiperRef.slideNext();
  };

  return (
    <div className="slideWrap">
      <button onClick={prevHandler} className="swiper-button-prev">
        Prev
      </button>
      <button className="swiper-button-next" onClick={nextHandler}>
        Next
      </button>
      <Swiper
        slidesPerView={4}
        spaceBetween={20}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
          disabledClass: "swiper-button-disabled",
        }}
        className="mySwiper"
        modules={[Navigation]}
        breakpoints={{
          640: {
            slidesPerView: 4,
            spaceBetween: 20,
          },
          720: {
            slidesPerView: 6,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 8,
            spaceBetween: 20,
          },
        }}
        onSwiper={(SwiperSlide) => setSwiperRef(SwiperSlide)}
      >
        <SwiperSlide>
          <img src={spaceInfo.picture} alt="" className="storyImg MyImg" />
          <p className="stroryId Me">{spaceInfo.name}</p>
        </SwiperSlide>
        {
  followSelected
    ? followingList.map((item) => (
        <SwiperSlide key={item.userId}>
          <img
            src={item.picture}
            alt=""
            className="storyImg followImg"
            onClick={() => (window.location.href = `/${item.userId}`)}
          />
          <p className="stroryId Others">{item.name}</p>
        </SwiperSlide>
      ))
    : followerList.map((item) => (
        <SwiperSlide key={item.userId}>
          <img
            src={item.picture}
            alt=""
            className="storyImg followImg"
            onClick={() => (window.location.href = `/${item.userId}`)}
          />
          <p className="stroryId Others">{item.name}</p>
        </SwiperSlide>
      ))
}

      </Swiper>
    </div>
  );
}

export default Storyslide;
