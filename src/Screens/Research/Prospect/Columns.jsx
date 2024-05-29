import { Stack } from "@mui/material";

import styleConst from "./styleConst";
import {
  DateFilterField,
  NumberFilterField,
  TextFilterField,
} from "./CustomFilterField";
import { Create, Delete } from "@mui/icons-material";

export default function connectionDataColumn(handleEdit, handleDelete) {
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
      field:"srNo",

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
      render: (rowData) => {
        return (
          <div className="flex gap-2 justify-center">
            <Create
              sx={{ width: "20px", height: "20px" }}
              onClick={() => handleEdit(rowData)}
            />
            <Delete
              sx={{ width: "20px", height: "20px" }}
              onClick={() => handleDelete(rowData)}
            />
          </div>
        );
      },
    },
  ];
  return columns;
}
