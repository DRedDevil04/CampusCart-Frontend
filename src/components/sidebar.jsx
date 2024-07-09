import React from "react";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  Box,
  Text,
  Flex,
  IconButton,
  useToast,
  useMediaQuery
} from "@chakra-ui/react";
import { ArrowLeftIcon } from "@chakra-ui/icons";
import { FaStore, FaUser, FaShopify } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import NavItem from "../helpers/navitems";
import { selectUser } from "../slices/authSlice.js";
import { useSelector, useDispatch } from "react-redux";
import { TiShoppingCart } from "react-icons/ti";
import { FaCircleUser } from "react-icons/fa6";
import { logout } from '../slices/authSlice';
import { useLogoutMutation } from "../slices/userApiSlice.js";

const Sidebar = ({ isOpen, onClose, btnRef }) => {
  const navigate = useNavigate();
  const userInfo = useSelector(selectUser);
  const toast = useToast();
  const [isNonMobile] = useMediaQuery('(min-width:520px)');
  const dispatch = useDispatch();
  const [logoutApiCall] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/login');

      toast({
        title: "Logged Out Successfully",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      onClose();
    } catch (err) {
      dispatch(logout());
      toast({
        title: "Logout failed",
        description: err.response?.data?.message || "An error occurred",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

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
          <Flex p="5%" flexDir="column" width="100%" as="nav">
            {isAdmin ? (
              <>
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
                  icon={FaShopify}
                  title="Orders"
                  onClick={() => {
                    navigate("/dashboard/orders");
                    onClose();
                  }}
                />
                <NavItem
                  icon={FaStore}
                  title="Shop"
                  onClick={() => {
                    navigate("/");
                    onClose();
                  }}
                />
                <NavItem
                  icon={FaCircleUser}
                  title="My Profile"
                  onClick={() => {
                    navigate("/profile");
                    onClose();
                  }}
                />
              </>
            ) : (
              <>
                <NavItem
                  icon={FaCircleUser}
                  title="My Profile"
                  onClick={() => {
                    navigate("/profile");
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
                <NavItem
                  icon={FaShopify}
                  title="Shop"
                  onClick={() => {
                    navigate("/");
                    onClose();
                  }}
                />
              </>
            )}
            {!isNonMobile && (
              <NavItem
                title="Logout"
                onClick={handleLogout}
              />
            )}
          </Flex>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
};

export default Sidebar;
