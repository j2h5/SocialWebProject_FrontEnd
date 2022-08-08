import FooterTop from './FooterTop';
import styled from 'styled-components';

const Footer = () => {
  return (
    <FooterDiv>
      <Container>
        <GlobalUl>
          {FOOTER_DATA.map(list => {
            const { id, footerTitle, footerInfo } = list;
            return (
              <FooterTop
                id={id}
                key={id}
                footerTitle={footerTitle}
                footerInfo={footerInfo}
              />
            );
          })}
          <li>
            <FooterPtag>Moraess CENTER</FooterPtag>
            <FooterBboing>😊 오늘,한강팀에게 문희하기</FooterBboing>
            <li>
              <FooterMarginTopPtag>운영시간</FooterMarginTopPtag>
              <FooterMarginTopPtag>
                평일 10:00 ~ 17:00 점심 13:00 ~ 14:00
              </FooterMarginTopPtag>
            </li>
            <SnsImg alt="sns" src="/images/free-icon-network-7185719.png" />
            <SnsImg alt="sns" src="/images/free-icon-youtube-1384012.png" />
            <SnsImg alt="sns" src="/images/premium-icon-facebook-665209.png" />
            <SnsImg alt="sns" src="/images/premium-icon-instagram-665211.png" />
          </li>
        </GlobalUl>
        <FooterBottom>
          <FooterInfo>
            상호 : 오늘,한강 | 주소 : 서울시 강남구 강남대로94길 20 삼오빌딩 9층
            Ganamgu, Seoul, Korea
          </FooterInfo>
          <FooterInfo>
            대표자명 : 김준영, 이경주, 홍대한, 한별, 김정하, 최윤석
          </FooterInfo>
        </FooterBottom>
      </Container>
    </FooterDiv>
  );
};

export default Footer;

const FooterDiv = styled.div`
  margin-top: 30px;
  padding: 40px 0 135px;
  border-top: 1px solid #ccc;
`;

const Container = styled.div`
  width: 1040px;
  margin: 0 auto;
`;

const GlobalUl = styled.ul`
  display: flex;
`;

const FooterBottom = styled.div`
  color: ${({ theme }) => theme.black};
`;

const FooterBboing = styled.li`
  color: ${({ theme }) => theme.red};
`;

const FooterPtag = styled.p`
  padding: 0 110px 20px 0;
  font-weight: 500;
  font-size: 16px;
  font-weight: ${({ theme }) => theme.weightBold};
`;

const FooterMarginTopPtag = styled.p`
  margin-top: 10px;
`;

const FooterInfo = styled.p`
  margin-top: 10px;
  font-size: ${({ theme }) => theme.fontMicro};
`;

const SnsImg = styled.img`
  width: 35px;
  height: 35px;
  margin-top: 35px;
  margin-left: 10px;
`;

const FOOTER_DATA = [
  {
    id: 1,
    footerTitle: 'COMPANY',
    footerInfo: [
      { id: 1, data: '회사소개' },
      { id: 2, data: '블로그' },
      { id: 3, data: '언론보도' },
    ],
  },
  {
    id: 2,
    footerTitle: 'POLICIES',
    footerInfo: [
      { id: 1, data: '이용약관' },
      { id: 2, data: '개인정보처리방침' },
    ],
  },
  {
    id: 3,
    footerTitle: 'SUPPORT',
    footerInfo: [
      { id: 1, data: 'FAQ' },
      { id: 2, data: '오늘한강센터' },
    ],
  },
  {
    id: 4,
    footerTitle: 'B2B',
    footerInfo: [
      { id: 1, data: '기업교육' },
      { id: 2, data: '브랜드제휴' },
    ],
  },
];
