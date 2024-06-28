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
      query: ({ id, updatedItem }) => ({
        url: `/category/${id}`,
        method: 'PUT',
        body: updatedItem,
        credentials: 'include',
      }),
    }),
  }),
});

export const { useGetAllCategoriesQuery, useGetCategoryByIDQuery, useUpdateCategoryMutation } = categoryApiSlice;
