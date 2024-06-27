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
import useAuth from "../../../context/JwtContext";
import RefreshReports from "../../../Components/common/buttons/RefreshReports";
import {
  downloadPmaBillingTrendView,
  getPmaBillingTrendViewData,
  setCountPerPage,
  setInitialState,
  setPageNumber,
  setSorting,
  setStatus,
  resetData,
  resetFilters
} from "../../../Redux/slice/reporting/pmaBillingTrendView"
import { useSelector } from "react-redux";
// import DatePicker from "../../../Components/common/select/CustomDate";
import DatePicker from "react-datepicker";
import 'react-datepicker/dist/react-datepicker.css';
import { formatedFilterData } from "../../../utils/filters";
import * as XLSX from "xlsx";
import Container from "../../../Components/common/Container";

const PmaBillingTrendView = () => {
  const dispatch = useDispatch();
  const {user} = useAuth();
  const {
    pmaBillingTrendView,
    status,
    totalAmount,
    totalCount,
    sorting,
    countPerPage,
    pageNo,
    filter,
  } = useSelector((state) => state.pmaBillingTrendView);

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
        rows: [
          "clientname",
          "property",
          "cm",
          "cm_1",
          "cm_2",
          "cm_3",
          "cm_4",
          "cm_5",  ],
        sort_by: [],
        filters: formatedFilterData(filter),
        search_key: search,
        pg_no: +pageNo,
        pg_size: +countPerPage,
      };
      dispatch(getPmaBillingTrendViewData(obj));
    
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
    
      let obj = {
        user_id: user.id,
        rows: [
          "clientname",
      "property",
      "cm",
      "cm_1",
      "cm_2",
      "cm_3",
      "cm_4",
      "cm_5",  
        
        ],
        sort_by: sorting.sort_by ? [sorting.sort_by] : undefined,
        filters: formatedFilterData(filter),
        search_key: search,
        pg_no: +pageNo,
        pg_size: +countPerPage,
        order: sorting.sort_order ? sorting.sort_order : undefined,
      };
      dispatch(getPmaBillingTrendViewData(obj));
    
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
      rows: [
        "clientname",
        "property",
        "cm",
        "cm_1",
        "cm_2",
        "cm_3",
        "cm_4",
        "cm_5",  
        ],
      sort_by: sorting.sort_by ? [sorting.sort_by] : undefined,
      filters: formatedFilterData(filter),
      downloadType: "excel",
      colmap: {

        "clientname" : "Client Name",
      "property" : "Property Description",
      "cm" : "Current Month", 
      "cm_1" : "Current Month - 1",
      "cm_2" : "Current Month - 2",
      "cm_3" : "Current Month - 3",
      "cm_4" : "Current Month - 4",
      "cm_5" : "Current Month - 5",  
      },
      search_key: search,
      pg_no: 0,
      pg_size: 0,
      order: sorting.sort_order ? sorting.sort_order : undefined,
    };
    dispatch(downloadPmaBillingTrendView(obj))
  };

  const downloadPdf = () => {
    let obj = {
      user_id: user.id,
      rows: ["clientname",
        "property",
        "cm",
        "cm_1",
        "cm_2",
        "cm_3",
        "cm_4",
        "cm_5",  ],
      sort_by: sorting.sort_by ? [sorting.sort_by] : "",
      downloadType: "pdf",
      routename: "/reports/pmaBillingTrendView",
      colmap: {

        "clientname" : "Client Name",
      "property" : "Property Description",
      "cm" : "Current Month", 
      "cm_1" : "Current Month - 1",
      "cm_2" : "Current Month - 2",
      "cm_3" : "Current Month - 3",
      "cm_4" : "Current Month - 4",
      "cm_5" : "Current Month - 5",  
      },
      filters: formatedFilterData(filter),
      search_key: search,
      pg_no: 0,
      pg_size: 0,
      order: sorting.sort_order ? sorting.sort_order : "",
    }; 
    dispatch(downloadPmaBillingTrendView(obj, 'pdf'))
  }

 

  return (
    <Container>

      <Stack gap="1rem">

        <div className="flex flex-col px-4">
          <div className="flex justify-between">
            <HeaderBreadcrum
              heading={"PMA Billing Trend List"}
              path={["Reports", "PMA", "PMA Billing Trend List"]}
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

          <SimpleTableWithFooter
            pageName={'pmaBillingTrendView'}
            columns={columns}
            data={pmaBillingTrendView}
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
            height="calc(100vh - 11rem)"

          />
        </div>
       
      </Stack>
    </Container>
  );
};

export default PmaBillingTrendView;
