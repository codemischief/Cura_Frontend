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
      cellStyle: { ...cellStyleCommon, justifyContent: "center", width: "4%" },
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
      title: "Bank Name",
      field: "name",
      sorting: true,
      filterComponent: TextFilterField,
      cellStyle: { ...cellStyleCommon, justifyContent: "center", width: "16%" },
    },
    {
      title: "Month Year",
      field: "monthyear",
      sorting: true,
      // cellStyle: { width: "20px", },
      filterComponent: TextFilterField,
      cellStyle: { ...cellStyleCommon, justifyContent: "center", width: "16%" },
    },
    {
      title: "Order Payments",
      field: "payments",
      sorting: true,
      // cellStyle: { width: "20px", },
      filterComponent: NumberFilterField,
      cellStyle: { ...cellStyleCommon, justifyContent: "center", width: "16%" },
    },
    {
      title: "Payments(DR)",
      field: "bankpayments",
      sorting: true,
      // cellStyle: { width: "20px", },
      filterComponent: NumberFilterField,
      cellStyle: { ...cellStyleCommon, justifyContent: "center", width: "16%" },
    },
    {
      title: "Order Receipt",
      field: "bankreceipts",
      sorting: true,
      // cellStyle: { width: "20px", },
      filterComponent: NumberFilterField,
      cellStyle: { ...cellStyleCommon, justifyContent: "center", width: "16%" },
    },
    {
      title: "Receipts(CR)",
      field: "receipts",
      sorting: true,
      // cellStyle: { width: "20px", },
      filterComponent: NumberFilterField,
      cellStyle: { ...cellStyleCommon, justifyContent: "center", width: "16%" },
    },
  ];
  return columns;
}
