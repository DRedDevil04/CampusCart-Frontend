import React,{useState} from 'react';
import { Box, Stack, Text,Button} from '@chakra-ui/react';
import CartItem from './cartItemsCard';
import { useSelector } from 'react-redux';
import { addItemToCart, selectCarts,decreaseItemFromCart,removeItemFromCart } from '../slices/cartSlice';
import { useDispatch } from 'react-redux';
import { selectUser } from '../slices/authSlice';
import { motion,AnimatePresence } from 'framer-motion';

const Cart = () => {
  const dispatch=useDispatch();
  const carts = useSelector(selectCarts); // Select 'carts' from Redux state
  const userInfo=useSelector(selectUser);
  const email=userInfo.email;

  const handleIncrease=(item)=>{
  dispatch(addItemToCart({email,item}));
  }
  const handleDecrease=(itemId)=>{
  dispatch(decreaseItemFromCart({email,itemId}));
  }
  const handleRemove=(itemId)=>{
    dispatch(removeItemFromCart({email,itemId}))
  }

  //Button Animate//
  const [clicked,setClicked]= useState(false);

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
              onRemove={()=>handleRemove(item.ID)}
            />
          ))}
          <Button 
            bg="blue.500"
            color="white"
            _hover={{bg:"blue.400"}}
            fontSize="30px"
            p="1.5rem"
            overflow="hidden"
            as={motion.div}
            position="relative"
            onClick={()=>setClicked(!clicked)}
          >
            <Box as={motion.div} position="relative" height="40px" width="100%">
              <AnimatePresence initial={false}>
                {!clicked ? (
                  <motion.div
                    key="placeOrder"
                    initial={{ y: 0, opacity: 1 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -50, opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    style={{ position: 'absolute', width: '100%', display: 'flex', justifyContent: 'center' }}
                  >
                    Place Order
                  </motion.div>
                ) : (
                  <motion.div
                    key="selectAddress"
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 50, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    style={{ position: 'absolute', width: '100%', display: 'flex', justifyContent: 'center' }}
                  >
                    Select Address
                  </motion.div>
                )}
              </AnimatePresence>
            </Box>
          </Button>
        </Stack>        
      ) : (
        <Text align="center">Cart is empty.</Text>
      )}
    </Box>
  );
};

export default Cart;
