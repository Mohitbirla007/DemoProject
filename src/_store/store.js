import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../reducer/User/userSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
