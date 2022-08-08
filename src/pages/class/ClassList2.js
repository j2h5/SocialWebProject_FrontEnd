import React, { useState, useEffect, useRef, useCallback } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import './ClassList.css';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { BASE_URL } from '../../config';

import ClassListRowItem from './ClassListRowItem';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import SportsHandballIcon from '@mui/icons-material/SportsHandball';
import KitesurfingIcon from '@mui/icons-material/Kitesurfing';
import BrushIcon from '@mui/icons-material/Brush';
import TextsmsIcon from '@mui/icons-material/Textsms'; //댓
import LocationOnIcon from '@mui/icons-material/LocationOn';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PetsIcon from '@mui/icons-material/Pets';
import img1 from '../../image/2.PNG';
import { LeftCircleFilled } from '@ant-design/icons';
import { getSpaceUntilMaxLength } from '@testing-library/user-event/dist/utils';

const ClassList = () => {
  const navigate = useNavigate();
  const { search } = useLocation();
  const filterDom = useRef();
  const navi = useNavigate();
  const likestate = useRef([]);

  //카테고리
  const [class_category, setclass_Category] = useState();

  //위치
  const [class_location, setclass_Location] = useState();

  //백엔드에서 받아올 리스트 데이터변수
  const [data, setData] = useState([]);
  const [change, setChange] = useState('');

  //필터링한거에 해당하는 데이터 (Category)
  const [filterData1, setFilterData1] = useState([]);

  //필터링한거에 해당하는 데이터 (Location)
  const [filterData2, setFilterData2] = useState([]);

  //필터 (Category)
  useEffect(() => {
    const newData = data.filter(
      a =>
        a.class_category === class_category &&
        a.class_location === class_location
    );
    setFilterData1(newData);
  }, [class_category, class_location]);

  //필터 (Location)
  useEffect(() => {
    const newData1 = data.filter(
      a =>
        a.class_location === class_location &&
        a.class_category === class_category
    );
    setFilterData2(newData1);
  }, [class_location, class_category]);

  //필터 기능 (Category)
  const onChangeCategory = ({ currentTarget }) => {
    setclass_Category(currentTarget.value);
  };

  //필터 기능 (Location)
  const onChangeLocation = ({ currentTarget }) => {
    setclass_Location(currentTarget.value);
  };

  //url 선언
  const SPRING_URL = process.env.REACT_APP_SPRING_URL;
  let class_alllistUrl = 'http://localhost:9009/class/list';
  let class_alllistUrl2 =
    'http://localhost:9009/class/list2?username=' + localStorage.username;
  let class_photoUrl = 'http://localhost:9009/save/';
  let likeUrl = process.env.REACT_APP_SPRING_URL + 'like/check';

  // // //처음에 불러오는 url
  // const list = () => {
  //   axios.get(class_alllistUrl).then(res => {
  //     setData(res.data);
  //     console.log('datalength:' + res.data.length);
  //     for (let i = 0; i < res.data.length; i++) {
  //       likestate.current[i] = '';
  //     }
  //     console.log('찐' + likestate.current.length);
  //     setFilterData1(res.data);
  //     setFilterData2(res.data);
  //   });
  // };

  // //처음에 불러오는 url
  const list = () => {
    axios.get(class_alllistUrl2).then(res => {
      setData(res.data);
      console.log('datalength:' + res.data.length);
      setFilterData1(res.data);
      setFilterData2(res.data);
    });
  };

  //data.length만큼 배열추가

  const [like, setLike] = useState('🤍');
  const likeChange = e => {
    if (like === '🤍') {
      setLike('❤️');
    } else {
      setLike('🤍');
    }
  };

  useEffect(() => {
    list();
  }, [change]);

  return (
    <Wrapper>
      {/* 필터 부분 */}
      <div className="row">
        {/* 위치 */}
        <select
          className="select1"
          style={{ width: '150px' }}
          onChange={onChangeLocation}
        >
          <option key="class_location" value="장소">
            장소
          </option>
          <option key="반포 한강공원" value="반포">
            반포 한강공원
          </option>
          <option key="잠실 한강공원" value="잠실">
            잠실 한강공원
          </option>
          <option key="이촌 한강공원" value="이촌">
            이촌 한강공원
          </option>
          <option key="여의도 한강공원" value="여의도">
            여의도 한강공원
          </option>
          <option key="난지 한강공원" value="난지">
            난지 한강공원
          </option>
          <option key="뚝섬 한강공원" value="뚝섬">
            뚝섬 한강공원
          </option>
        </select>
        {/* 장소 */}
        <select
          className="select1"
          style={{ width: '150px' }}
          onChange={onChangeCategory}
        >
          -
          <option key="class_category" value="전체">
            전체
          </option>
          <option key="스냅사진" value="스냅사진">
            스냅사진
          </option>
          <option key="스포츠" value="스포츠">
            스포츠
          </option>
          <option key="댄스" value="댄스">
            댄스
          </option>
          <option key="뮤직" value="뮤직">
            뮤직
          </option>
          <option key="드로잉" value="드로잉">
            드로잉
          </option>
        </select>
      </div>

      <div className="ClassHeader">오늘,한강과 함께</div>

      <div className="listdiv" style={{ marginTop: '30px' }}>
        {/* 하나의 카드 반복문 */}
        {filterData1 &&
          filterData1.map((data, idx) => (
            <div className="each_class" key={idx}>
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
                <data className="class_hour">(총 {data.class_hour}시간)</data>
              </div>

              <div
                className="class_like"
                onClick={() => {
                  axios
                    .post(likeUrl, {
                      like_class_num: data.class_num,
                      like_user_name: localStorage.username,
                    })
                    .then(res => {
                      console.log(res.data);
                      if (res.data === 1) likestate.current[idx] = '❤️';
                      else likestate.current[idx] = '🤍';

                      for (let i = 0; i < data.length; i++) {}
                      console.log(
                        '인덱스' + idx + '의 값:' + likestate.current[idx]
                      );
                      setChange(res.data);
                      console.log(likestate);
                    });
                }}
              >
                {data.like_user_name === null ? '🤍' : '❤️'}
                {/* <data className="heart" style={{ display: 'inline-block' }}>
                  162
                </data> */}
              </div>
            </div>
          ))}
      </div>
    </Wrapper>
  );
};

export default ClassList;

const Wrapper = styled.div`
  ${({ theme }) => theme.wrapper()}
  margin-top: 40px;
  position: relative;
  padding-bottom: 20px;
  height: 3500px;
`;

const FILTER_CATEGORYS = [
  {
    sort_type: 'location',
    title: '한강, 어디?',
    contents: ['반포', '잠실', '이촌', '여의도', '난지', '뚝섬'],
  },
  {
    sort_type: 'category',
    title: '카테고리',
    contents: ['스냅사진', '스포츠', '댄스', '뮤직', '드로잉'],
  },
];

const FilterList = styled.ul`
  display: flex;
`;

const Filter = styled.li`
  position: relative;
`;

const Category = styled.div`
  padding: 10px;
  margin: 0 5px;
  border: 1px solid #dbdbdb;
  border-radius: 3px;
  cursor: pointer;

  &:hover,
  &.show {
    background-color: #e6e9ed;
  }
`;

const Contents = styled.div`
  position: absolute;
  display: none;
  padding: 20px;
  top: 37px;
  left: 5px;
  width: 240px;
  border: 1px solid #dbdbdb;
  border-radius: 3px;
  background-color: white;
  z-index: 200;

  &.show {
    display: block;
  }
`;

const Content = styled.div`
  margin: 10px 0;
  cursor: pointer;
`;

const Btns = styled.div`
  padding-top: 20px;
  text-align: right;
  border-top: 1px solid #dbdbdb;
`;

const Button = styled.button`
  background-color: ${props => props.bgColor};
  margin: 2px;
  padding: 5px 10px;
  border: 1px solid #dbdbdb;
  border-radius: 5px;
  color: #fff;
  cursor: pointer;
`;
