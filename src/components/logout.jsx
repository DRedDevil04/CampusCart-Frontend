import React from 'react';
import { Modal, ModalOverlay, ModalContent, ModalBody, ModalFooter, Button, Text, useToast,MenuItem } from '@chakra-ui/react';
import api from '../API/api';  // Ensure this is correctly set up to point to your backend

const LogoutModal = () => {
  const [isOpen, setIsOpen] = React.useState(false); // Local state for modal visibility
  const toast = useToast();

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);

  const handleLogout = async () => {
    try {
      // Replace with your actual logout API call
      // await api.post('/auth/logout', {}, { withCredentials: true });

      toast({
        title: "Logged Out Successfully",
        status: "success",
        duration: 4000,
        isClosable: true,
      });
      handleClose(); // Close the modal after successful logout
    } catch (err) {
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
            <Text fontSize={{ base: "17px", md: "22px" }} textAlign="center" fontWeight="bold">
              Do you want to Logout?
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleLogout}>
              Logout
            </Button>
            <Button variant="ghost" onClick={handleClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default LogoutModal;
