import React from 'react';
import styled from 'styled-components';
import Header from '../components/header';
import Sidebar from '../components/sidebar';
import AddItem from '../components/AddItem';

const AddItemPage = ({ onOpen, isOpen, onClose, btnRef }) => (
  <>
    <HeaderWrapper>
      <Header onOpen={onOpen} />
    </HeaderWrapper>
    <Sidebar isOpen={isOpen} onClose={onClose} btnRef={btnRef} />
    <AddItem />
  </>
);

const HeaderWrapper = styled.div`
  position: sticky;
  top: 0;
  z-index: 1000; /* Adjust z-index as needed */
  background-color: white;
`;

export default AddItemPage;
