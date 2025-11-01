// /lib/store/store.js
import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import headerReducer from "./features/headerSlice";
import heroReducer from "./features/heroSlice";
import quickStatsReducer from "./features/quickStatsSlice";

// import courseReducer from "./features/courseSlice";
// import enrollmentReducer from "./features/enrollmentSlice";
// import adminReducer from "./features/adminSlice";
// import appSettings from "./features/appSettingsSlice";
// import userReducer from "./features/user/userSlice";
// import instructorReducer from "./features/instructor/instructorSlice";
// import adminReducer from "./features/admin/adminSlice";
// import commonReducer from "./features/common/commonSlice";

export const store = configureStore({
  reducer: {
    header: headerReducer,
    heroSection: heroReducer,
    quickstats: quickStatsReducer,
  },
  devTools: process.env.NEXT_PUBLIC_NODE_ENV !== "production", // ✅ disable in prod
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
