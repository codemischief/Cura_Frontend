import { Stack } from "@mui/material";

import styleConst from "./styleConst";
import {
  NumberFilterField,
  TextFilterField,
} from "./CustomFilterField";

export default function connectionDataColumn() {
  const { cellStyleCommon } = styleConst;

  const columns = [
    {
      title: "Sr No",
      cellStyle: { ...cellStyleCommon,justifyContent: "center",width: "5%"},
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
      filterComponent: TextFilterField,
      title: "Service",
      field: "service",
      sorting: true,
      cellStyle: { ...cellStyleCommon,justifyContent: "center",width:"19%" },
    },
    {
      filterComponent: TextFilterField,
      title: "Client Name",
      field: "clientname",
      sorting: true,
      cellStyle: { ...cellStyleCommon,justifyContent: "center",width:"19%" },
    },
    {
      title: "Property Description",
      field: "propertydescription",
      sorting: true,
      filterComponent: TextFilterField,
      cellStyle: { ...cellStyleCommon,justifyContent: "center",width:"19%" },
    },
    {
      title: "Brief Description",
      field: "briefdescription",
      sorting: true,
      filterComponent: TextFilterField,
      cellStyle: { ...cellStyleCommon,justifyContent: "center",width:"19%" },
    },
    {
      title: "Aging",
      field: "agingdays",
      sorting: true,
      filterComponent: NumberFilterField,
      cellStyle: { ...cellStyleCommon,justifyContent: "center",width:"19%" },
    },
   
  ];
  return columns;
}
