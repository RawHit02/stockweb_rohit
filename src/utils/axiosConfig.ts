import axios from 'axios';

// Create an instance of axios
const axiosInstance = axios.create({
  baseURL: process.env.API_BASE_URL,
  withCredentials: true, // Ensure cookies are sent with requests
});

// Request interceptor to add auth token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Handle unauthorized errors
      console.error('Auth error:', error.response.data.message);
      // Optionally, redirect to login page
    } else {
      console.error('API error:', error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
