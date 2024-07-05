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


const UserList = () => {
    const [tableData, setTableData] = useState([]);
    const [search, setSearch] = useState('');
    const [openPopovers, setOpenPopovers] = useState({}); // Initialize an empty object to store popover states
    const toast = useToast();

    const textColor = useColorModeValue("gray.700", "white");
    const borderColor = useColorModeValue("gray.200", "gray.600");

    const filteredData = tableData.filter(user =>
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.role.toLowerCase().includes(search.toLowerCase())
    );

    const handleOpenPopover = (userId) => {
        setOpenPopovers((prevOpenPopovers) => {
            // Create a new object with all values set to false using Object.entries and Object.fromEntries
            const resetPopovers = Object.fromEntries(
                Object.entries(prevOpenPopovers).map(([key, value]) => [key, false])
            );
    
            // Set the specific popover to true
            return {
                ...resetPopovers,
                [userId]: true,
            };
        });
    };
      
      const handleClosePopover = (userId) => {
        setOpenPopovers((prevOpenPopovers) => ({
          ...prevOpenPopovers,
          [userId]: false,
        }));
      };

    const handleChangeRole = async (userId,email, newrole) => {
        try {
            await api.put("/user/updaterole",{email,newrole})
            setTableData(prevData =>
                prevData.map(user =>
                    user.email === email ? { ...user, role: newrole } : user
                )
            );

            // success toast notification
            toast({
                title: "Role changed.",
                description: `User's role has been changed to ${newrole}.`,
                status: "success",
                duration: 3000,
                isClosable: true,
            });
        } catch (error) {
            // Show error toast notification
            console.error('Error:', error.response ? error.response.data : error.message);  // Log the error details
            toast({
                title: "An error occurred.",
                description: "Unable to change role.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        }  finally {
                handleClosePopover(userId);
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
                                    ORDERS
                                </Th>
                            </Tr>
                        </Thead>

                        <Tbody>
                            {filteredData.map((user, index) => (
                                <UserListRow
                                    key={user._id}
                                    userId={user.id}
                                    userName={user.name}
                                    email={user.email}
                                    date={new Date(user.__created)}
                                    avatar={user.imageUrl}
                                    role={user.role}
                                    orders={user.orders}
                                    isLast={index === filteredData.length - 1}
                                    onChangeRole={handleChangeRole}
                                    isOpen={openPopovers[user._id]}
                                    onOpen={() => handleOpenPopover(user._id)}
                                    onClose={() => handleClosePopover(user._id)}
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
