import React from 'react';
import './ClassGuide.css';
import river from './classImage/aa캡처2.jpg';

import img3 from './classImage/guide3.JPG';
import img4 from './classImage/guide4.JPG';
import img5 from './classImage/guide4.JPG';
const ClassIntroGuide = () => {
  return (
    <div>
      <img
        alt=""
        src={river}
        className="classguideimg"
        style={{ width: '1920px', height: '280px' }}
      />
      <div className="logoguide" style={{ width: '150px', height: '150px' }}>
        <span style={{ fontFamily: 'Jua' }}>
          오늘,
          <br />
          한강
        </span>
      </div>

      <div className="guidecontent">
        <div className="guidetitle">오늘, 한강 클래스소개 가이드</div>
        <img
          src={img3}
          alt=""
          style={{ marginLeft: '90px', marginTop: '50px', width: '800px' }}
        />
        <br />
        <br />
        <img src={img4} alt="" style={{ marginLeft: '90px', width: '800px' }} />
        <br />
        <br />
        <img src={img5} alt="" style={{ marginLeft: '90px', width: '800px' }} />
        <br />
        <br />
      </div>
    </div>
  );
};

export default ClassIntroGuide;
