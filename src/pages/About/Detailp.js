import React, { Component } from 'react';

import d1 from './images/d1.jpg';
import d2 from './images/d2.jpg';

import { Divider } from '@mui/material';
import './Detailp.css';
import styled from 'styled-components';
import { theme } from '../../styles/theme';

const Wrapper = styled.div`
  ${({ theme }) => theme.wrapper()}
`;

const Detailp = () => {
  return (
    <Wrapper>
      <br />
      <br />
      <br />
      <div>
        <div className="detail_first">
          오늘, 한강이 가장 중요하게 생각하는 가치는 무엇인가요?
        </div>
        <div className="detail_photo">
          <img
            src={d1}
            alt=""
            style={{ width: '1035px', height: '450px', marginTop: '100px' }}
          />
        </div>
        <br />
        <br />
        <div className="detail_private">개인의 성장</div>
        <br />
        <br />
        <br />
        <div className="detail_privatename">
          오늘, 한강은 무엇보다 '개인의 성장'에 초점이 맞춰져있는 것 같아요!
          <br />
          <br />
          수업을 진행하는 '튜더'에게도, 수강하는 '수강생'에게도 성장의 가치를
          <br />
          <br />
          주고 있습니다. '튜더'는 오늘, 한강을 통해 자신의 재능과 노하우를
          <br />
          <br />
          사회적인 공식에서 벗어나 수강생에게 공급해 부가가치를 창출할 수 있어요
          <br />
          <br />
        </div>
        <br />
        <br />
        <br />
        <div className="detail_energy">오늘, 한강 에너지</div>
        <br />
        <br />
        <div className="detail_energyname">
          오늘, 한강은 항상 시끌벅적해요. <br />
          <br />
          아무래도 구성원 대부분이 20-30대 인것 <br />
          <br />
          도 이유겠지만 다들 기본적으로 새로운 걸 직접 배우고 해보고 뽐내는 것에
          <br />
          <br />
          관심이 많은 것 같아요! 실제로 오늘, 한강 팀원들이 튜더가 돼서 수업을
          <br />
          <br />
          열기도 하고, 어느 날은 수강생으로 모여서 이것저것 배우러 다녀요 <br />
          <br />
        </div>
        <br />
        <div className="detail_photod2">
          <img
            src={d2}
            alt=""
            style={{ width: '1035px', height: '450px', marginTop: '100px' }}
          />
        </div>
        <br />
        <br />
        <br />
        <br /> <br /> <br />
        <div className="detail_reasonable">공정하고 합리적</div>
        <br />
        <br />
        <div className="detail_reasonablename">
          <br />
          여타 회사들과는 달리 개개인의 의견에 귀기울여주고 타당하다면 바로
          <br />
          <br />
          시행에 옮기는 공정하고 합리적인 조직입니다. 따라서 누구나 조직의
          <br />
          <br />
          변호와 혁신을 이끌어 낼 수 있습니다
          <br />
          <br />
          <br />
          <div className="detail_changename">
            설마. 이런게 되겠어? 설마가 되는 곳이 바로 오늘,한강 입니다. 세상에
            <br />
            <br />
            모든 재능을 전파하려면 변화와 돚너을 두려워하면 안돼요. 오늘,한강은
            <br />
            <br />
            새로운 가능성이 시작되는 곳이기 때문이죠 많은 튜터님들이 탈잉에서
            <br />
            <br />
            새로운 도전을 합니다. 마피아게임 같이 하기, 바른자세로 걷기, 고기 잘
            굽기, 소맥 잘 말기 등등.
            <br />
            <br />
            이런 재능도 팔릴까? 두려움 반, 기대 반
            <br />
            <br />
            마음으로 세상에 없더 콘텐츠를 탄생 시켜요. 오늘,한강 팀원들이
            <br />
            <br />
            습관처럼 하는 말이 있어요. "이거 수업으로 만들면 재밌겠다!"
            <br />
            <br />
          </div>
        </div>
        <br />
      </div>
    </Wrapper>
  );
};

export default Detailp;
