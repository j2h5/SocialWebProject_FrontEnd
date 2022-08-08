import React from 'react';
import { useEffect, useState, useCallback } from 'react';
import useWishList from '../../../hooks/useWishList';
import styled from 'styled-components';
import Slider from 'react-slick';
import Card from '../../../components/Card/Card';
import { BASE_URL } from '../../../config';

const LectureSlide = ({ typesId }) => {
  const [cardList, setCardList] = useState([]);
  const wishList = useWishList();

  const getCardListData = useCallback(async () => {
    const res = await fetch(`${BASE_URL}/main`);

    const data = await res.json();

    setCardList(
      data.total_list.filter(list => list.type_ids[0] === parseInt(typesId))
    );
  }, [typesId]);

  useEffect(() => {
    getCardListData();
  }, [getCardListData]);

  const settings = {
    slide: <Card />,
    dots: true,
    infinite: true,
    speed: 500,
    arrows: true,
    autoplay: false,
    autoplaySpeed: 2000,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
    variableWidth: true,
    centerPadding: '0px',
  };

  return (
    <Wrapper>
      <StyledSlide {...settings}>
        {wishList &&
          cardList?.map(card => (
            <Card
              key={card.lecture_id}
              card={card}
              isWishList={wishList.includes(card.lecture_id)}
              getCardListData={getCardListData}
            />
          ))}
      </StyledSlide>
    </Wrapper>
  );
};

export default LectureSlide;

const StyledSlide = styled(Slider)`
  position: relative;
  margin-top: 30px;
  margin-bottom: -40px;
  width: 100%;

  .slick-list {
    width: 680px;
    height: 400px;
    margin: 0 auto;
    overflow: hidden;
  }

  .slick-slider {
    display: flex;
  }

  .slick-track {
    display: flex;
  }

  .slick-dots {
    display: none !important;
  }

  .slick-arrow {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 4px 6px;
    transform: translate(16px, 120px);
    border-radius: 50%;
  }

  .slick-arrow::before {
    border-radius: 50%;
    color: black;
  }

  .slick-prev {
    position: absolute;
    top: -30px;
    right: 0px;
    cursor: pointer;
  }

  .slick-next {
    position: absolute;
    top: -30px;
    right: -60px;
    cursor: pointer;
  }
`;

const Wrapper = styled.div`
  width: 600px;
`;
