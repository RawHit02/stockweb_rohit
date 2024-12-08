import * as Yup from "yup";

export const addBuyerSchema = Yup.object().shape({
  name: Yup.string().required("Please enter the buyer's name"),
  contactNumber: Yup.string()
    .required("Contact number is required")
    .matches(/^[0-9]+$/, "Contact number not Valid ")
    .min(10, "Contact number must be at least 10 digits")
    .max(10, "Contact number can't exceed 10 digits"),
  whatsappNumber: Yup.string()
    .required("WhatsApp number is required")
    .matches(/^[0-9]+$/, "WhatsApp Number not Valid ")
    .min(10, "WhatsApp number must be at least 10 digits")
    .max(10, "WhatsApp number can't exceed 10 digits"),
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required"),
  address: Yup.string().required("Address is required"),
  profileImage: Yup.mixed().nullable(),
});
