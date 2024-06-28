import {
    CardHeader,
    Card,
    CardBody,
    Table,
    Tbody,
    Text,
    Th,
    Thead,
    Tr,
    useColorModeValue,
    useToast,
    Input,
    InputGroup,
    InputLeftElement
} from '@chakra-ui/react';
import { useState,useEffect } from 'react';
import { SearchIcon } from '@chakra-ui/icons';
import UserListRow from '../helpers/userlist_row';
import api from '../API/api';
// const initialUserData = [
//     {
//         id: '1',
//         name: 'John Doe',
//         email: 'john.doe@example.com',
//         role: 'admin',
//         createdAt: '2023-01-15',
//         bought: 5,
//         sold: 3,
//         imageUrl: 'https://via.placeholder.com/100'
//     },
//     {
//         id: '2',
//         name: 'Jane Smith',
//         email: 'jane.smith@example.com',
//         role: 'user',
//         createdAt: '2023-02-10',
//         bought: 2,
//         sold: 7,
//         imageUrl: 'https://via.placeholder.com/100'
//     },
//     {
//         id: '3',
//         name: 'Alice Johnson',
//         email: 'alice.johnson@example.com',
//         role: 'user',
//         createdAt: '2023-03-20',
//         bought: 8,
//         sold: 4,
//         imageUrl: 'https://via.placeholder.com/100'
//     },
//     {
//         id: '5',
//         name: 'Shakira',
//         email: 'shakira@example.com',
//         role: 'admin',
//         createdAt: '2023-03-20',
//         bought: 6,
//         sold: 0,
//         imageUrl: 'https://via.placeholder.com/100'
//     },
//     {
//         id: '4',
//         name: 'Bob Brown',
//         email: 'bob.brown@example.com',
//         role: 'user',
//         createdAt: '2023-04-25',
//         bought: 1,
//         sold: 0,
//         imageUrl: 'https://via.placeholder.com/100'
//     }
// ];

const UserList = () => {
    const [tableData, setTableData] = useState([]);
    const [search, setSearch] = useState('');
    const [openPopover, setOpenPopover] = useState(null); // track by useriD which popover is open
    const toast = useToast();

    const textColor = useColorModeValue("gray.700", "white");
    const borderColor = useColorModeValue("gray.200", "gray.600");

    const filteredData = tableData.filter(user =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.role.toLowerCase().includes(search.toLowerCase())
    );

    const handleChangeRole = async (userName, newRole) => {
        try {
            // await api.put('/user/changeRole', { userName, newRole });
            // Update local state 
            setTableData(prevData =>
                prevData.map(user =>
                    user.name === userName ? { ...user, role: newRole } : user
                )
            );

            // Show success toast notification
            toast({
                title: "Role changed.",
                description: `User ${userName}'s role has been changed to ${newRole}.`,
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            // Show error toast notification
            toast({
                title: "An error occurred.",
                description: "Unable to change role.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        } finally {
            // Close the popover after role change
            setOpenPopover(null);
        }
    };

    useEffect(()=>{
        const getAllusers=async()=>{
            try{
            const res=await api.get("/user/getallusers",{withCredentials:true});
            setTableData(res.data.data);
            }
            catch(err)
            {
                console.log(`Error:${err}`);
            }
        }
        getAllusers();
    },[])
    return (
        <>
            <Card mt="1rem" pl={{ base: "0rem", md: "3rem" }} pb="0px">
                <CardHeader p="6px 0px 10px 0px">
                    <Text
                        fontSize={{ base: "25px", md: "40px" }}
                        textAlign="center"
                        color={textColor}
                        fontWeight="bold"
                    >
                        Users
                    </Text>
                </CardHeader>

                <CardBody overflowX="auto">
                    <InputGroup 
                        mb="2rem"
                        width={{ base: "80%", sm: "50%" }}>
                        <InputLeftElement
                            pointerEvents="none"
                            children={<SearchIcon color="gray.300" />}
                        />
                        <Input
                            type="text"
                            placeholder="Search by name or role"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </InputGroup>

                    <Table variant="simple" color={textColor}>
                        <Thead>
                            <Tr my="0.8rem" pl="0px" color="gray.400">
                                <Th borderColor={borderColor} color="gray.400">
                                    User Name
                                </Th>
                                <Th borderColor={borderColor} color="gray.400">
                                    email
                                </Th>
                                <Th borderColor={borderColor} color="gray.400">
                                    Role
                                </Th>
                                <Th borderColor={borderColor} color="gray.400">
                                    Date Registered
                                </Th>
                                <Th borderColor={borderColor} color="gray.400">
                                    BOUGHT | SOLD
                                </Th>
                            </Tr>
                        </Thead>

                        <Tbody>
                            {filteredData.map((user, index) => (
                                <UserListRow
                                    key={user.id}
                                    userName={user.name}
                                    email={user.email}
                                    date={new Date(user.__created)}
                                    avatar={user.imageUrl}
                                    role={user.role}
                                    sold={user.sold}
                                    bought={user.bought}
                                    isLast={index === filteredData.length - 1}
                                    onChangeRole={handleChangeRole}
                                    isOpen={openPopover === user.id}
                                    onOpen={() => setOpenPopover(user.id)}
                                    onClose={() => setOpenPopover(null)}
                                />
                            ))}
                        </Tbody>
                    </Table>
                </CardBody>
            </Card>
        </>
    );
};

export default UserList;
