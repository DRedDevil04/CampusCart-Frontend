import { apiSlice } from './apiSlices';

export const categoryApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategories: builder.query({
      query: () => '/category',
    }),
    getCategoryByID: builder.query({
      query: (id) => `/category/${id}`,
    }),
    updateCategory: builder.mutation({
      query: ({ id, updatedCategory }) => ({
        url: `/category/${id}`,
        method: 'PUT',
        body: updatedCategory,
        credentials: 'include',
      }),
    }),
    addCategory: builder.mutation({
      query: ({ item }) => ({
        url: `/category`,
        method: 'POST',
        body: item,
        credentials: 'include',
      }),
    }),
  }),
});

export const { useGetAllCategoriesQuery, useGetCategoryByIDQuery, useUpdateCategoryMutation, useAddCategoryMutation } = categoryApiSlice;
