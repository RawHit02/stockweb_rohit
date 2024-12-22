import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import transactionsReducer from "./transaction_details/transaction_table.slice";

import buyerReducer from "./slices/buyerSlice"; // Buyer slice
import authReducer from "./slices/authSlice"; // Authentication slice
import VendorManagementReducer from "./vendor_management/vendor_management.slice";
import stockManagementReducer from "@/redux/stock_management/stock_management.slice";
import EmployeeManagementReducer from "./employee_management/employee_management.slice"; // Import the employee management reducer
import attendanceReducer from "./todays_attendance/attendance.slice"; // Attendance reducer (NEW)



// Configure the Redux store
export const store = configureStore({
  reducer: {
    auth: authReducer,
    buyer: buyerReducer,
    VendorManagementReducer,
    stockManagement: stockManagementReducer, // Updated to 'stockManagement'
    EmployeeManagementReducer, // Add employee management reducer
    attendance: attendanceReducer, // Attendance reducer
    transactions: transactionsReducer,
  },
  devTools: true, // Enable Redux DevTools in development
});

// Type definitions for state and dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Custom hooks for typed usage
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
