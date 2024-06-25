import React, { useState, useEffect } from 'react';
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
    Link as ChakraLink,
    Stack,
    Text,
    VStack,
    Alert,
    AlertIcon,
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useRegisterMutation } from '../slices/userApiSlice';
import { setCredentials } from '../slices/authSlice';

export function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [register, { isLoading, isError, error: apiError }] = useRegisterMutation();
    const userInfo = useSelector((state) => state.auth.userInfo);

    useEffect(() => {
        if (userInfo) {
            navigate('/');
        }
    }, [userInfo, navigate]);

    const handleNameChange = (e) => {
        setName(e.target.value);
        if (error) setError('');
    };

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
        if (error) setError('');
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        if (error) setError('');
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        if (confirmPasswordError) setConfirmPasswordError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !email || !password || !confirmPassword) {
            setError('All fields are required');
            return;
        }

        if (password !== confirmPassword) {
            setConfirmPasswordError('Passwords do not match');
            return;
        }

        try {
            const res = await register({ name, email, password }).unwrap();
            dispatch(setCredentials({ ...res.data }));
            navigate('/');
            setName('');
            setEmail('');
            setPassword('');
            setConfirmPassword('');
            setError('');
            setConfirmPasswordError('');
        } catch (error) {
            if (error.data) {
                const { error: backendError, message } = error.data;
                setError(backendError || message || 'Something went wrong.');
            } else if (error.request) {
                setError('Failed to Register. Please try again later.');
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
                            Register to CampusCart
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
                                    <FormControl id='name'>
                                        <FormLabel>Name</FormLabel>
                                        <Input type='text' value={name} onChange={handleNameChange} />
                                    </FormControl>
                                    <FormControl id='email'>
                                        <FormLabel>Email address</FormLabel>
                                        <Input type='email' value={email} onChange={handleEmailChange} />
                                        <FormHelperText>We'll never share your email.</FormHelperText>
                                    </FormControl>
                                    <FormControl id='password'>
                                            <FormLabel>Password</FormLabel>
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
                                    <FormControl id='confirmPassword'>
                                            <FormLabel>Confirm Password</FormLabel>
                                            <Input
                                                type='password'
                                                value={confirmPassword}
                                                onChange={handleConfirmPasswordChange}
                                                bg='white'
                                                borderColor='#d8dee4'
                                                size='sm'
                                                borderRadius='6px'
                                            />
                                        {confirmPasswordError && (
                                            <FormHelperText color='red.500'>{confirmPasswordError}</FormHelperText>
                                        )}
                                    </FormControl>
                                    <Button
                                        type='submit'
                                        bg='#2da44e'
                                        color='white'
                                        size='sm'
                                        isLoading={isLoading}
                                        _hover={{ bg: '#2c974b' }}
                                        _active={{ bg: '#298e46' }}
                                    >
                                        Register
                                    </Button>
                                </Stack>
                            </form>
                        </CardBody>
                    </Card>
                    <Card variant='outline' borderColor='#d0d7de'>
                        <CardBody>
                            <Center>
                                <HStack fontSize='sm' spacing='1'>
                                    <Text>Already have an account?</Text>
                                    <ChakraLink as={Link} to='/login' color='#0969da'>
                                        Sign in.
                                    </ChakraLink>
                                </HStack>
                            </Center>
                        </CardBody>
                    </Card>
                </Stack>
            </Center>
        </Box>
    );
}
