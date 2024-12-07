"use client";
import React, { useState, useEffect } from "react";
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
import { useSnackbar } from "notistack";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/redux/store";
import {
  createInward,
  createOutward,
  editInwardAction,
  editOutwardAction,
  fetchBuyersAndSuppliers,
  setSelectedVendorId,
} from "@/redux/stock_management/stock_management.actions";
import {
  inwardStockSchema,
  outwardStockSchema,
} from "@/yupSchema/stockEntrySchema"; // Import the validation schema
import { StockManagementInwardModel } from "@/models/req-model/StockManagementInwardModel";
import { StockManagementOutwardModel } from "@/models/req-model/StockManagementOutwardModel";

// Define the type for props
interface AddStockEntryDialogProps {
  open: boolean;
  onClose: () => void;
  isEditMode: boolean;
  initialValues: StockManagementInwardModel | StockManagementOutwardModel;
  stock: boolean; // `true` for inward, `false` for outward
  onInwardCreated?: () => Promise<void>;
  onOutwardCreated?: () => Promise<void>;
}

interface Vendor {
  id: string; // or 'number', depending on how your IDs are structured
  name: string;
}

const AddStockEntryDialog: React.FC<AddStockEntryDialogProps> = (props) => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch<AppDispatch>();

  const [stockType, setStockType] = useState("Gold"); // Default stock type
  const validationSchema = props.stock ? inwardStockSchema : outwardStockSchema;

  // Fetch suppliers/buyers from Redux store
  const buyersAndSuppliers = useSelector((state: any) =>
    props.stock
      ? state.stockManagement.suppliers
      : state.stockManagement.buyers
  );

  const selectedVendorId = useSelector(
    (state: any) => state.stockManagement.selectedVendorId
  );

  interface CustomErrorMessageProps {
    name: string;
  }


  const CustomErrorMessage: React.FC<CustomErrorMessageProps> = ({ name }) => (
    <ErrorMessage name={name}>
      {(msg) => <div style={{ color: "red" }}>{msg}</div>}
    </ErrorMessage>
  );

  useEffect(() => {
    // Fetch suppliers or buyers based on stock type
    if (props.stock) {
      dispatch(fetchBuyersAndSuppliers("supplier"));
    } else {
      dispatch(fetchBuyersAndSuppliers("buyer"));
    }
  }, [dispatch, props.stock]);

  const handleVendorSelect = (e: React.ChangeEvent<{ value: unknown }>) => {
    const vendorId = e.target.value as string;
    dispatch(setSelectedVendorId(vendorId)); // Store the selected vendor ID in Redux
  };

  const handleSubmit = async (
    values: StockManagementInwardModel | StockManagementOutwardModel
  ) => {
    try {
      // payload including vendorId (captured from dropdown)
      const payload = {
        ...values,
        stockType,
        vendor: selectedVendorId,
        supplierName:
          buyersAndSuppliers?.find(
            (item: Vendor) => item.id === selectedVendorId
          )?.name || "",
        buyerName:
          stockType === "outward"
            ? buyersAndSuppliers?.find(
                (item: Vendor) => item.id === selectedVendorId
              )?.name || ""
            : "",
      };

      // create or edit based on whether it's an edit mode or not
      if (props.isEditMode && props.initialValues?.id) {
        if (stockType === "inward") {
          await dispatch(
            editInwardAction({
              editInwardPayload: payload,
              inwardId: props.initialValues.id,
            })
          ).unwrap();
          enqueueSnackbar("Inward stock updated successfully!", {
            variant: "success",
          });
        } else {
          await dispatch(
            editOutwardAction({
              editOutwardPayload: payload,
              outwardId: props.initialValues.id,
            })
          ).unwrap();
          enqueueSnackbar("Outward stock updated successfully!", {
            variant: "success",
          });
        }
      } else {
        if (stockType === "inward") {
          await dispatch(
            createInward({ createInwardPayload: payload })
          ).unwrap();
          enqueueSnackbar("Inward stock added successfully!", {
            variant: "success",
          });
          if (props.onInwardCreated) props.onInwardCreated();
        } else {
          await dispatch(
            createOutward({ createOutwardPayload: payload })
          ).unwrap();
          enqueueSnackbar("Outward stock added successfully!", {
            variant: "success",
          });
          if (props.onOutwardCreated) props.onOutwardCreated();
        }
      }
      props.onClose(); // Close the dialog after submission
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
      onClose={props.onClose}
      aria-labelledby="customized-dialog-title"
      open={props.open}
      maxWidth="lg"
    >
      <DialogTitle className="flex items-start justify-between px-9 pt-9 pb-6">
        <Box>
          <Typography className="text-2xl leading-6 font-semibold">
            Add Stock
          </Typography>
        </Box>
        <IconButton onClick={props.onClose} className="p-0">
          <CloseOutlinedIcon />
        </IconButton>
      </DialogTitle>

      <Formik
        initialValues={props.initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ values, handleChange, handleBlur }) => (
          <Form>
            <DialogContent className="px-9">
              <Box sx={{ width: "100%" }}>
                <Grid container rowSpacing={2} columnSpacing={3}>
                  {/* Stock Type Selection */}
                  <Grid size={6}>
                    <Box>
                      <Typography className="text-sm text-primary mb-1">
                        Stock Type
                      </Typography>
                      <Field
                        as={Select}
                        name="stockType"
                        fullWidth
                        value={stockType || ""}
                        onChange={(
                          e: React.ChangeEvent<{ value: unknown }>
                        ) => {
                          setStockType(e.target.value as string);
                          handleChange(e);
                        }}
                      >
                        <MenuItem value="" disabled>
                          Select Stock Type
                        </MenuItem>
                        <MenuItem value="Gold">Gold</MenuItem>
                        <MenuItem value="Diamond">Diamond</MenuItem>
                        <MenuItem value="Silver">Silver</MenuItem>
                      </Field>
                      <CustomErrorMessage name="stockType" />
                    </Box>
                  </Grid>

                  {/* Dynamic Fields Based on Stock Type */}
                  {stockType === "Gold" &&  (
                    <>
                      <Grid size={6}>
                        <Box>
                          <Typography className="text-sm text-primary mb-1">
                            Gold Type
                          </Typography>
                          <Field as={Select} name="goldType" fullWidth>
                            <MenuItem value="Yellow Gold">Yellow Gold</MenuItem>
                            <MenuItem value="White Gold">White Gold</MenuItem>
                            <MenuItem value="Rose Gold">Rose Gold</MenuItem>
                            <MenuItem value="Green Gold">Green Gold</MenuItem>
                            <MenuItem value="addNew">+ Add New</MenuItem>
                          </Field>
                          <CustomErrorMessage name="goldType" />
                        </Box>
                      </Grid>

                      <Grid size={6}>
                        <Box>
                          <Typography className="text-sm text-primary mb-1">
                            Form of Gold
                          </Typography>
                          <Field
                            as={Select}
                            name="formOfGold"
                            fullWidth
                            placeholder="Enter form of Gold"
                          >
                            <MenuItem value="Bar">Bar</MenuItem>
                            <MenuItem value="Coin">Coin</MenuItem>
                            <MenuItem value="Jewelry">Jewelry</MenuItem>
                            <MenuItem value="Bullion">Bullion</MenuItem>
                            <MenuItem value="Dust/Powder">Dust/Powder</MenuItem>
                            <MenuItem value="addNew">+ Add New</MenuItem>
                          </Field>
                          <CustomErrorMessage name="formOfGold" />
                        </Box>
                      </Grid>

                      <Grid size={6}>
                        <Box>
                          <Typography className="text-sm text-primary mb-1">
                            Quantity
                          </Typography>
                          <Field
                            name="quantity"
                            as={OutlinedInput}
                            fullWidth
                            placeholder="Enter quantity"
                          />
                          <CustomErrorMessage name="quantity" />
                        </Box>
                      </Grid>

                      <Grid size={6}>
                        <Box>
                          <Typography className="text-sm text-primary mb-1">
                            Purity (Karat Rating)
                          </Typography>
                          <Field as={Select} name="purity" fullWidth>
                            <MenuItem value="24K">24K</MenuItem>
                            <MenuItem value="22K">22K</MenuItem>
                            <MenuItem value="18K">18K</MenuItem>
                            <MenuItem value="14K">14K</MenuItem>
                            <MenuItem value="10K">10K</MenuItem>
                            <MenuItem value="addNew">+ Add New</MenuItem>
                          </Field>
                          <CustomErrorMessage name="purity" />
                        </Box>
                      </Grid>

                      <Grid size={6}>
                        <Box>
                          <Typography className="text-sm text-primary mb-1">
                            Weight
                          </Typography>
                          <Field
                            name="weight"
                            as={OutlinedInput}
                            fullWidth
                            placeholder="Enter weight (e.g., 1 kg, 500g)"
                          />
                          <CustomErrorMessage name="weight" />
                        </Box>
                      </Grid>

                      <Grid size={6}>
                        <Box>
                          <Typography className="text-sm text-primary mb-1">
                            Unit Price
                          </Typography>
                          <Field
                            name="unitPrice"
                            as={OutlinedInput}
                            fullWidth
                            placeholder="Enter unit price"
                          />
                          <CustomErrorMessage name="unitPrice" />
                        </Box>
                      </Grid>

                      <Grid size={6}>
                        <Box>
                          <Typography className="text-sm text-primary mb-1">
                            Total Value
                          </Typography>
                          <Field
                            name="totalValue"
                            as={OutlinedInput}
                            fullWidth
                            placeholder="Enter total value"
                          />
                          <CustomErrorMessage name="totalValue" />
                        </Box>
                      </Grid>

                      <Grid size={6}>
                        <Box>
                          <Typography className="text-sm text-primary mb-1">
                            Location
                          </Typography>
                          <Field
                            name="location"
                            as={OutlinedInput}
                            fullWidth
                            placeholder="Enter location"
                          />
                          <CustomErrorMessage name="location" />
                        </Box>
                      </Grid>

                      <Grid size={6}>
                        <Box>
                          <Typography className="text-sm text-primary mb-1">
                            Purchase Margin
                          </Typography>
                          <Field
                            name="purchaseMargin"
                            as={OutlinedInput}
                            fullWidth
                            placeholder="Enter purchase margin"
                          />
                          <CustomErrorMessage name="purchaseMargin" />
                        </Box>
                      </Grid>
                      {/* Vendor Dropdown */}
                      <Grid size={12}>
                        <Box>
                          <Typography className="text-sm text-primary mb-1">
                            {props.stock ? "Supplier Name" : "Buyer Name"}
                          </Typography>
                          <Field
                            as={Select}
                            name="vendor"
                            value={values.vendor || ""}
                            onChange={(
                              e: React.ChangeEvent<{ value: unknown }>
                            ) => {
                              handleChange(e);
                              handleVendorSelect(e);
                            }}
                            onBlur={handleBlur}
                            displayEmpty
                            fullWidth
                            className="mt-1"
                          >
                            {buyersAndSuppliers?.length > 0 ? (
                              buyersAndSuppliers.map((item: Vendor) => (
                                <MenuItem key={item.id} value={item.id}>
                                  {item.name}
                                </MenuItem>
                              ))
                            ) : (
                              <MenuItem value="" disabled>
                                No {props.stock ? "Suppliers" : "Buyers"}{" "}
                                available
                              </MenuItem>
                            )}
                          </Field>
                          <CustomErrorMessage name="vendor" />
                        </Box>
                      </Grid>

                      <Grid size={12}>
                        <Box>
                          <Typography className="text-sm text-primary mb-1">
                            Notes (if any)
                          </Typography>
                          <Field
                            name="notes"
                            as={OutlinedInput}
                            fullWidth
                            placeholder="Enter notes"
                          />
                          <CustomErrorMessage name="notes" />
                        </Box>
                      </Grid>
                    </>
                  )}






                  {stockType === "Diamond" && (
                    <>
                      <Grid size={6}>
                        <Box>
                          <Typography className="text-sm text-primary mb-1">
                            Diamond Type
                          </Typography>
                          <Field as={Select} name="diamondType" fullWidth>
                            <MenuItem value="Round">Round</MenuItem>
                            <MenuItem value="Princess">Princess</MenuItem>
                            <MenuItem value="Emerald">Emerald</MenuItem>
                            <MenuItem value="Cushion">Cushion</MenuItem>
                            <MenuItem value="Asscher">Asscher</MenuItem>
                            <MenuItem value="Oval">Oval</MenuItem>
                            <MenuItem value="Radiant">Radiant</MenuItem>
                            <MenuItem value="addNew">+ Add New</MenuItem>
                          </Field>
                          <CustomErrorMessage name="diamondType" />
                        </Box>
                      </Grid>

                      <Grid size={6}>
                        <Box>
                          <Typography className="text-sm text-primary mb-1">
                            Carat Weight
                          </Typography>
                          <Field
                            name="caratWeight"
                            as={OutlinedInput}
                            fullWidth
                            placeholder="e.g., 1.50"
                          />
                          <CustomErrorMessage name="caratWeight" />
                        </Box>
                      </Grid>

                      <Grid size={6}>
                        <Box>
                          <Typography className="text-sm text-primary mb-1">
                            Select Clarity
                          </Typography>
                          <Field as={Select} name="clarity" fullWidth>
                            <MenuItem value="FL">FL (Flawless)</MenuItem>
                            <MenuItem value="IF">
                              IF (Internally Flawless)
                            </MenuItem>
                            <MenuItem value="VVS1">VVS1</MenuItem>
                            <MenuItem value="VVS2">VVS2</MenuItem>
                            <MenuItem value="addNew">+ Add New</MenuItem>
                          </Field>
                          <CustomErrorMessage name="clarity" />
                        </Box>
                      </Grid>

                      <Grid size={6}>
                        <Box>
                          <Typography className="text-sm text-primary mb-1">
                            Color Grade
                          </Typography>
                          <Field as={Select} name="colorGrade" fullWidth>
                            <MenuItem value="D">D (Colorless)</MenuItem>
                            <MenuItem value="E">E (Colorless)</MenuItem>
                            <MenuItem value="F">F (Colorless)</MenuItem>
                            <MenuItem value="addNew">+ Add New</MenuItem>
                          </Field>
                          <CustomErrorMessage name="colorGrade" />
                        </Box>
                      </Grid>

                      <Grid size={6}>
                        <Box>
                          <Typography className="text-sm text-primary mb-1">
                            Cut Grade
                          </Typography>
                          <Field as={Select} name="cutGrade" fullWidth>
                            <MenuItem value="Very Good">Very Good</MenuItem>
                            <MenuItem value="Good">Good</MenuItem>
                            <MenuItem value="Fair">Fair</MenuItem>
                            <MenuItem value="addNew">+ Add New</MenuItem>
                          </Field>
                          <CustomErrorMessage name="cutGrade" />
                        </Box>
                      </Grid>

                      <Grid size={6}>
                        <Box>
                          <Typography className="text-sm text-primary mb-1">
                            Unit Price
                          </Typography>
                          <Field
                            name="unitPrice"
                            as={OutlinedInput}
                            fullWidth
                            placeholder="Enter unit price"
                          />
                          <CustomErrorMessage name="unitPrice" />
                        </Box>
                      </Grid>

                      <Grid size={6}>
                        <Box>
                          <Typography className="text-sm text-primary mb-1">
                            Total Value
                          </Typography>
                          <Field
                            name="totalValue"
                            as={OutlinedInput}
                            fullWidth
                            placeholder="Enter total value"
                          />
                          <CustomErrorMessage name="totalValue" />
                        </Box>
                      </Grid>

                      <Grid size={6}>
                        <Box>
                          <Typography className="text-sm text-primary mb-1">
                            Location
                          </Typography>
                          <Field
                            name="location"
                            as={OutlinedInput}
                            fullWidth
                            placeholder="Enter location"
                          />
                          <CustomErrorMessage name="location" />
                        </Box>
                      </Grid>

                      <Grid size={6}>
                        <Box>
                          <Typography className="text-sm text-primary mb-1">
                            Purchase Margin
                          </Typography>
                          <Field
                            name="purchaseMargin"
                            as={OutlinedInput}
                            fullWidth
                            placeholder="Enter purchase margin"
                          />
                          <CustomErrorMessage name="purchaseMargin" />
                        </Box>
                      </Grid>

                      <Grid size={12}>
                        <Box>
                          <Typography className="text-sm text-primary mb-1">
                            {props.stock ? "Supplier Name" : "Buyer Name"}
                          </Typography>
                          <Field
                            as={Select}
                            name="vendor"
                            value={values.vendor || ""}
                            onChange={(
                              e: React.ChangeEvent<{ value: unknown }>
                            ) => {
                              handleChange(e);
                              handleVendorSelect(e);
                            }}
                            onBlur={handleBlur}
                            displayEmpty
                            fullWidth
                            className="mt-1"
                          >
                            {buyersAndSuppliers?.length > 0 ? (
                              buyersAndSuppliers.map((item: Vendor) => (
                                <MenuItem key={item.id} value={item.id}>
                                  {item.name}
                                </MenuItem>
                              ))
                            ) : (
                              <MenuItem value="" disabled>
                                No {props.stock ? "Suppliers" : "Buyers"}{" "}
                                available
                              </MenuItem>
                            )}
                          </Field>
                          <CustomErrorMessage name="vendor" />
                        </Box>
                      </Grid>

                      <Grid size={12}>
                        <Box>
                          <Typography className="text-sm text-primary mb-1">
                            Notes (if any)
                          </Typography>
                          <Field
                            name="notes"
                            as={OutlinedInput}
                            fullWidth
                            placeholder="Enter notes"
                          />
                          <CustomErrorMessage name="notes" />
                        </Box>
                      </Grid>
                    </>
                  )}

                  {stockType === "Silver" && (
                    <>
                      <Grid size={6}>
                        <Box>
                          <Typography className="text-sm text-primary mb-1">
                            Silver Type
                          </Typography>
                          <Field as={Select} name="silverType" fullWidth>
                            <MenuItem value="Sterling">Sterling</MenuItem>
                            <MenuItem value="Argentium">Argentium</MenuItem>
                            <MenuItem value="Coin Silver">Coin Silver</MenuItem>
                            <MenuItem value="addNew">+ Add New</MenuItem>
                          </Field>
                          <CustomErrorMessage name="silverType" />
                        </Box>
                      </Grid>

                      <Grid size={6}>
                        <Box>
                          <Typography className="text-sm text-primary mb-1">
                            Carat Weight
                          </Typography>
                          <Field
                            name="caratWeight"
                            as={OutlinedInput}
                            fullWidth
                            placeholder="e.g., 1.50"
                          />
                          <CustomErrorMessage name="caratWeight" />
                        </Box>
                      </Grid>


                       <Grid size={6}>
                        <Box>
                          <Typography className="text-sm text-primary mb-1">
                            Select Clarity
                          </Typography>
                          <Field as={Select} name="clarity" fullWidth>
                            <MenuItem value="FL">FL (Flawless)</MenuItem>
                            <MenuItem value="IF">
                              IF (Internally Flawless)
                            </MenuItem>
                            <MenuItem value="VVS1">VVS1</MenuItem>
                            <MenuItem value="VVS2">VVS2</MenuItem>
                            <MenuItem value="addNew">+ Add New</MenuItem>
                          </Field>
                          <CustomErrorMessage name="clarity" />
                        </Box>
                      </Grid>






                      <Grid size={6}>
                        <Box>
                          <Typography className="text-sm text-primary mb-1">
                            Quantity
                          </Typography>
                          <Field
                            name="quantity"
                            as={OutlinedInput}
                            fullWidth
                            placeholder="Enter quantity"
                          />
                          <CustomErrorMessage name="quantity" />
                        </Box>
                      </Grid>

                      <Grid size={6}>
                        <Box>
                          <Typography className="text-sm text-primary mb-1">
                            Weight
                          </Typography>
                          <Field
                            name="weight"
                            as={OutlinedInput}
                            fullWidth
                            placeholder="Enter weight (e.g., 1 kg, 500g)"
                          />
                          <CustomErrorMessage name="weight" />
                        </Box>
                      </Grid>

                      <Grid size={6}>
                        <Box>
                          <Typography className="text-sm text-primary mb-1">
                            Unit Price
                          </Typography>
                          <Field
                            name="unitPrice"
                            as={OutlinedInput}
                            fullWidth
                            placeholder="Enter unit price"
                          />
                          <CustomErrorMessage name="unitPrice" />
                        </Box>
                      </Grid>

                      <Grid size={6}>
                        <Box>
                          <Typography className="text-sm text-primary mb-1">
                            Total Value
                          </Typography>
                          <Field
                            name="totalValue"
                            as={OutlinedInput}
                            fullWidth
                            placeholder="Enter total value"
                          />
                          <CustomErrorMessage name="totalValue" />
                        </Box>
                      </Grid>

                      <Grid size={6}>
                        <Box>
                          <Typography className="text-sm text-primary mb-1">
                            Location
                          </Typography>
                          <Field
                            name="location"
                            as={OutlinedInput}
                            fullWidth
                            placeholder="Enter location"
                          />
                          <CustomErrorMessage name="location" />
                        </Box>
                      </Grid>

                      <Grid size={6}>
                        <Box>
                          <Typography className="text-sm text-primary mb-1">
                            Purchase Margin
                          </Typography>
                          <Field
                            name="purchaseMargin"
                            as={OutlinedInput}
                            fullWidth
                            placeholder="Enter purchase margin"
                          />
                          <CustomErrorMessage name="purchaseMargin" />
                        </Box>
                      </Grid>

                      <Grid size={12}>
                        <Box>
                          <Typography className="text-sm text-primary mb-1">
                            {props.stock ? "Supplier Name" : "Buyer Name"}
                          </Typography>
                          <Field
                            as={Select}
                            name="vendor"
                            value={values.vendor || ""}
                            onChange={(
                              e: React.ChangeEvent<{ value: unknown }>
                            ) => {
                              handleChange(e);
                              handleVendorSelect(e);
                            }}
                            onBlur={handleBlur}
                            displayEmpty
                            fullWidth
                            className="mt-1"
                          >
                            {buyersAndSuppliers?.length > 0 ? (
                              buyersAndSuppliers.map((item: Vendor) => (
                                <MenuItem key={item.id} value={item.id}>
                                  {item.name}
                                </MenuItem>
                              ))
                            ) : (
                              <MenuItem value="" disabled>
                                No {props.stock ? "Suppliers" : "Buyers"}{" "}
                                available
                              </MenuItem>
                            )}
                          </Field>
                          <CustomErrorMessage name="vendor" />
                        </Box>
                      </Grid>

                      <Grid size={12}>
                        <Box>
                          <Typography className="text-sm text-primary mb-1">
                            Notes (if any)
                          </Typography>
                          <Field
                            name="notes"
                            as={OutlinedInput}
                            fullWidth
                            placeholder="Enter notes"
                          />
                          <CustomErrorMessage name="notes" />
                        </Box>
                      </Grid>
                    </>
                  )}
                </Grid>
              </Box>
            </DialogContent>

            <DialogActions className="mb-[36px] px-9">
              <Button
                variant="outlined"
                size="large"
                startIcon={<CloseOutlinedIcon />}
                onClick={props.onClose}
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