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
      cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "50px" },
      sorting: false,
      render: (index) => {
        return (
          <Stack
            direction="row"
            sx={{ justifyContent: "center", width: "50px" }}
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
      cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "150px" },
    },
    {
      filterComponent: NumberFilterField,
      cellStyle: { minWidth: "20px", maxWidth: "34px" },
      title: "ID",
      field: "id",
      filterDisabled: false,
      sorting: true,
      cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "150px" },
    },
    {
      title: "Received Date",
      field: "recddate",
      sorting: true,
      cellStyle: { minWidth: "20px", maxWidth: "34px" },
      filterComponent: DateFilterField,
      // filterComponent:TextFilterField,
      cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "150px" },
    },
    {
      title: "Fiscal Month",
      field: "monthyear",
      sorting: true,
      filterComponent: TextFilterField,
      cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "150px" },
    },
    {
      title: "Fiscal Year",
      field: "fy",
      sorting: true,
      filterComponent: TextFilterField,
      cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "150px" },
    },

    {
      title: "Amount",
      field: "amount",
      sorting: true,
      filterComponent: NumberFilterField,
      cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "150px" },
    },
    {
      title: "Entity",
      field: "entityname",
      sorting: true,
      filterComponent: TextFilterField,
      cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "150px" },
    },
    {
      title: "Mode",
      field: "paymentmode",
      sorting: true,
      filterComponent: TextFilterField,
      cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "150px" },
    },
    {
      title: "Client ID",
      field: "clientid",
      sorting: true,
      filterComponent: NumberFilterField,
      cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "150px" },
    },
    {
      title: "Client Name",
      field: "clientname",
      sorting: true,
      filterComponent: TextFilterField,
      cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "150px" },
    },
    {
      title: "Vendor Name",
      field: "vendorname",
      sorting: false,
      // filterComponent: TextFilterField,
      cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "150px" },
    },
    {
      title: "Order Id",
      field: "orderid",
      sorting: true,
      type: "numeric",
      filterComponent: NumberFilterField,
      cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "150px" },
    },
    {
      title: "Order Description",
      field: "orderdescription",
      sorting: true,
      type: "numeric",
      filterComponent: TextFilterField,
      cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "150px" },
    },
    {
      title: "Service Id",
      field: "serviceid",
      type: "numeric",
      sorting: true,
      filterComponent: NumberFilterField,
      cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "150px" },
    },
    {
      title: "Service ",
      field: "service",
      sorting: true,
      type: "numeric",
      filterComponent: TextFilterField,
      cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "150px" },
    },
    {
      title: "LOB Name",
      field: "lobname",
      sorting: true,
      type: "numeric",
      filterComponent: TextFilterField,
      cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "150px" },
    },
  ];
  return columns;
}
