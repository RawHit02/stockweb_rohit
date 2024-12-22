import { createSlice } from "@reduxjs/toolkit";
import {
  fetchAttendanceStats,
  fetchAttendanceRecords,
  addAttendanceRecord,
  updateAttendanceRecord,
  fetchEmployeeNames,
} from "./attendance.actions";
import {
  AttendanceState,
  AttendanceRecordPayload,
} from "@/models/req-model/AttendanceModel";
import { fetchEmployeesAction } from "../employee_management/employee_management.actions";

// Initial state for attendance
const initialState: AttendanceState = {
  stats: { present: 72, absent: 60 },
  records: [],
  itemCount: 0,
  loadingStats: false,
  loadingRecords: false,
  error: null,
  getAllEmployees: [],
  employeeNames: {},
};

const attendanceSlice = createSlice({
  name: "attendance",
  initialState,
  reducers: {
    clearAttendanceState: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    // Fetch Attendance Stats
    builder.addCase(fetchAttendanceStats.pending, (state) => {
      state.loadingStats = true;
      state.error = null;
    });
    builder.addCase(fetchAttendanceStats.fulfilled, (state, action) => {
      state.loadingStats = false;
      state.stats = action.payload;
    });
    builder.addCase(fetchAttendanceStats.rejected, (state, action) => {
      state.loadingStats = false;
      state.error = action.payload?.message || "Error fetching stats";
    });

    // Fetch Attendance Records
    builder.addCase(fetchAttendanceRecords.pending, (state) => {
      state.loadingRecords = true;
      state.error = null;
    });
    builder.addCase(fetchAttendanceRecords.fulfilled, (state, action) => {
      state.loadingRecords = false;
      state.records = action.payload.data.map((record) => ({
        ...record,
        employeeName: record.employeeName || "Unknown",
        shift : record.shift || "",
        todaysHours : record.todaysHour || "N/A",
      }));
      state.itemCount = action.payload.itemCount;
    });

    builder.addCase(fetchAttendanceRecords.rejected, (state, action) => {
      state.loadingRecords = false;
      state.error = action.payload?.message || "Error fetching records";
    });

    // Add Attendance Record
    builder.addCase(addAttendanceRecord.pending, (state) => {
      state.error = null;
    });
    builder.addCase(addAttendanceRecord.fulfilled, (state, action) => {
      const newRecord = action.payload;
      state.records = [
        {
          ...newRecord,
          employeeName:
            newRecord.employeeName ||
            state.getAllEmployees.find((emp) => emp.id === newRecord.employee)
              ?.name ||
            "Unknown",
         
        },
        ...state.records,
      ];
      state.itemCount += 1; // Increment record count
    });

    builder.addCase(addAttendanceRecord.rejected, (state, action) => {
      state.error = action.payload?.message || "Error adding record";
    });

    // Update Attendance Record
    builder.addCase(updateAttendanceRecord.fulfilled, (state, action) => {
      const updatedRecord = action.payload;
      state.records = state.records.map((record) =>
        record.id === updatedRecord.id
          ? {
              ...record,
              ...updatedRecord,
            }
          : record
      );
    });
    // Fetch Employees
    builder.addCase(fetchEmployeesAction.pending, (state) => {
      state.loadingRecords = true;
    });
    builder.addCase(fetchEmployeesAction.fulfilled, (state, action) => {
      state.loadingRecords = false;
      state.getAllEmployees = action.payload.data || [];
    });
    builder.addCase(fetchEmployeesAction.rejected, (state, action) => {
      state.loadingRecords = false;
      state.error = action.payload?.message || "Error fetching employees";
    });
  },
});

export const { clearAttendanceState } = attendanceSlice.actions;
export default attendanceSlice.reducer;
