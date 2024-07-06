import React,{useState} from 'react'
import {Box,Card,CardHeader,CardBody,Text,Button,HStack,VStack,Stack,Flex,Badge,Image,Radio,RadioGroup} from '@chakra-ui/react';
import { selectCarts } from '../slices/cartSlice';
import { selectUser } from '../slices/authSlice';
import { useSelector } from 'react-redux';
import { clearCart } from '../slices/cartSlice';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { useAddNewOrderMutation } from '../slices/orderSlice';
const Checkout = ({address}) => {
    const carts=useSelector(selectCarts);
    const userInfo = useSelector(selectUser);
    const [payment,setPayment]=useState('COD');
    const [orderSuccess,setOrderSuccess]=useState(false);
    const email = userInfo.email;
    let total=0;
    {carts[email].map((item)=>{
        total+=item.price * item.quantity;
    })}

    const [placeOrder]=useAddNewOrderMutation();
    const handleOrder=async(paymentMethod)=>{        
        const items=carts[email].map((item)=>({
            item:item.ID,
            quantity:item.quantity,
            price:item.price
        }))
        const paymentobj={payment_method:paymentMethod,amount:total};
        const orderDetails={
            items,
            payment:paymentobj,
            shipping:{address:address},
            user:{_id:userInfo.id}
        };

        try{
        const res=await placeOrder(orderDetails).unwrap();
        if(res.message)
        {
          setOrderSuccess(true);
          dispatch(clearCart({email:userInfo.email}));
        }
        console.log('Response message:' ,res.message)
        alert(res.message);
        } catch (error) {
        console.error('Error placing order:', error.message);
        alert('Error placing order. Please try again.');
        }
    }

    if(orderSuccess)
    {
      return(
        <Flex justify="center" height="100vh" alignItems="center" direction="column">
           <IoMdCheckmarkCircleOutline color="green" size="70px"/>
          <Text fontSize="40px">Order Placed Successfully</Text>
        </Flex>
      )
    }
  return (
    <Box>
        <Card m="1rem">
            <Flex alignItems="center" justify="center" > 
                <Text fontSize="30px" as="u">Order Details</Text>
            </Flex>
            <CardBody>
             <Stack spacing="3">
              {carts[email].map((item) => (
                <Box key={item.ID} bg="white" borderWidth="1px" borderRadius="lg" overflow="hidden" p={4} boxShadow="md">
                <Flex gap="12" height="100%">
                  <Image boxSize="100px" objectFit="cover" src={item.img} alt={item.title} />
          
                  <VStack align="start" flex="1">
                    <Text fontWeight="bold" fontSize="lg">{item.title}</Text>
                    <Text>Price: Rs {(item.price).toFixed(2)}</Text>
                    <Flex gap="1rem" alignItems="center"> 
                      <Text>Quantity:</Text>
                      <Badge variant="subtle" fontSize="1rem" color="blue.500">{item.quantity}</Badge>
                    </Flex>
                    <Text>Total: Rs {(item.price)*(item.quantity).toFixed(2)}</Text>
                  </VStack>
                </Flex>
              </Box>
                ))}
                <Flex justify="flex-end">
                    <Text fontSize="20px">Total: <span><Text as="b">{total}</Text></span></Text>
                </Flex>
                {/* Shipping Address */}
                <HStack spacing="4" mt="1rem">
                    <Text as="u">Shipping To :</Text>
                    <Box>
                        <Text as="b">{address.hostel.toUpperCase()} , Floor {address.floor} , Room No- {address.room} </Text>
                    </Box>
                </HStack> 
                {/*Payment Options*/}
                <Flex justify="space-between" mt="1rem" alignItems="center">
                  <Text as="b" fontSize="20px">Payment Options</Text> 
                  <RadioGroup onChange= {(value)=>setPayment(value)}  value={payment} >
                     <VStack alignItems="flex-start">
                        <Radio value="Google Form">Pay Now</Radio>
                        <Radio value="COD">Cash on Delivery</Radio>
                    </VStack>  
                  </RadioGroup>
                    <Button onClick={() => handleOrder(payment)} mt="1rem" colorScheme="blue">
                        Confirm Order
                    </Button>
                </Flex> 

             </Stack>
            </CardBody>
         </Card>
    </Box>
  )
}

export default Checkout;