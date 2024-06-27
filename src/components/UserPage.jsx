// components/UserPage.jsx

import React from 'react';
import Header from './header';
import Sidebar from './sidebar';
import UserList from './userlist';

const UserPage = ({ onOpen, isOpen, onClose, btnRef }) => (
  <>
    <Header onOpen={onOpen} />
    <Sidebar isOpen={isOpen} onClose={onClose} btnRef={btnRef} />
    <UserList />
  </>
);

export default UserPage;
