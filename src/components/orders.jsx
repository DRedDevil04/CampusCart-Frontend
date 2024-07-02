import React, { useState } from 'react';
import {
  Box,
  Card,
  Stack,
  HStack,
  Flex,
  Text,
  CardHeader,
  CardBody,
  Select,
  FormControl,
  FormLabel,
  Input,
  IconButton,
  Button,
} from '@chakra-ui/react';
import { EditIcon } from '@chakra-ui/icons';
import { IoMdCheckmarkCircleOutline } from 'react-icons/io';
import {
  useEditOrderStatusMutation,
  useEditPaymentStatusMutation,
  useEditShippingStatusMutation,
} from '../slices/orderSlice';

const OrderCard = ({ order, setReloadData }) => {
  const [editOrderStatus, setEditOrderStatus] = useState(false);
  const [editShippingStatus, setEditShippingStatus] = useState(false);
  const [editPaymentStatus, setEditPaymentStatus] = useState(false);
  const [showDetails, setShowDetails] = useState(false); // State to manage expanded details

  const [orderStatus, setOrderStatus] = useState(order.order_status);
  const [shippingStatus, setShippingStatus] = useState(order.shipping.shipping_status);
  const [estimatedDeliveryDate, setEstimatedDeliveryDate] = useState(order.shipping.estimated_delivery_date);
  const [paymentStatus, setPaymentStatus] = useState(order.payment.status);

  const orderStatusOptions = ['Order Confirmation Awaited', 'Confirmed', 'Shipped', 'Delivered'];
  const shippingStatusOptions = ['Yet to Ship', 'Dispatched', 'Delivered'];
  const paymentStatusOptions = ['Confirmation Awaited', 'Paid', 'Refunded'];

  const [updateOrderStatus] = useEditOrderStatusMutation();
  const [updateShippingStatus] = useEditShippingStatusMutation();
  const [updatePaymentStatus] = useEditPaymentStatusMutation();

  const handleSaveOrderStatus = async () => {
    try {
      await updateOrderStatus({ id: order._id, status: orderStatus }).unwrap();
      setEditOrderStatus(false);
      setReloadData(true);
    } catch (err) {
      console.error('Error updating order status:', err);
    }
  };

  const handleSaveShippingStatus = async () => {
    try {
      // Ensure estimatedDeliveryDate is formatted correctly
      const formattedDate = new Date(estimatedDeliveryDate).toISOString().split('T')[0];

      await updateShippingStatus({
        id: order._id,
        shipping_status: shippingStatus,
        estimated_delivery_date: formattedDate,
      }).unwrap();
      setEditShippingStatus(false);
      setReloadData(true);
    } catch (err) {
      console.error('Error updating shipping status:', err);
    }
  };

  const handleSavePaymentStatus = async () => {
    try {
      await updatePaymentStatus({ id: order._id, status: paymentStatus }).unwrap();
      setEditPaymentStatus(false);
      setReloadData(true);
    } catch (err) {
      console.error('Error updating payment status:', err);
    }
  };

  return (
    <Card border="2px" borderColor="teal.500" borderRadius="md" bg="white" boxShadow="md" mb="2rem">
      <CardHeader bg="gray.50" p="2" borderRadius="md">
        <Flex justifyContent="space-between" direction={{ base: 'column', xl: 'row' }} m="20px">
          <Flex alignItems="center" direction="column" gap={{ base: '10px', xl: '20px' }}>
            <Text fontSize={{ base: '20px', sm: '2xl' }} color="teal.400" as="b">
              Date
            </Text>
            <Text as="b">{new Date(order.__created).toLocaleString()}</Text>
          </Flex>
          <Flex alignItems="center" direction="column" gap={{ base: '10px', xl: '20px' }}>
            <Text fontSize={{ base: '20px', sm: '2xl' }} color="teal.400" as="b">
              Order-ID
            </Text>
            <Text as="b">{order._id}</Text>
          </Flex>
        </Flex>
      </CardHeader>

      <CardBody>
        <Stack spacing="2rem">
          <Card bg="orange.50">
            <CardHeader pb="5px">
              <Text fontSize="18px" as="b">
                Product Details
              </Text>
            </CardHeader>
            <CardBody m="0" pt="0">
              {order.items &&
                order.items.map((item, index) => (
                  <Box key={index} mb={3}>
                    <Text>Name: {item.item.name}</Text>
                    <Text>Price: ${item.price}</Text>
                    <Text>Quantity: {item.quantity}</Text>
                  </Box>
                ))}
            </CardBody>
          </Card>
          <Card>
            <CardHeader pb="5px">
              <Text fontSize="18px" as="b">
                Buyer Details
              </Text>
            </CardHeader>
            <CardBody m="0" pt="0">
              <Text>Name: {order.customer.name}</Text>
              <Text>Email: {order.customer.email}</Text>
              <Text noOfLines="2">
                Address: {order.shipping.address.room}, {order.shipping.address.floor} floor, {order.shipping.address.hostel}
              </Text>
              <Text>Contact Number: {order.shipping.address.contact_number}</Text>
            </CardBody>
          </Card>

          {showDetails && (
            <Box>
              <Stack spacing="1rem">
                <FormControl>
                  <FormLabel>Order Status</FormLabel>
                  {!editOrderStatus ? (
                    <Flex alignItems="center">
                      <Text>{order.order_status}</Text>
                      <IconButton
                        icon={<EditIcon />}
                        aria-label="Edit Order Status"
                        variant="outline"
                        size="sm"
                        onClick={() => setEditOrderStatus(true)}
                      />
                    </Flex>
                  ) : (
                    <HStack spacing="30px">
                      <Select
                        defaultValue={order.order_status || ''}
                        onChange={(e) => setOrderStatus(e.target.value)}
                        bg="gray.50"
                        borderColor="gray.200"
                        focusBorderColor="blue.400"
                        color="black"
                      >
                        {orderStatusOptions.map((status, index) => (
                          <option key={index} value={status}>
                            {status}
                          </option>
                        ))}
                      </Select>
                      <IconButton
                        icon={<IoMdCheckmarkCircleOutline />}
                        aria-label="Save Order Status"
                        variant="outline"
                        size="sm"
                        onClick={handleSaveOrderStatus}
                      />
                    </HStack>
                  )}

                  <FormLabel>Shipping Status</FormLabel>
                  {!editShippingStatus ? (
                    <Flex alignItems="center">
                      <Text>{order.shipping.shipping_status}</Text>
                      <IconButton
                        icon={<EditIcon />}
                        aria-label="Edit Shipping Status"
                        variant="outline"
                        size="sm"
                        onClick={() => setEditShippingStatus(true)}
                      />
                    </Flex>
                  ) : (
                    <HStack spacing="30px">
                      <Select
                        defaultValue={order.shipping.shipping_status || ''}
                        onChange={(e) => setShippingStatus(e.target.value)}
                        bg="gray.50"
                        borderColor="gray.200"
                        focusBorderColor="blue.400"
                        color="black"
                      >
                        {shippingStatusOptions.map((status, index) => (
                          <option key={index} value={status}>
                            {status}
                          </option>
                        ))}
                      </Select>
                      <Input
                        type="date"
                        value={estimatedDeliveryDate}
                        onChange={(e) => setEstimatedDeliveryDate(e.target.value)}
                      />
                      <IconButton
                        icon={<IoMdCheckmarkCircleOutline />}
                        aria-label="Save Shipping Status"
                        variant="outline"
                        size="sm"
                        onClick={handleSaveShippingStatus}
                      />
                    </HStack>
                  )}

                  <FormLabel>Payment Status</FormLabel>
                  {!editPaymentStatus ? (
                    <Flex alignItems="center">
                      <Text>{order.payment.status}</Text>
                      <IconButton
                        icon={<EditIcon />}
                        aria-label="Edit Payment Status"
                        variant="outline"
                        size="sm"
                        onClick={() => setEditPaymentStatus(true)}
                      />
                    </Flex>
                  ) : (
                    <HStack spacing="30px">
                      <Select
                        defaultValue={order.payment.status || ''}
                        onChange={(e) => setPaymentStatus(e.target.value)}
                        bg="gray.50"
                        borderColor="gray.200"
                        focusBorderColor="blue.400"
                        color="black"
                      >
                        {paymentStatusOptions.map((status, index) => (
                          <option key={index} value={status}>
                            {status}
                          </option>
                        ))}
                      </Select>
                      <IconButton
                        icon={<IoMdCheckmarkCircleOutline />}
                        aria-label="Save Payment Status"
                        variant="outline"
                        size="sm"
                        onClick={handleSavePaymentStatus}
                      />
                    </HStack>
                  )}
                </FormControl>
              </Stack>
            </Box>
          )}

          <Flex justifyContent="center" mt="1rem">
            <Button size="sm" onClick={() => setShowDetails(!showDetails)}>
              {showDetails ? 'Show Less' : 'Show More'}
            </Button>
          </Flex>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default OrderCard;
