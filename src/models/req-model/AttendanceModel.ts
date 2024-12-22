import { EmployeeManagementEmployeeModel } from "./EmployeeManagementEmployeeModel";


export interface EmployeeModel {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  address: string;
  createdBy: string;
  createdDate: string;
  updatedBy: string | null;
  updatedDate: string;
  isDeleted: boolean;
  employeeShift: "Day" | "Night";
}


export interface AttendanceStats {
  present: number; // Number of employees present
  absent: number; // Number of employees absent
}

export interface AttendanceRecordPayload {
  id?: string;
  employee: string | EmployeeModel ;
  employeeId? : string;
  employeeName?: string;
  firstIn: string;
  lastOut: string;
  todaysHour : string;
  status: "Present" | "Absent";
  shift: "Day" | "Night";
}

export interface AttendanceState {
  stats: AttendanceStats;
  records: AttendanceRecordPayload[];
  itemCount: number;
  loadingStats: boolean;
  loadingRecords: boolean;
  error: string | null;
  getAllEmployees: EmployeeManagementEmployeeModel[];
  employeeNames: { [key: string]: string };
}
