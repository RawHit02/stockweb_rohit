import { ApiParamModel } from "../common/ApiParamModel";

export interface StockManagementInwardModel {
  id: string;
  transId: string;
 // stockType: string;
  itemType: string;
  description: string;
  quantity: string;
  unitPrice: string;
  totalValue: string;
  batchNumber: string;
  commission: string;
  receivedBy: string;
  supplierName: string;
  location: string;
  notes: string;
  createdBy: string;
  createdDate: string;
  updatedDate: string;
  goldType: string;
  diamondType: string;
  silverType : string;
  colorGrade: string;
  issuedBy : string ;
  clarity: string;
  vendor?: string;
}

export interface InitialInwardsModelState {
 // selectedSupplierId: string,
  message: string;
  itemCount: number;
  userError: string | undefined;
  getAllInwards: StockManagementInwardModel[];
  createInwardRes: string;
  createInwardLoading: boolean;
  getAllInwardLoading: boolean;
}

export interface GetAllInwardsRequest extends ApiParamModel {
  TransId?: string;
}
export interface CreateStockInwardPayload {
  transId: string; // Required
  description: string; // Required
  itemType: string; // Required
  quantity: string; // Required
  unitPrice: string; // Required
  commission: string; // Required
  totalValue: string; // Required
  batchNumber: string; // Required
  receivedBy: string; // Required
  goldType: string; // Required
  diamondType: string; // Required
  clarity: string; // Required
  colorGrade: string; // Required
  issuedBy: string; // Required
  silverType: string; // Required
  location: string; // Required
  notes: string; // Optional
  vendor?: string; // Optional
}
