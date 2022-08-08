import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link, useParams } from 'react-router-dom';
import './ClassList.css';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import Pagination from 'react-js-pagination';
import Paging from '../../components/Pagination/Paging';

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
import { array } from 'i/lib/util';

const ClassList = () => {
  const navi = useNavigate();

  //백엔드에서 받아올 리스트 데이터변수
  const [data, setData] = useState([]);

  //필터링한거에 해당하는 데이터
  const [filterData1, setFilterData1] = useState([]);

  //필터링한거에 해당하는 데이터
  const [filterData2, setFilterData2] = useState([]);

  //카테고리
  const [class_category, setclass_Category] = useState();

  //카테고리
  const [class_location, setclass_Location] = useState();

  //필터 기능
  const onChangeCategory = ({ currentTarget }) => {
    setclass_Category(currentTarget.value);
  };

  //필터 기능2
  const onChangeLocation = ({ currentTarget }) => {
    setclass_Location(currentTarget.value);
  };

  // 현재 페이지번호 읽어오기
  const { currentPage } = useParams();

  //url 선언
  let pagelistUrl =
    'http://localhost:9009/class/pagelist?currentPage=' + currentPage;

  let class_photoUrl = 'http://localhost:9009/save/';

  //시작시 호출되는 함수
  const pageList = () => {
    axios.get(pagelistUrl).then(res => {
      setData(res.data.list);
      setFilterData1(res.data.list);
      setFilterData2(res.data.list);
    });
  };

  useEffect(() => {
    pageList();
  }, [currentPage]);

  //class category 필터
  useEffect(() => {
    const newData = data.filter(a => a.class_category === class_category);
    setFilterData1(newData);
  }, [class_category]);

  //class location 필터
  useEffect(() => {
    const newData1 = data.filter(b => b.class_location === class_location);
    setFilterData2(newData1);
  }, [class_location]);

  return (
    <Wrapper>
      <div className="row">
        <select
          className="select1"
          style={{ width: '150px' }}
          onChange={onChangeLocation}
        >
          <option key="class_location" value="장소" disabled>
            장소
          </option>
          <option key="반포 한강공원" value="반포 한강공원">
            반포 한강공원
          </option>
          <option key="잠실 한강공원" value="잠실 한강공원">
            잠실 한강공원
          </option>
          <option key="이촌 한강공원" value="이촌 한강공원">
            이촌 한강공원
          </option>
          <option key="여의도 한강공원" value="여의도 한강공원">
            여의도 한강공원
          </option>
          <option key="난지 한강공원" value="난지 한강공원">
            난지 한강공원
          </option>
          <option key="뚝섬 한강공원" value="뚝섬 한강공원">
            뚝섬 한강공원
          </option>
        </select>
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
          <option key="댄스/뮤직" value="댄스/뮤직">
            댄스/뮤직
          </option>
          <option key="드로잉" value="드로잉">
            드로잉
          </option>
          <option key="펫" value="펫">
            펫
          </option>
        </select>
      </div>
      <div className="ClassHeader">클래스입니다 헤더 이미지는 수정예정</div>

      <div className="radiofilter" style={{ float: 'right' }}>
        <label>
          <input type="radio" className="radio1" name="theme" />
          ✨최신순
        </label>
        <label style={{ marginLeft: '8px' }}>
          <input type="radio" className="radio1" name="theme" />
          🔥인기순
        </label>
        <label style={{ marginLeft: '8px' }}>
          <input type="radio" className="radio1" name="theme" />
          ⭐평점순
        </label>
      </div>

      <div className="listdiv">
        {/* 하나의 카드 반복문 */}
        {filterData1 &&
          filterData1.map((data, index) => (
            <div
              className="each_class"
              key={index}
              onClick={() => {
                navi(`/class/detail/${data.class_num}`);
              }}
            >
              <img
                alt=""
                src={class_photoUrl + data.class_photo1}
                className="listimg"
              />

              <div className="class_location">
                <div style={{ display: 'inline-block' }}>
                  <LocationOnIcon
                    style={{ fontSize: '20px', height: '20px' }}
                  />
                </div>
                <data className="class_location_name">
                  {data.class_location} 한강공원
                </data>
              </div>

              <div className="class_title1">
                <data className="class_title_name" style={{ float: 'right' }}>
                  {data.class_name}
                </data>
              </div>

              <div className="list_tutor_name">
                <data>{data.tutor_id} 튜터</data>
              </div>

              <div className="class_numbers">
                <data className="class_price">{data.class_price} 원</data>
                <data className="class_hour">(총 {data.class_hour}시간)</data>
              </div>

              <div className="class_like">
                <FavoriteBorderIcon
                  style={{
                    fontSize: '20px',
                    color: 'red',
                    height: '20px',
                    display: 'inline-block',
                  }}
                />
                <data className="heart" style={{ display: 'inline-block' }}>
                  162
                </data>
              </div>
            </div>
          ))}
      </div>
      <div className="listdiv">
        {/* 하나의 카드 반복문 */}
        {filterData2 &&
          filterData2.map((data, index) => (
            <div
              className="each_class"
              key={index}
              onClick={() => {
                navi(`/class/detail/${data.class_num}`);
              }}
            >
              <img
                alt=""
                src={class_photoUrl + data.class_photo1}
                className="listimg"
              />

              <div className="class_location">
                <div style={{ display: 'inline-block' }}>
                  <LocationOnIcon
                    style={{ fontSize: '20px', height: '20px' }}
                  />
                </div>
                <data className="class_location_name">
                  {data.class_location} 한강공원
                </data>
              </div>

              <div className="class_title1">
                <data className="class_title_name" style={{ float: 'right' }}>
                  {data.class_name}
                </data>
              </div>

              <div className="list_tutor_name">
                <data>{data.tutor_id} 튜터</data>
              </div>

              <div className="class_numbers">
                <data className="class_price">{data.class_price} 원</data>
                <data className="class_hour">(총 {data.class_hour}시간)</data>
              </div>

              <div className="class_like">
                <FavoriteBorderIcon
                  style={{
                    fontSize: '20px',
                    color: 'red',
                    height: '20px',
                    display: 'inline-block',
                  }}
                />
                <data className="heart" style={{ display: 'inline-block' }}>
                  162
                </data>
              </div>
            </div>
          ))}
      </div>

      {/* 페이징 처리 */}
      <div
        className="class_list_pagination"
        style={{ width: '700px', textAlign: 'center' }}
      >
        <ul className="pagination">
          {data.startPage > 1 ? (
            <li>
              <Link to={`/class/list/${data.startPage - 1}`}>이전</Link>
            </li>
          ) : (
            ''
          )}
          {data.parr &&
            data.parr.map(n => {
              const url = '/class/list/' + n;
              return (
                <li>
                  <Link to={url}>
                    <b style={{ color: n == currentPage ? 'red' : 'black' }}>
                      {n}
                    </b>
                  </Link>
                </li>
              );
            })}
          {data.endPage < data.totalPage ? (
            <li>
              <Link to={`/class/list/${data.endPage + 1}`}>다음</Link>
            </li>
          ) : (
            ''
          )}
        </ul>
      </div>

      <ClassFormButton
        onClick={() => {
          navi(`/class/form`);
        }}
      >
        클래스 등록하기
      </ClassFormButton>
    </Wrapper>
  );
};
export default ClassList;

const Wrapper = styled.div`
  ${({ theme }) => theme.wrapper()}
  margin-top: 40px;
  position: relative;
  padding-bottom: 20px;
  height: 2000px;
`;

const ClassFormButton = styled.button`
  font-size: 45px;
  font-weight: ${theme.weightBold};
  color: ${theme.green};
  cursor: pointer;
`;
