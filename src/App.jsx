import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login } from './components/login';
import { Register } from './components/register';
import { Home } from './components/home';
import PrivateRoute from './components/PrivateRoute';
import ProtectedRoute from './components/ProtectedRoute';
import { ProfilePage } from './components/ProfilePage';
import Dashboard from './components/Dashboard';
import UserPage from './components/UserPage';
import { useSelector } from 'react-redux';
import { selectUser } from './slices/authSlice';
import { useDisclosure } from '@chakra-ui/react';

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
        <Route path="/" element={<PrivateRoute />}>
          <Route path="/profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
