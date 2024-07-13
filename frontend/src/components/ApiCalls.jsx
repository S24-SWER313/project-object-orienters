import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

let isRefreshing = false;


async function refreshToken() {
  if (isRefreshing) return;
  isRefreshing = true;
  const refreshToken = localStorage.getItem('refreshToken');
  console.log('old refreshToken:', refreshToken);
  try {
    const response = await axios.post('http://localhost:8080/auth/refreshtoken', { refreshToken });
    console.log('new refreshToken:', response.data.refreshToken);
    return response.data;
  } catch (error) {
    console.error('Failed to refresh token:', error);
  }
  isRefreshing = false;
}

const ApiCalls = axios.create({
  baseURL: 'http://localhost:8080',
});

ApiCalls.interceptors.request.use(async config => {
  let token = localStorage.getItem('token');
  const decoded = jwtDecode(token);
  const isExpired = decoded.exp < Date.now() / 1000;

  if (isExpired) {
    console.log('Token is expired' + localStorage.getItem('refreshToken'));
    token = await refreshToken();
    if (token) {
      localStorage.setItem('token', token.accessToken);
      localStorage.setItem('refreshToken', token.refreshToken);
      console.log('New set token:', token.refreshToken);
      config.headers['Authorization'] = `Bearer ${token}`;
    } else {
      console.log('Token refresh failed');
      // You cannot use navigate here directly. Handle redirection or error another way.
      // Example: return Promise.reject(new Error("Token refresh failed"));
    }
  } else {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  return config;
}, error => Promise.reject(error));

export default ApiCalls;
