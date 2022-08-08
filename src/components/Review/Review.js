import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Comment from './Comment';
import { BASE_URL } from '../../config';
import { getToken } from '../../utils';
import Detailz from '../../pages/About/Detailz';

const Review = ({ id }) => {
  const [newReview, setNewReview] = useState({ comment: '', image: '' });
  const [reviews, setReviews] = useState([]);

  const getReviewData = async () => {
    const res = await fetch(`${BASE_URL}/lectures/${id}`);
    const data = await res.json();

    setReviews(data.message.reviews);
  };

  useEffect(() => {
    getReviewData();
  }, []);

  const uploadReview = e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('content', newReview.comment);
    formData.append('review_image', newReview.image);

    // for (let value of formData.values()) console.log(value);
    // for (const keyValue of formData) console.log(keyValue);

    fetch(`${BASE_URL}/reviews/lecture/${id}`, {
      method: 'POST',
      headers: {
        Authorization: getToken(),
      },
      body: formData,
    }).then(res => {
      if (res.ok) {
        alert('등록이 완료되었습니다.');

        getReviewData();
      }
    });
  };

  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  return (
    <ReviewContainer>
      <ReviewBox>
        <Form onSubmit={uploadReview}>
          <div>
            <textarea
              className="contents"
              type="text"
              placeholder="리뷰 내용을 입력해주세요"
              onChange={e =>
                setNewReview({ ...newReview, comment: e.target.value })
              }
            />
            <ReviewButton>
              <button>작성하기</button>
            </ReviewButton>
          </div>
          <input
            type="file"
            accept="image/*"
            onChange={e => {
              setNewReview({ ...newReview, image: e.target.files[0] });
            }}
          />
        </Form>
      </ReviewBox>
      <div>
        {reviews?.map((review, idx) => (
          <Comment
            review={review}
            key={idx}
            setReviews={setReviews}
            reviews={reviews}
            getReviewData={getReviewData}
          />
        ))}
      </div>

      <React.Fragment>
        <button onClick={openModal} className="class_signbtn">
          모달시작
        </button>
        {/* //header 부분에 텍스트를 입력한다. */}
        <Detailz open={modalOpen} close={closeModal}>
          {/* // Modal.js <main> {props.children} </main>에 내용이 입력 */}
        </Detailz>
      </React.Fragment>
    </ReviewContainer>
  );
};

const ReviewBox = styled.div`
  display: flex;
  align-items: flex-start;
  margin-bottom: 80px;
`;
const ReviewContainer = styled.div``;

const Profile = styled.div`
  img {
    margin-right: 15px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
  }
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  flex: 1;
  > div {
    display: flex;
    textarea {
      flex: 1;
    }
  }
  .contents {
    height: 105px;
    margin-right: 10px;
    border: 1px solid #ddd;
  }
`;

const ReviewButton = styled.div`
  button {
    width: 100px;
    height:105px;
    margin: 0px;10px;10px;10px;
    background-color: #ff0045;
    border-radius: 6px;
    color:white;
    border:none;
    cursor : pointer;
  }
`;

export default Review;
