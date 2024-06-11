import { Stack } from "@mui/material";

import styleConst from "./styleConst";
import {
  DateFilterField,
  NumberFilterField,
  TextFilterField,
} from "./CustomFilterField";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

export default function connectionDataColumn() {
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
      // filterComponent: TextFilterField,
      title: "Service",
      field: "service",
      sorting: false,
      // filterDisabled: true,
      filterComponent: TextFilterField,
      cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "6rem",maxWidth: "9rem" },
    },
    {
      filterComponent: NumberFilterField,
      title: "Client Name",
      field: "clientname",
      // filterDisabled: false,
      filterComponent: TextFilterField,
      sorting: true,
      cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "6rem",maxWidth: "9rem" },
    },
    {
      title: "Proptery Description",
      field: "propertydescription",
      sorting: true,
      filterComponent: TextFilterField,
      cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "15rem",maxWidth: "9rem" },
    },
    {
      title: "Brief Description",
      field: "briefdescription",
      sorting: true,
      filterComponent: TextFilterField,
      cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "15rem",maxWidth: "9rem" },
    },
    {
      title: "Ageing",
      field: "agingdays",
      sorting: true,
      filterComponent: TextFilterField,
      cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "6rem",maxWidth: "14rem" },
    },
   
  ];
  return columns;
}
