import axios from 'axios';

// Create Axios instance with base URL
const api = axios.create({
    baseURL: 'https://campuscart-backend.onrender.com/',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
