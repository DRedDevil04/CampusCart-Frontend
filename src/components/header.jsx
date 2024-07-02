import React from 'react';
import { Box, Flex, Text, Avatar, Heading, IconButton, useMediaQuery, Menu, MenuButton, MenuList, MenuItem, MenuDivider, useDisclosure } from '@chakra-ui/react';
import { ArrowRightIcon } from '@chakra-ui/icons';
import LogoutModal from './logout.jsx'; // Ensure correct import path and component name
import { useNavigate } from 'react-router-dom';

const Header = ({ onOpen }) => {
  const navigate = useNavigate();
  const [isNonMobile] = useMediaQuery('(min-width: 420px)');
  const { isOpen, onOpen: onOpenModal, onClose } = useDisclosure();

  return (
    <Box minW="320px" w="100%" className="Header" bg="teal.500" p={4}>
      <Flex align="center" justifyContent="space-between">
        <IconButton
          colorScheme="whiteAlpha"
          aria-label="Open Sidebar"
          icon={<ArrowRightIcon />}
          onClick={onOpen}
        />
        <Heading as="h1" size={['md', 'lg', 'xl', '2xl']} color="white" whiteSpace="nowrap" flexShrink={0} onClick={() => { navigate("/dashboard"); onClose(); }}>
          Dashboard
        </Heading>
        <Flex alignItems="center" flexDirection={isNonMobile ? "row" : "column-reverse"} gap="2">
          <Text fontSize={['md', 'lg', 'xl', '2xl']} fontWeight="bold">
            Admin
          </Text>
          <Menu>
            <MenuButton as={Avatar} name="Admin" src="https://react.semantic-ui.com/images/avatar/large/matthew.png" size="md" />
            <MenuList>
              <MenuItem>See profile!</MenuItem>
              <MenuDivider />
              <LogoutModal />
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;
