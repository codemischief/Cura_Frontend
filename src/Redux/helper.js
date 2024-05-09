export const getPmaBillingPayload = (obj) => {
  return { ...obj, user_id: obj.userId ?? 1234 };
};

export const updatedResponsePmaData = (data, year, month) => {
  return data.map((billing, index) => ({
    ...billing,
    data: billing.data ? billing.date : "--",
    totaltaxamt: billing.totaltaxamt ? billing.totaltaxamt?.toFixed(2) : "---",
    totalamt: billing.totalamt ? billing.totalamt?.toFixed(2) : "---",
    rentedtaxamt: billing.rentedtaxamt
      ? billing.rentedtaxamt?.toFixed(2)
      : "---",
    rentedamt: billing.rentedamt ? billing.rentedamt?.toFixed(2) : "---",
    totalbaseamt: billing.totalbaseamt
      ? billing.totalbaseamt?.toFixed(2)
      : "---",
    // invoicedate: `${year}-${month}-01`,
    fixedamt: billing?.fixedamt ? billing?.fixedamt?.toFixed(2) : "---",
    fixedtaxamt: billing?.fixedtaxamt
      ? billing?.fixedtaxamt?.toFixed(2)
      : "---",
  }));
};


export const env_URL_SERVER = import.meta.env.VITE_ENV_URL_SERVER;
