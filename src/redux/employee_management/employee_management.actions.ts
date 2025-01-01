import CustomToast from "@/app/components/CustomToast";
import { apiClient } from "@/base-url/apiClient";
import {
  CREATE_EMPLOYEE,
  GET_ALL_EMPLOYEES,
  DELETE_EMPLOYEE,
  UPDATE_EMPLOYEE,
} from "@/base-url/apiRoutes"; // Adjust the API routes as necessary
import {
  CreateEmployeePayload,
  GetAllEmployeesRequest,
  EmployeeManagementEmployeeModel,
} from "@/models/req-model/EmployeeManagementEmployeeModel"; // Adjust the import path as necessary
import { createAsyncThunk } from "@reduxjs/toolkit";

// Create Employee
export const createEmployee = createAsyncThunk<
  { data: EmployeeManagementEmployeeModel; message: string },
  { createEmployeePayload: CreateEmployeePayload },
  { rejectValue: { message: string; status?: number } }
>(
  "employeeManagement/createEmployee",
  async ({ createEmployeePayload }, { rejectWithValue }) => {
    try {
      const body = {
        name: createEmployeePayload.name,
        phoneNumber: createEmployeePayload.phoneNumber,
        email: createEmployeePayload.email,
        address: createEmployeePayload.address,
        employeeShift: createEmployeePayload.employeeShift,
      };
      console.log("Request Body:", body);
      const res = await apiClient.post(CREATE_EMPLOYEE, body);
      console.log("API Response:", res);
      return { data: res.data.data, message: res.data.message };
    } catch (error: any) {
      return rejectWithValue({
        message: error.response?.data?.message || "Failed to create Employee",
        status: error.response?.status,
      });
    }
  }
);

// Get All Employees
export const getAllEmployeesAction = createAsyncThunk<
  { data: EmployeeManagementEmployeeModel[]; itemCount: number },
  {
    commonApiParamModel: GetAllEmployeesRequest;
  },
  { rejectValue: { message: string; status?: number } }
>(
  "employeeManagement/getEmployees",
  async ({ commonApiParamModel }, { rejectWithValue }) => {
    try {
      const options = {
        params: {
          page: commonApiParamModel.page,
          take: commonApiParamModel.take,
          order: commonApiParamModel.order?.toUpperCase(),
          orderBy: commonApiParamModel.orderBy,
          search: commonApiParamModel.search,
        },
      };
      const res = await apiClient.get(`${GET_ALL_EMPLOYEES}`, options);

      // Extracting data and meta
      const data = res?.data?.data?.data || [];
      const itemCount = res?.data?.data?.meta?.itemCount || 0;

      return { data, itemCount };
    } catch (error: any) {
      console.error("Error occurred:", error);
      const status = error.response?.status || 500;

      CustomToast.ErrorToast(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to fetch Employees"
      );

      return rejectWithValue({
        message: "Failed to fetch employees",
        status,
      });
    }
  }
);


// Edit Employee
export const editEmployeeAction = createAsyncThunk<
  { data: EmployeeManagementEmployeeModel; message: string },
  { editEmployeePayload: CreateEmployeePayload; EmployeeId: string },
  { rejectValue: { message: string; status?: number } }
>(
  "employeeManagement/editEmployee",
  async ({ editEmployeePayload, EmployeeId }, { rejectWithValue }) => {
    try {
      const body = {
        ...editEmployeePayload,
      };
      const res = await apiClient.patch(
        `${UPDATE_EMPLOYEE}/${EmployeeId}`,
        body
      );
      return { data: res.data.data, message: res.data.message };
    } catch (error: any) {
      return rejectWithValue({
        message: "Failed to update employee",
        status: error.response?.status,
      });
    }
  }
);

// Delete Employee
export const deleteEmployeeAction = createAsyncThunk<
  { message: string },
  string, // EmployeeId
  { rejectValue: { message: string; status?: number } }
>(
  "employeeManagement/deleteEmployee",
  async (EmployeeId, { rejectWithValue }) => {
    try {
      const response = await apiClient.delete(
        `${DELETE_EMPLOYEE}/${EmployeeId}`
      );
      return { message: "Employee deleted successfully" };
    } catch (error: any) {
      console.error(
        "Error occurred while deleting Employee:",
        error.response?.data || error.message
      );
      const status = error.response?.status || 500;
      return rejectWithValue({
        message: "Failed to delete Employee",
        status,
      });
    }
  }
);

// Fetch Employees
export const fetchEmployeesAction = createAsyncThunk<
  { data: EmployeeManagementEmployeeModel[]; meta: { itemCount: number } },
  { page: number; take: number },
  { rejectValue: { message: string } }
>(
  "employeeManagement/fetchEmployees",
  async ({ page, take }, { rejectWithValue }) => {
    try {
      const options = {
        params: {
          page,
          take,
        },
      };

      console.log("API URL:", GET_ALL_EMPLOYEES, "Params:", options);
      const response = await apiClient.get(GET_ALL_EMPLOYEES, options);
      return {
        data: response.data.data.data, // Fetched Employees
        meta: response.data.data.meta, // Metadata (pagination)
      };
    } catch (error: any) {
      console.error("Error occurred while fetching Employees:", error);
      CustomToast.ErrorToast(
        error?.response?.data?.message || "Failed to fetch Employees."
      );
      return rejectWithValue({
        message: error.response?.data?.message || "An error occurred.",
      });
    }
  }
);
