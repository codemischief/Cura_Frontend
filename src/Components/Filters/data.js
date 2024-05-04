const commonFilterKeys = [
  { key: "NoFilter", title: "No Filter" },
  { key: "EqualTo", title: "Equal To" },
  { key: "isNotNull", title: "is Not Null" },
  { key: "isNull", title: "isNull" },
];
export const characterFilterData = [
  ...commonFilterKeys,
  { key: "Contains", title: "Contains" },
  { key: "DoesNotContain", title: "Does not contain" },
  { key: "StartsWith", title: "Starts With" },
  { key: "EndsWith", title: "Ends With" },
];

export const numericFilterData = [
  ...commonFilterKeys,
  { key: "notEqualTo", title: "Not Equal To" },
  { key: "greaterThan", title: "Greater Than" },
  { key: "lessThan", title: "Less Than" },
  { key: "greaterThanOrEqualTo", title: "Greater Than Or Equal To" },
  { key: "lessThanOrEqualTo", title: "Less Than Or Equal To" },
  { key: "between", title: "Between" },
  { key: "notBetween", title: "Not Between" },
];

export const dateFilterData = [
  ...commonFilterKeys,
  { key: "notEqualTo", title: "Not Equal To" },
  { key: "greaterThan", title: "Greater Than" },
  { key: "lessThan", title: "Less Than" },
  { key: "greaterThanOrEqualTo", title: "Greater Than Or Equal To" },
  { key: "lessThanOrEqualTo", title: "Less Than Or Equal To" },
];
