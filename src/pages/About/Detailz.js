import React, { useState } from 'react';
import styled from 'styled-components';
import { theme } from '../../styles/theme';
import Myslide2 from './Myslide2';
import './Detailz.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/CardGroup';

import d6 from './images/d6.jpg';
import d13 from './images/d13.jpg';
import b1 from './images/b1.jpg';
import b2 from './images/b2.jpg';
import b3 from './images/b3.jpg';
import b4 from './images/b4.jpg';
import b5 from './images/b5.jpg';
import b6 from './images/b6.jpg';

const Wrapper = styled.div`
  ${({ theme }) => theme.wrapper()}
`;

function Detailz() {
  return (
    <Wrapper>
      <br />
      <br />
      <div>
        <h2>오늘, 한강 을 만들어 가는 사람은 누구인가요?</h2>
        <img
          src={d6}
          alt=""
          style={{ width: '1035px', height: '550px', marginTop: '100px' }}
        />
        <br />
        <br />
        <div className="routine">
          일상에서는 쉽게 발견하지 못했을 각자의 재능을 발견해 다른 사람들과
          <br />
          나누는 곳. 그 과정에서 튜터와 수강생 모두가 함께 성장하는 곳. 저희가
          <br />
          생각하는 오늘, 한강 은 이런 곳이에요. 저 또한 한 명의 열렬한 유저로서
          이
          <br />
          경험이 얼마나 소중한지 알기에, 더욱 많은 분들이 재능 공유와 성장의
          <br />
          즐거움을 누리실 수 있도록 오늘, 한강을 가꾸어가는 일에 저희 재능을
          <br />
          활용하기로 결심했습니다.
        </div>
        <br />
        <div className="swiper-slide2">
          <Myslide2></Myslide2>
        </div>
        <br />
        <br />
        <br />
        <br />
        <div>
          <CardGroup>
            <Card>
              <Card.Body>
                <Card.Title style={{ color: '#324ea8' }}>경주</Card.Title>
                <Card.Text>
                  <img
                    src={b2}
                    alt=""
                    style={{
                      width: '250px',
                      height: '250px',
                      marginTop: '20px',
                      marginLeft: '30px',
                    }}
                  />
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">
                  나이: 30세
                  <br />
                  특기: 강한 펀치
                </small>
              </Card.Footer>
            </Card>
            <Card>
              <Card.Body>
                <Card.Title style={{ color: '#324ea8' }}>윤석</Card.Title>
                <Card.Text>
                  <img
                    src={b4}
                    alt=""
                    style={{
                      width: '250px',
                      height: '250px',
                      marginTop: '20px',
                      marginLeft: '30px',
                    }}
                  />
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">
                  나이: 26세
                  <br />
                  특기: 인성 보장
                </small>
              </Card.Footer>
            </Card>
            <Card>
              <Card.Body>
                <Card.Title style={{ color: '#324ea8' }}>준영</Card.Title>
                <Card.Text>
                  <img
                    src={b3}
                    alt=""
                    style={{
                      width: '250px',
                      height: '250px',
                      marginTop: '20px',
                      marginLeft: '30px',
                    }}
                  />
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">
                  나이: 36세
                  <br />
                  특기: 완벽함
                </small>
              </Card.Footer>
            </Card>
          </CardGroup>
        </div>
        <br />
        <br />
        <div>
          <CardGroup>
            <Card>
              <Card.Body>
                <Card.Title style={{ color: '#324ea8' }}>대한</Card.Title>
                <Card.Text>
                  <img
                    src={b5}
                    alt=""
                    style={{
                      width: '250px',
                      height: '250px',
                      marginTop: '20px',
                      marginLeft: '30px',
                    }}
                  />
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">
                  나이: 29세
                  <br />
                  특기: 토크 보장
                </small>
              </Card.Footer>
            </Card>
            <Card>
              <Card.Body>
                <Card.Title style={{ color: '#324ea8' }}>한별</Card.Title>
                <Card.Text>
                  <img
                    src={b6}
                    alt=""
                    style={{
                      width: '250px',
                      height: '250px',
                      marginTop: '20px',
                      marginLeft: '30px',
                    }}
                  />
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">
                  나이: ??세
                  <br />
                  특기: 아름다움
                </small>
              </Card.Footer>
            </Card>
            <Card>
              <Card.Body>
                <Card.Title style={{ color: '#324ea8' }}>정하</Card.Title>
                <Card.Text>
                  <img
                    src={b1}
                    alt=""
                    style={{
                      width: '250px',
                      height: '250px',
                      marginTop: '20px',
                      marginLeft: '30px',
                    }}
                  />
                </Card.Text>
              </Card.Body>
              <Card.Footer>
                <small className="text-muted">
                  나이: 26세
                  <br />
                  특기: 인성 성격 보장
                </small>
              </Card.Footer>
            </Card>
          </CardGroup>
        </div>
      </div>
    </Wrapper>
  );
}

export default Detailz;
