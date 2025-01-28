// src/features/counterSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 0
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload;
    }
  }
});

// Export actions to be used in components
export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// Export the reducer to be used in the store
export default counterSlice.reducer;
