import { Stack } from "@mui/material";

import styleConst from "./styleConst";
import {
  DateFilterField,
  NumberFilterField,
  TextFilterField,
} from "./CustomFilterField";
import { Create, Delete } from "@mui/icons-material";
import DeleteButton from "../../../Components/common/buttons/deleteButton";
import EditButton from "../../../Components/common/buttons/EditButton";
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
      title: "Employer Name",
      field: "employername",
      sorting: true,
    //   width : '1000px',
      align: "left",
      filterDisabled: false,
      cellStyle: {
        ...cellStyleCommon,
        justifyContent: "center",
        width : '23%'
      },
    },
    {
      id: 3,
      filterComponent: TextFilterField,
      title: "Industry",
      field: "industry",
      align: "left",
    //   width : '18%',
      filterDisabled: false,
      sorting: true,
      cellStyle: {
        ...cellStyleCommon,
        justifyContent: "center",
        width : '22%'
        
      },
    },
    {
      id: 4,
      filterComponent: TextFilterField,

      title: "Website",
      field: "website",
      align: "left",
      filterDisabled: false,
      sorting: true,
      cellStyle: {
        ...cellStyleCommon,
        justifyContent: "center",
        // maxWidth: "18.25rem",
        width : '22%'
      },
    },
    {
      id: 5,
      title: "Onsite Oppurtunity",
      field: "onsiteopportunity",
      sorting: true,
      align: "left",
      filterComponent: TextFilterField,

      cellStyle: {
        ...cellStyleCommon,
        justifyContent: "center",
        // maxWidth: "18.25rem",
        width : '18%'
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
        width : '5%'
      },
    },
    {
      id: 8,
      title: "",
      field: "action",
      sorting: false,
      align: "left",
      cellStyle: {
        ...cellStyleCommon,
        justifyContent: "center",
        width : '5%'
      },
      render: (rowData) => {
        return (
          <div className="flex gap-2 justify-start ">
            {/* <Create
              sx={{ width: "20px", height: "20px", color : '#c6c6c6', cursor : 'pointer'}}

              onClick={() => handleEdit(rowData)}
            /> */}
            <EditButton
              handleEdit={handleEdit}
              rowData={rowData}
            />
            <DeleteButton
                 handleDelete={handleDelete}
                 rowData={rowData}
            />
            {/* <Delete

              sx={{ width: "20px", height: "20px", color : '#c6c6c6' , cursor : 'pointer'}}
              onClick={() => handleDelete(rowData)}
            /> */}
          </div>
        );
      },
    },
  ];
  return columns;
}
