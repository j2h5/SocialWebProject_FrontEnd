import React from 'react';
import Promotion from './Promotion';
import styled from 'styled-components';
import Slider from 'react-slick';

const MainSlider = () => {
  const settings = {
    slide: <Promotion />,
    dots: true,
    infinite: true,
    speed: 500,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    variableWidth: true,
    centerPadding: '0px',
  };

  return (
    <Wrapper>
      <StyledSlide {...settings}>
        <Promotion id="0" />
        <Promotion id="1" />
        <Promotion id="2" />
        <Promotion id="3" />
      </StyledSlide>
    </Wrapper>
  );
};

export default MainSlider;

const Wrapper = styled.div`
  display: flex;
`;

const StyledSlide = styled(Slider)`
  position: relative;
  margin-top: 30px;
  margin-bottom: -40px;
  width: 100%;

  .slick-list {
    position: absolute;
    width: 890px;
    height: 370px;
    margin: 0 auto;
    overflow: hidden;
    top: -30px;
  }

  .slick-slider {
    display: flex;
  }

  .slick-track {
    display: flex;
    height: 100%;
  }

  .slick-dots {
    display: none !important;
  }

  .slick-arrow {
    padding: 4px 6px;
    transform: translate(30px, 150px);
    background-color: transparent;
    color: white;
    border-radius: 3px;
    cursor: pointer;
  }

  .slick-prev {
    position: absolute;
    top: -20px;
    right: -800px;
    cursor: pointer;
    z-index: 100;
  }

  .slick-next {
    position: absolute;
    top: -20px;
    left: 810px;
    cursor: pointer;
  }
`;
