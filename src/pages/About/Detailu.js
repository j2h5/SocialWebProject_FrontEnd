import React from 'react';
import './Detailu.css';

import styled from 'styled-components';
import { theme } from '../../styles/theme';

import d3 from './images/d3.gif';

const Wrapper = styled.div`
  ${({ theme }) => theme.wrapper()}
`;

const Detailu = () => {
  return (
    <Wrapper>
      <div>
        <div>
          <img
            src={d3}
            alt=""
            style={{ width: '1035px', height: '450px', marginTop: '100px' }}
          />
        </div>
        <br />
        <br />
        <br />
        <div className="detail_pro">프로츄어</div>
        <br />
        <br />
        <br />
        <div className="detail_proname">
          오늘, 한강에서는 주니어와 시니어 구분 없이 모두가 동료로 통해요.
          <br />
          <br />
          그래서 누구나 자유롭게 아이디어를 낼 수 있어요. 물론, 초기의
          <br />
          <br />
          아이디어는 당장 실현이 불가능한 아마추어 형태여도 괜찮아요 도전을
          <br />
          <br />
          두려워하지 않는 팀원들과 함꼐 의논하며 수많은 고민을, 수차례 디벨롭
          <br />
          <br />
          하다보면, 결국에는 현재 상황에 맞는 최적의 솔루션을 도출 할 수 있어요
          <br />
          <br />
          <br />
          <br />
          <div className="detail_priority">우선 고객 입장에서</div>
          <br />
          <br />
          <div className="detail_priorityname">
            사용자는 버튼을 선택할 때 어떤 생각을 하고 있을까? 어떤 경험이
            <br />
            <br />
            사용자에게 쉽게 다가 올까? 일관된 경험을 쌓기 위해 아키텍처를 어떻게
            <br />
            <br />
            설계 하고 안정적인 구조를 만들 수 있을까?이런 고민과 같이 통일성
            <br />
            <br />
            있는 사용자 경험과 언제든지 재사용이 가능한 구조에 집착합니다.
            <br />
            <br />
            <br />
            <br />
            <div className="detail_data">데이터 기반</div>
            <br />
            <br />
            <div className="detail_dataname">
              저희는 행동을 함에 있어서 결정 과정에서 이럴거 같은데, 나는 이게
              <br />
              <br />
              더 좋아보이는데 같이 개인적인 판단으로 결정하지 않아요. 내가
              <br />
              <br />
              좋아하는 것과 고객이 좋아하는 것 은 언제나 다를 수 있기 때문이죠
              <br />
              <br />
              그래서 저희는 언제나 의사소통을 진행하기 앞서 어떤 데이터를 가지고
              <br />
              <br />
              말할 것인지, 왜 이것을 해야하는지를 충분한 데이터 조사를 통해
              <br />
              <br />
              의사결정을 진행합니다.
              <br />
              <br />
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Detailu;
