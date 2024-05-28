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
        minWidth: "50px",
      },
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
      filterComponent: TextFilterField,
      title: "Person Name",
      field: "personname",
      sorting: false,
      filterDisabled: true,
      cellStyle: {
        ...cellStyleCommon,
        justifyContent: "center",
        minWidth: "300px",
      },
    },
    {
      filterComponent: NumberFilterField,
      title: "Suburb",
      field: "suburb",
      filterDisabled: false,
      sorting: true,
      cellStyle: {
        ...cellStyleCommon,
        justifyContent: "center",
        minWidth: "300px",
      },
    },
    {
      filterComponent: TextFilterField,

      title: "City",
      field: "city",
      filterDisabled: false,
      sorting: true,
      cellStyle: {
        ...cellStyleCommon,
        justifyContent: "center",
        minWidth: "300px",
      },
    },
    {
      title: "Property Location",
      field: "propertylocation",
      sorting: true,
      //   filterComponent: TextFilterField,

      cellStyle: {
        ...cellStyleCommon,
        justifyContent: "center",
        minWidth: "300px",
      },
    },
    {
      title: "possible services",
      field: "possibleservices",
      sorting: true,
      cellStyle: {
        ...cellStyleCommon,
        justifyContent: "center",
        minWidth: "200px",
      },

      filterComponent: NumberFilterField,
    },

    {
      title: "ID",
      field: "id",
      sorting: true,
      cellStyle: {
        ...cellStyleCommon,
        justifyContent: "center",
        minWidth: "150px",
      },
      type: "numeric",
      filterComponent: TextFilterField,
    },
    {
      title: "Action",
      field: "action",
      sorting: false,
      cellStyle: {
        ...cellStyleCommon,
        justifyContent: "center",
        minWidth: "150px",
      },
    },
  ];
  return columns;
}
