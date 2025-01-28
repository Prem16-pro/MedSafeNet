// src/redux/authSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      if (action.payload) {
        // Only store serializable data like uid and email
        state.user = {
          uid: action.payload.uid,
          email: action.payload.email,
        };
      } else {
        state.user = null;
      }
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
