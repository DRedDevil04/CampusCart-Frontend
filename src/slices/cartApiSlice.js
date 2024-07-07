import { apiSlice } from "./apiSlices";
//currently not in use
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