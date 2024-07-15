import axios from 'axios';
import store from '../app/store';
import { logout } from '../slices/authSlice';
import { createStandaloneToast } from '@chakra-ui/react';

const { toast } = createStandaloneToast();

const api = axios.create({
    baseURL: 'https://campuscart-backend.onrender.com/',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

api.interceptors.response.use((response) => {
    return response;
}, (error) => {
    if (error.response) {
        if (error.response.status === 401) {
            store.dispatch(logout());
            toast({
                title: "Session Timeout",
                description: "Your session has expired. Please log in again.",
                status: "error",
                duration: 4000,
                isClosable: true,
            });
        } else if (error.response.status === 403) {
            toast({
                title: "Access Denied",
                description: "You do not have permission to access this resource.",
                status: "error",
                duration: 4000,
                isClosable: true,
            });
        }
    }
    return Promise.reject(error);
});

export default api;
