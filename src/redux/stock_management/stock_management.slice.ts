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
  addOrnament,
  deleteOrnament,
  addType,
  deleteType,
  addForm,
  deleteForm,
  addPurity,
  deletePurity,
  addColor,
  deleteColor,
} from "./stock_management.actions";
import { InitialInwardsModelState } from "@/models/req-model/StockManagementInwardModel";
import { InitialOutwardsModelState } from "@/models/req-model/StockManagementOutwardModel";

interface CombinedState {
  inwards: InitialInwardsModelState;
  outwards: InitialOutwardsModelState;
  buyers: any[];
  suppliers: any[];
  selectedVendorId: string | null;
  ornamentDetails: { id: string; ornament: string }[];
  ornamentTypes: { id: string; ornamentType: string }[];
  ornamentForms: { id: string; ornamentForm: string }[];
  ornamentPurities: { id: string; ornamentPurity: string }[];
  ornamentColors: { id: string; ornamentColor: string }[];
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
    // Fetch/get/delete Ornaments
    builder.addCase(addOrnament.fulfilled, (state, action) => {
      state.ornamentDetails.push(action.payload.data);
    });
    builder.addCase(fetchOrnaments.fulfilled, (state, action) => {
      state.ornamentDetails = action.payload.data;
    });
    builder.addCase(deleteOrnament.fulfilled, (state, action) => {
      state.ornamentDetails = state.ornamentDetails.filter(
        (item) => item.id !== action.meta.arg
      );
    });

    // Fetch / add / delete Ornament Types
    builder.addCase(addType.fulfilled, (state, action) => {
      state.ornamentTypes.push(action.payload.data);
    });
    builder.addCase(fetchOrnamentTypes.fulfilled, (state, action) => {
      state.ornamentTypes = action.payload.data;
    });
    builder.addCase(deleteType.fulfilled, (state, action) => {
      state.ornamentTypes = state.ornamentTypes.filter(
        (item) => item.id !== action.meta.arg
      );
    });

    // Fetch Forms
    builder.addCase(addForm.fulfilled, (state, action) => {
      state.ornamentForms.push(action.payload.data);
    });
    builder.addCase(fetchForms.fulfilled, (state, action) => {
      state.ornamentForms = action.payload.data;
    });
    builder.addCase(deleteForm.fulfilled, (state, action) => {
      state.ornamentForms = state.ornamentForms.filter(
        (item) => item.id !== action.meta.arg
      );
    });

    // Fetch / add / delete Purities
    builder.addCase(addPurity.fulfilled, (state, action) => {
      state.ornamentPurities.push(action.payload.data);
    });
    builder.addCase(fetchPurities.fulfilled, (state, action) => {
      state.ornamentPurities = action.payload.data;
    });
    builder.addCase(deletePurity.fulfilled, (state, action) => {
      state.ornamentPurities = state.ornamentPurities.filter(
        (item) => item.id !== action.meta.arg
      );
    });

    // Fetch / Add / Delete Color
    builder.addCase(addColor.fulfilled, (state, action) => {
      state.ornamentColors.push(action.payload.data);
    });
    builder.addCase(fetchColors.fulfilled, (state, action) => {
      state.ornamentColors = action.payload.data;
    });
    builder.addCase(deleteColor.fulfilled, (state, action) => {
      state.ornamentColors = state.ornamentColors.filter(
        (item) => item.id !== action.meta.arg
      );
    });

    // Fetch Buyers and Suppliers
    builder.addCase(fetchBuyersAndSuppliers.fulfilled, (state, action) => {
      state.buyers = action.payload.data.buyers;
      state.suppliers = action.payload.data.suppliers;
    });

    // Create Inward
    builder.addCase(createInward.pending, (state) => {
      state.inwards.createInwardLoading = true;
      state.inwards.message = "Creating inward stock...";
    });
    builder.addCase(createInward.fulfilled, (state, action) => {
      state.inwards.createInwardRes = action.payload;
      state.inwards.createInwardLoading = false;
      state.inwards.message = "Inward stock created successfully.";
    });
    builder.addCase(createInward.rejected, (state, action) => {
      state.inwards.createInwardLoading = false;
      state.inwards.message =
        typeof action.payload === "string"
          ? action.payload
          : "Failed to create inward stock.";
    });

    // Create Outward
    builder.addCase(createOutward.pending, (state) => {
      state.outwards.createOutwardLoading = true;
      state.outwards.message = "Creating outward stock...";
    });
    builder.addCase(createOutward.fulfilled, (state, action) => {
      state.outwards.createOutwardRes = action.payload;
      state.outwards.createOutwardLoading = false;
      state.outwards.message = "Outward stock created successfully.";
    });
    builder.addCase(createOutward.rejected, (state, action) => {
      state.outwards.createOutwardLoading = false;
      state.outwards.message =
        typeof action.payload === "string"
          ? action.payload
          : "Failed to create outward stock.";
    });

    // Handle getAllInwardsAction
    builder.addCase(getAllInwardsAction.pending, (state) => {
      state.inwards.getAllInwardLoading = true;
    });
    builder.addCase(getAllInwardsAction.fulfilled, (state, action) => {
      state.inwards.getAllInwards = action.payload.data;
      state.inwards.itemCount = action.payload.itemCount;
      state.inwards.getAllInwardLoading = false;
    });
    builder.addCase(getAllInwardsAction.rejected, (state, action) => {
      state.inwards.getAllInwardLoading = false;
      state.inwards.message =
        typeof action.payload === "string"
          ? action.payload
          : action.payload?.message ?? "Failed to fetch inward stock details.";
    });

    // Handle getAllOutwardsAction
    builder.addCase(getAllOutwardsAction.pending, (state) => {
      state.outwards.getAllOutwardLoading = true;
    });
    builder.addCase(getAllOutwardsAction.fulfilled, (state, action) => {
      state.outwards.getAllOutwards = action.payload.data;
      state.outwards.itemCount = action.payload.itemCount;
      state.outwards.getAllOutwardLoading = false;
    });
    builder.addCase(getAllOutwardsAction.rejected, (state, action) => {
      state.outwards.getAllOutwardLoading = false;
      state.outwards.message =
        typeof action.payload === "string"
          ? action.payload
          : action.payload?.message ?? "Failed to fetch outward stock details.";
    });

    // Delete Inward
    builder.addCase(deleteInwardAction.fulfilled, (state, action) => {
      state.inwards.message = action.payload.message;
      state.inwards.getAllInwards = state.inwards.getAllInwards.filter(
        (item: { id: string }) =>
          item.id !== (action.meta.arg as unknown as { id: string }).id
      );
    });

    // Delete Outward
    builder.addCase(deleteOutwardAction.fulfilled, (state, action) => {
      state.outwards.message = action.payload.message;
      state.outwards.getAllOutwards = state.outwards.getAllOutwards.filter(
        (item: { id: string }) =>
          item.id !== (action.meta.arg as unknown as { id: string }).id
      );
    });
  },
});

export const {
  clearAllStockManagement,
  setSelectedVendorId,
  clearSelectedVendorId,
} = stockManagementSlice.actions;
export default stockManagementSlice.reducer;
