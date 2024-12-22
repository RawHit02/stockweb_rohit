import { createSlice } from "@reduxjs/toolkit";
import { fetchTransactions } from "./transaction_table.actions";
import {
  TransactionFilterModel,
  TransactionResponseModel,
  TransactionData,
} from "@/models/req-model/TransactionModel";

interface TransactionState {
  data: TransactionData[];
  meta: {
    page?: number;
    itemCount?: number;
    pageCount?: number;
    hasPreviousPage?: boolean;
    hasNextPage?: boolean;
  };
  filters: TransactionFilterModel;
  loading: boolean;
  error: string | null;
}

const initialState: TransactionState = {
  data: [],
  meta: {},
  filters: {
    order: "ASC", // Default sorting order
    page: 1, // Default page
    take: 10, // Default rows per page
  },
  loading: false,
  error: null,
};

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    updateFilters(state, action) {
      state.filters = { ...state.filters, ...action.payload };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload.data.data;
        state.meta = action.payload.data.meta;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.data = [];
      });
  },
});

export const { updateFilters } = transactionsSlice.actions;
export default transactionsSlice.reducer;
