// components/UserPage.jsx

import React from 'react';
import Header from '../components/header';
import Sidebar from '../components/sidebar';
import UserList from '../components/userlist';

const UserPage = ({ onOpen, isOpen, onClose, btnRef }) => (
  <>
    <Header onOpen={onOpen} />
    <Sidebar isOpen={isOpen} onClose={onClose} btnRef={btnRef} />
    <UserList />
  </>
);

export default UserPage;
