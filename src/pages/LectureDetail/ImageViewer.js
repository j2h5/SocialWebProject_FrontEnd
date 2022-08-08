import { useState } from 'react';
import Slider from 'react-slick';
import styled from 'styled-components';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const ImageViewer = ({ images }) => {
  const [viewer, setViewer] = useState();
  const [thumbnail, setThumbnail] = useState();
  return (
    <ViewerWrapper>
      {images.length > 0 && (
        <>
          <ImageArea>
            <Slider
              lazyLoad={true}
              asNavFor={thumbnail}
              fade={true}
              ref={slider1 => setViewer(slider1)}
            >
              {images.map((img, index) => (
                <img key={index} src={img.image} alt={'상세이미지' + index} />
              ))}
            </Slider>
          </ImageArea>
          <ThumbnailArea>
            <Slider
              infinite={true}
              lazyLoad={true}
              slidesToShow={3}
              vertical={true}
              swipeToSlide={true}
              focusOnSelect={true}
              verticalSwiping={true}
              asNavFor={viewer}
              ref={slider2 => setThumbnail(slider2)}
              adaptiveHeight={true}
            >
              {images.map((img, index) => (
                <img key={index} src={img.image} alt={'썸네일' + index} />
              ))}
            </Slider>
          </ThumbnailArea>
        </>
      )}
    </ViewerWrapper>
  );
};

const ViewerWrapper = styled.div`
  ${({ theme }) => theme.flexMixin('row', 'flex-start', 'space-between')};
`;
const ImageArea = styled.div`
  padding-top: 1px;
  margin-right: 10px;
  border-radius: 16px;
  overflow: hidden;
  width: calc(100% - 160px);
  .slick-slide {
    height: 400px;
  }
`;
const ThumbnailArea = styled.div`
  width: 200px;

  .slick-list {
    height: 410px !important;
  }

  .slick-slider {
    height: 420px;
    padding-bottom: 10px;

    &::after {
      content: '';
      position: absolute;
      bottom: 10px;
      left: 0;
      width: 100%;
      height: 102px;
      border-radius: 10px 10px 0 0;
      background: linear-gradient(
        to bottom,
        rgba(255, 255, 255, 0),
        rgba(255, 255, 255, 0.04) 2%,
        rgba(255, 255, 255, 0.88) 60%,
        #fff 72%
      );
      z-index: 99;
    }
  }

  .slick-slide {
    border-radius: 16px;
    overflow: hidden;
    margin-bottom: 8px;
    height: 160px;
    cursor: pointer;

    > div {
      height: 100%;
      font-size: 0;
    }

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }

  .slick-current {
    border: 1px solid ${({ theme }) => theme.red};
  }

  .slick-prev {
    top: 0;
    left: calc(50% - 10px);
    z-index: 100;
    opacity: 0;
    pointer-events: none;

    &::before {
      display: none;
    }
  }

  .slick-next {
    top: auto;
    bottom: 30px;
    left: calc(50% - 10px);
    z-index: 100;

    &::before {
      display: none;
    }

    &::after {
      content: '';
      display: block;
      position: absolute;
      top: calc(50% - 8px);
      left: calc(50% - 8px);
      width: 16px;
      height: 16px;
      border-left: 2px solid #000;
      border-bottom: 2px solid #000;
      transform: rotate(-45deg);
    }
  }
`;

export default ImageViewer;
