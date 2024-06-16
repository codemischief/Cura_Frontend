import { Button, Stack, Typography } from "@mui/material";
import HeaderBreadcrum from "../../../Components/common/HeaderBreadcum";
import { useEffect, useMemo, useState, useRef } from "react";
import SucessfullModal from "../../../Components/modals/SucessfullModal";
// import SimpleTable from "../../../Components/common/table/CustomTable";
import connectionDataColumn from "./Columns";
import SearchBar from "../../../Components/common/SearchBar/SearchBar";
import { useDispatch } from "react-redux";
import {
  downloadMonthlyBankSummary,
  getMonthlyBankSummary,
  setCountPerPage,
  setInitialState,
  setPageNumber,
  setSorting,
  setStatus
} from "../../../Redux/slice/reporting/MonthlyBankSummary"
import { useSelector } from "react-redux";
import { formatedFilterData } from "../../../utils/filters";
import * as XLSX from "xlsx";
import SimpleTable from "../../../Components/common/table/CustomTable";
import Container from "../../../Components/common/Container";
import useAuth from "../../../context/JwtContext";

const PmaClientReport = () => {
  const dispatch = useDispatch();
  const {user} = useAuth();
  const isInitialMount = useRef(true);
  const {
    monthlyBankSummary,
    status,
    totalCount,
    sorting,
    countPerPage,
    pageNo,
    filter
  } = useSelector((state) => state.monthlyBankSummary)
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
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
      user_id: user.id,
      rows: ["name", "monthyear", "payments", "bankpayments", "bankreceipts", "receipts"],
      sort_by: sorting.sort_by ? [sorting.sort_by] : undefined,
      order: sorting.sort_order ? sorting.sort_order : undefined,
      filters: formatedFilterData(filter),
      search_key: search,
      pg_no: +pageNo,
      pg_size: +countPerPage,
    };
    dispatch(getMonthlyBankSummary(obj));

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
        rows: ["name", "monthyear", "payments", "bankpayments", "bankreceipts", "receipts"],
        sort_by: sorting.sort_by ? [sorting.sort_by] : undefined,
        filters: formatedFilterData(filter),
        search_key: search,
        pg_no: +pageNo,
        pg_size: +countPerPage,
        order: sorting.sort_order ? sorting.sort_order : undefined,
      };
      dispatch(getMonthlyBankSummary(obj));
    }

  }, [
    filter,
    countPerPage,
    pageNo,
    search,
    sorting.sort_order,
    sorting.sort_by,
  ]);

  useEffect(() => {

  }, []);

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
      rows: ["name", "monthyear", "payments", "bankpayments", "bankreceipts", "receipts"],
      sort_by: sorting.sort_by ? [sorting.sort_by] : undefined,
      filters: formatedFilterData(filter),
      downloadType: "excel",
      colmap: {
        "name": "Bank Name",
        "monthyear": "Month Year",
        "payments": "Order Payments",
        "bankpayments": "Payments(DR)",
        "bankreceipts": "Order Receipt",
        "receipts": "Receipt(CR)",
      },
      search_key: search,
      pg_no: 0,
      pg_size: 0,
      order: sorting.sort_order ? sorting.sort_order : undefined,
    };
    dispatch(downloadMonthlyBankSummary(obj))
  };

  const downloadPdf = () => {
    let obj = {
      user_id: user.id,
      rows: ["name", "monthyear", "payments", "bankpayments", "bankreceipts", "receipts"],
      sort_by: sorting.sort_by ? [sorting.sort_by] : "",
      downloadType: "pdf",
      routename: "/reports/monthlyBankSummary",
      colmap: {
        "name": "Bank Name",
        "monthyear": "Month Year",
        "payments": "Order Payments",
        "bankpayments": "Payments(DR)",
        "bankreceipts": "Order Receipt",
        "receipts": "Receipt(CR)",
      },
      filters: formatedFilterData(filter),
      search_key: search,
      pg_no: 0,
      pg_size: 0,
      order: sorting.sort_order ? sorting.sort_order : "",
    };
    dispatch(downloadMonthlyBankSummary(obj, 'pdf'))
  }



  return (
    <Container>

      <Stack gap="1rem">

        <div className="flex flex-col px-4">
          <div className="flex justify-between">
            <HeaderBreadcrum
              heading={"Monthly Bank Summary"}
              path={["Reports", "Bank Records", "Monthly Bank Summary"]}
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

          {/* <Stack
          marginTop={"8px"}
          justifyContent={"space-between"}
          direction={"row"}
          alignItems={"center"}
          height={"3.875rem"}
          >
          
        </Stack> */}

          <SimpleTable
            columns={columns}
            data={monthlyBankSummary}
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
            downloadPdf={downloadPdf}
            height="calc(100vh - 11rem)"
          />
        </div>
       
      </Stack>
    </Container>
  );
};

export default PmaClientReport;
