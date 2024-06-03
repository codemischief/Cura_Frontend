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
      cellStyle: { ...cellStyleCommon,justifyContent: "center",minWidth: "5rem" },
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
      title: "Unique ID",
      field: "uniqueid",
      sorting: true,
      filterComponent: TextFilterField,
      cellStyle: { ...cellStyleCommon,justifyContent: "center",width: "4rem"},
    },
    {
      title: "Date",
      field: "date",
      sorting: true,
      filterComponent: DateFilterField,
      cellStyle: { ...cellStyleCommon,justifyContent: "center",width: "6.25rem" },
    },
    {
      title: "Type",
      field: "voucher",
      sorting: true,
      filterComponent: TextFilterField,
      cellStyle: { ...cellStyleCommon,justifyContent: "center",width: "5.063rem" },
    },
    {
      title: "Voucher Type",
      field: "vouchertype",
      sorting: true,
      filterComponent: TextFilterField,
      cellStyle: { ...cellStyleCommon,justifyContent: "center",width: "5.063rem" },
    },
    {
      title: "Voucher Number",
      field: "vouchernumber",
      sorting: true,
      filterComponent: NumberFilterField,
      cellStyle: { ...cellStyleCommon,justifyContent: "center",width: "5.063rem" },
    },
    {
        title: "DR. Ledger",
        field: "drledger",
        sorting: true,
        filterComponent: TextFilterField,
        cellStyle: { ...cellStyleCommon,justifyContent: "center",width: "5.063rem" },
      },
      {
        title: "CR. Ledger",
        field: "crledger",
        sorting: true,
        filterComponent: TextFilterField,
        cellStyle: { ...cellStyleCommon,justifyContent: "center",width: "5.063rem" },
      },
      {
        title: "Ledger Amount",
        field: "ledgeramount",
        sorting: true,
        filterComponent: NumberFilterField,
        cellStyle: { ...cellStyleCommon,justifyContent: "center",width: "5.063rem" },
      },
      {
        title: "Narration",
        field: "narration",
        sorting: true,
        filterComponent: TextFilterField,
        cellStyle: { ...cellStyleCommon,justifyContent: "center",width: "5.063rem" },
      },
      {
        title: "Instrument Number",
        field: "instrumentno",
        sorting: true,
        filterComponent: NumberFilterField,
        cellStyle: { ...cellStyleCommon,justifyContent: "center",width: "15%" },
      },
      {
        title: "Instrument Date",
        field: "instrumentdate",
        sorting: true,
        filterComponent: DateFilterField,
        cellStyle: { ...cellStyleCommon,justifyContent: "center",width: "15%" },
      }
  ];
  return columns;
}
