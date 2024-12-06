import * as Yup from "yup";

// Inward stock validation schema
export const inwardStockSchema = Yup.object({
  stockType: Yup.string().required("Stock type is required"),
  transId: Yup.string().required("Transaction ID is required"),
  description: Yup.string().required("Description is required"),
  itemType: Yup.string().required("Item type is required"),
  purity: Yup.string().required("Purity is required"),
  formOfGold: Yup.string().required("Form of gold is required"),
  goldType: Yup.string().required("Gold type is required"),
  vendor: Yup.string().required("Vendor is required"),
  quantity: Yup.number()
    .typeError("Quantity must be a number")
    .required("Quantity is required")
    .min(1, "Quantity must be greater than 0"),
  weight: Yup.number()
    .required("Weight is required")
    .min(1, "Weight must be greater than 0"),
  unitPrice: Yup.number()
    .typeError("Unit Price must be a number")
    .required("Unit price is required")
    .min(1, "Unit price must be greater than 0"),
  totalValue: Yup.number()
    .typeError("Total Value must be a number")
    .required("Total value is required")
    .min(1, "Total value must be greater than 0"),
  location: Yup.string().required("Location is required"),
  purchaseMargin: Yup.number()
    .typeError("Purchase Margin must be a number")
    .required("Purchase margin is required")
    .min(0, "Purchase margin cannot be negative"),
  notes: Yup.string().max(500, "Notes cannot exceed 500 characters"),
});

// Outward stock validation schema
export const outwardStockSchema = Yup.object({
  stockType: Yup.string().required("Stock type is required"),
  transId: Yup.string(), // Optional for outward stock
  description: Yup.string().required("Description is required"),
  diamondType: Yup.string().required("Diamond type is required"),
  caratWeight: Yup.number()
    .typeError("Carat weight must be a number")
    .required("Carat weight is required")
    .min(0, "Carat weight cannot be negative"),
  clarity: Yup.string().required("Clarity is required"),
  colorGrade: Yup.string().required("Color grade is required"),
  cutGrade: Yup.string().required("Cut grade is required"),
  vendor: Yup.string().required("Vendor is required"),
  quantity: Yup.number()
    .typeError("Quantity must be a number")
    .required("Quantity is required")
    .min(1, "Quantity must be greater than 0"),
  weight: Yup.number()
    .required("Weight is required")
    .min(1, "Weight must be greater than 0"),
  unitPrice: Yup.number()
    .typeError("Unit Price must be a number")
    .required("Unit price is required")
    .min(1, "Unit price must be greater than 0"),
  totalValue: Yup.number()
    .typeError("Total Value must be a number")
    .required("Total value is required")
    .min(1, "Total value must be greater than 0"),
  buyerName: Yup.string().required("Buyer name is required"),
  commission: Yup.number()
    .typeError("Commission must be a number")
    .required("Commission is required")
    .min(0, "Commission cannot be negative"),
  paymentStatus: Yup.string().required("Payment status is required"),
  amountReceived: Yup.number()
    .required("Amount received is required")
    .min(0, "Amount received cannot be negative"),
  notes: Yup.string().max(500, "Notes cannot exceed 500 characters"),
});
