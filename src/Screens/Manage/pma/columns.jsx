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
      filterComponent: TextFilterField,
      title: Strings.COLUMN_CONNECTION_TYPE,
      field: "connectionType",
      // filterComponent: TextFilterField,
      cellStyle: { ...cellStyleCommon, minWidth: 80 },
      render: (rowData) => {
        // while grouping rowData will be just value not object
        const data = rowData?.connectionType
          ? rowData?.connectionType
          : typeof rowData === "string"
          ? rowData
          : "N/A";
        return (
          // <Chip
          //   label={data}
          //   color={data === Strings.EXPORT ? "warning" : "info"}
          // />
          <Stack direction="row" spacing={0.5}>
            {data}
          </Stack>
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
      filterComponent: TextFilterField,
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
      filterComponent: TextFilterField,
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


{/* <div className='flex space-x-2 items-center '>
<div className='flex bg-[#EBEBEB] '>
    
    <input
        className="h-[36px] bg-[#EBEBEB] text-[#787878] pl-3 outline-none"
        type="text"
        placeholder="  Search"
        value={searchInput}
        onChange={(e) => {
            setSearchInput(e.target.value);
        }}
    />
    <button onClick={handleCloseSearch}><img src={Cross} className=' w-[20px] h-[20px] mx-2' /></button>
    <div className="h-[36px] w-[40px] bg-[#004DD7] flex items-center justify-center rounded-r-lg">
        <button onClick={handleSearch}><img className="h-[26px] " src={searchIcon} alt="search-icon" /></button>
    </div>
</div>

<div>
 
    <button className="bg-[#004DD7] text-white h-[36px] w-[240px] rounded-lg" onClick={handleOpen}>
        <div className="flex items-center justify-center gap-4">
            Add New Order
            <img className='h-[18px] w-[18px]' src={Add} alt="add" />
        </div>
    </button>
</div>

</div> */}