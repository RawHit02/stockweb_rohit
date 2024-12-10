import { ApiParamModel } from "../common/ApiParamModel";

// Model representing an Employee
export interface EmployeeManagementEmployeeModel {
  profileImage: any; // Store the URL string if image is uploaded, null if not
  id: string;
  name: string;
  phoneNumber: string;
  email: string;
  address: string;
  employeeShift: string;
  createdBy: string;
  createdDate: string;
  updatedDate: string;
}

// Initial state for managing Employee data in the Redux store
export interface InitialEmployeesModelState {
  message: string;
  itemCount: number;
  userError?: string | undefined;
  getAllEmployees: EmployeeManagementEmployeeModel[]; 
  createEmployeeRes: string; 
  createEmployeeLoading: boolean; 
  getAllEmployeeLoading: boolean; 
}

// Request model for getting employees with optional
export interface GetAllEmployeesRequest extends ApiParamModel {
  userId?: string; //  userId to filter
}

// Payload for creating a new employee
export interface CreateEmployeePayload {
  name: string;
  phoneNumber: string;
  email: string;
  address: string;
  employeeShift: string;
}
