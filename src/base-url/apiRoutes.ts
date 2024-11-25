const BASE_URL = `${process?.env?.NEXT_PUBLIC_BACKEND_API_URL}/api/v1`;

// const BASE_URL = "http://localhost:8001/api/v1";


// Login Route
export const SIGN_IN = `${BASE_URL}/identity/signIn`;

// Vendor Management
export const CREATE_VENDOR = `${BASE_URL}/vendorManagement/createVendor`;

// Edit Buyer / Seller 
export const EDIT_VENDOR = `${BASE_URL}/vendorManagement/updateVendor`; 

// delete Buyer / Seller
export const DELETE_VENDOR = `${BASE_URL}/vendorManagement/deleteVendor`;  

// Get Buyer and Sellers
export const GET_ALL_BUYERS = `${BASE_URL}/vendorManagement/getVendor/buyer`;
export const GET_ALL_SELLERS = `${BASE_URL}/vendorManagement/getVendor/supplier`;

// STOCK Management 
export const CREATE_INWARD_STOCK = `${BASE_URL}/stockManagement/createStock`;
export const CREATE_OUTWARD_STOCK = `${BASE_URL}/stockManagement/createStock`;
export const FETCH_INWARD_STOCK = `${BASE_URL}/stockManagement/getInward`;
export const FETCH_OUTWARD_STOCK = `${BASE_URL}/stockManagement/getOutward`;
