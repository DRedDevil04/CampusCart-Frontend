import { addItemToCart,decreaseItemFromCart,clearCart } from "../slices/cartSlice";

export const addItemToCartThunk=(email,item) =>(dispatch)=>{
    dispatch(addItemToCart({email,item}));
};

export const removeItemFromCartThunk=(email,itemId)=>(dispatch)=>{
    dispatch(decreaseItemFromCart({email,itemId}));
};

export const clearCartThunk=(email)=>(dispatch)=>{
    dispatch(clearCart({email}));
}