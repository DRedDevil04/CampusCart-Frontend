import React from 'react';
import { Flex, Text, Icon, Link } from '@chakra-ui/react';

export default function NavItem({ icon, title, active,onClick }) {
    return (
        <Link
            onClick={onClick}
            backgroundColor={active && "#AEC8CA"}
            p={3}
            borderRadius={8}
            _hover={{ textDecor: 'none', backgroundColor: "#AEC8CA" }}
            width="100%"
        >
            <Flex alignItems="center">
                <Icon as={icon} fontSize="xl" color={active ? "#82AAAD" : "gray.500"} />
                <Text ml={5} display="flex">{title}</Text>
            </Flex>
        </Link>
    );
}
