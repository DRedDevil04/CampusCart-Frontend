import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { Home } from './pages/Home';
import PrivateRoute from './components/PrivateRoute';
import ProtectedRoute from './components/ProtectedRoute';
import { ProfilePage } from './pages/ProfilePage';
import Dashboard from "./pages/Dashboard"
import UserPage from './pages/UserPage';
import { useDisclosure } from '@chakra-ui/react';
import OrdersPage from './pages/OrdersPage';

function App() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/orders" element={<OrdersPage />} />
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
