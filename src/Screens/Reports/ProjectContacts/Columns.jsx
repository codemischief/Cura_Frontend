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
      cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "10%" },
      sorting: false,
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
        title: "Builder Name",
        field: "buildername",
        sorting: true,
        filterComponent: TextFilterField,
        cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "15%" },
    },
    {
      title: "Project Name",
      field: "projectname",
      sorting: true,
      // cellStyle: { minWidth: "20px", },
      filterComponent: TextFilterField,
      cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "15%"  },
    },
    {
        title: "City",
        field: "city",
        sorting: true,
        // cellStyle: { minWidth: "20px", },
        filterComponent: TextFilterField,
        cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "15%"  },
      },
      {
        title: "Suburb",
        field: "suburb",
        sorting: true,
        // cellStyle: { minWidth: "20px", },
        filterComponent: TextFilterField,
        cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "15%"  },
      },
      {
        title: "Contact Name",
        field: "contactname",
        sorting: true,
        // cellStyle: { minWidth: "20px", },
        filterComponent: TextFilterField,
        cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "15%"  },
      },
      {
        title: "Contact phone",
        field: "phone",
        sorting: true,
        // cellStyle: { minWidth: "20px", },
        filterComponent: TextFilterField,
        cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "15%"  },
      },
      {
        title: "Email ID",
        field: "email",
        sorting: true,
        // cellStyle: { minWidth: "20px", },
        filterComponent: TextFilterField,
        cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "15%"  },
      },
      {
        title: "Effective Date",
        field: "effectivedate",
        sorting: true,
        // cellStyle: { minWidth: "20px", },
        filterComponent: DateFilterField,
        cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "15%"  },
      },
      {
        title: "Role",
        field: "role",
        sorting: true,
        // cellStyle: { minWidth: "20px", },
        filterComponent: TextFilterField,
        cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "15%"  },
      },
      {
        title: "Tenure End Date",
        field: "tenureenddate",
        sorting: true,
        // cellStyle: { minWidth: "20px", },
        filterComponent: DateFilterField,
        cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "15%"  },
      },

      {
        title: "Details",
        field: "details",
        sorting: true,
        // cellStyle: { minWidth: "20px", },
        filterComponent: TextFilterField,
        cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "15%"  },
      },
      
  ];
  return columns;
}
