import { useNavigate, useParams } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

import img2 from './classImage/rkfk1.JPG';
//import { useHistory } from 'react-router-dom';
const ClassPaybefore = props => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, header, data, changeoptions } = props;
  const navi = useNavigate();
  const user_id = localStorage.nickname; //아직
  const handleClick = e => {
    navi('/class/payment', {
      state: {
        data: {
          user_id: `${localStorage.nickname}`,
          classnum: `${props.data.class_num}`,
          classname: `${props.data.class_name}`,
          classoption_num: `${props.changeoptions.classoption_num}`,
          classoption_day: `${props.changeoptions.classoption_day}`,
          classoption_starttime: `${props.changeoptions.classoption_starttime}`,
          classoption_endtime: `${props.changeoptions.classoption_endtime}`,
          percnt: `${props.percnt}`,
          totpay: `${props.percnt * props.data.class_price}`,
          classconfirm: `${props.data.class_confirm}`,
        },
      },
    });
  };

  useEffect(() => {
    console.log(props);
  }, []);

  return (
    <div className={open ? 'openModal modal' : 'modal'}>
      {open ? (
        <section style={{ width: '520px', fontSize: '20px' }}>
          <header style={{ fontSize: '25px' }}>
            {header}
            <button className="close" onClick={close}>
              &times;
            </button>
          </header>
          <main>
            {props.children}
            <div style={{ marginTop: '20px', marginLeft: '70px' }}>
              <div style={{ fontWeight: '600', fontSize: '23px' }}>
                {props.data.class_name}
              </div>
              <div
                style={{ float: 'left', marginTop: '25px', marginLeft: '15px' }}
              >
                수업료
              </div>
              <div
                style={{
                  textAlign: 'right',
                  marginRight: '100px',
                  marginTop: '25px',
                }}
              >
                {props.data.class_price}원
              </div>
              <div
                style={{ float: 'left', marginTop: '15px', marginLeft: '15px' }}
              >
                신청일정
              </div>
              <div
                style={{
                  textAlign: 'right',
                  marginRight: '100px',
                  marginTop: '15px',
                  fontSize: '20px',
                }}
              >
                {props.changeoptions.classoption_day}&nbsp;
                {props.changeoptions.classoption_starttime}시~
                {props.changeoptions.classoption_endtime}시
              </div>
              <div
                style={{ float: 'left', marginTop: '15px', marginLeft: '15px' }}
              >
                신청인원
              </div>
              <div
                style={{
                  textAlign: 'right',
                  marginRight: '100px',
                  marginTop: '15px',
                }}
              >
                {props.percnt}명
              </div>
              <div
                style={{ float: 'left', marginTop: '15px', marginLeft: '15px' }}
              >
                총 결제금액
              </div>
              <div
                style={{
                  textAlign: 'right',
                  marginRight: '100px',
                  marginTop: '13px',
                  marginBottom: '20px',
                }}
              >
                {props.percnt * props.data.class_price}원
              </div>

              <br />
              <img
                alt=""
                src={img2}
                style={{
                  width: '320px',
                  height: '65px',
                  float: 'right',
                  marginRight: '80px',
                }}
              />
              <br />
              <br />
              <br />
            </div>
          </main>
          <footer>
            <button onClick={close}>취소</button>
            <button
              onClick={() => {
                handleClick();
              }}
              style={{ marginLeft: '10px' }}
            >
              결제
            </button>
          </footer>
        </section>
      ) : null}
    </div>
  );
};

export default ClassPaybefore;
