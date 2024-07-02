import React, { useState } from 'react';
import {
    Card,
    CardHeader,
    CardBody,
    Text,
    Input,
    Button,
    Spinner,
    useToast,
} from '@chakra-ui/react';
import { useAddCategoryMutation } from '../slices/categoryApiSlice';

const AddCategory = () => {
    const [categoryName, setCategoryName] = useState('');
    const [categoryDescription, setCategoryDescription] = useState('');
    const [icon, setIcon] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();

    const [addCategory] = useAddCategoryMutation();

    const handleAddCategory = async () => {
        if (!categoryName || !categoryDescription) {
            toast({
                title: 'Missing Fields',
                description: 'Please fill in all required fields.',
                status: 'warning',
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        setIsLoading(true);
        try {
            const newCategory = {
                name: categoryName,
                description: categoryDescription,
                icon: icon || null,
            };

            await addCategory({ item: newCategory }).unwrap();
            toast({
                title: 'Category added.',
                description: 'New category has been successfully added.',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
            clearForm();
        } catch (error) {
            console.error('Error adding category:', error);
            toast({
                title: 'Error',
                description: 'Failed to add category. Please try again later.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setIsLoading(false);
        }
    };

    const clearForm = () => {
        setCategoryName('');
        setCategoryDescription('');
        setIcon('');
    };

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <Card pl={{ base: '0rem', md: '3rem' }} pb="0px">
            <CardHeader p="6px 0px 10px 0px">
                <Text
                    fontSize={{ base: '25px', md: '30px' }}
                    textAlign={{ base: 'center', md: 'left' }}
                    fontWeight="bold"
                >
                    Add New Category
                </Text>
            </CardHeader>
            <CardBody>
                <Text mb="0.5rem">Category Name:</Text>
                <Input
                    mb="1rem"
                    value={categoryName}
                    onChange={(e) => setCategoryName(e.target.value)}
                    name="categoryName"
                    required
                />

                <Text mb="0.5rem">Category Description:</Text>
                <Input
                    mb="1rem"
                    value={categoryDescription}
                    onChange={(e) => setCategoryDescription(e.target.value)}
                    name="categoryDescription"
                    required
                />

                <Text mb="0.5rem">Icon:</Text>
                <Input
                    mb="1rem"
                    value={icon}
                    onChange={(e) => setIcon(e.target.value)}
                    name="icon"
                />

                <div>
                    <Button
                        mb="1rem"
                        colorScheme="blue"
                        type="submit"
                        onClick={handleAddCategory}
                        isLoading={isLoading}
                        loadingText="Adding..."
                        width="150px"
                    >
                        Submit
                    </Button>
                </div>
            </CardBody>
        </Card>
    );
};

export default AddCategory;
