"use client";

import quickStatsService, {
  QuickStatData,
} from "@/app/services/quickstats.service";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

interface QuickStatsState {
  quickStats: QuickStatData[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: QuickStatsState = {
  quickStats: [],
  status: "idle",
  error: null,
};

// 🟢 Fetch all quick stats
export const fetchAllQuickStats = createAsyncThunk(
  "quickStats/fetchAll",
  async (_, thunkAPI) => {
    try {
      return await quickStatsService.getAllQuickStats();
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// 🟣 Create quick stats (single or multiple)
export const createQuickStats = createAsyncThunk(
  "quickStats/create",
  async (data: QuickStatData | QuickStatData[], thunkAPI) => {
    try {
      return await quickStatsService.createQuickStats(data);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// 🟠 Update a quick stat
export const updateQuickStat = createAsyncThunk(
  "quickStats/update",
  async (
    { id, data }: { id: number; data: Partial<QuickStatData> },
    thunkAPI
  ) => {
    try {
      return await quickStatsService.updateQuickStat(id, data);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// 🔴 Delete a quick stat
export const deleteQuickStat = createAsyncThunk(
  "quickStats/delete",
  async (id: number, thunkAPI) => {
    try {
      return await quickStatsService.deleteQuickStat(id);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// 🟡 Reorder quick stats
export const reorderQuickStats = createAsyncThunk(
  "quickStats/reorder",
  async (order: { id: number; order: number }[], thunkAPI) => {
    try {
      return await quickStatsService.reorderQuickStats(order);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// 🧱 Slice
const quickStatsSlice = createSlice({
  name: "quickStats",
  initialState,
  reducers: {
    clearQuickStats: (state) => {
      state.quickStats = [];
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch All
      .addCase(fetchAllQuickStats.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllQuickStats.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.quickStats = action.payload;
      })
      .addCase(fetchAllQuickStats.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      // Create
      .addCase(createQuickStats.fulfilled, (state, action) => {
        const newStats = Array.isArray(action.payload)
          ? action.payload
          : [action.payload];
        state.quickStats.push(...newStats);
      })
      // Update
      .addCase(updateQuickStat.fulfilled, (state, action) => {
        const index = state.quickStats.findIndex(
          (s) => s.id === action.payload.id
        );
        if (index !== -1) state.quickStats[index] = action.payload;
      })
      // Delete
      .addCase(deleteQuickStat.fulfilled, (state, action) => {
        state.quickStats = state.quickStats.filter(
          (s) => s.id !== action.meta.arg
        );
      })
      // Reorder
      .addCase(reorderQuickStats.fulfilled, (state, action) => {
        // Optionally refresh order locally
        state.status = "succeeded";
      });
  },
});

export const { clearQuickStats } = quickStatsSlice.actions;
export default quickStatsSlice.reducer;
