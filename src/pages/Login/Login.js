import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthService from '../../service/auth-service';
import API from '../../config';
import { setToken, setProfile, setNickname } from '../../utils';
import styled from 'styled-components';
import './css/login.css';
import duckimg from './image/duck.png';

const Login = () => {
  const navigate = useNavigate();

  function kakaLogin() {
    window.Kakao.Auth.login({
      //받아오고 싶은 정보
      scope: 'profile_nickname, profile_image, account_email, gender',
      //로그인 후 실행되는 코드(res=받아온데이터)
      success: function (res) {
        //console.log(res);
        window.Kakao.API.request({
          url: '/v2/user/me',
          success: res => {
            console.log(JSON.stringify(res));

            //이메일 중복확인
            //-----Username 중복체크
            const username = res.id;
            const email = res.kakao_account.email;
            const restoken = res.access_token;
            const profile = res.properties.profile_image;
            const nickname = res.properties.nickname;
            const emailChkUrl =
              'http://localhost:9009/api/emailcheck?email=' + email;

            axios.get(emailChkUrl).then(res => {
              if (res.data === 0) {
                //IF, 이메일이 USER TABLE에 없으면 회원가입
                const signupurl = 'http://localhost:9009/api/signup';
                axios
                  .post(signupurl, {
                    username: username,
                    password: username,
                    email: email,
                    profile: profile,
                    realname: nickname,
                  })
                  .then(res => {
                    // 회원가입 후 프로필, 기타 정보를 박아넣음.  여기서 authenticate url 호출하면 될 것 같기는 함..
                    setToken(restoken);
                    setProfile(profile);
                    setNickname(nickname);
                    goToMain();
                  });
              } else {
                //로컬스토리지에 저장
                setToken(restoken);
                setProfile(profile);
                setNickname(nickname);
                goToMain();
              }
            });
          },
          fail: function (error) {
            console.log(error);
          },
        });
      },
    });
  }
  const goToMain = () => {
    navigate('/');
  };

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [data, setData] = useState('');
  const getprofileurl = 'http://localhost:9009/api/getprofile';
  const loginchkurl = 'http://localhost:9009/api/loginchk';
  const idCheckURL = 'http://localhost:9009/api/idchk?username=';

  //일반 로그인
  const onSubmit = e => {
    e.preventDefault();

    axios.get(idCheckURL + username).then(res => {
      if (res.data === 0) {
        alert('존재하지 않은 아이디 입니다.');
      } else {
        axios
          .post(loginchkurl, { username, password, withCredentials: true })
          .then(res => {
            if (res.data === 0) {
              alert('비밀번호가 맞지 않습니다.');
            } else {
              AuthService.login(username, password, {
                withCredentials: true,
              }).then(res => {
                console.log(res);
                localStorage.loginok = 'yes';
                localStorage.username = username;
                const jwttoken = res.token;
                const profile = res.profile;
                //window.location.reload(); //새로고침

                //USER정보 불러오기
                AuthService.getProfile(username).then(res => {
                  setToken(jwttoken);
                  goToMain();
                });
              });
            }
          });
      }
    });
  };

  return (
    <LoginSection>
      <LoginBox>
        <div className="regis-form">
          <br />
          <form onSubmit={onSubmit}>
            <img alt="" src={duckimg} style={{ width: '80px' }} />
            <div className="int-area">
              <input
                type="text"
                name="username"
                id="username"
                autoComplete="off"
                required
                onChange={e => {
                  setUsername(e.target.value);
                }}
              />
              <label>USER NAME</label>
            </div>
            <div className="int-area">
              <input
                type="password"
                name="password"
                id="password"
                autoComplete="off"
                required
                onChange={e => {
                  setPassword(e.target.value);
                }}
              />
              <label>PASSWORD</label>
            </div>
            <div className="btn-area">
              <button type="submit">LOGIN</button>
            </div>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <div className="caption">
              <a href="/forgotPassword">Forgot Password?</a> /{' '}
              <a href="http://localhost:3000/register">Register</a>
            </div>
            <br />
            <br />
            <br />
          </form>
        </div>
        <KaKaoBtn type="button" onClick={kakaLogin}>
          <KakaoLoginImg
            alt="카카오로그인이미지"
            src="/images/kakao_login_medium_wide.png"
          />
        </KaKaoBtn>
      </LoginBox>
    </LoginSection>
  );
};

export default Login;

const LoginSection = styled.section`
  min-height: calc(100vh - 500px);
  padding: 130px 0 200px;
  text-align: center;
  ${props => props.theme.wrapper};
`;

const LoginBox = styled.div`
  width: 420px;
  margin: 0 auto;
  padding: 30px 20px;
  border: 1px solid #eee;
`;

const KaKaoBtn = styled.button`
  border: none;
  background-color: white;
`;

const KakaoLoginImg = styled.img`
  margin: 5px 0;
  &:hover {
    cursor: pointer;
  }
`;
