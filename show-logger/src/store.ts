import { configureStore } from '@reduxjs/toolkit';
import isLoadingReducer from './slices/isLoadingSlice';
import errorsReducer from './slices/errorsSlice';
import userPrefSlice from './slices/userPrefSlice';
import isMobileSlice from './slices/isMobileSlice';
import popupSlice from './slices/popupSlice';

export default configureStore({
  reducer: {
    isLoading: isLoadingReducer,
    errors: errorsReducer,
    userPref: userPrefSlice,
    isMobile: isMobileSlice,
    popup: popupSlice,
  },
});
