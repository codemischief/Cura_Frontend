import { Stack } from "@mui/material";
import {
  NumberFilterField,
  TextFilterField
} from "./CustomFilterField";
import styleConst from "./styleConst";

export default function connectionDataColumn(onQuery) {
  const { cellStyleCommon } = styleConst;
  const columns = [
    {
      title: "Sr No",
      cellStyle: { ...cellStyleCommon, justifyContent: "center", width: "10%" },
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
      title: "Client Name",
      field: "clientname",
      sorting: true,
      filterComponent: TextFilterField,
      cellStyle: { ...cellStyleCommon, justifyContent: "center", width: "30%" },
    },
    {
      title: "Payments",
      field: "payments",
      sorting: true,
      // cellStyle: { minWidth: "20px", },
      filterComponent: NumberFilterField,
      cellStyle: { ...cellStyleCommon, justifyContent: "center", width: "30%" },
    },
    {
      title: "Receipts",
      field: "receipts",
      sorting: true,
      // cellStyle: { minWidth: "20px", },
      filterComponent: NumberFilterField,
      cellStyle: { ...cellStyleCommon, justifyContent: "center", width: "30%" },
    },

  ];
  return columns;
}
