"use client";

import React from "react";
import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Typography,
  MenuItem,
  Select,
  OutlinedInput,
} from "@mui/material";
import Grid from "@mui/material/Grid2";
import {
  CheckCircleIcon,
  CloseOutlinedIcon,
  KeyboardArrowDownIcon,
} from "../assets";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import {
  createInward,
  editInwardAction,
} from "@/redux/stock_management/stock_management.actions";
import { createOutward } from "@/redux/stock_management/stock_management.actions";


interface StockEntryProps {
  stock: boolean; 
  isEditMode?: boolean; 
  initialValues?: any;
  onClose: () => void;
  onInwardCreated?: () => Promise<void>; 
  onOutwardCreated?: () => Promise<void>; 
  open: boolean; 
}

const AddStockEntryDialog = ({
  stock,
  isEditMode = false,
  initialValues = {
  stockType: "",
  transId: "",
  description: "",
  itemType: "",
  quantity: "",
  unitPrice: "",
  commission: "",
  totalValue: "",
  batchNumber: "",
  receivedBy: "",
  location: "",
  notes: "",
  vendorId: "",
},
  onClose,
  onInwardCreated,
  onOutwardCreated,
  open,
}: StockEntryProps) => {
     initialValues = {
    ...initialValues,
    id: isEditMode ? initialValues.id : undefined,
  };
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch<AppDispatch>();

  // Validation schema
  const validationSchema = Yup.object({
    stockType: Yup.string().required("Stock type is required"),
    transId: stock
    ? Yup.string().required("Transaction ID is required for inward stock")
    : Yup.string(),
     description: Yup.string().required("Description is required"),
    goldType: Yup.string().required("Gold type is required"),
    formOfGold: Yup.string().required("Form of gold is required"),
    quantity: Yup.number()
      .required("Quantity is required")
      .min(1, "Quantity must be greater than 0"),
    purity: Yup.string().required("Purity is required"),
    weight: Yup.number()
      .required("Weight is required")
      .min(1, "Weight must be greater than 0"),
    unitPrice: Yup.number()
      .required("Unit price is required")
      .min(1, "Unit price must be greater than 0"),
    totalValue: Yup.number()
      .required("Total value is required")
      .min(1, "Total value must be greater than 0"),
    buyerName: Yup.string().required("Buyer name is required"),
    commission: Yup.number()
      .required("Commission is required")
      .min(0, "Commission cannot be negative"),
    paymentStatus: Yup.string().required("Payment status is required"),
    amountReceived: Yup.number()
      .required("Amount received is required")
      .min(0, "Amount received cannot be negative"),
    notes: Yup.string().max(500, "Notes cannot exceed 500 characters"),
  });

  // Handle submit
  const handleSubmit = async (values: any, { resetForm }: { resetForm: () => void }) => {
    try {
          const payload = {  
            stockType: stock ? "inward" : "outward",
            transId: values.transId,
            description: values.description,
            itemType: values.itemType,
            quantity: values.quantity,
            unitPrice: values.unitPrice,
            commission: values.commission,
            totalValue: values.totalValue,
            batchNumber: values.batchNumber,
            receivedBy: values.receivedBy,
            location: values.location,
            notes: values.notes,
            vendorId: values.vendorId, 
            ...initialValues,
          };
        if(isEditMode && initialValues ?.id) {
            // Edit Stock entry
            await dispatch(editInwardAction({ id: initialValues.id, ...payload })).unwrap();
      enqueueSnackbar("Stock updated successfully!", { variant: "success" });
      }else{
        if (stock) {
        // Handle inward stock creation
        await dispatch(createInward({ createInwardPayload: payload })).unwrap();
        enqueueSnackbar("Inward stock added successfully!", { variant: "success" });
        if (onInwardCreated) await onInwardCreated();
      } else {
        // Handle outward stock creation
        await dispatch(createOutward({ createOutwardPayload: payload })).unwrap();
        enqueueSnackbar("Outward stock added successfully!", { variant: "success" });
        if (onOutwardCreated) await onOutwardCreated();
      }
    }
      resetForm();
      onClose();
    } catch (error) {
      console.error("Error submitting stock entry:", error);
      enqueueSnackbar("Failed to submit stock entry. Please try again.", {
        variant: "error",
      });
    }
  };

  return (
    <Dialog
      fullWidth
      onClose={onClose}
      aria-labelledby="customized-dialog-title"
      open={open}
      maxWidth="lg"
    >
      <DialogTitle className="flex items-start justify-between px-9 pt-9 pb-6">
        <Box>
          <Typography className="text-2xl leading-6 font-semibold">
            {isEditMode ? "Edit Stock Entry" : "Add Stock Entry"}
          </Typography>
          <Typography className="text-secondary800 mt-2">
            {isEditMode
              ? "Update stock entry details"
              : "Enter details of the new stock entry"}
          </Typography>
        </Box>
        <IconButton onClick={onClose} className="p-0">
          <CloseOutlinedIcon />
        </IconButton>
      </DialogTitle>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ errors, touched }) => (
          <Form>
            <DialogContent className="px-9">
              <Box sx={{ width: "100%" }}>
                <Grid container rowSpacing={1} columnSpacing={1}>
                  {[
                    { name: "stockType", label: "Stock Type", type: "select", options: ["Gold", "Diamond", "Silver"] },
                    { name: "goldType", label: "Gold Type", type: "select", options: ["24K", "22K", "18K"] },
                    { name: "formOfGold", label: "Form of Gold", type: "select", options: ["Bar", "Coin", "Jewelry"] },
                    { name: "quantity", label: "Quantity", type: "number" },
                    { name: "purity", label: "Purity (Karat Rating)", type: "text" },
                    { name: "weight", label: "Weight", type: "number" },
                    { name: "unitPrice", label: "Unit Price", type: "number" },
                    { name: "totalValue", label: "Total Value", type: "number" },
                    { name: "buyerName", label: "Buyer Name", type: "text" },
                    { name: "commission", label: "Commission", type: "number" },
                    { name: "paymentStatus", label: "Payment Status", type: "select", options: ["Paid", "Pending"] },
                    { name: "amountReceived", label: "Amount Received", type: "number" },
                    { name: "notes", label: "Notes (if any)", type: "text" },

                    
                  ].map((field, index) => (
                    <Grid size={6} key={index}>
                      <Box>
                        <Typography className="text-sm text-primary mb-1">{field.label}</Typography>
                        {field.type === "select" ? (
                          <Field as={Select} name={field.name} fullWidth className="mt-1" displayEmpty>
                            <MenuItem value="">Select {field.label}</MenuItem>
                            {field.type === "select" && field.options && (
                                field.options.map((option: string, idx: number) => (
                                    <MenuItem value={option} key={idx}>
                                    {option}
                                    </MenuItem>
                                ))
                                )}

                          </Field>
                        ) : (
                          <Field
                            as={OutlinedInput}
                            name={field.name}
                            type={field.type}
                            placeholder={`Enter ${field.label.toLowerCase()}`}
                            fullWidth
                            className="mt-1"
                          />
                        )}
                        <ErrorMessage
                          name={field.name}
                          component="div"
                          className="text-red-600"
                        />
                      </Box>
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </DialogContent>
            <DialogActions className="mb-[36px] px-9">
              <Button
                variant="outlined"
                size="large"
                startIcon={<CloseOutlinedIcon />}
                onClick={onClose}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                startIcon={<CheckCircleIcon />}
              >
                Save
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default AddStockEntryDialog;
