export const getPmaBillingPayload = (obj) => {
  return { ...obj, user_id: obj.userId ?? 1234 };
};

export const env_URL_SERVER = import.meta.env.VITE_ENV_URL_SERVER;
