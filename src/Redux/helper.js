export const getPmaBillingPayload = (obj) => {
  return { ...obj, user_id: obj.userId ?? 1234 };
};
