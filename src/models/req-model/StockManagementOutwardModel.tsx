import { ApiParamModel } from "../common/ApiParamModel";

export interface StockManagementOutwardModel {
  id: string;
  transId: string; // Transaction ID
  stockType: string; // Specifies the type, always "outward"
  description: string; // Description of the stock
  quantity: string; // Quantity of stock
  unitPrice: string; // Price per unit
  totalValue: string; // Total value of the stock
  commission: string; // Commission applicable
  batchNumber: string; // Batch number
  location: string; // Location of stock
  notes: string; // Additional notes
  vendor: string; // Buyer ID
  ornament: string; // Ornament ID
  type: string; // Ornament type ID
  form: string; // Ornament form ID
  purity: string; // Ornament purity ID
  color: string; // Ornament color ID (optional for Gold/Silver)
  formOfGold: string; // Specific to Gold
  diamondType: string; // Specific to Diamond
  silverType: string; // Specific to Silver
  cutGrade: string; // Specific to Diamond
  clarity: string; // Specific to Diamond
  sclarity: string; // Specific to Silver clarity
  colorGrade: string; // Specific to Diamond
  paymentStatus: string; // Payment status (Pending/Completed/Partial)
  createdBy: string; // Created by user
  createdDate: string; // Creation date
  updatedDate: string; // Last updated date
  goldType : string;
}

export interface InitialOutwardsModelState {
  message: string;
  itemCount: number;
  userError: string | undefined;
  getAllOutwards: StockManagementOutwardModel[];
  createOutwardRes: string;
  createOutwardLoading: boolean;
  getAllOutwardLoading: boolean;
}

export interface GetAllOutwardsRequest extends ApiParamModel {
  userId?: string;
}

export interface CreateStockOutwardPayload {
  stockType: string; // Must be "outward"
  transId: string; // Transaction ID
  description: string; // Stock description
  quantity: string; // Quantity of stock
  unitPrice: string; // Price per unit
  totalValue: string; // Total stock value
  commission: string; // Commission amount
  batchNumber: string; // Batch number
  location: string; // Stock location
  notes: string; // Optional notes
  vendor: string; // Buyer ID
  ornament: string; // Ornament ID
  type: string; // Ornament type ID
  form: string; // Ornament form ID
  purity: string; // Ornament purity ID
  color: string; // Optional for Gold/Silver
  cutGrade: string; // Optional for Diamond
  paymentStatus: string; // Payment status
}
