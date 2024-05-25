import { configureStore } from "@reduxjs/toolkit";
// import { pmaSlicing } from "./slice/pmaSlice";
import pmaReducer from "./slice/pmaSlice";
import orderPaymentReducer from "./slice/reporting/OrderPaymentSlice";
import OrderReceiptReducer from "./slice/reporting/OrderReceiptSlice";
import OrderInvoiceReducer from "./slice/reporting/OrderInvoiceSlice";
import ClientReceiptReducer from "./slice/reporting/ClientReceiptSlice";
import VendorInvoiceReducer from "./slice/reporting/VendorInvoiceSlice";
import LOBReceiptPaymentReducer from "./slice/reporting/LOBReceiptPaymentSlice";
import EntityReceiptPaymentReducer from "./slice/reporting/EntityReceiptPaymentSlice";
import LOBReceiptPaymentConsolidatedReducer from "./slice/reporting/LOBReceiptPaymentConsolidatedSlice";
// import { pmaBillingTrendView } from "./helper";
import pmaBillingTrendView from "./slice/reporting/pmaBillingTrendView";
import pmaClientReport from "./slice/reporting/pmaClientReport";
import pmaInvoiceList from "./slice/reporting/pmaInvoiceList";
// import { setPmaClientReceivables } from "./slice/reporting/ReportPmaClientReceivable";
import pmaClientReceivable from "./slice/reporting/ReportPmaClientReceivable"
export const store = configureStore({
  reducer: {
    pmaBilling: pmaReducer,
    orderPayment: orderPaymentReducer,
    orderReceipt: OrderReceiptReducer,
    orderInvoice: OrderInvoiceReducer,
    clientReceipt: ClientReceiptReducer,
    vendorInvoice: VendorInvoiceReducer,
    lobReceiptPayments : LOBReceiptPaymentReducer,
    entityReceiptPayments : EntityReceiptPaymentReducer,
    lobReceiptPaymentConsolidated : LOBReceiptPaymentConsolidatedReducer,
    pmaBillingTrendView : pmaBillingTrendView,
    pmaClientReport : pmaClientReport,
    pmaInvoiceList : pmaInvoiceList,
    pmaClientReceivable : pmaClientReceivable
  },
  // Add the RTK Query API middleware
});
