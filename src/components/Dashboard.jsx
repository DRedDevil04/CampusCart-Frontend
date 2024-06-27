// components/Dashboard.jsx

import React from 'react';
import Header from './header';
import Sidebar from './sidebar';
import Stats from './stats';
import ProductsTable from './products_table';

const Dashboard = ({ onOpen, isOpen, onClose, btnRef }) => (
  <>
    <Header onOpen={onOpen} />
    <Sidebar isOpen={isOpen} onClose={onClose} btnRef={btnRef} />
    <Stats />
    <ProductsTable />
  </>
);

export default Dashboard;
