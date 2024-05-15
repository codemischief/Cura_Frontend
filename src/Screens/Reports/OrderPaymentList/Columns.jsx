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
      render: (index) => {
        return (
          <Stack
            direction="row"
            sx={{ justifyContent: "center", width: "30px" }}
          >
            {index + 1}
          </Stack>
        );
      },
    },
    {
      filterComponent: TextFilterField,
      title: "Type",
      field: "type",
      sorting: true,
      filterDisabled: true,
      width: "6.66%",
    },
    {
      filterComponent: DateFilterField,
      cellStyle: { minWidth: "20px", maxWidth: "34px" },
      title: "Payment Date",
      field: "paymentdate",
      filterDisabled: false,
      sorting: true,
      width: "6.66%",
    },
    {
      title: "Fiscal Month",
      field: "monthyear",
      sorting: true,
      cellStyle: { minWidth: "20px", maxWidth: "34px" },
      filterComponent: DateFilterField,
      // filterComponent:TextFilterField,

      width: "6.66%",
    },
    {
      title: "Fiscal Year",
      field: "fy",
      sorting: true,
      type: "numeric",
      filterComponent: TextFilterField,
      width: "6.66%",
    },
    {
      title: "Amount",
      field: "amount",
      type: "numeric",
      sorting: true,
      filterComponent: NumberFilterField,
      width: "6.66%",
    },

    {
      title: "Entity",
      field: "entityname",
      type: "numeric",
      sorting: true,
      filterComponent: TextFilterField,
      width: "6.66%",
    },
    {
      title: "Mode",
      field: "mode_of_payment",
      type: "numeric",
      sorting: true,
      filterComponent: TextFilterField,
      width: "6.66%",
    },
    {
      title: "Client ID",
      field: "clientid",
      type: "numeric",
      sorting: true,
      filterComponent: NumberFilterField,
      width: "6.66%",
    },
    {
      title: "Client Name",
      field: "clientname",
      sorting: true,
      type: "numeric",
      filterComponent: TextFilterField,
      width: "8%",
    },
    {
      title: "Vendor Name",
      field: "vendorname",
      sorting: true,
      type: "numeric",
      filterComponent: TextFilterField,
      width: "6.66%",
      sorting: true,
    },
    {
      title: "Order Id",
      field: "orderid",
      sorting: true,
      type: "numeric",
      filterComponent: NumberFilterField,
      width: "6.66%",
    },
    {
      title: "Service Id",
      field: "serviceid",
      type: "numeric",
      sorting: true,
      filterComponent: NumberFilterField,
      width: "6.66%",
    },
    {
      title: "Service ",
      field: "service",
      sorting: true,
      type: "numeric",
      filterComponent: TextFilterField,
      width: "6.66%",
    },
    {
      title: "LOB Name",
      field: "lobname",
      sorting: true,
      type: "numeric",
      filterComponent: TextFilterField,
      width: "6.66%",
    },
  ];
  return columns;
}
