import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../slices/authSlice';
import { apiSlice } from '../slices/apiSlices';

export default configureStore({
  reducer: {
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});
