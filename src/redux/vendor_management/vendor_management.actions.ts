import CustomToast from "@/app/components/CustomToast";
import { apiClient } from "@/base-url/apiClient";
import {
  CREATE_VENDOR,
  GET_ALL_BUYERS,
  GET_ALL_SELLERS,
  DELETE_VENDOR,
  EDIT_VENDOR,
  GET_ALL_BUYERS_NEW,
  GET_ALL_SELLERS_NEW,
} from "@/base-url/apiRoutes";
import {
  CreateBuyerPayload,
  GetAllBuyersRequest,
  VendorManagementBuyerModel,
} from "@/models/req-model/VendorManagementBuyerModel";
import {
  CreateSellersPayload,
  GetAllSellersRequest,
  VendorManagementSellerModel,
} from "@/models/req-model/VendorManagementSellerModel";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Create Buyer
export const createBuyer = createAsyncThunk<
  { data: VendorManagementBuyerModel; message: string },
  { createBuyerPayload: CreateBuyerPayload },
  { rejectValue: { message: string; status?: number } }
>(
  "vendorManagement/createBuyer",
  async ({ createBuyerPayload }, { rejectWithValue }) => {
    try {
      const body = {
        vendorType: "buyer",
        name: createBuyerPayload.name,
        contactNumber: "+91" + createBuyerPayload.contactNumber,
        whatsappNumber: "+91" + createBuyerPayload.whatsappNumber,
        email: createBuyerPayload.email,
        address: createBuyerPayload.address,
      };
      const res = await apiClient.post(CREATE_VENDOR, body);
      return { data: res.data.data, message: res.data.message };
    } catch (error: any) {
      console.error(
        "Error occurred while creating buyer:",
        error.response?.data || error.message
      );
      const status = error.response?.status || 500;
      CustomToast.ErrorToast(
        error?.response?.data?.message || "Something went wrong"
      );
      return rejectWithValue({
        message: error.response?.data?.message || "Failed to create buyer",
        status,
      });
    }
  }
);

// Create Seller
export const createSeller = createAsyncThunk<
  { data: VendorManagementSellerModel; message: string },
  { createSellerPayload: CreateSellersPayload },
  { rejectValue: { message: string; status?: number } }
>(
  "vendorManagement/createSeller",
  async ({ createSellerPayload }, { rejectWithValue }) => {
    try {
      const body = {
        vendorType: "supplier",
        name: createSellerPayload.name,
        contactNumber: "+91" + createSellerPayload.contactNumber,
        whatsappNumber: "+91" + createSellerPayload.whatsappNumber,
        email: createSellerPayload.email,
        address: createSellerPayload.address,
      };
      const res = await apiClient.post(CREATE_VENDOR, body);
      return { data: res.data.data, message: res.data.message };
    } catch (error: any) {
      console.error(
        "Error occurred while creating seller:",
        error.response?.data || error.message
      );
      const status = error.response?.status || 500;
      CustomToast.ErrorToast(
        error?.response?.data?.message || "Something went wrong"
      );
      return rejectWithValue({
        message: error.response?.data?.message || "Failed to create seller",
        status,
      });
    }
  }
);

// Get All Buyers
export const getAllBuyersAction = createAsyncThunk<
  { data: VendorManagementBuyerModel[]; itemCount: number },
  {
    commonApiParamModel: GetAllBuyersRequest;
  },
  { rejectValue: { message: string; status?: number } }
>(
  "vendorManagement/getBuyers",
  async ({ commonApiParamModel }, { rejectWithValue }) => {
    try {
      const options = {
        params: {
          page: commonApiParamModel.page,
          take: commonApiParamModel.take,
          order: commonApiParamModel.order?.toUpperCase(),
          orderBy: commonApiParamModel.orderBy,
          search: commonApiParamModel.search,
        },
      };
      const res = await apiClient.get(`${GET_ALL_BUYERS}`, options);
      let data: VendorManagementBuyerModel[] = [];
      if (res?.data?.data.data) data = res.data.data.data;
      return { data, itemCount: res.data.data.meta.itemCount };
    } catch (error: any) {
      console.error("Error occurred:", error);
      const status = error.response?.status || 500;
      CustomToast.ErrorToast(
        error?.response?.data?.message || error?.message || "Failed to fetch buyers"
      );
      return rejectWithValue({
        message: "Failed to fetch buyers",
        status,
      });
    }
  }
);

// Get All Sellers
export const getAllSellersAction = createAsyncThunk<
  { data: VendorManagementSellerModel[]; itemCount: number },
  {
    commonApiParamModel: GetAllSellersRequest;
  },
  { rejectValue: { message: string; status?: number } }
>(
  "vendorManagement/getSellers",
  async ({ commonApiParamModel }, { rejectWithValue }) => {
    try {
      const options = {
        params: {
          page: commonApiParamModel.page,
          take: commonApiParamModel.take,
          order: commonApiParamModel.order?.toUpperCase(),
          orderBy: commonApiParamModel.orderBy,
          search: commonApiParamModel.search,
        },
      };
      const res = await apiClient.get(`${GET_ALL_SELLERS}`, options);
      let data: VendorManagementSellerModel[] = [];
      if (res?.data?.data.data) data = res.data.data.data;
      return { data, itemCount: res.data.data.meta.itemCount };
    } catch (error: any) {
      console.error("Error occurred:", error);
      const status = error.response?.status || 500;
      CustomToast.ErrorToast(
        error?.response?.data?.message || error?.message || "Failed to fetch sellers"
      );
      return rejectWithValue({
        message: "Failed to fetch sellers",
        status,
      });
    }
  }
);

// Edit Buyer
export const editBuyerAction = createAsyncThunk<
  { data: VendorManagementBuyerModel; message: string },
  { editBuyerPayload: CreateBuyerPayload; buyerId: string },
  { rejectValue: { message: string; status?: number } }
>(
  "vendorManagement/editBuyer",
  async ({ editBuyerPayload, buyerId }, { rejectWithValue }) => {
    try {
      const body = {
        ...editBuyerPayload,
      };
      const res = await apiClient.patch(`${EDIT_VENDOR}/${buyerId}`, body);
      return { data: res.data.data, message: res.data.message };
    } catch (error: any) {
      console.error("Error occurred while editing buyer:", error);
      const status = error.response?.status || 500;
      CustomToast.ErrorToast(
        error?.response?.data?.message || "Something went wrong"
      );
      return rejectWithValue({
        message: "Failed to update buyer",
        status,
      });
    }
  }
);

// Edit Seller
export const editSellerAction = createAsyncThunk<
  { data: VendorManagementSellerModel; message: string },
  { editSellerPayload: CreateSellersPayload; supplierId: string },
  { rejectValue: { message: string; status?: number } }
>(
  "vendorManagement/editSeller",
  async ({ editSellerPayload, supplierId }, { rejectWithValue }) => {
    try {
      const body = {
        ...editSellerPayload,
      };
      const res = await apiClient.patch(`${EDIT_VENDOR}/${supplierId}`, body);
      return { data: res.data.data, message: res.data.message };
    } catch (error: any) {
      console.error("Error occurred while editing seller:", error);
      const status = error.response?.status || 500;
      CustomToast.ErrorToast(
        error?.response?.data?.message || "Something went wrong"
      );
      return rejectWithValue({
        message: "Failed to update seller",
        status,
      });
    }
  }
);

// Delete Buyer
export const deleteBuyerAction = createAsyncThunk<
  { message: string },
  string, // buyerId
  { rejectValue: { message: string; status?: number } }
>(
  "vendorManagement/deleteBuyer",
  async (buyerId, { rejectWithValue }) => {
    try {
      const response = await apiClient._delete(`${DELETE_VENDOR}/${buyerId}`);
      return { message: "Buyer deleted successfully" };
    } catch (error: any) {
      console.error(
        "Error occurred while deleting buyer:",
        error.response?.data || error.message
      );
      const status = error.response?.status || 500;
      return rejectWithValue({
        message: "Failed to delete buyer",
        status,
      });
    }
  }
);

// Delete Seller
export const deleteSellerAction = createAsyncThunk<
  { message: string },
  string, // sellerId
  { rejectValue: { message: string; status?: number } }
>(
  "vendorManagement/deleteSeller",
  async (sellerId, { rejectWithValue }) => {
    try {
      const response = await apiClient._delete(`${DELETE_VENDOR}/${sellerId}`);
      return { message: "Seller deleted successfully" };
    } catch (error: any) {
      console.error(
        "Error occurred while deleting seller:",
        error.response?.data || error.message
      );
      const status = error.response?.status || 500;
      return rejectWithValue({
        message: "Failed to delete seller",
        status,
      });
    }
  }
);

// Fetch Buyers 
export const fetchBuyersAction = createAsyncThunk<
  { data: VendorManagementBuyerModel[]; meta: { itemCount: number } },
  { page: number; take: number },
  { rejectValue: { message: string } }
>(
  "vendorManagement/fetchBuyers",
  async ({ page, take }, { rejectWithValue }) => {
    try {
      const options = {
        params: {
          page,
          take,
        },
      };

      console.log("API URL:", GET_ALL_BUYERS, "Params:", options);

      const response = await apiClient.get(GET_ALL_BUYERS, options);
      return {
        data: response.data.data.data, // Fetched buyers
        meta: response.data.data.meta, // Metadata (pagination)
      };
    } catch (error: any) {
      console.error("Error occurred while fetching buyers:", error);
      CustomToast.ErrorToast(
        error?.response?.data?.message || "Failed to fetch buyers."
      );
      return rejectWithValue({
        message: error.response?.data?.message || "An error occurred.",
      });
    }
  }
);

// Fetch Sellers
export const fetchSellersAction = createAsyncThunk<
  { data: VendorManagementSellerModel[]; meta: { itemCount: number } },
  { page: number; take: number },
  { rejectValue: { message: string } }
>(
  "vendorManagement/fetchSellers",
  async ({ page, take }, { rejectWithValue }) => {
    try {
      const options = {
        params: {
          page,
          take,
        },
      };

      console.log("API URL:", GET_ALL_SELLERS, "Params:", options);

      const response = await apiClient.get(GET_ALL_SELLERS, options);
      return {
        data: response.data.data.data, // Fetched sellers
        meta: response.data.data.meta, // Metadata (pagination)
      };
    } catch (error: any) {
      console.error("Error occurred while fetching sellers:", error);
      CustomToast.ErrorToast(
        error?.response?.data?.message || "Failed to fetch sellers."
      );
      return rejectWithValue({
        message: error.response?.data?.message || "An error occurred.",
      });
    }
  }
);


// new All buyers for Buyer details 
export const getAllBuyersNewAction = async () => {
  try {
    const response = await fetch(GET_ALL_BUYERS_NEW);
    const result = await response.json();
    if (result?.statusCode === 200) {
      return result.data; 
    } else {
      throw new Error("Failed to fetch buyers.");
    }
  } catch (error) {
    console.error("Error fetching buyers:", error);
    throw error;
  }
};

// new All Sellers for the Sellers details 
export const getAllSellersNewAction = async () => {
  try {
    const response = await fetch(GET_ALL_SELLERS_NEW);
    const result = await response.json();
    if (result?.statusCode === 200) {
      return result.data;
    } else {
      throw new Error("Failed to fetch suppliers.");
    }
  } catch (error) {
    console.error("Error fetching suppliers:", error);
    throw error;
  }
};


