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
        minWidth: "5rem",
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
      field: "name",
      sorting: true,
      filterComponent: TextFilterField,
      cellStyle: {
        ...cellStyleCommon,
        justifyContent: "center",
        minWidth: "6rem",
        maxWidth: "30.813rem",

      },
    },
    {
      title: "Phone Number",
      field: "phoneno",
      sorting: true,
      filterComponent: NumberFilterField,
      cellStyle: {
        ...cellStyleCommon,
        justifyContent: "center",
        minWidth: "6rem",
        maxWidth: "15rem",
      },
    },
    {
      title: "Phone Number 1",
      field: "phoneno1",
      sorting: true,
      filterComponent: NumberFilterField,
      cellStyle: {
        ...cellStyleCommon,
        justifyContent: "center",
        minWidth: "15rem",
        maxWidth: "20rem",
      },
    },
    {
      title: "Phone Number 2",
      field: "phoneno2",
      sorting: true,
      filterComponent: NumberFilterField,
      cellStyle: {
        ...cellStyleCommon,
        justifyContent: "center",
        minWidth: "6rem",
        maxWidth: "20rem",
      },
    },
   
  ];
  return columns;
}
