import React from 'react';
import styled from 'styled-components';
import { BASE_URL } from '../../config';
import { getToken } from '../../utils';

const Comment = ({ review, getReviewData }) => {
  const { user, content, create, profile_image, review_image, review_id } =
    review;

  const deleteReview = () => {
    fetch(`${BASE_URL}/reviews/${review_id}`, {
      method: 'DELETE',
      headers: {
        Authorization: getToken(),
      },
    }).then(res => {
      if (res.ok) {
        alert('삭제되었습니다.');

        getReviewData();
      }
    });
  };
  return (
    <Container>
      <UserInfo>
        <img src={profile_image} alt="사진" />
        <div>
          <p>{user}</p>
          <span>{create.split('').splice(0, 10).join('')}</span>
        </div>
      </UserInfo>
      <CmtArea>
        <p>{content}</p>
        <img src={review_image} alt="사진" />
        <button onClick={deleteReview} />
      </CmtArea>
    </Container>
  );
};
const Container = styled.div`
  position: relative;
`;
const UserInfo = styled.div`
  display: flex;
  aligin-items: center;
  margin-top: 30px;
  img {
    display: inline-block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    background: red;
    margin-right: 20px;
    border: 1px solid #ccc;
  }
  p {
    font-size: 14px;
  }
`;
const CmtArea = styled.div`
  padding-left: 60px;
  padding: 22px 0;
  border-bottom: 1px solid #ddd;
  margin-left: 40px;
  img {
    width: 200px;
    height: 140px;
    margin: 20px;
  }
  p {
    margin-left: 20px;
    font-size: 14px;
    font-weight: 300;
  }
  button {
    border: none;
    background: white;
    text-decorate: under-line;
    position: absolute;
    width: 30px;
    height: 30px;
    right: 20px;
    top: 20px;
    cursor: pointer;
    &:before {
      content: '';
      display: block;
      position: absolute;
      width: 2px;
      height: 12px;
      background-color: #ccc;
      top: 0;
      left: calc(50% - 1px);
      transform: rotate(45deg);
    }
    &:after {
      content: '';
      position: absolute;
      display: block;
      width: 2px;
      height: 12px;
      background-color: #ccc;
      top: 0;
      left: calc(50% - 1px);
      transform: rotate(-45deg);
    }
  }
`;
export default Comment;
