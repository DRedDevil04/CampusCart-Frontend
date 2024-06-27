import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login } from './components/login';
import { Register } from './components/register';
import { Home } from './components/home';
import PrivateRoute from './components/PrivateRoute';
import { ProfilePage } from './components/ProfilePage';
import Header from './components/header';
import Sidebar from './components/sidebar';
import Stats from './components/stats';
import ProductsTable from './components/products_table';
import UserList from './components/userlist';
import { useSelector } from 'react-redux';
import { selectUser } from './slices/authSlice';
import { useDisclosure } from '@chakra-ui/react';

const Dashboard=({onOpen,isOpen,onClose,btnRef})=>{
  <>
   <Header onOpen={onOpen} />
    <Sidebar isOpen={isOpen} onClose={onClose} btnRef={btnRef} />
    <Stats />
    <ProductsTable />
  </>
}

const UserPage=({onOpen,isOpen,onClose,btnRef})=>{
  <>
    <Header onOpen={onOpen} />
    <Sidebar isOpen={isOpen} onClose={onClose} btnRef={btnRef} />
    <UserList />
  </>
}

const ProtectedRoute=({children}) =>{
  const user=useSelector(selectUser);
  return user?.role === 'admin' ?children: navigate('/home');
}
function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const userInfo = useSelector(selectUser);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />

        {/* Private Routes Here */}
        <Route 
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard onOpen={onOpen} isOpen={isOpen} onClose={onClose} btnRef={btnRef} /> 
              </ProtectedRoute>
            }
        />
        <Route
            path="/dashboard/userpage"
            element={
              <ProtectedRoute>
                <UserPage onOpen={onOpen} isOpen={isOpen} onClose={onClose} btnRef={btnRef} />
              </ProtectedRoute>
            }
          />    
        <Route path="/" element={<PrivateRoute />} >
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
