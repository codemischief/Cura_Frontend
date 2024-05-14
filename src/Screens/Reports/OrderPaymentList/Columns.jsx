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
      width: "3%",
      sorting: false,
      render: (rowData) => {
        return (
          <Stack
            direction="row"
            sx={{ justifyContent: "center", width: "30px" }}
          >
            1{/* {rowData?.tableData.index + 1} */}
          </Stack>
        );
      },
    },
    {
      filterComponent: TextFilterField,
      title: "Type",
      field: "type",
      sorting: true,
      cellStyle: { ...cellStyleCommon, justifyContent: "center" },
      width: "6.66%",
    },
    {
      filterComponent: TextFilterField,
      title: "Payment Date",
      field: "paymentdate",
      sorting: true,
      cellStyle: { ...cellStyleCommon, justifyContent: "center" },
      width: "6.66%",
    },
    {
      title: "Fiscal Month",
      field: "monthyear",
      sorting: true,
      // cellStyle: { ...cellStyleCommon, justifyContent: "center" },
      filterComponent: DateFilterField,
      // filterComponent:TextFilterField,
     
      width: "6.66%",
    },
    {
      title: "Fiscal Year",
      field: "fy",
      sorting: true,
      type: "numeric",
      cellStyle: { ...cellStyleCommon, justifyContent: "center" },
      filterComponent: NumberFilterField,
      width: "6.66%",
    },
    {
      title: "Amount",
      field: "amount",
      type: "numeric",
      sorting: true,
      cellStyle: { ...cellStyleCommon, justifyContent: "center" },
      filterComponent: NumberFilterField,
      width: "6.66%",
    },

    {
      title: "Entity",
      field: "entityname",
      type: "numeric",
      sorting: true,
      cellStyle: { ...cellStyleCommon, justifyContent: "center" },
      filterComponent: NumberFilterField,
      width: "6.66%",
    },
    {
      title: "Mode",
      field: "mode_of_payment",
      type: "numeric",
      sorting: true,
      cellStyle: { ...cellStyleCommon, justifyContent: "center" },
      filterComponent: NumberFilterField,
      width: "6.66%",
    },
    {
      title: "Client ID",
      field: "clientid",
      type: "numeric",
      sorting: true,
      cellStyle: { ...cellStyleCommon, justifyContent: "center" },
      filterComponent: NumberFilterField,
      width: "6.66%",
    },
    {
      title: "Client Name",
      field: "clientname",
      sorting: true,
      cellStyle: { ...cellStyleCommon, justifyContent: "center" },
      type: "numeric",
      filterComponent: NumberFilterField,
      width: "8%",
    },
    {
      title: "Vendor Name",
      field: "vendorname",
      sorting: true,
      cellStyle: { ...cellStyleCommon, justifyContent: "center" },
      type: "numeric",
      filterComponent: NumberFilterField,
      width: "6.66%",
      sorting: true,
    },
    {
      title: "Order Id",
      field: "orderid",
      sorting: true,
      cellStyle: { ...cellStyleCommon, justifyContent: "center" },
      type: "numeric",
      filterComponent: NumberFilterField,
      width: "6.66%",
    },
    {
      title: "Service Id",
      field: "serviceid",
      type: "numeric",
      sorting: true,
      cellStyle: { ...cellStyleCommon, justifyContent: "center" },
      filterComponent: NumberFilterField,
      width: "6.66%",
    },
    {
      title: "Service ",
      field: "service",
      sorting: true,
      type: "numeric",
      cellStyle: { ...cellStyleCommon, justifyContent: "center" },
      filterComponent: NumberFilterField,
      width: "6.66%",
    },
    {
      title: "LOB Name",
      field: "lobname",
      sorting: true,
      cellStyle: { ...cellStyleCommon, justifyContent: "center" },
      type: "numeric",
      filterComponent: NumberFilterField,
      width: "6.66%",
    },
  ];
  return columns;
}
