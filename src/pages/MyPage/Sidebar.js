import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import SidebarItem from './SidebarItem';

function Sidebar() {
  const menus = [
    { name: '내 프로필 ✨', path: '/mypage' },
    { name: '결제 내역', path: '/mypage/payment' },
    { name: '찜한 클래스', path: '/mypage/liked' },
    { name: '수강중인 클래스', path: '/mypage/classes' },
    // { name: '튜터 페이지', path: '/mypage/tutor' },
  ];

  const normalStyle = {
    color: 'gray',
    textDecoration: 'none',
  };

  const activeStyle = {
    color: '#03d85e',
    textDecoration: 'none',
  };

  return (
    <Side>
      <Menu>
        {menus.map((menu, index) => {
          return (
            <NavLink
              exact
              style={({ isActive }) => (isActive ? activeStyle : normalStyle)}
              to={menu.path}
              key={index}
            >
              <SidebarItem menu={menu} />
            </NavLink>
          );
        })}
        {localStorage.authority === '2' ? (
          <NavLink
            exact
            style={({ isActive }) => (isActive ? activeStyle : normalStyle)}
            to="/mypage/tutor"
          >
            <SidebarMenu>튜터 페이지</SidebarMenu>
          </NavLink>
        ) : (
          ''
        )}
      </Menu>
    </Side>
  );
}

export default Sidebar;

const Side = styled.div`
  display: flex;
  border-right: 1px solid #e0e0e0;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 20%;
`;

const Menu = styled.div`
  margin-top: 30px;
  width: 200px;
  display: flex;
  flex-direction: column;
`;
const SidebarMenu = styled.div`
  font-size: 20px;
  font-family: Noto Sans KR;
  font-weight: 500;
  width: 200px;
  height: 30px;
  text-align: center;
  margin-top: 20px;
  display: inline-block;
`;
