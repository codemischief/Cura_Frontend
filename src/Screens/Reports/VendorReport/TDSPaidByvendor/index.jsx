import { Button, Stack } from "@mui/material";
import { useEffect, useMemo, useState, useRef } from "react";
import { useDispatch } from "react-redux";

import { useSelector } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import HeaderBreadcrum from "../../../../Components/common/HeaderBreadcum";
import SearchBar from "../../../../Components/common/SearchBar/SearchBar";
import useAuth from "./../../../../context/JwtContext"
import {
  downloadVendorStatementReport,
  getTdByVendorView,
  setCountPerPage,
  setPageNumber,
  setSorting,
  setInitialState,
} from "../../../../Redux/slice/reporting/Group9/TdsByVendorSlice";
import connectionDataColumn from "./Columns";
import { formatedFilterData } from "../../../../utils/filters";
import SimpleTable from "../../../../Components/common/table/CustomTable";

const TdsPaidByVendorView = () => {
  const dispatch = useDispatch();
  const isInitialMount = useRef(true);
  const {user} = useAuth();

  const {
    tdsByVendorView,
    status,
    totalAmount,
    totalCount,
    sorting,
    countPerPage,
    pageNo,
    filter,
  } = useSelector((state) => state.tdspaidByVendor);

  const [showTable, setShowTable] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");

  const columns = useMemo(() => connectionDataColumn(), []);

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
      user_id: user.id,
      rows: [
        "vendorname",
        "vendorcategory",
        "paymentmode",
        "registered",
        "tds",
        "panno",
        "tdssection",
        "amount",
        "paymentdate",
        "monthyear",
        "companydeductee",
      ],

      sort_by: undefined,
      filters: formatedFilterData(filter),
      search_key: search,
      pg_no: +pageNo,
      pg_size: +countPerPage,
      order: undefined,
    };
    dispatch(getTdByVendorView(obj));
  };

  const handleSearch = () => {
    setSearch(searchInput);
    dispatch(setPageNumber(1));
  };

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
    if (isInitialMount.current) {
      dispatch(setInitialState());
      isInitialMount.current = false;
    } else {

      let obj = {
        user_id: user.id,
        rows: [
          "vendorname",
          "vendorcategory",
          "paymentmode",
          "registered",
          "tds",
          "panno",
          "tdssection",
          "amount",
          "paymentdate",
          "monthyear",
          "companydeductee",
        ],

        sort_by: sorting.sort_by ? [sorting.sort_by] : undefined,
        filters: formatedFilterData(filter),
        search_key: search,
        pg_no: +pageNo,
        pg_size: +countPerPage,
        order: sorting.sort_order ? sorting.sort_order : undefined,
      };
      dispatch(getTdByVendorView(obj));
    }
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
      user_id: user.id,
      rows: [
        "vendorname",
        "vendorcategory",
        "paymentmode",
        "registered",
        "tds",
        "panno",
        "tdssection",
        "amount",
        "paymentdate",
        "monthyear",
        "companydeductee",
      ],

      downloadType: "excel",
      sort_by: sorting.sort_by ? [sorting.sort_by] : undefined,
      filters: formatedFilterData(filter),
      search_key: search,
      pg_no: 0,
      pg_size: 0,
      colmap: {
        vendorname: "Vendor Name",
        vendorcategory: "Vendor Category",
        paymentmode: "Payment Mode",
        registered: "Registered",
        tds: "TDS",
        panno: "PAN No",
        tdssection: "TDS Section",
        amount: "Amount",
        paymentdate: "Payment Date",
        monthyear: "Month Year",
        companydeductee: "Company Deductee",
      },
      order: sorting.sort_order ? sorting.sort_order : undefined,
    };
    dispatch(downloadVendorStatementReport(obj));
  };



  return (
    <Stack gap="1rem" sx={{ paddingTop: "20px" }}>
      <div className="flex flex-col px-4">
        <div className="flex justify-between">
          <HeaderBreadcrum
            heading={"TDS Paid By Vendor"}
            path={["Reports", "TDS Report", "TDS Paid By Vendor"]}
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


        <SimpleTable
          columns={columns}
          data={tdsByVendorView}
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
          height="calc(100vh - 14rem)"
        />
      </div>
    </Stack>
  );
};

export default TdsPaidByVendorView;
