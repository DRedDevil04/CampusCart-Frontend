import React from 'react';
import {
  Box,
  Button,
  Card,
  CardBody,
  Center,
  HStack,
  Link,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout, selectUser } from '../slices/authSlice';
import { useLogoutMutation } from '../slices/userApiSlice';

export function Home() {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logoutApiCall] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logoutApiCall().unwrap(); 
      dispatch(logout());
      navigate('/login'); 
    } catch (error) {
      dispatch(logout());
    }
  };

  return (
    <>
      {user ? (
        <Box minH='100vh' bg='gray.50' py='12' display='flex' justifyContent='center'>
          <Center>
            <Stack spacing='4'>
              <div>Welcome {user.name}</div>
              <Card variant='outline' borderColor='#d0d7de'>
                <CardBody>
                  <Center>
                    <HStack fontSize='sm' spacing='1'>
                      <Button colorScheme='red' onClick={handleLogout}>
                        Logout
                      </Button>
                    </HStack>
                  </Center>
                </CardBody>
              </Card>
            </Stack>
          </Center>
        </Box>
      ) : (
        <Box minH='100vh' bg='gray.50' py='12' display='flex' justifyContent='center'>
          <Center>
            <Stack spacing='4'>
              <Card variant='outline' borderColor='#d0d7de'>
                <CardBody>
                  <Center>
                    <HStack fontSize='sm' spacing='1'>
                      <Text>New to CampusCart?</Text>
                      <Link color='#0969da' href='/register'>
                        Create an account.
                      </Link>
                    </HStack>
                  </Center>
                </CardBody>
                <CardBody>
                  <Center>
                    <HStack fontSize='sm' spacing='1'>
                      <Text>Already a Member?</Text>
                      <Link color='#0969da' href='/login'>
                        Login
                      </Link>
                    </HStack>
                  </Center>
                </CardBody>
              </Card>
            </Stack>
          </Center>
        </Box>
      )}
    </>
  );
}
