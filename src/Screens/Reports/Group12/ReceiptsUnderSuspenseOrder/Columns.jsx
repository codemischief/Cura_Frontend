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
      cellStyle: {
        ...cellStyleCommon,
        justifyContent: "center",
        minWidth: "5rem",
      },
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
      title: "Client Name",
      field: "clientname",
      sorting: true,
      filterComponent: TextFilterField,
      cellStyle: {
        ...cellStyleCommon,
        justifyContent: "center",
        minWidth: "12rem",
        maxWidth: "20.813rem",

      },
    },
    {
      title: "Order Description",
      field: "orderdesc",
      sorting: true,
      filterComponent: TextFilterField,
      cellStyle: {
        ...cellStyleCommon,
        justifyContent: "center",
        minWidth: "20.813rem",
        maxWidth: "25.813rem",

      },
    },
    {
      title: "Date",
      field: "recddate",
      sorting: true,
      filterComponent: DateFilterField,
      cellStyle: {
        ...cellStyleCommon,
        justifyContent: "center",
        minWidth: "8rem",
        maxWidth: "20rem",
      },
    },
    {
      title: "Mode of Payment",
      field: "paymentmode",
      sorting: true,
      filterComponent: TextFilterField,
      cellStyle: {
        ...cellStyleCommon,
        justifyContent: "center",
        minWidth: "8rem",
        maxWidth: "15rem",
      },
    },
    {
      title: "Payment By",
      field: "paymentby",
      sorting: true,
      filterComponent: TextFilterField,
      cellStyle: {
        ...cellStyleCommon,
        justifyContent: "center",
        minWidth: "6rem",
        maxWidth: "20rem",
      },
    },
    {
      title: "Amount",
      field: "amount",
      sorting: true,
      filterComponent: NumberFilterField,
      cellStyle: {
        ...cellStyleCommon,
        justifyContent: "center",
        minWidth: "6rem",
        maxWidth: "15rem",
      },
    },
    {
      title: "Payment Description",
      field: "receiptdescription",
      sorting: true,
      filterComponent: TextFilterField,
      cellStyle: {
        ...cellStyleCommon,
        justifyContent: "center",
        minWidth: "14.813rem",
        maxWidth: "20.813rem",

      },
    },
  ];
  return columns;
}
