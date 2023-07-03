import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper";
import Profile1 from "../img/Ellipse 102.png";
import Profile2 from "../img/Ellipse 103.png";
import Profile3 from "../img/Ellipse 104.png";
import Profile4 from "../img/Ellipse 105.png";
import Profile5 from "../img/Ellipse 106.png";
import Profile6 from "../img/Ellipse 107.png";
import Profile7 from "../img/Ellipse 108.png";
import Profile8 from "../img/Ellipse 109.png";
import Profile9 from "../img/Ellipse 110.png";
import Profile10 from "../img/Ellipse 111.png";
import { getFollowingList } from "../api/getFollowingList";

function Storyslide({spaceId}) {
  const [swiperRef, setSwiperRef] = useState(null);
  const [followingList, setFollowingList] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getFollowingList(spaceId);
        setFollowingList(response);
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
          <img src={Profile1} alt="" className="storyImg MyImg" />
          <p className="stroryId Me">Me</p>
        </SwiperSlide>
        {followingList.map((item) => (
            <SwiperSlide key={item.userId}>
              <img src={item.picture} alt="" className="storyImg MyImg" />
              <Link to={`/space/${item.userId}`} className="stroryId Me">
                {item.name}
              </Link>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
}

export default Storyslide;
