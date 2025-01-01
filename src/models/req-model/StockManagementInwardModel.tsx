import { ApiParamModel } from "../common/ApiParamModel";

export interface StockManagementInwardModel {
  id: string;
  transId: string; // Transaction ID
  stockType: string; // Specifies the type, always "inward"
  description: string; // Description of the stock
  quantity: string; // Quantity of stock
  unitPrice: string; // Price per unit
  totalValue: string; // Total value of the stock
  commission: string; // Commission applicable
  batchNumber: string; // Batch number
  location: string; // Location of stock
  notes: string; // Additional notes
  vendor: string; // Supplier ID
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
  paymentStatus: string; // For outward alignment if reused
  createdBy: string; // Created by user
  createdDate: string; // Creation date
  updatedDate: string; // Last updated date
  goldType: string;
}


export interface InitialInwardsModelState {
  message: string;
  itemCount: number;
  userError: string | undefined;
  getAllInwards: StockManagementInwardModel[];
  createInwardRes: string;
  createInwardLoading: boolean;
  getAllInwardLoading: boolean;
}

export interface GetAllInwardsRequest extends ApiParamModel{
  TransId?: string;
}

export interface CreateStockInwardPayload {
  stockType: string; // Must be "inward"
  transId: string; // Transaction ID
  description: string; // Stock description
  quantity: string; // Quantity of stock
  unitPrice: string; // Price per unit
  totalValue: string; // Total stock value
  commission: string; // Commission amount
  batchNumber: string; // Batch number
  location: string; // Stock location
  notes: string; // Optional notes
  vendor: string; // Supplier ID
  ornament: string; // Ornament ID
  type: string; // Ornament type ID
  form: string; // Ornament form ID
  purity: string; // Ornament purity ID
  color: string; // Optional for Gold/Silver
  cutGrade: string; // Optional for Diamond
}
