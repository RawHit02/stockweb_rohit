//import react from "react";
import { enqueueSnackbar } from "notistack";

const SuccessToast = (message: string) => {
  enqueueSnackbar(message, {
    variant: "success",
    anchorOrigin: { horizontal: "right", vertical: "top" },
  });
};

const WarningToast = (message: string) => {
  enqueueSnackbar(message, {
    variant: "warning",
    anchorOrigin: { horizontal: "right", vertical: "top" },
  });
};

const ErrorToast = (message: string) => {
  enqueueSnackbar(message, {
    variant: "error",
    anchorOrigin: { horizontal: "right", vertical: "top" },
  });
};

const CustomToast = { SuccessToast, WarningToast, ErrorToast };
export default CustomToast;
