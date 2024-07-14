import React from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalFooter,
  Button,
  Text,
  useToast,
  MenuItem,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logout } from "../slices/authSlice";

const LogoutModal = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const toast = useToast();

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      dispatch(logout());
      navigate("/login");

      toast({
        title: "Logged Out Successfully",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      handleClose();
    } catch (err) {
      dispatch(logout());
      console.log(err);
      toast({
        title: "Logout failed",
        description: err.response?.data?.message || "An error occurred",
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  return (
    <>
      <MenuItem onClick={handleOpen}>Logout</MenuItem>
      <Modal isOpen={isOpen} onClose={handleClose} isCentered>
        <ModalOverlay />
        <ModalContent maxWidth={{ base: "240px", sm: "300px" }}>
          <ModalBody>
            <Text
              fontSize={{ base: "17px", md: "22px" }}
              textAlign="center"
              fontWeight="bold"
            >
              Do you want to Logout?
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleLogout}>
              Logout
            </Button>
            <Button variant="ghost" onClick={handleClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default LogoutModal;
