// axiosClient.js
import axios from 'axios';

const axiosClient = axios.create({
  baseURL: 'http://localhost:8000',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to attach token and redirect if not present
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');

    if (!token) {
      window.location.href = '/login';
      // Returning a promise that never resolves to prevent the request
      return new Promise(() => {}); 
    }

    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosClient;
