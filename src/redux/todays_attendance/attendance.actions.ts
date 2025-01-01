import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "@/base-url/apiClient";
import {
  GET_ATTENDANCE_STATS,
  ADD_ATTENDANCE_RECORD,
  GET_ATTENDANCE_RECORDS,
  UPDATE_ATTENDANCE_RECORD,
  DELETE_ATTENDANCE_RECORD,
  GET_ALL_EMPLOYEES_ATTENDANCE,
} from "@/base-url/apiRoutes";
import {
  AttendanceStats,
  AttendanceRecordPayload,
} from "@/models/req-model/AttendanceModel";
import { EmployeeManagementEmployeeModel } from "@/models/req-model/EmployeeManagementEmployeeModel";
import { RootState } from "@/redux/store";

// Mock Data (for testing purposes)
const mockAttendanceStats: AttendanceStats = {
  present: 79,
  absent: 21,
};

// Fetch Attendance Stats (Present/Absent percentages)
export const fetchAttendanceStats = createAsyncThunk<
  AttendanceStats,
  void,
  { rejectValue: { message: string } }
>("attendance/fetchStats", async (_, { rejectWithValue }) => {
  try {
    const response = await apiClient.get(GET_ATTENDANCE_STATS);
    return response.data.data || mockAttendanceStats;
  } catch (error: any) {
    return rejectWithValue({
      message:
        error.response?.data?.message || "Failed to fetch attendance stats",
    });
  }
});

// Fetch Employee Names (with Caching)
export const fetchEmployeeNames = createAsyncThunk<
  EmployeeManagementEmployeeModel[],
  void,
  { rejectValue: { message: string }; state: RootState }
>("attendance/fetchEmployeeNames", async (_, { rejectWithValue, getState }) => {
  try {
    const existingEmployees = getState().attendance.getAllEmployees;
    if (existingEmployees.length > 0) {
      return existingEmployees; // Return cached employees
    }
    const response = await apiClient.get(GET_ALL_EMPLOYEES_ATTENDANCE, {
      params: { page: 1, take: 100 },
    });
    return response.data?.data?.data || [];
  } catch (error: any) {
    return rejectWithValue({
      message:
        error.response?.data?.message || "Failed to fetch employee names",
    });
  }
});

// Fetch Attendance Records (Paginated)
export const fetchAttendanceRecords = createAsyncThunk<
  { data: AttendanceRecordPayload[]; itemCount: number },
  { page: number; take: number },
  { rejectValue: { message: string } }
>("attendance/fetchRecords", async ({ page, take }, { rejectWithValue }) => {
  try {
    const response = await apiClient.get(GET_ATTENDANCE_RECORDS, {
      params: { page, take },
    });

    const enrichedData = response.data.data.data.map((record: any) => ({
      ...record,
      employeeName: record.employee?.name || "Unknown", // Map employee.name directly
    }));

    return {
      data: enrichedData,
      itemCount: response.data.data.meta.itemCount,
    };
  } catch (error: any) {
    return rejectWithValue({
      message:
        error.response?.data?.message || "Failed to fetch attendance records",
    });
  }
});

// Add Attendance Record
export const addAttendanceRecord = createAsyncThunk<
  AttendanceRecordPayload,
  AttendanceRecordPayload,
  { rejectValue: { message: string } }
>("attendance/addRecord", async (attendanceData, { rejectWithValue }) => {
  try {
    const response = await apiClient.post(ADD_ATTENDANCE_RECORD, {
      ...attendanceData,
    });
    return response.data?.data || attendanceData;
  } catch (error: any) {
    return rejectWithValue({
      message:
        error.response?.data?.message || "Failed to add attendance record",
    });
  }
});

// update attendance record
export const updateAttendanceRecord = createAsyncThunk<
  AttendanceRecordPayload,
  { attendanceId: string; updatePayload: AttendanceRecordPayload },
  { rejectValue: { message: string } }
>(
  "attendance/updateRecord",
  async ({ attendanceId, updatePayload }, { rejectWithValue }) => {
    try {
      const response = await apiClient.patch(
        `${UPDATE_ATTENDANCE_RECORD}/${attendanceId}`,
        {
          ...updatePayload,
        }
      );
      return response.data?.data || updatePayload;
    } catch (error: any) {
      return rejectWithValue({
        message:
          error.response?.data?.message || "Failed to update attendance record",
      });
    }
  }
);

// Delete Attendance Record
export const deleteAttendanceRecord = createAsyncThunk<
  { message: string },
  string,
  { rejectValue: { message: string } }
>("attendance/deleteRecord", async (attendanceId, { rejectWithValue }) => {
  try {
    await apiClient.delete(`${DELETE_ATTENDANCE_RECORD}/${attendanceId}`);
    return { message: "Attendance record deleted successfully" };
  } catch (error: any) {
    return rejectWithValue({
      message:
        error.response?.data?.message || "Failed to delete attendance record",
    });
  }
});

// Map Employee ID to Name
export const mapEmployeeIdToName = (
  id: string,
  employees: EmployeeManagementEmployeeModel[]
) => {
  const employee = employees.find((emp) => emp.id === id);
  return employee?.name || "Unknown";
};
