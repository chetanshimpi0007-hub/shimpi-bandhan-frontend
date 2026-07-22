import { createSlice } from '@reduxjs/toolkit';

const token = localStorage.getItem('adminToken');
const userStr = localStorage.getItem('adminUser');
let user = null;
try {
  if (userStr) {
    user = JSON.parse(userStr);
  }
} catch (e) {
  console.error("Failed to parse admin user", e);
}

const initialState = {
  token: token || null,
  isAuthenticated: !!token,
  user: user || null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.token = action.payload.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      localStorage.setItem('adminToken', action.payload.token);
      localStorage.setItem('adminUser', JSON.stringify(action.payload.user));
    },
    logout: (state) => {
      state.token = null;
      state.user = null;
      state.isAuthenticated = false;
      localStorage.removeItem('adminToken');
      localStorage.removeItem('adminUser');
    },
  },
});

export const { loginSuccess, logout } = authSlice.actions;
export default authSlice.reducer;
