import { Button, Stack, Typography } from "@mui/material";
import Navbar from "../../../Components/Navabar/Navbar";
import HeaderBreadcrum from "../../../Components/common/HeaderBreadcum";
import { useEffect, useMemo, useState, useRef } from "react";
import ConfirmationModal from "../../../Components/common/ConfirmationModal";
import SucessfullModal from "../../../Components/modals/SucessfullModal";
// import SimpleTable from "../../../Components/common/table/CustomTable";
import SimpleTableWithFooter from "../../../Components/common/table/CustomTableWithFooter";
import connectionDataColumn from "./Columns";
import SearchBar from "../../../Components/common/SearchBar/SearchBar";
import { APIService } from "../../../services/API";
import { useDispatch } from "react-redux";
import useAuth from "../../../context/JwtContext";
import RefreshReports from "../../../Components/common/buttons/RefreshReports";
import {
  downloadAdvanceHoldingAmount,
  getAdvanceHoldingAmount,
  setCountPerPage,
  setInitialState,
  setPageNumber,
  setSorting,
  setStatus,
  resetFilters
} from "../../../Redux/slice/reporting/AdvanceHoldingAmount"
import { useSelector } from "react-redux";
// import DatePicker from "../../../Components/common/select/CustomDate";
import DatePicker from "react-datepicker";
import { formatedFilterData } from "../../../utils/filters";
import * as XLSX from "xlsx";
import SimpleTable from "../../../Components/common/table/CustomTable";
import Container from "../../../Components/common/Container";


const PmaInvoiceList = () => {
  const dispatch = useDispatch();
  const isInitialMount = useRef(true);
  const {user} = useAuth();
  const {
    advanceHoldingAmount,
    status,
    totalAmount,
    totalCount,
    sorting,
    countPerPage,
    pageNo,
    filter
  } = useSelector((state) => state.advanceHoldingAmount)
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [toast, setToast] = useState(false);
  const columns = useMemo(() => connectionDataColumn(), []);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [lob, setLob] = useState(0);
  const [allLOB, setAllLOB] = useState([]);

  const handleSearchvalue = (e) => {
    setSearchInput(e.target.value);
  };

  const handleDateChange = (e) => {
    let { name, value } = e.target;
    if (name === "startDate") {
      setStartDate(value);
    }
    if (name === "endDate") {
      setEndDate(value);
    }
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
      rows: ["clientname", "payments", "receipts"],
      sort_by: sorting.sort_by ? [sorting.sort_by] : undefined,
      order: sorting.sort_order ? sorting.sort_order : undefined,
      filters: formatedFilterData(filter),
      search_key: search,
      pg_no: +pageNo,
      pg_size: +countPerPage,
    };
    dispatch(getAdvanceHoldingAmount(obj));

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
        rows: ["clientname", "payments", "receipts"],
        sort_by: sorting.sort_by ? [sorting.sort_by] : undefined,
        filters: formatedFilterData(filter),
        search_key: search,
        pg_no: +pageNo,
        pg_size: +countPerPage,
        order: sorting.sort_order ? sorting.sort_order : undefined,
      };
      dispatch(getAdvanceHoldingAmount(obj));
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
      rows: ["clientname", "payments", "receipts"],
      sort_by: sorting.sort_by ? [sorting.sort_by] : undefined,
      filters: formatedFilterData(filter),
      downloadType: "excel",
      colmap: {
        "clientname": "Client Name",
        "payments": "Payments",
        "receipts": "Receipts",
      },
      search_key: search,
      pg_no: 0,
      pg_size: 0,
      order: sorting.sort_order ? sorting.sort_order : undefined,
    };
    dispatch(downloadAdvanceHoldingAmount(obj))
  };

  const downloadPdf = () => {
    let obj = {
      user_id: user.id,
      rows: ["clientname", "payments", "receipts"],
      sort_by: sorting.sort_by ? [sorting.sort_by] : "",
      downloadType: "pdf",
      routename: "/reports/advanceHoldingAmount",
      colmap: {
        "clientname": "Client Name",
        "payments": "Payments",
        "receipts": "Receipts",
      },
      filters: formatedFilterData(filter),
      search_key: search,
      pg_no: 0,
      pg_size: 0,
      order: sorting.sort_order ? sorting.sort_order : "",
    }; 
    dispatch(downloadAdvanceHoldingAmount(obj, 'pdf'))
  }

  const handleShow = () => {
    if (startDate) {

      dispatch(setInitialState())

      setShowTable(true);
    } else {
      // setError((prev) => ({
      //   ...prev,
      //   year: selectedYear ? prev.year : "please select a year first",
      //   month: selectedMonth ? prev.month : "please select a year first",
      // }));
    }
  };

  const renderYearContent = (year) => {
    const tooltipText = `Tooltip for year: ${year}`;
    return <span title={tooltipText}>{year}</span>;
  }
  return (
    <Container>

      <Stack gap="1rem">
        <div className="flex flex-col px-4">
          <div className="flex justify-between">
            <HeaderBreadcrum
              heading={"Details For Advance Holding Amount"}
              path={["Reports", "Exceptions", "Details For Advance Holding Amount"]}
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
              <RefreshReports onClick={() => dispatch(resetFilters())}/>
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
            data={advanceHoldingAmount}
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
        {toast && (
          <SucessfullModal
            isOpen={toast}
            message="New Receipt Added Successfully"
          />
        )}
      </Stack>
    </Container>
  );
};

export default PmaInvoiceList;
