// components/UserPage.jsx

import React from 'react';
import styled from 'styled-components';
import Header from '../components/header';
import Sidebar from '../components/sidebar';
import UserList from '../components/userlist';

const UserPage = ({ onOpen, isOpen, onClose, btnRef }) => (
  <>
    <HeaderWrapper>
      <Header onOpen={onOpen} />
    </HeaderWrapper>
    <Sidebar isOpen={isOpen} onClose={onClose} btnRef={btnRef} />
    <UserList />
  </>
);

const HeaderWrapper = styled.div`
  position: sticky;
  top: 0;
  z-index: 1000; /* Adjust z-index as needed */
  background-color: white; /* Optional: Add background color if needed */
`;

export default UserPage;
