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

// Request parameters for fetching all sellers (pagination, sorting, etc.)
export interface GetAllSellersRequest extends ApiParamModel {
  userId?: string; // Optional userId for filtering sellers
}

// Payload for creating a new seller
export interface CreateSellersPayload {
  vendorType: string; // Should always be "seller"
  name: string; // Seller's name
  contactNumber: string; // Seller's contact number
  whatsappNumber: string; // Seller's WhatsApp number
  email: string; // Seller's email
  address: string; // Seller's address
}
