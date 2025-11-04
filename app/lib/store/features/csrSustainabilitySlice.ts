"use client";

import csrSustainabilityService, {
  CSRData,
} from "@/app/services/csrSustainability.service";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface CSRState {
  csr: CSRData | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: CSRState = {
  csr: null,
  status: "idle",
  error: null,
};

// 🔵 Fetch CSR section
export const fetchCSR = createAsyncThunk("csr/fetch", async (_, thunkAPI) => {
  try {
    return await csrSustainabilityService.getCSR();
  } catch (error: any) {
    return thunkAPI.rejectWithValue(error.response?.data || error.message);
  }
});

// 🟢 Create CSR section
export const createCSR = createAsyncThunk(
  "csr/create",
  async (data: CSRData, thunkAPI) => {
    try {
      return await csrSustainabilityService.createCSR(data);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// 🟠 Update CSR section
export const updateCSR = createAsyncThunk(
  "csr/update",
  async ({ id, data }: { id: number; data: Partial<CSRData> }, thunkAPI) => {
    try {
      return await csrSustainabilityService.updateCSR(id, data);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// 🧱 Slice
const csrSustainabilitySlice = createSlice({
  name: "csrSustainability",
  initialState,
  reducers: {
    clearCSR: (state) => {
      state.csr = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchCSR.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCSR.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.csr = action.payload;
      })
      .addCase(fetchCSR.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })

      // Create
      .addCase(createCSR.fulfilled, (state, action) => {
        state.csr = action.payload;
      })

      // Update
      .addCase(updateCSR.fulfilled, (state, action) => {
        // since backend returns message only, merge manually
        if (state.csr)
          state.csr = { ...state.csr, ...(action.meta.arg.data as CSRData) };
      });
  },
});

export const { clearCSR } = csrSustainabilitySlice.actions;
export default csrSustainabilitySlice.reducer;
