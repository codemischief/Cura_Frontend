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

export const env_URL_SERVER = import.meta.env.VITE_ENV_URL_SERVER;
