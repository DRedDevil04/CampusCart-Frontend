import { apiSlice } from './apiSlices';

export const productsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllItems: builder.query({
      query: () => ({
        url: '/item',
        credentials: 'include',
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
    addItem: builder.mutation({
      query: ({ item }) => ({
        url: `/item`,
        method: 'POST',
        body: item,
        credentials: 'include',
      }),
    }),
  }),
});

export const { useGetAllItemsQuery, useGetItemByIdQuery, useUpdateItemMutation, useAddItemMutation } = productsApiSlice;
