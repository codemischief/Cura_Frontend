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
      title: "Client Name",
      field: "clientname",
      sorting: true,
      filterComponent: TextFilterField,
      cellStyle: {
        ...cellStyleCommon,
        justifyContent: "center",
        minWidth: "12rem",
        maxWidth: "20.813rem",

      },
    },
    {
      title: "Property Description",
      field: "propertydescription",
      sorting: true,
      filterComponent: TextFilterField,
      cellStyle: {
        ...cellStyleCommon,
        justifyContent: "center",
        minWidth: "20rem",
        maxWidth: "20.813rem",

      },
    },
    {
      title: "Property Type",
      field: "propertytype",
      sorting: true,
      filterComponent: NumberFilterField,
      cellStyle: {
        ...cellStyleCommon,
        justifyContent: "center",
        minWidth: "8rem",
        maxWidth: "20rem",
      },
    },
    {
      title: "Level of furnishing",
      field: "level_of_furnishing",
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