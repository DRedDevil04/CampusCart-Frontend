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
import { FaStore, FaUser, FaShopify } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import NavItem from "../helpers/navitems";
import { selectUser } from "../slices/authSlice.js";
import { useSelector } from "react-redux";
import { TiShoppingCart } from "react-icons/ti";

const Sidebar = ({ isOpen, onClose, btnRef }) => {
  const navigate = useNavigate();
  const userInfo = useSelector(selectUser);

  if (!userInfo) {
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
                icon={FaShopify}
                title="Shop"
                onClick={() => {
                  navigate("/");
                  onClose();
                }}
              />
              <NavItem
                icon={FaUser}
                title="Login"
                onClick={() => {
                  navigate("/login");
                  onClose();
                }}
              />
              <NavItem
                icon={FaUser}
                title="Register"
                onClick={() => {
                  navigate("/register");
                  onClose();
                }}
              />
            </Flex>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    );
  }
  const isAdmin = userInfo?.role === "admin";

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
          {isAdmin ? (
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
              <NavItem
                icon={FaShopify}
                title="Shop"
                onClick={() => {
                  navigate("/");
                  onClose();
                }}
              />
            </Flex>
          ) : (
            <Flex p="5%" flexDir="column" width="100%" as="nav">
              <NavItem
                icon={FaShopify}
                title="Shop"
                onClick={() => {
                  navigate("/");
                  onClose();
                }}
              />
              <NavItem
                icon={TiShoppingCart}
                title="My Cart"
                onClick={() => {
                  navigate("/cart");
                  onClose();
                }}
              />
            </Flex>
          )}
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default Sidebar;
