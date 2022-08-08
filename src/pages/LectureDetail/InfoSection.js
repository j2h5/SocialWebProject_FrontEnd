import React from 'react';
import styled from 'styled-components';

const InfoSection = ({ notice, summary, recommendation }) => {
  return (
    <div>
      <Section>
        <Title>공지사항</Title>
        <Description>
          {String(notice)
            .split(';')
            .map(line => {
              return (
                <>
                  {line}
                  <br />
                </>
              );
            })}
        </Description>
      </Section>
      <Section>
        <Title>
          클래스
          <br /> 요약
        </Title>
        <Description>
          {String(summary)
            .split(';')
            .map(line => {
              return (
                <>
                  {line}
                  <br />
                </>
              );
            })}
        </Description>
      </Section>
      <Section>
        <Title>
          이런 분들이
          <br />
          들으면 좋아요.
        </Title>
        <Description>
          {String(recommendation)
            .split(';')
            .map(line => {
              return (
                <>
                  {line}
                  <br />
                </>
              );
            })}
        </Description>
      </Section>
    </div>
  );
};

const Section = styled.section`
  ${({ theme }) => theme.flexMixin('row', 'flex-start', 'space-between')};
  margin: 30px 0;
`;

const Title = styled.div`
  position: sticky;
  flex: none;
  top: 100px;
  width: 210px;
  padding-right: 60px;
  text-align: left;
  line-height: 34px;
  font-size: 26px;
  font-weight: 500;
  word-break: keep-all;
  color: ${({ theme }) => theme.fontMain};
`;

const Description = styled.div`
  position: relative;
  min-height: 360px;
  flex: 1;
  line-height: 24px;
  font-size: 15px;
  font-weight: normal;
  letter-spacing: -0.22px;
  word-break: break-all;

  section:first-child & {
    padding: 25px 97px 25px 20px;
    background-color: rgba(0, 0, 0, 0.02);

    &::before {
      content: '튜터 공지';
      position: absolute;
      top: 25px;
      right: 20px;
      width: 52px;
      height: 18px;
      border: 1px solid ${({ theme }) => theme.red};
      border-radius: 10px;
      text-align: center;
      font-weight: 500;
      font-size: 10px;
      line-height: 18px;
      color: ${({ theme }) => theme.red};
    }
  }
`;

export default InfoSection;
