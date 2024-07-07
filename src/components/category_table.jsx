import React, { useState, useEffect } from 'react';
import {
  CardHeader,
  Card,
  CardBody,
  Table,
  Tbody,
  Text,
  Th,
  Td,
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
  Spinner,
} from '@chakra-ui/react';
import { useGetAllCategoriesQuery, useUpdateCategoryMutation } from '../slices/categoryApiSlice';

const CategoriesTable = () => {
  const textColor = useColorModeValue('gray.700', 'white');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const [categoryDescription, setCategoryDescription] = useState('');
  const [categoryIcon, setCategoryIcon] = useState('');
  const [categoryId, setCategoryId] = useState(null);
  const [reloadData, setReloadData] = useState(false);

  const { data: categories = [], isLoading: isLoadingCategories, error: errorCategories, refetch: refetchCategories } = useGetAllCategoriesQuery();
  const [updateCategoryMutation] = useUpdateCategoryMutation();

  useEffect(() => {
    if (reloadData) {
      refetchCategories();
      setReloadData(false); 
    }
  }, [reloadData, refetchCategories]);

  const handleEditClick = (id) => {
    const selectedCategory = categories.find((category) => category._id === id);
    setCategoryName(selectedCategory.name);
    setCategoryDescription(selectedCategory.description || '');
    setCategoryIcon(selectedCategory.icon || '');
    setCategoryId(selectedCategory._id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setCategoryName('');
    setCategoryDescription('');
    setCategoryIcon('');
    setCategoryId(null);
    setIsModalOpen(false);
  };

  
  const handleSaveChanges = async () => {
    try {
      const updatedCategory = {
        name: categoryName,
        description: categoryDescription,
        icon: categoryIcon,
      };
    
      const { data: updated } = await updateCategoryMutation({ id: categoryId, updatedCategory: updatedCategory });
    
      if (updated) {
        setReloadData(true);
        handleCloseModal();
      } else {
        console.error('Failed to update category');
      }
    } catch (err) {
      console.error('Error updating category:', err);
    }
  };
  
  

  if (isLoadingCategories) {
    return <Spinner />;
  }

  if (errorCategories) {
    return <div>Error fetching categories</div>;
  }

  return (
    <Card mt="3rem" pl={{ base: '0rem', md: '3rem' }} pb="0px">
      <CardHeader p="6px 0px 10px 0px">
        <Text
          fontSize={{ base: '25px', md: '30px' }}
          textAlign={{ base: 'center', md: 'left' }}
          color={textColor}
          fontWeight="bold"
        >
          Categories
        </Text>
      </CardHeader>
      <CardBody overflowX="auto">
        <Table variant="simple" color={textColor}>
          <Thead>
            <Tr my="0.8rem" pl="0px" color="gray.400">
              <Th borderColor={borderColor} color="gray.400">
                Category Name
              </Th>
              <Th borderColor={borderColor} color="gray.400">
                Category Description
              </Th>
              <Th borderColor={borderColor} color="gray.400">
                Icon
              </Th>
              <Th borderColor={borderColor} color="gray.400">
                Action
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {categories.map((category) => (
              <Tr key={category._id}>
                <Td>{category.name}</Td>
                <Td>{category.description}</Td>
                <Td>{category.icon ? <img src={category.icon} alt="Category Icon" style={{ width: '24px', height: '24px', borderRadius: '50%' }} /> : 'No Icon'}</Td>
                <Td>
                  <Button colorScheme="teal" onClick={() => handleEditClick(category._id)}>
                    Edit
                  </Button>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </CardBody>
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Edit Category</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text mb="0.5rem">Category Name:</Text>
              <Input
                mb="1rem"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
                name="categoryName"
              />

              <Text mb="0.5rem">Description:</Text>
              <Input
                mb="1rem"
                value={categoryDescription}
                onChange={(e) => setCategoryDescription(e.target.value)}
                name="categoryDescription"
              />

              <Text mb="0.5rem">Icon URL:</Text>
              <Input
                mb="1rem"
                value={categoryIcon}
                onChange={(e) => setCategoryIcon(e.target.value)}
                name="categoryIcon"
              />
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="teal" mr={3} onClick={handleCloseModal}>
                Close
              </Button>
              <Button variant="ghost" onClick={handleSaveChanges}>
                Save changes
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </Card>
  );
};

export default CategoriesTable;
