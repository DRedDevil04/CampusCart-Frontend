import React from "react";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  Box,
  Text,
  Flex,
  IconButton,
  Button,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from "@chakra-ui/react";
import { ArrowLeftIcon } from "@chakra-ui/icons";
import { FaStore, FaUser, FaShopify } from "react-icons/fa";
import { MdDashboard } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import NavItem from "../helpers/navitems";
import { selectUser, logout } from "../slices/authSlice.js";
import { useSelector, useDispatch } from "react-redux";
import { TiShoppingCart } from "react-icons/ti";
import { FaCircleUser } from "react-icons/fa6";
import { useToast } from "@chakra-ui/react";

const Sidebar = ({ isOpen, onClose, btnRef }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector(selectUser);
  const toast = useToast();
  const [isOpenLogoutDialog, setIsOpenLogoutDialog] = React.useState(false);

  const handleLogout = () => {
    dispatch(logout());
    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
    navigate("/login");
    onClose();
  };

  const cancelLogout = () => {
    setIsOpenLogoutDialog(false);
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
              <NavItem
                icon={FaCircleUser}
                title="My Profile"
                onClick={() => {
                  navigate("/profile");
                  onClose();
                }}
              />
              <Button
                mt={4}
                colorScheme="red"
                variant="outline"
                onClick={() => setIsOpenLogoutDialog(true)}
              >
                Logout
              </Button>
            </Flex>
          ) : (
            <Flex p="5%" flexDir="column" width="100%" as="nav">
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
              <Button
                mt={4}
                colorScheme="red"
                variant="outline"
                onClick={() => setIsOpenLogoutDialog(true)}
              >
                Logout
              </Button>
            </Flex>
          )}
        </DrawerBody>
      </DrawerContent>

      {/* Logout Confirmation Dialog */}
      <AlertDialog
        isOpen={isOpenLogoutDialog}
        leastDestructiveRef={btnRef}
        onClose={() => setIsOpenLogoutDialog(false)}
        isCentered // Center the dialog
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Logout
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure you want to log out?
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button onClick={cancelLogout}>Cancel</Button>
              <Button colorScheme="red" ml={3} onClick={handleLogout}>
                Logout
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Drawer>
  );
};

export default Sidebar;
