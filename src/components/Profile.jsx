import React, { useState, useEffect } from 'react';
import {
    Box,
    Flex,
    Text,
    Avatar,
    Heading,
    Input,
    Button,
    Divider,
    Stack,
    Image,
    Spinner,
    Alert,
    AlertIcon,
    VStack,
    Badge
} from '@chakra-ui/react';
import { useGetProfileQuery, useUpdateProfileMutation } from '../slices/userApiSlice';

const getStatusColor = (status) => {
    switch (status) {
        case 'Paid':
            return 'green.200';
        case 'Refunded':
            return 'blue.200';
        case 'Cancelled':
            return 'red.200';
        default:
            return 'gray.200';
    }
};

function Profile() {
    const { data: userResponse, error, isLoading, refetch } = useGetProfileQuery();
    const [updateProfile, { isLoading: isUpdating, error: updateError }] = useUpdateProfileMutation();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [enrollment_number, setEnrollment_Number] = useState('');
    const [profilePicture, setProfilePic] = useState('');
    const [address, setAddress] = useState({
        room: '',
        floor: '',
        hostel: '',
        contact_number: '',
    });

    const [nameEdit, setNameEdit] = useState(false);
    const [emailEdit, setEmailEdit] = useState(false);
    const [enrollment_numberedit, setEnrollment_NumberEdit] = useState(false);
    const [addressEdit, setAddressEdit] = useState(false);
    const [emailExistsError, setEmailExistsError] = useState(false);

    useEffect(() => {
        if (userResponse) {
            const user = userResponse.data;
            setName(user.name);
            setEmail(user.email);
            setEnrollment_Number(user.enrollment_number);
            setProfilePic(user.profilePicture);
            setAddress(user.address);
        }
    }, [userResponse]);

    const handleProfileUpdate = async (fieldToUpdate) => {
        try {
            const updatedData = {};

            switch (fieldToUpdate) {
                case 'name':
                    updatedData.name = name;
                    break;
                case 'email':
                    updatedData.email = email;
                    break;
                case 'address':
                    updatedData.address = address;
                    break;
                case 'enrollment_number':
                    updatedData.enrollment_number = enrollment_number;
                    break;
                default:
                    break;
            }

            await updateProfile(updatedData).unwrap();

            refetch();

            switch (fieldToUpdate) {
                case 'name':
                    setNameEdit(false);
                    break;
                case 'email':
                    setEmailEdit(false);
                    break;
                case 'enrollment_number':
                    setEnrollment_NumberEdit(false);
                    break;
                case 'address':
                    setAddressEdit(false);
                    break;
                default:
                    break;
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            if (error.message && error.message.toLowerCase().includes('email already exists')) {
                setEmailExistsError(true);
            }
        }
    };

    if (isLoading || isUpdating) {
        return (
            <Flex justify="center" align="center" height="100vh">
                <Spinner size="xl" />
            </Flex>
        );
    }

    if (error) {
        return (
            <Alert status="error">
                <AlertIcon />
                Error loading profile: {error.message}
            </Alert>
        );
    }

    if (!userResponse || !userResponse.data) {
        return (
            <Alert status="warning">
                <AlertIcon />
                User details not found
            </Alert>
        );
    }

    return (
        <Box p={4} maxW="800px" mx="auto">
            <Heading mb={6}>My Profile</Heading>

            {updateError && !emailExistsError && (
                <Alert status="error" mt={4}>
                    <AlertIcon />
                    Error updating profile: {updateError.message} Possibly Email Already Exists with us.
                </Alert>
            )}
            <Box p={6} mb={6} bg="white" borderRadius="md" boxShadow="md">
                <Text fontSize="xl" mb={4}>Profile Picture</Text>
                <Avatar size="xl" src={profilePicture || 'https://react.semantic-ui.com/images/avatar/large/matthew.png'} />
            </Box>
            <Box p={6} mb={6} bg="white" borderRadius="md" boxShadow="md">
                <Text fontSize="xl" mb={4}>Name</Text>
                <Flex align="center">
                    <Input value={name} onChange={(e) => setName(e.target.value)} readOnly={!nameEdit} mr={2} />
                    {!nameEdit ? (
                        <Button onClick={() => setNameEdit(true)} colorScheme="blue">
                            Edit
                        </Button>
                    ) : (
                        <Button onClick={() => handleProfileUpdate('name')} isLoading={isUpdating} loadingText="Saving..." colorScheme="green">
                            Save
                        </Button>
                    )}
                </Flex>
            </Box>
            <Box p={6} mb={6} bg="white" borderRadius="md" boxShadow="md">
                <Text fontSize="xl" mb={4}>Email</Text>
                <Flex align="center">
                    <Input value={email} onChange={(e) => setEmail(e.target.value)} readOnly={!emailEdit} mr={2} />
                    {!emailEdit ? (
                        <Button onClick={() => setEmailEdit(true)} colorScheme="blue">
                            Edit
                        </Button>
                    ) : (
                        <Button onClick={() => handleProfileUpdate('email')} isLoading={isUpdating} loadingText="Saving..." colorScheme="green">
                            Save
                        </Button>
                    )}
                </Flex>
                {emailExistsError && (
                    <Alert status="error" mt={2}>
                        <AlertIcon />
                        Email already exists. Please choose a different email.
                    </Alert>
                )}
            </Box>
            <Box p={6} mb={6} bg="white" borderRadius="md" boxShadow="md">
                <Text fontSize="xl" mb={4}>Enrollment Number</Text>
                <Flex align="center">
                    <Input value={enrollment_number} onChange={(e) => setEnrollment_Number(e.target.value)} readOnly={!enrollment_numberedit} mr={2} />
                    {!enrollment_numberedit ? (
                        <Button onClick={() => setEnrollment_NumberEdit(true)} colorScheme="blue">
                            Edit
                        </Button>
                    ) : (
                        <Button onClick={() => handleProfileUpdate('enrollment_number')} isLoading={isUpdating} loadingText="Saving..." colorScheme="green">
                            Save
                        </Button>
                    )}
                </Flex>
            </Box>
            <Box p={6} mb={6} bg="white" borderRadius="md" boxShadow="md">
                <Text fontSize="xl" mb={4}>Address</Text>
                <Stack spacing={4}>
                    {['room', 'floor', 'hostel', 'contact_number'].map((field) => (
                        <Flex align="center" key={field}>
                            <Input
                                placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                                value={address[field]}
                                onChange={(e) => setAddress({ ...address, [field]: e.target.value })}
                                readOnly={!addressEdit}
                                mr={2}
                            />
                        </Flex>
                    ))}
                    {!addressEdit ? (
                        <Button onClick={() => setAddressEdit(true)} colorScheme="blue">
                            Edit
                        </Button>
                    ) : (
                        <Button onClick={() => handleProfileUpdate('address')} isLoading={isUpdating} loadingText="Saving..." colorScheme="green">
                            Save
                        </Button>
                    )}
                </Stack>
            </Box>

            <Heading size="lg" mb={6}>Order History</Heading>
            <Stack spacing={6}>
                {userResponse.data.orders.length === 0 ? <Text mb={2}>No Order Found!</Text> : null}
                {userResponse.data.orders &&
                    userResponse.data.orders.map((order, index) => (
                        <Box key={index} p={6} bg="white" borderRadius="md" boxShadow="md">
                            <Text mb={2}><strong>Order Amount:</strong> {order.payment.amount} {order.payment.currency}</Text>
                            <Text mb={2}><strong>Order Placed:</strong> {new Date(order.__created).toLocaleDateString()}</Text>
                            <Text mb={2}><strong>Ship To:</strong> Room No. - {order.shipping.address.room} <br />
                                {order.shipping.address.floor} floor, {order.shipping.address.hostel}, {order.shipping.address.contact_number}</Text>
                            <Text mb={2}><strong>Mode of Payment:</strong> {order.payment.payment_method}</Text>
                            <Box p={2} borderRadius="md" bg={getStatusColor(order.payment.status)} textAlign="center" mb={4}>
                                <strong>Payment Status:</strong> {order.payment.status}
                            </Box>
                            {(order.payment.status === 'Paid' || order.payment.status === 'Refunded') && (
                                <Box p={2} borderRadius="md" bg={getStatusColor(order.order_status)} textAlign="center" mb={4}>
                                    <strong>Order Status:</strong> {order.order_status}
                                </Box>
                            )}
                            <Divider mb={4} />
                            <Flex flexWrap="wrap" gap={4}>
                                {order.items &&
                                    order.items.map((item, i) => (
                                        <VStack key={i} align="flex-start">                                            
                                            <Image src={item.item.images.length > 0 ? item.item.images[0].url : 'https://placehold.co/400'} alt={item.item.name} boxSize="80px" objectFit="cover" />
                                            <Text>{item.name}</Text>
                                            <Text fontSize="sm">
                                                Quantity: {item.quantity}
                                                <br />
                                                Price: {item.price} {order.payment.currency}
                                            </Text>
                                        </VStack>
                                    ))}
                            </Flex>
                        </Box>
                    ))}
            </Stack>
        </Box>
    );
}

export default Profile;

