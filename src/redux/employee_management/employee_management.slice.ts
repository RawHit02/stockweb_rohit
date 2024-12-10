import { createSlice } from "@reduxjs/toolkit";
import {
  EmployeeManagementEmployeeModel,
  InitialEmployeesModelState,
} from "@/models/req-model/EmployeeManagementEmployeeModel"; // Adjust the import path as necessary

import {
  createEmployee,
  getAllEmployeesAction,
  deleteEmployeeAction,
  editEmployeeAction,
} from "./employee_management.actions"; // Adjust the import path as necessary

interface EmployeeManagementState {
  employees: InitialEmployeesModelState;
}

const initialState: EmployeeManagementState = {
  employees: {
    message: "",
    itemCount: 0,
    userError: undefined,
    getAllEmployees: [],
    createEmployeeRes: "",
    createEmployeeLoading: false,
    getAllEmployeeLoading: false,
  },
};

export const manageEmployeeManagementSlice = createSlice({
  name: "manage_employee_management_slice",
  initialState,
  reducers: {
    clearAllManageEmployees: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    // Employee Actions
    builder.addCase(createEmployee.pending, (state) => {
      state.employees.createEmployeeLoading = true;
      state.employees.userError = "";
    });
    builder.addCase(createEmployee.fulfilled, (state, action) => {
      state.employees.createEmployeeLoading = false;
      state.employees.userError = "";
      state.employees.getAllEmployees = [
        action.payload.data,
        ...state.employees.getAllEmployees,
      ];
    });
    builder.addCase(createEmployee.rejected, (state, action) => {
      state.employees.createEmployeeLoading = false;
      state.employees.userError = action.error.message;
    });

    builder.addCase(getAllEmployeesAction.pending, (state) => {
      state.employees.getAllEmployeeLoading = true;
      state.employees.userError = "";
    });
    builder.addCase(getAllEmployeesAction.fulfilled, (state, action) => {
      state.employees.getAllEmployeeLoading = false;
      state.employees.userError = "";
      state.employees.getAllEmployees = action.payload.data;
      state.employees.itemCount = action.payload.itemCount;
    });
    builder.addCase(getAllEmployeesAction.rejected, (state, action) => {
      state.employees.getAllEmployeeLoading = false;
      state.employees.userError = action.error.message;
    });

    builder.addCase(editEmployeeAction.fulfilled, (state, action) => {
      const updatedEmployee = action.payload.data;
      const index = state.employees.getAllEmployees.findIndex(
        (employee) => employee.id === updatedEmployee.id
      );
      if (index !== -1) {
        state.employees.getAllEmployees[index] = updatedEmployee;
      }
    });

    builder.addCase(deleteEmployeeAction.fulfilled, (state, action) => {
      const deletedEmployeeId = action.meta.arg; // EmployeeId
      state.employees.getAllEmployees = state.employees.getAllEmployees.filter(
        (employee) => employee.id !== deletedEmployeeId
      );
    });
  },
});

export const { clearAllManageEmployees } =
  manageEmployeeManagementSlice.actions;
export default manageEmployeeManagementSlice.reducer;
