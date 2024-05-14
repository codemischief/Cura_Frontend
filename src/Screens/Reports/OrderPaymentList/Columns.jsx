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
      width: "5%",
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
      cellStyle: { ...cellStyleCommon, minWidth: 80 },
      width: "10%",
    },
    {
      filterComponent: TextFilterField,
      title: "Payment Date",
      field: "paymentdate",
      width: "20%",
    },
    {
      title: "Fiscal Month",
      field: "monthyear",

      filterComponent: DateFilterField,
      sorting: false,
      width: "10%",
    },
    {
      title: "Fiscal Year",
      field: "fy",
      type: "numeric",
      grouping: true,
      filterComponent: NumberFilterField,
      width: "8%",
    },
    {
      title: "Amount",
      field: "amount",
      type: "numeric",
      filterComponent: NumberFilterField,
      width: "8%",
    },

    {
      title: "Entity",
      field: "entityname",
      type: "numeric",
      filterComponent: NumberFilterField,
      width: "8%",
    },
    {
      title: "Mode",
      field: "mode_of_payment",
      type: "numeric",
      filterComponent: NumberFilterField,
      width: "8%",
    },
    {
      title: "Client ID",
      field: "clientid",
      type: "numeric",
      filterComponent: NumberFilterField,
      width: "8%",
    },
    {
      title: "Client Name",
      field: "clientname",
      type: "numeric",
      filterComponent: NumberFilterField,
      width: "8%",
    },
    {
      title: "Vendor Name",
      field: "vendorname",
      type: "numeric",
      filterComponent: NumberFilterField,
      width: "8%",
    },
    {
      title: "Order Id",
      field: "orderid",
      type: "numeric",
      filterComponent: NumberFilterField,
      width: "8%",
    },
    {
      title: "Service Id",
      field: "serviceid",
      type: "numeric",
      filterComponent: NumberFilterField,
      width: "8%",
    },
    {
      title: "Service ",
      field: "service",
      type: "numeric",
      filterComponent: NumberFilterField,
      width: "8%",
    },
    {
      title: "LOB Name",
      field: "lobname",
      type: "numeric",
      filterComponent: NumberFilterField,
      width: "8%",
    },
  ];
  return columns;
}
