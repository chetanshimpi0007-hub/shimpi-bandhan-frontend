import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080/api/v1',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const getBackendUrl = () => {
  try {
    const url = new URL(api.defaults.baseURL);
    return url.origin;
  } catch (e) {
    return 'http://localhost:8080'; // fallback
  }
};

export default api;
