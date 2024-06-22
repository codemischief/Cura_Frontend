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
      title: "Sr",
      cellStyle: {
        ...cellStyleCommon,
        justifyContent: "center",
        minWidth: "2.25rem",
      },
      align: "left",
      sorting: false,
      render: (index) => {
        return (
          <Stack
            direction="row"
            sx={{ justifyContent: "start", minWidth: "100%" }}
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
      sorting: false,
      filterDisabled: false,
      cellStyle: {
        ...cellStyleCommon,
        justifyContent: "center",
        minWidth: "2.75rem",
      },
    },
    {
      filterComponent: NumberFilterField,
      // cellStyle: { minWidth: "20px", maxWidth: "34px" },
      title: "ID",
      field: "id",
      filterDisabled: false,
      sorting: true,
      cellStyle: {
        ...cellStyleCommon,
        justifyContent: "center",
        minWidth: "100px",
        maxWidth: "150px",
      },
    },
    {
      filterComponent: DateFilterField,

      title: "Payment Date",
      field: "paymentdate",
      filterDisabled: false,
      sorting: true,
      cellStyle: {
        ...cellStyleCommon,
        justifyContent: "center",
        minWidth: "6.25rem",
        maxWidth: "10.2rem",
      },
    },
    {
      title: "Fiscal Month",
      field: "monthyear",
      filterDisabled: false,
      sorting: true,
      filterComponent: DateFilterField,

      cellStyle: {
        ...cellStyleCommon,
        justifyContent: "center",
        minWidth: "6.25rem",
        maxWidth: "10.2rem",
      },
    },
    {
      title: "Fiscal Year",
      field: "fy",
      sorting: true,
      filterDisabled: false,
      type: "numeric",
      cellStyle: {
        ...cellStyleCommon,
        justifyContent: "center",
        minWidth: "6rem",
        maxWidth: "8rem",
      },
      filterComponent: TextFilterField,
    },
    {
      title: "Amount",
      field: "amount",
      type: "numeric",
      sorting: false,
      cellStyle: {
        ...cellStyleCommon,
        justifyContent: "center",
        minWidth: "5rem",
        maxWidth: "8rem",
      },

      filterComponent: NumberFilterField,
    },

    {
      title: "Entity",
      field: "entityname",
      type: "numeric",
      sorting: true,
      cellStyle: {
        ...cellStyleCommon,
        justifyContent: "center",
        minWidth: "5rem",
        maxWidth: "8rem",
      },
      filterComponent: TextFilterField,
    },
    {
      title: "Mode",
      field: "mode_of_payment",
      type: "numeric",
      sorting: true,
      cellStyle: {
        ...cellStyleCommon,
        justifyContent: "center",
        minWidth: "5rem",
        maxWidth: "8rem",
      },
      filterComponent: TextFilterField,
    },
    {
      title: "Client ID",
      field: "clientid",
      type: "numeric",
      sorting: true,
      cellStyle: {
        ...cellStyleCommon,
        justifyContent: "center",
        minWidth: "5rem",
        maxWidth: "8rem",
      },
      filterComponent: NumberFilterField,
    },
    {
      title: "Client Name",
      field: "clientname",
      sorting: true,
      cellStyle: {
        ...cellStyleCommon,
        justifyContent: "center",
        minWidth: "5rem",
        maxWidth: "9rem",
      },
      type: "numeric",
      filterComponent: TextFilterField,
    },
    {
      title: "Vendor Name",
      field: "vendorname",
      sorting: true,
      cellStyle: {
        ...cellStyleCommon,
        justifyContent: "center",
        minWidth: "5rem",
        maxWidth: "9rem",
      },
      filterComponent: TextFilterField,
    },
    {
      title: "Order ID",
      field: "orderid",
      sorting: true,
      cellStyle: {
        ...cellStyleCommon,
        justifyContent: "center",
        minWidth: "5rem",
        maxWidth: "9rem",
      },
      filterComponent: NumberFilterField,
    },
    {
      title: "Order Description",
      field: "orderdescription",
      sorting: true,
      cellStyle: {
        ...cellStyleCommon,
        justifyContent: "center",
        minWidth: "5rem",
        maxWidth: "9rem",
      },
      filterComponent: TextFilterField,
    },
    {
      title: "Service ID",
      field: "serviceid",
      type: "numeric",
      sorting: true,
      cellStyle: {
        ...cellStyleCommon,
        justifyContent: "center",
        minWidth: "5rem",
      },
      filterComponent: NumberFilterField,
    },
    {
      title: "Service ",
      field: "service",
      sorting: true,
      type: "numeric",
      cellStyle: {
        ...cellStyleCommon,
        justifyContent: "center",
        maxWidth: "9rem",
      },

      filterComponent: TextFilterField,
    },
    {
      title: "LOB Name",
      field: "lobname",
      sorting: true,
      cellStyle: {
        ...cellStyleCommon,
        justifyContent: "center",
        minWidth: "5rem",
        maxWidth: "9rem",
      },
      type: "numeric",
      filterComponent: TextFilterField,
    },
  ];
  return columns;
}
