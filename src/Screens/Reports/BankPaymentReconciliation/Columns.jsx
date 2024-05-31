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
      cellStyle: { ...cellStyleCommon, justifyContent: "center", width: "5%" },
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
      cellStyle: { ...cellStyleCommon, justifyContent: "center", width: "19%" },
    },
    {
      title: "BankSt(DR)",
      field: "bankst_dr",
      sorting: true,
      filterComponent: NumberFilterField,
      cellStyle: { ...cellStyleCommon, justifyContent: "center", width: "19%" },
    },
    {
      title: "Count+Order Pay",
      field: "contorderpayments",
      sorting: true,
      filterComponent: NumberFilterField,
      cellStyle: { ...cellStyleCommon, justifyContent: "center", width: "19%" },
    },
    {
      title: "Order Pay",
      field: "order_payments",
      sorting: true,
      filterComponent: NumberFilterField,
      cellStyle: { ...cellStyleCommon, justifyContent: "center", width: "19%" },
    },
    {
      title: "Cont Pay",
      field: "contractual_payments",
      sorting: true,
      filterComponent: NumberFilterField,
      cellStyle: { ...cellStyleCommon, justifyContent: "center", width: "19%" },
    },
  ];
  return columns;
}
