import React, { useEffect, useState } from 'react';
import { Box, SimpleGrid, Spinner } from '@chakra-ui/react';
import OrderCard from '../components/orders';
import { useGetAllOrdersQuery} from '../slices/orderSlice';

const OrdersPage = () => {
  //const [orders, setOrders] = useState([]);
  const [reloadData, setReloadData] = useState(false); // State to trigger data reload

  const {data:orders=[],isLoading:isLoadingOrders,error:errorOrders,refetch:refetchOrders}= useGetAllOrdersQuery();

  useEffect(() => {
    if (reloadData) {
      refetchOrders();
      setReloadData(false);
    }
 },[reloadData,refetchOrders]);

  if (isLoadingOrders) {
    return <Box p={4}><Spinner size="xl" /></Box>;
  }

  if (errorOrders || orders.length === 0) {
    return <Box p={4}>No orders found</Box>;
  }

  return (
    <Box p={4}>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={5}>
        {orders.map((order, index) => (
          <OrderCard key={index} order={order} setReloadData={setReloadData}/>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default OrdersPage;
