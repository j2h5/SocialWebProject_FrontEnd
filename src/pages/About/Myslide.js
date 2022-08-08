import React, { Component } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';

import m6 from './images/m6.jpg';
import m1 from './images/m1.jpg';
import m2 from './images/m2.jpg';
import m3 from './images/m3.jpg';
import m4 from './images/m4.jpg';
import m7 from './images/m7.jpg';
import m11 from './images/m11.jpg';
import m9 from './images/m9.jpg';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default () => {
  return (
    <Swiper
      modules={[Pagination, Navigation]}
      pagination={{ clickable: true }}
      spaceBetween={40}
      slidesPerView={3}
      navigation
      onSlideChange={() => console.log('slide change')}
      onSwiper={swiper => console.log(swiper)}
    >
      <SwiperSlide>
        <img src={m7} alt="" style={{ width: '340px', height: '300px' }} />
      </SwiperSlide>
      <SwiperSlide>
        <img src={m11} alt="" style={{ width: '340px', height: '300px' }} />
      </SwiperSlide>
      <SwiperSlide>
        <img src={m2} alt="" style={{ width: '340px', height: '300px' }} />
      </SwiperSlide>
      <SwiperSlide>
        <img src={m6} alt="" style={{ width: '340px', height: '300px' }} />
      </SwiperSlide>
      <SwiperSlide>
        <img src={m1} alt="" style={{ width: '340px', height: '300px' }} />
      </SwiperSlide>
      <SwiperSlide>
        <img src={m9} alt="" style={{ width: '340px', height: '300px' }} />
      </SwiperSlide>
      <SwiperSlide>
        <img src={m3} alt="" style={{ width: '340px', height: '300px' }} />
      </SwiperSlide>
      <SwiperSlide>
        <img src={m4} alt="" style={{ width: '340px', height: '300px' }} />
      </SwiperSlide>
    </Swiper>
  );
};
