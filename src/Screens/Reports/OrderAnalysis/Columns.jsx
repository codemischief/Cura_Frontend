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
      title: "Service",
      field: "service",
      sorting: false,
      filterDisabled: true,
      cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "150px" },
    },
    {
      filterComponent: NumberFilterField,
      cellStyle: { minWidth: "20px", maxWidth: "34px" },
      title: "Client Name",
      field: "clientname",
      filterDisabled: false,
      sorting: true,
      cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "150px" },
    },
    {
      title: "Order ID",
      field: "orderid",
      sorting: true,
      cellStyle: { minWidth: "20px", maxWidth: "34px" },
      filterComponent: DateFilterField,
      // filterComponent:TextFilterField,
      cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "150px" },
    },
    {
      title: "Order Description",
      field: "orderdescription",
      sorting: true,
      filterComponent: TextFilterField,
      cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "150px" },
    },
    {
      title: "Order Status",
      field: "orderstatus",
      sorting: true,
      filterComponent: TextFilterField,
      cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "150px" },
    },

    {
      title: "OR Amount",
      field: "totalorderreceipt",
      sorting: true,
      filterComponent: NumberFilterField,
      cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "150px" },
    },
    {
      title: "OP Amount",
      field: "totalorderpayment",
      sorting: true,
      filterComponent: TextFilterField,
      cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "150px" },
    },
    {
      title: "OI Amount",
      field: "totalinvoiceamt",
      sorting: true,
      filterComponent: TextFilterField,
      cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "150px" },
    }
   
  ];
  return columns;
}
