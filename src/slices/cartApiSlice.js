import { apiSlice } from "./apiSlices";

export const cartApiSlice=apiSlice.injectEndpoints({
    endpoints: (builder)=>({
        getProductById:builder.query({
            query:(id)=>({
                url:`/item/${id}`,
            })
        })
    })
})

export const {useGetProductByIdQuery}=cartApiSlice;