const BASE_URL = `${process?.env?.NEXT_PUBLIC_BACKEND_API_URL}/api/v1`;

// const BASE_URL = "http://localhost:8001/api/v1";


// Login Routes
export const SIGN_IN = `${BASE_URL}/identity/signIn`;

// Vendor Management
export const CREATE_VENDOR = `${BASE_URL}/vendorManagement/createVendor`;
export const EDIT_VENDOR = `${BASE_URL}/vendorManagement/updateVendor`; 
export const DELETE_VENDOR = `${BASE_URL}/vendorManagement/deleteVendor`;  
export const GET_ALL_BUYERS = `${BASE_URL}/vendorManagement/getVendor/buyer`;
export const GET_ALL_SELLERS = `${BASE_URL}/vendorManagement/getVendor/supplier`;


// STOCK Management
export const CREATE_STOCK = `${BASE_URL}/stockManagement/createStock`; // Create Stock
export const FETCH_INWARD_STOCK = `${BASE_URL}/stockManagement/getStock/inward`; // Fetch Inward Stocks
export const FETCH_OUTWARD_STOCK = `${BASE_URL}/stockManagement/getStock/outward`; // Fetch Outward Stocks
export const DELETE_STOCK = `${BASE_URL}/stockManagement/deleteStock`; // Delete Stock
export const UPDATE_STOCK = `${BASE_URL}/stockManagement/updateStock`; // Update Stock

// Transaction Table
export const GET_TRANSACTIONS = `${BASE_URL}/stockManagement/getTransaction`; // Fetch Transactions

// Vendor Management
export const GET_ALL_BUYERS_AND_SUPPLIERS = `${BASE_URL}/vendorManagement/getAllVendor`; // Combined Buyers and Suppliers
export const GET_SUPPLIERS = `${BASE_URL}/vendorManagement/getVendor/supplier`; // Fetch Suppliers
export const GET_BUYERS = `${BASE_URL}/vendorManagement/getVendor/buyer`; // Fetch Buyers

// New APIs for Vendor Profiles
export const GET_ALL_BUYERS_NEW = `${BASE_URL}/vendorManagement/getAllVendor/buyer`; // Fetch Buyer Details
export const GET_ALL_SELLERS_NEW = `${BASE_URL}/vendorManagement/getAllVendor/supplier`; // Fetch Seller Details

// Ornament Management
export const POST_ALL_ORNAMENTS = `${BASE_URL}/ornamentManagement`; // Create Ornament
export const GET_ALL_ORNAMENTS = `${BASE_URL}/ornamentManagement/getAllOrnament`; // Fetch Ornaments
export const DELETE_ALL_ORNAMENTS = `${BASE_URL}/ornamentManagement/deleteOrnament`; // Delete Ornament


// Ornament Colors
export const POST_ORNAMENT_COLORS = `${BASE_URL}/ornamentColorManagement`; // Create Ornament Color
export const GET_ORNAMENT_COLORS = `${BASE_URL}/ornamentColorManagement/getOrnamentColor`; // Fetch Ornament Colors
export const DELETE_ORNAMENT_COLORS = `${BASE_URL}/ornamentColorManagement/deleteOrnamentColor`; // Delete Ornament Color


// Ornament Forms
export const POST_ORNAMENT_FORMS = `${BASE_URL}/ornamentFormManagement`;
export const GET_ORNAMENT_FORMS = `${BASE_URL}/ornamentFormManagement/getOrnamentForm`; // Fetch Ornament Forms
export const DELETE_ORNAMENT_FORMS = `${BASE_URL}/ornamentFormManagement/deleteOrnamentForm`; // Delete Ornament Form


// Ornament Purity
export const POST_ORNAMENT_PURITY = `${BASE_URL}/ornamentPurityManagement`; // Create Ornament Purity
export const GET_ORNAMENT_PURITY = `${BASE_URL}/ornamentPurityManagement/getOrnamentPurity`; // Fetch Ornament Purity
export const DELETE_ORNAMENT_PURITY = `${BASE_URL}/ornamentPurityManagement/deleteOrnamentPurity`; // Delete Ornament Purity


// Ornament Types
export const POST_ORNAMENT_TYPES = `${BASE_URL}/ornamentTypeManagement`; // Create Ornament Type
export const GET_ORNAMENT_TYPES = `${BASE_URL}/ornamentTypeManagement/getOrnamentType`; // Fetch Ornament Types
export const DELETE_ORNAMENT_TYPES = `${BASE_URL}/ornamentTypeManagement/deleteOrnamentType`; // Delete Ornament Type


// Employee Management
export const CREATE_EMPLOYEE = `${BASE_URL}/employeeManagement/createEmployee`;
export const GET_ALL_EMPLOYEES = `${BASE_URL}/employeeManagement/getEmployee`;
export const DELETE_EMPLOYEE = `${BASE_URL}/employeeManagement/deleteEmployee`;
export const GET_EMPLOYEE_BY_ID = `${BASE_URL}/employeeManagement/getEmployeeById`;
export const UPDATE_EMPLOYEE = `${BASE_URL}/employeeManagement/updateEmployee`;


// Attendance
export const GET_ALL_EMPLOYEES_ATTENDANCE = `${BASE_URL}/employeeManagement/getEmployee`;
export const GET_ATTENDANCE_STATS = `${BASE_URL}/attendanceManagement/getAttendance`; 
export const ADD_ATTENDANCE_RECORD = `${BASE_URL}/attendanceManagement/createAttendance`;
export const GET_ATTENDANCE_RECORDS = `${BASE_URL}/attendanceManagement/getAttendance`;
export const UPDATE_ATTENDANCE_RECORD = `${BASE_URL}/attendanceManagement/updateAttendance`;
export const DELETE_ATTENDANCE_RECORD = `${BASE_URL}/attendanceManagement/deleteAttendance`;

// Sass Loader Configuration
export const sassLoaderOptions = {
  implementation: require('sass'),
  sassOptions: {
    fiber: false,
  },
};