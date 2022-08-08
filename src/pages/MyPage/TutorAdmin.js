import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import Sidebar from './Sidebar';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import LocationOnIcon from '@mui/icons-material/LocationOn';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

const TutorAdmin = () => {
  const user_id = localStorage.username;
  let class_photoUrl = 'http://localhost:9009/save/';
  const navi = useNavigate();

  //등록한클래스
  let listurl =
    process.env.REACT_APP_SPRING_URL + 'class/mylist?username=' + user_id;
  const [data, setData] = useState([]);
  const list = () => {
    axios.get(listurl).then(res => {
      setData(res.data);
      console.log(data);
    });
  };

  //나의 튜티들
  let listurl2 =
    process.env.REACT_APP_SPRING_URL + 'class/mytuty?username=' + user_id;
  const [data2, setData2] = useState([]);
  const list2 = () => {
    axios.get(listurl2).then(res => {
      setData2(res.data);
      console.log(data);
    });
  };

  useEffect(() => {
    list();
    list2();
  }, []);

  return (
    <Wrapper>
      <div className="mypage_header"></div>
      <Sidebar />
      <MypageContent>
        <Title1>튜터 페이지</Title1>
        <Ment>
          튜터 신청으로 누구나 <b style={{ color: '#03d85e' }}>오늘, 한강</b>{' '}
          클래스의 튜터가 되어보세요!👩‍🏫
        </Ment>
        <AdminContent>
          <Title2>🔥내가 진행중인 클래스</Title2>
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
            <ClassCard>
              {/* 하나의 카드 반복문 */}
              {data &&
                data.map((data, index) => (
                  <SwiperSlide>
                    <div
                      className="each_class"
                      key={index}
                      style={{ height: '330px' }}
                    >
                      <img
                        alt=""
                        src={class_photoUrl + data.class_photo1}
                        className="listimg"
                        onClick={() => {
                          navi(`/class/detail/${data.class_num}`);
                        }}
                        style={{ marginBottom: '40px' }}
                      />

                      <div
                        className="class_location"
                        style={{ color: '#7814DC' }}
                      >
                        <div style={{ display: 'inline-block', float: 'left' }}>
                          <LocationOnIcon
                            style={{ fontSize: '18px', height: '20px' }}
                          />
                        </div>
                        <div className="class_location_name">
                          <data>{data.class_location} 한강공원</data>
                        </div>
                      </div>

                      <div className="class_title1">
                        <data
                          className="class_title_name"
                          style={{ float: 'right' }}
                          onClick={() => {
                            navi(`/class/detail/${data.class_num}`);
                          }}
                        >
                          {data.class_name}
                        </data>
                      </div>

                      <div className="list_tutor_name">
                        <data>{data.tutor_id} 튜터</data>
                      </div>

                      <div className="class_numbers">
                        <data className="class_price">
                          {data.class_price}원
                        </data>
                        <data className="class_hour">
                          (총 {data.class_hour}시간)
                        </data>
                      </div>
                    </div>
                  </SwiperSlide>
                ))}
            </ClassCard>
          </Swiper>
          <WhoisAttending>
            <Title3>🙌수강생 목록</Title3>
            <PeopleList>
              <OneLine>
                {/* 표 맨 윗줄 */}
                <Number>🍀</Number>
                <ClassName>클래스명</ClassName>
                <UserName>이름</UserName>
                <UserId>아이디</UserId>
                <Date>신청 날짜</Date>
              </OneLine>
              {data2 &&
                data2.map((data2, index) => (
                  <OneLine1 style={{ fontSize: '18px', height: '40px' }}>
                    {/* 하나의 반복문 : 한줄  */}
                    <Number1>{index + 1}</Number1>
                    <ClassName1
                      onClick={() => {
                        navi(`/class/detail/${data2.class_num}`);
                      }}
                    >
                      {data2.class_name}
                    </ClassName1>
                    <UserName1>{data2.pay_user_name}</UserName1>
                    <UserId1>{data2.pay_user_id}</UserId1>
                    <Date1>{data2.pay_day}</Date1>
                  </OneLine1>
                ))}
            </PeopleList>
          </WhoisAttending>
        </AdminContent>
      </MypageContent>
    </Wrapper>
  );
};

export default TutorAdmin;

const Wrapper = styled.div`
  ${({ theme }) => theme.wrapper()}
  margin-top: 40px;
  position: relative;
  height: 2000px;
`;

const MypageContent = styled.div`
  margin-top: -250px;
  margin-left: 30px;
  width: 800px;
  height: auto;
  float: right;
  display: inline-block;
`;

const Title1 = styled.div`
  font-size: 28px;
  width: 150px;
  height: 50px;
  margin-left: 40%;
  line-height: 50px;
  font-weight: 600;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const Title2 = styled.div`
  font-size: 28px;
  width: 300px;
  height: 50px;
  margin-left: 260px;
  line-height: 50px;
  font-weight: 500;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const Title3 = styled.div`
  font-size: 28px;
  width: 200px;
  height: 50px;
  margin-left: 320px;
  line-height: 50px;
  font-weight: 500;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const Ment = styled.div`
  font-size: 18px;
  width: 500px;
  margin-left: 150px;
  color: #999999;
  font-family: Noto Sans KR;
  text-align: center;
  margin-top: 15px;
  margin-bottom: 35px;
  border-bottom: 0.5px solid #999999;
  padding-bottom: 20px;
`;

const AdminContent = styled.div`
  width: 800px;
  height: 1000px;
  margin-top: 60px;
`;

const ClassCard = styled.div`
  width: 800px;
  height: 450px;
  background-color: white;
`;

const WhoisAttending = styled.div`
  width: 800px;
  height: 600px;
  border-top: 700px;
  margin-top: 20px;
`;

const PeopleList = styled.div`
  width: 800px;
  height: 500px;
  margin-top: 20px;
`;

const OneLine = styled.div`
  border-bottom: 1px solid gray;
  width: 750px;
  height: 40px;
  margin-left: 20px;
  font-size: 20px;
  font-weight: 600;
  background-color: #eaf4d0;
`;

const Number = styled.div`
  display: inline-block;
  width: 80px;
  line-height: 40px;
  height: 40px;
  text-align: center;
`;

const ClassName = styled.div`
  display: inline-block;
  height: 40px;
  width: 330px;
  line-height: 40px;
  text-align: center;
`;

const UserName = styled.div`
  display: inline-block;
  height: 40px;
  width: 100px;
  line-height: 40px;
  text-align: center;
`;

const UserId = styled.div`
  display: inline-block;
  height: 40px;
  width: 100px;
  line-height: 40px;
  text-align: center;
`;

const Date = styled.div`
  display: inline-block;
  height: 40px;
  line-height: 40px;
  width: 130px;
  text-align: center;
`;

const OneLine1 = styled.div`
  width: 750px;
  height: 40px;
  margin-left: 20px;
  font-size: 20px;
  font-weight: 400;
`;

const Number1 = styled.div`
  display: inline-block;
  width: 80px;
  line-height: 40px;
  height: 40px;
  text-align: center;
`;

const ClassName1 = styled.div`
  display: inline-block;
  height: 40px;
  width: 330px;
  line-height: 40px;
  text-align: center;
`;

const UserName1 = styled.div`
  display: inline-block;
  height: 40px;
  width: 100px;
  line-height: 40px;
  text-align: center;
`;

const UserId1 = styled.div`
  display: inline-block;
  height: 40px;
  width: 100px;
  line-height: 40px;
  text-align: center;
`;

const Date1 = styled.div`
  display: inline-block;
  height: 40px;
  line-height: 40px;
  width: 130px;
  text-align: center;
`;
