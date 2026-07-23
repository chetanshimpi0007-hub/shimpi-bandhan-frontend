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
  timeout: 90000, // 90 seconds timeout to accommodate Render Free tier cold starts
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

api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Standardize human-readable user message
    if (error.code === 'ECONNABORTED' || error.message?.includes('timeout')) {
      error.userMessage = 'The server is waking up. Please try again in a moment.';
    } else if (error.response) {
      const status = error.response.status;
      if ([502, 503, 504].includes(status)) {
        error.userMessage = 'The server is temporarily unavailable. Please try again shortly.';
      } else if (status === 401 && !error.config?.url?.includes('/auth/login')) {
        // Auto logout on expired token for non-login endpoints
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      } else if (error.response.data?.message) {
        error.userMessage = error.response.data.message;
      } else if (error.response.data?.error) {
        error.userMessage = error.response.data.error;
      }
    } else {
      error.userMessage = 'Could not reach the server. Please check your connection and try again.';
    }
    return Promise.reject(error);
  }
);

export const getErrorMessage = (error, fallbackMessage = 'An error occurred. Please try again.') => {
  if (error.userMessage) return error.userMessage;
  if (error.response?.data?.message) return error.response.data.message;
  if (error.response?.data?.error) return error.response.data.error;
  if (typeof error.response?.data === 'string' && error.response.data.length < 200 && !error.response.data.trim().startsWith('<')) {
    return error.response.data;
  }
  if (error.code === 'ECONNABORTED' || error.message?.includes('timeout')) {
    return 'The server is waking up. Please try again in a moment.';
  }
  if (!error.response) {
    return 'Could not reach the server. Please check your connection and try again.';
  }
  return fallbackMessage;
};

export const getBackendUrl = () => {
  try {
    const url = new URL(api.defaults.baseURL);
    return url.origin;
  } catch (e) {
    return 'https://shimpi-bandhan-backend.onrender.com'; // fallback
  }
};

export default api;
