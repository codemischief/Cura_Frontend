import { Stack } from "@mui/material";

import styleConst from "./styleConst";
import {
  NumberFilterField,
  TextFilterField,
} from "./CustomFilterField";

export default function connectionDataColumn() {
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
      filterComponent: TextFilterField,
      title: "Service",
      field: "service",
      sorting: true,
      cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "8rem",maxWidth:"11rem" },
    },
    {
      filterComponent: TextFilterField,
      title: "Client Name",
      field: "clientname",
      sorting: true,
      cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "8rem",maxWidth:"11rem" },
    },
    {
      title: "Order ID",
      field: "orderid",
      sorting: true,
      filterComponent:NumberFilterField,
      cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "8rem",maxWidth:"9rem" },
    },
    {
      title: "Order Description",
      field: "orderdescription",
      sorting: true,
      filterComponent: TextFilterField,
      cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "8rem",maxWidth:"17rem" },
    },
    {
      title: "Order Status",
      field: "orderstatus",
      sorting: true,
      filterComponent: TextFilterField,
      cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "8rem",maxWidth:"9rem" },
    },

    {
      title: "OR Amount",
      field: "totalorderreceipt",
      sorting: true,
      filterComponent: NumberFilterField,
      cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "8rem",maxWidth:"9rem" },
    },
    {
      title: "OP Amount",
      field: "totalorderpayment",
      sorting: true,
      filterComponent: NumberFilterField,
      cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "8rem",maxWidth:"9rem" },
    },
    {
      title: "OI Amount",
      field: "totalinvoiceamt",
      sorting: true,
      filterComponent: NumberFilterField,
      cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "8rem",maxWidth:"9rem" },
    }
   
  ];
  return columns;
}
