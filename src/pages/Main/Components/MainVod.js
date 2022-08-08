import React from 'react';
import './MainClass.css';
import surf from '../images/surf_board.png';
import { NavLink } from 'react-router-dom';
import guitar from '../images/guitar.jpg';
import running from '../images/running.png';
import bboy from '../images/bboy.png';
const MainVod = () => {
  return (
    <div className="mainvod">
      <ul class="imglist_ul">
        <li>
          <NavLink style={{ textDecoration: 'none' }} to="/class/detail/90">
            <div className="a">
              <div class="screen2">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <img src={guitar} alt="" />
              </div>
              <h3>홍대한의 기타 레슨</h3>
              <h1>홍대한 튜터</h1>
              <p>(150,000원 / 총 3시간)</p>
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink style={{ textDecoration: 'none' }} to="/class/detail/107">
            <div className="a">
              <div class="screen2">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <img src={running} alt="" />
              </div>
              <h3>한밤의 러닝</h3>
              <h1>김준영 튜터 </h1>
              <p>(15,000 / 총 5시간)</p>
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink style={{ textDecoration: 'none' }} to="class/detail/106">
            <div className="a">
              <div class="screen2">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <img src={bboy} alt="" />
              </div>
              <h3>경주의 비보이 교실</h3>
              <h1>이경주 튜터</h1>
              <p>(15,000원 / 총 4시간)</p>
            </div>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default MainVod;
