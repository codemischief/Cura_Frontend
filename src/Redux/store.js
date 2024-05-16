import { configureStore } from "@reduxjs/toolkit";
// import { pmaSlicing } from "./slice/pmaSlice";
import pmaReducer from "./slice/pmaSlice";
import orderPaymentReducer from "./slice/reporting/OrderPaymentSlice";
import OrderReceiptReducer from "./slice/reporting/OrderReceiptSlice";

export const store = configureStore({
  reducer: {
    pmaBilling: pmaReducer,
    orderPayment: orderPaymentReducer,
    orderReceipt: OrderReceiptReducer
  },
  // Add the RTK Query API middleware
});
