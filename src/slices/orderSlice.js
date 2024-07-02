import { apiSlice } from "./apiSlices";

export const orderSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getAllOrders: builder.query({
            query: () => ({
                url: '/order',
                credentials: 'include',
            }),
        }),
        editOrderStatus: builder.mutation({
            query: ({ id, status }) => ({
                url: `/order/status/${id}`,
                method: 'PUT',
                body: { status },
                credentials: 'include',
            })
        }),
        editPaymentStatus: builder.mutation({
            query: ({ id, status }) => ({
                url: `/order/payment/${id}`,
                method: 'PUT',
                body: { status },
                credentials: 'include',
            })
        }),
        editShippingStatus: builder.mutation({
            query: ({ id, estimated_delivery_date, shipping_status }) => ({
                url: `/order/shipping/${id}`,
                method: 'PUT',
                body: { estimated_delivery_date, shipping_status },
                credentials: 'include',
            })
        }),
    })
});

export const { 
    useGetAllOrdersQuery, 
    useEditOrderStatusMutation, 
    useEditPaymentStatusMutation, 
    useEditShippingStatusMutation 
} = orderSlice;
