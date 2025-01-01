import * as Yup from "yup";

// Inward stock validation schema
export const inwardStockSchema = Yup.object({
  itemType: Yup.string()
    .required("Item type is required.")
    .nullable(),
  goldType: Yup.string()
    .when("stockType", {
      is: (stockType: string) => stockType && stockType.toLowerCase() === "gold",
      then: (schema: Yup.StringSchema) =>
        schema.required("Gold type is required."),
      otherwise: (schema: Yup.StringSchema) => schema.nullable(),
    })
    .nullable(),
  formOfGold: Yup.string()
    .when("stockType", {
      is: (stockType: string) => stockType && stockType.toLowerCase() === "gold",
      then: (schema: Yup.StringSchema) =>
        schema.required("Form of gold is required."),
      otherwise: (schema: Yup.StringSchema) => schema.nullable(),
    })
    .nullable(),
  purity: Yup.string()
    .required("Purity is required.")
    .nullable(),
  vendor: Yup.string()
    .required("Vendor is required.")
    .nullable(),
  quantity: Yup.number()
    .typeError("Quantity must be a valid number.")
    .required("Quantity is required.")
    .min(1, "Quantity must be greater than 0."),
  description: Yup.string()
    .required("Description is required.")
    .min(1, "Description must be greater than 0 words."),
  unitPrice: Yup.number()
    .typeError("Unit Price must be a valid number.")
    .required("Unit price is required.")
    .min(1, "Unit price must be greater than 0."),
  totalValue: Yup.number()
    .typeError("Total Value must be a valid number.")
    .required("Total value is required.")
    .min(1, "Total value must be greater than 0."),
  location: Yup.string()
    .required("Location is required.")
    .nullable(),
  batchNumber: Yup.string()
      .required("Batch number is required")
      .min(0, "Batch Number cannot be negative."),
  notes: Yup.string()
    .max(500, "Notes cannot exceed 500 characters.")
    .nullable(), // Allows notes to be optional
});

// Outward stock validation schema
export const outwardStockSchema = Yup.object({
 
  diamondType: Yup.string()
    .when("stockType", {
      is: (stockType: string) =>
        stockType && stockType.toLowerCase() === "diamond",
      then: (schema: Yup.StringSchema) =>
        schema.required("Diamond type is required."),
      otherwise: (schema: Yup.StringSchema) => schema.nullable(),
    })
    .nullable(),
  description: Yup.string()
    .max(500, "description cannot exceed 500 characters.")
    .nullable(), // Allows notes to be optional
  clarity: Yup.string()
    .required("Clarity is required.")
    .nullable(),
  colorGrade: Yup.string()
    .required("Color grade is required.")
    .nullable(),
  cutGrade: Yup.string()
    .required("Cut grade is required.")
    .nullable(),
  vendor: Yup.string()
    .required("Vendor is required.")
    .nullable(),
  quantity: Yup.number()
    .typeError("Quantity must be a valid number.")
    .required("Quantity is required.")
    .min(1, "Quantity must be greater than 0."),
  unitPrice: Yup.number()
    .typeError("Unit Price must be a valid number.")
    .required("Unit price is required.")
    .min(1, "Unit price must be greater than 0."),
  totalValue: Yup.number()
    .typeError("Total Value must be a valid number.")
    .required("Total value is required.")
    .min(1, "Total value must be greater than 0."),
  buyerName: Yup.string()
    .required("Buyer name is required.")
    .nullable(),
  commission: Yup.number()
    .typeError("Commission must be a valid number.")
    .nullable()
    .min(0, "Commission cannot be negative."),
  paymentStatus: Yup.string()
    .required("Payment status is required.")
    .nullable(),
  batchNumber: Yup.number()
    .typeError("batch number must be a valid number.")
    .nullable()
    .min(0, "batch number cannot be null."),
  notes: Yup.string()
    .max(500, "Notes cannot exceed 500 characters.")
    .nullable(), // Allows notes to be optional
});
