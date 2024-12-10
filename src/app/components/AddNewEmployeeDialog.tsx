"use client";
import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  InputAdornment,
  OutlinedInput,
  Snackbar,
  Select,
  MenuItem,
  
} from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { createEmployee } from "@/redux/employee_management/employee_management.actions";
import { employeeSchema } from "@/yupSchema/addEmployeeSchema"; // Add your validation schema here
import { editEmployeeAction } from "@/redux/employee_management/employee_management.actions";
import { useSnackbar } from "notistack";

import Image from "next/image";

import {
  // AddCircleOutlineOutlinedIcon,
  CheckCircleIcon,
  CloseOutlinedIcon,
  FileUploadOutlinedIcon,
  UploadImageIcon,
} from "../assets";

export interface EmployeeFormValues {
  id?: string;
  name: string;
  phoneNumber: string;
  email: string;
  address: string;
  employeeShift: string;
  profileImage: File | null;
}

interface AddNewEmployeeDialogProps {
  onEmployeeCreated?: () => void;
  initialValues?: EmployeeFormValues; // Prefilled data
  isEditMode?: boolean; // differentiate between add/edit
  open: boolean;
  onClose: () => void;
}

const AddNewEmployeeDialog: React.FC<AddNewEmployeeDialogProps> = ({
  onEmployeeCreated,
  initialValues = {
    id: undefined,
    name: "",
    phoneNumber: "",
    email: "",
    address: "",
    employeeShift: "",
    profileImage: null,
  },
  isEditMode = false,
  open,
  onClose,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage] = useState("");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  const handleSnackbarClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return; // Ignore clickaway to keep Snackbar open until timeout
    }
    setSnackbarOpen(false); // Close the Snackbar
  };

  const handleImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: (field: string, value: File | null) => void
  ) => {
    const file = event.currentTarget.files
      ? event.currentTarget.files[0]
      : null;
    if (file) {
      setFieldValue("profileImage", file);
      const imageUrl = URL.createObjectURL(file);
      setUploadedImage(imageUrl);
    }
  };

 const handleSubmit = async (
   values: EmployeeFormValues,
   { resetForm }: { resetForm: () => void }
 ) => {
   console.log("Form submitted with values:", values); // Debugging line
   try {
     const employeePayload = {
       name: values.name,
       phoneNumber:
         typeof values.phoneNumber === "string" &&
         values.phoneNumber.startsWith("+91")
           ? values.phoneNumber
           : `+91${values.phoneNumber}`, // Phone number is always prefixed
       email: values.email,
       address: values.address,
       employeeShift: values.employeeShift,
     };

     console.log("Payload to be sent:", employeePayload); // Debugging line

     if (isEditMode && initialValues?.id) {
       // Edit Employee
       const editPayload = {
         EmployeeId: initialValues.id,
         editEmployeePayload: employeePayload,
       };
       console.log("Edit Payload:", editPayload); // Debugging line
       await dispatch(editEmployeeAction(editPayload)).unwrap();
       enqueueSnackbar("Employee updated successfully!", {
         variant: "success",
       });
     } else {
       // Add Employee
       await dispatch(
         createEmployee({ createEmployeePayload: employeePayload })
       ).unwrap();
       enqueueSnackbar("Employee added successfully!", { variant: "success" });
     }

     // Reset form and close dialog
     resetForm();
     setUploadedImage(null);
     onClose();

     // Refresh list on success
     if (onEmployeeCreated) onEmployeeCreated();
   } catch (error: any) {
     console.error("Failed to add Employee:", error); // Debugging line
     enqueueSnackbar({
       message: "Failed to add Employee",
       variant: "error",
     });
   }
 };

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="customized-dialog-title"
        maxWidth="sm"
      >
        <DialogTitle className="flex items-start justify-between px-9 pt-9 pb-6">
          <Box>
            <Typography className="text-2xl leading-6 font-semibold">
              Add New Employee
            </Typography>
            <Typography className="text-secondary800 mt-2">
              Enter details of your Employee
            </Typography>
          </Box>
          <IconButton onClick={onClose} className="p-0">
            <CloseOutlinedIcon />
          </IconButton>
        </DialogTitle>

        <Formik
          initialValues={{
            name: initialValues?.name || "",
            phoneNumber: initialValues?.phoneNumber?.startsWith("+91")
              ? initialValues.phoneNumber.slice(3)
              : initialValues?.phoneNumber || "",
            email: initialValues?.email || "",
            address: initialValues?.address || "",
            employeeShift: initialValues?.employeeShift || "",
            profileImage: initialValues?.profileImage || null,
          }}
          validationSchema={employeeSchema}
          onSubmit={handleSubmit}
          enableReinitialize
        >
          {({ touched, errors, setFieldValue, resetForm }) => (
            <Form>
              <DialogContent className="px-9">
                <Box className="flex items-center gap-6 mb-4">
                  <Box className="border-[6px] border-primary200 bg-primaryExtraLight rounded-full overflow-hidden w-[120px] h-[120px] flex items-center justify-center relative">
                    {uploadedImage ? (
                      <Image
                        src={uploadedImage}
                        alt="Uploaded Image"
                        width={120}
                        height={120}
                        className="w-full h-full"
                      />
                    ) : (
                      <Image src={UploadImageIcon} alt="Upload" />
                    )}
                    <input
                      type="file"
                      accept="image/*"
                      className="absolute opacity-0 w-full h-full"
                      onChange={(event) =>
                        handleImageUpload(event, setFieldValue)
                      }
                    />
                  </Box>
                  <Box>
                    <Box className="flex items-center gap-2">
                      <Button
                        variant="outlined"
                        size="large"
                        startIcon={<FileUploadOutlinedIcon />}
                        component="label"
                      >
                        Upload
                        <input
                          type="file"
                          accept="image/*"
                          hidden
                          onChange={(event) =>
                            handleImageUpload(event, setFieldValue)
                          }
                        />
                      </Button>
                      <Button
                        variant="outlined"
                        size="large"
                        startIcon={<CloseOutlinedIcon />}
                        onClick={() => {
                          setUploadedImage(null);
                          setFieldValue("profileImage", null);
                        }}
                      >
                        Reset
                      </Button>
                    </Box>
                    <Typography className="text-[12px] text-[#92929D] mt-2">
                      Allowed JPG, GIF or PNG. Max size of 800K
                    </Typography>
                  </Box>
                </Box>

                {/* Form Fields */}
                <Box className="flex flex-col gap-3">
                  <Box>
                    <Typography className="text-sm text-primary">
                      Name
                    </Typography>
                    <Field
                      as={OutlinedInput}
                      name="name"
                      placeholder="Enter name"
                      fullWidth
                      className="mt-1"
                      error={touched.name && Boolean(errors.name)}
                    />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="text-red-600"
                    />
                  </Box>
                  <Box>
                    <Typography className="text-sm text-primary">
                      Phone Number
                    </Typography>
                    <Field
                      as={OutlinedInput}
                      name="phoneNumber"
                      type="number"
                      placeholder="Enter phone number"
                      fullWidth
                      className="mt-1"
                      startAdornment={
                        <InputAdornment position="start">
                          <Typography className="text-secondary800 text-sm">
                            +91
                          </Typography>
                        </InputAdornment>
                      }
                      error={touched.phoneNumber && Boolean(errors.phoneNumber)}
                    />
                    <ErrorMessage
                      name="phoneNumber"
                      component="div"
                      className="text-red-600"
                    />
                  </Box>
                  <Box>
                    <Typography className="text-sm text-primary">
                      Email
                    </Typography>
                    <Field
                      as={OutlinedInput}
                      name="email"
                      type="email"
                      placeholder="Enter email"
                      fullWidth
                      className="mt-1"
                      error={touched.email && Boolean(errors.email)}
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="text-red-600"
                    />
                  </Box>
                  <Box>
                    <Typography className="text-sm text-primary">
                      Address
                    </Typography>
                    <Field
                      as={OutlinedInput}
                      name="address"
                      placeholder="Enter address"
                      fullWidth
                      className="mt-1"
                      error={touched.address && Boolean(errors.address)}
                    />
                    <ErrorMessage
                      name="address"
                      component="div"
                      className="text-red-600"
                    />
                  </Box>

                  <Box>
                    <Typography className="text-sm text-primary">
                      Employee Shift
                    </Typography>
                    <Field name="employeeShift">
                      {({ field, meta }: any) => (
                        <Select
                          {...field}
                          fullWidth
                          className="mt-1"
                          error={meta.touched && Boolean(meta.error)}
                          displayEmpty
                          inputProps={{
                            "aria-label": "Employee Shift",
                          }}
                        >
                          <MenuItem value="" disabled>
                            Select Shift
                          </MenuItem>
                          <MenuItem value="Day">Day</MenuItem>
                          <MenuItem value="Night">Night</MenuItem>
                        </Select>
                      )}
                    </Field>
                    <ErrorMessage
                      name="employeeShift"
                      component="div"
                      className="text-red-600"
                    />
                  </Box>
                </Box>
              </DialogContent>
              <DialogActions className="mb-[36px] px-9">
                <Button
                  variant="outlined"
                  size="large"
                  startIcon={<CloseOutlinedIcon />}
                  onClick={() => {
                    setUploadedImage(null);
                    onClose();
                  }}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  size="large"
                  startIcon={<CheckCircleIcon className="text-[20px]" />}
                >
                  Save
                </Button>
              </DialogActions>
            </Form>
          )}
        </Formik>
      </Dialog>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        message={snackbarMessage}
      />
    </>
  );
};

export default AddNewEmployeeDialog;
