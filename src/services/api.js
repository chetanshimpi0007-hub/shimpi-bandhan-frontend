import axios from 'axios';

// Resolve the raw base URL from env vars (Vercel may have VITE_API_URL without /api/v1)
const _rawBase =
  import.meta.env.VITE_API_BASE_URL ||
  import.meta.env.VITE_API_URL ||
  'https://shimpi-bandhan-backend.onrender.com';

// Normalise: always ensure the base URL ends with /api/v1 exactly once
const _base = _rawBase.replace(/\/api\/v1\/?$/, '').replace(/\/$/, '') + '/api/v1';

const api = axios.create({
  baseURL: _base,
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
