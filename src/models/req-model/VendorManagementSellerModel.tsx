import { ApiParamModel } from "../common/ApiParamModel";

// Seller model structure
export interface VendorManagementSellerModel {
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


export interface SellerDetailsModel {
  id: string;
  name: string;
  email: string;
  contactNumber: string;
  whatsappNumber: string;
  address: string;
}


// Initial state model for Seller-related Redux state
export interface InitialSellersModelState {
  getAllSellers: VendorManagementSellerModel[];
  message: string;
  itemCount: number;
  userError: string | undefined;
  createSellerRes: string;
  createSellerLoading: boolean;
  getAllSellerLoading: boolean;

}

export interface GetAllSellersRequest extends ApiParamModel {
  userId?: string; 
}

export interface CreateSellersPayload {
  vendorType: string; 
  name: string; 
  contactNumber: string; 
  whatsappNumber: string; 
  email: string; 
  address: string; 
}
