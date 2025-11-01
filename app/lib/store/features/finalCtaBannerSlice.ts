// app/lib/store/features/finalCtaBannerSlice.ts
"use client";

import finalCtaBannerService from "@/app/services/finalCtaBannerService";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export interface FinalCTABanner {
  id?: number;
  headerId?: number;
  title: string;
  subtitle: string;
  gradientStart?: string;
  gradientEnd?: string;
  backgroundImage?: string;
  quoteButtonText?: string;
  quoteButtonLink?: string;
  quoteButtonPopup?: boolean;
  catalogButtonText?: string;
  catalogFile?: string;
  enabled?: boolean;
  order?: number;
  createdAt?: string;
  updatedAt?: string;
}

interface CTAState {
  banner: FinalCTABanner | null;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: CTAState = {
  banner: null,
  status: "idle",
  error: null,
};

// ✅ Fetch CTA banner
export const fetchCTABanner = createAsyncThunk(
  "finalCtaBanner/fetch",
  async (_, { rejectWithValue }) => {
    try {
      return await finalCtaBannerService.get();
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

// ✅ Create CTA banner
export const createCTABanner = createAsyncThunk(
  "finalCtaBanner/create",
  async (payload: FinalCTABanner, { rejectWithValue }) => {
    try {
      return await finalCtaBannerService.create(payload);
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

// ✅ Update CTA banner
export const updateCTABanner = createAsyncThunk(
  "finalCtaBanner/update",
  async (
    { id, payload }: { id: number; payload: FinalCTABanner },
    { rejectWithValue }
  ) => {
    try {
      return await finalCtaBannerService.update(id, payload);
    } catch (err: any) {
      return rejectWithValue(err.response?.data?.error || err.message);
    }
  }
);

const finalCtaBannerSlice = createSlice({
  name: "finalCtaBanner",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch
      .addCase(fetchCTABanner.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCTABanner.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.banner = action.payload;
      })
      .addCase(fetchCTABanner.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })

      // Create
      .addCase(createCTABanner.fulfilled, (state, action) => {
        state.banner = action.payload;
        state.status = "succeeded";
      })

      // Update
      .addCase(updateCTABanner.fulfilled, (state) => {
        state.status = "succeeded";
      });
  },
});

export default finalCtaBannerSlice.reducer;
