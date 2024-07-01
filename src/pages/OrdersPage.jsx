import React, { useEffect, useState } from 'react';
import { Box, SimpleGrid, Spinner } from '@chakra-ui/react';
import OrderCard from '../components/orders';
import api from '../API/api';

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getAllOrders = async () => {
      try {
        const res = await api.get('/order');
        setOrders(res.data.orders);
        setLoading(false);
      } catch (err) {
        console.error(`Error: ${err.message}`);
        setLoading(false);
      }
    };
    getAllOrders();
  }, []);

  if (loading) {
    return <Box p={4}><Spinner size="xl" /></Box>;
  }

  if (orders.length === 0) {
    return <Box p={4}>No orders found</Box>;
  }

  return (
    <Box p={4}>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={5}>
        {orders.map((order, index) => (
          <OrderCard key={index} order={order} />
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default OrdersPage;
