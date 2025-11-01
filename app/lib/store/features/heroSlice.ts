import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import heroService, { HeroData } from "@/app/services/hero.service";

interface HeroState {
  heroes: HeroData[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: HeroState = {
  heroes: [],
  status: "idle",
  error: null,
};

// 🟢 Fetch all hero sections
export const fetchAllHeroes = createAsyncThunk(
  "hero/fetchAllHeroes",
  async (_, thunkAPI) => {
    try {
      return await heroService.getAllHeroes();
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// 🔵 Fetch hero by headerId
export const fetchHeroByHeader = createAsyncThunk(
  "hero/fetchHeroByHeader",
  async (headerId: number, thunkAPI) => {
    try {
      return await heroService.getHeroByHeaderId(headerId);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// 🟣 Create hero
export const createHero = createAsyncThunk(
  "hero/createHero",
  async (data: HeroData, thunkAPI) => {
    try {
      return await heroService.createHero(data);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// 🟠 Update hero
export const updateHero = createAsyncThunk(
  "hero/updateHero",
  async ({ id, data }: { id: number; data: Partial<HeroData> }, thunkAPI) => {
    try {
      return await heroService.updateHero(id, data);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// 🔴 Delete hero
export const deleteHero = createAsyncThunk(
  "hero/deleteHero",
  async (id: number, thunkAPI) => {
    try {
      return await heroService.deleteHero(id);
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || error.message);
    }
  }
);

// 🧩 Slice
const heroSlice = createSlice({
  name: "hero",
  initialState,
  reducers: {
    clearHeroes: (state) => {
      state.heroes = [];
      state.status = "idle";
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // 🔹 Fetch All
      .addCase(fetchAllHeroes.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllHeroes.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.heroes = action.payload;
      })
      .addCase(fetchAllHeroes.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload as string;
      })
      // 🔹 Fetch by Header
      .addCase(fetchHeroByHeader.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.heroes = Array.isArray(action.payload)
          ? action.payload
          : [action.payload];
      })
      // 🔹 Create
      .addCase(createHero.fulfilled, (state, action) => {
        state.heroes.push(action.payload);
      })
      // 🔹 Update
      .addCase(updateHero.fulfilled, (state, action) => {
        const index = state.heroes.findIndex((h) => h.id === action.payload.id);
        if (index !== -1) state.heroes[index] = action.payload;
      })
      // 🔹 Delete
      .addCase(deleteHero.fulfilled, (state, action) => {
        state.heroes = state.heroes.filter((h) => h.id !== action.meta.arg);
      });
  },
});

export const { clearHeroes } = heroSlice.actions;
export default heroSlice.reducer;
