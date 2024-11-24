import { createSlice } from "@reduxjs/toolkit";
import {
  VendorManagementBuyerModel,
  InitialBuyersModelState,
} from "@/models/req-model/VendorManagementBuyerModel";
import {
  VendorManagementSellerModel,
  InitialSellersModelState,
} from "@/models/req-model/VendorManagementSellerModel";

import {
  createBuyer,
  getAllBuyersAction,
  deleteBuyerAction,
  editBuyerAction,
  createSeller,
  getAllSellersAction,
  deleteSellerAction,
  editSellerAction,
} from "./vendor_management.actions";

interface CombinedState {
  buyers: InitialBuyersModelState;
  sellers: InitialSellersModelState;
}

const initialState: CombinedState = {
  buyers: {
    message: "",
    itemCount: 0,
    userError: undefined,
    getAllBuyers: [],
    createBuyerRes: "",
    createBuyerLoading: false,
    getAllBuyerLoading: false,
  },
  sellers: {
    message: "",
    itemCount: 0,
    userError: undefined,
    getAllSellers: [],
    createSellerRes: "",
    createSellerLoading: false,
    getAllSellerLoading: false,
  },
};

export const manageVendorManagementSlice = createSlice({
  name: "manage_vendor_management_slice",
  initialState,
  reducers: {
    clearAllManageVendors: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    // Buyer Actions
    builder.addCase(createBuyer.pending, (state) => {
      state.buyers.createBuyerLoading = true;
      state.buyers.userError = "";
    });
    builder.addCase(createBuyer.fulfilled, (state, action) => {
      state.buyers.createBuyerLoading = false;
      state.buyers.userError = "";
      state.buyers.getAllBuyers = [action.payload.data, ...state.buyers.getAllBuyers];
    });
    builder.addCase(createBuyer.rejected, (state, action) => {
      state.buyers.createBuyerLoading = false;
      state.buyers.userError = action.error.message;
    });

    builder.addCase(getAllBuyersAction.pending, (state) => {
      state.buyers.getAllBuyerLoading = true;
      state.buyers.userError = "";
    });
    builder.addCase(getAllBuyersAction.fulfilled, (state, action) => {
      state.buyers.getAllBuyerLoading = false;
      state.buyers.userError = "";
      state.buyers.getAllBuyers = action.payload.data;
      state.buyers.itemCount = action.payload.itemCount;
    });
    builder.addCase(getAllBuyersAction.rejected, (state, action) => {
      state.buyers.getAllBuyerLoading = false;
      state.buyers.userError = action.error.message;
    });

    builder.addCase(editBuyerAction.fulfilled, (state, action) => {
      const updatedBuyer = action.payload.data;
      const index = state.buyers.getAllBuyers.findIndex(
        (buyer) => buyer.id === updatedBuyer.id
      );
      if (index !== -1) {
        state.buyers.getAllBuyers[index] = updatedBuyer;
      }
    });

    builder.addCase(deleteBuyerAction.fulfilled, (state, action) => {
      const deletedBuyerId = action.meta.arg; // buyerId
      state.buyers.getAllBuyers = state.buyers.getAllBuyers.filter(
        (buyer) => buyer.id !== deletedBuyerId
      );
    });

    // Seller Actions
    builder.addCase(createSeller.pending, (state) => {
      state.sellers.createSellerLoading = true;
      state.sellers.userError = "";
    });
    builder.addCase(createSeller.fulfilled, (state, action) => {
      state.sellers.createSellerLoading = false;
      state.sellers.userError = "";
      state.sellers.getAllSellers = [action.payload.data, ...state.sellers.getAllSellers];
    });
    builder.addCase(createSeller.rejected, (state, action) => {
      state.sellers.createSellerLoading = false;
      state.sellers.userError = action.error.message;
    });

    builder.addCase(getAllSellersAction.pending, (state) => {
      state.sellers.getAllSellerLoading = true;
      state.sellers.userError = "";
    });
    builder.addCase(getAllSellersAction.fulfilled, (state, action) => {
      state.sellers.getAllSellerLoading = false;
      state.sellers.userError = "";
      state.sellers.getAllSellers = action.payload.data;
      state.sellers.itemCount = action.payload.itemCount;
    });
    builder.addCase(getAllSellersAction.rejected, (state, action) => {
      state.sellers.getAllSellerLoading = false;
      state.sellers.userError = action.error.message;
    });

    builder.addCase(editSellerAction.fulfilled, (state, action) => {
      const updatedSeller = action.payload.data;
      const index = state.sellers.getAllSellers.findIndex(
        (seller) => seller.id === updatedSeller.id
      );
      if (index !== -1) {
        state.sellers.getAllSellers[index] = updatedSeller;
      }
    });

    builder.addCase(deleteSellerAction.fulfilled, (state, action) => {
      const deletedSellerId = action.meta.arg; // sellerId
      state.sellers.getAllSellers = state.sellers.getAllSellers.filter(
        (seller) => seller.id !== deletedSellerId
      );
    });
  },
});

export const { clearAllManageVendors } = manageVendorManagementSlice.actions;
export default manageVendorManagementSlice.reducer;
