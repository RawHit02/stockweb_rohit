import { ApiParamModel } from "../common/ApiParamModel";

export interface StockManagementOutwardModel {
  id: any;
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
  vendor: any; // Buyer ID
  ornament: any; // Ornament ID
  type: any; // Ornament type ID
  form: any; // Ornament form ID
  purity: any; // Ornament purity ID
  color: any; // Ornament color ID (optional for Gold/Silver)
  // cut : string;
  grade : any;
  formOfGold: any; // Specific to Gold
  formOfSilver: any;
  diamondType: any; // Specific to Diamond
  silverType: any; // Specific to Silver
  cutGrade: any; // Specific to Diamond
  clarity: any; // Specific to Diamond
  sclarity: any; // Specific to Silver clarity
  colorGrade: any; // Specific to Diamond
  createdBy: string; // Created by user
  createdDate: string; // Creation date
  updatedDate: string; // Last updated date
  goldType: any;
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
  vendor: any; // Buyer ID
  ornament: any; // Ornament ID
  type: any; // Ornament type ID
  form: any; // Ornament form ID
  purity: any; // Ornament purity ID
  color: any; // Optional for Gold/Silver
  grade: any; // Optional for Diamond
}
