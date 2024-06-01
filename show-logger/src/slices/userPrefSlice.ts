import { createSlice } from '@reduxjs/toolkit';

const userPrefSlice = createSlice({
  name: 'userPref',
  initialState: {
    value: null,
  },
  reducers: {
    updateUserPref: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { updateUserPref } = userPrefSlice.actions;

export default userPrefSlice.reducer;
