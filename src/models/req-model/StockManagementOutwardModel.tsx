import { ApiParamModel } from "../common/ApiParamModel";

export interface StockManagementOutwardModel {
  id: string;
  date : string;
  supplierName : string;
  transId: string;
  stockType: string;
  itemType: string;
  description: string;
  quantity: string;
  unitPrice: string;
  totalValue: string;
  batchNo: string;
  commission : number;
  issuedBy: string;
  buyerName: string;
  location: string;
  notes: string;
  createdBy: string;
  createdDate: string;
  updatedDate: string;
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
  stockType: string;
  transId: string;
  description: string;
  itemType: string;
  quantity: string;
  unitPrice: string;
  commission: string; 
  totalValue: string;
  batchNumber: string;
  receivedBy: string;
  location: string;
  notes: string;
  vendorId: string;
}
