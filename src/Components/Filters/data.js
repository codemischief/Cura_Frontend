const commonFilterKeys = [
  { key: "noFilter", title: "No Filter" },
  { key: "equalTo", title: "Equal To" },
  { key: "isNotNull", title: "is Not Null" },
  { key: "isNull", title: "isNull" },
];

export const characterFilterData = [
  ...commonFilterKeys,
  { key: "contains", title: "Contains" },
  { key: "doesNotContain", title: "Does not contain" },
  { key: "startsWith", title: "Starts With" },
  { key: "endsWith", title: "Ends With" },
];

export const numericFilterData = [
  ...commonFilterKeys,
  { key: "notEqualTo", title: "Not Equal To" },
  { key: "greaterThan", title: "Greater Than" },
  { key: "lessThan", title: "Less Than" },
  { key: "greaterThanOrEqualTo", title: "Greater Than Or Equal To" },
  { key: "lessThanOrEqualTo", title: "Less Than Or Equal To" },
  // { key: "between", title: "Between" },
  // { key: "notBetween", title: "Not Between" },
];

export const dateFilterData = [
  ...commonFilterKeys,
  { key: "notEqualTo", title: "Not Equal To" },
  { key: "greaterThan", title: "Greater Than" },
  { key: "lessThan", title: "Less Than" },
  { key: "greaterThanOrEqualTo", title: "Greater Than Or Equal To" },
  { key: "lessThanOrEqualTo", title: "Less Than Or Equal To" },
];
