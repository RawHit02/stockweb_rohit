import { createSlice } from "@reduxjs/toolkit";
import { SignInModel } from "@/models/SignInModel";
import { InitialBuyersModelState } from "@/models/req-model/VendorManagementBuyerModel";
import { createBuyer, getAllBuyersAction } from "./vendor_management.actions";

const initialState: InitialBuyersModelState = {
  message: "",
  itemCount: 0,
  userError: undefined,
  getAllBuyers: [],
  createBuyerRes: "",
  createBuyerLoading: false,
  getAllBuyerLoading: false,
};

export const manageVendorManagementSlice = createSlice({
  name: "manage_vendor_management_slice",
  initialState,
  reducers: {
    clearAllManageVehicles: () => {
      return initialState;
    },
  },

  extraReducers: (builder) => {
    // Create Vehicle Points
    builder.addCase(createBuyer.pending, (state, action) => {
      state.createBuyerLoading = true;
      state.userError = "";
    });
    builder.addCase(createBuyer.fulfilled, (state, action) => {
      state.createBuyerLoading = false;
      state.userError = "";
      state.createBuyerRes = action.payload.data;
    });
    builder.addCase(createBuyer.rejected, (state, action) => {
      state.createBuyerLoading = false;
      state.userError = action.error.message;
    });

    // Get All Vehicles Points
    builder.addCase(getAllBuyersAction.pending, (state, action) => {
      state.getAllBuyerLoading = true;
      state.userError = "";
      state.createBuyerRes = "";
    });
    builder.addCase(getAllBuyersAction.fulfilled, (state, action) => {
      state.getAllBuyerLoading = false;
      state.userError = "";
      state.getAllBuyers = action.payload.data;
      state.itemCount = action.payload.itemCount;
      state.createBuyerRes = "";
    });
    builder.addCase(getAllBuyersAction.rejected, (state, action) => {
      state.getAllBuyerLoading = false;
      state.userError = action.error.message;
      state.createBuyerRes = "";
    });
  },
});

export const { clearAllManageVehicles } = manageVendorManagementSlice.actions;
export default manageVendorManagementSlice.reducer;
