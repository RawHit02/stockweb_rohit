import axios from 'axios';

// Get the base URL from environment variables
const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL || 'https://stock-backend-rohit.onrender.com';

// Create an instance of axios
const axiosInstance = axios.create({
  baseURL: `${BASE_URL}/api/v1`,
  withCredentials: true, // Ensure cookies are sent with requests
});

// Request interceptor to add auth token
axiosInstance.interceptors.request.use(
  (config) => {
    // Attempt to get token from localStorage first, then cookies if needed (client-side)
    let token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
    
    if (!token && typeof document !== 'undefined') {
      const match = document.cookie.match(new RegExp('(^| )authToken=([^;]+)'));
      if (match) token = match[2];
    }

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    config.headers['accept'] = '*/*';
    
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
      console.error('Auth error - Unauthorized access:', error.response.data.message);
      // Optional: Clear tokens and redirect to login if session is expired
      if (typeof window !== 'undefined') {
        localStorage.removeItem('authToken');
        document.cookie = "authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";
        // window.location.href = '/'; 
      }
    } else {
      console.error('API error:', error.response?.data?.message || error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;

