import React, { useState } from 'react';
import {
    Card,
    CardHeader,
    CardBody,
    Text,
    Input,
    Select,
    Button,
    Spinner,
    useToast,
} from '@chakra-ui/react';
import { useAddItemMutation } from '../slices/productsApiSlice';
import { useGetAllCategoriesQuery } from '../slices/categoryApiSlice';

const AddItem = () => {
    const [itemName, setItemName] = useState('');
    const [itemDescription, setItemDescription] = useState('');
    const [categoryId, setCategoryId] = useState('');
    const [priceCurrency, setPriceCurrency] = useState('INR');
    const [priceAmount, setPriceAmount] = useState('');
    const [images, setImages] = useState([{ url: '', altText: '' }]);
    const [discountPercentage, setDiscountPercentage] = useState('');
    const [discountStartDate, setDiscountStartDate] = useState(null); 
    const [discountEndDate, setDiscountEndDate] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();

    const { data: categories, isLoading: isLoadingCategories, error: errorCategories } = useGetAllCategoriesQuery();
    const [addItem] = useAddItemMutation();

    const handleAddItem = async () => {
        if (!itemName || !itemDescription || !categoryId || !priceAmount) {
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
            const newItem = {
                name: itemName,
                description: itemDescription,
                categoryID: categoryId,
                price: {
                    currency: priceCurrency,
                    amount: parseFloat(priceAmount),
                    discount: {
                        percentage: discountPercentage !== '' ? parseFloat(discountPercentage) : null,
                        start: discountStartDate,
                        end: discountEndDate,
                    },
                },
                images: images.filter(image => image.url !== ''),
                available: true,
            };

            await addItem({ item: newItem }).unwrap();
            toast({
                title: 'Item added.',
                description: 'New item has been successfully added.',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
            clearForm();
        } catch (error) {
            console.error('Error adding item:', error);
            toast({
                title: 'Error',
                description: 'Failed to add item. Please try again later.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setIsLoading(false);
        }
    };

    const clearForm = () => {
        setItemName('');
        setItemDescription('');
        setCategoryId('');
        setPriceCurrency('INR');
        setPriceAmount('');
        setImages([{ url: '', altText: '' }]);
        setDiscountPercentage('');
        setDiscountStartDate('');
        setDiscountEndDate('');
    };

    const handleAddImage = () => {
        setImages([...images, { url: '', altText: '' }]);
    };

    const handleRemoveImage = (indexToRemove) => {
        setImages(images.filter((_, index) => index !== indexToRemove));
    };

    if (isLoadingCategories) {
        return <Spinner />;
    }

    if (errorCategories) {
        return <div>Error fetching categories</div>;
    }

    return (
        <Card pl={{ base: '0rem', md: '3rem' }} pb="0px">
            <CardHeader p="6px 0px 10px 0px">
                <Text
                    fontSize={{ base: '25px', md: '30px' }}
                    textAlign={{ base: 'center', md: 'left' }}
                    fontWeight="bold"
                >
                    Add New Item
                </Text>
            </CardHeader>
            <CardBody>
                <Text mb="0.5rem">Item Name:</Text>
                <Input
                    mb="1rem"
                    value={itemName}
                    onChange={(e) => setItemName(e.target.value)}
                    name="itemName"
                    required
                />

                <Text mb="0.5rem">Description:</Text>
                <Input
                    mb="1rem"
                    value={itemDescription}
                    onChange={(e) => setItemDescription(e.target.value)}
                    name="itemDescription"
                    required
                />

                <Text mb="0.5rem">Category:</Text>
                <Select
                    mb="1rem"
                    value={categoryId}
                    onChange={(e) => setCategoryId(e.target.value)}
                    name="category"
                    required
                >
                    <option value="">Select category</option>
                    {categories.map((category) => (
                        <option key={category._id} value={category._id}>
                            {category.name}
                        </option>
                    ))}
                </Select>

                <Text mb="0.5rem">Price Currency:</Text>
                <Input
                    mb="1rem"
                    value={priceCurrency}
                    onChange={(e) => setPriceCurrency(e.target.value)}
                    name="priceCurrency"
                />

                <Text mb="0.5rem">Price Amount:</Text>
                <Input
                    mb="1rem"
                    type="number"
                    value={priceAmount}
                    onChange={(e) => setPriceAmount(e.target.value)}
                    name="priceAmount"
                    required
                />

                <Text mb="0.5rem">Discount Percentage:</Text>
                <Input
                    mb="1rem"
                    type="number"
                    value={discountPercentage}
                    onChange={(e) => setDiscountPercentage(e.target.value)}
                    name="discountPercentage"
                />

                <Text mb="0.5rem">Discount Start Date:</Text>
                <Input
                    mb="1rem"
                    type="date"
                    value={discountStartDate ? discountStartDate : ''}
                    onChange={(e) => setDiscountStartDate(e.target.value)}
                    name="discountStartDate"
                />

                <Text mb="0.5rem">Discount End Date:</Text>
                <Input
                    mb="1rem"
                    type="date"
                    value={discountEndDate ? discountEndDate : ''}
                    onChange={(e) => setDiscountEndDate(e.target.value)}
                    name="discountEndDate"
                />

                <Text mb="0.5rem">Images:</Text>
                {images.map((image, index) => (
                    <div key={index} style={{ marginBottom: '1rem' }}>
                        <Text mb="0.5rem">Image URL:</Text>
                        <Input
                            mb="0.5rem"
                            value={image.url}
                            onChange={(e) =>
                                setImages((prev) =>
                                    prev.map((img, idx) =>
                                        idx === index ? { ...img, url: e.target.value } : img
                                    )
                                )
                            }
                            name={`imageUrl${index}`}
                        />
                        <Text mb="0.5rem">Alt Text:</Text>
                        <Input
                            mb="1rem"
                            value={image.altText}
                            onChange={(e) =>
                                setImages((prev) =>
                                    prev.map((img, idx) =>
                                        idx === index ? { ...img, altText: e.target.value } : img
                                    )
                                )
                            }
                            name={`imageAltText${index}`}
                        />
                        {index > 0 && (
                            <Button ml="1rem" colorScheme="red" onClick={() => handleRemoveImage(index)}>
                                Remove Image
                            </Button>
                        )}
                    </div>
                ))}
                <Button mb="1rem" colorScheme="teal" onClick={handleAddImage} isLoading={isLoading}>
                    Add Image
                </Button>

                <div>
                    <Button
                        mb="1rem"
                        colorScheme="blue"
                        type="submit"
                        onClick={handleAddItem}
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

export default AddItem;
