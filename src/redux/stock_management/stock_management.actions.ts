import CustomToast from "@/app/components/CustomToast";
import { apiClient } from "@/base-url/apiClient";
import {
  CREATE_STOCK,
  DELETE_ALL_ORNAMENTS,
  DELETE_ORNAMENT_COLORS,
  DELETE_ORNAMENT_FORMS,
  DELETE_ORNAMENT_Grade,
  DELETE_ORNAMENT_PURITY,
  DELETE_ORNAMENT_TYPES,
  DELETE_STOCK,
  FETCH_INWARD_STOCK,
  FETCH_OUTWARD_STOCK,
  GET_ALL_BUYERS_AND_SUPPLIERS,
  GET_ALL_ORNAMENTS,
  GET_ORNAMENT_Grade,
  POST_ALL_ORNAMENTS,
  POST_ORNAMENT_COLORS,
  POST_ORNAMENT_FORMS,
  POST_ORNAMENT_Grade,
  POST_ORNAMENT_PURITY,
  POST_ORNAMENT_TYPES,
  UPDATE_STOCK,
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
import { RootState, AppDispatch } from "@/redux/store";
import {
  GET_ORNAMENT_TYPES,
  GET_ORNAMENT_FORMS,
  GET_ORNAMENT_PURITY,
  GET_ORNAMENT_COLORS,
} from "@/base-url/apiRoutes";

// Fetch Buyers and Suppliers
export const fetchBuyersAndSuppliers = createAsyncThunk<{
  data: {
    buyers: { id: string; name: string }[];
    suppliers: { id: string; name: string }[];
  };
},
"buyer" | "supplier",
{ state: RootState; dispatch: AppDispatch }
>(
  "stockManagement/fetchBuyersAndSuppliers",
  async (type, { rejectWithValue }) => {
    try {
      const url =
        type === "supplier"
          ? GET_ALL_BUYERS_AND_SUPPLIERS + "/supplier"
          : GET_ALL_BUYERS_AND_SUPPLIERS + "/buyer";

      const res = await apiClient.get(url);
      const data = res.data.data.map((item: { id: string; name: string }) => ({
        id: item.id,
        name: item.name,
      }));

      return {
        data:
          type === "supplier"
            ? { suppliers: data, buyers: [] }
            : { buyers: data, suppliers: [] },
      };
    } catch (error: any) {
      console.error(`Error fetching ${type}s:`, error);
      return rejectWithValue({
        message: error.response?.data?.message || `Failed to fetch ${type}s`,
      });
    }
  }
);

export const setSelectedVendorId = (vendor: string) => ({
  type: "stockManagement/setSelectedVendorId",
  payload: vendor,
});


// Ornament: Create
export const addOrnament = createAsyncThunk<
  any,
  { ornament: string },
  { rejectValue: string }
>(
  "stockManagement/addOrnament",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await apiClient.post(POST_ALL_ORNAMENTS, payload);
      return response.data;
    } catch (error: any) {
      console.error("Error creating ornament:", error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to create ornament"
      );
    }
  }
);


// fetch/ GET all Ornaments:
export const fetchOrnaments = createAsyncThunk<{
  data: { id: string; ornament: string }[];
},
void,
{ rejectValue: { message: string } }
>("stockManagement/fetchOrnaments", async (_, { rejectWithValue }) => {
  try {
    const res = await apiClient.get(GET_ALL_ORNAMENTS);
    return { data: res.data.data };
  } catch (error: any) {
    console.error("Error fetching ornaments:", error);
    return rejectWithValue({
      message: error.response?.data?.message || "Failed to fetch ornaments",
    });
  }
});

// Ornament: Delete
export const deleteOrnament = createAsyncThunk<
  any,
  string,
  { rejectValue: string }
>(
  "stockManagement/deleteOrnament",
  async (id, { rejectWithValue }) => {
    try {
      const response = await apiClient.delete(`${DELETE_ALL_ORNAMENTS}/${id}`);
      return response.data;
    } catch (error: any) {
      console.error("Error deleting ornament:", error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete ornament"
      );
    }
  }
);

// Ornament Type: Create
export const addType = createAsyncThunk<
  any,
  { ornamentType: string; ornament: string },
  { rejectValue: string }
>(
  "stockManagement/addType",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await apiClient.post(POST_ORNAMENT_TYPES, payload);
      return response.data;
    } catch (error: any) {
      console.error("Error creating type:", error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to create type"
      );
    }
  }
);

// Fetch/GET Ornament Types
export const fetchOrnamentTypes = createAsyncThunk<{
  data: { id: string; ornamentType: string }[];
},
void,
{ rejectValue: { message: string } }
>("stockManagement/fetchOrnamentTypes", async (_, { rejectWithValue }) => {
  try {
    const res = await apiClient.get(GET_ORNAMENT_TYPES);
    return { data: res.data.data };
  } catch (error: any) {
    console.error("Error fetching ornament types:", error);
    return rejectWithValue({
      message:
        error.response?.data?.message || "Failed to fetch ornament types",
    });
  }
});

// Ornament Type: Delete
export const deleteType = createAsyncThunk<
  any,
  string,
  { rejectValue: string }
>(
  "stockManagement/deleteType",
  async (id, { rejectWithValue }) => {
    try {
      const response = await apiClient.delete(`${DELETE_ORNAMENT_TYPES}/${id}`);
      return response.data;
    } catch (error: any) {
      console.error("Error deleting type:", error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete type"
      );
    }
  }
);

// Ornament Form: Create
export const addForm = createAsyncThunk<
  any,
  { ornamentForm: string; ornament: string },
  { rejectValue: string }
>(
  "stockManagement/addForm",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await apiClient.post(POST_ORNAMENT_FORMS, payload);
      return response.data;
    } catch (error: any) {
      console.error("Error creating form:", error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to create form"
      );
    }
  }
);


// Fetch Forms
export const fetchForms = createAsyncThunk<{
  data: { id: string; ornamentForm: string }[];
},
void,
{ rejectValue: { message: string } }
>("stockManagement/fetchForms", async (_, { rejectWithValue }) => {
  try {
    const res = await apiClient.get(GET_ORNAMENT_FORMS);
    return { data: res.data.data };
  } catch (error: any) {
    console.error("Error fetching forms:", error);
    return rejectWithValue({
      message: error.response?.data?.message || "Failed to fetch forms",
    });
  }
});

// Ornament Form: Delete
export const deleteForm = createAsyncThunk<
  any,
  string,
  { rejectValue: string }
>(
  "stockManagement/deleteForm",
  async (id, { rejectWithValue }) => {
    try {
      const response = await apiClient.delete(`${DELETE_ORNAMENT_FORMS}/${id}`);
      return response.data;
    } catch (error: any) {
      console.error("Error deleting form:", error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete form"
      );
    }
  }
);



// Ornament Form: Create
export const addGrades = createAsyncThunk<
  any,
  { ornamentGrade: string; ornament: string },
  { rejectValue: string }
>(
  "stockManagement/addGrades",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await apiClient.post(POST_ORNAMENT_Grade, payload);
      return response.data;
    } catch (error: any) {
      console.error("Error creating Cut Grade:", error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to create Grade"
      );
    }
  }
);


// Fetch Cuts Grade
export const fetchGrades = createAsyncThunk<{
  data: { id: string; ornamentGrade: string }[];
},
void,
{ rejectValue: { message: string } }
>("stockManagement/fetchGrades", async (_, { rejectWithValue }) => {
  try {
    const res = await apiClient.get(GET_ORNAMENT_Grade);
    return { data: res.data.data };
  } catch (error: any) {
    console.error("Error fetching Grades:", error);
    return rejectWithValue({
      message: error.response?.data?.message || "Failed to fetch Grades",
    });
  }
});

// Ornament CutGrade: Delete
export const deleteGrades = createAsyncThunk<
  any,
  string,
  { rejectValue: string }
>(
  "stockManagement/deleteGrade",
  async (id, { rejectWithValue }) => {
    try {
      const response = await apiClient.delete(`${DELETE_ORNAMENT_Grade}/${id}`);
      return response.data;
    } catch (error: any) {
      console.error("Error deleting Grade:", error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete Grade"
      );
    }
  }
);





// Add Ornament Purity
export const addPurity = createAsyncThunk<
  any, // Replace with the actual response type if known
  { ornamentPurity: string; ornament: string }, // Payload type: purity name and ornament ID
  { rejectValue: string }
>(
  "stockManagement/addPurity",
  async (payload: { ornamentPurity: string; ornament: string }, { rejectWithValue }) => {
    try {
      const res = await apiClient.post(POST_ORNAMENT_PURITY, payload);
      return res.data;
    } catch (error: any) {
      console.error("Error adding ornament purity:", error); // Log errors
      return rejectWithValue(
        error.response?.data?.message || "Failed to add ornament purity"
      );
    }
  }
);

// Fetch Purities
export const fetchPurities = createAsyncThunk<{
  data: { id: string; ornamentPurity: string }[];
},
void,
{ rejectValue: { message: string } }
>("stockManagement/fetchPurities", async (_, { rejectWithValue }) => {
  try {
    const res = await apiClient.get(GET_ORNAMENT_PURITY);
    return { data: res.data.data };
  } catch (error: any) {
    console.error("Error fetching purities:", error);
    return rejectWithValue({
      message: error.response?.data?.message || "Failed to fetch purities",
    });
  }
});

// Ornament Purity: Delete
export const deletePurity = createAsyncThunk<
  any,
  string, // ID of the ornament purity to delete
  { rejectValue: string }
>(
  "stockManagement/deletePurity",
  async (id, { rejectWithValue }) => {
    try {
      const response = await apiClient.delete(`${DELETE_ORNAMENT_PURITY}/${id}`);
      return response.data;
    } catch (error: any) {
      console.error("Error deleting purity:", error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete purity"
      );
    }
  }
);

// Ornament Color: Create
export const addColor = createAsyncThunk<
  any,
  { ornamentColor: string; ornament: string },
  { rejectValue: string }
>(
  "stockManagement/addColor",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await apiClient.post(POST_ORNAMENT_COLORS, payload);
      return response.data;
    } catch (error: any) {
      console.error("Error creating color:", error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to create color"
      );
    }
  }
);

// Fetch Colors
export const fetchColors = createAsyncThunk<{
  data: { id: string; ornamentColor: string }[];
},
void,
{ rejectValue: { message: string } }
>("stockManagement/fetchColors", async (_, { rejectWithValue }) => {
  try {
    const res = await apiClient.get(GET_ORNAMENT_COLORS);
    return { data: res.data.data };
  } catch (error: any) {
    console.error("Error fetching colors:", error);
    return rejectWithValue({
      message: error.response?.data?.message || "Failed to fetch colors",
    });
  }
});

// Ornament Color: Delete
export const deleteColor = createAsyncThunk<
  any,
  string,
  { rejectValue: string }
>(
  "stockManagement/deleteColor",
  async (id, { rejectWithValue }) => {
    try {
      const response = await apiClient.delete(`${DELETE_ORNAMENT_COLORS}/${id}`);
      return response.data;
    } catch (error: any) {
      console.error("Error deleting color:", error);
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete color"
      );
    }
  }
);

// Create Inward
export const createInward = createAsyncThunk<
  any, // Replace `any` with the actual response type if known
  CreateStockInwardPayload, // Ensure this matches the payload type for creating inward stock
  { rejectValue: { message: string } }
>("stockManagement/createInward", async (payload, { rejectWithValue }) => {
  try {
    const response = await apiClient.post(CREATE_STOCK, payload); // Replace `CREATE_STOCK` with the actual API endpoint for inward stock
    return response.data?.data || payload; // Ensure to return the correct data or payload
  } catch (error: any) {
    console.error("Error creating inward stock:", error); // Log the error for debugging
    return rejectWithValue({
      message:
        error.response?.data?.message || "Failed to create inward stock",
    });
  }
});

// Create Outward
export const createOutward = createAsyncThunk<
  any, // Replace `any` with the actual response type if known
  CreateStockOutwardPayload, // Ensure this matches the payload type for creating outward stock
  { rejectValue: { message: string } }
>("stockManagement/createOutward", async (payload, { rejectWithValue }) => {
  try {
    const response = await apiClient.post(CREATE_STOCK, payload); // Replace `CREATE_STOCK` with the actual API endpoint for outward stock
    return response.data?.data || payload; // Ensure to return the correct data or payload
  } catch (error: any) {
    console.error("Error creating outward stock:", error); // Log the error for debugging
    return rejectWithValue({
      message:
        error.response?.data?.message || "Failed to create outward stock",
    });
  }
});


// Get All Inwards
export const getAllInwardsAction = createAsyncThunk<{
  data: StockManagementInwardModel[];
  itemCount: number;
},
{ commonApiParamModel: GetAllInwardsRequest },
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
      const res = await apiClient.get(FETCH_INWARD_STOCK, options);
      let data: StockManagementInwardModel[] = [];
      if (res?.data?.data?.data) data = res.data.data.data;
      return { data, itemCount: res.data.data.meta.itemCount };
    } catch (error: any) {
      console.error("Error occurred while fetching inwards:", error);
      const status = error.response?.status || 500;
      CustomToast.ErrorToast(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to fetch inwards"
      );
      return rejectWithValue({
        message: "Failed to fetch inwards",
        status,
      });
    }
  }
);

// Get All Outwards
export const getAllOutwardsAction = createAsyncThunk<{
  data: StockManagementOutwardModel[];
  itemCount: number;
},
{ commonApiParamModel: GetAllOutwardsRequest },
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
      let data: StockManagementOutwardModel[] = [];
      if (res?.data?.data?.data) data = res.data.data.data;
      return { data, itemCount: res.data.data.meta.itemCount };
    } catch (error: any) {
      console.error("Error occurred while fetching inwards:", error);
      const status = error.response?.status || 500;
      CustomToast.ErrorToast(
        error?.response?.data?.message ||
          error?.message ||
          "Failed to fetch outwards"
      );
      return rejectWithValue({
        message: "Failed to fetch outwards",
        status,
      });
    }
  }
);

// Edit Inward
export const editInwardAction = createAsyncThunk<{
  data: StockManagementInwardModel;
  message: string;
},
{ editInwardPayload: CreateStockInwardPayload; inwardId: string },
{ rejectValue: { message: string; status?: number } }
>(
  "stockManagement/editInward",
  async ({ editInwardPayload, inwardId }, { rejectWithValue }) => {
    try {
      const res = await apiClient.patch(
        `${UPDATE_STOCK}/${inwardId}`,
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
export const editOutwardAction = createAsyncThunk<{
  data: StockManagementOutwardModel;
  message: string;
},
{ editOutwardPayload: CreateStockOutwardPayload; outwardId: string },
{ rejectValue: { message: string; status?: number } }
>(
  "stockManagement/editOutward",
  async ({ editOutwardPayload, outwardId }, { rejectWithValue }) => {
    try {
      const res = await apiClient.patch(
        `${UPDATE_STOCK}/${outwardId}`,
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
export const deleteInwardAction = createAsyncThunk<{
  message: string;
},
string, // inwardId
{ rejectValue: { message: string; status?: number } }
>("stockManagement/deleteInward", async (inwardId, { rejectWithValue }) => {
  try {
    await apiClient.delete(`${DELETE_STOCK}/${inwardId}`);
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
});

// Delete Outward
export const deleteOutwardAction = createAsyncThunk<{
  message: string;
},
string, // outwardId
{ rejectValue: { message: string; status?: number } }
>("stockManagement/deleteOutward", async (outwardId, { rejectWithValue }) => {
  try {
    await apiClient.delete(`${DELETE_STOCK}/${outwardId}`);
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
});
