import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';
import { logout } from "../slices/authSlice";
import { createStandaloneToast } from '@chakra-ui/react';
const { toast } = createStandaloneToast();

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
  if (result.error) {
    if (result.error.status === 401) {
      api.dispatch(logout());
      toast({
        title: "Session Timeout",
        description: "Your session has expired. Please log in again.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    } else if (result.error.status === 403) {
      toast({
        title: "Access Denied",
        description: "You do not have permission to access this resource.",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  }
  return result;
};

export const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: ['User'],
  endpoints: (builder) => ({}),
});
