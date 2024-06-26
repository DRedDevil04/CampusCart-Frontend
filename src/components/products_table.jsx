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
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    Input,
    Select,
    Spinner
} from "@chakra-ui/react";
import TableRow from "./product_row";
import { useState, useEffect } from "react";
import {
       useGetAllItemsQuery,
       useGetItemByIdQuery,
       useUpdateItemMutation
} from "../slices/productsApiSlice";
//LEFT IS CONSIDERING CATEGORY CHANGE IN UPDATE //
const ProductsTable = () => {
    //const [tableData, setTableData] = useState([]);
    const textColor = useColorModeValue("gray.700", "white");
    const borderColor = useColorModeValue("gray.200", "gray.600");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [loading, setLoading] = useState(false); 
 
    const [productName, setProductName] = useState("");
    const [categoryName, setCategoryName] = useState("");
    const [categoryID, setCategoryID] = useState(null);
    const [status, setStatus] = useState("");
    const [productId, setProductId] = useState(null);
 
    const [updateItemMutation]=useUpdateItemMutation();
    // Function to open modal and fetch selected product details
    const handleEditClick = async (id) => {
        const selectedItem=tableData.find(item=>item._id===id);
        setProductName(selectedItem.name);
        setCategoryName(selectedItem.categoryName);
        setCategoryID(selectedItem.categoryID);
        setStatus(selectedItem.available ? "true" : "false"); 
        setProductId(selectedItem._id);
        setIsModalOpen(true);
        // try {
        //     const res = await api.get(`/item/${id}`);
        //     const product = res.data;
        //     setProductName(product.name);
        //     setCategory(product.category?.name);
        //     setStatus(product.available ? "true" : "false"); 
        //     setProductId(product._id);
        // } catch (err) {
        //     console.error(`Error fetching product details: ${err}`);
        // } finally {
        //     setLoading(false);
        //     setIsModalOpen(true);
        // }
    };

    const handleCloseModal = () => {
        setProductName("");
        setCategoryID(null);
        setStatus("");
        setProductId(null);
        setIsModalOpen(false);
    };

    // Function to save changes
    const handleSaveChanges = async () => {
        try{
            const updatedProduct={
                _id: productId,
                name:productName,
                categoryID:categoryID,
                available:status==="true",
            };
            await updateItemMutation.mutateAsync(updatedProduct);
            handleCloseModal();
        } catch(err)
        {
            console.error(`Error updating product: ${err}`);
        }
        // try {
        //     const currentProduct = tableData.find(item => item._id === productId);
        //     const updatedProduct = {
        //         ...currentProduct,
        //         name: productName,
        //         category: { ...currentProduct.category, name: category }, // Update only category name
        //         available: status === "true",
        //     };
        //     const updatedData = tableData.map(item =>
        //         item._id === productId ? updatedProduct : item
        //     );
        //     setTableData(updatedData);
        //     handleCloseModal();
        // } catch (err) {
        //     console.error(`Error updating product: ${err}`);
        // }
    };

    // useEffect(() => {
    //     const fetchItems = async () => {
    //         setLoading(true);
    //         try {
    //             const res = await api.get("/item");
    //             setTableData(res.data);
    //         } catch (err) {
    //             console.error(`Error fetching items: ${err}`);
    //         } finally {
    //             setLoading(false); 
    //         }
    //     };
    //     fetchItems();
    // }, []);

    return (
        <Card mt="3rem" pl={{ base: "0rem", md: "3rem" }} pb="0px">
            <CardHeader p="6px 0px 10px 0px">
                <Text
                    fontSize={{ base: "25px", md: "30px" }}
                    textAlign={{ base: "center", md: "left" }}
                    color={textColor}
                    fontWeight="bold"
                >
                    Products
                </Text>
            </CardHeader>
            <CardBody overflowX="auto">
                <Table variant="simple" color={textColor}>
                    <Thead>
                        <Tr my="0.8rem" pl="0px" color="gray.400">
                            <Th borderColor={borderColor} color="gray.400">
                                Product Name
                            </Th>
                            <Th borderColor={borderColor} color="gray.400">
                                Category
                            </Th>
                            <Th borderColor={borderColor} color="gray.400">
                                Status
                            </Th>
                            <Th borderColor={borderColor} color="gray.400">
                                Date
                            </Th>
                            <Th borderColor={borderColor} color="gray.400">
                                Action
                            </Th>
                        </Tr>
                    </Thead>

                    <Tbody>
                        {tableData.map((item, index) => (
                            <TableRow
                                key={item._id}
                                productName={item.name}
                                category={item.category?.name}
                                date={new Date(item.createdAt)}
                                status={item.available}
                                isLast={index === tableData.length - 1}
                                onEditClick={() => handleEditClick(item._id)} // Pass the correct function here
                            />
                        ))}
                    </Tbody>
                </Table>
            </CardBody>
            {/* Modal for editing */}
            {isModalOpen && (
                <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Edit Product</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            {loading && ( // Show spinner if loading
                                <Spinner thickness="4px" speed="0.65s" emptyColor="gray.200" color="blue.500" size="xl" />
                            )}
                            {!loading && ( // Render modal content if not loading
                                <>
                                    <Text mb="0.5rem">Product Name:</Text>
                                    <Input
                                        mb="1rem"
                                        value={productName}
                                        onChange={(e) => setProductName(e.target.value)}
                                        name="productName"
                                    />

                                    <Text mb="0.5rem">Category:</Text>
                                    <Select
                                        mb="1rem"
                                        value={categoryID || ''}
                                        onChange={(e) => setCategoryID(e.target.value)}
                                        name="category"
                                    >
                                        <option value="">Select category</option>
                                        {tableData.map(item => (
                                            <option key={item._id} value={item.category?._id}>
                                                {item.category?.name}
                                            </option>
                                        ))}
                                    </Select>

                                    <Text mb="0.5rem">Status:</Text>
                                    <Select
                                        mb="1rem"
                                        value={status}
                                        onChange={(e) => setStatus(e.target.value)}
                                        name="status"
                                        placeholder="Select status"
                                    >
                                        <option value="true">Not Sold</option>
                                        <option value="false">Sold</option>
                                    </Select>
                                </>
                            )}
                        </ModalBody>

                        <ModalFooter>
                            <Button colorScheme="teal" mr={3} onClick={handleCloseModal}>
                                Close
                            </Button>
                            <Button variant="ghost" onClick={handleSaveChanges}>Save changes</Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            )}
        </Card>
    );
};

export default ProductsTable;
