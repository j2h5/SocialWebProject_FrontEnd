import styled from 'styled-components';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import API from '../../config';
import { getToken } from '../../utils';

const StickyNav = ({ schedule, region, isWishList, lectureID }) => {
  const [likeChanged, setLikeChanged] = useState(isWishList);
  const [navPosition, setNavPosition] = useState('120px');

  const addToWish = () => {
    fetch(`${API.carts}/${lectureID}`, {
      method: 'POST',
      headers: {
        Authorization: getToken(),
      },
    }).then(res => {
      setLikeChanged(res.status === 201);
    });
  };

  const listenScrollEvent = () => {
    window.scrollY > 80 ? setNavPosition('100px') : setNavPosition('120px');
  };

  useEffect(() => {
    window.addEventListener('scroll', listenScrollEvent);
    return () => {
      window.removeEventListener('scroll', listenScrollEvent);
    };
  }, []);

  return (
    <Container
      style={{
        top: navPosition,
        transition: 'top .3s',
      }}
    >
      <Title>클래스일정</Title>
      <Content>
        <Lists>
          <List>
            <Schedules>
              <Schedule>{schedule}요일</Schedule>
              <Location>{region}</Location>
            </Schedules>
            <Place>상세위치는 문자로 보내드립니다.</Place>
          </List>
        </Lists>
      </Content>
      <Price>
        <Per>33,000원 / 시간</Per>
        <Total>33,000원 / 총 1회 1시간</Total>
      </Price>
      <ButtonGroup>
        <ButtonWish onClick={addToWish}>
          {likeChanged ? <FaHeart /> : <FaRegHeart />}
        </ButtonWish>
        <ButtonSubmit>클래스 신청하기</ButtonSubmit>
      </ButtonGroup>
    </Container>
  );
};

const Container = styled.div`
  position: fixed;
  top: 120px;
  right: calc(50% - 600px);
  width: 330px;
  padding: 15px 15px 25px;
  border-radius: 6px;
  box-shadow: 0 1px 4px 0 rgb(17 17 17 / 10%);
  background-color: rgba(255, 255, 255, 0.98);
  z-index: 2000;
  transition: all 1s;

  @media screen and (max-width: 1200px) {
    ${({ theme }) => theme.flexMixin('row', 'center', 'space-between')};
    width: 100vw;
    height: 80px;
    left: 0;
    right: 0;
    bottom: 0;
    top: auto !important;
    border-radius: 0;
  }
`;

const Title = styled.h2`
  padding-bottom: 10px;
  @media screen and (max-width: 1200px) {
    display: none;
  }
`;

const Content = styled.div`
  @media screen and (max-width: 1200px) {
    display: none;
  }
`;

const Lists = styled.div`
  padding-bottom: 20px;
  overflow-y: auto;
`;

const List = styled.div`
  display: block;
  padding: 13px 0;
  border-bottom: ${({ theme }) => theme.border};

  &:last-child {
    border: 0;
  }
`;

const Schedules = styled.div`
  ${({ theme }) => theme.flexMixin('row', 'center', 'space-between')};
`;

const Schedule = styled.div`
  margin-bottom: 7px;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: -0.35px;
  color: ${({ theme }) => theme.fontMain};
`;

const Location = styled.div`
  top: 14px;
  right: 0;
  width: 33%;
  word-break: keep-all;
  color: ${({ theme }) => theme.fontMain};
  text-overflow: ellipsis;
  text-align: right;
  white-space: nowrap;
  font-weight: 500;
  font-size: 14px;
  overflow: hidden;
`;

const Place = styled.div`
  font-size: 13px;
  color: ${({ theme }) => theme.fontSub};
`;

const Price = styled.div`
  text-align: right;
  @media screen and (max-width: 1200px) {
    text-align: left;
  }
`;

const Per = styled.div`
  margin-bottom: 5px;
  font-size: 16px;
  font-weight: bold;
`;

const Total = styled.div`
  font-size: 14px;
`;

const ButtonGroup = styled.div`
  display: flex;
  padding-top: 10px;
`;

const ButtonWish = styled.button`
  width: 48px;
  height: 48px;
  margin-right: 8px;
  padding: 0;
  border: 1px solid #ddd;
  border-radius: 6px;
  background-color: transparent;
  color: ${({ theme }) => theme.red};
  transition: filter 0.2s;
  font-size: 0;
  cursor: pointer;

  &:hover {
    filter: grayscale(15%);
  }

  svg {
    font-size: 18px;
  }
`;

const ButtonSubmit = styled.button`
  height: 48px;
  padding: 4px 12px;
  min-width: 180px;
  flex: 1;
  border-radius: 6px;
  border: 0;
  background-color: ${({ theme }) => theme.red};
  color: #fff;
  font-size: 16px;
  transition: filter 0.2s;
  cursor: pointer;

  &:hover {
    filter: grayscale(15%);
  }
`;

export default StickyNav;
