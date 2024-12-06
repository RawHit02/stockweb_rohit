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
 // stockType: string;
  transId: string;
  description: string;
  itemType: string;
  quantity: string;
  unitPrice: string;
  commission: string;
  totalValue: string;
  batchNumber: string;
  supplierName?: string;
  receivedBy: string;
  goldType: string;
  diamondType: string;
  clarity: string;
  colorGrade: string;
  issuedBy: string;

  silverType: string;

  location: string;
  notes: string;
  vendor?: string;
}
