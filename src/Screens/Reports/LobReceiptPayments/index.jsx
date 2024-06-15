import { Button, Stack, Typography } from "@mui/material";
import Navbar from "../../../Components/Navabar/Navbar";
import HeaderBreadcrum from "../../../Components/common/HeaderBreadcum";
import { useEffect, useMemo, useState } from "react";
import ConfirmationModal from "../../../Components/common/ConfirmationModal";
import SucessfullModal from "../../../Components/modals/SucessfullModal";
// import SimpleTable from "../../../Components/common/table/CustomTable";
import SimpleTableWithFooter from "../../../Components/common/table/CustomTableWithFooter";
import connectionDataColumn from "./Columns";
import SearchBar from "../../../Components/common/SearchBar/SearchBar";
import { APIService } from "../../../services/API";
import { useDispatch } from "react-redux";
import {
  downloadLobReceiptPaymentsDataXls,
  getLobReceiptPaymentsData,
  setCountPerPage,
  setInitialState,
  setPageNumber,
  setSorting,
  setStatus,
  resetData
} from "../../../Redux/slice/reporting/LOBReceiptPaymentSlice";
import { useSelector } from "react-redux";
import DatePicker from "../../../Components/common/select/CustomDate";
import { formatedFilterData } from "../../../utils/filters";
import * as XLSX from "xlsx";
import Container from "../../../Components/common/Container";
import useAuth from "../../../context/JwtContext";

const LobReceiptPayments = () => {
  const dispatch = useDispatch();
  const {user} = useAuth();
  const {
    lobReceiptPaymentsData,
    status,
    totalAmount,
    totalCount,
    sorting,
    countPerPage,
    pageNo,
    filter,
  } = useSelector((state) => state.lobReceiptPayments);
  console.log(totalAmount)
  console.log(lobReceiptPaymentsData)
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

  const fetchLobData = async () => {
    const data = {
      // "user_id": user.id,
      "rows": ["id", "name"],
      "filters": [],
      "sort_by": ["name"],
      "order": "asc",
      "pg_no": 0,
      "pg_size": 0
    };
    const response = await APIService.getLob({...data, user_id: user.id});
    const result = (await response.json());
    if (Array.isArray(result.data)) {
      setAllLOB(result.data);
    }
  }

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
    if (startDate && endDate && lob) {
      let obj = {
        user_id: user.id,
        startdate: startDate ?? "2021-01-01",
        enddate: endDate ?? "2022-01-01",
        lobName: lob,
        rows: ["lobname", "service", "orderreceiptamount", "paymentamount", "diff"],
        sort_by: sorting.sort_by ? [sorting.sort_by] : undefined,
        order: sorting.sort_order ? sorting.sort_order : undefined,
        filters: formatedFilterData(filter),
        search_key: search,
        pg_no: +pageNo,
        pg_size: +countPerPage,
      };
      dispatch(getLobReceiptPaymentsData(obj));
    }
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
    dispatch(setInitialState());
    dispatch(resetData());
  }, []);
  useEffect(() => {
    if (startDate && endDate && lob) {
      let obj = {
        user_id: user.id,
        startdate: startDate ?? "2021-01-01",
        enddate: endDate ?? "2022-01-01",
        lobName: lob,
        rows: ["lobname", "service", "orderreceiptamount", "paymentamount", "diff"],
        sort_by: sorting.sort_by ? [sorting.sort_by] : undefined,
        filters: formatedFilterData(filter),
        search_key: search,
        pg_no: +pageNo,
        pg_size: +countPerPage,
        order: sorting.sort_order ? sorting.sort_order : undefined,
      };
      dispatch(getLobReceiptPaymentsData(obj));
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
    fetchLobData();
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
      startdate: startDate ?? "2021-01-01",
      enddate: endDate ?? "2022-01-01",
      lobName: lob,
      rows: ["lobname", "service", "orderreceiptamount", "paymentamount", "diff"],
      sort_by: sorting.sort_by ? [sorting.sort_by] : undefined,
      filters: formatedFilterData(filter),
      downloadType: "excel",
      colmap: {
        "lobname": "LOB Name",
        "service": "Service",
        "orderreceiptamount": "Receipt Amount",
        "paymentamount": "Payment Amount",
        "diff": "Difference"
      },
      search_key: search,
      pg_no: 0,
      pg_size: 0,
      order: sorting.sort_order ? sorting.sort_order : undefined,
    };
    dispatch(downloadLobReceiptPaymentsDataXls(obj))
  };

  const downloadPdf = () => {
    console.log("start")
    let obj = {
      user_id: user.id,
      rows: ["lobname", "service", "orderreceiptamount", "paymentamount", "diff"],
      sort_by: sorting.sort_by ? [sorting.sort_by] : "",
      startdate: startDate ?? "2021-01-01",
      enddate: endDate ?? "2022-01-01",
      lobName: lob,
      downloadType: "pdf",
      routename: "/reports/lobReceiptPayments",
      colmap: {
       "lobname": "LOB Name",
        "service": "Service",
        "orderreceiptamount": "Receipt Amount",
        "paymentamount": "Payment Amount",
        "diff": "Difference"
      },
      filters: formatedFilterData(filter),
      search_key: search,
      pg_no: 0,
      pg_size: 0,
      order: sorting.sort_order ? sorting.sort_order : "",
    }; 
    dispatch(downloadLobReceiptPaymentsDataXls(obj, 'pdf'))
  }

  const handleShow = () => {
    if (startDate && endDate) {

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
  return (
    <Container>

      <Stack gap="1rem">

        <div className="flex flex-col px-4">
          <div className="flex justify-between">
            <HeaderBreadcrum
              heading={"LOB-Service-Receipts-Payments"}
              path={["Admin", "LOB-Service-Receipts-Payments"]}
            />
            <div className="flex justify-between gap-7 h-[36px]">
              {showTable && (
                <div className="flex p-2 items-center justify-center rounded border border-[#CBCBCB] text-base font-normal leading-relaxed">
                  <p>
                    Generated on: <span> {new Date().toLocaleString()}</span>
                  </p>
                </div>
              )}
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
          >
            <Stack
              direction={"row"}
              justifyContent={"space-around"}
              alignItems={"center"}
              gap={"24px"}
            >
              <div className="">
                <div className="text-sm">LOB <label className="text-red-500">*</label></div>
                <select className="w-[160px] h-8 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs"
                  name="lob"
                  value={lob}
                  defaultValue="Lob Name"
                  onChange={e => {
                    // fetchCityData(e.target.value);
                    console.log(e.target.value);
                    setLob(e.target.value);
                  }}
                >
                  <option value="none" hidden>Lob Name</option>
                  <option value="all">All</option>
                  {allLOB && allLOB.map(item => (
                    <option value={item.name} >
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
              <DatePicker
                label={"Select Start Date"}
                onChange={handleDateChange}
                name="startDate"
              />
              <DatePicker
                label={"Select End Date"}
                onChange={handleDateChange}
                name="endDate"
              />
              <Button
                variant="outlined"
                //   onClick={handleShow}
                sx={{
                  height: "36px",
                  textTransform: "none",
                  color: "#004DD7",
                  borderRadius: "8px",
                  width: "133px",
                  fontSize: "14px",
                  border: "1px solid #004DD7",
                  fontWeight: "600px",
                  lineHeight: "18.9px",
                  marginTop: "14px",
                  "&:hover": {
                    //you want this to be the same as the backgroundColor above
                    backgroundColor: "#004DD7",
                    color: "#fff",
                  },
                }}
                onClick={handleShow}
                disabled={!(startDate && endDate && lob)}
              >
                Show
              </Button>
            </Stack>
          </Stack>

          <SimpleTableWithFooter
            pageName={'lobreceiptpayments'}
            columns={columns}
            data={lobReceiptPaymentsData}
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
            downloadPdf={downloadPdf}
            height = "calc(100vh - 15rem)"
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

export default LobReceiptPayments;
