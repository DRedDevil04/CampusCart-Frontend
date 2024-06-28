import React, { useState, useEffect } from 'react';
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
  Spinner,
} from '@chakra-ui/react';
import TableRow from '../helpers/product_row';
import { useGetAllItemsQuery, useUpdateItemMutation } from '../slices/productsApiSlice';
import { useGetAllCategoriesQuery } from '../slices/categoryApiSlice';

const ProductsTable = () => {
  const textColor = useColorModeValue('gray.700', 'white');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productName, setProductName] = useState('');
  const [description, setDescription] = useState('');
  const [categoryID, setCategoryID] = useState(null);
  const [priceCurrency, setPriceCurrency] = useState('');
  const [priceAmount, setPriceAmount] = useState('');
  const [priceDiscount, setPriceDiscount] = useState({
    amount: '',
    start: '',
    end: '',
  });
  const [images, setImages] = useState([{ url: '', altText: '' }]);
  const [status, setStatus] = useState(false);
  const [productId, setProductId] = useState(null);
  const [reloadData, setReloadData] = useState(false); // State to trigger data reload

  const { data: tableData = [], isLoading: isLoadingItems, error: errorItems, refetch: refetchItems } = useGetAllItemsQuery();
  const { data: categories = [], isLoading: isLoadingCategories, error: errorCategories } = useGetAllCategoriesQuery();
  const [updateItem] = useUpdateItemMutation();

  useEffect(() => {
    // If reloadData changes, refetch items
    if (reloadData) {
      refetchItems();
      setReloadData(false); // Reset state to prevent infinite loop
    }
  }, [reloadData, refetchItems]);

  const handleEditClick = (id) => {
    const selectedItem = tableData.find((item) => item._id === id);
    setProductName(selectedItem.name);
    setDescription(selectedItem.description || '');
    setCategoryID(selectedItem.category?._id);
    setPriceCurrency(selectedItem.price?.currency || '');
    setPriceAmount(selectedItem.price?.amount || '');
    
    const { discount } = selectedItem.price || {};
    setPriceDiscount({
      amount: discount?.amount || '',
      start: discount?.start ? new Date(discount.start).toISOString().substr(0, 10) : '',
      end: discount?.end ? new Date(discount.end).toISOString().substr(0, 10) : '',
    });
  
    setImages(selectedItem.images || [{ url: '', altText: '' }]);
    setStatus(selectedItem.available);
    setProductId(selectedItem._id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setProductName('');
    setDescription('');
    setCategoryID(null);
    setPriceCurrency('');
    setPriceAmount('');
    setPriceDiscount({
      amount: '',
      start: '',
      end: '',
    });
    setImages([{ url: '', altText: '' }]);
    setStatus(false);
    setProductId(null);
    setIsModalOpen(false);
  };

  const handleSaveChanges = async () => {
    try {
      const updatedProduct = {
        _id: productId,
        name: productName,
        description: description,
        categoryID: categoryID,
        price: {
          currency: priceCurrency,
          amount: priceAmount,
          discount: {
            amount: priceDiscount.amount,
            start: priceDiscount.start,
            end: priceDiscount.end,
          },
        },
        images: images.map(image => ({
          url: image.url,
          altText: image.altText
        })),
        available: status,
      };
      await updateItem({ id: productId, updatedItem: updatedProduct }).unwrap();
      setReloadData(true); // Trigger data reload
      handleCloseModal();
    } catch (err) {
      console.error(`Error updating product: ${err}`);
    }
  };

  const handleImageChange = (index, field, value) => {
    const updatedImages = [...images];
    updatedImages[index][field] = value;
    setImages(updatedImages);
  };

  const addImageField = () => {
    setImages([...images, { url: '', altText: '' }]);
  };

  const removeImageField = (index) => {
    const updatedImages = images.filter((_, i) => i !== index);
    setImages(updatedImages);
  };

  if (isLoadingItems || isLoadingCategories) {
    return <Spinner />;
  }

  if (errorItems || errorCategories) {
    return <div>Error fetching data</div>;
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
                productId={item._id}
                productName={item.name}
                category={item.category?.name}
                date={new Date(item.createdAt)}
                status={item.available}
                isLast={index === tableData.length - 1}
                onEditClick={handleEditClick}
              />
            ))}
          </Tbody>
        </Table>
      </CardBody>
      {isModalOpen && (
        <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Edit Product</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Text mb="0.5rem">Product Name:</Text>
              <Input
                mb="1rem"
                value={productName}
                onChange={(e) => setProductName(e.target.value)}
                name="productName"
              />

              <Text mb="0.5rem">Description:</Text>
              <Input
                mb="1rem"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                name="description"
              />

              <Text mb="0.5rem">Category:</Text>
              <Select
                mb="1rem"
                value={categoryID || ''}
                onChange={(e) => setCategoryID(e.target.value)}
                name="category"
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
              />

              <Text mb="0.5rem">Price Discount Amount:</Text>
              <Input
                mb="1rem"
                type="number"
                value={priceDiscount.amount}
                onChange={(e) => setPriceDiscount(prev => ({ ...prev, amount: e.target.value }))}
                name="priceDiscountAmount"
              />

              <Text mb="0.5rem">Price Discount Start Date:</Text>
              <Input
                mb="1rem"
                type="date"
                value={priceDiscount.start}
                onChange={(e) => setPriceDiscount(prev => ({ ...prev, start: e.target.value }))}
                name="priceDiscountStart"
              />

              <Text mb="0.5rem">Price Discount End Date:</Text>
              <Input
                mb="1rem"
                type="date"
                value={priceDiscount.end}
                onChange={(e) => setPriceDiscount(prev => ({ ...prev, end: e.target.value }))}
                name="priceDiscountEnd"
              />

              <Text mb="0.5rem">Images:</Text>
              {images.map((image, index) => (
                <div key={index}>
                  <Text mb="0.5rem">Image URL:</Text>
                  <Input
                    mb="1rem"
                    value={image.url}
                    onChange={(e) => handleImageChange(index, 'url', e.target.value)}
                    name={`imageUrl${index}`}
                  />
                  <Text mb="0.5rem">Alt Text:</Text>
                  <Input
                    mb="1rem"
                    value={image.altText}
                    onChange={(e) => handleImageChange(index, 'altText', e.target.value)}
                    name={`imageAltText${index}`}
                  />
                  {images.length > 1 && (
                    <Button
                      mb="1rem"
                      colorScheme="red"
                      onClick={() => removeImageField(index)}
                    >
                      Remove Image
                    </Button>
                  )}
                </div>
              ))}
              <Button mb="1rem" colorScheme="teal" onClick={addImageField}>
                Add Image
              </Button>

              <Text mb="0.5rem">Status:</Text>
              <Select
                mb="1rem"
                value={status.toString()}
                onChange={(e) => setStatus(e.target.value === 'true')}
                name="status"
                placeholder="Select status"
              >
                <option value="true">Not Sold</option>
                <option value="false">Sold</option>
              </Select>
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

export default ProductsTable;
