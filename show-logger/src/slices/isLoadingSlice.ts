import { createSlice } from '@reduxjs/toolkit';

const isLoadingSlice = createSlice({
  name: 'isLoading',
  initialState: {
    value: false,
  },
  reducers: {
    startLoading: state => {
      state.value = true;
    },
    stopLoading: state => {
      state.value = false;
    },
  },
});

export const { startLoading, stopLoading } = isLoadingSlice.actions;

export default isLoadingSlice.reducer;
