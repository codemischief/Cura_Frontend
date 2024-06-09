import { Stack } from "@mui/material";
import styleConst from "./styleConst";
import {
  DateFilterField,
  NumberFilterField,
  TextFilterField,
} from "./CustomFilterField";

export default function connectionDataColumn(onQuery) {
  const { cellStyleCommon } = styleConst;

  const columns = [
    {
      title: "Sr No",
      cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "2rem" , maxWidth:"4rem" },
      sorting: false,
      render: (index) => {
        return (
          <Stack
            direction="row"
            sx={{ justifyContent: "center", minWidth: "50px" }}
          >
            {index + 1}
          </Stack>
        );
      },
    },
    {
      title: "Client Name",
      field: "clientname",
      sorting: true,
      // cellStyle: { minWidth: "20px", },
      filterComponent: TextFilterField,
      cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "8rem" , maxWidth:"12rem"  },
    },
    {
      title: "Order Description",
      field: "briefdescription",
      sorting: true,
      filterComponent: TextFilterField,
      cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "8rem" , maxWidth:"12rem" },
    },
    {
      title: "Service",
      field: "service",
      sorting: true,
      filterComponent: TextFilterField,
      cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "8rem" , maxWidth:"12rem" },
    },
    {
      title: "Order Owner",
      field: "ownername",
      sorting: true,
      filterComponent: TextFilterField,
      cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "8rem" , maxWidth:"12rem" },
    },
    {
      title: "Vendor Name",
      field: "vendorname",
      sorting: true,
      filterComponent: TextFilterField,
      cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "8rem" , maxWidth:"12rem" },
    },
    {
      title: "Total Estimate Amount",
      field: "estimateamount",
      sorting: true,
      filterComponent: NumberFilterField,
      cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "8rem" , maxWidth:"20rem" },
    },
    {
      title: "Total Invoice Amount",
      field: "invoiceamount",
      sorting: true,
      filterComponent: NumberFilterField,
      cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "8rem" , maxWidth:"12rem" },
    },
    {
      title: "Total Payment Amount",
      field: "paymentamount",
      sorting: true,
      filterComponent: NumberFilterField,
      cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "8rem" , maxWidth:"20rem" },
    },
    {
      title: "Computed Pending",
      field: "computedpending",
      sorting: true,
      filterComponent: NumberFilterField,
      cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "8rem" , maxWidth:"12rem" },
    },
  ];
  return columns;
}
