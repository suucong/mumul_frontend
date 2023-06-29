import React, { useState, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
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

function Storyslide() {
  const [swiperRef, setSwiperRef] = useState(null);

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
        <SwiperSlide>
          <img src={Profile2} alt="" className="storyImg " />
          <p className="stroryId ">등산토끼</p>
        </SwiperSlide>
        <SwiperSlide>
          <img src={Profile3} alt="" className="storyImg " />
          <p className="stroryId ">바이크토끼</p>
        </SwiperSlide>
        <SwiperSlide>
          <img src={Profile4} alt="" className="storyImg " />
          <p className="stroryId ">야구르트토끼</p>
        </SwiperSlide>
        <SwiperSlide>
          <img src={Profile5} alt="" className="storyImg " />
          <p className="stroryId ">퇴근토끼</p>
        </SwiperSlide>
        <SwiperSlide>
          <img src={Profile6} alt="" className="storyImg " />
          <p className="stroryId ">토토토토끼</p>
        </SwiperSlide>
        <SwiperSlide>
          <img src={Profile7} alt="" className="storyImg " />
          <p className="stroryId ">토롱이</p>
        </SwiperSlide>
        <SwiperSlide>
          <img src={Profile8} alt="" className="storyImg " />
          <p className="stroryId ">토토토토끼</p>
        </SwiperSlide>
        <SwiperSlide>
          <img src={Profile9} alt="" className="storyImg " />
          <p className="stroryId ">지락실지락실</p>
        </SwiperSlide>
        <SwiperSlide>
          <img src={Profile10} alt="" className="storyImg " />
          <p className="stroryId ">지라ㄱ실2</p>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}

export default Storyslide;
