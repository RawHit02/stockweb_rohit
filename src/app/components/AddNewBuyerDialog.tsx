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
} from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import {
  createBuyer,
} from "@/redux/vendor_management/vendor_management.actions";
import { addBuyerSchema } from "@/yupSchema/addBuyerSchema";
import { editBuyerAction } from "@/redux/vendor_management/vendor_management.actions";
import { useSnackbar } from "notistack";

//import * as Yup from "yup";
import Image from "next/image";
import {
 // AddCircleOutlineOutlinedIcon,
  CheckCircleIcon,
  CloseOutlinedIcon,
  FileUploadOutlinedIcon,
  UploadImageIcon,
} from "../assets";

export interface BuyerFormValues {
  id? : string; 
  name: string;
  contactNumber: string;
  whatsappNumber: string;
  email: string;
  address: string;
  profileImage: File | null;
}


interface AddNewBuyerDialogProps {
  onBuyerCreated?: () => void;
  initialValues?: BuyerFormValues; // Prefilled data
  isEditMode?: boolean;           // differentiate between add/edit
  open : boolean;
  onClose : () => void;
}


const AddNewBuyerDialog: React.FC<AddNewBuyerDialogProps > = ({
  onBuyerCreated,
  initialValues = {
     id: undefined,
    name: "",
    contactNumber: "",
    whatsappNumber: "",
    email: "",
    address: "",
    profileImage: null,
   } ,
  isEditMode = false, 
  open,
  onClose,
}) =>{
  const { enqueueSnackbar } = useSnackbar();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage] = useState("");
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);


  const dispatch = useDispatch<AppDispatch>();

  const handleSnackbarClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === 'clickaway') {
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
    values: BuyerFormValues,
    { resetForm }: { resetForm: () => void }
  ) => {
    try {
      if(isEditMode && initialValues?.id){
        // Edit Buyer
        const editPayload = {
          buyerId: initialValues.id, // Use the id from initialValues
          editBuyerPayload : {
           vendorType: "buyer", 
            name : values.name,
             contactNumber: values.contactNumber.startsWith("+91")
            ? values.contactNumber 
            : `+91${values.contactNumber}`, 
          whatsappNumber: values.whatsappNumber.startsWith("+91")
            ? values.whatsappNumber
            : `+91${values.whatsappNumber}`,
            email : values.email,
            address : values.address,
          },
        };
        await dispatch(editBuyerAction(editPayload)).unwrap();
        enqueueSnackbar("Buyer updated successfully!", { variant: "success" });
      }else{
        // Add Buyer
        const buyerPayload = {
        vendorType: "buyer", // Buyer type
        name: values.name,
        contactNumber: values.contactNumber,
        whatsappNumber: values.whatsappNumber,
        email: values.email,
        address: values.address,
      }
      await dispatch(createBuyer({ createBuyerPayload: buyerPayload })).unwrap();
      enqueueSnackbar("Buyer added successfully!", { variant: "success" });
      }

      // Reset form and close dialog
      resetForm();
      setUploadedImage(null);
      setSnackbarOpen(true);
      onClose();

      // Refresh list on success
      if(onBuyerCreated) onBuyerCreated();
    } catch (error: any) {
      console.error("Failed to add buyer:", error);
      enqueueSnackbar(error?.message || "Failed to add buyer", {
        variant: "error",
      });
      setSnackbarOpen(true);
    }
  };

  return (
    <>
      <Dialog
      open = {open}
        onClose={onClose}
        aria-labelledby="customized-dialog-title"
        maxWidth="sm"
      >
        <DialogTitle className="flex items-start justify-between px-9 pt-9 pb-6">
          <Box>
            <Typography className="text-2xl leading-6 font-semibold">
              Add New Buyer
            </Typography>
            <Typography className="text-secondary800 mt-2">
              Enter details of your Vendor
            </Typography>
          </Box>
          <IconButton onClick={onClose} className="p-0">
            <CloseOutlinedIcon />
          </IconButton>
        </DialogTitle>

        <Formik
              initialValues={{
              name: initialValues?.name || "",
              contactNumber: initialValues?.contactNumber?.startsWith("+91")
                ? initialValues.contactNumber.slice(3)
                : initialValues?.contactNumber || "",
              whatsappNumber: initialValues?.whatsappNumber?.startsWith("+91")
                ? initialValues.whatsappNumber.slice(3) 
                : initialValues?.whatsappNumber || "",
              email: initialValues?.email || "",
              address: initialValues?.address || "",
              profileImage: initialValues?.profileImage || null,
            }}
            validationSchema={addBuyerSchema}
            onSubmit={handleSubmit}
            enableReinitialize 
          >
          {({ touched, errors, setFieldValue, resetForm }) => (
            <Form>
              <DialogContent className="!px-9 !pt-0">
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
                      className="text-red-600 text-[12px]"
                    />
                  </Box>
                  <Box>
                    <Typography className="text-sm text-primary">
                      Contact Number
                    </Typography>
                    <Field
                      as={OutlinedInput}
                      name="contactNumber"
                      type = "number"
                      placeholder="Enter contact number"
                      fullWidth
                      className="mt-1"
                      startAdornment={
                        <InputAdornment position="start">
                          <Typography className="text-secondary800 text-sm">
                            +91
                          </Typography>
                        </InputAdornment>
                      }
                      error={
                        touched.contactNumber && Boolean(errors.contactNumber)
                      }
                    />
                    <ErrorMessage
                      name="contactNumber"
                      component="div"
                      className="text-red-600 text-[12px]"
                    />
                  </Box>
                  <Box>
                    <Typography className="text-sm text-primary">
                      WhatsApp Number
                    </Typography>
                    <Field
                      as={OutlinedInput}
                      name="whatsappNumber"
                      type = "number"
                      placeholder="Enter WhatsApp number"
                      fullWidth
                      className="mt-1"
                      startAdornment={
                        <InputAdornment position="start">
                          <Typography className="text-secondary800 text-sm">
                            +91
                          </Typography>
                        </InputAdornment>
                      }
                      error={
                        touched.whatsappNumber && Boolean(errors.whatsappNumber)
                      }
                    />
                    <ErrorMessage
                      name="whatsappNumber"
                      component="div"
                      className="text-red-600 text-[12px]"
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
                      className="text-red-600 text-[12px]"
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
                      className="text-red-600 text-[12px]"
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
                      resetForm({
                        values: {
                          name: initialValues?.name || "",
                          contactNumber: initialValues?.contactNumber || "",
                          whatsappNumber: initialValues?.whatsappNumber || "",
                          email: initialValues?.email || "",
                          address: initialValues?.address || "",
                          profileImage: initialValues?.profileImage || null,
                        },
                      });
                    setUploadedImage(null);
                  }}
                >
                  Reset
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

export default AddNewBuyerDialog;