import React, { useEffect, useState } from "react";
import styled from "styled-components";
import {
  Box,
  SimpleGrid,
  Spinner,
  Center,
  Input,
  Select,
  Flex,
} from "@chakra-ui/react";
import OrderCard from "../components/orders";
import Header from "../components/header";
import Sidebar from "../components/sidebar";
import { useGetAllOrdersQuery } from "../slices/orderSlice";

const OrdersPage = ({ onOpen, isOpen, onClose, btnRef }) => {
  const [reloadData, setReloadData] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFilter, setSearchFilter] = useState("item"); // 'item' or 'buyer'
  const [statusFilter, setStatusFilter] = useState(""); // Empty string means no filter

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

  const handleSearch = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  const filteredOrders =
    orders.length === 0
      ? []
      : orders.filter((order) => {
          const matchesSearchQuery =
            searchFilter === "item"
              ? order.items.some((item) =>
                  item.item.name.toLowerCase().includes(searchQuery)
                )
              : order.customer.name.toLowerCase().includes(searchQuery);

          const matchesStatus =
            statusFilter === "" || order.order_status === statusFilter;

          return matchesSearchQuery && matchesStatus;
        });

  if (isLoadingOrders) {
    return (
      <Center>
        <Spinner
          thickness="4px"
          speed="0.65s"
          emptyColor="gray.200"
          color="blue.500"
          size="xl"
          mt="20%"
          min-height="100vh"
        />
      </Center>
    );
  }

  if (errorOrders || orders.length === 0) {
    return (
      <>
        <HeaderWrapper>
          <Header onOpen={onOpen} />
        </HeaderWrapper>
        <Sidebar isOpen={isOpen} onClose={onClose} btnRef={btnRef} />
        <Box p={4}>No orders found</Box>
      </>
    );
  }
  if (!Array.isArray(orders)) {
    return <Box p={4}>Orders not received as array</Box>;
  }

  return (
    <>
      <HeaderWrapper>
        <Header onOpen={onOpen} />
      </HeaderWrapper>
      <Sidebar isOpen={isOpen} onClose={onClose} btnRef={btnRef} />
      <Box p={4}>
        {/* Search Bar and Filters */}
        <Flex mb={4} justify="space-between" align="center">
          <Input
            placeholder={`Search by ${
              searchFilter === "item" ? "item name" : "buyer name"
            }`}
            value={searchQuery}
            onChange={handleSearch}
            width="45%"
            borderColor="blue.400"
          />
          <Select
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            width="25%"
            borderColor="blue.400"
          >
            <option value="item">Item Name</option>
            <option value="buyer">Buyer Name</option>
          </Select>
          <Select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            width="27%"
            borderColor="blue.400"
          >
            <option value="">Sort By Status</option>
            <option value="Confirmation Awaited">Confirmation Awaited</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Out for Delivery">Out for Delivery</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </Select>
        </Flex>

        <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={5}>
          {filteredOrders.map((order, index) => (
            <OrderCard
              key={index}
              order={order}
              setReloadData={setReloadData}
            />
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
