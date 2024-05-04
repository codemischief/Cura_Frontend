import { Chip, Stack } from "@mui/material";
import { Strings } from "./String";
import {
  TextFilterField,
  NumberFilterField,
  filterQuery
} from "./CustomFilterField";
import styleConst from "./styleConst";
import { useDispatch, useSelector } from "react-redux";

export default function connectionDataColumn({
  connectionTypeObj,
  connectionProtocolsObj
}) {
  const { cellStyleCommon } = styleConst;
const { pmaBillingData } = useSelector((state) => state.pmaBilling);
console.log(pmaBillingData,"pmaBillingData");


  const columns = [
    {
      filterComponent: TextFilterField,
      title: "Client Name",
      field: "connectionType",
      // filterComponent: TextFilterField,
      cellStyle: { ...cellStyleCommon, minWidth: 80 },
      render: (rowData) => {        
        return (
          <Stack direction="row" spacing={0.5}>
            {rowData.clientname}
          </Stack>
        );
      }
    },
    {
      filterComponent: TextFilterField,
      title: "Quote Description",
      field: "connectionType",
      cellStyle: { ...cellStyleCommon, minWidth: 80 },
      render: (rowData) => {
        // while grouping rowData will be just value not object
       
        return (
          // <Chip
          //   label={data}
          //   color={data === Strings.EXPORT ? "warning" : "info"}
          // />
          <Stack direction="row" spacing={0.5}>
            {rowData?.briefdescription?rowData?.briefdescription : "---"}
          </Stack>
        );
      }
    },
    {
      title: "Invoice Date",
      field: "connectionName",
      cellStyle: { ...cellStyleCommon, minWidth: 200 },
      filterComponent: TextFilterField,
      // customFilterAndSearch: (term, rowData) => filterQuery(term, rowData.connectionName),
      render: (rowData) => {
        // while grouping rowData will be just value not object
       
        return (
          // <Chip
          //   label={data}
          //   color={data === Strings.EXPORT ? "warning" : "info"}
          // />
          <Stack direction="row" spacing={0.5}>
            {rowData?.date ?rowData?.date : "---"}
          </Stack>
        );
      }
    },
    {
      title: "Invoice Amount",
      // field: "sdpNames",
      grouping: false,
      cellStyle: { ...cellStyleCommon, minWidth: 125 },
      filterComponent: TextFilterField,
      // customFilterAndSearch: (term, rowData) =>
      //   filterQuery(term, rowData?.sdpNames?.join("^")),
      // exportTransformer: (rowData) => {
      //   const sdpsData = rowData?.sdpNames?.map((sdp) => sdp).join("; ");
      //   return sdpsData;
      // },
      render: (rowData) => {
       
        return (
          <Stack direction="row" spacing={0.5}>
            {rowData.rentamount}
          </Stack>
        );
      }
    },
    {
      title: "Base Amount",
      field: "protocol",
      filterComponent: TextFilterField,
      cellStyle: { ...cellStyleCommon, minWidth: 100 },
      lookup: connectionProtocolsObj,
      render: (rowData) => {
       
        return (
          <Stack direction="row" spacing={0.5}>
            ---
          </Stack>
        );
      }
    },

    {
      title: "Tax Amount",
      field: "host",
      cellStyle: { ...cellStyleCommon, minWidth: 250 },
      filterComponent: TextFilterField,
      // customFilterAndSearch: (term, rowData) => filterQuery(term, rowData.host),
      render: (rowData) => {
        // while grouping rowData will be just value not object
       
        return (
          // <Chip
          //   label={data}
          //   color={data === Strings.EXPORT ? "warning" : "info"}
          // />
          <Stack direction="row" spacing={0.5}>
            ----
          </Stack>
        );
      }
    },
    {
      title: "Fixed Amount",
      field: "port",
      cellStyle: { ...cellStyleCommon, minWidth: 75 },
      filterComponent: TextFilterField,
      // customFilterAndSearch: (term, rowData) => filterQuery(term, rowData.port),
      render: (rowData) => {
        // while grouping rowData will be just value not object
       
        return (
          // <Chip
          //   label={data}
          //   color={data === Strings.EXPORT ? "warning" : "info"}
          // />
          <Stack direction="row" spacing={0.5}>
            {rowData.fixedamt}
          </Stack>
        );
      }
      
    },
    {
      title: "Fixed Tax Amount",
      field: "userName",
      cellStyle: { ...cellStyleCommon, minWidth: 250 },
      filterComponent: TextFilterField,
      // customFilterAndSearch: (term, rowData) =>filterQuery(term, rowData.userName)
      render: (rowData) => {
        // while grouping rowData will be just value not object
       
        return (
          // <Chip
          //   label={data}
          //   color={data === Strings.EXPORT ? "warning" : "info"}
          // />
          <Stack direction="row" spacing={0.5}>
            {rowData.fixedtaxamt}
          </Stack>
        );
      }
    },
    {
      title: "Rented Amount",
      field: "userName",
      cellStyle: { ...cellStyleCommon, minWidth: 250 },
      filterComponent: TextFilterField,
      // customFilterAndSearch: (term, rowData) =>filterQuery(term, rowData.userName)
      render: (rowData) => {
        // while grouping rowData will be just value not object
       
        return (
          // <Chip
          //   label={data}
          //   color={data === Strings.EXPORT ? "warning" : "info"}
          // />
          <Stack direction="row" spacing={0.5}>
            {rowData.rentedamt ? rowData.rentedamt:"---"}
          </Stack>
        );
      }
    },
    {
      title: "Rented Tax Amount",
      field: "userName",
      cellStyle: { ...cellStyleCommon, minWidth: 250 },
      filterComponent: TextFilterField,
      // customFilterAndSearch: (term, rowData) =>filterQuery(term, rowData.userName)
      render: (rowData) => {
        // while grouping rowData will be just value not object
       
        return (
          // <Chip
          //   label={data}
          //   color={data === Strings.EXPORT ? "warning" : "info"}
          // />
          <Stack direction="row" spacing={0.5}>
            {rowData.rentedtaxamt ? rowData.rentedtaxamt:"---"}
          </Stack>
        );
      }
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