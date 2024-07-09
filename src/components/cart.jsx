import React, { useState,useEffect} from 'react';
import { Box, Stack, Text, Button } from '@chakra-ui/react';
import CartItem from './cartItemsCard';
import { useSelector, useDispatch } from 'react-redux';
import { addItemToCart, selectCarts, decreaseItemFromCart, removeItemFromCart } from '../slices/cartSlice';
import { useGetProfileQuery } from '../slices/userApiSlice.js';
import { selectUser } from '../slices/authSlice';
import Shipping from './shipping.jsx';
import Checkout from './checkout.jsx';

const Cart = () => {
  const dispatch = useDispatch();
  const carts = useSelector(selectCarts);
  const userInfo = useSelector(selectUser);
  const email = userInfo.email;
  const { data: userResponse, error, isLoading, refetch } = useGetProfileQuery();
  
  const userProfile = userResponse ? userResponse.data : null;

  const [address, setAddress] = useState({
    room:'',
    floor:'',
    hostel:'',
    contact_number:'',
  });

  useEffect(() => {
    if (userProfile) {
      setAddress({
        room: userProfile?.address?.room || '',
        floor: userProfile?.address?.floor || '',
        hostel: userProfile?.address?.hostel || '',
        contact_number: userProfile?.address?.contact_number || '',
      });
    }
  }, [userProfile]);
  
  const [checkout, setCheckout] = useState(false);
  const [clicked, setClicked] = useState(false);

  const handleIncrease = (item) => {
    dispatch(addItemToCart({ email, item }));
  };

  const handleDecrease = (itemId) => {
    dispatch(decreaseItemFromCart({ email, itemId }));
  };

  const handleRemove = (itemId) => {
    dispatch(removeItemFromCart({ email, itemId }));
  };

  if (checkout) {
    return <Checkout address={address}/>;
  }

  return (
    <Box p={4}>
      {carts[email]?.length > 0 ? (
        <>
          <Stack spacing={4}>
            {carts[email].map((item) => (
              <CartItem
                key={item.ID}
                product={item}
                onIncrease={() => handleIncrease(item)}
                onDecrease={() => handleDecrease(item.ID)}
                onRemove={() => handleRemove(item.ID)}
              />
            ))}
            <Button
              bg="blue.500"
              color="white"
              _hover={{ bg: "blue.400" }}
              fontSize="30px"
              p="1.5rem"
              overflow="hidden"
              position="relative"
              onClick={() => setClicked(!clicked)}
            >
              {!clicked ? "Place Order" : "Select Address"}
            </Button>
          </Stack>
          {clicked && (
            <Box>
              <Shipping address={address} setAddress={setAddress} />
              <Button mt={4} colorScheme="blue" onClick={() => setCheckout(true)}>Continue</Button>
            </Box>
          )}
        </>
      ) : (
        <Text align="center">Cart is empty.</Text>
      )}
    </Box>
  );
};

export default Cart;
