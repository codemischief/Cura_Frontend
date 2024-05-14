import { configureStore } from "@reduxjs/toolkit";
// import { pmaSlicing } from "./slice/pmaSlice";
import pmaReducer from "./slice/pmaSlice";
import orderPaymentReducer from "./slice/reporting/OrderPaymentSlice";

export const store = configureStore({
  reducer: {
    pmaBilling: pmaReducer,
    orderPayment: orderPaymentReducer,
  },
  // Add the RTK Query API middleware
});
