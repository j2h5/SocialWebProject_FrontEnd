import React from 'react';
import './MainClass.css';
import surf from '../images/surf_board.png';
import sucdv from '../images/sucdv.jpg';
import snapphoto from '../images/snapphoto.jpg';
import { NavLink } from 'react-router-dom';
const MainClass = () => {
  return (
    <div className="mainclass">
      <ul class="imglist_ul">
        <li>
          <NavLink style={{ textDecoration: 'none' }} to="class/detail/103">
            <div className="a">
              <div class="screen2">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <img src={surf} alt="" />
              </div>
              <h3>시원하게 즐기는 레저 스포츠</h3>
              <h1>최윤석 튜터</h1>
              <p>(11,000원 / 총 3시간)</p>
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink style={{ textDecoration: 'none' }} to="/class/detail/102">
            <div className="a">
              <div class="screen2">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <img src={sucdv} alt="" />
              </div>
              <h3>올바른 펫 워킹</h3>
              <h1>한별 튜터</h1>
              <p>(50,000원 / 총 3시간)</p>
            </div>
          </NavLink>
        </li>
        <li>
          <NavLink style={{ textDecoration: 'none' }} to="class/detail/93">
            <div className="a">
              <div class="screen2">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <img src={snapphoto} alt="" />
              </div>
              <h3> 스냅사진을 배워보자!</h3>
              <h1>김정하 튜터</h1>
              <p>(200,000원 / 총 3시간)</p>
            </div>
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default MainClass;
