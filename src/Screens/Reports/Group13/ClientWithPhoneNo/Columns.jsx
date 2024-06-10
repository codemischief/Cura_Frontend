import { Stack } from "@mui/material";
import styleConst from "./styleConst";
import {
  NumberFilterField,
  TextFilterField,
} from "./CustomFilterField";

export default function connectionDataColumn(onQuery) {
  const { cellStyleCommon } = styleConst;
  const columns = [
    {
      title: "Sr No",
      cellStyle: {
        ...cellStyleCommon,
        justifyContent: "center",
        minWidth: "4rem",
        maxWidth: "5rem"
      },
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
      title: "Name",
      field: "clientname",
      sorting: true,
      filterComponent: TextFilterField,
      cellStyle: {
        ...cellStyleCommon,
        justifyContent: "center",
        minWidth: "8rem",
        maxWidth: "20.813rem",

      },
    },
    {
      title: "Phone Number",
      field: "homephone",
      sorting: true,
      filterComponent: TextFilterField,
      cellStyle: {
        ...cellStyleCommon,
        justifyContent: "center",
        minWidth: "8rem",
        maxWidth: "20rem",
      },
    },
    {
      title: "Phone Number 1",
      field: "workphone",
      sorting: true,
      filterComponent: TextFilterField,
      cellStyle: {
        ...cellStyleCommon,
        justifyContent: "center",
        minWidth: "8rem",
        maxWidth: "30rem",
      },
    },
    {
      title: "Phone Number 2",
      field: "mobilephone",
      sorting: true,
      filterComponent: TextFilterField,
      cellStyle: {
        ...cellStyleCommon,
        justifyContent: "center",
        minWidth: "8rem",
        maxWidth: "30rem",
      },
    },
    {
      title: "Client Type",
      field: "clienttypename",
      sorting: true,
      filterComponent: TextFilterField,
      cellStyle: {
        ...cellStyleCommon,
        justifyContent: "center",
        minWidth: "8rem",
        maxWidth: "20rem",
      },
    }
  ];
  return columns;
}
