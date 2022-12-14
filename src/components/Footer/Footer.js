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
            <FooterBboing>π μ€λ,νκ°νμκ² λ¬Έν¬νκΈ°</FooterBboing>
            <li>
              <FooterMarginTopPtag>μ΄μμκ°</FooterMarginTopPtag>
              <FooterMarginTopPtag>
                νμΌ 10:00 ~ 17:00 μ μ¬ 13:00 ~ 14:00
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
            μνΈ : μ€λ,νκ° | μ£Όμ : μμΈμ κ°λ¨κ΅¬ κ°λ¨λλ‘94κΈΈ 20 μΌμ€λΉλ© 9μΈ΅
            Ganamgu, Seoul, Korea
          </FooterInfo>
          <FooterInfo>
            λνμλͺ : κΉμ€μ, μ΄κ²½μ£Ό, νλν, νλ³, κΉμ ν, μ΅μ€μ
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
      { id: 1, data: 'νμ¬μκ°' },
      { id: 2, data: 'λΈλ‘κ·Έ' },
      { id: 3, data: 'μΈλ‘ λ³΄λ' },
    ],
  },
  {
    id: 2,
    footerTitle: 'POLICIES',
    footerInfo: [
      { id: 1, data: 'μ΄μ©μ½κ΄' },
      { id: 2, data: 'κ°μΈμ λ³΄μ²λ¦¬λ°©μΉ¨' },
    ],
  },
  {
    id: 3,
    footerTitle: 'SUPPORT',
    footerInfo: [
      { id: 1, data: 'FAQ' },
      { id: 2, data: 'μ€λνκ°μΌν°' },
    ],
  },
  {
    id: 4,
    footerTitle: 'B2B',
    footerInfo: [
      { id: 1, data: 'κΈ°μκ΅μ‘' },
      { id: 2, data: 'λΈλλμ ν΄' },
    ],
  },
];
