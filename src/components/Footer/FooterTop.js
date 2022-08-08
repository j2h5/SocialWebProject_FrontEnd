import styled from 'styled-components';

const FooterTop = ({ footerTitle, footerInfo }) => {
  return (
    <li>
      <FooterPtag>{footerTitle}</FooterPtag>
      <ul>
        {footerInfo.map(list => {
          const { id, data } = list;
          return <FooterLi key={id}>{data}</FooterLi>;
        })}
      </ul>
    </li>
  );
};

export default FooterTop;

const FooterPtag = styled.p`
  padding: 0 110px 20px 0;
  font-weight: 500;
  font-size: 16px;
  font-weight: ${({ theme }) => theme.weightBold};
`;

const FooterLi = styled.li`
  margin: 0 0 10px;
`;
