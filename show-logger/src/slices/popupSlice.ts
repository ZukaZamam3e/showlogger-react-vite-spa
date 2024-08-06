import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const popupSlice = createSlice({
  name: 'popup',
  initialState: {
    show: false,
    message: '',
  },
  reducers: {
    showMessage: (
      state: any,
      action: PayloadAction<{ show: boolean; message: string }>,
    ) => {
      state.show = action.payload.show;
      state.message = action.payload.message;
    },
  },
});

export const { showMessage } = popupSlice.actions;

export default popupSlice.reducer;
