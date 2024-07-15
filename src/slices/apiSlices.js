import { fetchBaseQuery,createApi } from '@reduxjs/toolkit/query/react';
import { logout } from "../slices/authSlice";
import { showToast } from '../components/sessionToast';

const baseQuery = fetchBaseQuery({
  baseUrl: 'https://campuscart-backend.onrender.com/',
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('token');
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  }
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && (result.error.status === 400 || result.error.status === 500)) {
    api.dispatch(logout());
    showToast();
  }
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ['User'],
  endpoints: (builder) => ({}),
});
