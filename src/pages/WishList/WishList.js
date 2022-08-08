import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import WishContents from './WishComponent/WishContents';
import API from '../../config';
import { getToken } from '../../utils';

const WishList = () => {
  const [lectures, setLectures] = useState([]);

  const getWishListData = () => {
    fetch(`${API.carts}`, {
      headers: {
        Authorization: getToken(),
      },
    })
      .then(res => res.json())
      .then(res => {
        setLectures(res.results);
      });
  };

  useEffect(() => {
    getWishListData();
  }, []);

  return (
    <Wrapper>
      <WishContainer>
        <TitleBox>
          <h2>찜한 클래스</h2>
          <p>찜</p>
        </TitleBox>

        {lectures &&
          lectures.map(lecture => (
            <WishContents
              lecture={lecture}
              getWishListData={getWishListData}
              key={lecture}
            />
          ))}
      </WishContainer>
    </Wrapper>
  );
};
const Wrapper = styled.div`
  ${({ theme }) => theme.wrapper()}
  display: flex;
  flex-direction: column;
`;
const WishContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
const TitleBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 1000px;
  h2 {
    font-size: 26px;
    font-weight: 400;
  }
  color: #333;
  line-height: 1.85;
  cursor: pointer;
`;
export default WishList;
