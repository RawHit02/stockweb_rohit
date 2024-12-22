import { ApiParamModel } from "../common/ApiParamModel";

export interface VendorManagementBuyerModel {
  id: string;
  vendorType: string;
  name: string;
  contactNumber: string;
  whatsappNumber: string;
  email: string;
  address: string;
  profileImage?: string | null; 
  createdBy?: string; 
  createdDate?: string; 
  updatedDate?: string; 
}

export interface BuyerDetailsModel {
  id: string;
  name: string;
  email: string;
  contactNumber: string;
  whatsappNumber: string;
  address: string;
}
export interface InitialBuyersModelState {
  message: string;
  itemCount: number;
  userError: string | undefined;
  getAllBuyers: VendorManagementBuyerModel[]; 
  createBuyerRes: string; 
  createBuyerLoading: boolean; 
  getAllBuyerLoading: boolean; 
}

export interface GetAllBuyersRequest extends ApiParamModel {
  userId?: string;
}

export interface CreateBuyerPayload {
  vendorType: string; 
  name: string; 
  contactNumber: string; 
  whatsappNumber: string;
  email: string; 
  address: string; 
}
