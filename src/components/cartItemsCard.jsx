import React from 'react';
import { Box, Image, Text, Button,Flex, VStack,Badge } from '@chakra-ui/react';

const CartItem = ({ product, onIncrease, onDecrease,onRemove }) => {
  const { title, img, price,quantity} = product;
  return (
    <Box bg="white" borderWidth="1px" borderRadius="lg" overflow="hidden" p={4} boxShadow="md">
      <Flex gap="12" height="100%">
        <Image boxSize="100px" objectFit="cover" src={img} alt={title} />

        <VStack align="start" flex="1">
          <Text fontWeight="bold" fontSize="lg">{title}</Text>
          <Text>Price: Rs {(price).toFixed(2)}</Text>
          <Flex gap="1rem" alignItems="center"> 
            <Text>Quantity:</Text>
            <Button size="sm" onClick={onDecrease} disabled={quantity <= 1}>-</Button>
            <Badge variant="subtle" fontSize="1rem" color="blue.500">{quantity}</Badge>
            <Button size="sm" onClick={onIncrease}>+</Button>
          </Flex>
          <Text>Total: Rs {price*quantity.toFixed(2)}</Text>
        </VStack>
        <Button onClick={onRemove}>Remove Item</Button>
      </Flex>
    </Box>
  );
};

export default CartItem;
