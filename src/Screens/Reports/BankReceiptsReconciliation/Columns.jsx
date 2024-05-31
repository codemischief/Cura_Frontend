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
      cellStyle: { ...cellStyleCommon,justifyContent: "center",width: "4%" },
      sorting: false,
      render: (index) => {
        return (
          <Stack
            direction="row"
            sx={{ justifyContent: "center", minWidth: "50px" }}
          >
            {index + 1}
          </Stack>
        );
      },
    },
    {
      title: "Date",
      field: "date",
      sorting: true,
      // cellStyle: { minWidth: "20px", },
      filterComponent: DateFilterField,
      cellStyle: { ...cellStyleCommon,justifyContent: "center",width: "24%"  },
    },
    {
      title: "BankSt(CR)",
      field: "bankst_cr",
      sorting: true,
      filterComponent: NumberFilterField,
      cellStyle: { ...cellStyleCommon,justifyContent: "center",width: "24%" },
    },
    {
      title: "Client Rec",
      field: "client_receipt",
      sorting: true,
      filterComponent: NumberFilterField,
      cellStyle: { ...cellStyleCommon,justifyContent: "center",width: "24%" },
    },
    {
      title: "Order Rec",
      field: "order_receipt",
      sorting: true,
      filterComponent: NumberFilterField,
      cellStyle: { ...cellStyleCommon,justifyContent: "center",width: "24%" },
    },
  ];
  return columns;
}
