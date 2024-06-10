import { Stack } from "@mui/material";
import styleConst from "./styleConst";


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
            1
          </Stack>
        );
      },
    },
    {
      title: "Bank Name",
      field: "bankname",
      cellStyle: { ...cellStyleCommon, justifyContent: "center", width: "19%" },
    },
    {
      title: "Balance",
      field: "balance",
      cellStyle: { ...cellStyleCommon, justifyContent: "center", width: "19%" },
    },
    {
      title: "Payment",
      field: "payment",
      cellStyle: { ...cellStyleCommon, justifyContent: "center", width: "19%" },
    },
    {
      title: "Receipt",
      field: "receipt",
      sorting: true,
      cellStyle: { ...cellStyleCommon, justifyContent: "center", width: "19%" },
    }
  ];
  return columns;
}
