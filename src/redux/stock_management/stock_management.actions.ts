import CustomToast from "@/app/components/CustomToast";
import { apiClient } from "@/base-url/apiClient";
import {
  CREATE_STOCK,
  DELETE_STOCK,
  FETCH_INWARD_STOCK,
  FETCH_OUTWARD_STOCK,
  GET_ALL_BUYERS_AND_SUPPLIERS, // Updated API route for fetching buyers and suppliers
} from "@/base-url/apiRoutes";
import {
  CreateStockInwardPayload,
  GetAllInwardsRequest,
  StockManagementInwardModel,
} from "@/models/req-model/StockManagementInwardModel";
import {
  CreateStockOutwardPayload,
  GetAllOutwardsRequest,
  StockManagementOutwardModel,
} from "@/models/req-model/StockManagementOutwardModel";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState, AppDispatch } from "@/redux/store"; // Import types here



// fetch the Buyers and the Suppliers from here 
export const fetchBuyersAndSuppliers = createAsyncThunk<
  {
    data: {
      buyers: { id: string; name: string }[];
      suppliers: { id: string; name: string }[];
    };
  },
  "buyer" | "supplier", // Action input type
  { state: RootState; dispatch: AppDispatch }
>(
  "stockManagement/fetchBuyersAndSuppliers",
  async (type, { rejectWithValue }) => {
    try {
      const url =
        type === "supplier"
          ? "http://localhost:8001/api/v1/vendorManagement/getVendorNP/supplier"
          : "http://localhost:8001/api/v1/vendorManagement/getVendorNP/buyer";

      const res = await apiClient.get(url);

      // Transforming the response to only include 'id' and 'name'
      const data = res.data.data.map((item: { id: string; name: string }) => ({
        id: item.id,
        name: item.name,
      }));

      return {
        data:
          type === "supplier"
            ? { suppliers: data, buyers: [] }
            : { buyers: data, suppliers: [] },
      };
    } catch (error: any) {
      console.error(`Error occurred while fetching ${type}s:`, error);
      return rejectWithValue({
        message: error.response?.data?.message || `Failed to fetch ${type}s`,
      });
    }
  }
);

export const setSelectedVendorId = (vendor: string) => ({
  type: "stockManagement/setSelectedVendorId",
  payload: vendor,
});

// Create Inward
export const createInward = createAsyncThunk<
  { data: StockManagementInwardModel; message: string },
  { createInwardPayload: CreateStockInwardPayload },
  { rejectValue: { message: string; status?: number } }
>(
  "stockManagement/createInward",
  async ({ createInwardPayload }, { rejectWithValue, getState }) => {
    try {
      // Retrieve the selected vendor ID from the Redux state
      const selectedVendorId = (getState() as RootState).stockManagement
        .selectedVendorId;

      const body = {
        stockType: "inward",
        transId: createInwardPayload.transId,
        description: createInwardPayload.description,
        itemType: createInwardPayload.itemType,
        quantity: createInwardPayload.quantity,
        unitPrice: createInwardPayload.unitPrice,
        commission: createInwardPayload.commission,
        totalValue: createInwardPayload.totalValue,
        batchNumber: createInwardPayload.batchNumber,
        receivedBy: createInwardPayload.receivedBy,
        location: createInwardPayload.location,
        notes: createInwardPayload.notes,
        vendor: selectedVendorId,
        //other fields
      };
      console.log("Payload for API Call:", body); // Log the payload
      const res = await apiClient.post(CREATE_STOCK, body);
      return { data: res.data.data, message: res.data.message };
    } catch (error: any) {
      console.error("Error occurred while creating inward entry:", error);
      const status = error.response?.status || 500;
      return rejectWithValue({
        message: error.response?.data?.message || "Failed to create inward",
        status,
      });
    }
  }
);

// Create Outward
export const createOutward = createAsyncThunk<
  { data: StockManagementOutwardModel; message: string },
  { createOutwardPayload: CreateStockOutwardPayload },
  { rejectValue: { message: string; status?: number } }
>(
  "stockManagement/createOutward",
  async ({ createOutwardPayload }, { rejectWithValue, getState }) => {
    try {
      // Retrieve the selected vendor ID from the Redux state
      const selectedVendorId = (getState() as RootState).stockManagement.selectedVendorId;
      
    
      const body = {
        stockType: "outward",
        transId: createOutwardPayload.transId,
        description: createOutwardPayload.description,
        itemType: createOutwardPayload.itemType,
        quantity: createOutwardPayload.quantity,
        unitPrice: createOutwardPayload.unitPrice,
        commission: createOutwardPayload.commission,
        totalValue: createOutwardPayload.totalValue,
        batchNumber: createOutwardPayload.batchNumber,
        receivedBy: createOutwardPayload.receivedBy,
        location: createOutwardPayload.location,
        notes: createOutwardPayload.notes,
        vendor: selectedVendorId, // Use the selected vendor ID
        goldType: createOutwardPayload.goldType,
        diamondType: createOutwardPayload.diamondType,
        clarity: createOutwardPayload.clarity,
        colorGrade: createOutwardPayload.colorGrade,
        issuedBy: createOutwardPayload.issuedBy,
        silverType: createOutwardPayload.silverType,
      };

      const res = await apiClient.post(CREATE_STOCK, body);
      console.log("Create Outward Response:", res); // Debug log
      return { data: res.data.data, message: res.data.message };
    } catch (error: any) {
      console.error("Error occurred while creating outward entry:", error);
      return rejectWithValue({
        message: error.response?.data?.message || "Failed to create outward",
        status: error.response?.status || 500,
      });
    }
  }
);



// Get All Inwards
export const getAllInwardsAction = createAsyncThunk<
  { data: StockManagementInwardModel[]; itemCount: number },
  { commonApiParamModel: GetAllInwardsRequest },
  { rejectValue: { message: string; status?: number } }
>(
  "stockManagement/getInwards",
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
      const res = await apiClient.get(FETCH_INWARD_STOCK, options);
      let data: StockManagementInwardModel[] = [];
      if (res?.data?.data?.data) data = res.data.data.data;
      return { data, itemCount: res.data.data.meta.itemCount };
    } catch (error: any) {
      console.error("Error occurred while fetching inwards:", error);
      const status = error.response?.status || 500;
      CustomToast.ErrorToast(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to fetch inwards"
      );
      return rejectWithValue({
        message: "Failed to fetch inwards",
        status,
      });
    }
  }
);

// Get All Outwards
export const getAllOutwardsAction = createAsyncThunk<
  { data: StockManagementOutwardModel[]; itemCount: number },
  { commonApiParamModel: GetAllOutwardsRequest },
  { rejectValue: { message: string; status?: number } }
>(
  "stockManagement/getOutwards",
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
      const res = await apiClient.get(FETCH_OUTWARD_STOCK, options);
      let data: StockManagementOutwardModel[] = [];
      if (res?.data?.data?.data) data = res.data.data.data;
      return { data, itemCount: res.data.data.meta.itemCount };
    } catch (error: any) {
      console.error("Error occurred while fetching inwards:", error);
      const status = error.response?.status || 500;
      CustomToast.ErrorToast(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to fetch outwards"
      );
      return rejectWithValue({
        message: "Failed to fetch outwards",
        status,
      });
    }
  }
);

// Edit Inward
export const editInwardAction = createAsyncThunk<
  { data: StockManagementInwardModel; message: string },
  { editInwardPayload: CreateStockInwardPayload; inwardId: string },
  { rejectValue: { message: string; status?: number } }
>(
  "stockManagement/editInward",
  async ({ editInwardPayload, inwardId }, { rejectWithValue }) => {
    try {
      const res = await apiClient.patch(
        `${CREATE_STOCK}/${inwardId}`,
        editInwardPayload
      );
      return { data: res.data.data, message: res.data.message };
    } catch (error: any) {
      console.error("Error occurred while editing inward:", error);
      const status = error.response?.status || 500;
      CustomToast.ErrorToast(
        error?.response?.data?.message || "Something went wrong"
      );
      return rejectWithValue({
        message: "Failed to update inward",
        status,
      });
    }
  }
);

// Edit Outward
export const editOutwardAction = createAsyncThunk<
  { data: StockManagementOutwardModel; message: string },
  { editOutwardPayload: CreateStockOutwardPayload; outwardId: string },
  { rejectValue: { message: string; status?: number } }
>(
  "stockManagement/editOutward",
  async ({ editOutwardPayload, outwardId }, { rejectWithValue }) => {
    try {
      const res = await apiClient.patch(
        `${CREATE_STOCK}/${outwardId}`,
        editOutwardPayload
      );
      return { data: res.data.data, message: res.data.message };
    } catch (error: any) {
      console.error("Error occurred while editing outward:", error);
      const status = error.response?.status || 500;
      CustomToast.ErrorToast(
        error?.response?.data?.message || "Something went wrong"
      );
      return rejectWithValue({
        message: "Failed to update outward",
        status,
      });
    }
  }
);

// Delete Inward
export const deleteInwardAction = createAsyncThunk<
  { message: string },
  string, // inwardId
  { rejectValue: { message: string; status?: number } }
>("stockManagement/deleteInward", async (inwardId, { rejectWithValue }) => {
  try {
    await apiClient._delete(`${DELETE_STOCK}/${inwardId}`);
    return { message: "Inward entry deleted successfully" };
  } catch (error: any) {
    console.error(
      "Error occurred while deleting inward entry:",
      error.response?.data || error.message
    );
    const status = error.response?.status || 500;
    return rejectWithValue({
      message: "Failed to delete inward entry",
      status,
    });
  }
});

// Delete Outward
export const deleteOutwardAction = createAsyncThunk<
  { message: string },
  string, // outwardId
  { rejectValue: { message: string; status?: number } }
>("stockManagement/deleteOutward", async (outwardId, { rejectWithValue }) => {
  try {
    await apiClient._delete(`${DELETE_STOCK}/${outwardId}`);
    return { message: "Outward entry deleted successfully" };
  } catch (error: any) {
    console.error(
      "Error occurred while deleting outward entry:",
      error.response?.data || error.message
    );
    const status = error.response?.status || 500;
    return rejectWithValue({
      message: "Failed to delete outward entry",
      status,
    });
  }
});
