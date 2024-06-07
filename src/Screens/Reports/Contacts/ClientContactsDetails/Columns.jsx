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
      cellStyle: { ...cellStyleCommon, justifyContent: "center", width: "4%" },
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
      title: "Employer Name",
      field: "employername",
      sorting: true,
      filterComponent: TextFilterField,
      cellStyle: { ...cellStyleCommon, justifyContent: "center", width: "14%" },
    },
    {
      title: "Contact 1 Name",
      field: "localcontact1name",
      sorting: true,
      filterComponent: TextFilterField,
      cellStyle: { ...cellStyleCommon, justifyContent: "center", width: "13%" },
    },
    {
      title: "Contact 1 Address",
      field: "localcontact1address",
      sorting: true,
      filterComponent: TextFilterField,
      cellStyle: { ...cellStyleCommon, justifyContent: "center", width: "14%" },
    },
    {
      title: "Contact 1 Details",
      field: "localcontact1details",
      sorting: true,
      filterComponent: TextFilterField,
      cellStyle: { ...cellStyleCommon, justifyContent: "center", width: "14%" },
    },
    {
      title: "Contact 2 Name",
      field: "localcontact2name",
      sorting: true,
      filterComponent: TextFilterField,
      cellStyle: { ...cellStyleCommon, justifyContent: "center", width: "13%" },
    },
    {
      title: "Contact 2 Address",
      field: "localcontact2address",
      sorting: true,
      filterComponent: TextFilterField,
      cellStyle: { ...cellStyleCommon, justifyContent: "center", width: "14%" },
    },
    {
      title: "Contact 2 Details",
      field: "localcontact2details",
      sorting: true,
      filterComponent: TextFilterField,
      cellStyle: { ...cellStyleCommon, justifyContent: "center", width: "14%" },
    },
  ];
  return columns;
}
