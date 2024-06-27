import axios from 'axios';

// Create Axios instance with base URL
const api = axios.create({
    baseURL: 'http://localhost:5000',
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
