import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios'; //백엔드와 통신

const Payment = (effect, deps, props) => {
  const navi = useNavigate();
  const { state } = useLocation();
  console.log('pay : ' + state);

  useEffect(() => {
    const jquery = document.createElement('script');
    jquery.src = 'https://code.jquery.com/jquery-1.12.4.min.js';
    const iamport = document.createElement('script');
    iamport.src = 'https://cdn.iamport.kr/js/iamport.payment-1.1.7.js';
    document.head.appendChild(jquery);
    document.head.appendChild(iamport);
    return () => {
      document.head.removeChild(jquery);
      document.head.removeChild(iamport);
    };
  }, []);

  const onClickPayment = () => {
    const { IMP } = window;
    IMP.init('imp02710015');

    const data = {
      pg: 'html5_inicis',
      pay_method: 'card',
      merchant_uid: `hdh_${new Date().getTime()}`, //주문번호
      name: '오늘,한강',
      amount: `${state.data.totpay}`, //결제금액
      custom_data: {
        classnum: `${state.data.classnum}`,
        classname: `${state.data.classname}`, //클래스명
        classoption_num: `${state.data.classoption_num}`,
        classoption_day: `${state.data.classoption_day}`, //클래스일정1
        classoption_starttime: `${state.data.classoption_starttime}`, //클래스일정2
        classoption_endtime: `${state.data.classoption_endtime}`, //클래스일정3
        percnt: `${state.data.percnt}`, //신청인원
        amount: `${state.data.totpay}`, //결제금액
        classconfirm: `${state.data.classconfirm}`, //컨펌 메세지
      },
      //주문자정보
      buyer_name: `${localStorage.nickname}`,
      buyer_tel: '01012345678',
      buyer_email: 'gksquf5012@gmail.com',
      buyer_addr: '강남구 역삼동 178-8',
      buyer_postalcode: '01234',
    };

    IMP.request_pay(data, callback);

    navi('/class/payment/after', {
      state2: {
        id: {
          merchant_uid: data.merchant_uid,
        },
      },
    });
  };

  //url 등록
  let insertUrl = process.env.REACT_APP_SPRING_URL + 'pay/insert';

  const callback = response => {
    const {
      success,
      error_msg,
      imp_uid,
      merchant_uid,
      pay_method,
      paid_amount,
      status,
    } = response;

    if (success) {
      //insert
      axios
        .post(insertUrl, {
          pay_order_num: `hdh_${new Date().getTime()}`,
          pay_user_id: `${localStorage.username}`,
          pay_user_name: `${localStorage.nickname}`, //
          pay_class_num: state.data.classnum,
          pay_class_name: state.data.classname,
          pay_method: response.card_name,
          pay_classoption_num: state.data.classoption_num,
          pay_classoption_day: state.data.classoption_day,
          pay_classoption_starttime: state.data.classoption_starttime,
          pay_classoption_endtime: state.data.classoption_endtime,
          pay_classoption_percnt: state.data.percnt,
          pay_price: state.data.totpay,
        })
        .then(res => {
          alert('결제가 완료되었습니다~!');
        });
      console.log('1' + response.card_name);
      navi('/class/payment/after', { state: response });
    } else {
      alert(`결제 실패: ${error_msg}`);
      navi(-1);
    }
  };

  return <>{onClickPayment()};</>;
};
export default Payment;
