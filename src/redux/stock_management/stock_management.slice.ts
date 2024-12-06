import { createSlice } from "@reduxjs/toolkit";
import {
  StockManagementInwardModel,
  InitialInwardsModelState,
} from "@/models/req-model/StockManagementInwardModel";
import {
  StockManagementOutwardModel,
  InitialOutwardsModelState,
} from "@/models/req-model/StockManagementOutwardModel";
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
} from "./stock_management.actions";

interface CombinedState {
  inwards: InitialInwardsModelState;
  outwards: InitialOutwardsModelState;
  buyers: any[]; // Stores all buyers
  suppliers: any[]; // Stores all suppliers
  selectedVendorId: string | null; //  track the selected vendor (supplier or buyer)
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
    // selectedSupplierId: null,
    message: "",
    itemCount: 0,
    userError: undefined,
    getAllOutwards: [],
    createOutwardRes: "",
    createOutwardLoading: false,
    getAllOutwardLoading: false,
  },
  buyers: [], // Initially empty array for buyers
  suppliers: [], // Initially empty array for suppliers
  selectedVendorId: null, // Add this line to initialize the selectedVendorId
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

    clearAllStockManagement: () =>  initialState,
  },
  extraReducers: (builder) => {
    // Inward Actions
    builder.addCase(createInward.pending, (state) => {
      state.inwards.createInwardLoading = true;
      state.inwards.userError = "";
    });
    builder.addCase(createInward.fulfilled, (state, action) => {
      state.inwards.createInwardLoading = false;
      state.inwards.userError = "";
      state.inwards.getAllInwards = [
        action.payload.data,
        ...state.inwards.getAllInwards,
      ];
    });
    builder.addCase(createInward.rejected, (state, action) => {
      state.inwards.createInwardLoading = false;
      state.inwards.userError = action.error.message;
    });

    builder.addCase(getAllInwardsAction.pending, (state) => {
      state.inwards.getAllInwardLoading = true;
      state.inwards.userError = "";
    });
    builder.addCase(getAllInwardsAction.fulfilled, (state, action) => {
      state.inwards.getAllInwardLoading = false;
      state.inwards.userError = "";
      state.inwards.getAllInwards = action.payload.data;
      state.inwards.itemCount = action.payload.itemCount;
    });
    builder.addCase(getAllInwardsAction.rejected, (state, action) => {
      state.inwards.getAllInwardLoading = false;
      state.inwards.userError = action.error.message;
    });

    builder.addCase(editInwardAction.fulfilled, (state, action) => {
      const updatedInward = action.payload.data;
      const index = state.inwards.getAllInwards.findIndex(
        (inward) => inward.id === updatedInward.id
      );
      if (index !== -1) {
        state.inwards.getAllInwards[index] = updatedInward;
      }
    });

    builder.addCase(deleteInwardAction.fulfilled, (state, action) => {
      const deletedInwardId = action.meta.arg;
      state.inwards.getAllInwards = state.inwards.getAllInwards.filter(
        (inward) => inward.id !== deletedInwardId
      );
    });

    // Outward Actions
    builder.addCase(createOutward.pending, (state) => {
      state.outwards.createOutwardLoading = true;
      state.outwards.userError = "";
    });
    builder.addCase(createOutward.fulfilled, (state, action) => {
      state.outwards.createOutwardLoading = false;
      state.outwards.userError = "";
      state.outwards.getAllOutwards = [
        action.payload.data,
        ...state.outwards.getAllOutwards,
      ];
    });
    builder.addCase(createOutward.rejected, (state, action) => {
      state.outwards.createOutwardLoading = false;
      state.outwards.userError = action.error.message;
    });

    builder.addCase(getAllOutwardsAction.pending, (state) => {
      state.outwards.getAllOutwardLoading = true;
      state.outwards.userError = "";
    });
    builder.addCase(getAllOutwardsAction.fulfilled, (state, action) => {
      state.outwards.getAllOutwardLoading = false;
      state.outwards.userError = "";
      state.outwards.getAllOutwards = Array.isArray(action.payload.data)
        ? action.payload.data
        : [];
      state.outwards.itemCount = action.payload.itemCount || 0;
    });
    builder.addCase(getAllOutwardsAction.rejected, (state, action) => {
      state.outwards.getAllOutwardLoading = false;
      state.outwards.userError = action.error.message;
    });

    builder.addCase(editOutwardAction.fulfilled, (state, action) => {
      const updatedOutward = action.payload.data;
      const index = state.outwards.getAllOutwards.findIndex(
        (outward) => outward.id === updatedOutward.id
      );
      if (index !== -1) {
        state.outwards.getAllOutwards[index] = updatedOutward;
      }
    });

    builder.addCase(deleteOutwardAction.fulfilled, (state, action) => {
      const deletedOutwardId = action.meta.arg;
      state.outwards.getAllOutwards = state.outwards.getAllOutwards.filter(
        (outward) => outward.id !== deletedOutwardId
      );
    });

    // Buyers and Suppliers Action
    builder.addCase(fetchBuyersAndSuppliers.fulfilled, (state, action) => {
      const { buyers, suppliers } = action.payload.data;
      if (action.meta.arg === "supplier") {
        state.suppliers = suppliers;
      } else if (action.meta.arg === "buyer") {
        state.buyers = buyers;
      }
    });
  },
});

export const { clearAllStockManagement , setSelectedVendorId , clearSelectedVendorId } = stockManagementSlice.actions;
export default stockManagementSlice.reducer;
