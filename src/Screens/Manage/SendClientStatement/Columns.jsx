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
      title: " Date",
      field: "recddate",
      sorting: true,
      cellStyle: { minWidth: "20px", maxWidth: "34px" },
      filterComponent: DateFilterField,
      // filterComponent:TextFilterField,
      cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "150px" },
    },
    {
      title: "Type",
      field: "monthyear",
      sorting: true,
      filterComponent: TextFilterField,
      cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "150px" },
    },
    {
      title: "Desciption",
      field: "fy",
      sorting: true,
      filterComponent: TextFilterField,
      cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "150px" },
    },
    {
      title: "Property",
      field: "entityname",
      sorting: true,
      filterComponent: TextFilterField,
      cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "150px" },
    },
    {
      title: "Amount",
      field: "amount",
      sorting: true,
      filterComponent: NumberFilterField,
      cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "150px" },
    },
  ];
  return columns;
}
