import { formatDate } from "../utils/formatDate";
export const getPmaBillingPayload = (obj) => {
  return { ...obj, user_id: obj.userId ?? 1234 };
};

function floorDecimal(number) {
  let floorValue = Math.floor(number * 100) / 100; // Get floor value with two decimal places
  return floorValue.toFixed(2); // Convert to string with exactly two decimal places
}
export const updatedResponsePmaData = (data, year, month) => {
  return data.map((billing, index) => ({
    ...billing,
    data: billing.data ? billing.date : "--",
    totaltaxamt: billing.totaltaxamt
      ? floorDecimal(billing.totaltaxamt)
      : "---",
    totalamt: billing.totalamt ? floorDecimal(billing.totalamt) : "---",
    rentedtaxamt: billing.rentedtaxamt
      ? floorDecimal(billing.rentedtaxamt)
      : "---",
    rentedamt: billing.rentedamt ? floorDecimal(billing.rentedamt) : "---",
    totalbaseamt: billing.totalbaseamt
      ? floorDecimal(billing.totalbaseamt)
      : "---",
    // invoicedate: `${year}-${month}-01`,
    fixedamt: billing?.fixedamt ? billing?.fixedamt : "---",
    fixedtaxamt: billing?.fixedtaxamt
      ? floorDecimal(billing?.fixedtaxamt)
      : "---",
  }));
};
export const updatedOrderPaymentData = (data, year, month) => {
  
  return data.map((billing, index) => ({
    ...billing,
    data: billing.data ? billing.date : "--",
    amount: billing.amount ? floorDecimal(billing.amount) : "---",
  }));
};
export const updatedOrderReceiptData = (data, year, month) => {
  return data.map((billing, index) => ({
    ...billing,
    data: billing.data ? billing.date : "--",
    amount: billing.amount ? floorDecimal(billing.amount) : "---",
  }));
};
export const updatedOrderInvoiceData = (data, year, month) => {
  console.log(data)
  return data.map((billing, index) => ({
    ...billing,
    invoicedate: billing.invoicedate ? formatDate(billing.invoicedate) : "--",
    invoiceamount: billing.invoiceamount ? floorDecimal(billing.invoiceamount) : "---",
  }));
};
export const updatedClientReceiptData = (data, year, month) => {
  return data.map((billing, index) => ({
    ...billing,
    data: billing.data ? billing.date : "--",
    amount: billing.amount ? floorDecimal(billing.amount) : "---",
    recddate: billing.recddate ? formatDate(billing.recddate) : "--",
  }));
};
export const env_URL_SERVER = import.meta.env.VITE_ENV_URL_SERVER;
