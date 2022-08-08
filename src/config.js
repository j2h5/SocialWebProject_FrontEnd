export const BASE_URL = 'http://localhost:3000';
export const API = {
  login: `${BASE_URL}/users/signin`,
  join: `${BASE_URL}/users/kakao-login`,
  product: `${BASE_URL}/product`,
  products: `${BASE_URL}/main`,
  carts: `${BASE_URL}/carts/like`,
};

export default API;
