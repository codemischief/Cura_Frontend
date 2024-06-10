import { CircularProgress, Stack } from "@mui/material";

import styleConst from "./styleConst";
import {
  DateFilterField,
  NumberFilterField,
  TextFilterField,
} from "./CustomFilterField";
import { Create, Delete } from "@mui/icons-material";
import DeleteButton from "../../../Components/common/buttons/deleteButton";
import EditButton from "../../../Components/common/buttons/EditButton";
export default function getColumns(handleEdit, handleDelete, isPending) {
  const { cellStyleCommon } = styleConst;
  // const {}

  const columns = [
    {
      id: 1,
      title: "Sr No",
      cellStyle: {
        ...cellStyleCommon,
        justifyContent: "center",
        minWidth: "50px",
      },
      align: "center",
      sorting: false,
      field: "srNo",

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
      id: 2,
      filterComponent: TextFilterField,
      title: "Person Name",
      field: "personname",
      sorting: true,
      align: "left",
      filterDisabled: false,
      cellStyle: {
        ...cellStyleCommon,
        justifyContent: "center",
        width: "300px",
      },
    },
    {
      id: 3,
      filterComponent: TextFilterField,
      title: "Suburb",
      field: "suburb",
      align: "left",
      filterDisabled: false,
      sorting: true,
      cellStyle: {
        ...cellStyleCommon,
        justifyContent: "center",
        minWidth: "50px",
        maxWidth: "13.563",
      },
    },
    {
      id: 4,
      filterComponent: TextFilterField,

      title: "City",
      field: "city",
      align: "left",
      filterDisabled: false,
      sorting: true,
      cellStyle: {
        ...cellStyleCommon,
        justifyContent: "center",
        minWidth: "50px",
      },
    },
    {
      id: 5,
      title: "Property Location",
      field: "propertylocation",
      sorting: true,
      align: "left",
      filterComponent: TextFilterField,

      cellStyle: {
        ...cellStyleCommon,
        justifyContent: "center",
        minWidth: "300px",
      },
    },
    {
      id: 6,
      title: "Possible services",
      field: "possibleservices",
      sorting: true,
      align: "left",
      cellStyle: {
        ...cellStyleCommon,
        justifyContent: "center",
        minWidth: "300px",
      },

      filterComponent: TextFilterField,
    },

    {
      id: 7,
      title: "ID",
      field: "id",
      sorting: true,
      align: "left",
      cellStyle: {
        ...cellStyleCommon,
        justifyContent: "center",
        minWidth: "50px",
      },
      type: "numeric",
      filterComponent: NumberFilterField,
    },
    {
      id: 8,
      title: "Edit",
      field: "action",
      sorting: false,
      align: "center",
      cellStyle: {
        ...cellStyleCommon,
        justifyContent: "center",
        minWidth: "70px",
      },
      render: (rowData) => {
        return (
          <div className="flex gap-2 justify-start">
            {isPending === rowData.id ? (
              <button>
                <CircularProgress sx={{ color: "blue" }} size={20} />{" "}
                <p className="text-[8px]">loading</p>
              </button>
            ) : (
              <EditButton handleEdit={handleEdit} rowData={rowData} />
            )}
            <DeleteButton handleDelete={handleDelete} rowData={rowData} />
          </div>
        );
      },
    },
  ];
  return columns;
}
