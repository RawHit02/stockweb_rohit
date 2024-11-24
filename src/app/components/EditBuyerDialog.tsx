import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  IconButton,
  Typography,
  //OutlinedInput,
  //InputAdornment,
} from "@mui/material";
import { Formik, Form } from "formik";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { editBuyerAction } from "@/redux/vendor_management/vendor_management.actions";
import { CloseOutlinedIcon, CheckCircleIcon } from "../assets";
import { useSnackbar } from "notistack";
import { addBuyerSchema } from "@/yupSchema/addBuyerSchema";

interface EditBuyerDialogProps {
  isOpen: boolean;
  onClose: () => void;
  buyerData: any; // Replace with appropriate type
}

const EditBuyerDialog: React.FC<EditBuyerDialogProps> = ({
  isOpen,
  onClose,
  buyerData,
}) => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async (values: any, { resetForm }: { resetForm: () => void }) => {
    const editBuyerPayload = {
      vendorType: "Buyer",
      name: values.name,
      contactNumber: values.contactNumber,
      whatsappNumber: values.whatsappNumber,
      email: values.email,
      address: values.address,
    };

    try {
      await dispatch(
        editBuyerAction({ editBuyerPayload, buyerId: buyerData.id })
      ).unwrap();
      enqueueSnackbar("Buyer updated successfully!", { variant: "success" });
      resetForm();
      onClose();
    } catch (error) {
      enqueueSnackbar("Failed to update buyer.", { variant: "error" });
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="sm">
      <DialogTitle>
        <Typography>Edit Buyer</Typography>
        <IconButton onClick={onClose}>
          <CloseOutlinedIcon />
        </IconButton>
      </DialogTitle>
      <Formik
        initialValues={{
          name: buyerData.name || "",
          contactNumber: buyerData.contactNumber || "",
          whatsappNumber: buyerData.whatsappNumber || "",
          email: buyerData.email || "",
          address: buyerData.address || "",
        }}
        validationSchema={addBuyerSchema}
        onSubmit={handleSubmit}
      >
        {({ touched, errors }) => (
          <Form>
            <DialogContent>
              {/* Form Fields (similar to AddNewBuyerDialog) */}
            </DialogContent>
            <DialogActions>
              <Button onClick={onClose}>Cancel</Button>
              <Button type="submit" variant="contained" startIcon={<CheckCircleIcon />}>
                Save
              </Button>
            </DialogActions>
          </Form>
        )}
      </Formik>
    </Dialog>
  );
};

export default EditBuyerDialog;
