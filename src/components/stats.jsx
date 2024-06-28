import React, {useState,useEffect} from 'react';
import { Box, Flex, Stat, StatLabel, StatNumber, SimpleGrid } from '@chakra-ui/react';
import { BsPerson } from 'react-icons/bs';
import { MdProductionQuantityLimits } from "react-icons/md";
import { MdOutlineReviews } from "react-icons/md";
import api from '../API/api';

const StatsCard = ({ title, stat, icon }) => (
  <Stat p={4} shadow="md" rounded="lg" borderWidth="1px" borderColor="gray.500">
    <Flex justify="space-between" align="center">
      <Box>
        <StatLabel fontSize={{ base: "md", md: "lg" }} fontWeight="medium">{title}</StatLabel>
        <StatNumber fontSize={{ base: "xl", md: "2xl" }} fontWeight="medium">{stat}</StatNumber>
      </Box>
      <Box
        color="gray.500"
        cursor="pointer"
        _hover={{
          color: "gray.700",
          transform: "scale(1.1)",
          transition: "transform 0.2s ease-in-out"
        }}
      >
        {icon}
      </Box>
    </Flex>
  </Stat>
);

const Stats = () => {
  const [productCount,setProductCount]=useState(0);
  const [userCount,setUserCount]=useState(0);
  useEffect(()=>{    
      const getUserCount=async()=>{
        try{
          const res=await api.get('/user/getallusers',{withCredentials:true});
          setUserCount(Array.isArray(res.data.data) ? res.data.data.length : 0);
        }catch(err)
        {
          console.log(err);
        }
      } 
      getUserCount();
      const getProductCount=async()=>{
        try{
          const res=await api.get('/item');
          setProductCount(Array.isArray(res.data) ? res.data.length : 0);
        }catch(err)
        {
          console.log(err);
        }
      }
      getProductCount(); 

      const interval= setInterval(()=>{
        getProductCount();
        getUserCount();
      },5000);

      return ()=>clearInterval(interval)
  },[]);

  return (
    <Box minW="320px" width="100%" pt={5} px={{ base: 2, sm: 12, md: 17 }}>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={{ base: 4, sm: 5, lg: 8 }}>
        <StatsCard
          title="Users"
          stat={userCount}
          icon={<BsPerson size="3em" />}
        />
        <StatsCard
          title="Products"
          stat={productCount}
          icon={<MdProductionQuantityLimits size="3em" />}
        />
        <StatsCard
          title="Reviews"
          stat="99+"
          icon={<MdOutlineReviews size="3em" />}
        />
      </SimpleGrid>
    </Box>
  );
};

export default Stats;
