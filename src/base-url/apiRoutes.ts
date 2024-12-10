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
export const CREATE_STOCK = `${BASE_URL}/stockManagement/createStock`;
export const FETCH_INWARD_STOCK = `${BASE_URL}/stockManagement/getStock/inward`;
export const FETCH_OUTWARD_STOCK = `${BASE_URL}/stockManagement/getStock/outward`;
export const DELETE_STOCK = `${BASE_URL}/stockManagement/deleteStock`;
export const UPDATE_STOCK = `${BASE_URL}/stockManagement/updateStock`;

// Get both Buyers and Sellers (combined endpoint for dynamic fetching based on type)
export const GET_ALL_BUYERS_AND_SUPPLIERS = `${BASE_URL}/vendorManagement/getVendorNP`; // This API will be used for fetching both buyers and sellers dynamically



// Employee Management
export const CREATE_EMPLOYEE = `${BASE_URL}/employeeManagement/createEmployee`;
export const GET_ALL_EMPLOYEES = `${BASE_URL}/employeeManagement/getEmployee`;
export const DELETE_EMPLOYEE = `${BASE_URL}/employeeManagement/deleteEmployee`;
export const GET_EMPLOYEE_BY_ID = `${BASE_URL}/employeeManagement/getEmployeeById`;
export const UPDATE_EMPLOYEE = `${BASE_URL}/employeeManagement/updateEmployee`;