import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:9009/api/user";

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};
const getUserBoard = () => {
  return axios.get(API_URL , { headers: authHeader() });
};
const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers:
    authHeader() });
};
const UserService = {
  getPublicContent,
  getUserBoard,
  getAdminBoard,
};
export default UserService;

//데이터에 엑세스하기위한 서비스를 정의
//authHeader()권한이 부여된 리소스를 요청할 때 함수 의 도움으로 HTTP 헤더를 추가
