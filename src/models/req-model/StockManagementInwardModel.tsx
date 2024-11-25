import { ApiParamModel } from "../common/ApiParamModel";

export interface StockManagementInwardModel {
  id: string;
  date : string;
  transId: string;
  stockType: string;
  itemType: string;
  description: string;
  quantity: string;
  unitPrice: string;
  totalValue: string;
  batchNo: string;
  commission : number;
  receivedBy: string;
  supplierName: string;
  location: string;
  notes: string;
  createdBy: string;
  createdDate: string;
  updatedDate: string;
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

export interface GetAllInwardsRequest extends ApiParamModel {
  userId?: string;
}

export interface CreateStockInwardPayload {
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
