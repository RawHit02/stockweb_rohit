// validationSchema.ts

import * as Yup from "yup";

/**
 * Inward Stock Schema
 */


export const inwardStockSchemaDiamond = Yup.object({
  stockType: Yup.string()
    .required("Stock type is required.")
    .nullable(),
  
  diamondType: Yup.string()
    .required("Diamond type is required.")
    .nullable(),

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
  description: Yup.string()
    .required("Description is required.")
    .min(1, "Description must be greater than 0 words."),

  unitPrice: Yup.number()
    .typeError("Unit Price must be a numeric value.")
    .required("Unit price is required.")
    .min(1, "Unit price must be greater than 0."),

  totalValue: Yup.number()
    .typeError("Total Value must be a numeric value.")
    .required("Total value is required.")
    .min(1, "Total value must be greater than 0."),

  location: Yup.string()
    .required("Location is required.")
    .nullable(),

  batchNumber: Yup.string()
    .matches(/^[a-zA-Z0-9]+$/, "Batch number must be alphanumeric.")
    .required("Batch number is required.")
    .nullable(),

  notes: Yup.string()
    .required("Notes is required.")
    .max(500, "Notes cannot exceed 500 characters.")
    .nullable(),

  commission: Yup.number()
    .required("Commission is required.")
    .typeError("Commission must be a numeric value.")
    .nullable(),

});


export const inwardStockSchemaGold = Yup.object({

  stockType: Yup.string()
    .required("Stock type is required.")
    .nullable(),

goldType: Yup.string()
    .required("Gold type is required.")
    .nullable(),
  
    formOfGold: Yup.string()
    .required("Form of gold is required.")
    .nullable(),

  purity: Yup.string()
    .required("Purity is required.")
    .nullable(),

  vendor: Yup.string()
    .required("Vendor is required.")
    .nullable(),

  quantity: Yup.number()
    .typeError("Quantity must be a numeric value.")
    .required("Quantity is required.")
    .min(1, "Quantity must be greater than 0."),

  description: Yup.string()
    .required("Description is required.")
    .min(1, "Description must be greater than 0 words."),

  unitPrice: Yup.number()
    .typeError("Unit Price must be a numeric value.")
    .required("Unit price is required.")
    .min(1, "Unit price must be greater than 0."),

  totalValue: Yup.number()
    .typeError("Total Value must be a numeric value.")
    .required("Total value is required.")
    .min(1, "Total value must be greater than 0."),

  location: Yup.string()
    .required("Location is required.")
    .nullable(),

  batchNumber: Yup.string()
    .matches(/^[a-zA-Z0-9]+$/, "Batch number must be alphanumeric.")
    .required("Batch number is required.")
    .nullable(),

  notes: Yup.string()
    .required("Notes is required.")
    .max(500, "Notes cannot exceed 500 characters.")
    .nullable(),

  commission: Yup.number()
    .required("Commission is required.")
    .typeError("Commission must be a numeric value.")
    .nullable(),
    });


    export const inwardStockSchemaSilver = Yup.object({

      stockType: Yup.string()
    .required("Stock type is required.")
    .nullable(),

  silverType: Yup.string()
    .required("Silver type is required.")
    .nullable(),

  sclarity: Yup.string()
    .required("Clarity is required.")
    .nullable(),

  formOfSilver: Yup.string()
    .required("form of silver is Required")
    .nullable(),
      
  vendor: Yup.string()
    .required("Vendor is required.")
    .nullable(),

  quantity: Yup.number()
    .typeError("Quantity must be a numeric value.")
    .required("Quantity is required.")
    .min(1, "Quantity must be greater than 0."),

  description: Yup.string()
    .required("Description is required.")
    .min(1, "Description must be greater than 0 words."),

  unitPrice: Yup.number()
    .typeError("Unit Price must be a numeric value.")
    .required("Unit price is required.")
    .min(1, "Unit price must be greater than 0."),

  totalValue: Yup.number()
    .typeError("Total Value must be a numeric value.")
    .required("Total value is required.")
    .min(1, "Total value must be greater than 0."),

  location: Yup.string()
    .required("Location is required.")
    .nullable(),

  batchNumber: Yup.string()
    .matches(/^[a-zA-Z0-9]+$/, "Batch number must be alphanumeric.")
    .required("Batch number is required.")
    .nullable(),

  notes: Yup.string()
    .required("Notes is required.")
    .max(500, "Notes cannot exceed 500 characters.")
    .nullable(),

  commission: Yup.number()
    .required("Commission is required.")
    .typeError("Commission must be a numeric value.")
    .nullable(),

    });


/**
 * Outward Stock Schema
 */

export const outwardStockSchemaDiamond = Yup.object({
  stockType: Yup.string()
    .required("Stock type is required.")
    .nullable(),
  
  diamondType: Yup.string()
    .required("Diamond type is required.")
    .nullable(),

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
  description: Yup.string()
    .required("Description is required.")
    .min(1, "Description must be greater than 0 words."),

  unitPrice: Yup.number()
    .typeError("Unit Price must be a numeric value.")
    .required("Unit price is required.")
    .min(1, "Unit price must be greater than 0."),

  totalValue: Yup.number()
    .typeError("Total Value must be a numeric value.")
    .required("Total value is required.")
    .min(1, "Total value must be greater than 0."),

  location: Yup.string()
    .required("Location is required.")
    .nullable(),

  batchNumber: Yup.string()
    .matches(/^[a-zA-Z0-9]+$/, "Batch number must be alphanumeric.")
    .required("Batch number is required.")
    .nullable(),

  notes: Yup.string()
    .required("Notes is required.")
    .max(500, "Notes cannot exceed 500 characters.")
    .nullable(),

  commission: Yup.number()
    .required("Commission is required.")
    .typeError("Commission must be a numeric value.")
    .nullable(),

});


export const outwardStockSchemaGold = Yup.object({

  stockType: Yup.string()
    .required("Stock type is required.")
    .nullable(),

goldType: Yup.string()
    .required("Gold type is required.")
    .nullable(),
  formOfGold: Yup.string()
    .required("Form of gold is required.")
    .nullable(),

  purity: Yup.string()
    .required("Purity is required.")
    .nullable(),

  vendor: Yup.string()
    .required("Vendor is required.")
    .nullable(),

  quantity: Yup.number()
    .typeError("Quantity must be a numeric value.")
    .required("Quantity is required.")
    .min(1, "Quantity must be greater than 0."),

  description: Yup.string()
    .required("Description is required.")
    .min(1, "Description must be greater than 0 words."),

  unitPrice: Yup.number()
    .typeError("Unit Price must be a numeric value.")
    .required("Unit price is required.")
    .min(1, "Unit price must be greater than 0."),

  totalValue: Yup.number()
    .typeError("Total Value must be a numeric value.")
    .required("Total value is required.")
    .min(1, "Total value must be greater than 0."),

  location: Yup.string()
    .required("Location is required.")
    .nullable(),

  batchNumber: Yup.string()
    .matches(/^[a-zA-Z0-9]+$/, "Batch number must be alphanumeric.")
    .required("Batch number is required.")
    .nullable(),

  notes: Yup.string()
    .required("Notes is required.")
    .max(500, "Notes cannot exceed 500 characters.")
    .nullable(),

  commission: Yup.number()
    .required("Commission is required.")
    .typeError("Commission must be a numeric value.")
    .nullable(),

    });



  export const outwardStockSchemaSilver = Yup.object({

  stockType: Yup.string()
    .required("Stock type is required.")
    .nullable(),

  silverType: Yup.string()
    .required("Silver type is required.")
    .nullable(),

  sclarity: Yup.string()
    .required("Clarity is required.")
    .nullable(),

  formOfSilver: Yup.string()
    .required("form of silver is Required")
    .nullable(),
      
  vendor: Yup.string()
    .required("Vendor is required.")
    .nullable(),

  quantity: Yup.number()
    .typeError("Quantity must be a numeric value.")
    .required("Quantity is required.")
    .min(1, "Quantity must be greater than 0."),

  description: Yup.string()
    .required("Description is required.")
    .min(1, "Description must be greater than 0 words."),

  unitPrice: Yup.number()
    .typeError("Unit Price must be a numeric value.")
    .required("Unit price is required.")
    .min(1, "Unit price must be greater than 0."),

  totalValue: Yup.number()
    .typeError("Total Value must be a numeric value.")
    .required("Total value is required.")
    .min(1, "Total value must be greater than 0."),

  location: Yup.string()
    .required("Location is required.")
    .nullable(),

  batchNumber: Yup.string()
    .matches(/^[a-zA-Z0-9]+$/, "Batch number must be alphanumeric.")
    .required("Batch number is required.")
    .nullable(),

  notes: Yup.string()
    .required("Notes is required.")
    .max(500, "Notes cannot exceed 500 characters.")
    .nullable(),

  commission: Yup.number()
    .required("Commission is required.")
    .typeError("Commission must be a numeric value.")
    .nullable(),

    });









