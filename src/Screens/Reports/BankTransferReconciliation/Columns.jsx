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
            sx={{ justifyContent: "center", width: "50px" }}
          >
            {index + 1}
          </Stack>
        );
      },
    },
    {
      title: "Type",
      field: "type",
      sorting: true,
      filterComponent: TextFilterField,
      cellStyle: { ...cellStyleCommon, justifyContent: "center", width: "19%" },
    },
    {
      title: "Order Description",
      field: "orderdescription",
      sorting: true,
      // cellStyle: { width: "20px", },
      filterComponent: TextFilterField,
      cellStyle: { ...cellStyleCommon, justifyContent: "center", width: "19%" },
    },
    {
      title: "Date",
      field: "date",
      sorting: true,
      // cellStyle: { width: "20px", },
      filterComponent: TextFilterField,
      cellStyle: { ...cellStyleCommon, justifyContent: "center", width: "19%" },
    },
    {
      title: "Mode",
      field: "mode",
      sorting: true,
      // cellStyle: { width: "20px", },
      filterComponent: TextFilterField,
      cellStyle: { ...cellStyleCommon, justifyContent: "center", width: "19%" },
    },
    {
      title: "Amount",
      field: "amount",
      sorting: true,
      // cellStyle: { width: "20px", },
      filterComponent: NumberFilterField,
      cellStyle: { ...cellStyleCommon, justifyContent: "center", width: "19%" },
    },
  ];
  return columns;
}
