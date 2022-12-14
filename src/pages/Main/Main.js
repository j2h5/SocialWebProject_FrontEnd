import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import {
  FaVideo,
  FaLocationArrow,
  FaBook,
  FaHeart,
  FaMapMarkerAlt,
} from 'react-icons/fa';

import LectureSlide from './Components/LectureSlide';
import MainSlider from './Components/MainSlider';

import { getProfile, getNickName, getToken } from '../../../src/utils';

import styled from 'styled-components';
import { theme } from '../../styles/theme';
import Weather from './Weather';
import MainClass from '../Main/Components/MainClass';
import MainVod from '../Main/Components/MainVod';
const Main = () => {
  const validtoken = getToken();
  const navigate = useNavigate();
  const [currentId, setCurrentId] = useState(1);
  const [isShowed, setIsShowed] = useState(false);

  const goToCategoryList = e => {
    const { id } = e.target;
    navigate(`/class/list/`);
  };

  const goToDetail = e => {
    const { id } = e.target;
    navigate(`/class/detail/${id}`);
  };

  const navi = useNavigate();

  return (
    <Wrapper>
      <div>
        <MenuContainer>
          <MenuTab>
            <MenuList onMouseLeave={() => setIsShowed(false)}>
              {CATEGORY_TITLES.map((category, idx) => {
                return (
                  <li
                    key={category + idx}
                    onMouseOver={() => {
                      setCurrentId(idx + 1);
                      setIsShowed(true);
                    }}
                  >
                    {category}
                  </li>
                );
              })}
            </MenuList>
            <Contents
              className={isShowed && 'show'}
              onMouseOver={() => setIsShowed(true)}
              onMouseLeave={() => setIsShowed(false)}
            >
              {CATEGORY_CONTENTS[currentId].map((item, idx) => (
                <li
                  key={idx}
                  id={4 * (currentId - 1) + parseInt(idx) + 1}
                  onClick={goToCategoryList}
                >
                  {item}
                </li>
              ))}
            </Contents>
          </MenuTab>
          <MainSlider />
        </MenuContainer>

        <SubMenu>
          <ThreeSub>
            {/* ???????????? */}
            <Sub
              onClick={() => {
                navi(`/class/list`);
              }}
            >
              <FaLocationArrow />
              <SubSpan>????????????</SubSpan>
            </Sub>
            {/* vod */}
            <Sub
              onClick={() => {
                navi(`/vod`);
              }}
            >
              <FaVideo />
              <SubSpan>VOD</SubSpan>
            </Sub>
            {/* ??????  */}
            <Sub
              onClick={() => {
                navi(`/map`);
              }}
            >
              <FaMapMarkerAlt />
              <SubSpan>Map</SubSpan>
            </Sub>
          </ThreeSub>
          <WeatherSub>
            <div
              style={{
                fontSize: '14px',
                fontWeight: '500',
                float: 'right',
                backgroundColor: '#03d85e',
                borderRadius: '8px',
                width: '90px',
                height: '30px',
                lineHeight: '30px',
                textAlign: 'center',
                color: 'white',
              }}
            >
              ??????, ??????????
            </div>
            <Weather />
          </WeatherSub>
        </SubMenu>
        <MainContainer>
          <LectureContainer>
            <h3>?????? ????????? ??? ???????????? ?????????</h3>
            <MainClass />
            <h3>??????,?????? VOD, ???????????? ??? ????????????</h3>
            <MainVod />
            {/* <LectureSlide typesId="1" />

            <LectureSlide typesId="2" /> */}
          </LectureContainer>
          <ProfileContainer>
            <Profile>
              {!validtoken ? (
                <>
                  <LoginDescribe>
                    ????????? ????????? ??????,?????????
                    <br />
                    ????????? ????????? ???????????????.
                  </LoginDescribe>
                  <MainLoginBtn to="/login">??????????,?????? ?????????</MainLoginBtn>
                </>
              ) : (
                <prifileWrap>
                  <ProfileImg src={getProfile()} />
                  <h3 className="userId">{getNickName()} ???</h3>
                  <h4>????????????!???????? </h4>

                  <button
                    onClick={() => {
                      navi(`/mypage`);
                    }}
                  >
                    <StyledFaHeart />
                    <span style={{ fontSize: '14px', fontWeight: '400' }}>
                      Mypage
                    </span>
                  </button>
                </prifileWrap>
              )}
            </Profile>
            <Search>
              <h3>??????? ?????????</h3>

              {TREND_LIST.map(({ lectureId, title }) => {
                return (
                  <span key={lectureId} id={lectureId} onClick={goToDetail}>
                    #{title}
                  </span>
                );
              })}
            </Search>
          </ProfileContainer>
        </MainContainer>
      </div>
    </Wrapper>
  );
};

export default Main;

const CATEGORY_CONTENTS = {
  1: ['????????????', '?????????', '??????', '??????', '?????????'],
  2: ['????????????', '?????????', '??????', '??????', '?????????'],
  3: ['????????????', '?????????', '??????', '??????', '?????????'],
  4: ['????????????', '?????????', '??????', '??????', '?????????'],
  5: ['????????????', '?????????', '??????', '??????', '?????????'],
  6: ['????????????', '?????????', '??????', '??????', '?????????'],
};

const CATEGORY_TITLES = [
  '?????? ????  ',
  '?????? ???????',
  '?????? ????',
  '????????? ????',
  '?????? ????',
  '?????? ????',
];

const TREND_LIST = [
  { lectureId: 28, title: '???????????? ?????? ???????????? ?????????!' },
  { lectureId: 31, title: '????????? ????????? ????????? ??????!' },
  { lectureId: 33, title: '????????? ?????? ??????????????? ?????? ??????!' },
  { lectureId: 35, title: '??????????????? ?????? ????????? ????????????!' },
  { lectureId: 34, title: '?????? ????????? ????????? ?????????!' },
  { lectureId: 39, title: '??????????????? ???????????? ????????????' },
];

const Wrapper = styled.div`
  ${({ theme }) => theme.wrapper()}
`;

const MenuContainer = styled.div`
  display: flex;
  width: 100%;
  height: 370px;
  border-radius: 10px;
`;

const MenuTab = styled.div`
  position: relative;
  padding: 10px;
  width: 150px;
  height: 100%;
  background-color: ${theme.black};
  color: white;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
`;

const MenuList = styled.ul`
  li {
    margin: 20px;
    cursor: pointer;
  }
`;

const Contents = styled.ul`
  position: absolute;
  padding: 10px;
  top: 0px;
  left: 150px;
  height: 100%;
  background-color: white;
  color: black;
  opacity: 0;
  z-index: 10;
  transition: opacity 0.4s ease;

  li {
    margin: 20px;
    width: 100px;
    font-weight: ${theme.weightBold};
    cursor: pointer;
  }

  &.show {
    opacity: 1;
  }
`;

const SubList = styled.li`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 60px;
  font-weight: ${theme.weightBold};
  cursor: pointer;

  svg {
    margin-right: 8px;
    margin-bottom: 15px;
    font-size: ${theme.fontMedium};
    color: ${theme.green};
  }
`;

const MainContainer = styled.div`
  display: flex;
`;

const LectureContainer = styled.div`
  h3 {
    font-weight: ${theme.weightBold};
  }
`;

const ProfileContainer = styled.div`
  margin-left: 0px;
  margin-top: 10px;
`;

const Profile = styled.div`
  position: relative;
  padding: 25px;
  border: 1px #dbdbdb solid;
  border-radius: 3px;
  margin-bottom: 30px;

  button {
    position: absolute;
    right: 15px;
    bottom: 15px;
    border: 0;
    cursor: pointer;

    i {
      color: ${theme.green};
    }
  }

  .userId {
    font-weight: ${theme.weightBold};
    margin-bottom: 10px;
  }

  p {
    display: inline-block;
    padding: 5px 0;
    font-size: 14px;
    margin-top: 10px;
  }
`;

const StyledFaHeart = styled(FaHeart)`
  color: ${theme.green};
`;

const Search = styled.div`
  padding: 25px;
  border: 1px #dbdbdb solid;
  border-radius: 3px;

  h3 {
    font-weight: ${theme.weightBold};
    margin-bottom: 10px;
  }

  span {
    display: inline-block;
    margin: 6px;
    height: 38px;
    padding: 10px 5px;
    border: 1px solid skyblue;
    border-radius: 3px;
    cursor: pointer;
  }
`;

const LoginDescribe = styled.p`
  margin-bottom: 20px;
  font-weight: ${theme.weightBold};
`;

const MainLoginBtn = styled(Link)`
  display: block;
  padding: 12px 0;
  border-radius: 6px;
  text-align: center;
  text-decoration: none;
  color: #ffffff;
  font-size: 15px;
  line-height: 24px;
  background-color: #03d85e;
`;

const ProfileImg = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
`;

const Sub = styled.div`
  cursor: pointer;
  svg {
    margin-right: 8px;
    margin-bottom: 15px;
    font-size: ${theme.fontMedium};
    color: ${theme.green};
  }
  margin-top: 25px;
  margin-left: 150px;
  display: inline-block;
`;

const SubSpan = styled.div`
  font-family: Noto Sans KR;
  font-weight: 700;
`;

const ThreeSub = styled.div`
  width: 710px;
  display: inline-block;
  margin-top: 20px;
  justify-content: space-around;
`;

const WeatherSub = styled.div`
  position: relative;
  padding: 20px;
  margin-top: 10px;
  border: 1px #dbdbdb solid;
  margin-bottom: 10px;
  border-radius: 3px;
  width: 320px;
  display: inline-block;
  float: right;
`;

const SubMenu = styled.ul`
  margin-bottom: 10px;
  width: 1040px;
  height: 140px;
  display: inline-block;
`;
