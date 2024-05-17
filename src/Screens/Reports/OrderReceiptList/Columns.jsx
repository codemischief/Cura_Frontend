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
      width: "2.88%",
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
      // filterComponent: TextFilterField,
      title: "Type",
      field: "type",
      sorting: false,
      filterDisabled: true,
      width: "3.88%",
    },
    {
      filterComponent: NumberFilterField,
      cellStyle: { minWidth: "20px", maxWidth: "34px" },
      title: "ID",
      field: "id",
      filterDisabled: false,
      sorting: true,
      width: "3.88%",
    },
    {
      title: "Received Date",
      field: "recddate",
      sorting: true,
      cellStyle: { minWidth: "20px", maxWidth: "34px" },
      filterComponent: DateFilterField,
      // filterComponent:TextFilterField,
      width: "6.88%",
    },
    {
      title: "Fiscal Month",
      field: "monthyear",
      sorting: true,
      filterComponent: TextFilterField,
      width: "6.88%",
    },
    {
      title: "Fiscal Year",
      field: "fy",
      sorting: true,
      filterComponent: TextFilterField,
      width: "6.88%",
    },

    {
      title: "Amount",
      field: "amount",
      sorting: true,
      filterComponent: NumberFilterField,
      width: "6.88%",
    },
    {
      title: "Entity",
      field: "entityname",
      sorting: true,
      filterComponent: TextFilterField,
      width: "6.88%",
    },
    {
      title: "Mode",
      field: "mode_of_payment",
      sorting: true,
      filterComponent: TextFilterField,
      width: "6.88%",
    },
    {
      title: "Client ID",
      field: "clientid",
      sorting: true,
      filterComponent: NumberFilterField,
      width: "5.88%",
    },
    {
      title: "Client Name",
      field: "clientname",
      sorting: true,
      filterComponent: TextFilterField,
      width: "5.88%",
    },
    {
      title: "Vendor Name",
      field: "vendorname",
      sorting: false,
      // filterComponent: TextFilterField,
      width: "5.88%",
    },
    {
      title: "Order Id",
      field: "orderid",
      sorting: true,
      type: "numeric",
      filterComponent: NumberFilterField,
      width: "5.88%",
    },
    {
      title: "Order Description",
      field: "orderdescription",
      sorting: true,
      type: "numeric",
      filterComponent: NumberFilterField,
      width: "5.88%",
    },
    {
      title: "Service Id",
      field: "serviceid",
      type: "numeric",
      sorting: true,
      filterComponent: NumberFilterField,
      width: "5.88%",
    },
    {
      title: "Service ",
      field: "service",
      sorting: true,
      type: "numeric",
      filterComponent: TextFilterField,
      width: "5.88%",
    },
    {
      title: "LOB Name",
      field: "lobname",
      sorting: true,
      type: "numeric",
      filterComponent: TextFilterField,
      width: "5.88%",
    },
  ];
  return columns;
}
