import React from 'react';
import {
  Box,
  Card,
  HStack,
  Stack,
  Flex,
  Text,
  CardHeader,
  CardBody,
  Select,
  FormControl,
  FormLabel
} from '@chakra-ui/react';

const OrderCard = ({ order }) => {
  const totalPrice = order.items && Array.isArray(order.items)
    ? order.items.reduce((acc, item) => acc + item.price, 0)
    : 0;

  const orderStatusOptions = ['Pending', 'Confirmed', 'Shipped', 'Delivered'];
  const shippingStatusOptions = ['Yet to ship', 'Dispatched', 'Delivered'];
  const paymentStatusOptions = ['Pending', 'Paid', 'Refunded'];

  return (
    <>
      <Card
        border="2px"
        borderColor="teal.500"
        borderRadius="md"
        bg="white"
        boxShadow="md"
      >
        <CardHeader bg="gray.50" p="2" borderRadius="md">
          <Flex justifyContent="space-between" m="20px">
            <Flex alignItems="center" direction="column" gap="20px">
              <Text  fontSize={{base:"20px",sm:"2xl"}} color="teal.400" as="b">Date</Text>
              <Text>hii {order.__created.toLocaleString()}</Text>
            </Flex>
            <Flex alignItems="center" direction="column" gap="20px">
              <Text fontSize={{base:"20px",sm:"2xl"}} color="teal.400" as="b">Order-ID</Text>
              <Text>njdjdfnm</Text>
            </Flex>
          </Flex>
        </CardHeader>

        <CardBody>
          <Stack spacing="2rem">
                <Card bg="orange.50">
                  <CardHeader pb="5px"><Text fontSize="18px" as="b">Product Details</Text></CardHeader>
                  <CardBody m="0" pt="0">
                  <Text>`Name: ${order.items?.[0]?.item?.name}`</Text>
                  <Text>`Price: ${order.items?.[0]?.item?.price}`</Text>
                  </CardBody>
                </Card>
                <Card>
                  <CardHeader pb="5px"><Text fontSize="18px" as="b">Buyer Details</Text></CardHeader>
                  <CardBody m="0" pt="0">
                    <Text>`Name: ${order.customer?.name}`</Text>
                    <Text>`Email: ${order.customer?.email}`</Text>
                    <Text noOfLines="2">`Address: ${order.shipping?.address?.room} ${order.shipping?.address?.floor} floor ${order.shipping?.address?.hostel}`</Text>
                  </CardBody>
                </Card>

            <Box>
              <Stack spacing="1rem">
                <FormControl>
                  <FormLabel>Order Status</FormLabel>
                  <Select
                    defaultValue={order.order_status || ''}
                    onChange={(e) => console.log(e.target.value)}
                    bg="gray.50"
                    borderColor="gray.200"
                    focusBorderColor="blue.400"
                    color="black"
                  >
                    {orderStatusOptions.map((status, index) => (
                      <option key={index} value={status}>{status}</option>
                    ))}
                  </Select>

                  <FormLabel>Shipping Status</FormLabel>
                  <Select
                    defaultValue={order.shipping?.shipping_status || ''}
                    onChange={(e) => console.log(e.target.value)}
                    bg="gray.50"
                    borderColor="gray.200"
                    focusBorderColor="blue.400"
                    color="black"
                  >
                    {shippingStatusOptions.map((status, index) => (
                      <option key={index} value={status}>{status}</option>
                    ))}
                  </Select>

                  <FormLabel>Payment Status</FormLabel>
                  <Select
                    defaultValue={order.payment?.status || ''}
                    onChange={(e) => console.log(e.target.value)}
                    bg="gray.50"
                    borderColor="gray.200"
                    focusBorderColor="blue.400"
                    color="black"
                  >
                    {paymentStatusOptions.map((status, index) => (
                      <option key={index} value={status}>{status}</option>
                    ))}
                  </Select>
                </FormControl>
              </Stack>
            </Box>
          </Stack>
        </CardBody>
      </Card>
    </>
  );
}

export default OrderCard;
