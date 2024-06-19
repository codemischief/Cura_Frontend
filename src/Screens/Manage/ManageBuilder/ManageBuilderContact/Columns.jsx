import { Stack } from "@mui/material";

import styleConst from "./styleConst";
import {
  DateFilterField,
  NumberFilterField,
  TextFilterField,
} from "./CustomFilterField";
import { Create, Delete } from "@mui/icons-material";

import EditButton from "../../../../Components/common/buttons/EditButton";
import DeleteButton from "../../../../Components/common/buttons/deleteButton";
export default function connectionDataColumn(handleEdit, handleDelete) {
  const { cellStyleCommon } = styleConst;
  // "buildername",
  //         "builderid",
  //         "contactname",
  //         "jobtitle",
  //         "businessphone",
  //         "homephone",
  //         "mobilephone",
  //         "addressline1",
  //         "addressline2",
  //         "suburb",
  //         "city",
  //         "state",
  //         "country",
  //         "zip",
  //         "notes",
  //         "dated",
  //         "createdby",
  //         "isdeleted"
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
      title: "Contact Name",
      field: "contactname",
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
      title: "Builder Name",
      field: "buildername",
      align: "left",
    //   width : '18%',
      filterDisabled: false,
      sorting: true,
      cellStyle: {
        ...cellStyleCommon,
        justifyContent: "center",
        width : '15%'
        
      },
    },
    {
      id: 3,
      filterComponent: TextFilterField,
      title: "Job Title",
      field: "jobtitle",
      align: "left",
    //   width : '18%',
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

      title: "Suburb",
      field: "suburb",
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
      title: "City",
      field: "city",
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
      id: 8,
      title: "Edit",
      field: "action",
      sorting: false,
      align: "center",
      cellStyle: {
        ...cellStyleCommon,
        justifyContent: "center",
        width : '5%'
      },
      render: (rowData) => {
        return (
          <div className="flex gap-2 justify-start ">

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
