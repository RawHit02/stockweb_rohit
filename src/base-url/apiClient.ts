import { StorageConstants } from "@/constants/StorageConstants";
import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

// Helper to get token from storage (localStorage or cookies)
const getToken = () => {
  if (typeof window === 'undefined') return "";
  
  // Try localStorage first
  let token = localStorage.getItem("authToken");
  
  // Fallback to cookies if not in localStorage
  if (!token) {
    const match = document.cookie.match(new RegExp('(^| )authToken=([^;]+)'));
    if (match) token = match[2];
  }
  
  return token || "";
};

// Get base URL from environment variable or use the default provided in your request
const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_API_URL || 'https://stock-backend-rohit-1.onrender.com';

// Create the axios instance
export const apiClient = axios.create({
  baseURL: `${BACKEND_URL.replace(/\/$/, '')}`, 
  headers: {
    'Content-Type': 'application/json',
    'accept': '*/*',
  },
});


// Add request interceptor to include token
apiClient.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add response interceptor for error handling
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const errorDetails = {
      status: error?.response?.status,
      data: error?.response?.data,
      message: error?.response?.data?.message || error.message,
    };
    console.error('API error details:', errorDetails);
    
    if (error.response?.status === 401) {
      // Optional: Redirect to login or clear token
      // localStorage.removeItem("authToken");
    }
    
    return Promise.reject(error);
  }
);

// Wrapper functions for convenience (if still needed by some parts of the code)
export const get = async (URL: string, options?: AxiosRequestConfig) => apiClient.get(URL, options);
export const post = async (URL: string, payload?: unknown, options?: AxiosRequestConfig) => apiClient.post(URL, payload, options);
export const patch = async (URL: string, payload?: unknown, options?: AxiosRequestConfig) => apiClient.patch(URL, payload, options);
export const _delete = async (URL: string, options?: AxiosRequestConfig) => apiClient.delete(URL, options);
export const put = async (URL: string, payload?: unknown, options?: AxiosRequestConfig) => apiClient.put(URL, payload, options);

