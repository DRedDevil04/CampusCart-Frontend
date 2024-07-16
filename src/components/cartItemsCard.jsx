import React from 'react';
import { Box, Image, Text, Button, Flex, VStack, Badge } from '@chakra-ui/react';

const CartItem = ({ product, onIncrease, onDecrease, onRemove }) => {
  const { title, img, price, quantity } = product;

  return (
    <Box
      bg="white"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={4}
      boxShadow="md"
      mb={4} // Add margin bottom for spacing between items
    >
      <Flex flexDir={{ base: 'column', md: 'row' }} alignItems="center">
        {/* Image Section */}
        <Box mb={{ base: 4, md: 0 }} mr={{ base: 0, md: 4 }}>
          <Image boxSize={{ base: '100%', md: '100px' }} objectFit="cover" src={img} alt={title} />
        </Box>

        {/* Details Section */}
        <VStack align="start" flex="1" spacing={2}>
          <Text fontWeight="bold" fontSize={{ base: 'xl', md: 'lg' }}>{title}</Text>
          <Text fontSize={{ base: 'sm', md: 'md' }}>Price: Rs {price}</Text>
          <Flex alignItems="center">
            <Text fontSize={{ base: 'sm', md: 'md' }}>Quantity:</Text>
            <Button size="sm" onClick={onDecrease} disabled={quantity <= 1} mr={2} m={2}>
              -
            </Button>
            <Badge variant="subtle" fontSize={{ base: 'sm', md: 'md' }} color="blue.500">
              {quantity}
            </Badge>
            <Button size="sm" onClick={onIncrease} ml={2}>
              +
            </Button>
          </Flex>
          <Text fontSize={{ base: 'sm', md: 'md' }}>Total: Rs {(price * quantity).toFixed(2)}</Text>
        </VStack>

        {/* Remove Button Section */}
        <Button mt={{ base: 4, md: 0 }} onClick={onRemove}>
          Remove Item
        </Button>
      </Flex>
    </Box>
  );
};

export default CartItem;
