import { apiSlice } from './apiSlices';

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    authenticate:builder.query({
        query:()=>"/user/authenticate"
    }),
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
  }),
});

export const { useGetProfileQuery,useAuthenticateQuery, useUpdateProfileMutation,useLoginMutation, useLogoutMutation, useRegisterMutation } = usersApiSlice;
