"use client";

import React, { useCallback, useEffect, useState } from "react";
import { Box, Typography, Button } from "@mui/material";
import AddAttendanceDialog from "@/app/components/AddAttendanceDialog";
import AttendanceTableRecords from "@/app/components/AttendanceTableRecords";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "@/redux/store";
import {
  fetchAttendanceStats,
  fetchAttendanceRecords,
} from "@/redux/todays_attendance/attendance.actions";
import { fetchEmployeesAction } from "@/redux/employee_management/employee_management.actions";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import moment, { Moment } from "moment"; // Import Moment.js
import { AttendanceRecordPayload } from "@/models/req-model/AttendanceModel";

const TodaysAttendance = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { stats, loadingStats } = useSelector(
    (state: RootState) => state.attendance
  );

  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false); // Control dialog visibility
  const [editRecord, setEditRecord] = useState<{
    id: string;
    employeeId: string;
    inTime: Moment | null;
    outTime: Moment | null;
    status: string;
    shift: string;
  } | null>(null);

  // Fetch attendance data
  const fetchData = useCallback(async () => {
    try {
      await dispatch(fetchAttendanceStats());
      await dispatch(
        fetchAttendanceRecords({
          page: 1,
          take: 10,
        })
      );
      await dispatch(fetchEmployeesAction({ page: 1, take: 50 }));
    } catch (error) {
      console.error("Error fetching attendance data:", error);
    }
  },[dispatch]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  // Handle editing a record
  const handleEditRecord = (record: AttendanceRecordPayload) => {
    const employeeId =
      typeof record.employee === "string"
        ? record.employee // If it's already a string, use it directly
        : record.employee?.id || ""; // If it's an object, extract the ID

    setEditRecord({
      id: record.id || "",
      employeeId, // Correctly assign the employee ID
      inTime: record.firstIn ? moment(record.firstIn) : null, // Convert firstIn to Moment
      outTime: record.lastOut ? moment(record.lastOut) : null, // Convert lastOut to Moment
      status: record.status,
      shift: record.shift,
    });
    setIsEditDialogOpen(true);
  };

  // Handle adding a new attendance
  const handleAddAttendance = () => {
    setEditRecord(null); // Reset the edited record
    setIsEditDialogOpen(true); // Open the dialog for adding
  };

  // Handle dialog close
  const handleCloseDialog = () => {
    setIsEditDialogOpen(false); // Close the dialog
    setEditRecord(null); // Reset the edited record
  };

  // Refresh attendance data after any updates
  const refreshAttendance = async () => {
    await fetchData();
  };

  return (
    <Box className="bg-white border border-[#E8EBED] rounded-xl p-6 h-[calc(100vh-116px)] overflow-auto">
      {/* Header */}
      <Box className="flex items-center justify-between">
        <Typography className="text-2xl font-bold">
          Today&apos;s Attendance
        </Typography>
        <Button
          variant="contained"
          className="bg-primary500 rounded-lg h-10 text-base"
          startIcon={<AddCircleOutlineOutlinedIcon />}
          onClick={handleAddAttendance}
        >
          Add Attendance
        </Button>
      </Box>

      {/* Stats Section */}
      <Box className="flex flex-row gap-4 mt-4">
        <Box className="rounded-2xl p-6 flex flex-col gap-4 border border-primary500">
          {loadingStats ? (
            <Typography>Loading...</Typography>
          ) : (
            <Typography className="flex flex-row self-center text-base font-medium">
              Present: {stats.present}
            </Typography>
          )}
        </Box>
        <Box className="rounded-2xl p-6 flex flex-col gap-4 border border-primary500">
          {loadingStats ? (
            <Typography>Loading...</Typography>
          ) : (
            <Typography className="flex flex-row self-center text-base font-medium">
              Absent: {stats.absent}
            </Typography>
          )}
        </Box>
      </Box>

      {/* Table Section */}
      <Box className="mt-4">
        <AttendanceTableRecords onEditRecord={handleEditRecord} />
      </Box>

      {/* Add/Edit Dialog */}
      <AddAttendanceDialog
        open={isEditDialogOpen} // Dialog visibility control
        onClose={handleCloseDialog} // Close dialog handler
        initialValues={
          editRecord || {
            id: "",
            employeeId: "",
            inTime: moment(),
            outTime: moment(),
            status: "",
            shift: "",
            todaysHour: "0.00",
          }
        } // Provide default initial values for Add Attendance
        // initialValues={editRecord || undefined} // Pass the record to edit
        isEditMode={Boolean(editRecord?.id)} // Indicate whether it's edit mode
        onRecordUpdated={refreshAttendance} // Refresh data after submission
      />
    </Box>
  );
};

export default TodaysAttendance;
