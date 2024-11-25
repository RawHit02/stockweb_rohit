import CustomToast from "@/app/components/CustomToast";
import { apiClient } from "@/base-url/apiClient";
import {
  CREATE_INWARD_STOCK,
  CREATE_OUTWARD_STOCK,
  FETCH_INWARD_STOCK,
  FETCH_OUTWARD_STOCK,
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

// Create Inward
export const createInward = createAsyncThunk<
  { data: StockManagementInwardModel; message: string },
  { createInwardPayload: CreateStockInwardPayload },
  { rejectValue: { message: string; status?: number } }
>(
  "stockManagement/createInward",
  async ({ createInwardPayload }, { rejectWithValue }) => {
    try {
      const res = await apiClient.post(CREATE_INWARD_STOCK, createInwardPayload);
      return { data: res.data.data, message: res.data.message };
    } catch (error: any) {
      console.error(
        "Error occurred while creating inward entry:",
        error.response?.data || error.message
      );
      const status = error.response?.status || 500;
      CustomToast.ErrorToast(
        error?.response?.data?.message || "Something went wrong"
      );
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
  async ({ createOutwardPayload }, { rejectWithValue }) => {
    try {
      const res = await apiClient.post(CREATE_OUTWARD_STOCK, createOutwardPayload);
      return { data: res.data.data, message: res.data.message };
    } catch (error: any) {
      console.error(
        "Error occurred while creating outward entry:",
        error.response?.data || error.message
      );
      const status = error.response?.status || 500;
      CustomToast.ErrorToast(
        error?.response?.data?.message || "Something went wrong"
      );
      return rejectWithValue({
        message: error.response?.data?.message || "Failed to create outward",
        status,
      });
    }
  }
);

// Get All Inwards
export const getAllInwardsAction = createAsyncThunk<
  { data: StockManagementInwardModel[]; itemCount: number },
  {
    commonApiParamModel: GetAllInwardsRequest;
  },
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
      const res = await apiClient.get(`${FETCH_INWARD_STOCK}`, options);
      let data: StockManagementInwardModel[] = [];
      if (res?.data?.data.data) data = res.data.data.data;
      return { data, itemCount: res.data.data.meta.itemCount };
    } catch (error: any) {
      console.error("Error occurred while fetching inwards:", error);
      const status = error.response?.status || 500;
      CustomToast.ErrorToast(
        error?.response?.data?.message || error?.message || "Failed to fetch inwards"
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
  {
    commonApiParamModel: GetAllOutwardsRequest;
  },
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
      // let data: StockManagementOutwardModel[] = [];
      // if (res?.data?.data.data) data = res.data.data.data;
      return { data : res.data.data, itemCount: res.data.data.meta.itemCount };
    } catch (error: any) {
      console.error("Error occurred while fetching outwards:", error);
      // const status = error.response?.status || 500;
      // CustomToast.ErrorToast(
      //   error?.response?.data?.message || error?.message || "Failed to fetch outwards"
      // );
      return rejectWithValue({
        message: error.response?.data?.message || "Failed to fetch outwards",
        status: error.response?.status || 500,
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
        `${CREATE_INWARD_STOCK}/${inwardId}`,
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
        `${CREATE_OUTWARD_STOCK}/${outwardId}`,
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
>(
  "stockManagement/deleteInward",
  async (inwardId, { rejectWithValue }) => {
    try {
      await apiClient._delete(`${CREATE_INWARD_STOCK}/${inwardId}`);
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
  }
);

// Delete Outward
export const deleteOutwardAction = createAsyncThunk<
  { message: string },
  string, // outwardId
  { rejectValue: { message: string; status?: number } }
>(
  "stockManagement/deleteOutward",
  async (outwardId, { rejectWithValue }) => {
    try {
      await apiClient._delete(`${CREATE_OUTWARD_STOCK}/${outwardId}`);
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
  }
);
