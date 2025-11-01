import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import manufacturingService, {
  ManufacturingSection,
} from "@/app/services/manufacturing.service";

interface ManufacturingState {
  sections: ManufacturingSection[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ManufacturingState = {
  sections: [],
  status: "idle",
  error: null,
};

export const fetchAllManufacturing = createAsyncThunk(
  "manufacturing/fetchAll",
  async () => {
    return await manufacturingService.getAll();
  }
);

export const createManufacturing = createAsyncThunk(
  "manufacturing/create",
  async (data: ManufacturingSection) => {
    return await manufacturingService.create(data);
  }
);

export const updateManufacturing = createAsyncThunk(
  "manufacturing/update",
  async ({ id, data }: { id: number; data: ManufacturingSection }) => {
    return await manufacturingService.update(id, data);
  }
);

const manufacturingSlice = createSlice({
  name: "manufacturing",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllManufacturing.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllManufacturing.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.sections = action.payload;
      })
      .addCase(fetchAllManufacturing.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch";
      })
      .addCase(createManufacturing.fulfilled, (state, action) => {
        state.sections.push(action.payload);
      })
      .addCase(updateManufacturing.fulfilled, (state, action) => {
        const index = state.sections.findIndex(
          (s) => s.id === action.payload.id
        );
        if (index !== -1) state.sections[index] = action.payload;
      });
  },
});

export default manufacturingSlice.reducer;
