import React, { Component } from 'react';
import Myslide from './Myslide';
import './About.css';
import { Divider } from '@mui/material';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import { useState } from 'react';
import m10 from './images/m10.jpg';
import m12 from './images/m12.jpg';
import FavoriteIcon from '@mui/icons-material/Favorite';

// import m11 from './images/m11.jpg';

const Wrapper = styled.div`
  ${({ theme }) => theme.wrapper()}
`;

export default class about extends Component {
  render() {
    return (
      <Wrapper>
        <div>
          <img
            src={m10}
            alt=""
            style={{ width: '1035px', height: '450px', marginTop: '100px' }}
          />
          <div className="about_textbox">
            <div className="about_title">오늘, 한강</div>
            <div className="about_text">
              <div style={{ marginBottom: '40px' }}>
                <FavoriteIcon style={{ fontSize: '60px', color: '#ffc338' }} />
              </div>
              "오늘, 한강"은 같은 관심사를 가진 사람들이 클래스로 만나는 서비스
              입니다.
              <br />
              <br />
              클래스를 통해 한강에서 오프라인 정모로 만나 함께 취미 활동을 즐길
              수 있습니다.
              <br />
              <br />
            </div>
          </div>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <Myslide></Myslide>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <br></br>
          <div className="about_texx">
            오늘, 한강 은 다양한 재능이 더 넓은 범위로 확산되고 연결될 수
            있도록,
            <br />
            <br />
            '사람들이 좀 더 재미있게 의미있게 배울 수 있도록' 많은 노력을
            기울이고 있습니다.
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            서울을 넘어 대한민국 전역으로, 대한민국을 넘어 <br />
            <br />
            세계 각지로 배움을 갈망하는 사람이라면 그 누구에게라도 재능과
            <br />
            <br />
            콘텐츠를 전파하고 확산시켜 쓸데없는 재능은 없다(all originals are
            special)는 비전으로 세상에 도전하고 있습니다.
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            누구나 하나쯤 남들보다 몰입해서 성과를 이뤄낸 분야가 있고, 그 생생한
            스토리와 지식의 가치는
            <br />
            <br />
            시장에서 쉽게 대체 되지 않습니다. 그 "재능" 을 더욱 매력적으로
            보이도록,
            <br />
            <br />더 많은 수강생들의 목소리를 담아 고도화될 수 있또록 끊임없이
            발전시키고 있습니다
          </div>
          <img
            src={m12}
            alt=""
            style={{ width: '1035px', height: '450px', marginTop: '100px' }}
          />
          <br />
          <br />
          <br />
          <br />
          <br />
          <div className="about_plus1">
            <a href="http://localhost:3000/about/1">
              <FavoriteIcon style={{ fontSize: '25px', color: '#ffc338' }} />
              오늘, 한강이 가장 중요하게 생각하는 가치는?
            </a>
          </div>
          <br />
          <br />
          <div className="about_plus2">
            <a href="http://localhost:3000/about/2">
              <FavoriteIcon style={{ fontSize: '25px', color: '#ffc338' }} />
              오늘, 한강의 팀원은 어떻게 일해요?
            </a>
          </div>
          <br />
          <br />
          <div className="about_plus3">
            <a href="http://localhost:3000/about/3">
              <FavoriteIcon style={{ fontSize: '25px', color: '#ffc338' }} />
              오늘, 한강을 만들어 가는 사람은 누구인가요?
            </a>
          </div>
          <br />
          <br />
        </div>
      </Wrapper>
    );
  }
}
