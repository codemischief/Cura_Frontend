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
      title: "Corporation",
      field: "corporation",
      sorting: true,
    //   width : '1000px',
      align: "left",
      filterDisabled: false,
      cellStyle: {
        ...cellStyleCommon,
        justifyContent: "center",
        width : '6.9%'
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
        width : '6.9%'
        
      },
    },
    {
      id: 3,
      filterComponent: TextFilterField,
      title: "Address",
      field: "address",
      align: "left",
    //   width : '20%',
      filterDisabled: false,
      sorting: true,
      cellStyle: {
        ...cellStyleCommon,
        justifyContent: "center",
        width : '6.9%'
        
      },
    },
    {
      id: 3,
      filterComponent: TextFilterField,
      title: "Property Details",
      field: "propertydetails",
      align: "left",
    //   width : '20%',
      filterDisabled: false,
      sorting: true,
      cellStyle: {
        ...cellStyleCommon,
        justifyContent: "center",
        width : '6.9%'
        
      },
    },
    {
      id: 3,
      filterComponent: TextFilterField,
      title: "Property Tax Number",
      field: "propertytaxno",
      align: "left",
    //   width : '20%',
      filterDisabled: false,
      sorting: true,
      cellStyle: {
        ...cellStyleCommon,
        justifyContent: "center",
        width : '6.9%'
        
      },
    },
    {
      id: 3,
      filterComponent: TextFilterField,
      title: "Phone Number",
      field: "phoneno",
      align: "left",
    //   width : '20%',
      filterDisabled: false,
      sorting: true,
      cellStyle: {
        ...cellStyleCommon,
        justifyContent: "center",
        width : '6.9%'
        
      },
    },
    
    {
      id: 4,
      filterComponent: TextFilterField,

      title: "PhoneNo1",
      field: "phoneno1",
      align: "left",
      filterDisabled: false,
      sorting: true,
      cellStyle: {
        ...cellStyleCommon,
        justifyContent: "center",
        // maxWidth: "18.25rem",
        width : '6.9%'
      },
    },
    {
      id: 4,
      filterComponent: TextFilterField,

      title: "Phone No 2",
      field: "phoneno2",
      align: "left",
      filterDisabled: false,
      sorting: true,
      cellStyle: {
        ...cellStyleCommon,
        justifyContent: "center",
        // maxWidth: "18.25rem",
        width : '6.9%'
      },
    },
    {
      id: 4,
      filterComponent: TextFilterField,

      title: "Email ID",
      field: "emailid",
      align: "left",
      filterDisabled: false,
      sorting: true,
      cellStyle: {
        ...cellStyleCommon,
        justifyContent: "center",
        // maxWidth: "18.25rem",
        width : '6.9%'
      },
    },
    {
      id: 3,
      filterComponent: TextFilterField,
      title: "Sale / Rent",
      field: "propertyfor",
      align: "left",
    //   width : '20%',
      filterDisabled: false,
      sorting: true,
      cellStyle: {
        ...cellStyleCommon,
        justifyContent: "center",
        width : '6.9%'
        
      },
    },
    
    {
      id: 3,
      filterComponent: TextFilterField,
      title: "Society Name",
      field: "societyname",
      align: "left",
    //   width : '20%',
      filterDisabled: false,
      sorting: true,
      cellStyle: {
        ...cellStyleCommon,
        justifyContent: "center",
        width : '6.9%'
        
      },
    },
    {
      id: 3,
      filterComponent: TextFilterField,
      title: "Source",
      field: "source",
      align: "left",
    //   width : '20%',
      filterDisabled: false,
      sorting: true,
      cellStyle: {
        ...cellStyleCommon,
        justifyContent: "center",
        width : '6.9%'
        
      },
    },
    
    {
      id: 9,
      title: "ID",
      field: "id",
      sorting: true,
      align: "left",
      filterComponent: NumberFilterField,

      cellStyle: {
        ...cellStyleCommon,
        justifyContent: "center",
        // maxWidth: "18.25rem",
        width : '6.9%'
      },
    },
    {
      id: 10,
      title: "Edit",
      field: "action",
      sorting: false,
      align: "left",
      cellStyle: {
        ...cellStyleCommon,
        justifyContent: "center",
        width : '5%'
        // maxWidth: "18.25rem",
      },
      render: (rowData) => {
        return (
          <div className="flex gap-2 justify-start">
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
