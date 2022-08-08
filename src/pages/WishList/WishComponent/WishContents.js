import React from 'react';
import styled from 'styled-components';
import { BASE_URL } from '../../../config';
import { getToken } from '../../../utils';

const WishContents = ({ lecture, getWishListData }) => {
  const { lecture_id, thumbnail_url, name, price, summary } = lecture;

  const deleteLecture = () => {
    fetch(`${BASE_URL}/carts/like/${lecture_id}`, {
      method: 'DELETE',
      headers: {
        Authorization: getToken(),
      },
    }).then(res => {
      if (res.ok) {
        alert('삭제되었습니다!');
        getWishListData();
      }
    });
  };

  return (
    <Contents>
      <img src={thumbnail_url} alt="" />
      <DetailContents>
        <h3>{name}</h3>
        <p>{summary}</p>
        <Button>
          <font>₩</font>
          <span>{price.split('').splice(0, 5).join('')}</span>
          <button onClick={deleteLecture}>삭제</button>
        </Button>
      </DetailContents>
    </Contents>
  );
};

const Contents = styled.div`
  display: flex;
  width: 1000px;
  border: 1px solid #e4e4e4;
  border-right: none;
  border-left: none;
  img {
    flex: none;
    width: 320px;
    height: 180px;
    margin-left: 10px;
  }
  padding: 30px 0px 30px 0px;
`;
const DetailContents = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  flex: 1;
  h3 {
    letter-spacing: -0.6px;
    font-weight: 400;
    padding-right: 120px;
    margin-top: 40px;
    margin-left: 15px;
  }
  p {
    margin-left: 15px;
  }
`;
const Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  position: absolute;
  right: 0;
  bottom: 0;
  > * {
    display: inline-block;
  }
  font {
    font-size: 15px;
    color: #ff005a;
    margin-right: 4px;
  }
  span {
    font-size: 20px;
    font-weight: bold;
    color: #ff005a;
  }
  button {
    display: inline-block;
    font-weight: bold;
    border: 0;
    border-radius: 4px;
    padding: 4px 12px;
    height: 32px;
    font-size: 15px;
    color: #fff;
    background-color: ${({ theme }) => theme.red};
    margin-left: 10px;
    cursor: pointer;
  }
`;
const Container = styled.div`
  display: flex;
  justify-content: center;
`;
export default WishContents;
