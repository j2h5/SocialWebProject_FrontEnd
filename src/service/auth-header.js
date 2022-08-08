export default function authHeader() {

  const user = JSON.parse(localStorage.getItem('user'));
  
  if (user) {
    console.log(user.jwt);
    return { Authorization: 'Bearer ' + user.jwt };
  } else {
    return {};
  }
}
//서버에서 데이터를 검색할 시, 보호된리소스에 엑세스하는 경우 HTTP요청에 Authorization header가 필요(내부 에 호출되는 도우미 함수)