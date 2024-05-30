import axios from 'axios';
import { jwtDecode } from 'jwt-decode';


async function refreshToken() {
  const refreshToken = localStorage.getItem('refreshToken');
  try {
    const response = await axios.post('http://localhost:8080/auth/refreshtoken', { refreshToken });
    return response.data.accessToken;
  } catch (error) {
    console.error('Failed to refresh token:', error);
  }
}

const ApiCalls = axios.create({
  baseURL: 'http://localhost:8080',
});

ApiCalls.interceptors.request.use(async config => {
  let token = localStorage.getItem('token');
  const decoded = jwtDecode(token);
  const isExpired = decoded.exp < Date.now() / 1000;

  if (isExpired) {
    token = await refreshToken();
    if (token) {
      localStorage.setItem('token', token);
      config.headers['Authorization'] = `Bearer ${token}`;
    } else {
      // You cannot use navigate here directly. Handle redirection or error another way.
      // Example: return Promise.reject(new Error("Token refresh failed"));
    }
  } else {
    config.headers['Authorization'] = `Bearer ${token}`;
  }

  return config;
}, error => Promise.reject(error));

export default ApiCalls;
