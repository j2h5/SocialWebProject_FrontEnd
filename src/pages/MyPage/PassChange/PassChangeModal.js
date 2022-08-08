import React, { useState, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import styled from 'styled-components';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { appendErrors, useForm } from 'react-hook-form';
import './passChangeModal.css';

const PassChangeModal = props => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, header1 } = props;
  const navigate = useNavigate();

  //HOOK FORM
  const {
    register,
    handleSubmit,
    watch,
    trigger,
    formState: { isSubmitting, isDirty, errors },
  } = useForm({
    mode: 'onChange',
  });

  // 비밀번호 확인
  const password = useRef();
  password.current = watch('password');

  const onSubmit = async data => {
    await new Promise(r => setTimeout(r, 1000));
    console.log(data, errors);

    const username = localStorage.getItem('username');
    const pchupurl = 'http://localhost:9009/api/passchange';
    axios.post(pchupurl, data).then(res => {
      alert('비밀번호가 변경되었습니다.');
      navigate('/');
    });
  };

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className={open ? 'openModal modal' : 'modal'}>
      {open ? (
        <section1>
          <header1>
            {header1}
            <button onClick={close}>&times;</button>
          </header1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="passchange_wrapper">
              <div className="passchange_box">
                <div className="int-area2">
                  <input
                    type="password"
                    name="password"
                    id="password"
                    autoComplete="off"
                    required
                    aria-invalid={
                      !isDirty ? undefined : errors.password ? 'true' : 'false'
                    }
                    {...register('password', {
                      pattern: {
                        value: /^(?=.*\d)(?=.*[a-zA-Zs]).{8,}/,
                        message: '8자이상, 영문, 숫자를 혼용하여 주세요.',
                      },
                    })}
                  />
                  <label>새 비밀번호</label>
                </div>
                {errors.password && (
                  <div className="regis-error3">
                    <WarningAmberIcon style={{ fontSize: 'small' }} />
                    {errors.password.message}
                  </div>
                )}
                <div className="int-area2">
                  <input
                    type="password"
                    autoComplete="off"
                    required
                    {...register('password_confirm', {
                      required: (
                        <div className="regis-error">
                          <WarningAmberIcon style={{ fontSize: 'small' }} />
                          비밀번호를 한번 더 입력해주세요
                        </div>
                      ),
                      validate: value => value === password.current,
                      onChange: () => {
                        trigger('password_confirm');
                      },
                      onBlur: () => {
                        trigger('password_confirm');
                      },
                    })}
                  />
                  <label>새 비밀번호 확인</label>
                  {errors.password_confirm && (
                    <p>{errors.password_confirm.message}</p>
                  )}
                  {errors.password_confirm &&
                    errors.password_confirm.type === 'validate' && (
                      <div className="regis-error">
                        <WarningAmberIcon style={{ fontSize: 'small' }} />
                        비밀번호가 일치하지 않습니다.
                      </div>
                    )}
                </div>
              </div>
            </div>
            <input
              type="hidden"
              defaultValue={localStorage.getItem('username')}
              {...register('username')}
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="passchange_btn"
              //style={{ height: '20px' }}
            >
              변경하기☑️
            </button>
          </form>
          <footer>
            <button onClick={close}>닫기✖️</button>
          </footer>
        </section1>
      ) : null}
    </div>
  );
};

export default PassChangeModal;
