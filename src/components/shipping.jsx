import React, { useState } from 'react';
import {
  Card,
  Box,
  Input,
  Button,
  CardHeader,
  CardBody,
  FormLabel,
  FormControl,
  useToast,
} from '@chakra-ui/react';
import { useUpdateProfileMutation } from '../slices/userApiSlice';
const Shipping = ({ address, setAddress }) => {
  const [editAddress, setEditAddress] = useState(false);
  const toast = useToast();
  const [updateProfile] = useUpdateProfileMutation();

  const handleSaveAddress = async () => {
    try {
      await updateProfile({ address }).unwrap();
      setEditAddress(false);
      toast({
        title: 'Address updated successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error updating address.',
        description: error.data?.message || error.error,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Card m="2rem">
      <CardHeader as="b" fontSize="24px" pb="0">
        Ship to:
      </CardHeader>
      <CardBody>
        <FormControl>
          {['room', 'floor', 'hostel', 'contact_number'].map((field) => (
            <Box key={field} mb="1rem">
              <FormLabel mb="0">{field.toUpperCase()}</FormLabel>
              <Input
                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                value={address[field]}
                onChange={(e) => setAddress({ ...address, [field]: e.target.value })}
                readOnly={!editAddress}
                variant={editAddress ? 'outline' : 'filled'}
                borderColor={editAddress ? 'teal' : 'white'}
                style={{ pointerEvents: editAddress ? 'auto' : 'none' }}
              />
            </Box>
          ))}
          <Button onClick={editAddress ? handleSaveAddress : () => setEditAddress(true)} mt={4} colorScheme="blue">
            {editAddress ? 'Save' : 'Edit'}
          </Button>
        </FormControl>
      </CardBody>
    </Card>
  );
};

export default Shipping;
