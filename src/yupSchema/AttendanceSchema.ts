import * as Yup from "yup";
import moment from "moment";

export const AttendanceSchema = Yup.object().shape({
  employeeId: Yup.string().required("Please select an employee name"), // Employee ID validation
  inTime: Yup.date()
    .nullable()
    .required("Please enter the in-time") // In-time validation
    .typeError("Invalid in-time format"),
  outTime: Yup.date()
    .nullable()
    .required("Please enter the out-time") // Out-time validation
    .typeError("Invalid out-time format")
    .test("is-after", "Out-time must be after in-time", function (value) {
      const { inTime } = this.parent;
      return value && inTime && moment(value).isAfter(moment(inTime));
    }),
  status: Yup.string()
    .required("Please select the status") // Status validation
    .oneOf(["Present", "Absent"], "Invalid status selected"),
  shift: Yup.string()
    .required("Please select the shift") // Shift validation
    .oneOf([ "Day", "Night"], "Invalid shift selected"),
});
