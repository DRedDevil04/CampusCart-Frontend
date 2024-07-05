import React from "react";
import {
  Box,
  Image,
  Text,
  Button,
  Flex,
  HStack,
  VStack,
} from "@chakra-ui/react";

const CartItem = ({ product, onIncrease, onDecrease }) => {
  const { title, img, price, quantity } = product;
  function handleError(e) {
    console.log(e);
    e.target.src =
      "https://placehold.co/400/dbe2ef/3f72af?text=Image+not+available";
  }
  return (
    <Box
      bg="white"
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={4}
      boxShadow="md"
    >
      <HStack spacing={4}>
        <Image
          boxSize="100px"
          objectFit="cover"
          src={img}
          alt={title}
          onError={handleError}
        />

        <VStack align="start" flex="1">
          <Text fontWeight="bold" fontSize="lg">
            {title}
          </Text>
          <Text>Price: ${(price * quantity).toFixed(2)}</Text>
          <HStack>
            <Text>Quantity:</Text>
            <Button size="sm" onClick={onDecrease} disabled={quantity <= 1}>
              -
            </Button>
            <Text>{quantity}</Text>
            <Button size="sm" onClick={onIncrease}>
              +
            </Button>
          </HStack>
          <Text>Total: Rs{price.toFixed(2)}</Text>
        </VStack>
      </HStack>
    </Box>
  );
};

export default CartItem;
