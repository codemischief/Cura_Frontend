import { CircularProgress, Stack } from "@mui/material";

import styleConst from "./styleConst";

import {
  DateFilterField,
  NumberFilterField,
  TextFilterField
} from "./CustomFilerField"
import { Create, Delete } from "@mui/icons-material";
import DeleteButton from "../../../Components/common/buttons/deleteButton";
import EditButton from "../../../Components/common/buttons/EditButton";
export default function getColumns(
  handleEdit,
  handleDelete,
  isPending,
  showAction
) {
  const { cellStyleCommon } = styleConst;
  // const {}
  

  const columns = [
    {
      id: 1,
      title: "Sr No",
      cellStyle: {
        ...cellStyleCommon,
        justifyContent: "center",
        width: "5%",
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
      title: "Group Type ",
      field: "groupname",
      sorting: true,
      align: "left",
      filterDisabled: false,
      cellStyle: {
        ...cellStyleCommon,
        justifyContent: "center",
        width: "15%",
      },
    },
    {
      id: 3,
      filterComponent: TextFilterField,
      title: "Name",
      field: "name",
      align: "left",
      filterDisabled: false,
      sorting: true,
      cellStyle: {
        ...cellStyleCommon,
        justifyContent: "center",
        width : "15%"
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
        width: "15%",
      },
    },
    {
      id: 5,
      title: "Phone Number",
      field: "phoneno",
      sorting: true,
      align: "left",
      filterComponent: TextFilterField,

      cellStyle: {
        ...cellStyleCommon,
        justifyContent: "center",
        width: "15%",
      },
    },
    {
      id: 6,
      title: "Email ID",
      field: "emailid",
      sorting: true,
      align: "left",
      cellStyle: {
        ...cellStyleCommon,
        justifyContent: "center",
        width: "15%",
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
        width: "15%",
      },
      type: "numeric",
      filterComponent: NumberFilterField,
    },
  ];

  if (showAction.add || showAction.edit) {
    columns.push({
      id: 8,
      title: "Edit",
      field: "action",
      sorting: false,
      align: "center",
      cellStyle: {
        ...cellStyleCommon,
        justifyContent: "center",
        width: "5%",
      },
      render: (rowData) => {
        return (
          <div className="flex gap-2 justify-center">
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
    });
  }
  return columns;
}
