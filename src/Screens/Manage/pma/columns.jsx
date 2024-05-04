import { Chip, Stack } from "@mui/material";
import { Strings } from "./String";
import {
  TextFilterField,
  NumberFilterField,
  filterQuery
} from "./CustomFilterField";
import styleConst from "./styleConst";

export default function connectionDataColumn({
  connectionTypeObj,
  connectionProtocolsObj
}) {
  const { cellStyleCommon } = styleConst;
  const columns = [
    {
      title: Strings.COLUMN_CONNECTION_TYPE,
      field: "connectionType",
      lookup: connectionTypeObj,
      cellStyle: { ...cellStyleCommon, minWidth: 80 },
      render: (rowData) => {
        // while grouping rowData will be just value not object
        const data = rowData?.connectionType
          ? rowData?.connectionType
          : typeof rowData === "string"
          ? rowData
          : "N/A";
        return (
          <Chip
            label={data}
            color={data === Strings.EXPORT ? "warning" : "info"}
          />
        );
      }
    },
    {
      title: Strings.COLUMN_NAME,
      field: "connectionName",
      cellStyle: { ...cellStyleCommon, minWidth: 200 },
      filterComponent: TextFilterField,
      customFilterAndSearch: (term, rowData) =>
        filterQuery(term, rowData.connectionName)
    },
    {
      title: Strings.SOURCE_TITLE,
      field: "sdpNames",
      grouping: false,
      cellStyle: { ...cellStyleCommon, minWidth: 125 },
      filterComponent: TextFilterField,
      customFilterAndSearch: (term, rowData) =>
        filterQuery(term, rowData?.sdpNames?.join("^")),
      exportTransformer: (rowData) => {
        const sdpsData = rowData?.sdpNames?.map((sdp) => sdp).join("; ");
        return sdpsData;
      },
      render: (rowData) => {
        if (rowData.sdpIds === null) return <></>;
        const sdps = rowData.sdpNames.map((sdp) => (
          <Chip key={sdp} label={sdp} color="secondary" />
        ));
        return (
          <Stack direction="row" spacing={0.5}>
            {sdps}
          </Stack>
        );
      }
    },
    {
      title: Strings.COLUMN_PROTOCOL,
      field: "protocol",
      cellStyle: { ...cellStyleCommon, minWidth: 100 },
      lookup: connectionProtocolsObj
    },
    {
      title: Strings.COLUMN_HOST,
      field: "host",
      cellStyle: { ...cellStyleCommon, minWidth: 250 },
      filterComponent: TextFilterField,
      customFilterAndSearch: (term, rowData) => filterQuery(term, rowData.host)
    },
    {
      title: Strings.COLUMN_PORT,
      field: "port",
      cellStyle: { ...cellStyleCommon, minWidth: 75 },
      filterComponent: NumberFilterField,
      customFilterAndSearch: (term, rowData) => filterQuery(term, rowData.port)
    },
    {
      title: Strings.LABEL_USER_NAME,
      field: "userName",
      cellStyle: { ...cellStyleCommon, minWidth: 250 },
      filterComponent: TextFilterField,
      customFilterAndSearch: (term, rowData) =>
        filterQuery(term, rowData.userName)
    }
  ];
  return columns;
}
