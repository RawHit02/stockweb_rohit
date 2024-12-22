import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiClient } from "@/base-url/apiClient";
import {
  TransactionFilterModel,
  TransactionResponseModel,
} from "@/models/req-model/TransactionModel";
import { GET_TRANSACTIONS } from "@/base-url/apiRoutes";

export const fetchTransactions = createAsyncThunk<
  TransactionResponseModel,
  TransactionFilterModel
>("transactions/fetch", async (filters, { rejectWithValue }) => {
  try {
    const response = await apiClient.get(GET_TRANSACTIONS, { params: filters });
    return response.data;
  } catch (error: any) {
    console.error("API Error:", error.response?.data || error.message);
    return rejectWithValue(
      error.response?.data || "Failed to fetch transactions"
    );
  }
});
