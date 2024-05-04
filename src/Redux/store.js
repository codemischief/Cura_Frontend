import { configureStore } from "@reduxjs/toolkit";
import { pmaSlicing } from "./pmaSlicing";

export const store = configureStore({
  reducer: {
   pmaBilling:pmaSlicing
  
  },
  // Add the RTK Query API middleware
  
});
