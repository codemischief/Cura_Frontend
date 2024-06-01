import { PATH_DASHBOARD } from "../route/path";

export const routeMapObj = Object.freeze({
  BuilderInfo: PATH_DASHBOARD.admin.manageBuilder.root,
});

export const replaceKeys = (access_rights) => {
  return Object.keys(access_rights).reduce((acc, key) => {
    const newKey = routeMapObj[key] || key;
    acc[newKey] = access_rights[key];
    return acc;
  }, {});
};
