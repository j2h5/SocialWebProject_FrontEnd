import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  getToken,
  getProfile,
  removeProfile,
  removeNickName,
  removeToken,
} from '../../../utils';
import { FiSearch } from 'react-icons/fi';
import styled from 'styled-components';
import AuthService from '../../../service/auth-service';

const VodNav = () => {
  const validtoken = getToken();

  const navigate = useNavigate();

  const [term, setTerm] = useState('');

  const goToMain = () => {
    navigate('/');
  };

  const searchTerm = e => {
    e.preventDefault();
    setTerm(e.target.value);
    navigate(`/list2?title=${term}`);
    setTerm('');
  };

  const kakaoLogout = () => {
    removeProfile();
    removeNickName();
    removeToken();
    AuthService.logout();
    alert('✅ 로그아웃 되었습니다.');
    goToMain();
  };

  return (
    <Container>
      <Wrapper>
        <Left>
          <LinkMain
            onClick={() => {
              navigate('/');
            }}
          >
            <Logo src="/images/vodlogo4.png" to="/" style={{ width: '80px' }} />
          </LinkMain>
          <PageMenu to="/">HOME</PageMenu>
          <PageMenu to="/vod">VOD</PageMenu>
          <PageMenu to="/class/list">CLASS</PageMenu>
          <PageMenu to="/About">ABOUT</PageMenu>
        </Left>
        <Right>
          <SearchBar>
            <form onSubmit={searchTerm}>
              <SearchInput
                placeholder="검색어를 입력해주세요."
                value={term}
                onChange={e => setTerm(e.target.value)}
              />
              <SearchButton>
                <FiSearch />
              </SearchButton>
            </form>
          </SearchBar>

          {!validtoken ? (
            <LoginMenu to="/login">로그인</LoginMenu>
          ) : (
            <LoginWrap>
              <LogoutButton onClick={kakaoLogout}>로그아웃</LogoutButton>
              <ProfileImg
                src={getProfile()}
                alt="카카오프로필임시"
                onClick={() => {
                  navigate(`/mypage`);
                }}
              />
            </LoginWrap>
          )}
        </Right>
      </Wrapper>
    </Container>
  );
};

const Container = styled.nav`
  height: 100px;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 1000;
`;

const Wrapper = styled.div`
  ${({ theme }) => theme.flexMixin('row', 'center', 'space-between')};
  ${({ theme }) => theme.wrapper('1200px', '0')};
  padding: 0 20px;
  height: 100%;
`;
const Left = styled.div`
  ${({ theme }) => theme.flexMixin('row', 'center', 'flex-start')};
`;
const LinkMain = styled.a`
  cursor: pointer;
`;
const Logo = styled.img`
  // filter: invert(100%);
  margin-right: 40px;
  width: 100px;
`;
const PageMenu = styled(Link)`
  font-family: Noto Sans KR;
  color: #fff;
  opacity: 0.8;
  margin-right: 20px;
  font-size: 16px;
  text-decoration: none;
  font-weight: 700;
  cursor: pointer;
  // &:last-child {
  //   font-weight: bold;
  //   opacity: 1;
  // }
`;
const Right = styled.div`
  ${({ theme }) => theme.flexMixin('row', 'center', 'flex-start')};
`;
const SearchBar = styled.div`
  position: relative;
  width: 280px;
`;
const SearchInput = styled.input`
  width: 100%;
  height: 44px;
  padding: 0 58px 0 16px;
  border: 1px solid rgba(255, 255, 255, 0.4);
  color: #ffffff;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 22px;
  font-family: Noto Sans KR;
  font-size: 16px;
`;
const SearchButton = styled.button`
  position: absolute;
  padding-right: 12px;
  top: 0;
  right: 0;
  bottom: 0;
  background-color: transparent;
  border: 0;
  color: #fff;
  font-size: 20px;
  cursor: pointer;
`;

const GnbTutor = styled(Link)`
  color: #fff;
  opacity: 0.8;
  margin-right: 20px;
  font-size: 16px;
  text-decoration: none;
  cursor: pointer;
`;

const LoginMenu = styled(Link)`
  color: #fff;
  text-decoration: none;
  font-size: 14px;
  margin-left: 20px;
  cursor: pointer;
`;
const LogoutButton = styled.button`
  color: #fff;
  text-decoration: none;
  font-size: 14px;
  margin-left: 20px;
  background-color: transparent;
  border: 0;
  cursor: pointer;
`;

const LoginWrap = styled.div`
  display: flex;
  align-items: center;
`;

const ProfileImg = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  overflow: hidden;
  background-color: #fff;
  margin-left: 20px;
  cursor: pointer;
`;

export default VodNav;
