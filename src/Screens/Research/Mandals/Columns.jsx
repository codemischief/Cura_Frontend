import { Stack } from "@mui/material";

import styleConst from "./styleConst";
// import {
//   DateFilterField,
//   NumberFilterField,
//   TextFilterField,
// } from "./CustomFilterField";
import {
    DateFilterField,
  NumberFilterField,
  TextFilterField
} from "./CustomFilerField"
import { Create, Delete } from "@mui/icons-material";
import EditButton from "../../../Components/common/buttons/EditButton";
import DeleteButton from "../../../Components/common/buttons/deleteButton";

export default function connectionDataColumn(handleEdit, handleDelete) {
  const { cellStyleCommon } = styleConst;

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
      title: "Mandal Type",
      field: "typename",
      sorting: true,
    //   width : '1000px',
      align: "left",
      filterDisabled: false,
      cellStyle: {
        ...cellStyleCommon,
        justifyContent: "center",
        width : '15%'
      },
    },
    {
      id: 3,
      filterComponent: TextFilterField,
      title: "Name",
      field: "name",
      align: "left",
    //   width : '20%',
      filterDisabled: false,
      sorting: true,
      cellStyle: {
        ...cellStyleCommon,
        justifyContent: "center",
        width : '15%'
        
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
        // maxWidth: "18.25rem",
        width : '15%'
      },
    },
    {
      id: 5,
      title: "Email ID",
      field: "emailid",
      sorting: true,
      align: "left",
      filterComponent: TextFilterField,

      cellStyle: {
        ...cellStyleCommon,
        justifyContent: "center",
        // maxWidth: "18.25rem",
        width : '15%'
      },
    },
    {
      id: 6,
      title: "Phone Number",
      field: "phoneno",
      sorting: true,
      align: "left",
      filterComponent: TextFilterField,

      cellStyle: {
        ...cellStyleCommon,
        justifyContent: "center",
        // maxWidth: "18.25rem",
        width : '15%'
      },
    },
    {
      id: 6,
      title: "ID",
      field: "id",
      sorting: true,
      align: "left",
      filterComponent: NumberFilterField,

      cellStyle: {
        ...cellStyleCommon,
        justifyContent: "center",
        // maxWidth: "18.25rem",
        width : '15%'
      },
    },
    
    {
      id: 10,
      title: "Edit",
      field: "action",
      sorting: false,
      align: "center",
      cellStyle: {
        ...cellStyleCommon,
        justifyContent: "center",
        width : '5%'
        // maxWidth: "18.25rem",
      },
      render: (rowData) => {
        return (
          <div className="flex gap-2 justify-center">
            <EditButton
               handleEdit={handleEdit}
               rowData={rowData}
            
            />
            <DeleteButton
               handleDelete={handleDelete}
               rowData={rowData}
            />
           
          </div>
        );
      },
    },
  ];
  return columns;
}
