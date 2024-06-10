import { Stack } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";

import { useSelector } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import HeaderBreadcrum from "../../../Components/common/HeaderBreadcum";
import SearchBar from "../../../Components/common/SearchBar/SearchBar";
import {
  downloadActiveLLAgreementReport,
  getActiveLLAgreement,
  setCountPerPage,
  setInitialState,
  setPageNumber,
  setSorting,
} from "./../../../Redux/slice/reporting/ActiveLLAgreement/ActiveLLAgreement";
import { formatedFilterData } from "../../../utils/filters";
import SimpleTable from "../../../Components/common/table/CustomTable";
import connectionDataColumn from "./Columns";

const ActiveLLAgreementView = () => {
  const dispatch = useDispatch();
  const {
    activeLlAgreement,
    status,
    totalAmount,
    totalCount,
    sorting,
    countPerPage,
    pageNo,
    filter,
  } = useSelector((state) => state.activeLLAgreement);
  const columns = useMemo(() => connectionDataColumn(), []);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");

  const handleSearchvalue = (e) => {
    setSearchInput(e.target.value);
  };

  const handlePageChange = (value) => {
    dispatch(setPageNumber(value));
  };

  const handlePageCountChange = (e) => {
    dispatch(setCountPerPage(e.target.value));
    dispatch(setPageNumber(1));
  };

  const handleRefresh = () => {
    let obj = {
      user_id: 1234,
      rows: [
        "clientname",
        "propertydescription",
        "startdate",
        "actualenddate",
        "status",
        "startdatemonthyear",
        "enddatemonthyear",
        "orderstatus",
        "depositamount",
        "rentamount",
      ],
      sort_by: undefined,
      filters: formatedFilterData(filter),
      search_key: search,
      pg_no: +pageNo,
      pg_size: +countPerPage,
      order: undefined,
    };
    dispatch(getActiveLLAgreement(obj));
  };

  const handleSearch = () => {
    setSearch(searchInput);
    dispatch(setPageNumber(1));
  };
  

  // useEffect(()=>{
  //  setInitialState
  // },[])

  const handleSearchEnterKey = (e) => {
    if (searchInput) {
      if (e.key === "Enter" || e.key === "Return" || e.key === 13) {
        handleSearch();
      }
    }
  };
  const removeSearchValue = () => {
    setSearch("");
    setSearchInput("");
  };

  useEffect(() => {
    if (searchInput === "") setSearch("");
  }, [searchInput]);

  useEffect(() => {
    let obj = {
      user_id: 1234,
      rows: [
        "clientname",
        "propertydescription",
        "startdate",
        "actualenddate",
        "status",
        "startdatemonthyear",
        "enddatemonthyear",
        "orderstatus",
        "depositamount",
        "rentamount",
      ],

      sort_by: sorting.sort_by ? [sorting.sort_by] : undefined,
      filters: formatedFilterData(filter),
      search_key: search,
      pg_no: +pageNo,
      pg_size: +countPerPage,
      order: sorting.sort_order ? sorting.sort_order : undefined,
    };
    dispatch(getActiveLLAgreement(obj));
  }, [
    filter,
    countPerPage,
    pageNo,
    search,
    sorting.sort_order,
    sorting.sort_by,
  ]);

  const handleSortingChange = (accessor) => {
    const sortOrder =
      accessor === sorting.sort_by && sorting.sort_order === "asc"
        ? "desc"
        : "asc";
    dispatch(setSorting({ sort_by: accessor, sort_order: sortOrder }));
  };

  const downloadExcel = async () => {
    let obj = {
      user_id: 1234,
      rows: [
        "clientname",
        "propertydescription",
        "startdate",
        "actualenddate",
        "status",
        "startdatemonthyear",
        "enddatemonthyear",
        "orderstatus",
        "depositamount",
        "rentamount",
      ],

      downloadType: "excel",
      sort_by: sorting.sort_by ? [sorting.sort_by] : undefined,
      filters: formatedFilterData(filter),
      search_key: search,
      pg_no: 0,
      pg_size: 0,
      colmap: {
        clientname: "Client Name",
        propertydescription: "Property Description",
        startdate: "Start Date",
        actualenddate: "End Date",
        status: "Status",
        startdatemonthyear: "Start Month-Year",
        enddatemonthyear: "End Month-Year",
        orderstatus: "Order Status",
        depositamount: "Deposit Amount",
        rentamount: "Rent Amount",
      },
      order: sorting.sort_order ? sorting.sort_order : undefined,
    };
    dispatch(downloadActiveLLAgreementReport(obj));
  };

  return (
    <Stack gap="1rem" sx={{ paddingTop: "20px" }}>
      <div className="flex flex-col px-4">
        <div className="flex justify-between">
          <HeaderBreadcrum
            heading={"All Active L&L Agreements Report	"}
            path={["Reports", "Legal", "All Active L&L Agreements Report"]}
          />
          <div className="flex justify-between gap-7 h-[36px]">
            <div className="flex p-2 items-center justify-center rounded border border-[#CBCBCB] text-base font-normal leading-relaxed">
              <p>
                Generated on: <span> {new Date().toLocaleString()}</span>
              </p>
            </div>

            <SearchBar
              value={searchInput}
              handleSearchvalue={handleSearchvalue}
              handleSearch={handleSearch}
              removeSearchValue={removeSearchValue}
              onKeyDown={handleSearchEnterKey}
            />
          </div>
        </div>

        <Stack
          marginTop={"8px"}
          justifyContent={"space-between"}
          direction={"row"}
          alignItems={"center"}
          height={"3.875rem"}
        ></Stack>
        <SimpleTable
          columns={columns}
          data={activeLlAgreement}
          totalData={totalAmount}
          pageNo={pageNo}
          isLoading={status === "loading"}
          totalCount={totalCount}
          style={"text-center"}
          countPerPage={countPerPage}
          handlePageCountChange={handlePageCountChange}
          handlePageChange={handlePageChange}
          handleRefresh={handleRefresh}
          handleSortingChange={handleSortingChange}
          downloadExcel={downloadExcel}
          height="calc(100vh - 18rem)"
        />
      </div>
    </Stack>
  );
};

export default ActiveLLAgreementView;
