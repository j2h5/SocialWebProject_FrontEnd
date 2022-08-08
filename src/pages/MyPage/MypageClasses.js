import React from 'react';
import Sidebar from './Sidebar';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import MypageCard from './MypageCards.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';
import img1 from '../class/classImage/1.JPG';
import img2 from '../class/classImage/2.JPG';
import img3 from '../class/classImage/3.JPG';
import img4 from '../class/classImage/4.JPG';
import img5 from '../class/classImage/5.JPG';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import LocationOnIcon from '@mui/icons-material/LocationOn';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const MypageClasses = () => {
  return (
    <Wrapper>
      <div className="mypage_header"></div>
      <Sidebar />
      <MypageContent>
        <Title1>수강중인 클래스</Title1>
        <Ment1>현재 수강중인 클래스 목록입니다 🏃</Ment1>
        <Cards1>
          <Swiper
            style={{ height: '400px' }}
            modules={[Pagination, Navigation]}
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            spaceBetween={20}
            slidesPerView={3}
            navigation
            onSlideChange={() => console.log('slide change')}
            onSwiper={swiper => console.log(swiper)}
          >
            <SwiperSlide>
              {/* 하나의 카드 반복문 */}
              <Card1>
                <div className="each_class1">
                  <img alt="" src={img1} className="listimg1" />

                  <div className="class_location1" style={{ color: '#7814DC' }}>
                    <LocationOnIcon
                      style={{
                        fontSize: '20px',
                        height: '20px',
                      }}
                    />
                    잠실 한강공원
                  </div>

                  <div className="class_title2">
                    <div
                      className="class_title_name1"
                      style={{ float: 'right' }}
                    >
                      한강 철인 3종경기
                    </div>
                  </div>

                  <div className="list_tutor_name1">
                    <div style={{ width: '80px' }}>김준영 튜터</div>
                  </div>

                  <div
                    className="class_numbers1"
                    style={{ lineHeight: '25px' }}
                  >
                    <div className="class_price1">55,000 원</div>
                    <div className="class_hour1">총 3 시간</div>
                  </div>
                </div>
              </Card1>
            </SwiperSlide>
            <SwiperSlide>
              {/* 하나의 카드 반복문 */}
              <Card1>
                <div className="each_class1">
                  <img alt="" src={img2} className="listimg1" />

                  <div className="class_location1" style={{ color: '#7814DC' }}>
                    <LocationOnIcon
                      style={{
                        fontSize: '20px',
                        height: '20px',
                      }}
                    />
                    이촌 한강공원
                  </div>

                  <div className="class_title2">
                    <div
                      className="class_title_name1"
                      style={{ float: 'right' }}
                    >
                      [이촌] 스케이트보드
                    </div>
                  </div>

                  <div className="list_tutor_name1">
                    <div style={{ width: '80px' }}>이경주 튜터</div>
                  </div>

                  <div
                    className="class_numbers1"
                    style={{ lineHeight: '25px' }}
                  >
                    <div className="class_price1">20,000 원</div>
                    <div className="class_hour1">총 4 시간</div>
                  </div>
                </div>
              </Card1>
            </SwiperSlide>
            <SwiperSlide>
              {/* 하나의 카드 반복문 */}
              <Card1>
                <div className="each_class1">
                  <img alt="" src={img3} className="listimg1" />

                  <div className="class_location1" style={{ color: '#7814DC' }}>
                    <LocationOnIcon
                      style={{
                        fontSize: '20px',
                        height: '20px',
                      }}
                    />
                    반포 한강공원
                  </div>

                  <div className="class_title2">
                    <div
                      className="class_title_name1"
                      style={{ float: 'right' }}
                    >
                      노래 한 번 배우겠어?
                    </div>
                  </div>

                  <div className="list_tutor_name1">
                    <div style={{ width: '80px' }}>김정하 튜터</div>
                  </div>

                  <div
                    className="class_numbers1"
                    style={{ lineHeight: '25px' }}
                  >
                    <div className="class_price1">50,000 원</div>
                    <div className="class_hour1">총 1 시간</div>
                  </div>
                </div>
              </Card1>
            </SwiperSlide>
            <SwiperSlide>
              {/* 하나의 카드 반복문 */}
              <Card1>
                <div className="each_class1">
                  <img alt="" src={img4} className="listimg1" />

                  <div className="class_location1" style={{ color: '#7814DC' }}>
                    <LocationOnIcon
                      style={{
                        fontSize: '20px',
                        height: '20px',
                      }}
                    />
                    뚝섬 한강공원
                  </div>

                  <div className="class_title2">
                    <div
                      className="class_title_name1"
                      style={{ float: 'right' }}
                    >
                      [초급] 스킨스쿠버
                    </div>
                  </div>

                  <div className="list_tutor_name1">
                    <div style={{ width: '80px' }}>홍대한 튜터</div>
                  </div>

                  <div
                    className="class_numbers1"
                    style={{ lineHeight: '25px' }}
                  >
                    <div className="class_price1">85,000 원</div>
                    <div className="class_hour1">총 3 시간</div>
                  </div>
                </div>
              </Card1>
            </SwiperSlide>
          </Swiper>
        </Cards1>

        <Title2>수강 종료된 클래스</Title2>
        <Ment2>내가 수강한 클래스들 입니다 🏁</Ment2>
        <Cards2>
          <Swiper
            style={{ height: '400px' }}
            modules={[Pagination, Navigation]}
            pagination={{ clickable: true }}
            scrollbar={{ draggable: true }}
            spaceBetween={20}
            slidesPerView={3}
            navigation
            onSlideChange={() => console.log('slide change')}
            onSwiper={swiper => console.log(swiper)}
          >
            <SwiperSlide>
              {/* 하나의 카드 반복문 */}
              <Card2>
                <div className="each_class_end">
                  <img alt="" src={img5} className="listimg1" />

                  <div className="class_location1">
                    <LocationOnIcon
                      style={{
                        fontSize: '20px',
                        height: '20px',
                      }}
                    />
                    반포 한강공원
                  </div>

                  <div className="class_title2">
                    <div
                      className="class_title_name1"
                      style={{ float: 'right' }}
                    >
                      노을보며 와인시음
                    </div>
                  </div>

                  <div className="list_tutor_name1">
                    <div>한별 튜터</div>
                  </div>

                  <div className="class_numbers1">
                    <div className="class_price1">15,000 원</div>
                    <div className="class_hour1">총 5 시간</div>
                  </div>
                </div>
              </Card2>
            </SwiperSlide>
          </Swiper>
        </Cards2>
      </MypageContent>
    </Wrapper>
  );
};

export default MypageClasses;

const Wrapper = styled.div`
  ${({ theme }) => theme.wrapper()}
  margin-top: 40px;
  position: relative;
  padding-bottom: 20px;
  height: 2000px;
`;

const MypageContent = styled.div`
  margin-top: -230px;
  margin-left: 30px;
  width: 800px;
  height: 1500px;
  float: right;
  display: inline-block;
`;

const Title1 = styled.div`
  font-size: 28px;
  width: 200px;
  height: 50px;
  margin-left: 40%;
  line-height: 50px;
  font-weight: 600;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const Ment1 = styled.div`
  font-size: 18px;
  color: #999999;
  font-family: Noto Sans KR;
  text-align: center;
  margin-top: 15px;
  margin-bottom: 15px;
  border-bottom: 0.5px solid #999999;
  padding-bottom: 20px;
`;

const Title2 = styled.div`
  font-size: 28px;
  width: 230px;
  height: 50px;
  margin-left: 38%;
  line-height: 50px;
  font-weight: 600;
  margin-top: 100px;
  margin-bottom: 10px;
`;

const Ment2 = styled.div`
  font-size: 18px;
  color: #999999;
  font-family: Noto Sans KR;
  text-align: center;
  margin-top: 15px;
  margin-bottom: 15px;
  border-bottom: 0.5px solid #999999;
  padding-bottom: 20px;
`;

const Cards1 = styled.div`
  margin-top: 30px;
  background-color: #eaf4d0;
  width: 830px;
  height: 420px;
  border-radius: 5px;
  margin-left: -20px;
`;

const Cards2 = styled.div`
  background-color: #f3f3f3;
  width: 800px;
  height: 420px;
  margin-top: 30px;
  border-radius: 5px;
`;

const Card1 = styled.div`
  margin-top: 10px;
`;

const Card2 = styled.div`
  margin-top: 10px;
`;
