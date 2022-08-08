import { useState, useRef } from 'react';
import { useNavigate } from 'react-router';

import styled from 'styled-components';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { theme } from '../../styles/theme';

import { API } from '../../config';
import { getToken } from '../../utils';

const Card = ({ card, type, isWishList, getCardListData }) => {
  const heartBtn = useRef();
  const navigate = useNavigate();

  const [isLiked, setIsLiked] = useState(isWishList);
  const { lecture_id, type_names, category, title, price, images, likes } =
    card;

  const addToWish = () => {
    fetch(`${API.carts}/${lecture_id}`, {
      method: 'POST',
      headers: {
        Authorization: getToken(),
      },
    }).then(res => {
      setIsLiked(res.status === 201);
      getCardListData();
    });
  };

  const goToDetail = e => {
    if (heartBtn.current.contains(e.target)) return;

    navigate(`/lectures/${lecture_id}`, {
      state: { isWishList: isLiked },
    });
  };

  return (
    <Wrapper type={type} onClick={goToDetail}>
      <div>
        <Thumnail>
          <img src={images[0]} alt="thumnail" />
          <HeartBtn onClick={addToWish} ref={heartBtn}>
            {isLiked ? <FaHeart /> : <FaRegHeart />}
          </HeartBtn>
        </Thumnail>
        {type_names && (
          <CategoryTag type={type_names[0]}>{type_names[0]}</CategoryTag>
        )}
        <p>{title}</p>
        <Category>{category}</Category>
        <Price>{price}원</Price>
        <Likes type={type}>
          <StyledHeart /> {likes}
        </Likes>
      </div>
    </Wrapper>
  );
};

export default Card;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 20px 10px;
  width: ${({ type }) => (type ? '235px' : '200px')};
  height: 270px;
  cursor: pointer;

  p {
    margin: 10px 0;
    font-size: 13px;
  }

  h3 {
    margin: 10px 0;
  }

  .category {
    color: ${theme.fontSub};
  }
`;

const Thumnail = styled.div`
  position: relative;
  margin-bottom: 10px;

  img {
    width: 100%;
    height: 150px;
    border-radius: 10px;
  }
`;

const HeartBtn = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 22px;
  font-weight: ${theme.weightBold};
  color: ${theme.red};
  background-color: transparent;
  cursor: pointer;
  border: 0;
  z-index: 100;
`;

const CategoryTag = styled.span`
  padding: 3px;
  background-color: ${({ type, theme }) => {
    const colorForType = {
      오프라인: theme.purple,
      VOD: theme.red,
      전자책: theme.green,
    };

    return colorForType[type];
  }};
  color: white;
  font-size: 11px;
  border-radius: 3px;
`;

const Category = styled.p`
  position: absolute;
  bottom: 27px;
  color: ${theme.fontSub};
`;

const Price = styled.h3`
  position: absolute;
  bottom: 0px;
`;

const Likes = styled.span`
  position: absolute;
  bottom: -10px;
  font-size: 14px;
  font-weight: ${theme.weightBold};
`;

const StyledHeart = styled(FaHeart)`
  color: ${theme.red};
`;
