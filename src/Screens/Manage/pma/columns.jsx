import { Chip, Stack } from "@mui/material";
import { TextFilterField, NumberFilterField } from "./CustomFilterField";
import styleConst from "./styleConst";
import { useDispatch, useSelector } from "react-redux";

export default function connectionDataColumn(onQuery) {
  const { cellStyleCommon } = styleConst;

  const columns = [
    {
      // filterComponent: TextFilterField,
      title: "Sr No",
      render: (rowData) => {
        // while grouping rowData will be just value not object
        return (
          <Stack direction="row" spacing={0.5}>
            {rowData?.tableData.index + 1}
          </Stack>
        );
      },
    },
    {
      filterComponent: TextFilterField,
      title: "Client Name",
      field: "clientname",
      cellStyle: { ...cellStyleCommon, minWidth: 80 },
    },
    {
      filterComponent: TextFilterField,
      title: "Quote Description",
      field: "briefdescription",
    },
    {
      title: "Invoice Date",
      field: "connectionName",
      filterComponent: TextFilterField,
      // customFilterAndSearch: (term, rowData) => filterQuery(term, rowData.connectionName),
    },
    {
      title: "Invoice Amount",
      field: "totalamt",
      grouping: false,
      filterComponent: NumberFilterField,
    },
    {
      title: "Total Base Amount",
      field: "totalbaseamt",
      filterComponent: TextFilterField,
    },

    {
      title: "Tax Amount",
      field: "totaltaxamt",
      filterComponent: TextFilterField,
    },
    {
      title: "Fixed Amount",
      field: "fixedamt",
      filterComponent: TextFilterField,
    },
    {
      title: "Fixed Tax Amount",
      field: "userName",
      filterComponent: TextFilterField,
      render: (rowData) => {
        return (
          <Stack direction="row" spacing={0.5}>
            {rowData.fixedtaxamt}
          </Stack>
        );
      },
    },
    {
      title: "Rented Amount",
      field: "rentedamt",
      filterComponent: TextFilterField,
    },
    {
      title: "Rented Tax Amount",
      field: "fixedtaxamt",
      filterComponent: TextFilterField,
    },
  ];
  return columns;
}

{
  /* <div className='flex space-x-2 items-center '>
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

</div> */
}
