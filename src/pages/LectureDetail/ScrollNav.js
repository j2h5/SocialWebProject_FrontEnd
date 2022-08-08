import styled from 'styled-components';
import { Link } from 'react-scroll/modules';
import { useEffect, useState } from 'react';

const ScrollNav = () => {
  const [navSize, setnavSize] = useState('0');
  const [navColor, setnavColor] = useState('transparent');

  const listenScrollEvent = () => {
    window.scrollY > 80
      ? setnavColor('rgba(255, 255, 255, 0.98)')
      : setnavColor('transparent');
    window.scrollY > 80 ? setnavSize('80px') : setnavSize('0');
  };

  useEffect(() => {
    window.addEventListener('scroll', listenScrollEvent);
    return () => {
      window.removeEventListener('scroll', listenScrollEvent);
    };
  }, []);

  return (
    <NavDiv
      style={{
        backgroundColor: navColor,
        height: navSize,
        transition: 'all .3s',
      }}
    >
      <Wrapper>
        {LINK_DATA.map((link, idx) => {
          return (
            <Link key={idx} to={link.to} spy={true} offset={-100} smooth={true}>
              <LinkLabel>{link.label}</LinkLabel>
            </Link>
          );
        })}
      </Wrapper>
    </NavDiv>
  );
};

const NavDiv = styled.div`
  ${({ theme }) => theme.flexMixin('row', 'flex-end', 'flex-start')};
  height: 0;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 80px;
  background-color: #fff;
  border-bottom: ${({ theme }) => theme.border};
  z-index: 1000;
  overflow: hidden;
`;

const Wrapper = styled.div`
  ${({ theme }) => theme.wrapper('1200px', '0')};

  @media screen and (max-width: 1200px) {
    width: 1000px;
    margin: 0 40px;
  }

  a.active div {
    border-bottom: 2px solid ${({ theme }) => theme.red};
  }
`;

const LinkLabel = styled.div`
  display: inline-block;
  padding: 16px 0;
  margin-right: 30px;
  font-size: 15px;
  letter-spacing: -0.23px;
  cursor: pointer;
`;

const LINK_DATA = [
  {
    to: 'gallery',
    label: '이미지 갤러리',
  },
  {
    to: 'intro',
    label: '클래스 소개',
  },
  {
    to: 'review',
    label: '리뷰',
  },
];

export default ScrollNav;
