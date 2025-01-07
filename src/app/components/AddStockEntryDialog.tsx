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
  fetchGrades,
} from "@/redux/stock_management/stock_management.actions";
import {
  inwardStockSchemaGold,
  inwardStockSchemaSilver,
  inwardStockSchemaDiamond,
  outwardStockSchemaSilver,
  outwardStockSchemaDiamond,
  outwardStockSchemaGold,
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

  const ornamentGrades = useSelector(
    (state: any) => state.stockManagement.ornamentGrades
  );

  // Local state for dynamic dropdown options
  const [stockType, setStockType] = useState<string>(
    () => ornaments?.[0]?.id || ""
  );
  const [selectedOrnamentName, setSelectedOrnamentName] = useState("");

  // console.log("selected name ", selectedOrnamentName);

  const validationSchema = props.stock
    ? (selectedOrnamentName === "Gold" && inwardStockSchemaGold) ||
      (selectedOrnamentName === "Silver" && inwardStockSchemaSilver) ||
      (selectedOrnamentName === "Diamond" && inwardStockSchemaDiamond)
    : (selectedOrnamentName === "Gold" && outwardStockSchemaGold) ||
      (selectedOrnamentName === "Silver" && outwardStockSchemaSilver) ||
      (selectedOrnamentName === "Diamond" && outwardStockSchemaDiamond);

  const [purityOptions, setPurityOptions] = useState([...ornamentPurities]);
  const [typeOptions, setTypeOptions] = useState([...ornamentTypes]);
  const [formOptions, setFormOptions] = useState([...ornamentForms]);
  const [GradeOptions, setGradeOptions] = useState([...ornamentGrades]);

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
    if (props.initialValues?.ornament?.id) {
      setStockType(props.initialValues.ornament.id);
      setSelectedOrnamentName(props.initialValues.ornament.ornamentName);
    } else {
      const goldOrnament = ornaments.find(
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
    }
  } else {
    // Fallback when there are no ornaments
    setStockType("default-stock-type");
    setSelectedOrnamentName("Gold"); // Or set to your preferred default
  }
}, [
  ornaments,
  props.initialValues?.ornament?.id,
  props.initialValues?.ornament?.ornamentName,
]);


  useEffect(() => {
    // console.log("Edit Mode?", props.isEditMode);
    // console.log("Outward?", !props.stock);
    // console.log("initialValues for outward:", props.initialValues);
    if (props.isEditMode && props.initialValues?.ornament?.id) {
      // console.log("Setting outward stock type...", props.initialValues.ornament.id);
      setStockType(props.initialValues.ornament.id);
      setSelectedOrnamentName(props.initialValues.ornament.ornamentName);
    }
  }, [props.isEditMode, props.stock, props.initialValues]);

  useEffect(() => {
    const fetchData = async () => {
      if (props.stock) {
        await dispatch(fetchBuyersAndSuppliers("supplier"));
      } else {
        await dispatch(fetchBuyersAndSuppliers("buyer"));
      }
      await dispatch(fetchOrnamentTypes());
      await dispatch(fetchForms());
      await dispatch(fetchGrades());
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

  const handleAddGrade = (newItem: { id: string; name: string }) => {
    setGradeOptions((prev: { id: string; ornamentGrade: string }[]) => [
      ...prev,
      { id: newItem.id, ornamentGrade: newItem.name },
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
    values: StockManagementInwardModel | StockManagementOutwardModel,
    { resetForm }: { resetForm: () => void }
  ) => {
    // console.log("Form values before processing:", values);
    try {
      // Construct payload dynamically based on stock type
      const payload: CreateStockInwardPayload | CreateStockOutwardPayload = {
        stockType: props.stock ? "inward" : "outward",
        transId: values.transId?.toString() || "default-trans-id", // Ensure transId is included
        description: values.description.toString() || "",
        quantity: values.quantity?.toString() || "",
        unitPrice: values.unitPrice?.toString() || "",
        totalValue: values.totalValue?.toString() || "",
        commission: values.commission?.toString() || "", // Commission only for outward
        batchNumber: values.batchNumber?.toString() || "",
        location: values.location?.toString() || "",
        notes: values.notes?.toString() || "",
        vendor: selectedVendorId || values.vendor?.toString() || "", // Buyer for outward, supplier for inward
        ornament: stockType || values.ornament || "", // Stock type ID
        type: values.goldType || values.diamondType || values.silverType || "",
        form: values.formOfGold || values.formOfSilver || "", // Form based on stock type
        purity: values.purity || values.clarity || values.sclarity || "", // Purity based on stock type
        color: values.colorGrade || "", // Optional for diamond
        grade: values.cutGrade?.toString() || "", // Optional for diamond
      };

      // console.log("Constructed payload before filtering:", payload);

      // Filter out undefined fields to avoid sending unnecessary data
      const filteredPayload = Object.fromEntries(
        Object.entries(payload).filter(([_, value]) => value !== undefined)
      ) as CreateStockInwardPayload | CreateStockOutwardPayload;

      // console.log("Filtered payload for API:", filteredPayload);

      // Dispatch the appropriate Redux action
      if (props.isEditMode && props.initialValues?.id) {
        // console.log("Edit mode detected. Sending update request...", values);
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
          if (props.onInwardCreated) {
            await props.onInwardCreated(); // Refresh the table after update
          }
        } else {
          // console.log("Updating outward stock...");
          await dispatch(
            editOutwardAction({
              editOutwardPayload: filteredPayload as CreateStockOutwardPayload,
              outwardId: props.initialValues.id,
            })
          ).unwrap();
          enqueueSnackbar("Outward stock updated successfully!", {
            variant: "success",
          });
          if (props.onOutwardCreated) {
            await props.onOutwardCreated(); // Refresh the table after update
          }
        }
      }
       else {
        // console.log("Create mode detected. Sending create request...");
        if (props.stock) {
          // console.log("Creating inward stock...");
          await dispatch(
            createInward(filteredPayload as CreateStockInwardPayload)
          ).unwrap();
          enqueueSnackbar("Inward stock created successfully!", {
            variant: "success",
          });
          // Trigger the refresh for inward stock
          if (props.onInwardCreated) {
            await props.onInwardCreated();
          }
        } else {
          // console.log("Creating outward stock...");
          await dispatch(
            createOutward(filteredPayload as CreateStockOutwardPayload)
          ).unwrap();
          enqueueSnackbar("Outward stock created successfully!", {
            variant: "success",
          });
          // Trigger the refresh for outward stock
          if (props.onOutwardCreated) {
            await props.onOutwardCreated();
          }
        }
      }
      // console.log("API call successful. Closing the dialog...");
      props.onClose(); // Close the dialog on success
    } catch (error) {
      // console.error("Error during form submission:", error);
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
          transId: props.initialValues?.transId || "default-trans-id",
          description: props.initialValues?.description || "",
          quantity: props.initialValues?.quantity?.toString() || "", // Convert to string
          unitPrice: props.initialValues?.unitPrice?.toString() || "", // Convert to string
          totalValue: props.initialValues?.totalValue?.toString() || "", // Convert to string
          commission: props.initialValues?.commission?.toString() || "", // Convert for outward
          batchNumber: props.initialValues?.batchNumber || "",
          location: props.initialValues?.location || "",
          notes: props.initialValues?.notes || "",
          vendor: props.initialValues?.vendor?.id || "",
          ornament: props.initialValues?.ornament?.id || "",
          goldType: props.initialValues?.type?.id || "",
          diamondType: props.initialValues?.type?.id || "",
          silverType: props.initialValues?.type?.id || "",
          formOfGold: props.initialValues?.form?.id || "",
          cutGrade: props.initialValues?.grade?.id || "",
          grade: props.initialValues?.grade?.id || "",
          formOfSilver: props.initialValues?.form?.id || "",
          purity: props.initialValues?.purity?.id || "",
          clarity: props.initialValues?.purity?.id || "",
          sclarity: props.initialValues?.purity?.id || "",
          colorGrade: props.initialValues?.color?.id || "",
          color: props.initialValues?.color?.id || "",
          form: props.initialValues?.form?.id || "",
          type: props.initialValues?.type?.id || "",
          createdBy: props.initialValues?.createdBy || "default-user", // Provide default value
          createdDate:
            props.initialValues?.createdDate || new Date().toISOString(), // Default to current date
          updatedDate:
            props.initialValues?.updatedDate || new Date().toISOString(), // Default to current date
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ errors, values, touched, handleChange, handleBlur }) => (
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
                        error={touched.stockType && Boolean(errors.stockType)}
                        value={
                          stockType
                            ? stockType
                            : props.isEditMode
                            ? (props.initialValues?.ornament?.id &&
                                props.initialValues.ornament.id) ||
                              ""
                            : ""
                        }
                        onChange={(
                          e: React.ChangeEvent<{ value: unknown }>
                        ) => {
                          const selectedId = e.target.value as string;
                          setStockType(selectedId);
                          const selectedOrnament = ornaments.find(
                            (ornament: { id: string; ornamentName: string }) =>
                              ornament.id === selectedId
                          );
                          // console.log({ selectedOrnament });
                          setSelectedOrnamentName(
                            selectedOrnament?.ornamentName || ""
                          );
                        }}
                        displayEmpty
                        fullWidth
                      >
                        {ornaments.map(
                          (type: { id: string; ornamentName: string }) => {
                            // console.log("props initial values", props.initialValues);

                            return (
                              <MenuItem key={type.id} value={type.id}>
                                {type.ornamentName}
                              </MenuItem>
                            );
                          }
                        )}
                      </Field>
                      <CustomErrorMessage name="stockType" />
                    </Box>
                  </Grid>

                  {/* Dynamic Fields Based on Stock Type */}
                  {selectedOrnamentName === "Gold" && (
                    <>
                      <Grid item xs={6}>
                        <Box>
                          <Typography className="text-sm text-primary mb-1">
                            Gold Type
                          </Typography>
                          <Field
                            as={Select}
                            name="goldType"
                            error={touched.goldType && Boolean(errors.goldType)}
                            //  value={ props.isEditMode ?  props.initialValues?.type?.id  &&  props.initialValues.type.id || "" : stockType || ""} // Controlled value
                            // value={values?.type ? values?.type : props?.isEditMode ? props?.initialValues?.type?.id && props.initialValues?.type?.id || "" : ""}

                            value={
                              values?.goldType
                                ? values?.goldType
                                : props?.isEditMode
                                ? (props?.initialValues?.goldType?.id &&
                                    props.initialValues?.goldType?.id) ||
                                  ""
                                : ""
                            }
                            // value={values.goldType || ""} // Ensure controlled value
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
                            // value={values.formOfGold || ""} // Ensure controlled value
                            value={
                              values?.formOfGold
                                ? values?.formOfGold
                                : props?.isEditMode
                                ? (props?.initialValues?.formOfGold?.id &&
                                    props.initialValues?.formOfGold?.id) ||
                                  ""
                                : ""
                            }
                            onChange={handleChange}
                            error={
                              touched.formOfGold && Boolean(errors.formOfGold)
                            }
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
                          <CustomErrorMessage name="formOfGold" />
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
                            error={touched.quantity && Boolean(errors.quantity)}
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
                            error={touched.purity && Boolean(errors.purity)}
                            name="purity"
                            // value={values.purity || ""} // Ensure controlled value
                            value={
                              values?.purity
                                ? values?.purity
                                : props?.isEditMode
                                ? (props?.initialValues?.purity?.id &&
                                    props.initialValues?.purity?.id) ||
                                  ""
                                : ""
                            }
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
                                  }) => {
                                    // console.log("commission", values.commission);
                                    return (
                                      <MenuItem
                                        key={purity.id}
                                        value={purity.id}
                                      >
                                        {purity.ornamentPurity}
                                      </MenuItem>
                                    );
                                  }
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
                            error={
                              touched.description && Boolean(errors.description)
                            }
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
                            error={
                              touched.unitPrice && Boolean(errors.unitPrice)
                            }
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
                            error={
                              touched.totalValue && Boolean(errors.totalValue)
                            }
                            as={OutlinedInput}
                            fullWidth
                            placeholder="Enter total value"
                            value={values.totalValue || ""} // Fallback to empty string
                          />
                          <CustomErrorMessage name="totalValue" />
                        </Box>
                      </Grid>

                      <Grid item xs={6}>
                        <Box>
                          <Typography className="text-sm text-primary mb-1">
                            Location
                          </Typography>
                          <Field
                            name="location"
                            as={OutlinedInput}
                            error={touched.location && Boolean(errors.location)}
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
                            error={
                              touched.batchNumber && Boolean(errors.batchNumber)
                            }
                            fullWidth
                            placeholder="Enter Batch Number"
                            value={values.batchNumber || ""} // Fallback to empty string
                          />
                          <CustomErrorMessage name="batchNumber" />
                        </Box>
                      </Grid>

                      <Grid item xs={6}>
                        <Box>
                          <Typography className="text-sm text-primary mb-1">
                            {props.stock ? "Supplier Name" : "Buyer Name"}
                          </Typography>
                          <Field
                            as={Select}
                            name="vendor"
                            error={touched.vendor && Boolean(errors.vendor)}
                            value={
                              values?.vendor
                                ? values?.vendor
                                : props?.isEditMode
                                ? (props?.initialValues?.vendor &&
                                    props.initialValues?.vendor) ||
                                  ""
                                : ""
                            }
                            // value={values.vendor || ""}
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
                            {/* Placeholder for default selection */}
                            <MenuItem value="" disabled>
                              {props.stock ? "Supplier Name" : "Buyer Name"}
                            </MenuItem>

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

                      <Grid item xs={6}>
                        <Box>
                          <Typography className="text-sm text-primary mb-1">
                            Commission
                          </Typography>
                          <Field
                            name="commission"
                            error={
                              touched.commission && Boolean(errors.commission)
                            }
                            as={OutlinedInput}
                            fullWidth
                            placeholder="Enter commission"
                            value={values.commission || ""} // Fallback to empty string
                          />
                          <CustomErrorMessage name="commission" />
                        </Box>
                      </Grid>
                      <Grid item xs={12}>
                        <Box>
                          <Typography className="text-sm text-primary mb-1">
                            Notes (if any)
                          </Typography>
                          <Field
                            name="notes"
                            as={OutlinedInput}
                            error={touched.notes && Boolean(errors.notes)}
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
                            error={
                              touched.diamondType && Boolean(errors.diamondType)
                            }
                            // value={values.diamondType || ""} // Ensure controlled value
                            value={
                              values?.diamondType
                                ? values?.diamondType
                                : props?.isEditMode
                                ? (props?.initialValues?.diamondType?.id &&
                                    props.initialValues?.diamondType?.id) ||
                                  ""
                                : ""
                            }
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
                            error={
                              touched.description && Boolean(errors.description)
                            }
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
                            error={touched.clarity && Boolean(errors.clarity)}
                            // value={values.clarity || ""}
                            value={
                              values?.clarity
                                ? values?.clarity
                                : props?.isEditMode
                                ? (props?.initialValues?.clarity?.id &&
                                    props.initialValues?.clarity?.id) ||
                                  ""
                                : ""
                            }
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
                            error={
                              touched.colorGrade && Boolean(errors.colorGrade)
                            }
                            // value={values.colorGrade || ""} // Fallback to empty string
                            value={
                              values?.colorGrade
                                ? values?.colorGrade
                                : props?.isEditMode
                                ? (props?.initialValues?.colorGrade?.id &&
                                    props.initialValues?.colorGrade?.id) ||
                                  ""
                                : ""
                            }
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
                            error={touched.cutGrade && Boolean(errors.cutGrade)}
                            // value={values.cutGrade || ""} // Fallback to empty string
                            value={
                              values?.cutGrade
                                ? values?.cutGrade
                                : props?.isEditMode
                                ? (props?.initialValues?.cutGrade?.id &&
                                    props.initialValues?.cutGrade?.id) ||
                                  ""
                                : ""
                            }
                            onChange={handleChange}
                            displayEmpty
                            fullWidth
                          >
                            {/* Placeholder for default selection */}
                            <MenuItem value="" disabled>
                              Select Cut Grade
                            </MenuItem>

                            {/* Dynamically filter and display cut grades */}
                            {ornamentGrades.length > 0 ? (
                              ornamentGrades
                                .filter(
                                  (grade: { ornament?: { id: string } }) =>
                                    grade.ornament?.id === stockType // Filter based on selected stockType
                                )
                                .map(
                                  (grade: {
                                    id: string;
                                    ornamentGrade: string;
                                  }) => (
                                    <MenuItem key={grade.id} value={grade.id}>
                                      {grade.ornamentGrade}
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
                                category="grade" // Specify the category as "grade"
                                onAddItem={(newItem: {
                                  id: string;
                                  name: string;
                                }) => {
                                  setGradeOptions((prev: any[]) => [
                                    ...prev,
                                    {
                                      id: newItem.id,
                                      ornamentGrade: newItem.name,
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
                            error={
                              touched.unitPrice && Boolean(errors.unitPrice)
                            }
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
                            Quantity
                          </Typography>
                          <Field
                            name="quantity"
                            as={OutlinedInput}
                            error={touched.quantity && Boolean(errors.quantity)}
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
                            Total Value
                          </Typography>
                          <Field
                            name="totalValue"
                            as={OutlinedInput}
                            error={
                              touched.totalValue && Boolean(errors.totalValue)
                            }
                            fullWidth
                            placeholder="Enter total value"
                            value={values.totalValue || ""} // Fallback to empty string
                          />
                          <CustomErrorMessage name="totalValue" />
                        </Box>
                      </Grid>
                      <Grid item xs={6}>
                        <Box>
                          <Typography className="text-sm text-primary mb-1">
                            Location
                          </Typography>
                          <Field
                            name="location"
                            as={OutlinedInput}
                            error={touched.location && Boolean(errors.location)}
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
                            error={
                              touched.batchNumber && Boolean(errors.batchNumber)
                            }
                            fullWidth
                            placeholder="Enter Batch Number"
                            value={values.batchNumber || ""} // Fallback to empty string
                          />
                          <CustomErrorMessage name="batchNumber" />
                        </Box>
                      </Grid>

                      <Grid item xs={6}>
                        <Box>
                          <Typography className="text-sm text-primary mb-1">
                            {props.stock ? "Supplier Name" : "Buyer Name"}
                          </Typography>
                          <Field
                            as={Select}
                            name="vendor"
                            error={touched.vendor && Boolean(errors.vendor)}
                            // value={values.vendor || ""}
                            value={
                              values?.vendor
                                ? values?.vendor
                                : props?.isEditMode
                                ? (props?.initialValues?.vendor?.id &&
                                    props.initialValues?.vendor?.id) ||
                                  ""
                                : ""
                            }
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
                            {/* Placeholder for default selection */}
                            <MenuItem value="" disabled>
                              {props.stock ? "Supplier Name" : "Buyer Name"}
                            </MenuItem>
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

                      <Grid item xs={6}>
                        <Box>
                          <Typography className="text-sm text-primary mb-1">
                            Commission
                          </Typography>
                          <Field
                            name="commission"
                            as={OutlinedInput}
                            error={
                              touched.commission && Boolean(errors.commission)
                            }
                            fullWidth
                            placeholder="Enter commission"
                            value={values.commission || ""} // Fallback to empty string
                          />
                          <CustomErrorMessage name="commission" />
                        </Box>
                      </Grid>

                      <Grid item xs={6}>
                        <Box>
                          <Typography className="text-sm text-primary mb-1">
                            Notes (if any)
                          </Typography>
                          <Field
                            name="notes"
                            as={OutlinedInput}
                            fullWidth
                            error={touched.notes && Boolean(errors.notes)}
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
                            error={
                              touched.silverType && Boolean(errors.silverType)
                            }
                            // value={values.silverType || ""}
                            value={
                              values?.silverType
                                ? values?.silverType
                                : props?.isEditMode
                                ? (props?.initialValues?.silverType?.id &&
                                    props.initialValues?.silverType?.id) ||
                                  ""
                                : ""
                            }
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
                            error={
                              touched.description && Boolean(errors.description)
                            }
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
                            error={touched.sclarity && Boolean(errors.sclarity)}
                            name="sclarity"
                            // value={values.sclarity || ""} // Ensure controlled value
                            value={
                              values?.sclarity
                                ? values?.sclarity
                                : props?.isEditMode
                                ? (props?.initialValues?.sclarity?.id &&
                                    props.initialValues?.sclarity?.id) ||
                                  ""
                                : ""
                            }
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
                            error={touched.quantity && Boolean(errors.quantity)}
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
                            Form of Silver
                          </Typography>
                          <Field
                            as={Select}
                            name="formOfSilver"
                            // value={values.formOfSilver || ""} // Ensure controlled value
                            value={
                              values?.formOfSilver
                                ? values?.formOfSilver
                                : props?.isEditMode
                                ? (props?.initialValues?.formOfSilver?.id &&
                                    props.initialValues?.formOfSilver?.id) ||
                                  ""
                                : ""
                            }
                            onChange={handleChange}
                            error={
                              touched.formOfSilver &&
                              Boolean(errors.formOfSilver)
                            }
                            displayEmpty
                            fullWidth
                          >
                            {/* Placeholder for default selection */}
                            <MenuItem value="" disabled>
                              Select form of Silver
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
                          <CustomErrorMessage name="formOfSilver" />
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
                            error={
                              touched.unitPrice && Boolean(errors.unitPrice)
                            }
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
                            error={
                              touched.totalValue && Boolean(errors.totalValue)
                            }
                            placeholder="Enter total value"
                            value={values.totalValue || ""} // Fallback to empty string
                          />
                          <CustomErrorMessage name="totalValue" />
                        </Box>
                      </Grid>

                      <Grid item xs={6}>
                        <Box>
                          <Typography className="text-sm text-primary mb-1">
                            Location
                          </Typography>
                          <Field
                            name="location"
                            as={OutlinedInput}
                            error={touched.location && Boolean(errors.location)}
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
                            error={
                              touched.batchNumber && Boolean(errors.batchNumber)
                            }
                            fullWidth
                            placeholder="Enter batch Number"
                            value={values.batchNumber || ""} // Fallback to empty string
                          />
                          <CustomErrorMessage name="batchNumber" />
                        </Box>
                      </Grid>

                      <Grid item xs={6}>
                        <Box>
                          <Typography className="text-sm text-primary mb-1">
                            {props.stock ? "Supplier Name" : "Buyer Name"}
                          </Typography>
                          <Field
                            as={Select}
                            name="vendor"
                            // value={values.vendor || ""}

                            value={
                              values?.vendor
                                ? values?.vendor
                                : props?.isEditMode
                                ? (props?.initialValues?.vendor?.id &&
                                    props.initialValues?.vendor?.id) ||
                                  ""
                                : ""
                            }
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
                            {/* Placeholder for default selection */}
                            <MenuItem value="" disabled>
                              {props.stock ? "Supplier Name" : "Buyer Name"}
                            </MenuItem>

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

                      <Grid item xs={6}>
                        <Box>
                          <Typography className="text-sm text-primary mb-1">
                            Commission
                          </Typography>
                          <Field
                            name="commission"
                            as={OutlinedInput}
                            fullWidth
                            error={
                              touched.commission && Boolean(errors.commission)
                            }
                            placeholder="Enter commission"
                            value={values.commission || ""} // Fallback to empty string
                          />
                          <CustomErrorMessage name="commission" />
                        </Box>
                      </Grid>

                      <Grid item xs={12}>
                        <Box>
                          <Typography className="text-sm text-primary mb-1">
                            Notes (if any)
                          </Typography>
                          <Field
                            name="notes"
                            as={OutlinedInput}
                            fullWidth
                            error={touched.notes && Boolean(errors.notes)}
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
