export const getPmaBillingPayload = (obj) => {
  return { ...obj, user_id: obj.userId ?? 1234 };
};

export const updatedResponsePmaData = (data) => {
  return data.map((billing) => ({
    ...billing,
    totaltaxamt: billing.totaltaxamt ? billing.totaltaxamt?.toFixed(2) : null,
    totalamt: billing.totalamt ? billing.totalamt?.toFixed(2) : null,
    rentedtaxamt: billing.rentedtaxamt
      ? billing.rentedtaxamt?.toFixed(2)
      : null,
    rentedamt: billing.rentedamt ? billing.rentedamt?.toFixed(2) : null,
    totalbaseamt: billing.totalbaseamt
      ? billing.totalbaseamt?.toFixed(2)
      : null,
  }));
};
export const env_URL_SERVER = import.meta.env.VITE_ENV_URL_SERVER;
