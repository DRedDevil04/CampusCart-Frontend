import React from "react";
import { Box, Stack, Text } from "@chakra-ui/react";
import CartItem from "./cartItemsCard";
import { useSelector } from "react-redux";
import {
  addItemToCart,
  selectCarts,
  removeItemFromCart,
} from "../slices/cartSlice";
import { useDispatch } from "react-redux";
import { selectUser } from "../slices/authSlice";
const Cart = () => {
  const dispatch = useDispatch();
  const carts = useSelector(selectCarts); // Select 'carts' from Redux state
  const userInfo = useSelector(selectUser);
  const email = userInfo.email;

  const handleIncrease = (item) => {
    dispatch(addItemToCart({ email, item }));
  };
  const handleDecrease = (itemId) => {
    dispatch(removeItemFromCart({ email, itemId }));
  };
  return (
    <Box p={4}>
      {carts[email]?.length > 0 ? (
        <Stack spacing={4}>
          {carts[email].map((item) => (
            <CartItem
              key={item.ID}
              product={item}
              onIncrease={() => handleIncrease(item)}
              onDecrease={() => handleDecrease(item.ID)}
            />
          ))}
        </Stack>
      ) : (
        <Text align="center">Cart is empty.</Text>
      )}
    </Box>
  );
};

export default Cart;
