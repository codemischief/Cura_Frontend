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
      cellStyle: { ...cellStyleCommon,justifyContent: "center",width: "10%" },
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
        title: "Client ID",
        field: "clientid",
        sorting: true,
        filterComponent: NumberFilterField,
        cellStyle: { ...cellStyleCommon,justifyContent: "center",width: "10%" },
    },
    {
      title: "Client Name",
      field: "fullname",
      sorting: true,
      // cellStyle: { minWidth: "20px", },
      filterComponent: TextFilterField,
      cellStyle: { ...cellStyleCommon,justifyContent: "center",width: "20%"  },
    },
    {
        title: "Email 1",
        field: "email1",
        sorting: true,
        // cellStyle: { minWidth: "20px", },
        filterComponent: TextFilterField,
        cellStyle: { ...cellStyleCommon,justifyContent: "center",width: "20%"  },
      },
      {
        title: "Email 2",
        field: "email2",
        sorting: true,
        // cellStyle: { minWidth: "20px", },
        filterComponent: TextFilterField,
        cellStyle: { ...cellStyleCommon,justifyContent: "center",width: "20%"  },
      },
      {
        title: "Client Portal Online Mail IDs",
        field: "email",
        sorting: true,
        // cellStyle: { minWidth: "20px", },
        filterComponent: TextFilterField,
        cellStyle: { ...cellStyleCommon,justifyContent: "center",width: "30%"  },
      },
      
  ];
  return columns;
}
