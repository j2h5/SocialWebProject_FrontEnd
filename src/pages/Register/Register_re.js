import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import AuthService from '../../service/auth-service';
import API from '../../config';
import { setToken, setProfile, setNickname } from '../../utils';
import styled from 'styled-components';
import './css/register.css';
import img1 from './image/profile.jpg';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import Button from '@mui/material/Button';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { appendErrors, useForm } from 'react-hook-form';
import { getValue } from '@testing-library/user-event/dist/utils';

const Register = () => {
  const navi = useNavigate();

  const [data, setData] = useState('');
  const getprofileurl = 'http://localhost:9009/api/getprofile';

  const username = localStorage.getItem('username');
  const profile = localStorage.getItem('profile');

  const onProfileReceive = () => {
    axios.get(getprofileurl + '?username=' + username).then(response => {
      console.log(response.data);
      setData(response.data);
    });
  };

  useEffect(() => {
    onProfileReceive();
  }, []);

  //---------프로필 사진 관련
  //const [profile, setProfile] = useState(); //img1
  const photoInput = useRef();
  const imgChange = () => {
    photoInput.current.click();
  };

  let uploadUrl = 'http://localhost:9009/api/upload';
  let photoUrl = 'http://localhost:9009/save/';

  //이미지 업로드
  const imageUpload = e => {
    const uploadFile = e.target.files[0];
    const imageFile = new FormData();
    imageFile.append('uploadFile', uploadFile);

    axios({
      method: 'post',
      url: uploadUrl,
      data: imageFile,
      headers: { 'content-Type': 'multipart/form-data' },
    })
      .then(res => {
        setProfile(res.data);
      })
      .catch(err => {
        alert(err);
      });
  };

  return (
    <LoginSection>
      <LoginBox>
        <div className="login-form">
          <div className="regis_title">내 프로필</div>
          <br />

          <div className="profileimg">
            {/* 이미지출력 */}
            <img alt="" src={profile} className="user_profile" />
          </div>
          <div className="photo_icon">
            <IconButton
              color="primary"
              aria-label="upload picture"
              component="label"
              style={{ color: '#03d85e' }}
            >
              <input
                hidden
                accept="image/*"
                type="file"
                multiple
                onChange={imageUpload}
              />
              <PhotoCamera />
            </IconButton>
          </div>
          <br />

          <div>ID : {data.username}</div>
          <div>EMAIL : {data.email}</div>
        </div>
        <div className="int-area1">
          <input
            type="text"
            name="realname"
            id="realname"
            autoComplete="off"
            required
          />
          <label>NICKNAME</label>
        </div>
        <div className="btn-area1">
          <button>비밀번호 변경</button>
        </div>
        <div className="btn-area1">
          <button>회원 정보 수정</button>
        </div>
      </LoginBox>
    </LoginSection>
  );
};

export default Register;

const LoginSection = styled.section`
  min-height: calc(100vh - 500px);
  padding: 130px 0 200px;
  text-align: center;
  ${props => props.theme.wrapper};
`;

const LoginBox = styled.div`
  width: 400px;
  margin: 0 auto;
  padding: 30px 20px;
  border: 1px solid #eee;
`;
