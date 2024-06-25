import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardBody,
  Center,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  HStack,
  Input,
  Stack,
  Text,
  VStack,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../slices/userApiSlice';
import { setCredentials } from '../slices/authSlice';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading, isError, error: loginError }] = useLoginMutation();
  const userInfo = useSelector((state) => state.auth.userInfo);

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [userInfo, navigate]);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (error) setError('');
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      setError('Both fields are required');
      return;
    }

    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res.data }));
      navigate('/');

      setEmail('');
      setPassword('');
      setError('');
    } catch (error) {
      if (error.data) {
        const { error: backendError, message } = error.data;
        setError(backendError || message || 'Something went wrong.');
      } else if (error.request) {
        setError('Failed to login. Please try again later.');
      } else {
        setError(`Error: ${error.message}`);
      }
    }
  };

  return (
    <Box minH='100vh' bg='gray.50' py='12' display='flex' justifyContent='center'>
      <Center>
        <Stack spacing='4'>
          <VStack as='header' spacing='6' mt='8'>
            <Heading as='h1' fontWeight='300' fontSize='24px' letterSpacing='-0.5px'>
              Sign in to CampusCart
            </Heading>
          </VStack>
          <Card variant='outline' borderColor='#d8dee4' w={{ base: '90%', md: '308px' }}>
            <CardBody>
              <form onSubmit={handleSubmit}>
                <Stack spacing='4'>
                  {error && (
                    <Alert status='error'>
                      <AlertIcon />
                      {error}
                    </Alert>
                  )}
                  <FormControl id='email'>
                    <FormLabel>Email address</FormLabel>
                    <Input type='email' value={email} onChange={handleEmailChange} />
                    <FormHelperText>We'll never share your email.</FormHelperText>
                  </FormControl>
                  <FormControl id='password'>
                    <HStack justify='space-between'>
                      <FormLabel>Password</FormLabel>
                    </HStack>
                    <Input
                      type='password'
                      value={password}
                      onChange={handlePasswordChange}
                      bg='white'
                      borderColor='#d8dee4'
                      size='sm'
                      borderRadius='6px'
                    />
                  </FormControl>
                  <Button
                    type='submit'
                    bg='#2da44e'
                    color='white'
                    size='sm'
                    _hover={{ bg: '#2c974b' }}
                    _active={{ bg: '#298e46' }}
                    isLoading={isLoading}
                  >
                    Sign in
                  </Button>
                </Stack>
              </form>
            </CardBody>
          </Card>
          <Card variant='outline' borderColor='#d0d7de'>
            <CardBody>
              <Center>
                <HStack fontSize='sm' spacing='1'>
                  <Text>New to CampusCart?</Text>
                  <Link color='#0969da' to='/register'>
                    Create an account.
                  </Link>
                </HStack>
              </Center>
            </CardBody>
          </Card>
        </Stack>
      </Center>
    </Box>
  );
}
