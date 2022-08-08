import styled from 'styled-components';
import Header from './Header';
import StickyNav from './StickyNav';
import ImageViewer from './ImageViewer';
import ScrollNav from './ScrollNav';
import { useLocation, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import InfoSection from './InfoSection';
import { BASE_URL } from '../../config';
import Review from '../../components/Review/Review';

const LectureDetail = () => {
  const { state } = useLocation();
  const [lecture, setLecture] = useState({});
  const { id } = useParams();

  useEffect(() => {
    fetch(`${BASE_URL}/lectures/${id}`)
      .then(res => res.json())
      .then(res => {
        setLecture(res.message);
      });
  }, [id]);

  return (
    <div>
      <ScrollNav />
      <Wrapper>
        <Left>
          <Header
            title={lecture.title}
            schedule={lecture.schedule}
            region={lecture.region}
          />
          <div id="gallery">
            {lecture.images && <ImageViewer images={lecture.images} />}
          </div>
          <div id="intro">
            <InfoSection
              notice={lecture.notice}
              summary={lecture.summary}
              recommendation={lecture.recommendation}
            />
          </div>
          <div id="review">
            <Section>
              <Title>리뷰</Title>
              <ReviewArea>
                <Review id={id} />
              </ReviewArea>
            </Section>
          </div>
        </Left>
        <Right>
          <StickyNav
            schedule={lecture.schedule}
            region={lecture.region}
            isWishList={state && state.isWishList}
            lectureID={id}
          />
        </Right>
      </Wrapper>
    </div>
  );
};

const Wrapper = styled.div`
  ${({ theme }) => theme.wrapper('1200px', '0')};
  ${({ theme }) => theme.flexMixin('row', 'flex-start', 'space-between')};
  table-layout: fixed;
  padding-top: 40px;

  @media screen and (max-width: 1200px) {
    width: 1000px;
  }

  .image-gallery-slide-wrapper.right {
    width: calc(100% - 180px);
  }
  .image-gallery-thumbnails-wrapper.right {
    width: 160px;
    height: 100%;
  }
  .image-gallery-thumbnail {
    width: 100%;
    height: 150px;
  }
`;
const Left = styled.div`
  padding-top: -30px;
  width: calc(100% - 360px);
  @media screen and (max-width: 1200px) {
    width: 100%;
    padding: 0 40px;
  }
`;
const Right = styled.div`
  position: relative;
  width: 360px;
  padding-left: 50px;
`;

const Section = styled.section`
  ${({ theme }) => theme.flexMixin('row', 'flex-start', 'space-between')};
  margin: 30px 0;
`;

const Title = styled.div`
  position: sticky;
  flex: none;
  top: 100px;
  width: 210px;
  padding-right: 60px;
  text-align: left;
  line-height: 34px;
  font-size: 26px;
  font-weight: 500;
  word-break: keep-all;
  color: ${({ theme }) => theme.fontMain};
`;

const ReviewArea = styled.div`
  flex: 1;
`;

export default LectureDetail;
