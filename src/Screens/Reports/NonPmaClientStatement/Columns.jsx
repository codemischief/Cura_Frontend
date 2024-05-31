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
            sx={{ justifyContent: "center", minWidth: "50px" }}
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
      // cellStyle: { minWidth: "20px", },
      filterComponent: TextFilterField,
      cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "15%"  },
    },
    {
      title: "Date",
      field: "date",
      sorting: true,
      filterComponent: DateFilterField,
      cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "15%" },
    },
    {
      title: "Type",
      field: "type",
      sorting: true,
      filterComponent: TextFilterField,
      cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "15%" },
    },
    {
      title: "Order Description",
      field: "orderdetails",
      sorting: true,
      filterComponent: TextFilterField,
      cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "15%" },
    },
    {
      title: "Details",
      field: "details",
      sorting: true,
      filterComponent: TextFilterField,
      cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "15%" },
    },
    {
      title: "Amount",
      field: "amount",
      sorting: true,
      filterComponent: NumberFilterField,
      cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "15%" },
    },
  ];
  return columns;
}
