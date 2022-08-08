import React from 'react';
import './ClassGuide.css';
import river from './classImage/aa캡처2.jpg';
import img1 from './classImage/guide1.JPG';
import img2 from './classImage/guide2.JPG';
const ClassGuide = () => {
  return (
    <div style={{ clear: 'both', float: 'center', height: '2100px' }}>
      <img
        alt=""
        src={river}
        className="classguideimg"
        style={{ width: '1920px', height: '280px', fontFamily: 'Jua' }}
      />
      <div className="classlogo" style={{ width: '150px', height: '150px' }}>
        <span style={{ fontFamily: 'Jua', fontWeight: '600' }}>
          오늘,
          <br />
          한강
        </span>
      </div>

      <div className="guidecontent">
        <div className="guidetitle">오늘, 한강 튜터가이드</div>
        <img
          src={img1}
          alt=""
          style={{ marginLeft: '90px', marginTop: '50px', width: '800px' }}
        />
        <br />
        <img src={img2} alt="" style={{ marginLeft: '90px', width: '800px' }} />
        <br />
        <br />
      </div>
    </div>
  );
};

export default ClassGuide;
