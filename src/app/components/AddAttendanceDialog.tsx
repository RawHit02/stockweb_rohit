"use client";

import React, { useEffect, useState } from "react";
import moment, { Moment } from "moment";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  FormControl,
  Select,
  MenuItem,
  TextField,
  SelectChangeEvent,
} from "@mui/material";
import { CloseOutlinedIcon } from "../assets";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import {
  addAttendanceRecord,
  updateAttendanceRecord,
} from "@/redux/todays_attendance/attendance.actions";
import { fetchEmployeesAction } from "@/redux/employee_management/employee_management.actions";
import { EmployeeManagementEmployeeModel } from "@/models/req-model/EmployeeManagementEmployeeModel";
import { AttendanceSchema } from "@/yupSchema/AttendanceSchema";

interface AddAttendanceDialogProps {
  open: boolean;
  onClose: () => void;
  initialValues?: {
    id: string;
    employeeId: string;
    employeeName?: string;
    inTime: Moment | null;
    outTime: Moment | null;
    status: string;
    shift: string;
    todaysHour?: string;
  };
  isEditMode: boolean;
  onRecordUpdated: () => Promise<void>;
}

const AddAttendanceDialog: React.FC<AddAttendanceDialogProps> = ({
  open,
  onClose,
  initialValues,
  isEditMode,
  onRecordUpdated,
}) => {
  const dispatch = useDispatch<AppDispatch>();
  const employees = useSelector(
    (state: RootState) => state.attendance.getAllEmployees
  );

  const [loadingEmployees, setLoadingEmployees] = useState(false);

  useEffect(() => {
    if (employees.length === 0) {
      setLoadingEmployees(true);
      dispatch(fetchEmployeesAction({ page: 1, take: 50 }))
        .unwrap()
        .catch((error) => {
          console.error("Failed to fetch employees:", error);
        })
        .finally(() => {
          setLoadingEmployees(false);
        });
    }
  }, [dispatch, employees.length]);

  const formik = useFormik({
    initialValues: {
      employeeId:
        typeof initialValues?.employeeId === "object" &&
        initialValues?.employeeId !== null
          ? (initialValues.employeeId as { id: string }).id
          : (initialValues?.employeeId as string) || "",
      employeeName:
        typeof initialValues?.employeeId === "object" &&
        initialValues?.employeeId !== null
          ? (initialValues.employeeId as { name: string }).name
          : initialValues?.employeeName || "",
      inTime: initialValues?.inTime || moment(),
      outTime: initialValues?.outTime || moment(),
      status: initialValues?.status || "",
      shift: initialValues?.shift || "",
      todaysHour: initialValues?.todaysHour || "0.00",
    },

    validationSchema: AttendanceSchema,
    enableReinitialize: !!initialValues,

    onSubmit: async (values) => {
      console.log("Form submitted with values:", values);

      try {
        const payload = {
          employee: values.employeeId,
          employeeName: values.employeeName || "",
          firstIn: values.inTime ? values.inTime.toISOString() : "",
          lastOut: values.outTime ? values.outTime.toISOString() : "",
          status: values.status as "Present" | "Absent",
          shift: values.shift as "Day" | "Night",
          todaysHour: values.todaysHour || "0.00",
        };

        if (isEditMode && initialValues?.id) {
          await dispatch(
            updateAttendanceRecord({
              attendanceId: initialValues.id,
              updatePayload: payload,
            })
          ).unwrap();
        } else {
          await dispatch(addAttendanceRecord(payload)).unwrap();
        }

        onClose();
        formik.resetForm();
        await onRecordUpdated();
      } catch (error) {
        console.error("Failed to submit attendance record:", error);
      }
    },
  });

  const { setValues } = formik; // Move this after the `formik` declaration

  useEffect(() => {
    if (open && isEditMode && initialValues) {
      const { employeeId, shift, inTime, outTime, status, todaysHour } =
        initialValues;
      console.log("Initial Values in useEffect:", initialValues); // Add this

      const employeeIdValue =
        typeof employeeId === "object" && employeeId !== null
          ? (employeeId as { id: string; name: string }).id
          : (employeeId as string) || "";

      const employeeName =
        typeof employeeId === "object" && employeeId !== null
          ? (employeeId as { id: string; name: string }).name
          : "";

      setValues({
        employeeId: employeeIdValue,
        employeeName: employeeName,
        inTime: inTime || moment(),
        outTime: outTime || moment(),
        status: status || "",
        shift: shift || "",
        todaysHour: todaysHour || "0.00",
      });
    }
  }, [open, isEditMode, initialValues, setValues]);

     

      // console.log("Initial Values in useEffect:", initialValues);
      // console.log("Shift Value in useEffect:", shift); // Debug the shift value

     

  const handleEmployeeChange = (e: SelectChangeEvent<string>) => {
    const selectedEmployee = employees.find((emp) => emp.id === e.target.value);
    formik.setFieldValue("employeeId", e.target.value);
    formik.setFieldValue("employeeName", selectedEmployee?.name || "");
  };
  return (
    <Dialog
      fullWidth
      onClose={onClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      maxWidth="sm"
    >
      <form onSubmit={formik.handleSubmit}>
        <DialogTitle className="flex items-start justify-between px-9 pt-9 pb-6">
          <Box>
            <Typography className="text-2xl leading-6 font-semibold">
              {isEditMode ? "Edit Attendance" : "Add Attendance"}
            </Typography>
            <Typography className="text-secondary800 mt-2">
              {isEditMode
                ? "Update the employee attendance"
                : "Enter employee attendance"}
            </Typography>
          </Box>
          <IconButton onClick={onClose} className="p-0 text-gray100">
            <CloseOutlinedIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent className="px-9">
          <Box sx={{ width: "100%" }} className="flex flex-col gap-[12px]">
            {/* Employee Field */}
            <Box className="flex flex-col">
              <Typography className="text-sm text-primary">Employee</Typography>
              <FormControl fullWidth className="mt-2">
                <Select
                  name="employeeId"
                  value={formik.values.employeeId || ""}
                  onChange={handleEmployeeChange}
                  displayEmpty
                  error={
                    formik.touched.employeeId &&
                    Boolean(formik.errors.employeeId)
                  }
                >
                  <MenuItem disabled value="">
                    Select Employee
                  </MenuItem>
                  {employees.map(
                    (employee: EmployeeManagementEmployeeModel) => (
                      <MenuItem key={employee.id} value={employee.id}>
                        {employee.name || "Unnamed Employee"}
                      </MenuItem>
                    )
                  )}
                </Select>
                {formik.touched.employeeId && formik.errors.employeeId && (
                  <Typography className="text-red-600 text-xs mt-1">
                    {formik.errors.employeeId}
                  </Typography>
                )}
              </FormControl>
            </Box>

            {/* In Time */}
            <Box className="flex flex-col">
              <Typography className="text-sm text-primary">In Time</Typography>
              <TextField
                type="datetime-local"
                value={formik.values.inTime?.format("YYYY-MM-DDTHH:mm") || ""}
                onChange={(e) =>
                  formik.setFieldValue("inTime", moment(e.target.value))
                }
                error={formik.touched.inTime && Boolean(formik.errors.inTime)}
                helperText={
                  formik.touched.inTime && formik.errors.inTime
                    ? String(formik.errors.inTime)
                    : ""
                }
              />
            </Box>

            {/* Out Time */}
            <Box className="flex flex-col">
              <Typography className="text-sm text-primary">Out Time</Typography>
              <TextField
                type="datetime-local"
                value={formik.values.outTime?.format("YYYY-MM-DDTHH:mm") || ""}
                onChange={(e) =>
                  formik.setFieldValue("outTime", moment(e.target.value))
                }
                error={formik.touched.outTime && Boolean(formik.errors.outTime)}
                helperText={
                  formik.touched.outTime && formik.errors.outTime
                    ? String(formik.errors.outTime)
                    : ""
                }
              />
            </Box>

            {/* Status */}
            <Box className="flex flex-col">
              <Typography className="text-sm text-primary">Status</Typography>
              <FormControl fullWidth className="mt-2">
                <Select
                  name="status"
                  value={formik.values.status}
                  onChange={formik.handleChange}
                  error={formik.touched.status && Boolean(formik.errors.status)}
                >
                  <MenuItem disabled value="">
                    Select
                  </MenuItem>
                  <MenuItem value="Present">Present</MenuItem>
                  <MenuItem value="Absent">Absent</MenuItem>
                </Select>
                {formik.touched.status && formik.errors.status && (
                  <Typography className="text-red-600 text-xs mt-1">
                    {formik.errors.status}
                  </Typography>
                )}
              </FormControl>
            </Box>

            {/* Shift */}
            <Box className="flex flex-col">
              <Typography className="text-sm text-primary">Shift</Typography>
              <FormControl fullWidth className="mt-2">
                <Select
                  name="shift"
                  value={formik.values.shift}
                  onChange={formik.handleChange}
                  error={formik.touched.shift && Boolean(formik.errors.shift)}
                >
                  <MenuItem disabled value="">
                    Select
                  </MenuItem>
                  <MenuItem value="Day">Day</MenuItem>
                  <MenuItem value="Night">Night</MenuItem>
                </Select>
                {formik.touched.shift && formik.errors.shift && (
                  <Typography className="text-red-600 text-xs mt-1">
                    {formik.errors.shift}
                  </Typography>
                )}
              </FormControl>
            </Box>
          </Box>
        </DialogContent>
        <DialogActions className="mb-[36px] px-9">
          <Button variant="outlined" size="large" onClick={onClose}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size="large"
          >
            Save
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddAttendanceDialog;
