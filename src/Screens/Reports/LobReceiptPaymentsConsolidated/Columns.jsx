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
      title: "LOB Name",
      field: "lobname",
      sorting: true,
      cellStyle: { minWidth: "20px", maxWidth: "34px" },
      filterComponent: TextFilterField,
      cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "150px" },
    },
    {
      title: "Receipt Amount",
      field: "total_orderreceiptamount",
      sorting: true,
      filterComponent: NumberFilterField,
      cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "150px" },
    },
    {
      title: "Payment Amount",
      field: "total_paymentamount",
      sorting: true,
      filterComponent: NumberFilterField,
      cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "150px" },
    },
    {
      title: "Difference",
      field: "total_diff",
      sorting: true,
      filterComponent: NumberFilterField,
      cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "150px" },
    },
  ];
  return columns;
}
