import { createSlice } from '@reduxjs/toolkit';

const errorsSlice = createSlice({
  name: 'errors',
  initialState: {
    value: [],
  },
  reducers: {
    showErrors: (state, action) => {
      console.log(action);
      state.value = action.payload;
    },
    hideErrors: state => {
      state.value = [];
    },
  },
});

export const { showErrors, hideErrors } = errorsSlice.actions;

export default errorsSlice.reducer;
