import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import VodNav from './components/VodNav';

const VodMain = () => {
  const [vodList, setVodList] = useState([]);
  const [thumbSlik, setThumbSlik] = useState(null);
  const [videoSlik, setVideoSlik] = useState(null);
  const getVodListData = async () => {
    const res = await fetch('/data/vodData.json');
    const data = await res.json();

    setVodList(data);
  };
  useEffect(() => {
    getVodListData();
  }, []);

  return (
    <VodContain>
      <VodNav />
      <VideoList>
        <Slider
          lazyLoad={true}
          asNavFor={thumbSlik}
          fade={true}
          ref={video => setVideoSlik(video)}
        >
          {vodList.map((vod, idx) => {
            return (
              <Video key={idx}>
                <video
                  width="100%"
                  height="100%"
                  autoPlay
                  muted
                  loop
                  preload="true"
                  key={idx}
                >
                  <source src={vod.video} type="video/mp4" />
                </video>
                <VideoInfo>
                  <VideoTitle>{vod.title}</VideoTitle>
                  <DetailButton to={`/class/detail/${vod.id}`}>
                    자세히보기
                  </DetailButton>
                </VideoInfo>
              </Video>
            );
          })}
        </Slider>
      </VideoList>
      <Wrapper>
        <Navigation>
          <Slider
            infinite={true}
            lazyLoad={true}
            slidesToShow={5}
            centerMode={true}
            centerPadding={30}
            swipeToSlide={true}
            focusOnSelect={true}
            autoplay={true}
            autoplaySpeed={4000}
            asNavFor={videoSlik}
            ref={thumb => setThumbSlik(thumb)}
          >
            {vodList.map((vod, idx) => {
              return (
                <Thumb key={idx}>
                  <ImgWrap>
                    <ThumbImg src={vod.profile} />
                  </ImgWrap>
                  <ThumbTitle>{vod.category}</ThumbTitle>
                  <ThumbTutor>{vod.tutor}</ThumbTutor>
                </Thumb>
              );
            })}
          </Slider>
        </Navigation>
      </Wrapper>
    </VodContain>
  );
};

const VodContain = styled.div`
  position: relative;
  margin-top: -100px;
  min-width: 1290px;
  height: 100vh;
  background-color: #fff;
  z-index: 100;
  & + div {
    display: none;
  }
  video {
    object-fit: cover;
    top: 0;
    left: 0;
    min-width: 1290px;
    height: 100vh;
  }
`;
const Wrapper = styled.div`
  position: relative;
  ${({ theme }) => theme.wrapper('1290px', '0')};
  height: 100%;
`;
const VideoList = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 10;
  overflow: hidden;
  .slick-slider {
    width: auto !important;
    min-width: 1290px !important;
    height: 100vh;
  }
  .slick-slide {
    height: 100vh;
    & > div:before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      min-width: 1100px;
      height: 250%;
      background: linear-gradient(
        180deg,
        rgba(0, 0, 0, 0.6) 0%,
        rgba(0, 0, 0, 0.3) 34.38%,
        rgba(0, 0, 0, 0) 100%
      );
      z-index: 10;
    }
  }
`;

const Navigation = styled.div`
  position: absolute;
  bottom: 100px;
  right: 70px;
  width: calc(50% - 90px);
  z-index: 100;
  .slick-arrow {
    overflow: hidden;
    width: 50px;
    height: 50px;
    border: 1px solid #fff;
    background: transparent;
    border-radius: 50%;
    opacity: 0.75;
    transition: all 0.2s;
    &:hover {
      opacity: 1;
    }
  }
  .slick-prev {
    top: calc(50% - 18px);
    left: -55px;
  }
  .slick-next {
    top: calc(50% - 18px);
    right: -60px;
  }
  .slick-prev:before,
  .slick-next:before {
    content: '';
    display: block;
  }
  .slick-prev::after,
  .slick-next::after {
    content: '';
    display: block;
    position: absolute;
    top: calc(50% - 6px);
    width: 12px;
    height: 12px;
    border-left: 1px solid #fff;
    border-bottom: 1px solid #fff;
  }
  .slick-prev::after {
    transform: rotate(45deg);
    left: calc(50% - 4px);
  }
  .slick-next::after {
    transform: rotate(-135deg);
    right: calc(50% - 4px);
  }

  .slick-slide {
    margin-top: 5px;
    opacity: 0.75;
    cursor: pointer;
  }
  .slick-current {
    opacity: 1;
    > div > div > div:first-child {
      transform: scale(1.3);
      border: 2px solid #ffffff;
      -webkit-box-shadow: 0 10px 10px rgb(0 0 0 / 20%);
      box-shadow: 0 10px 10px rgb(0 0 0 / 20%);
    }
  }
`;
const Thumb = styled.div`
  color: #fff;
  text-align: center;
`;
const ImgWrap = styled.div`
  margin: 5px auto 15px;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;

  transition: all 0.2s;
`;
const ThumbImg = styled.img`
  width: 100%;
  height: 100%;
  background-color: #fff;
  object-fit: cover;
`;
const ThumbTitle = styled.div`
  margin: 5px 0;
  font-size: 14px;
`;
const ThumbTutor = styled.div`
  font-size: 12px;
`;
const Video = styled.div``;
const VideoInfo = styled.div`
  position: absolute;
  bottom: 100px;
  left: calc(50% - 580px);
  width: 550px;
  color: #fff;
  z-index: 100;
`;
const VideoTitle = styled.h2`
  margin-bottom: 10px;
  font-weight: 500;
  font-size: 30px;
  line-height: 42px;
  color: #fff;
  letter-spacing: -0.75px;
`;
const DetailButton = styled(Link)`
  display: inline-block;
  height: 42px;
  padding: 0 42px;
  border: 1px solid #ffffff;
  border-radius: 4px;
  font-size: 14px;
  line-height: 40px;
  background-color: transparent;
  transition: all 0.2s;
  text-decoration: none;
  color: #fff;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.purple};
    border-color: ${({ theme }) => theme.purple};
    font-weight: bold;
  }
`;

export default VodMain;
