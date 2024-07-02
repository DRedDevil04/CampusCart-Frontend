import React from 'react';
import { Link } from 'react-router-dom';
import { Box, Button, Center, Image, Text } from '@chakra-ui/react';

const CardView = ({ imageSrc, cardText, link }) => {
  return (
      <Box
        mt='20px'
        maxW="sm"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        p="4"
        boxShadow="md"
        borderColor="gray.200"
        bg="white"
      >
        <Image src={imageSrc} alt="Item Image" height='180px' width='180px' object-fit='cover'/>
        <Text mt="2" fontWeight="semibold" fontSize="xl" textAlign="center">
          {cardText}
        </Text>
        <Link to={link}>
          <Button mt="2" colorScheme="teal" w="100%">
            Go
          </Button>
        </Link>
      </Box>
  );
};

export default CardView;
