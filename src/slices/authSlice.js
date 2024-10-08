import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      state.userInfo = action.payload;
      localStorage.setItem('userInfo', JSON.stringify(action.payload));
      localStorage.setItem('token', action.payload.token);
    },
    logout: (state) => {
      state.userInfo = null;
      localStorage.removeItem('userInfo');
      localStorage.removeItem('token');
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;

export const selectUser = (state) => state.auth.userInfo;

export default authSlice.reducer;
