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
import Image from "next/image";
import {
    AddCircleOutlineOutlinedIcon,
    CheckCircleIcon,
    CloseOutlinedIcon,
    FileUploadOutlinedIcon,
    UploadImageIcon,
} from "../assets";
import { addBuyerSchema } from "@/yupSchema/addBuyerSchema";

// Define types for Formik's values
interface BuyerFormValues {
    name: string;
    contactNumber: string;
    whatsappNumber: string;
    email: string;
    address: string;
    profileImage: File | null;
}

const AddNewBuyerDialog = () => {
    const [open, setOpen] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [uploadedImage, setUploadedImage] = useState<string | null>(null); // Allow 'string' or 'null' for URL

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    };

    // Handle image upload with preview
    const handleImageUpload = (
        event: React.ChangeEvent<HTMLInputElement>,
        setFieldValue: (field: string, value: any) => void
    ) => {
        const file = event.currentTarget.files ? event.currentTarget.files[0] : null;
        if (file) {
            setFieldValue("profileImage", file);
            const imageUrl = URL.createObjectURL(file);
            setUploadedImage(imageUrl); // Set preview image URL
        }
    };

    // Handle form submission
    const handleSubmit = (values: BuyerFormValues, { resetForm }: { resetForm: () => void }) => {
        console.log("Form submitted with values: ", values);
        resetForm();
        setUploadedImage(null);
        setSnackbarOpen(true);
        handleClose();
    };

    return (
        <>
            <Button variant='contained' className='bg-primary500 rounded-lg h-10 text-base' startIcon={<AddCircleOutlineOutlinedIcon />} onClick={handleClickOpen}>ADD BUYER</Button>
            <Dialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
                maxWidth="sm"
            >
                <DialogTitle className="flex items-start justify-between px-9 pt-9 pb-6">
                    <Box>
                        
                        <Typography className='text-2xl leading-6 font-semibold'>Add New Buyer</Typography>
                        <Typography className='text-secondary800 mt-2'>Enter details of your Vendor</Typography>

                    </Box>
                    <IconButton onClick={handleClose} className="p-0">
                        <CloseOutlinedIcon />
                    </IconButton>
                </DialogTitle>
                
                <Formik
                    initialValues={{
                        name: "",
                        contactNumber: "",
                        whatsappNumber: "",
                        email: "",
                        address: "",
                        profileImage: null,
                    }}
                    validationSchema={addBuyerSchema}
                    onSubmit={handleSubmit}
                >
                    {({ touched, errors, setFieldValue, resetForm }) => (
                        <Form>
                            <DialogContent className="px-9">
                                {/* Profile Picture Upload */}
                                <Box className="flex items-center gap-6">
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
                                            onChange={(event) => handleImageUpload(event, setFieldValue)}
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
                                                    onChange={(event) => handleImageUpload(event, setFieldValue)}
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
                                <Box className="flex flex-col w-full gap-3 mt-3">
                                    {/* Name Field */}
                                    <Box>
                                        <Typography className="text-sm text-primary">Name</Typography>
                                        <Field
                                            as={OutlinedInput}
                                            name="name"
                                            placeholder="Enter here"
                                            fullWidth
                                            className="mt-1"
                                            error={touched.name && Boolean(errors.name)}
                                        />
                                        <ErrorMessage name="name" component="div" className="text-red-600" />
                                    </Box>
                                    
                                    {/* Contact Number Field */}
                                    <Box>
                                        <Typography className="text-sm text-primary">Contact Number</Typography>
                                        <Field
                                            as={OutlinedInput}
                                            name="contactNumber"
                                            placeholder="Enter here"
                                            fullWidth
                                            className="mt-1"
                                            startAdornment={<InputAdornment position="start"><Typography className="text-secondary800 text-sm">+1</Typography></InputAdornment>}
                                            error={touched.contactNumber && Boolean(errors.contactNumber)}
                                        />
                                        <ErrorMessage name="contactNumber" component="div" className="text-red-600" />
                                    </Box>

                                    {/* WhatsApp Number Field */}
                                    <Box>
                                        <Typography className="text-sm text-primary">WhatsApp Number</Typography>
                                        <Field
                                            as={OutlinedInput}
                                            name="whatsappNumber"
                                            placeholder="Enter here"
                                            fullWidth
                                            className="mt-1"
                                            startAdornment={<InputAdornment position="start"><Typography className="text-secondary800 text-sm">+1</Typography></InputAdornment>}
                                            error={touched.whatsappNumber && Boolean(errors.whatsappNumber)}
                                        />
                                        <ErrorMessage name="whatsappNumber" component="div" className="text-red-600" />
                                    </Box>

                                    {/* Email Field */}
                                    <Box>
                                        <Typography className="text-sm text-primary">Email</Typography>
                                        <Field
                                            as={OutlinedInput}
                                            name="email"
                                            type="email"
                                            placeholder="Enter here"
                                            fullWidth
                                            className="mt-1"
                                            error={touched.email && Boolean(errors.email)}
                                        />
                                        <ErrorMessage name="email" component="div" className="text-red-600" />
                                    </Box>

                                    {/* Address Field */}
                                    <Box>
                                        <Typography className="text-sm text-primary">Address</Typography>
                                        <Field
                                            as={OutlinedInput}
                                            name="address"
                                            placeholder="Enter address here"
                                            fullWidth
                                            className="mt-1"
                                            error={touched.address && Boolean(errors.address)}
                                        />
                                        <ErrorMessage name="address" component="div" className="text-red-600" />
                                    </Box>
                                </Box>
                            </DialogContent>
                            
                            <DialogActions className="mb-[36px] px-9">
                                <Button
                                    variant="outlined"
                                    size="large"
                                    startIcon={<CloseOutlinedIcon />}
                                    onClick={() => {
                                        resetForm();
                                        setUploadedImage(null);
                                    }}
                                >
                                    Reset
                                </Button>
                                <Button type="submit" variant="contained" color="primary" size="large" startIcon={<CheckCircleIcon className="text-[20px]" />}>
                                    Save
                                </Button>
                            </DialogActions>
                        </Form>
                    )}
                </Formik>
            </Dialog>

            {/* Snackbar for success message */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={handleSnackbarClose}
                message="Buyer added successfully"
            />
        </>
    );
};

export default AddNewBuyerDialog;
