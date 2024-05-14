export const formatedFilterData = (obj) =>
  Object.entries(obj).map(([key, value]) => {
    if (Array.isArray(value) && value.length > 0) {
      return [key, ...value];
    } else {
      return [];
    }
  });
