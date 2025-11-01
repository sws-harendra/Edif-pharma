// src/features/header/headerSlice.ts
import headerService, { HeaderData } from "@/app/services/header.service";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface HeaderState {
  header: HeaderData | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: HeaderState = {
  header: null,
  status: "idle",
  error: null,
};

// ✅ Async thunks
export const fetchHeader = createAsyncThunk(
  "header/fetchHeader",
  async (_, thunkAPI) => {
    try {
      return await headerService.getHeader();
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const createHeader = createAsyncThunk(
  "header/createHeader",
  async (data: HeaderData, thunkAPI) => {
    try {
      return await headerService.createHeader(data);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const updateHeader = createAsyncThunk(
  "header/updateHeader",
  async ({ id, data }: { id: number; data: Partial<HeaderData> }, thunkAPI) => {
    try {
      return await headerService.updateHeader(id, data);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

export const deleteHeader = createAsyncThunk(
  "header/deleteHeader",
  async (id: number, thunkAPI) => {
    try {
      return await headerService.deleteHeader(id);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// 🧩 Slice
const headerSlice = createSlice({
  name: "header",
  initialState,
  reducers: {
    clearHeader: (state) => {
      state.header = null;
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // 🔹 Fetch
      .addCase(fetchHeader.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchHeader.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.header = action.payload;
      })
      .addCase(fetchHeader.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      // 🔹 Create
      .addCase(createHeader.fulfilled, (state, action) => {
        state.header = action.payload;
        state.status = "succeeded";
      })
      // 🔹 Update
      .addCase(updateHeader.fulfilled, (state, action) => {
        state.header = action.payload;
        state.status = "succeeded";
      })
      // 🔹 Delete
      .addCase(deleteHeader.fulfilled, (state) => {
        state.header = null;
        state.status = "succeeded";
      });
  },
});

export const { clearHeader } = headerSlice.actions;
export default headerSlice.reducer;
