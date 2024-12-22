import { createSlice } from "@reduxjs/toolkit";
import {
  createInward,
  getAllInwardsAction,
  deleteInwardAction,
  editInwardAction,
  createOutward,
  getAllOutwardsAction,
  deleteOutwardAction,
  editOutwardAction,
  fetchBuyersAndSuppliers,
  fetchOrnaments,
  fetchOrnamentTypes,
  fetchForms,
  fetchPurities,
  fetchColors,
} from "./stock_management.actions";
import { InitialInwardsModelState } from "@/models/req-model/StockManagementInwardModel";
import { InitialOutwardsModelState } from "@/models/req-model/StockManagementOutwardModel";

interface CombinedState {
  inwards: InitialInwardsModelState;
  outwards: InitialOutwardsModelState;
  buyers: any[]; // Stores all buyers
  suppliers: any[]; // Stores all suppliers
  selectedVendorId: string | null; // Track the selected vendor (supplier or buyer)
  ornamentDetails: { id: string; ornament: string }[]; // Ornament details
  ornamentTypes: { id: string; ornamentType: string }[]; // Ornament types
  ornamentForms: { id: string; ornamentForm: string }[]; // Ornament forms
  ornamentPurities: { id: string; ornamentPurity: string }[]; // Ornament purities
  ornamentColors: { id: string; ornamentColor: string }[]; // Ornament colors
}

const initialState: CombinedState = {
  inwards: {
    message: "",
    itemCount: 0,
    userError: undefined,
    getAllInwards: [],
    createInwardRes: "",
    createInwardLoading: false,
    getAllInwardLoading: false,
  },
  outwards: {
    message: "",
    itemCount: 0,
    userError: undefined,
    getAllOutwards: [],
    createOutwardRes: "",
    createOutwardLoading: false,
    getAllOutwardLoading: false,
  },
  buyers: [],
  suppliers: [],
  selectedVendorId: null,
  ornamentDetails: [],
  ornamentTypes: [],
  ornamentForms: [],
  ornamentPurities: [],
  ornamentColors: [],
};

export const stockManagementSlice = createSlice({
  name: "stock_management_slice",
  initialState,
  reducers: {
    setSelectedVendorId: (state, action) => {
      state.selectedVendorId = action.payload;
    },
    clearSelectedVendorId: (state) => {
      state.selectedVendorId = null;
    },
    clearAllStockManagement: () => initialState,
  },
  extraReducers: (builder) => {
    // Add cases for fetching ornaments, types, purities, forms, and colors
    builder.addCase(fetchOrnaments.fulfilled, (state, action) => {
      state.ornamentDetails = action.payload.data;
    });
    builder.addCase(fetchOrnamentTypes.fulfilled, (state, action) => {
      state.ornamentTypes = action.payload.data;
    });
    builder.addCase(fetchForms.fulfilled, (state, action) => {
      state.ornamentForms = action.payload.data;
    });
    builder.addCase(fetchPurities.fulfilled, (state, action) => {
      state.ornamentPurities = action.payload.data;
    });
    builder.addCase(fetchColors.fulfilled, (state, action) => {
      state.ornamentColors = action.payload.data;
    });
  },
});

export const {
  clearAllStockManagement,
  setSelectedVendorId,
  clearSelectedVendorId,
} = stockManagementSlice.actions;
export default stockManagementSlice.reducer;
