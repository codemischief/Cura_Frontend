import { configureStore } from "@reduxjs/toolkit";
// import { pmaSlicing } from "./slice/pmaSlice";
import pmaReducer from "./slice/pmaSlice";

export const store = configureStore({
  reducer: {
    pmaBilling: pmaReducer,
  },
  // Add the RTK Query API middleware
});
