
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
import Grid from "@mui/material/Grid";
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
  fetchOrnamentTypes,
  fetchForms,
  fetchPurities,
  fetchColors,
  fetchOrnaments,
} from "@/redux/stock_management/stock_management.actions";
import {
  inwardStockSchema,
  outwardStockSchema,
} from "@/yupSchema/stockEntrySchema";
import {
  CreateStockInwardPayload,
  StockManagementInwardModel,
} from "@/models/req-model/StockManagementInwardModel";
import {
  CreateStockOutwardPayload,
  StockManagementOutwardModel,
} from "@/models/req-model/StockManagementOutwardModel";
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
  id: string;
  name: string;
}

const AddStockEntryDialog: React.FC<AddStockEntryDialogProps> = (props) => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch<AppDispatch>();

  const ornaments = useSelector(
    (state: any) => state.stockManagement.ornamentDetails
  );

  const validationSchema = props.stock ? inwardStockSchema : outwardStockSchema;

  // Fetch suppliers/buyers from Redux store
  const buyersAndSuppliers = useSelector((state: any) =>
    props.stock ? state.stockManagement.suppliers : state.stockManagement.buyers
  );
  const selectedVendorId = useSelector(
    (state: any) => state.stockManagement.selectedVendorId
  );

  const ornamentTypes = useSelector(
    (state: any) => state.stockManagement.ornamentTypes
  );
  const ornamentForms = useSelector(
    (state: any) => state.stockManagement.ornamentForms
  );
  const ornamentPurities = useSelector(
    (state: any) => state.stockManagement.ornamentPurities
  );
  const ornamentColors = useSelector(
    (state: any) => state.stockManagement.ornamentColors
  );

  // Local state for dynamic dropdown options
  const [stockType, setStockType] = useState<string>(
    () => ornaments?.[0]?.id || ""
  );
  const [selectedOrnamentName, setSelectedOrnamentName] = useState("");
  const [purityOptions, setPurityOptions] = useState([...ornamentPurities]);
  const [typeOptions, setTypeOptions] = useState([...ornamentTypes]);
  const [formOptions, setFormOptions] = useState([...ornamentForms]);
  const [colorOptions, setColorOptions] = useState([...ornamentColors]);
  const [diamondTypeOptions, setDiamondTypeOptions] = useState([
    ...ornamentTypes,
  ]);
  const [silverTypeOptions, setSilverTypeOptions] = useState([
    ...ornamentTypes,
  ]);

  interface CustomErrorMessageProps {
    name: string;
  }

  const CustomErrorMessage: React.FC<CustomErrorMessageProps> = ({ name }) => (
    <ErrorMessage name={name}>
      {(msg) => <div style={{ color: "red" }}>{msg}</div>}
    </ErrorMessage>
  );

  useEffect(() => {
    if (ornaments.length > 0) {
      const goldOrnament: { id: string; ornamentName: string } | undefined =
        ornaments.find(
          (ornament: { id: string; ornamentName: string }) =>
            ornament.ornamentName.toLowerCase() === "gold"
        );
      if (goldOrnament) {
        setStockType(goldOrnament.id);
        setSelectedOrnamentName(goldOrnament.ornamentName);
      } else {
        setStockType(ornaments[0].id);
        setSelectedOrnamentName(ornaments[0].ornamentName);
      }
    } else {
      // Fallback when there are no ornaments
      setStockType("default-stock-type");
      setSelectedOrnamentName("Gold"); // Or set to your preferred default
    }
  }, [ornaments]);

  useEffect(() => {
    const fetchData = async () => {
      if (props.stock) {
        await dispatch(fetchBuyersAndSuppliers("supplier"));
      } else {
        await dispatch(fetchBuyersAndSuppliers("buyer"));
      }
      await dispatch(fetchOrnamentTypes());
      await dispatch(fetchForms());
      await dispatch(fetchPurities());
      await dispatch(fetchColors());
      await dispatch(fetchOrnaments());
    };

    fetchData();
  }, [dispatch, props.stock]);

  const handleVendorSelect = (e: React.ChangeEvent<{ value: unknown }>) => {
    const vendorId = e.target.value as string;
    dispatch(setSelectedVendorId(vendorId)); // Store the selected vendor ID in Redux
  };

  const handleStockTypeChange = (e: React.ChangeEvent<{ value: unknown }>) => {
    const selectedId = e.target.value as string;
    setStockType(selectedId);
    const selectedOrnament = ornaments.find(
      (ornament: { id: string; ornament: string }) => ornament.id === selectedId
    );
    setSelectedOrnamentName(selectedOrnament ? selectedOrnament.ornament : "");
  };

  const handleAddPurity = (newItem: { id: string; name: string }) => {
    setPurityOptions((prevOptions) => [
      ...prevOptions,
      { id: newItem.id, ornamentPurity: newItem.name },
    ]);
  };

  const handleAddType = (newItem: { id: string; name: string }) => {
    setTypeOptions((prev) => [
      ...prev,
      { id: newItem.id, ornamentType: newItem.name },
    ]);
  };

  const handleAddForm = (newItem: { id: string; name: string }) => {
    setFormOptions((prev: { id: string; ornamentForm: string }[]) => [
      ...prev,
      { id: newItem.id, ornamentForm: newItem.name },
    ]);
  };

  const handleAddColor = (newItem: { id: string; name: string }) => {
    setColorOptions((prev: { id: string; ornamentColor: string }[]) => [
      ...prev,
      { id: newItem.id, ornamentColor: newItem.name },
    ]);
  };
  const setOrnamentTypesOptions = (updateFn: (prev: any[]) => any[]) => {
    setTypeOptions((prev) => updateFn(prev));
  };

  const handleSubmit = async (
    values: StockManagementInwardModel | StockManagementOutwardModel
  ) => {
    console.log("Form values before processing:", values);

    try {
      // Construct payload dynamically based on stock type
      const payload: CreateStockInwardPayload | CreateStockOutwardPayload = {
        stockType: props.stock ? "inward" : "outward",
        transId: values.transId || "default-trans-id", // Ensure transId is included
        description: values.description || "",
        quantity: values.quantity?.toString() || "",
        unitPrice: values.unitPrice?.toString() || "",
        totalValue: values.totalValue?.toString() || "",
        commission: props.stock ? "" : values.commission || "", // Commission only for outward
        batchNumber: values.batchNumber || "",
        location: values.location || "",
        notes: values.notes || "",
        vendor: selectedVendorId || values.vendor || "", // Buyer for outward, supplier for inward
        ornament: stockType || values.ornament || "", // Stock type ID
        type:
          values.goldType ||
          values.diamondType ||
          values.silverType ||
          values.type ||
          "",
        form: values.formOfGold || values.cutGrade || values.form || "", // Form based on stock type
        purity: values.purity || values.clarity || values.sclarity || "", // Purity based on stock type
        color: values.colorGrade || values.color || "", // Optional for diamond or silver
        cutGrade: values.cutGrade || "", // Optional for diamond
        paymentStatus: props.stock ? "" : values.paymentStatus || "", // Payment status for outward only
      };

      console.log("Constructed payload before filtering:", payload);

      // Filter out undefined fields to avoid sending unnecessary data
      const filteredPayload = Object.fromEntries(
        Object.entries(payload).filter(([_, value]) => value !== undefined)
      ) as CreateStockInwardPayload | CreateStockOutwardPayload;

      console.log("Filtered payload for API:", filteredPayload);

      // Dispatch the appropriate Redux action
      if (props.isEditMode && props.initialValues?.id) {
        console.log("Edit mode detected. Sending update request...");
        if (props.stock) {
          console.log("Updating inward stock...");
          await dispatch(
            editInwardAction({
              editInwardPayload: filteredPayload as CreateStockInwardPayload,
              inwardId: props.initialValues.id,
            })
          ).unwrap();
          enqueueSnackbar("Inward stock updated successfully!", {
            variant: "success",
          });
        } else {
          console.log("Updating outward stock...");
          await dispatch(
            editOutwardAction({
              editOutwardPayload: filteredPayload as CreateStockOutwardPayload,
              outwardId: props.initialValues.id,
            })
          ).unwrap();
          enqueueSnackbar("Outward stock updated successfully!", {
            variant: "success",
          });
        }
      } else {
        console.log("Create mode detected. Sending create request...");
        if (props.stock) {
          console.log("Creating inward stock...");
          await dispatch(
            createInward(filteredPayload as CreateStockInwardPayload)
          ).unwrap();
          enqueueSnackbar("Inward stock created successfully!", {
            variant: "success",
          });
        } else {
          console.log("Creating outward stock...");
          await dispatch(
            createOutward(filteredPayload as CreateStockOutwardPayload)
          ).unwrap();
          enqueueSnackbar("Outward stock created successfully!", {
            variant: "success",
          });
        }
      }

      console.log("API call successful. Closing the dialog...");
      props.onClose(); // Close the dialog on success
    } catch (error) {
      console.error("Error during form submission:", error);
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
      aria-hidden={!props.open}
    >
      <DialogTitle className="flex items-start justify-between px-9 pt-9 pb-6">
        <Box>
          <Typography className="text-2xl leading-6 font-semibold">
            {" "}
            Add New Stock{" "}
          </Typography>
          <Typography className="text-secondary800 mt-2">
            {" "}
            Enter details of new stock{" "}
          </Typography>
        </Box>
        <IconButton onClick={props.onClose} className="p-0">
          {" "}
          <CloseOutlinedIcon />{" "}
        </IconButton>{" "}
      </DialogTitle>
      <Formik
        initialValues={{
          id: props.initialValues?.id || "",
          stockType: props.stock ? "inward" : "outward",
          transId: props.initialValues?.transId || "default-trans-id", // Ensure transId is included
          description: props.initialValues?.description || "",
          quantity: props.initialValues?.quantity?.toString() || "", // Convert to string
          unitPrice: props.initialValues?.unitPrice?.toString() || "", // Convert to string
          totalValue: props.initialValues?.totalValue?.toString() || "", // Convert to string
          commission: props.stock
            ? "" // Default to empty for inward
            : props.initialValues?.commission?.toString() || "", // Convert for outward
          batchNumber: props.initialValues?.batchNumber || "",
          location: props.initialValues?.location || "",
          notes: props.initialValues?.notes || "",
          vendor: props.initialValues?.vendor || "",
          ornament: props.initialValues?.ornament || "",
          goldType: props.initialValues?.goldType || "",
          diamondType: props.initialValues?.diamondType || "",
          silverType: props.initialValues?.silverType || "",
          formOfGold: props.initialValues?.formOfGold || "",
          cutGrade: props.initialValues?.cutGrade || "",
          purity: props.initialValues?.purity || "",
          clarity: props.initialValues?.clarity || "",
          sclarity: props.initialValues?.sclarity || "",
          colorGrade: props.initialValues?.colorGrade || "",
          color: props.initialValues?.color || "", // Ensure color is included
          form: props.initialValues?.form || "", // Ensure form is included
          type: props.initialValues?.type || "", // Ensure type is included
          createdBy: props.initialValues?.createdBy || "default-user", // Provide default value
          createdDate:
            props.initialValues?.createdDate || new Date().toISOString(), // Default to current date
          updatedDate:
            props.initialValues?.updatedDate || new Date().toISOString(), // Default to current date
          paymentStatus: props.stock
            ? "" // Default to empty for inward
            : props.initialValues?.paymentStatus || "", // Use for outward
        }}
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
                  <Grid item xs={6}>
                    <Box>
                      <Typography className="text-sm text-primary mb-1">
                        Stock Type
                      </Typography>
                      <Field
                        as={Select}
                        name="stockType"
                        value={stockType || ""} // Controlled value
                        onChange={(
                          e: React.ChangeEvent<{ value: unknown }>
                        ) => {
                          const selectedId = e.target.value as string;
                          setStockType(selectedId);
                          const selectedOrnament = ornaments.find(
                            (ornament: { id: string; ornamentName: string }) =>
                              ornament.id === selectedId
                          );
                          setSelectedOrnamentName(
                            selectedOrnament?.ornamentName || ""
                          );
                        }}
                        displayEmpty
                        fullWidth
                      >
                        {ornaments.map(
                          (type: { id: string; ornamentName: string }) => (
                            <MenuItem key={type.id} value={type.id}>
                              {type.ornamentName}
                            </MenuItem>
                          )
                        )}
                      </Field>
                      <CustomErrorMessage name="stockType" />
                    </Box>
                  </Grid>

                  {/* Dynamic Fields Based on Stock Type */}
                  {(selectedOrnamentName || "Gold") === "Gold" && (
                    <>
                      <Grid item xs={6}>
                        <Box>
                          <Typography className="text-sm text-primary mb-1">
                            Gold Type
                          </Typography>
                          <Field
                            as={Select}
                            name="goldType"
                            value={values.goldType || ""} // Ensure controlled value
                            onChange={handleChange}
                            displayEmpty
                            fullWidth
                          >
                            {/* Placeholder for default selection */}
                            <MenuItem value="" disabled>
                              Select Gold Type
                            </MenuItem>

                            {/* Dynamically filter and display ornament types */}
                            {ornamentTypes.length > 0 ? (
                              ornamentTypes
                                .filter(
                                  (type: { ornament?: { id: string } }) =>
                                    type.ornament?.id === stockType // Filter based on selected stockType
                                )
                                .map(
                                  (type: {
                                    id: string;
                                    ornamentType: string;
                                  }) => (
                                    <MenuItem key={type.id} value={type.id}>
                                      {type.ornamentType}
                                    </MenuItem>
                                  )
                                )
                            ) : (
                              <MenuItem value="" disabled>
                                No Options Available
                              </MenuItem>
                            )}

                            {/* Add New Item functionality */}
                            <MenuItem className="flex flex-row justify-center w-full">
                              <AddNewItem
                                stockTypeId={stockType || "default-stock-type"}
                                category={"type"}
                                onAddItem={(newItem: {
                                  id: string;
                                  name: string;
                                }) => {
                                  setOrnamentTypesOptions((prev) => [
                                    ...prev,
                                    {
                                      id: newItem.id,
                                      ornamentType: newItem.name,
                                      ornament: stockType, // Ensure it is associated with the current stockType
                                    },
                                  ]);
                                }}
                              />
                            </MenuItem>
                          </Field>
                          <CustomErrorMessage name="goldType" />
                        </Box>
                      </Grid>

                      <Grid item xs={6}>
                        <Box>
                          <Typography className="text-sm text-primary mb-1">
                            Form of Gold
                          </Typography>
                          <Field
                            as={Select}
                            name="formOfGold"
                            value={values.formOfGold || ""} // Ensure controlled value
                            onChange={handleChange}
                            displayEmpty
                            fullWidth
                          >
                            {/* Placeholder for default selection */}
                            <MenuItem value="" disabled>
                              Select form of gold
                            </MenuItem>

                            {ornamentForms.length > 0 ? (
                              ornamentForms
                                .filter(
                                  (form: { ornament?: { id: string } }) =>
                                    form.ornament?.id === stockType // Filter based on selected stockType
                                )
                                .map(
                                  (form: {
                                    id: string;
                                    ornamentForm: string;
                                  }) => (
                                    <MenuItem key={form.id} value={form.id}>
                                      {form.ornamentForm}
                                    </MenuItem>
                                  )
                                )
                            ) : (
                              <MenuItem value="" disabled>
                                No Options Available
                              </MenuItem>
                            )}

                            {/* Add New Item functionality */}
                            <MenuItem className="flex flex-row justify-center w-full">
                              <AddNewItem
                                stockTypeId={stockType || "default-stock-type"}
                                category="form"
                                onAddItem={(newItem: {
                                  id: string;
                                  name: string;
                                }) => {
                                  setFormOptions((prev: any[]) => [
                                    ...prev,
                                    {
                                      id: newItem.id,
                                      ornamentForm: newItem.name,
                                      ornament: stockType, // Link it to the current stockType
                                    },
                                  ]);
                                }}
                              />
                            </MenuItem>
                          </Field>
                          <CustomErrorMessage name="form" />
                        </Box>
                      </Grid>

                      <Grid item xs={6}>
                        <Box>
                          <Typography className="text-sm text-primary mb-1">
                            Quantity
                          </Typography>
                          <Field
                            name="quantity"
                            as={OutlinedInput}
                            fullWidth
                            placeholder="Enter quantity"
                            value={values.quantity || ""} // Fallback to empty string
                          />
                          <CustomErrorMessage name="quantity" />
                        </Box>
                      </Grid>

                      <Grid item xs={6}>
                        <Box>
                          <Typography className="text-sm text-primary mb-1">
                            Purity (Karat Rating)
                          </Typography>
                          <Field
                            as={Select}
                            name="purity"
                            value={values.purity || ""} // Ensure controlled value
                            onChange={handleChange}
                            displayEmpty
                            fullWidth
                          >
                            {/* Placeholder option */}
                            <MenuItem value="" disabled>
                              Select Purity
                            </MenuItem>

                            {/* Map through filtered purity options */}
                            {ornamentPurities.length > 0 ? (
                              ornamentPurities
                                .filter(
                                  (purity: { ornament?: { id: string } }) =>
                                    purity.ornament?.id === stockType // Match the purity with the selected stock type
                                )
                                .map(
                                  (purity: {
                                    id: string;
                                    ornamentPurity: string;
                                  }) => (
                                    <MenuItem key={purity.id} value={purity.id}>
                                      {purity.ornamentPurity}
                                    </MenuItem>
                                  )
                                )
                            ) : (
                              <MenuItem value="" disabled>
                                No Options Available
                              </MenuItem>
                            )}

                            {/* Add New Item functionality */}
                            <MenuItem className="flex flex-row justify-center w-full">
                              <AddNewItem
                                stockTypeId={stockType} // Pass the currently selected stock type ID
                                category="purity" // Specify the category for dynamic addition
                                onAddItem={(newItem: {
                                  id: string;
                                  name: string;
                                }) => {
                                  setPurityOptions(
                                    (
                                      prevOptions: {
                                        id: string;
                                        ornamentPurity: string;
                                      }[]
                                    ) => [
                                      ...prevOptions,
                                      {
                                        id: newItem.id,
                                        ornamentPurity: newItem.name,
                                        ornament: stockType, // Ensure the new item is associated with the selected stock type
                                      },
                                    ]
                                  );
                                }}
                              />
                            </MenuItem>
                          </Field>
                          <CustomErrorMessage name="purity" />
                        </Box>
                      </Grid>

                      <Grid item xs={6}>
                        <Box>
                          <Typography className="text-sm text-primary mb-1">
                            Description
                          </Typography>
                          <Field
                            name="description"
                            as={OutlinedInput}
                            fullWidth
                            placeholder="Enter description "
                            value={values.description || ""} // Fallback to empty string
                          />
                          <CustomErrorMessage name="description" />
                        </Box>
                      </Grid>

                      <Grid item xs={6}>
                        <Box>
                          <Typography className="text-sm text-primary mb-1">
                            Unit Price
                          </Typography>
                          <Field
                            name="unitPrice"
                            as={OutlinedInput}
                            fullWidth
                            placeholder="Enter unit price"
                            value={values.unitPrice || ""} // Fallback to empty string
                          />
                          <CustomErrorMessage name="unitPrice" />
                        </Box>
                      </Grid>

                      <Grid item xs={6}>
                        <Box>
                          <Typography className="text-sm text-primary mb-1">
                            Total Value
                          </Typography>
                          <Field
                            name="totalValue"
                            as={OutlinedInput}
                            fullWidth
                            placeholder="Enter total value"
                            value={values.totalValue || ""} // Fallback to empty string
                          />
                          <CustomErrorMessage name="totalValue" />
                        </Box>
                      </Grid>

                      {props.stock && (
                        <>
                          <Grid item xs={6}>
                            <Box>
                              <Typography className="text-sm text-primary mb-1">
                                Location
                              </Typography>
                              <Field
                                name="location"
                                as={OutlinedInput}
                                fullWidth
                                placeholder="Enter location"
                                value={values.location || ""} // Fallback to empty string
                              />
                              <CustomErrorMessage name="location" />
                            </Box>
                          </Grid>

                          <Grid item xs={6}>
                            <Box>
                              <Typography className="text-sm text-primary mb-1">
                                Batch Number
                              </Typography>
                              <Field
                                name="batchNumber"
                                as={OutlinedInput}
                                fullWidth
                                placeholder="Enter Batch Number"
                                value={values.batchNumber || ""} // Fallback to empty string
                              />
                              <CustomErrorMessage name="batchNumber" />
                            </Box>
                          </Grid>
                        </>
                      )}

                      <Grid item xs={props.stock ? 12 : 6}>
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
                        <Grid item xs={6}>
                          <Box>
                            <Typography className="text-sm text-primary mb-1">
                              Commission
                            </Typography>
                            <Field
                              name="commission"
                              as={OutlinedInput}
                              fullWidth
                              placeholder="Enter commission"
                              value={values.commission || ""} // Fallback to empty string
                            />
                            <CustomErrorMessage name="commission" />
                          </Box>
                        </Grid>
                      )}

                      {!props.stock && (
                        <Grid item xs={6}>
                          <Box>
                            <Typography className="text-sm text-primary mb-1">
                              Payment Status
                            </Typography>
                            <Field
                              as={Select}
                              name="paymentStatus"
                              value={values.paymentStatus || ""} // Ensure controlled value
                              onChange={handleChange}
                              displayEmpty
                              fullWidth
                            >
                              <MenuItem value="pending">Pending</MenuItem>
                              <MenuItem value="completed">Completed</MenuItem>
                              <MenuItem value="partial">Partial Done</MenuItem>
                            </Field>
                            <CustomErrorMessage name="paymentStatus" />
                          </Box>
                        </Grid>
                      )}

                      {!props.stock && (
                        <Grid item xs={6}>
                          <Box>
                            <Typography className="text-sm text-primary mb-1">
                              Batch Number
                            </Typography>
                            <Field
                              name="batchNumber"
                              as={OutlinedInput}
                              fullWidth
                              placeholder="Enter Batch Number"
                              value={values.batchNumber || ""} // Fallback to empty string
                            />
                            <CustomErrorMessage name="batchNumber" />
                          </Box>
                        </Grid>
                      )}

                      <Grid item xs={12}>
                        <Box>
                          <Typography className="text-sm text-primary mb-1">
                            Notes (if any)
                          </Typography>
                          <Field
                            name="notes"
                            as={OutlinedInput}
                            fullWidth
                            placeholder="Enter notes"
                            value={values.notes || ""} // Fallback to empty string
                          />
                          <CustomErrorMessage name="notes" />
                        </Box>
                      </Grid>
                    </>
                  )}

                  {/* Diamond type */}
                  {selectedOrnamentName === "Diamond" && (
                    <>
                      <Grid item xs={6}>
                        <Box>
                          <Typography className="text-sm text-primary mb-1">
                            Diamond Type
                          </Typography>
                          <Field
                            as={Select}
                            name="diamondType"
                            value={values.diamondType || ""} // Ensure controlled value
                            onChange={handleChange}
                            displayEmpty
                            fullWidth
                          >
                            {/* Placeholder for default selection */}
                            <MenuItem value="" disabled>
                              Select Diamond Type
                            </MenuItem>

                            {/* Dynamically filter and display diamond types */}
                            {ornamentTypes.length > 0 ? (
                              ornamentTypes
                                .filter(
                                  (type: { ornament?: { id: string } }) =>
                                    type.ornament?.id === stockType // Filter based on selected stockType
                                )
                                .map(
                                  (type: {
                                    id: string;
                                    ornamentType: string;
                                  }) => (
                                    <MenuItem key={type.id} value={type.id}>
                                      {type.ornamentType}
                                    </MenuItem>
                                  )
                                )
                            ) : (
                              <MenuItem value="" disabled>
                                No Options Available
                              </MenuItem>
                            )}

                            {/* Add New Item functionality */}
                            <MenuItem className="flex flex-row justify-center w-full">
                              <AddNewItem
                                stockTypeId={stockType || "default-stock-type"}
                                category="type"
                                onAddItem={(newItem: {
                                  id: string;
                                  name: string;
                                }) => {
                                  setDiamondTypeOptions((prev: any[]) => [
                                    ...prev,
                                    {
                                      id: newItem.id,
                                      ornamentType: newItem.name,
                                      ornament: stockType, // Ensure it is associated with the current stockType
                                    },
                                  ]);
                                }}
                              />
                            </MenuItem>
                          </Field>
                          <CustomErrorMessage name="diamondType" />
                        </Box>
                      </Grid>

                      <Grid item xs={6}>
                        <Box>
                          <Typography className="text-sm text-primary mb-1">
                            Description{" "}
                          </Typography>
                          <Field
                            name="description"
                            as={OutlinedInput}
                            fullWidth
                            placeholder="e.g., 1.50"
                            value={values.description || ""} // Fallback to empty string
                          />
                          <CustomErrorMessage name="description" />
                        </Box>
                      </Grid>

                      <Grid item xs={6}>
                        <Box>
                          <Typography className="text-sm text-primary mb-1">
                            Select Clarity
                          </Typography>
                          <Field
                            as={Select}
                            name="clarity"
                            value={values.clarity || ""}
                            onChange={handleChange}
                            displayEmpty
                            fullWidth
                          >
                            {/* Placeholder for default selection */}
                            <MenuItem value="" disabled>
                              Select Clarity
                            </MenuItem>

                            {/* Dynamically filter and display clarity options */}
                            {ornamentPurities.length > 0 ? (
                              ornamentPurities
                                .filter(
                                  (clarity: { ornament?: { id: string } }) =>
                                    clarity.ornament?.id === stockType // Filter based on selected stockType
                                )
                                .map(
                                  (clarity: {
                                    id: string;
                                    ornamentPurity: string;
                                  }) => (
                                    <MenuItem
                                      key={clarity.id}
                                      value={clarity.id}
                                    >
                                      {clarity.ornamentPurity}
                                    </MenuItem>
                                  )
                                )
                            ) : (
                              <MenuItem value="" disabled>
                                No Options Available
                              </MenuItem>
                            )}

                            {/* Add New Item functionality */}
                            <MenuItem className="flex flex-row justify-center w-full">
                              <AddNewItem
                                stockTypeId={stockType || "default-stock-type"}
                                category="purity"
                                onAddItem={(newItem: {
                                  id: string;
                                  name: string;
                                }) => {
                                  setPurityOptions((prev: any[]) => [
                                    ...prev,
                                    {
                                      id: newItem.id,
                                      ornamentPurity: newItem.name,
                                      ornament: stockType, // Link it to the current stockType
                                    },
                                  ]);
                                }}
                              />
                            </MenuItem>
                          </Field>
                          <CustomErrorMessage name="clarity" />
                        </Box>
                      </Grid>

                      <Grid item xs={6}>
                        <Box>
                          <Typography className="text-sm text-primary mb-1">
                            Color Grade
                          </Typography>
                          <Field
                            as={Select}
                            name="colorGrade"
                            value={values.colorGrade || ""} // Fallback to empty string
                            onChange={handleChange}
                            displayEmpty
                            fullWidth
                          >
                            {/* Placeholder */}
                            <MenuItem value="" disabled>
                              Select Color Grade
                            </MenuItem>

                            {/* Dynamically Filter Colors Based on Stock Type */}
                            {ornamentColors.length > 0 ? (
                              ornamentColors
                                .filter(
                                  (color: { ornament?: { id: string } }) =>
                                    color.ornament?.id === stockType // Filter based on selected stockType
                                )
                                .map(
                                  (color: {
                                    id: string;
                                    ornamentColor: string;
                                  }) => (
                                    <MenuItem key={color.id} value={color.id}>
                                      {color.ornamentColor}
                                    </MenuItem>
                                  )
                                )
                            ) : (
                              <MenuItem value="" disabled>
                                No Options Available
                              </MenuItem>
                            )}

                            {/* Add New Item Option */}
                            <MenuItem className="flex flex-row justify-center w-full">
                              <AddNewItem
                                stockTypeId={stockType || "default-stock-type"} // Pass the selected stockType
                                category="color"
                                onAddItem={(newItem: {
                                  id: string;
                                  name: string;
                                }) => {
                                  setColorOptions((prev: any[]) => [
                                    ...prev,
                                    {
                                      id: newItem.id,
                                      ornamentColor: newItem.name,
                                      ornament: stockType, // Ensure the new color is linked to the current stockType
                                    },
                                  ]);
                                }}
                              />
                            </MenuItem>
                          </Field>
                          <CustomErrorMessage name="colorGrade" />
                        </Box>
                      </Grid>

                      <Grid item xs={6}>
                        <Box>
                          <Typography className="text-sm text-primary mb-1">
                            Cut Grade
                          </Typography>
                          <Field
                            as={Select}
                            name="cutGrade"
                            value={values.cutGrade || ""} // Fallback to empty string
                            onChange={handleChange}
                            displayEmpty
                            fullWidth
                          >
                            {/* Placeholder for default selection */}
                            <MenuItem value="" disabled>
                              Select Cut Grade
                            </MenuItem>

                            {/* Dynamically filter and display cut grades */}
                            {ornamentForms.length > 0 ? (
                              ornamentForms
                                .filter(
                                  (cut: { ornament?: { id: string } }) =>
                                    cut.ornament?.id === stockType // Filter based on selected stockType
                                )
                                .map(
                                  (cut: {
                                    id: string;
                                    ornamentForm: string;
                                  }) => (
                                    <MenuItem key={cut.id} value={cut.id}>
                                      {cut.ornamentForm}
                                    </MenuItem>
                                  )
                                )
                            ) : (
                              <MenuItem value="" disabled>
                                No Options Available
                              </MenuItem>
                            )}

                            {/* Add New Item functionality */}
                            <MenuItem className="flex flex-row justify-center w-full">
                              <AddNewItem
                                stockTypeId={stockType || "default-stock-type"} // Pass the selected stockType
                                category="form" // Specify the category as "form"
                                onAddItem={(newItem: {
                                  id: string;
                                  name: string;
                                }) => {
                                  setFormOptions((prev: any[]) => [
                                    ...prev,
                                    {
                                      id: newItem.id,
                                      ornamentForm: newItem.name,
                                      ornament: stockType, // Ensure it is linked to the current stockType
                                    },
                                  ]);
                                }}
                              />
                            </MenuItem>
                          </Field>
                          <CustomErrorMessage name="cutGrade" />
                        </Box>
                      </Grid>

                      <Grid item xs={6}>
                        <Box>
                          <Typography className="text-sm text-primary mb-1">
                            Unit Price
                          </Typography>
                          <Field
                            name="unitPrice"
                            as={OutlinedInput}
                            fullWidth
                            placeholder="Enter unit price"
                            value={values.unitPrice || ""} // Fallback to empty string
                          />
                          <CustomErrorMessage name="unitPrice" />
                        </Box>
                      </Grid>

                      <Grid item xs={6}>
                        <Box>
                          <Typography className="text-sm text-primary mb-1">
                            Total Value
                          </Typography>
                          <Field
                            name="totalValue"
                            as={OutlinedInput}
                            fullWidth
                            placeholder="Enter total value"
                            value={values.totalValue || ""} // Fallback to empty string
                          />
                          <CustomErrorMessage name="totalValue" />
                        </Box>
                      </Grid>

                      {props.stock && (
                        <>
                          <Grid item xs={6}>
                            <Box>
                              <Typography className="text-sm text-primary mb-1">
                                Location
                              </Typography>
                              <Field
                                name="location"
                                as={OutlinedInput}
                                fullWidth
                                placeholder="Enter location"
                                value={values.location || ""} // Fallback to empty string
                              />
                              <CustomErrorMessage name="location" />
                            </Box>
                          </Grid>

                          <Grid item xs={6}>
                            <Box>
                              <Typography className="text-sm text-primary mb-1">
                                Batch Number
                              </Typography>
                              <Field
                                name="batchNumber"
                                as={OutlinedInput}
                                fullWidth
                                placeholder="Enter Batch Number"
                                value={values.batchNumber || ""} // Fallback to empty string
                              />
                              <CustomErrorMessage name="batchNumber" />
                            </Box>
                          </Grid>
                        </>
                      )}

                      <Grid item xs={props.stock ? 12 : 6}>
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
                        <Grid item xs={6}>
                          <Box>
                            <Typography className="text-sm text-primary mb-1">
                              Commission
                            </Typography>
                            <Field
                              name="commission"
                              as={OutlinedInput}
                              fullWidth
                              placeholder="Enter commission"
                              value={values.commission || ""} // Fallback to empty string
                            />
                            <CustomErrorMessage name="commission" />
                          </Box>
                        </Grid>
                      )}

                      {!props.stock && (
                        <Grid item xs={6}>
                          <Box>
                            <Typography className="text-sm text-primary mb-1">
                              Payment Status
                            </Typography>
                            <Field
                              as={Select}
                              name="paymentStatus"
                              value={values.paymentStatus || ""} // Ensure controlled value
                              onChange={handleChange}
                              displayEmpty
                              fullWidth
                            >
                              <MenuItem value="pending">Pending</MenuItem>
                              <MenuItem value="completed">Completed</MenuItem>
                              <MenuItem value="partial">Partial Done</MenuItem>
                            </Field>
                            <CustomErrorMessage name="paymentStatus" />
                          </Box>
                        </Grid>
                      )}

                      {!props.stock && (
                        <Grid item xs={6}>
                          <Box>
                            <Typography className="text-sm text-primary mb-1">
                              Batch Number
                            </Typography>
                            <Field
                              name="batchNumber"
                              as={OutlinedInput}
                              fullWidth
                              placeholder="Enter Batch Number"
                              value={values.batchNumber || ""} // Fallback to empty string
                            />
                            <CustomErrorMessage name="batchNumber" />
                          </Box>
                        </Grid>
                      )}

                      <Grid item xs={12}>
                        <Box>
                          <Typography className="text-sm text-primary mb-1">
                            Notes (if any)
                          </Typography>
                          <Field
                            name="notes"
                            as={OutlinedInput}
                            fullWidth
                            placeholder="Enter notes"
                            value={values.notes || ""} // Fallback to empty string
                          />
                          <CustomErrorMessage name="notes" />
                        </Box>
                      </Grid>
                    </>
                  )}

                  {/* Silver type */}
                  {selectedOrnamentName === "Silver" && (
                    <>
                      <Grid item xs={6}>
                        <Box>
                          <Typography className="text-sm text-primary mb-1">
                            Silver Type
                          </Typography>
                          <Field
                            as={Select}
                            name="silverType"
                            value={values.silverType || ""}
                            onChange={handleChange}
                            displayEmpty
                            fullWidth
                          >
                            {/* Placeholder for default selection */}
                            <MenuItem value="" disabled>
                              Select Silver Type
                            </MenuItem>

                            {/* Dynamically filter and display silver types */}
                            {ornamentTypes.length > 0 ? (
                              ornamentTypes
                                .filter(
                                  (type: { ornament?: { id: string } }) =>
                                    type.ornament?.id === stockType // Filter based on selected stockType
                                )
                                .map(
                                  (type: {
                                    id: string;
                                    ornamentType: string;
                                  }) => (
                                    <MenuItem key={type.id} value={type.id}>
                                      {type.ornamentType}
                                    </MenuItem>
                                  )
                                )
                            ) : (
                              <MenuItem value="" disabled>
                                No Options Available
                              </MenuItem>
                            )}

                            {/* Add New Item functionality */}
                            <MenuItem className="flex flex-row justify-center w-full">
                              <AddNewItem
                                stockTypeId={stockType || "default-stock-type"} // Pass the selected stockType
                                category="type" // Specify the category as "type"
                                onAddItem={(newItem: {
                                  id: string;
                                  name: string;
                                }) => {
                                  setSilverTypeOptions((prev: any[]) => [
                                    ...prev,
                                    {
                                      id: newItem.id,
                                      ornamentType: newItem.name,
                                      ornament: stockType, // Link it to the current stockType
                                    },
                                  ]);
                                }}
                              />
                            </MenuItem>
                          </Field>
                          <CustomErrorMessage name="silverType" />
                        </Box>
                      </Grid>

                      <Grid item xs={6}>
                        <Box>
                          <Typography className="text-sm text-primary mb-1">
                            Description
                          </Typography>
                          <Field
                            name="description"
                            as={OutlinedInput}
                            fullWidth
                            placeholder="e.g., 1.50"
                            value={values.description || ""} // Fallback to empty string
                          />
                          <CustomErrorMessage name="description" />
                        </Box>
                      </Grid>

                      <Grid item xs={6}>
                        <Box>
                          <Typography className="text-sm text-primary mb-1">
                            Select silver clarity
                          </Typography>
                          <Field
                            as={Select}
                            name="sclarity"
                            value={values.sclarity || ""} // Ensure controlled value
                            onChange={handleChange}
                            displayEmpty
                            fullWidth
                          >
                            {/* Placeholder option */}
                            <MenuItem value="" disabled>
                              Select silver clarity
                            </MenuItem>

                            {/* Map through filtered purity options */}
                            {ornamentPurities.length > 0 ? (
                              ornamentPurities
                                .filter(
                                  (sclarity: { ornament?: { id: string } }) =>
                                    sclarity.ornament?.id === stockType // Match the purity with the selected stock type
                                )
                                .map(
                                  (sclarity: {
                                    id: string;
                                    ornamentPurity: string;
                                  }) => (
                                    <MenuItem
                                      key={sclarity.id}
                                      value={sclarity.id}
                                    >
                                      {sclarity.ornamentPurity}
                                    </MenuItem>
                                  )
                                )
                            ) : (
                              <MenuItem value="" disabled>
                                No Options Available
                              </MenuItem>
                            )}

                            {/* Add New Item functionality */}
                            <MenuItem className="flex flex-row justify-center w-full">
                              <AddNewItem
                                stockTypeId={stockType || "default-stock-type"}
                                category="purity"
                                onAddItem={(newItem: {
                                  id: string;
                                  name: string;
                                }) => {
                                  setPurityOptions((prev: any[]) => [
                                    ...prev,
                                    {
                                      id: newItem.id,
                                      ornamentPurity: newItem.name,
                                      ornament: stockType, // Link it to the current stockType
                                    },
                                  ]);
                                }}
                              />
                            </MenuItem>
                          </Field>
                          <CustomErrorMessage name="sclarity" />
                        </Box>
                      </Grid>

                      <Grid item xs={6}>
                        <Box>
                          <Typography className="text-sm text-primary mb-1">
                            Quantity
                          </Typography>
                          <Field
                            name="quantity"
                            as={OutlinedInput}
                            fullWidth
                            placeholder="Enter quantity"
                            value={values.quantity || ""} // Fallback to empty string
                          />
                          <CustomErrorMessage name="quantity" />
                        </Box>
                      </Grid>

                      <Grid item xs={6}>
                        <Box>
                          <Typography className="text-sm text-primary mb-1">
                            Description
                          </Typography>
                          <Field
                            name="description"
                            as={OutlinedInput}
                            fullWidth
                            placeholder="Enter description"
                            value={values.description || ""} // Fallback to empty string
                          />
                          <CustomErrorMessage name="description" />
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box>
                          <Typography className="text-sm text-primary mb-1">
                            Unit Price
                          </Typography>
                          <Field
                            name="unitPrice"
                            as={OutlinedInput}
                            fullWidth
                            placeholder="Enter unit price"
                            value={values.unitPrice || ""} // Fallback to empty string
                          />
                          <CustomErrorMessage name="unitPrice" />
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box>
                          <Typography className="text-sm text-primary mb-1">
                            Total Value
                          </Typography>
                          <Field
                            name="totalValue"
                            as={OutlinedInput}
                            fullWidth
                            placeholder="Enter total value"
                            value={values.totalValue || ""} // Fallback to empty string
                          />
                          <CustomErrorMessage name="totalValue" />
                        </Box>
                      </Grid>
                      {props.stock && (
                        <>
                          <Grid item xs={6}>
                            <Box>
                              <Typography className="text-sm text-primary mb-1">
                                Location
                              </Typography>
                              <Field
                                name="location"
                                as={OutlinedInput}
                                fullWidth
                                placeholder="Enter location"
                                value={values.location || ""} // Fallback to empty string
                              />
                              <CustomErrorMessage name="location" />
                            </Box>
                          </Grid>

                          <Grid item xs={6}>
                            <Box>
                              <Typography className="text-sm text-primary mb-1">
                                Batch Number
                              </Typography>
                              <Field
                                name="batchNumber"
                                as={OutlinedInput}
                                fullWidth
                                placeholder="Enter batch Number"
                                value={values.batchNumber || ""} // Fallback to empty string
                              />
                              <CustomErrorMessage name="batchNumber" />
                            </Box>
                          </Grid>
                        </>
                      )}
                      <Grid item xs={props.stock ? 12 : 6}>
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
                              handleVendorSelect(e); // Trigger the selection handler
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
                        <Grid item xs={6}>
                          <Box>
                            <Typography className="text-sm text-primary mb-1">
                              Commission
                            </Typography>
                            <Field
                              name="commission"
                              as={OutlinedInput}
                              fullWidth
                              placeholder="Enter commission"
                              value={values.commission || ""} // Fallback to empty string
                            />
                            <CustomErrorMessage name="commission" />
                          </Box>
                        </Grid>
                      )}
                      {!props.stock && (
                        <Grid item xs={6}>
                          <Box>
                            <Typography className="text-sm text-primary mb-1">
                              Payment Status
                            </Typography>
                            <Field
                              as={Select}
                              name="paymentStatus"
                              fullWidth
                              value={values.paymentStatus || ""} // Fallback to empty string
                            >
                              <MenuItem value="pending">Pending</MenuItem>
                              <MenuItem value="completed">Completed</MenuItem>
                              <MenuItem value="partial">Partial Done</MenuItem>
                            </Field>
                            <CustomErrorMessage name="paymentStatus" />
                          </Box>
                        </Grid>
                      )}
                      {!props.stock && (
                        <Grid item xs={6}>
                          <Box>
                            <Typography className="text-sm text-primary mb-1">
                              Batch Number
                            </Typography>
                            <Field
                              name="batchNumber"
                              as={OutlinedInput}
                              fullWidth
                              placeholder="Enter Batch Number"
                              value={values.batchNumber || ""} // Fallback to empty string
                            />
                            <CustomErrorMessage name="batchNumber" />
                          </Box>
                        </Grid>
                      )}
                      <Grid item xs={12}>
                        <Box>
                          <Typography className="text-sm text-primary mb-1">
                            Notes (if any)
                          </Typography>
                          <Field
                            name="notes"
                            as={OutlinedInput}
                            fullWidth
                            placeholder="Enter notes"
                            value={values.notes || ""} // Fallback to empty string
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