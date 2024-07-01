import { apiSlice } from './apiSlices';

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllItems: builder.query({
      query: () => ({
        url: '/item',
        credentials: 'include', // Explicitly include credentials
      }),
    }),
    getItemById: builder.query({
      query: (id) => `/item/${id}`,
    }),
    updateItem: builder.mutation({
      query: ({ id, updatedItem }) => ({
        url: `/item/${id}`,
        method: 'PUT',
        body: updatedItem,
        credentials: 'include',
      }),
    }),
  }),
});

export const { useGetAllItemsQuery, useGetItemByIdQuery, useUpdateItemMutation } = productsApiSlice;
