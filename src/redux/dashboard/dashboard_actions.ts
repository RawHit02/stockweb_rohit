import { Dispatch } from 'redux';
import { apiClient } from '@/base-url/apiClient';
import {
  GET_DASHBOARD,
  GET_DUES
} from '@/base-url/apiRoutes';

import { 
  setDashboardData
}  from '@/redux/dashboard/dashboard_slice';

import { DashboardMetricResponse } from '@/models/req-model/dashboardModel';
import { createAsyncThunk } from '@reduxjs/toolkit';


// Define action types
// export const SET_DASHBOARD = 'SET_DASHBOARD';

// Action creators for dispatching data
export const fetchDashboardData = () => async (dispatch: Dispatch) => {
  try {
    const response = await apiClient.get(GET_DASHBOARD);

    const data = response.data.data; // Extract data from API response
    // console.log("API Response for Dashboard Data:", data); // Debug API response
    dispatch(setDashboardData(data)); // Dispatch the entire dashboard data
  } catch (error) {
    console.error("Error fetching dashboard data:", error);
  }
};



export const fetchTableData = createAsyncThunk(
  "table/fetchData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get(GET_DUES);
      if (response.status === 200) {
        return response.data.data; // Return the data array from the response
      } else {
        return rejectWithValue(response.data.message || "Failed to fetch data");
      }
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || "Something went wrong");
    }
  }
);






