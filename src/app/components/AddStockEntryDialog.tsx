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
import { CheckCircleIcon, CloseOutlinedIcon } from "../assets";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import {
  createInward,
  editInwardAction,
  editOutwardAction,
} from "@/redux/stock_management/stock_management.actions";
import { createOutward } from "@/redux/stock_management/stock_management.actions";
import {
  inwardStockSchema,
  outwardStockSchema,
} from "@/yupSchema/stockEntrySchema"; // Import the validation schema
import { FieldProps } from "formik";
import { StockManagementInwardModel } from "@/models/req-model/StockManagementInwardModel";
import { StockManagementOutwardModel } from "@/models/req-model/StockManagementOutwardModel";

interface StockEntryProps {
  stock: boolean;
  isEditMode?: boolean;
  initialValues?: StockManagementInwardModel | StockManagementOutwardModel;
  onClose: () => void;
  onInwardCreated?: () => void;
  onOutwardCreated?: () => void;
  open: boolean;
}
const AddStockEntryDialog = ({
  stock,
  isEditMode = false,
  initialValues = {
    id: "",
    transId: "",
    stockType: "",
    itemType: "",
    description: "",
    quantity: 0,
    unitPrice: 0,
    totalValue: 0,
    batchNumber: "",
    commission: 0,
    receivedBy: "",
    supplierName: "",
    location: "",
    notes: "",
    createdBy: "",
    createdDate: "",
    updatedDate: "",
  },
  onClose,
  onInwardCreated,
  onOutwardCreated,
  open,
}: StockEntryProps) => {
  initialValues = {
    ...initialValues,
    id: isEditMode ? initialValues.id : "",
  };
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch<AppDispatch>();
  const validationSchema = stock ? inwardStockSchema : outwardStockSchema;

  // Handle submit
  const handleSubmit = async (
    values: StockManagementInwardModel
    // { resetForm }: { resetForm: () => void }
  ) => {
    console.log("Form Submitted with values: ", values); // Log values

    try {
      const payload = {
        ...values,
        stockType: stock ? "inward" : "outward", // "inward" or "outward" for stock type
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
        createdBy: values.createdBy,
        createdDate: values.createdDate,
        updatedDate: values.updatedDate,
      };

      if (isEditMode && initialValues?.id) {
        // Handle editing for both inward and outward
        if (stock) {
          await dispatch(
            editInwardAction({
              editInwardPayload: payload,
              inwardId: initialValues.id,
            })
          ).unwrap();
          enqueueSnackbar("Inward stock updated successfully!", {
            variant: "success",
          });
        } else {
          await dispatch(
            editOutwardAction({
              editOutwardPayload: payload,
              outwardId: initialValues.id,
            })
          ).unwrap();
          enqueueSnackbar("Outward stock updated successfully!", {
            variant: "success",
          });
        }
      } else {
        // Handle creation for both inward and outward
        if (stock) {
          await dispatch(
            createInward({ createInwardPayload: payload })
          ).unwrap();
          enqueueSnackbar("Inward stock added successfully!", {
            variant: "success",
          });
          if (onInwardCreated) onInwardCreated();
        } else {
          // Handle outward stock creation
          await dispatch(
            createOutward({ createOutwardPayload: payload })
          ).unwrap();
          enqueueSnackbar("Outward stock added successfully!", {
            variant: "success",
          });
          if (onOutwardCreated) onOutwardCreated();
        }
      }
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
        initialValues={initialValues as StockManagementInwardModel} // Type assertion
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ errors, touched, values }) => (
          <Form>
            <DialogContent className="px-9">
              <Box sx={{ width: "100%" }}>
                <Grid container rowSpacing={1} columnSpacing={1}>
                  {/* Stock Type */}
                  <Grid size={6}>
                    <Box>
                      <Typography className="text-sm text-primary mb-1">
                        Stock Type
                      </Typography>
                      <Field name="stockType">
                        {({ field }: FieldProps<any>) => (
                          <Select
                            {...field}
                            fullWidth
                            displayEmpty
                            className="mt-1"
                          >
                            <MenuItem value="">Select Stock Type</MenuItem>
                            <MenuItem value="inward">Inward</MenuItem>
                            <MenuItem value="outward">Outward</MenuItem>
                          </Select>
                        )}
                      </Field>
                      <ErrorMessage
                        name="stockType"
                        component="div"
                        className="text-red-600"
                      />
                    </Box>
                  </Grid>
                  {/* Transaction ID */}
                  <Grid size={6}>
                    <Box>
                      <Typography className="text-sm text-primary mb-1">
                        Transaction ID
                      </Typography>
                      <Field
                        name="transId"
                        as={OutlinedInput}
                        fullWidth
                        className="mt-1"
                      />
                      <ErrorMessage
                        name="transId"
                        component="div"
                        className="text-red-600"
                      />
                    </Box>
                  </Grid>
                  {/* Description */}
                  <Grid size={6}>
                    <Box>
                      <Typography className="text-sm text-primary mb-1">
                        Description
                      </Typography>
                      <Field
                        name="description"
                        as={OutlinedInput}
                        fullWidth
                        className="mt-1"
                      />
                      <ErrorMessage
                        name="description"
                        component="div"
                        className="text-red-600"
                      />
                    </Box>
                  </Grid>
                  {/* Item Type */}
                  <Grid size={6}>
                    <Box>
                      <Typography className="text-sm text-primary mb-1">
                        Item Type
                      </Typography>
                      <Field
                        name="itemType"
                        as={OutlinedInput}
                        fullWidth
                        className="mt-1"
                      />
                      <ErrorMessage
                        name="itemType"
                        component="div"
                        className="text-red-600"
                      />
                    </Box>
                  </Grid>
                  {/* Quantity */}
                  <Grid size={6}>
                    <Box>
                      <Typography className="text-sm text-primary mb-1">
                        Quantity
                      </Typography>
                      <Field
                        name="quantity"
                        as={OutlinedInput}
                        fullWidth
                        type="number"
                        className="mt-1"
                      />
                      <ErrorMessage
                        name="quantity"
                        component="div"
                        className="text-red-600"
                      />
                    </Box>
                  </Grid>
                  {/* Unit Price */}
                  <Grid size={6}>
                    <Box>
                      <Typography className="text-sm text-primary mb-1">
                        Unit Price
                      </Typography>
                      <Field
                        name="unitPrice"
                        as={OutlinedInput}
                        fullWidth
                        type="number"
                        className="mt-1"
                      />
                      <ErrorMessage
                        name="unitPrice"
                        component="div"
                        className="text-red-600"
                      />
                    </Box>
                  </Grid>

                  {/* Commission */}
                  <Grid size={6}>
                    <Box>
                      <Typography className="text-sm text-primary mb-1">
                        Commission
                      </Typography>
                      <Field
                        name="commission"
                        as={OutlinedInput}
                        fullWidth
                        type="number"
                        className="mt-1"
                      />
                      <ErrorMessage
                        name="commission"
                        component="div"
                        className="text-red-600"
                      />
                    </Box>
                  </Grid>
                  {/* Total Value */}
                  <Grid size={6}>
                    <Box>
                      <Typography className="text-sm text-primary mb-1">
                        Total Value
                      </Typography>
                      <Field
                        name="totalValue"
                        as={OutlinedInput}
                        fullWidth
                        type="number"
                        className="mt-1"
                      />
                      <ErrorMessage
                        name="totalValue"
                        component="div"
                        className="text-red-600"
                      />
                    </Box>
                  </Grid>
                  {/* Batch Number */}
                  <Grid size={6}>
                    <Box>
                      <Typography className="text-sm text-primary mb-1">
                        Batch Number
                      </Typography>
                      <Field
                        name="batchNumber"
                        as={OutlinedInput}
                        fullWidth
                        className="mt-1"
                      />
                      <ErrorMessage
                        name="batchNumber"
                        component="div"
                        className="text-red-600"
                      />
                    </Box>
                  </Grid>
                  {/* Received By */}
                  <Grid size={6}>
                    <Box>
                      <Typography className="text-sm text-primary mb-1">
                        Received By
                      </Typography>
                      <Field
                        name="receivedBy"
                        as={OutlinedInput}
                        fullWidth
                        className="mt-1"
                      />
                      <ErrorMessage
                        name="receivedBy"
                        component="div"
                        className="text-red-600"
                      />
                    </Box>
                  </Grid>
                  {/* Location */}
                  <Grid size={6}>
                    <Box>
                      <Typography className="text-sm text-primary mb-1">
                        Location
                      </Typography>
                      <Field
                        name="location"
                        as={OutlinedInput}
                        fullWidth
                        className="mt-1"
                      />
                      <ErrorMessage
                        name="location"
                        component="div"
                        className="text-red-600"
                      />
                    </Box>
                  </Grid>
                  {/* Notes */}
                  <Grid size={6}>
                    <Box>
                      <Typography className="text-sm text-primary mb-1">
                        Notes
                      </Typography>
                      <Field
                        name="notes"
                        as={OutlinedInput}
                        fullWidth
                        className="mt-1"
                      />
                      <ErrorMessage
                        name="notes"
                        component="div"
                        className="text-red-600"
                      />
                    </Box>
                  </Grid>
                  {/* Vendor ID */}
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
                onClick={(e) => handleSubmit(values)}
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
