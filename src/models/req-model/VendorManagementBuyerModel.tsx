import { ApiParamModel } from "../common/ApiParamModel";

export interface VendorManagementBuyerModel {
  profileImage: any;
  id: string;
  vendorType: string;
  name: string;
  contactNumber: string;
  whatsappNumber: string;
  email: string;
  address: string;
  createdBy: string;
  createdDate: string;
  updatedDate: string;
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
