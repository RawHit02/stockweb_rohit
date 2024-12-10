import * as Yup from "yup";




export const employeeSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  phoneNumber: Yup.string().required("Phone number is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  address: Yup.string().required("Address is required"),
  employeeShift: Yup.string().required("Employee shift is required"),
});

// export const addEmployeeSchema = Yup.object().shape({
//   name: Yup.string().required("Please enter the employee's name"),
//   contactNumber: Yup.string()
//     .required("Contact number is required")
//     .matches(/^[0-9]+$/, "Contact number not valid")
//     .min(10, "Contact number must be at least 10 digits")
//     .max(15, "Contact number can't exceed 15 digits"),
//   email: Yup.string()
//     .email("Please enter a valid email address")
//     .required("Email is required"),
//   address: Yup.string().required("Address is required"),
//   shift: Yup.string().required("Shift is required"),
// });

