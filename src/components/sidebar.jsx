import React from "react";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  Box,
  Text,
  Flex,
  IconButton,
} from "@chakra-ui/react";
import { ArrowLeftIcon } from "@chakra-ui/icons";
import { FiSettings } from "react-icons/fi";
import { FaStore, FaUser } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import NavItem from "../helpers/navitems";

const Sidebar = ({ isOpen, onClose, btnRef }) => {
  const navigate = useNavigate();

  return (
    <Drawer
      isOpen={isOpen}
      placement="left"
      onClose={onClose}
      finalFocusRef={btnRef}
    >
      <DrawerContent maxW={{ base: "80%", sm: "250px" }}>
        <Box mt={2} display="flex" alignItems="center" p={4} width="100%">
          <Text flex="1" fontSize="3xl" fontWeight="bold">
            Menu
          </Text>
          <IconButton
            ml="40px"
            variant="outline"
            onClick={onClose}
            colorScheme="teal"
            icon={<ArrowLeftIcon />}
            size="sm"
          />
        </Box>
        <DrawerBody>
          <Flex p="5%" flexDir="column" width="100%" as="nav">
            <NavItem
              icon={MdDashboard}
              title="Dashboard"
              onClick={() => {
                navigate("/dashboard");
                onClose();
              }}
            />
            <NavItem
              icon={FaUser}
              title="Users"
              onClick={() => {
                navigate("/dashboard/userpage");
                onClose();
              }}
            />
            <NavItem
              icon={FaStore}
              title="Orders"
              onClick={() => {
                navigate("/dashboard/orders");
                onClose();
              }}
            />
            <NavItem icon={FiSettings} title="Settings" />
          </Flex>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default Sidebar;
