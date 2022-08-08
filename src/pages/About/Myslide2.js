import React, { Component } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';

import d7 from './images/d7.jpg';
import d8 from './images/d8.jpg';
import d9 from './images/d9.jpg';
import d10 from './images/d10.jpg';
import d11 from './images/d11.jpg';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default () => {
  return (
    <Swiper
      modules={[Pagination, Navigation]}
      pagination={{ clickable: true }}
      spaceBetween={50}
      slidesPerView={3}
      navigation
      onSlideChange={() => console.log('slide change')}
      onSwiper={swiper => console.log(swiper)}
    >
      <SwiperSlide>
        <img src={d7} alt="" style={{ width: '340px', height: '300px' }} />
      </SwiperSlide>
      <SwiperSlide>
        <img src={d8} alt="" style={{ width: '340px', height: '300px' }} />
      </SwiperSlide>
      <SwiperSlide>
        <img src={d9} alt="" style={{ width: '340px', height: '300px' }} />
      </SwiperSlide>
      <SwiperSlide>
        <img src={d10} alt="" style={{ width: '340px', height: '300px' }} />
      </SwiperSlide>
      <SwiperSlide>
        <img src={d11} alt="" style={{ width: '340px', height: '300px' }} />
      </SwiperSlide>
    </Swiper>
  );
};
