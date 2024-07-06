import { apiSlice } from './apiSlices';

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllUsers:builder.query({
        query:()=>"/user/getallusers"
    }),
    getProfile: builder.query({
      query: () => ({
          url: '/user/getProfile',
          credentials: 'include',
      }),
  }),
    updateProfile: builder.mutation({
      query: (data) => ({
        url: '/user/updateProfile',
        method: 'PUT',
        credentials: 'include',
        body: data,
      }), 
    }),
    login: builder.mutation({
      query: (data) => ({
        url: '/auth/login',
        method: 'POST',
        credentials: 'include',
        body: data,
      }),
    }),
    register: builder.mutation({
        query: (data) => ({
          url: '/auth/register',
          method: 'POST',
          credentials: 'include',
          body: data,
        }),
      }),
    logout: builder.mutation({
      query: () => ({
        url: '/auth/logout',
        method: 'POST',
        credentials: 'include',
      }),
    }),
  }),
});

export const { useGetProfileQuery, useUpdateProfileMutation,useLoginMutation, useLogoutMutation, useRegisterMutation } = usersApiSlice;
