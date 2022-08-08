import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Main from './pages/Main/Main';
import VodMain from './pages/VodMain/VodMain';
import Login from './pages/Login/Login';
import ForgotPassword from './pages/Login/ForgotPassword';
import WishList from './pages/WishList/WishList';
import LectureList from './pages/LectureList/LectureList';
import LectureDetail from './pages/LectureDetail/LectureDetail';
import Nav from './components/Nav/Nav';
import Footer from './components/Footer/Footer';
import Review from './components/Review/Review';
import About from './pages/About/About';
import Register from './pages/Register/Register';
import Register_re from './pages/Register/Register_re';
import Detailp from './pages/About/Detailp';
import errimg from './errimg.jpg';
import ClassList2 from './pages/class/ClassList2';
import Map from './pages/Map/Map';

import {
  MypageMain,
  MypageLiked,
  MypagePayment,
  MypageClasses,
  TutorAdmin,
} from './pages/MyPage';

import {
  ClassList,
  ClassForm,
  ClassDetail,
  ClassUpdateForm,
  ClassGuide,
  ClassIntroGuide,
  ClassAdmin,
} from './pages/class';

import PayMent from './pages/class/PayMent';
import ClassPayBefore from './pages/class/ClassPayBefore';
import ClassPayAfter from './pages/class/ClassPayAfter';
import ChatRoom from './pages/chatting/ChatRoom';
import Detailu from './pages/About/Detailu';
import Detailz from './pages/About/Detailz';
import Sidebar from './pages/MyPage/Sidebar';
import ClassList3 from './pages/class/ClassList3';

const Router = () => {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/vod" element={<VodMain />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgotPassword" element={<ForgotPassword />} />
        <Route path="/register_re" element={<Register_re />} />
        <Route path="/lectures" element={<LectureList />} />
        <Route path="/lectures/:id" element={<LectureDetail />} />
        <Route path="/wish-list" element={<WishList />} />
        <Route path="/review" element={<Review />} />

        {/* Class */}
        <Route path="/class/list" element={<ClassList2 />} />
        <Route path="/class/list/:message" element={<ClassList3 />} />

        <Route path="/class/form" element={<ClassForm />} />
        <Route path="/class/detail/:class_num" element={<ClassDetail />} />
        <Route path="/chat" element={<ChatRoom />} />
        <Route
          path="/class/updateform/:class_num"
          element={<ClassUpdateForm />}
        />
        <Route path="/class/guide" element={<ClassGuide />} />
        <Route path="/class/introguide" element={<ClassIntroGuide />} />
        <Route path="/class/payment" element={<PayMent />} />
        <Route path="/class/payment/before" element={<ClassPayBefore />} />
        <Route path="/class/payment/after" element={<ClassPayAfter />} />
        <Route path="/class/admin" element={<ClassAdmin />} />

        {/* About */}
        <Route path="/about" element={<About />} />
        <Route path="/about/1" element={<Detailp />} />
        <Route path="/about/2" element={<Detailu />} />
        <Route path="/about/3" element={<Detailz />} />

        <Route path="/map" element={<Map />} />

        {/* Mypage */}
        <Route path="/mypage" element={<MypageMain />} />
        <Route path="/mypage/payment" element={<MypagePayment />} />
        <Route path="/mypage/liked" element={<MypageLiked />} />
        <Route path="/mypage/classes" element={<MypageClasses />} />
        <Route path="/mypage/tutor" element={<TutorAdmin />} />

        <Route
          path="*"
          element={
            <div>
              <img src={errimg} alt="" style={{ width: '1520px' }} />
            </div>
          }
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
};
export default Router;
