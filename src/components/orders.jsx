import React, { useState } from 'react';
import {
  Box,
  Card,
  Stack,
  Flex,
  Text,
  FormControl,
  FormLabel,
  Input,
  IconButton,
  Button,
  Select,
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
  const [editPaymentStatus, setEditPaymentStatus] = useState(false);
  const [editShippingStatus, setEditShippingStatus] = useState(false);
  const [showDetails, setShowDetails] = useState(false);

  const [orderStatus, setOrderStatus] = useState(order.order_status || 'Confirmation Awaited');
  const [estimatedDeliveryDate, setEstimatedDeliveryDate] = useState(order.shipping.estimated_delivery_date || '');
  const [paymentStatus, setPaymentStatus] = useState(order.payment.status || 'Pending');

  const orderStatusOptions = ['Confirmation Awaited', 'Confirmed', 'Processing', 'Shipped', 'Out for Delivery', 'Delivered', 'Cancelled'];
  const paymentStatusOptions = ['Pending', 'Paid', 'Failed', 'Refunded', 'Cancelled'];

  const [updateOrderStatus] = useEditOrderStatusMutation();
  const [updatePaymentStatus] = useEditPaymentStatusMutation();
  const [updateShippingStatus] = useEditShippingStatusMutation();

  const handleSaveOrderStatus = async () => {
    try {
      await updateOrderStatus({ id: order._id, status: orderStatus });
      setEditOrderStatus(false);
      setReloadData(true);
    } catch (err) {
      console.error('Error updating order status:', err);
    }
  };

  const handleSavePaymentStatus = async () => {
    try {
      await updatePaymentStatus({ id: order._id, status: paymentStatus });
      setEditPaymentStatus(false);
      setReloadData(true);
    } catch (err) {
      console.error('Error updating payment status:', err);
    }
  };

  const handleSaveShippingStatus = async () => {
    try {
      await updateShippingStatus({
        id: order._id,
        estimated_delivery_date: estimatedDeliveryDate,
      });
      setEditShippingStatus(false);
      setReloadData(true);
    } catch (err) {
      console.error('Error updating shipping status:', err);
    }
  };

  return (
    <Card border="2px" borderColor="teal.500" borderRadius="md" bg="white" boxShadow="md" mb="2rem">
      <Stack spacing="2rem" p="1.5rem">
        {/* Render 'Delivered' orders at the top */}
        {order.order_status === 'Delivered' && (
          <Flex justifyContent="center" alignItems="center" mb="1rem">
            <Text fontSize="lg" fontWeight="bold" color="green.500">
              Delivered
            </Text>
          </Flex>
        )}

        <Flex justifyContent="space-between" alignItems="center">
          <Text fontSize="lg" fontWeight="bold" color="teal.400">
            Order Date
          </Text>
          <Text>{new Date(order.__created).toLocaleString()}</Text>
        </Flex>

        <Flex justifyContent="space-between" alignItems="center">
          <Text fontSize="lg" fontWeight="bold" color="teal.400">
            Order ID
          </Text>
          <Text>{order._id}</Text>
        </Flex>
        <Flex justifyContent="space-between" alignItems="center">
          <Text fontSize="lg" fontWeight="bold" color="black.400">
            Order Amount : 
          </Text>
          <Text>{order.payment.amount}</Text>
        </Flex>

        <Box>
          <Card bg="orange.50" p="1.5rem">
            <Text fontSize="lg" fontWeight="bold">
              Product Details
            </Text>
            {order.items && order.items.map((item, index) => (
              <Box key={index} mt="1.5rem">
                <Text>Name: {item.item.name}</Text>
                <Text>Price: {item.price} {item.item.price.currency}</Text>
                <Text>Quantity: {item.quantity}</Text>
                <Text>Total: {item.price*item.quantity} {item.item.price.currency}</Text>
              </Box>
            ))}
          </Card>

          <Card mt="1.5rem" p="1.5rem">
            <Text fontSize="lg" fontWeight="bold">
              Buyer Details
            </Text>
            <Text>Name: {order.customer.name}</Text>
            <Text>Enrollment Number: {order.customer.enrollment_number}</Text>
            <Text>Email: {order.customer.email}</Text>
            <Text>Address: {order.shipping.address.room}, {order.shipping.address.floor} floor, {order.shipping.address.hostel}</Text>
            <Text>Contact Number: {order.shipping.address.contact_number}</Text>
          </Card>

          {showDetails && (
            <Box mt="1.5rem">
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
                      ml="1rem"
                    />
                  </Flex>
                ) : (
                  <Flex alignItems="center">
                    <Select
                      value={orderStatus}
                      onChange={(e) => setOrderStatus(e.target.value)}
                      bg="gray.50"
                      borderColor="gray.200"
                      focusBorderColor="blue.400"
                      color="black"
                      mr="1rem"
                    >
                      {orderStatusOptions.map((status, index) => (
                        <option key={index} value={status}>{status}</option>
                      ))}
                    </Select>
                    <IconButton
                      icon={<IoMdCheckmarkCircleOutline />}
                      aria-label="Save Order Status"
                      variant="outline"
                      size="sm"
                      onClick={handleSaveOrderStatus}
                      ml="1rem"
                    />
                  </Flex>
                )}

                <FormLabel mt="1rem">Payment Status</FormLabel>
                {!editPaymentStatus ? (
                  <Flex alignItems="center">
                    <Text>{order.payment.status}</Text>
                    <IconButton
                      icon={<EditIcon />}
                      aria-label="Edit Payment Status"
                      variant="outline"
                      size="sm"
                      onClick={() => setEditPaymentStatus(true)}
                      ml="1rem"
                    />
                  </Flex>
                ) : (
                  <Flex alignItems="center">
                    <Select
                      value={paymentStatus}
                      onChange={(e) => setPaymentStatus(e.target.value)}
                      bg="gray.50"
                      borderColor="gray.200"
                      focusBorderColor="blue.400"
                      color="black"
                      mr="1rem"
                    >
                      {paymentStatusOptions.map((status, index) => (
                        <option key={index} value={status}>{status}</option>
                      ))}
                    </Select>
                    <IconButton
                      icon={<IoMdCheckmarkCircleOutline />}
                      aria-label="Save Payment Status"
                      variant="outline"
                      size="sm"
                      onClick={handleSavePaymentStatus}
                      ml="1rem"
                    />
                  </Flex>
                )}

                <FormLabel mt="1rem">Estimated Delivery Date</FormLabel>
                {!editShippingStatus ? (
                  <Flex alignItems="center">
                    <Text>{estimatedDeliveryDate}</Text>
                    <IconButton
                      icon={<EditIcon />}
                      aria-label="Edit Estimated Delivery Date"
                      variant="outline"
                      size="sm"
                      onClick={() => setEditShippingStatus(true)}
                      ml="1rem"
                    />
                  </Flex>
                ) : (
                  <Flex alignItems="center">
                    <Input
                      type="date"
                      value={estimatedDeliveryDate}
                      onChange={(e) => setEstimatedDeliveryDate(e.target.value)}
                      mr="1rem"
                    />
                    <IconButton
                      icon={<IoMdCheckmarkCircleOutline />}
                      aria-label="Save Estimated Delivery Date"
                      variant="outline"
                      size="sm"
                      onClick={handleSaveShippingStatus}
                    />
                  </Flex>
                )}
              </FormControl>
            </Box>
          )}

          <Flex justifyContent="center" mt="1.5rem">
            <Button size="sm" onClick={() => setShowDetails(!showDetails)}>
              {showDetails ? 'Show Less' : 'Show More'}
            </Button>
          </Flex>
        </Box>
      </Stack>
    </Card>
  );
};

export default OrderCard;
