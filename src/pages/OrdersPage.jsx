import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Box, SimpleGrid, Spinner } from '@chakra-ui/react';
import OrderCard from '../components/orders';
import Header from '../components/header';
import Sidebar from '../components/sidebar';
import { useGetAllOrdersQuery } from '../slices/orderSlice';

const OrdersPage = ({ onOpen, isOpen, onClose, btnRef }) => {
  const [reloadData, setReloadData] = useState(false);

  const {
    data = {},
    isLoading: isLoadingOrders,
    error: errorOrders,
    refetch: refetchOrders,
  } = useGetAllOrdersQuery();

  const orders = data.orders || [];

  useEffect(() => {
    if (reloadData) {
      refetchOrders();
      setReloadData(false);
    }
  }, [reloadData, refetchOrders]);

  if (isLoadingOrders) {
    return (
      <Box p={4}>
        <Spinner size="xl" />
      </Box>
    );
  }

  if (errorOrders || orders.length === 0) {
    return (
      <>
        <HeaderWrapper>
          <Header onOpen={onOpen} />
        </HeaderWrapper>
        <Sidebar isOpen={isOpen} onClose={onClose} btnRef={btnRef} />

        <Box p={4}>No orders found</Box>;
      </>
    )
  }
  if (!Array.isArray(orders)) {
    return <Box p={4}>Orders not recieved as array</Box>;
  }

  return (
    <>
      <HeaderWrapper>
        <Header onOpen={onOpen} />
      </HeaderWrapper>
      <Sidebar isOpen={isOpen} onClose={onClose} btnRef={btnRef} />
      <Box p={4} >
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={5}>
          {orders.map((order, index) => (
            <OrderCard key={index} order={order} setReloadData={setReloadData} />
          ))}
        </SimpleGrid>
      </Box>
    </>
  );
};

const HeaderWrapper = styled.div`
  position: sticky;
  top: 0;
  z-index: 1000; /* Adjust z-index as needed */
  background-color: white; /* Optional: Add background color if needed */
`;

export default OrdersPage;