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
import {
  CreateStockInwardPayload,
  StockManagementInwardModel,
} from "@/models/req-model/StockManagementInwardModel";
import { StockManagementOutwardModel } from "@/models/req-model/StockManagementOutwardModel";
import AddNewItem from "./AddNewItem";

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
    props.stock ? state.stockManagement.suppliers : state.stockManagement.buyers
  );

  const selectedVendorId = useSelector(
    (state: any) => state.stockManagement.selectedVendorId
  );

  const [goldTypes, setGoldTypes] = useState([
    "Yellow Gold",
    "White Gold",
    "Rose Gold",
    "Green Gold",
  ]);
  const [formOfGold, setFormOfGold] = useState(["Bar", "Coin", "Jewellery"]); // State for form of gold

  const [diamondTypes, setDiamondTypes] = useState([
    "Round",
    "Princess",
    "Emerald",
    "Cushion",
    "Asscher",
    "Oval",
    "Radiant",
  ]);

  const [diamondClarity, setDiamondClarity] = useState([
    "IF",
    "VVS1",
    "VVS2",
    "VS1",
    "VS2",
    "SI1",
    "SI2",
  ]);

  const [diamondColorGrade, setDiamondColorGrade] = useState([
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
  ]);

  const [diamondCutGrade, setDiamondCutGrade] = useState([
    "Excellent",
    "Very Good",
    "Good",
    "Fair",
    "Poor",
  ]);

  const [silverTypes, setSilverTypes] = useState([
    "Sterling",
    "Argentium",
    "Coin Silver",
  ]);

  const [silverClarity, setSilverClarity] = useState([
    "IF",
    "VVS1",
    "VVS2",
    "VS1",
    "VS2",
    "SI1",
    "SI2",
  ]);

  const [purities, setPurities] = useState(["24K", "22K", "18K", "14K", "10K"]);

  const addGoldType = (newType: string) => {
    setGoldTypes((prev) => [...prev, newType]);
  };

  const addFormOfGold = (newType: string) => {
    setFormOfGold((prev) => [...prev, newType]); // Function to add new form of gold
  };

  const addDiamondType = (newType: string) => {
    setDiamondTypes((prev) => [...prev, newType]);
  };

  const addDiamondClarity = (newClarity: string) => {
    setDiamondClarity((prev) => [...prev, newClarity]);
  };

  const addDiamondColorGrade = (newColorGrade: string) => {
    setDiamondColorGrade((prev) => [...prev, newColorGrade]);
  };

  const addDiamondCutGrade = (newCutGrade: string) => {
    setDiamondCutGrade((prev) => [...prev, newCutGrade]);
  };

  const addSilverClarity = (newClarity: string) => {
    setSilverClarity((prev) => [...prev, newClarity]);
  };

  const addSilverType = (newType: string) => {
    setSilverTypes((prev) => [...prev, newType]);
  };

  const [goldFormTypes, setGoldFormTypes] = useState([""]);
  const addGoldForm = (newType: string) => {
    setGoldFormTypes((prev) => [...prev, newType]);
  };

  const [diamondFormTypes, setDiamondFormTypes] = useState([""]);
  const addDiamondForm = (newType: string) => {
    setDiamondFormTypes((prev) => [...prev, newType]);
  };

  const [silverFormTypes, setSilverFormTypes] = useState([""]);
  const addSilverForm = (newType: string) => {
    setSilverFormTypes((prev) => [...prev, newType]);
  };

  const addPurity = (newPurity: string) => {
    setPurities((prev) => [...prev, newPurity]);
  };

  const addCutGrade = (newPurity: string) => {
    setPurities((prev) => [...prev, newPurity]);
  };

  const addClarity = (newPurity: string) => {
    setPurities((prev) => [...prev, newPurity]);
  };

  const addColorGrade = (newPurity: string) => {
    setPurities((prev) => [...prev, newPurity]);
  };

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
      const payload: CreateStockInwardPayload = {
        ...values,
        vendor: selectedVendorId,
      };

      // create or edit based on whether it's an edit mode or not
      if (props.isEditMode && props.initialValues?.id) {
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
        // await dispatch(createInward({ createInwardPayload: payload })).unwrap();
        await dispatch(createInward()).unwrap();
        enqueueSnackbar("Inward stock added successfully!", {
          variant: "success",
        });
        if (props.onInwardCreated) props.onInwardCreated();
      }
      props.onClose();
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
            Add New Stock
          </Typography>
          <Typography className="text-secondary800 mt-2">
            Enter details of new stock
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
                  {stockType === "Gold" && (
                    <>
                      <Grid size={6}>
                        <Box>
                          <Typography className="text-sm text-primary mb-1">
                            Gold Type
                          </Typography>
                          <Field as={Select} name="goldType" fullWidth>
                            {goldTypes.map((type) => (
                              <MenuItem key={type} value={type}>
                                {type}
                              </MenuItem>
                            ))}
                            <MenuItem className=" flex flex-row justify-center w-full">
                              <AddNewItem onAddItem={addGoldType} />
                            </MenuItem>
                          </Field>
                          <CustomErrorMessage name="goldType" />
                        </Box>
                      </Grid>

                      <Grid size={6}>
                        <Box>
                          <Typography className="text-sm text-primary mb-1">
                            Form of Gold
                          </Typography>
                          <Field as={Select} name="formOfGold" fullWidth>
                            {formOfGold.map((type) => (
                              <MenuItem key={type} value={type}>
                                {type}
                              </MenuItem>
                            ))}
                            <MenuItem className=" flex flex-row justify-center w-full">
                              <AddNewItem onAddItem={addFormOfGold} />
                            </MenuItem>
                            {/* <AddNewItem onAddItem={addFormOfGold} />{" "} */}
                            {/* Use the correct function */}
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
                            {purities.map((type) => (
                              <MenuItem key={type} value={type}>
                                {type}
                              </MenuItem>
                            ))}
                            <MenuItem className=" flex flex-row justify-center w-full">
                              <AddNewItem onAddItem={addPurity} />
                            </MenuItem>{" "}
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

                      {props.stock && (
                        <>
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
                        </>
                      )}

                      <Grid size={props.stock ? 12 : 6}>
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

                      {!props.stock && (
                        <Grid size={6}>
                          <Box>
                            <Typography className="text-sm text-primary mb-1">
                              Commission
                            </Typography>
                            <Field
                              name="commission"
                              as={OutlinedInput}
                              fullWidth
                              placeholder="Enter commission"
                            />
                            <CustomErrorMessage name="commission" />
                          </Box>
                        </Grid>
                      )}

                      {!props.stock && (
                        <Grid size={6}>
                          <Box>
                            <Typography className="text-sm text-primary mb-1">
                              Payment Status
                            </Typography>
                            <Field as={Select} name="paymentStatus" fullWidth>
                              <MenuItem value="pending">Pending</MenuItem>
                              <MenuItem value="completed">Completed</MenuItem>
                              <MenuItem value="partial">partial done</MenuItem>
                            </Field>
                            <CustomErrorMessage name="paymentStatus" />
                          </Box>
                        </Grid>
                      )}

                      {!props.stock && (
                        <Grid size={6}>
                          <Box>
                            <Typography className="text-sm text-primary mb-1">
                              Amount Received
                            </Typography>
                            <Field
                              name="amountReceived"
                              as={OutlinedInput}
                              fullWidth
                              placeholder="Enter Amount"
                            />
                            <CustomErrorMessage name="amountReceived" />
                          </Box>
                        </Grid>
                      )}

                      {/* Vendor Dropdown */}

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

                  {/* Diamond type */}

                  {stockType === "Diamond" && (
                    <>
                      <Grid size={6}>
                        <Box>
                          <Typography className="text-sm text-primary mb-1">
                            Diamond Type
                          </Typography>
                          <Field as={Select} name="diamondType" fullWidth>
                            {diamondTypes.map((type) => (
                              <MenuItem key={type} value={type}>
                                {type}
                              </MenuItem>
                            ))}
                            <MenuItem className=" flex flex-row justify-center w-full">
                              <AddNewItem onAddItem={addDiamondType} />
                            </MenuItem>
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
                            {diamondClarity.map((clarity) => (
                              <MenuItem key={clarity} value={clarity}>
                                {clarity}
                              </MenuItem>
                            ))}
                            <MenuItem className=" flex flex-row justify-center w-full">
                              <AddNewItem onAddItem={addDiamondClarity} />
                            </MenuItem>
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
                            {diamondColorGrade.map((color) => (
                              <MenuItem key={color} value={color}>
                                {color}
                              </MenuItem>
                            ))}

                            <MenuItem className=" flex flex-row justify-center w-full">
                              <AddNewItem onAddItem={addDiamondColorGrade} />
                            </MenuItem>
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
                            {diamondCutGrade.map((cut) => (
                              <MenuItem key={cut} value={cut}>
                                {cut}
                              </MenuItem>
                            ))}
                            <MenuItem className=" flex flex-row justify-center w-full">
                              <AddNewItem onAddItem={addDiamondCutGrade} />
                            </MenuItem>
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

                      {props.stock && (
                        <>
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
                        </>
                      )}

                      <Grid size={props.stock ? 12 : 6}>
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

                      {!props.stock && (
                        <Grid size={6}>
                          <Box>
                            <Typography className="text-sm text-primary mb-1">
                              Commission
                            </Typography>
                            <Field
                              name="commission"
                              as={OutlinedInput}
                              fullWidth
                              placeholder="Enter commission"
                            />
                            <CustomErrorMessage name="commission" />
                          </Box>
                        </Grid>
                      )}

                      {!props.stock && (
                        <Grid size={6}>
                          <Box>
                            <Typography className="text-sm text-primary mb-1">
                              Payment Status
                            </Typography>
                            <Field as={Select} name="paymentStatus" fullWidth>
                              <MenuItem value="pending">Pending</MenuItem>
                              <MenuItem value="completed">Completed</MenuItem>
                              <MenuItem value="partial">partial done</MenuItem>
                            </Field>
                            <CustomErrorMessage name="paymentStatus" />
                          </Box>
                        </Grid>
                      )}

                      {!props.stock && (
                        <Grid size={6}>
                          <Box>
                            <Typography className="text-sm text-primary mb-1">
                              Amount Received
                            </Typography>
                            <Field
                              name="amountReceived"
                              as={OutlinedInput}
                              fullWidth
                              placeholder="Enter Amount"
                            />
                            <CustomErrorMessage name="amountReceived" />
                          </Box>
                        </Grid>
                      )}

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

                  {/* Silver type  */}
                  {stockType === "Silver" && (
                    <>
                      <Grid size={6}>
                        <Box>
                          <Typography className="text-sm text-primary mb-1">
                            Silver Type
                          </Typography>
                          <Field as={Select} name="silverType" fullWidth>
                            {silverTypes.map((type) => (
                              <MenuItem key={type} value={type}>
                                {type}
                              </MenuItem>
                            ))}
                            <AddNewItem onAddItem={addSilverType} />
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
                            {silverClarity.map((clarity) => (
                              <MenuItem key={clarity} value={clarity}>
                                {clarity}
                              </MenuItem>
                            ))}
                            <MenuItem className=" flex flex-row justify-center w-full">
                              <AddNewItem onAddItem={addSilverClarity} />
                            </MenuItem>
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

                      {props.stock && (
                        <>
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
                        </>
                      )}

                      <Grid size={props.stock ? 12 : 6}>
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

                      {!props.stock && (
                        <Grid size={6}>
                          <Box>
                            <Typography className="text-sm text-primary mb-1">
                              Commission
                            </Typography>
                            <Field
                              name="commission"
                              as={OutlinedInput}
                              fullWidth
                              placeholder="Enter commission"
                            />
                            <CustomErrorMessage name="commission" />
                          </Box>
                        </Grid>
                      )}

                      {!props.stock && (
                        <Grid size={6}>
                          <Box>
                            <Typography className="text-sm text-primary mb-1">
                              Payment Status
                            </Typography>
                            <Field as={Select} name="paymentStatus" fullWidth>
                              <MenuItem value="pending">Pending</MenuItem>
                              <MenuItem value="completed">Completed</MenuItem>
                              <MenuItem value="partial">partial done</MenuItem>
                            </Field>
                            <CustomErrorMessage name="paymentStatus" />
                          </Box>
                        </Grid>
                      )}

                      {!props.stock && (
                        <Grid size={6}>
                          <Box>
                            <Typography className="text-sm text-primary mb-1">
                              Amount Received
                            </Typography>
                            <Field
                              name="amountReceived"
                              as={OutlinedInput}
                              fullWidth
                              placeholder="Enter Amount"
                            />
                            <CustomErrorMessage name="amountReceived" />
                          </Box>
                        </Grid>
                      )}
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
