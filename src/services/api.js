import axios from 'axios';

const isProd = import.meta.env.PROD;
const envUrl = import.meta.env.VITE_API_URL;
const backendUrl = 'https://shimpi-bandhan-backend.onrender.com/api/v1';

// In production, force the correct Render backend URL, ignoring any misconfigured Vercel environment variables (like localhost)
const finalBaseUrl = isProd ? backendUrl : (envUrl || backendUrl);

const api = axios.create({
  baseURL: finalBaseUrl,
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
