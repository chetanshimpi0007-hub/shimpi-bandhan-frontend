import axios from 'axios';

const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_BASE_URL ||
    import.meta.env.VITE_API_URL ||
    'https://shimpi-bandhan-backend.onrender.com/api/v1',
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
    return 'https://shimpi-bandhan-backend.onrender.com'; // fallback
  }
};

export default api;
