import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// Define the structure for Employee data
interface Employee {
  id: string; // Make sure id is a string
  name: string;
  phoneNumber: string;
  email: string;
  address: string;
  employeeShift : string;
  profileImage?: string;
}

// Define the initial state with an empty employees array
interface EmployeeState {
  employees: Employee[];
}

const initialState: EmployeeState = {
  employees: [],
};

const employeeSlice = createSlice({
  name: "employee",
  initialState,
  reducers: {
    addEmployee: (state, action: PayloadAction<Employee>) => {
      state.employees.push(action.payload);
    },
    updateEmployee: (state, action: PayloadAction<Employee>) => {
      const index = state.employees.findIndex(
        (employee) => employee.id === action.payload.id
      );
      if (index !== -1) {
        state.employees[index] = action.payload;
      }
    },
    deleteEmployee: (state, action: PayloadAction<string>) => {
      // Update to PayloadAction<string>
      state.employees = state.employees.filter(
        (employee) => employee.id !== action.payload
      );
    },
  },
});

// Export actions to use them in components
export const { addEmployee, updateEmployee, deleteEmployee } = employeeSlice.actions;

// Export reducer to add to the store
export default employeeSlice.reducer;
