import Sidebar from './Sidebar';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import MypageCard from './MypageCards.css';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import React, { useEffect, useState } from 'react';

const MypageLiked = () => {
  const [data, setData] = useState([]);
  const navi = useNavigate();

  //전역변수등록
  const SPRING_URL = process.env.REACT_APP_SPRING_URL;
  //url등록
  let listUrl = SPRING_URL + 'like/list?username=' + localStorage.username;
  let class_photoUrl = 'http://localhost:9009/save/';

  const list = () => {
    axios.get(listUrl, {}).then(res => {
      setData(res.data);
      console.log(res.data);
    });
  };

  useEffect(() => {
    list();
  }, []);

  return (
    <Wrapper>
      <div className="mypage_header"></div>
      <Sidebar />
      <MypageContent>
        <Title>찜한 클래스</Title>
        <Ment>
          내가 좋아요한 클래스들을 모아볼 수 있습니다. 클래스 신청까지 &nbsp;
          <b style={{ color: '#03d85e' }}>오늘, 한강</b>과 함께 해보세요!😄
        </Ment>
        <LikedClasses>
          {/* 하나의 카드 반복문 : (어쩌구) 값만 {div.머시기} 로 뽑아오세요*/}
          <div
            className="listdiv"
            style={{ width: '1000px', marginLeft: '30px' }}
          >
            {/* 하나의 카드 반복문 */}
            {data &&
              data.map((data, index) => (
                <div
                  className="each_class"
                  key={index}
                  style={{ height: '340px' }}
                >
                  <img
                    alt=""
                    src={class_photoUrl + data.class_photo1}
                    className="listimg"
                    onClick={() => {
                      navi(`/class/detail/${data.class_num}`);
                    }}
                  />

                  <div className="class_location" style={{ color: '#7814DC' }}>
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
                    <data className="class_price">{data.class_price}원</data>
                    <data className="class_hour">
                      (총 {data.class_hour}시간)
                    </data>
                  </div>
                </div>
              ))}
          </div>
        </LikedClasses>
      </MypageContent>
    </Wrapper>
  );
};

export default MypageLiked;

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
  height: 1000px;
  float: right;
  display: inline-block;
`;

const Title = styled.div`
  font-size: 28px;
  width: 150px;
  height: 50px;
  margin-left: 40%;
  line-height: 50px;
  font-weight: 600;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const Ment = styled.div`
  font-size: 18px;
  color: #999999;
  font-family: Noto Sans KR;
  text-align: center;
  margin-top: 15px;
  margin-bottom: 15px;
  border-bottom: 0.5px solid #999999;
  padding-bottom: 20px;
  width: 730px;
  margin-left: 45px;
`;

const LikedClasses = styled.div`
  width: 800px;
  height: 1000px;
  margin-top: 30px;
`;

const Card = styled.div`
  margin-top: 10px;
`;
