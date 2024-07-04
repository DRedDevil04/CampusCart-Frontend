import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  carts: JSON.parse(localStorage.getItem('carts')) || {},
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItemToCart: (state, action) => {
      const { email, item } = action.payload;
      if (!state.carts[email]) {
        state.carts[email] = [];
      }
      const existingItem = state.carts[email].find((obj) => obj.ID === item.ID);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.carts[email].push({ ...item, quantity: 1 });
      }
      localStorage.setItem('carts', JSON.stringify(state.carts));
    },
    removeItemFromCart: (state, action) => {
      const { email, itemId } = action.payload;
      const item=state.carts[email].find((obj)=>obj.ID===itemId);
      if(item.quantity>1){
        item.quantity-=1;
      }
      else{
      state.carts[email] = state.carts[email].filter((item) => item.ID !== itemId);
      }
      localStorage.setItem('carts', JSON.stringify(state.carts));
    },
    clearCart: (state, action) => {
      const { email } = action.payload;
      state.carts[email] = [];
      localStorage.setItem('carts', JSON.stringify(state.carts));
    },
  },
});

export const { addItemToCart, removeItemFromCart, clearCart } = cartSlice.actions;
export const selectCarts = (state) => state.cart.carts;
export default cartSlice.reducer;
