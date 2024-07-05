// components/ProtectedRoute.jsx

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectUser } from '../slices/authSlice';

const ProtectedRoute = ({ children }) => {
  const user = useSelector(selectUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/');
    } else if (user.role !== 'admin') {
     navigate('/');
    }
  }, [user, navigate]);

  return user?.role === 'admin' ? children : null;
};

export default ProtectedRoute;
