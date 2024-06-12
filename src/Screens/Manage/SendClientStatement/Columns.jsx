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
      cellStyle: { ...cellStyleCommon,justifyContent: "center",width: "5%" },
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
      field: "date",
      sorting: true,
      filterComponent: DateFilterField,
      // filterComponent:TextFilterField,
      cellStyle: { ...cellStyleCommon,justifyContent: "center", width: "19%"},
    },
    {
      title: "Type",
      field: "type",
      sorting: true,
      filterComponent: TextFilterField,
      cellStyle: { ...cellStyleCommon,justifyContent: "center", width: "19%" },
    },
    {
      title: "Desciption",
      field: "description",
      sorting: true,
      filterComponent: TextFilterField,
      cellStyle: { ...cellStyleCommon,justifyContent: "center", width: "19%" },
    },
    {
      title: "Property",
      field: "entityname",
      sorting: true,
      filterComponent: TextFilterField,
      cellStyle: { ...cellStyleCommon,justifyContent: "center", width: "19%" },
    },
    {
      title: "Amount",
      field: "amount",
      sorting: true,
      filterComponent: NumberFilterField,
      cellStyle: { ...cellStyleCommon,justifyContent: "center", width: "19%" },
    },
  ];
  return columns;
}
