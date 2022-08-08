import styled from 'styled-components';

const Header = ({ title, region, schedule }) => {
  return (
    <div>
      <Tags>
        <Tag>{region}</Tag>
        <Tag>{schedule}요일</Tag>
      </Tags>
      <Title>{title}</Title>
    </div>
  );
};

const Tags = styled.ul`
  display: flex;
`;

const Tag = styled.li`
  position: relative;
  margin-right: 10px;
  font-size: 14px;
  font-weight: bold;
  color: ${({ theme }) => theme.red};
  letter-spacing: -0.35px;
  &::before {
    content: '';
    position: absolute;
    width: 2px;
    height: 2px;
    top: calc(50% - 1px);
    left: -6px;
    border-radius: 50%;
    background-color: ${({ theme }) => theme.red};
  }
  &:first-child::before {
    display: none;
  }
`;

const Title = styled.h1`
  margin: 6px 0 12px;
  font-size: 30px;
  line-height: 42px;
  font-weight: bold;
  letter-spacing: -0.45px;
  word-break: break-all;
  color: ${({ theme }) => theme.fontMain};
`;

export default Header;
