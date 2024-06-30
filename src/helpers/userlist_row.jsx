import {
    Tr,
    Td,
    Text,
    Avatar,
    HStack,
    useColorModeValue,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverHeader,
    PopoverBody,
    PopoverFooter,
    PopoverArrow,
    PopoverCloseButton,
    Button
} from '@chakra-ui/react';

const UserListRow = ({ userId,userName, email, date, avatar, role, orders,isLast, onChangeRole, isOpen, onOpen, onClose }) => {
    const textColor = useColorModeValue("gray.500", "white");
    const userColor = useColorModeValue("gray.700", "white");
    const adminColor = useColorModeValue("red", "white");
    const borderColor = useColorModeValue("gray.200", "gray.600");
    const adminBgColor = useColorModeValue("teal.50", "teal.900");

    const handleChangeRole = (newRole) => {
        onChangeRole(userId,email,newRole);
        onClose(); // Close the popover after role change
    };
    const formattedDate =date.toLocaleString();
    return (
        <Tr
            bg={role === "admin" ? adminBgColor : "transparent"}
            borderBottom={isLast ? "none" : `1px solid ${borderColor}`}
        >
            <Td
                width={{ base: "60px", sm: "100px" }}
                pl="0px"
            >
                <HStack spacing={3}>
                    <Avatar size="sm" name={userName} src={avatar} />
                    <Text
                        fontSize={{ base: "sm", sm: "md" }}
                        color={role === "admin" ? adminColor : userColor}
                        fontWeight="bold"
                    >
                        {userName}
                    </Text>
                </HStack>
            </Td>
            <Td>
                <Text
                    fontSize={{ base: "sm", sm: "md" }}
                    color={textColor}
                    fontWeight="bold"
                >
                    {email}
                </Text>
            </Td>
            <Td>
                <Popover isOpen={isOpen} onOpen={onOpen} onClose={onClose}>
                    <PopoverTrigger>
                        <Text
                            fontSize={{ base: "sm", sm: "md" }}
                            color={role === "admin" ? adminColor : userColor}
                            fontWeight="bold"
                            cursor="pointer"
                            _hover={{ textDecoration: 'underline' }}
                        >
                            {role}
                        </Text>
                    </PopoverTrigger>
                    <PopoverContent>
                        <PopoverArrow />
                        <PopoverCloseButton />
                        <PopoverHeader>Change Role</PopoverHeader>
                        <PopoverBody>
                            Are you sure you want to change the role?
                        </PopoverBody>
                        <PopoverFooter display="flex" justifyContent="space-between">
                            <Button colorScheme="blue" onClick={() => handleChangeRole(role === 'admin' ? 'user' : 'admin')}>
                                Change to {role === 'admin' ? 'User' : 'Admin'}
                            </Button>
                        </PopoverFooter>
                    </PopoverContent>
                </Popover>
            </Td>
            <Td>
                <Text
                    fontSize={{ base: "sm", sm: "md" }}
                    color={textColor}
                    fontWeight="bold"
                >
                    {formattedDate}
                </Text>
            </Td>
            <Td textAlign="center">
                <Text
                    fontSize={{ base: "sm", sm: "md" }}
                    color={textColor}
                    fontWeight="bold"
                >
                    {orders.length}
                </Text>
            </Td>
        </Tr>
    );
};

export default UserListRow;
