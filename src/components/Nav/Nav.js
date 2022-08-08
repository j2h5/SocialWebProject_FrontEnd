import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  getToken,
  getProfile,
  removeProfile,
  removeNickName,
  removeToken,
  removeAuthority,
} from '../../utils';
import backgroundimg from '../../assets/premium-icon-magnifier-2311526.png';
import styled from 'styled-components';
import AuthService from '../../service/auth-service';
import Tutorask from './Tutorask';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';

const Nav = () => {
  const navigate = useNavigate();
  const [term, setTerm] = useState('');
  const [msg, setMsg] = useState('');

  const validtoken = getToken();

  const goToMain = () => {
    navigate('/');
  };

  const [modalOpen2, setModalOpen2] = useState(false);
  const openModal2 = () => {
    setModalOpen2(true);
  };
  const closeModal2 = () => {
    setModalOpen2(false);
  };

  const searchTerm = e => {
    e.preventDefault();
    setTerm(e.target.value);
    navigate(`/class/list2?class_title=${term}`);
    setTerm('');
  };

  const kakaoLog = () => {
    if (!window.Kakao.Auth.getAccessToken()) {
      AuthService.logout();
      alert('✅ 로그아웃 되었습니다.');
      goToMain();
    } else {
      window.Kakao.Auth.logout(function () {
        // window.Kakao.init();
        // window.Kakao.isInitialized();
        AuthService.logout();
        goToMain();
        alert('✅ 로그아웃 되었습니다.');
      });
    }
  };

  return (
    <WrapperHead>
      <Link to="/">
        <LogoImg alt="로고" src="/images/로고4.png" />
      </Link>
      <div style={{ width: '380px' }}>
        <GnbHome to="/">HOME</GnbHome>
        <GnbVod to="/vod">VOD</GnbVod>
        <GnbClass to="/class/list">Class</GnbClass>
        <GnbAbout to="/about">About</GnbAbout>

        <React.Fragment>
          {localStorage.loginok === 'yes' &&
          localStorage.username !== 'admin' &&
          localStorage.authority !== '2' ? (
            <GnbTutor to="/" onClick={openModal2}>
              Tutor 신청
            </GnbTutor>
          ) : localStorage.loginok === 'yes' &&
            localStorage.authority === '2' &&
            localStorage.username !== 'admin' ? (
            <GnbTutor to="/class/form">Class 등록</GnbTutor>
          ) : (
            ''
          )}
          <Tutorask
            open={modalOpen2}
            close={closeModal2}
            header="튜터 신청"
          ></Tutorask>
        </React.Fragment>

        {localStorage.loginok === 'yes' && localStorage.username === 'admin' ? (
          <GnbTutor to="/class/admin">Tutor 신청확인</GnbTutor>
        ) : (
          ''
        )}
      </div>
      <SearchArea>
        <SearchInput
          type="text"
          placeholder="배우고 싶은 수업을 찾아 보세요."
          onChange={e => setMsg(e.target.value)}
          onKeyUp={e => {
            if (e.key === 'Enter' && msg !== '') {
              navigate('/class/list/' + msg);
              setMsg('');
            }
          }}
        />

        <SearchGlass />
      </SearchArea>
      <GnbRight>
        {!validtoken ? (
          <LoginMenu to="/login">
            <LoginIcon style={{ color: 'black' }} />
          </LoginMenu>
        ) : (
          <LoginWrap>
            <LogoutBtn onClick={kakaoLog} style={{ marginLeft: '20px' }}>
              <LogoutIcon />
            </LogoutBtn>
            <ProfileImg
              src={getProfile()}
              alt="카카오프로필임시"
              onClick={() => {
                navigate(`/mypage`);
              }}
            />{' '}
          </LoginWrap>
        )}
      </GnbRight>
    </WrapperHead>
  );
};

export default Nav;

const WrapperHead = styled.div`
  display: flex;
  text-align: center;
  top: 0;
  align-items: center;
  width: 1100px;
  height: 80px;
  margin: 0 auto;
  padding: 0 32px 0 36px;
  background-color: #fff;
  border-color: #eeeeee;
  background-color: #fff;
  z-index: 100;
`;

const LogoImg = styled.img`
  width: 80px;
  margin-right: 80px;
`;

const GnbHome = styled(Link)`
  color: ${props => props.theme.green};
  font-weight: ${props => props.theme.weightBold};
  text-decoration: none;
`;

const GnbVod = styled(Link)`
  margin-left: 20px;
  color: ${({ theme }) => theme.black};
  font-weight: ${({ theme }) => theme.weightBold};
  text-decoration: none;
`;

const GnbClass = styled(Link)`
  margin-left: 20px;
  color: ${({ theme }) => theme.black};
  font-weight: ${({ theme }) => theme.weightBold};
  text-decoration: none;
`;

const GnbAbout = styled(Link)`
  color: ${({ theme }) => theme.black};
  font-weight: ${({ theme }) => theme.weightBold};
  text-decoration: none;
  margin-left: 20px;
`;

const GnbTutor = styled(Link)`
  color: ${({ theme }) => theme.black};
  font-weight: ${({ theme }) => theme.weightBold};
  text-decoration: none;
  margin-left: 20px;
`;

const SearchArea = styled.div`
  position: relative;
  width: 280px;
  margin-left: 150px;
`;

const SearchInput = styled.input`
  width: 100%;
  height: 44px;
  padding: 0 58px 0 16px;
  border-radius: 22px;
  border-color: #f6f6f6;
  font-size: ${({ theme }) => theme.fontMicro};
  background-color: #f9f9f9;
  border: 1px solid #ddd;
`;

const SearchGlass = styled.button`
  position: absolute;
  right: 8px;
  top: 5px;
  width: 30px;
  height: 30px;
  border: none;
  background: url(${backgroundimg}) no-repeat center/cover;
`;

const GnbRight = styled.div`
  margin-left: auto;
`;

const LoginWrap = styled.div`
  display: flex;
  align-items: center;
`;

const LoginMenu = styled(Link)`
  margin-right: 10px;
  font-size: ${({ theme }) => theme.fontMicro};
  text-decoration: none;
`;

const LogoutBtn = styled.p`
  margin-right: 10px;
  background: #fff;
  border: 0;
  font-size: ${({ theme }) => theme.fontMicro};
  &:hover {
    cursor: pointer;
  }
`;

const ProfileImg = styled.img`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  cursor: pointer;
`;
