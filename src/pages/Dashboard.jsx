// components/Dashboard.jsx
import React from 'react';
import styled from 'styled-components';
import Header from '../components/header';
import Sidebar from '../components/sidebar';
import Stats from '../components/stats';
import ProductsTable from '../components/products_table';
import CardView from '../components/AddItemCard';
import AddItemImage from '../assets/additem.svg';
import AddCategoryImage from '../assets/category.svg';

const Dashboard = ({ onOpen, isOpen, onClose, btnRef }) => (
  <>
    <HeaderWrapper>
      <Header onOpen={onOpen} />
    </HeaderWrapper>
    <Sidebar isOpen={isOpen} onClose={onClose} btnRef={btnRef} />
    <Stats />

    <CardRow>
      <CardView
        imageSrc={AddItemImage}
        cardText="Add New Product"
        link="/dashboard/add-item"
      />
      <CardView
        imageSrc={AddCategoryImage}
        cardText="Add New Category"
        link="/dashboard/add-category"
      />
    </CardRow>

    <ProductsTable />
  </>
);

const HeaderWrapper = styled.div`
  position: sticky;
  top: 0;
  z-index: 1000; /* Adjust z-index as needed */
  background-color: white; /* Optional: Add background color if needed */
`;

const CardRow = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
  margin: 0 1rem; /* Adjust margin as needed */
`;

export default Dashboard;
