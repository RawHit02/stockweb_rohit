// src/yupSchema/addBuyerSchema.ts
import * as Yup from "yup";
import { ValidationError } from "@/constants/ValidationError";

export const addBuyerSchema = Yup.object().shape({
    name: Yup.string().required(ValidationError.NAMEREQUIRED),
    contactNumber: Yup.string()
        .required(ValidationError.CONTACTNUMBERREQUIRED)
        .matches(/^[0-9]{10}$/, ValidationError.CONTACTNUMBERINVALID),
    whatsappNumber: Yup.string()
        .required(ValidationError.WHATSAPPNUMBERREQUIRED)
        .matches(/^[0-9]{10}$/, ValidationError.WHATSAPPNUMBERINVALID),
    email: Yup.string()
        .required(ValidationError.EMAILREQUIRED)
        .email(ValidationError.EMAILINVALID),
    address: Yup.string().required(ValidationError.ADDRESSREQUIRED),
});
