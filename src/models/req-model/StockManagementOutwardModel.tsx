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
  issuedBy : string;
  goldType: string;
  diamondType: string;
  clarity: string;
  colorGrade: string;
  silverType: string;
  buyerName?: string;
  location: string;
  notes: string;
  vendor?: string;
}
