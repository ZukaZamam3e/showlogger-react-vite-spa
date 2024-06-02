import { createSlice } from '@reduxjs/toolkit';

const isMobileSlice = createSlice({
  name: 'isMobile',
  initialState: {
    value: false,
  },
  reducers: {
    updateIsMobile: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { updateIsMobile } = isMobileSlice.actions;

export default isMobileSlice.reducer;
