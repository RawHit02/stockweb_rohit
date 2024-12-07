import { ApiParamModel } from "../common/ApiParamModel";

export interface StockManagementOutwardModel {
  id: string;
  // date: string;
  stockType: string;
  transId: string;
  itemType: string;
  description: string;
  quantity: string;
  unitPrice: string;
  totalValue: string;
  batchNumber: string;
  commission: string;
  buyerName: string;
  location: string;
  notes: string;
  createdBy: string;
  receivedBy: string;
  createdDate: string;
  goldType: string;
  diamondType: string;
  clarity: string;
  colorGrade: string;
  issuedBy: string;

  silverType: string;

  updatedDate: string;
  vendor?: string;
}

export interface InitialOutwardsModelState {
  message: string;
  itemCount: number;
  userError: string | undefined;
  getAllOutwards: StockManagementOutwardModel[];
  createOutwardRes: string;
  createOutwardLoading: boolean;
  getAllOutwardLoading: boolean;
 // selectedSupplierId: null;
}

export interface GetAllOutwardsRequest extends ApiParamModel {
  userId?: string;
}

export interface CreateStockOutwardPayload {
  stockType: string; // Required
  transId: string; // Required
  description: string; // Required
  itemType: string; // Required
  quantity: string; // Required
  unitPrice: string; // Required
  commission: string; // Required
  totalValue: string; // Required
  batchNumber: string; // Required
  receivedBy: string; // Required
  issuedBy: string; // Required
  goldType: string; // Required
  diamondType: string; // Required
  clarity: string; // Required
  colorGrade: string; // Required
  silverType: string; // Required
  buyerName?: string; // Optional
  location: string; // Required
  notes: string; // Optional
  vendor?: string; // Optional
}