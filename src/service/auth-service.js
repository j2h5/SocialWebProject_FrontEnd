import axios from 'axios';
import { useState } from 'react';
import { setToken, setProfile, setNickname, setUser_id } from '../utils';

const SPRING_URL = 'http://localhost:9009/';

//POST {사용자 이름, 이메일, 비밀번호} // 사용안함
const register = (username, password) => {
  return axios.post(SPRING_URL + 'api/signup', { username, password });
};

// POST {username, password} & JWT로컬 저장소에 저장
const login = (username, password) => {
  return axios
    .post(
      SPRING_URL + 'api/authenticate',
      { username, password },
      { withCredentials: true }
    )
    .then(response => {
      if (response.data) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      return response.data;
    });
};
const executeHelloService = () => {
  console.log('===executeHelloService===');
  return axios.get(SPRING_URL + '/hello');
};
const authority = 'authority';
//USER정보 불러오기
const getProfile = username => {
  return axios
    .get(SPRING_URL + 'api/getprofile?username=' + username)
    .then(response => {
      let photoUrl = 'http://localhost:9009/save/';
      setUser_id(response.data.user_id);
      setNickname(response.data.realname);
      setProfile(photoUrl + response.data.profile);
      const authURL =
        'http://localhost:9009/api/getauth/?user_id=' + response.data.user_id;
      axios.get(authURL).then(res => {
        console.log(res.data);
        localStorage.setItem(authority, res.data);
      });
    });
};

//JWT로컬 저장소에서 제거
const logout = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('loginok');
  localStorage.removeItem('username');
  localStorage.removeItem('token');
  localStorage.removeItem('nickname');
  localStorage.removeItem('profile');
  localStorage.removeItem('user_id');
  localStorage.removeItem('authority');
};

//저장된 사용자 정보 가져오기(JWT 포함)
const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem('user'));
};

const AuthService = {
  register,
  login,
  logout,
  getCurrentUser,
  executeHelloService,
  getProfile,
};
export default AuthService;
