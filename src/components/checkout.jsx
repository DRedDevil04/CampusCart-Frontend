import React, { useState, useEffect } from 'react';
import { Box, Card, CardHeader, CardBody, Text, Button, HStack, VStack, Stack, Flex, Badge, Image, Radio, RadioGroup } from '@chakra-ui/react';
import { useSelector, useDispatch } from 'react-redux';
import { selectCarts, clearCart } from '../slices/cartSlice';
import { selectUser } from '../slices/authSlice';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import { useAddNewOrderMutation } from '../slices/orderSlice';
import { useNavigate } from 'react-router-dom';

const Checkout = ({ address }) => {
  const carts = useSelector(selectCarts);
  const userInfo = useSelector(selectUser);
  const navigate = useNavigate();
  const [payment, setPayment] = useState('COD');
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [orderItems, setOrderItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [totalCost, setTotalCost] = useState(0);
  const dispatch = useDispatch();
  const email = userInfo.email;

  useEffect(() => {
    let total = 0;
    carts[email]?.forEach((item) => {
      total += item.price * item.quantity;
    });
    setTotalAmount(total);
  }, [carts, email]);


  const [placeOrder] = useAddNewOrderMutation();

  const handleOrder = async (paymentMethod) => {
    const items = carts[email]?.map((item) => ({
      item: item.ID,
      title: item.title,
      quantity: item.quantity,
      price: item.price,
      img: item.img,
    }));
    setOrderItems(items);
    const paymentObj = { payment_method: paymentMethod, amount: totalAmount };
    const orderDetails = {
      items,
      payment: paymentObj,
      shipping: { address: address },
      user: { _id: userInfo.id },
    };

    try {
      const res = await placeOrder(orderDetails).unwrap();
      if (res.message) {
        setOrderSuccess(true);
        setOrderId(res.orderId);
        setTotalCost(totalAmount);
        dispatch(clearCart({ email: userInfo.email }));
      }
      alert(res.message);
    } catch (error) {
      console.error('Error placing order:', error.message);
      alert('Error placing order. Please try again.');
    }
  };

  if (orderSuccess) {
    return (
      <Flex justify="center" height="100vh" alignItems="center" direction="column">
        <IoMdCheckmarkCircleOutline color="green" size="70px" />
        <Card m="1rem" maxWidth="800px">
          <CardHeader fontSize="xl" fontWeight="bold" textAlign="center">Order Placed Successfully</CardHeader>
          <CardBody>
            <Text fontSize="lg" fontWeight="bold">Order ID: {orderId}</Text>
            <Stack spacing="3">
              <Text fontSize="lg" fontWeight="bold">Order Details</Text>
              {orderItems.map((item) => (
                <Box key={item.item} bg="white" borderWidth="1px" borderRadius="lg" overflow="hidden" p={4} boxShadow="md">
                  <Flex gap="12" height="100%">
                    <Image boxSize="100px" objectFit="cover" src={item.img} alt={item.title} />
                    <VStack align="start" flex="1">
                      <Text fontWeight="bold" fontSize="lg">{item.title}</Text>
                      <Text>Price: Rs {(item.price).toFixed(2)}</Text>
                      <Flex gap="1rem" alignItems="center">
                        <Text>Quantity:</Text>
                        <Badge variant="subtle" fontSize="1rem" color="blue.500">{item.quantity}</Badge>
                      </Flex>
                      <Text>Total: Rs {(item.price * item.quantity).toFixed(2)}</Text>
                    </VStack>
                  </Flex>
                </Box>
              ))}
              <Flex justify="flex-end">
                <Text fontSize="20px">Total: <span><Text as="b">{totalCost.toFixed(2)}</Text></span></Text>
              </Flex>
              {/* Shipping Address */}
              <HStack spacing="4" mt="1rem">
                <Text as="u">Shipping To :</Text>
                <Box>
                  <Text as="b">{address.hostel.toUpperCase()} , Floor {address.floor} , Room No- {address.room}, Contact Number - {address.contact_number} </Text>
                </Box>
              </HStack>
              {/* Navigation Buttons */}
              <Flex justify="space-between" mt="2rem" width="100%">
                <Button onClick={()=> navigate('/profile')} to="/profile" colorScheme="blue" variant="outline">
                  Go to Profile
                </Button>
                <Button onClick={()=> navigate('/')} to="/" colorScheme="blue">
                  Continue Shopping
                </Button>
              </Flex>
            </Stack>
          </CardBody>
        </Card>
      </Flex>
    );
  }

  return (
    <Box>
      <Card m="1rem">
        <Flex alignItems="center" justify="center">
          <Text fontSize="30px" as="u">Order Details</Text>
        </Flex>
        <CardBody>
          <Stack spacing="3">
            {carts[email]?.map((item) => (
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
                    <Text>Total: Rs {(item.price * item.quantity).toFixed(2)}</Text>
                  </VStack>
                </Flex>
              </Box>
            ))}
            <Flex justify="flex-end">
              <Text fontSize="20px">Total: <span><Text as="b">{totalAmount.toFixed(2)}</Text></span></Text>
            </Flex>
            {/* Shipping Address */}
            <HStack spacing="4" mt="1rem">
              <Text as="u">Shipping To :</Text>
              <Box>
                <Text as="b">{address.hostel.toUpperCase()} , Floor {address.floor} , Room No- {address.room}, Contact Number - {address.contact_number} </Text>
              </Box>
            </HStack>
            {/* Payment Options */}
            <Flex justify="space-between" mt="1rem" alignItems="center">
              <Text as="b" fontSize="20px">Payment Options</Text>
              <RadioGroup onChange={(value) => setPayment(value)} value={payment}>
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
  );
};

export default Checkout;
