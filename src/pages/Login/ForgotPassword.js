import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthService from '../../service/auth-service';
import API from '../../config';
import { setToken, setProfile, setNickname } from '../../utils';
import styled from 'styled-components';
import './css/login.css';
import duckimg from './image/duck.png';
import { appendErrors, useForm } from 'react-hook-form';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';

const Login = () => {
  const navigate = useNavigate();
  //HOOK FORM
  const {
    register,
    handleSubmit,
    watch,
    trigger,
    setValue,
    getValues,
    formState: { isSubmitting, isDirty, errors },
  } = useForm({
    mode: 'onChange',
  });

  const goToMain = () => {
    navigate('/');
  };

  //이메일 데이터 전송하기
  const onSubmit = async data => {
    await new Promise(r => setTimeout(r, 1000));

    const emailChkUrl =
      'http://localhost:9009/api/emailcheck?email=' + data.email;
    const mailurl = 'http://localhost:9009/api/sendEmail';
    axios.get(emailChkUrl).then(res => {
      if (res.data === 0) {
        alert('가입되지 않은 이메일입니다.');
        return;
      }
      //IF 이메일이 DB에 없으면 return 하기 '가입되지 않은 이메일입니다'
      axios.post(mailurl, data).then(res => {
        alert('이메일을 전송하였습니다.');
        goToMain();
      });
    });
  };

  return (
    <LoginSection>
      <LoginBox>
        <div className="regis-form">
          <br />
          <form onSubmit={handleSubmit(onSubmit)}>
            <img
              alt=""
              src={duckimg}
              style={{ width: '80px', marginBottom: '30px' }}
            />
            <div className="regis_title1">가입한 이메일을 입력해 주세요~!</div>
            <div className="int-area">
              <input
                type="text"
                name="email"
                id="email"
                autoComplete="off"
                required
                aria-invalid={
                  !isDirty ? undefined : errors.email ? 'true' : 'false'
                }
                {...register('email', {
                  pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: '이메일 형식에 맞게 입력해주세요',
                  },
                })}
              />
              <label>E-MAIL</label>
            </div>
            {errors.email && (
              <div className="regis-error">
                <WarningAmberIcon style={{ fontSize: 'small' }} />
                {errors.email.message}
              </div>
            )}
            <div className="btn-area">
              <button type="submit" disabled={isSubmitting}>
                메일 전송하기
              </button>
            </div>
            <br />
            <br />
            <br />
          </form>
        </div>
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
