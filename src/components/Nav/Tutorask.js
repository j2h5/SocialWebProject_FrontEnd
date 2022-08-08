import React, { useEffect, useState } from 'react';
import './Modal.css';
import duck from './duck.png';
import axios from 'axios';

const Tutorask = props => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, header } = props;
  //전역변수등록
  const SPRING_URL = process.env.REACT_APP_SPRING_URL;
  //url등록
  let Url = SPRING_URL + 'tutor/ask';
  let detailUrl = SPRING_URL + 'tutor/detail?username=' + localStorage.username;

  const [set, setSet] = useState([]);
  const [data, setData] = useState({
    username: localStorage.username,
    state: '대기',
  });

  function ask() {
    for (let i = 0; i < set.length; i++) {
      if (set[i] === '대기') {
        alert('이미 신청중임^_^');
        return;
      } else if (set[i] === '수락') {
        alert('이미 수락된 회원입니다');
        return;
      }
    }
    axios.post(Url, data).then(res => {
      alert('신청이 완료되었습니다');
      close();
    });
  }

  useEffect(() => {
    axios.get(detailUrl).then(res => {
      setSet(res.data);
    });
    console.log(set);
  }, []);

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className={open ? 'openModal modal' : 'modal'}>
      {open ? (
        <section>
          <header>
            {header}
            <button className="close" onClick={close}>
              &times;
            </button>
          </header>
          <main>
            <img src={duck} style={{ width: '500px', marginBottom: '20px' }} />
            <h2 style={{ marginBottom: '20px' }}>
              {localStorage.username}님 튜터 신청을 하시겟습니꽉 ???
            </h2>
          </main>
          <footer>
            <button
              className="close"
              onClick={ask}
              style={{ marginRight: '7px' }}
            >
              신청
            </button>
            <button className="close" onClick={close}>
              닫기
            </button>
          </footer>
        </section>
      ) : null}
    </div>
  );
};
export default Tutorask;
