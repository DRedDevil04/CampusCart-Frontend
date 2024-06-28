// components/Dashboard.jsx

import React from 'react';
import Header from '../components/header';
import Sidebar from '../components/sidebar';
import Stats from '../components/stats';
import ProductsTable from '../components/products_table';

const Dashboard = ({ onOpen, isOpen, onClose, btnRef }) => (
  <>
    <Header onOpen={onOpen} />
    <Sidebar isOpen={isOpen} onClose={onClose} btnRef={btnRef} />
    <Stats />
    <ProductsTable />
  </>
);

export default Dashboard;
