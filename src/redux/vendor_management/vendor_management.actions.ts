import CustomToast from "@/app/components/CustomToast";
import { apiClient } from "@/base-url/apiClient";
import { CREATE_VENDOR, GET_ALL_VENDOR } from "@/base-url/apiRoutes";
import {
  CreateBuyerPayload,
  GetAllBuyersRequest,
  VendorManagementBuyerModel,
} from "@/models/req-model/VendorManagementBuyerModel";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const createBuyer = createAsyncThunk<
  { data: string; message: string },
  { createBuyerPayload: CreateBuyerPayload },
  { rejectValue: { message: string; status?: number } }
>(
  "vendorManagement/createVehicle",
  async ({ createBuyerPayload }, { rejectWithValue }) => {
    try {
      const body = {
        vendorType: createBuyerPayload.vendorType,
        name: createBuyerPayload.name,
        contactNumber: createBuyerPayload.contactNumber,
        whatsappNumber: createBuyerPayload.whatsappNumber,
        email: createBuyerPayload.email,
        address: createBuyerPayload.address,
      };
      const res = await apiClient.post(CREATE_VENDOR, body);
      return { data: res.data.data, message: res.data.message };
    } catch (error: any) {
      console.error("Error occurred:", error);
      const status = error.response.status;
      CustomToast.ErrorToast(error?.response?.data?.message);
      return rejectWithValue({
        message: error?.message,
        status,
      });
    }
  }
);

export const getAllBuyersAction = createAsyncThunk<
  { data: VendorManagementBuyerModel[]; itemCount: number },
  {
    commonApiParamModel: GetAllBuyersRequest;
  },
  { rejectValue: { message: string; status?: number } }
>(
  "vendorManagement/getVendor",
  async ({ commonApiParamModel }, { rejectWithValue }) => {
    try {
      const options = {
        params: {
          page: commonApiParamModel.page,
          take: commonApiParamModel.take,
          order: commonApiParamModel.order?.toUpperCase(),
          orderBy: commonApiParamModel.orderBy,
          search: commonApiParamModel.search,
          ...(commonApiParamModel?.userId !== "" && {
            userId: commonApiParamModel?.userId,
          }),
        },
      };
      const res = await apiClient.get(GET_ALL_VENDOR, options);
      let data: VendorManagementBuyerModel[] = [];
      if (res?.data?.data.data) data = res.data.data.data;
      return { data, itemCount: res.data.data.meta.itemCount };
    } catch (error: any) {
      console.error("Error occurred:", error);
      const status = error.response.status;
      CustomToast.ErrorToast(
        error?.response?.data?.message
          ? error.response.data.message
          : error?.message
      );
      return rejectWithValue({
        message: "An error occurred while fetching categories.",
        status,
      });
    }
  }
);
