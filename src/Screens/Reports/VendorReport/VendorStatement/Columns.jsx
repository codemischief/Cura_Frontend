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
        minWidth: "5rem",
      },
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
      title: "Type",
      field: "type",
      sorting: true,
      // filterComponent: TextFilterField,
      cellStyle: {
        ...cellStyleCommon,
        justifyContent: "center",
        minWidth: "4.813rem",
      },
    },
    {
      title: "ID",
      field: "id",
      sorting: true,
      filterComponent: NumberFilterField,
      cellStyle: {
        ...cellStyleCommon,
        justifyContent: "center",
        minWidth: "4rem",
        maxWidth:"6rem"
      },
    },
    {
      title: "Client Name",
      field: "clientname",
      sorting: true,
      filterComponent: TextFilterField,
      cellStyle: {
        ...cellStyleCommon,
        justifyContent: "center",
        minWidth: "6rem",
        maxWidth: "9rem",

      },
    },
    {
      title: "Date",
      field: "invoicedate_orderpaymentdate",
      sorting: true,
      filterComponent: DateFilterField,
      cellStyle: {
        ...cellStyleCommon,
        justifyContent: "center",
        minWidth: "3rem",
        maxWidth: "9rem",

      },
    },
    {
      title: "Amount",
      field: "invoiceamount_orderpaymentamount",
      sorting: true,
      filterComponent: NumberFilterField,
      cellStyle: {
        ...cellStyleCommon,
        justifyContent: "center",
        minWidth: "5.063rem",
        maxWidth:"8rem"
      },
    },
    {
      title: "Estimate / Order Description",
      field: "estimatedescription_orderdescription",
      sorting: true,
      filterComponent: TextFilterField,
      cellStyle: {
        ...cellStyleCommon,
        justifyContent: "center",
        minWidth: "5.063rem",
        maxWidth:"11rem"

      },
    },
    {
      title: "Month-Year",
      field: "monthyear",
      sorting: true,
      filterComponent: TextFilterField,
      cellStyle: {
        ...cellStyleCommon,
        justifyContent: "center",
        minWidth: "5.063rem",
        maxWidth: "7rem",

      },
    },
    {
      title: "Mode of Payment",
      field: "modeofpayment",
      sorting: true,
      filterComponent: TextFilterField,
      cellStyle: {
        ...cellStyleCommon,
        justifyContent: "center",
        minWidth: "5.063rem",
        maxWidth: "7rem",
      },
    },
    {
      title: "Entity",
      field: "entityname",
      sorting: true,
      filterComponent: TextFilterField,
      cellStyle: {
        ...cellStyleCommon,
        justifyContent: "center",
        minWidth: "5.063rem",
        maxWidth: "7rem",
      },
    },
  ];
  return columns;
}
