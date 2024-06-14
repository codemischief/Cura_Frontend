import { Button, Stack } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";

import { useSelector } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import HeaderBreadcrum from "../../../../Components/common/HeaderBreadcum";
import SimpleTableWithFooter from "../../../../Components/common/table/CustomTableWithFooter";
import SearchBar from "../../../../Components/common/SearchBar/SearchBar";
import {
  downloadVendorPaymentPeriodReport,
  getVendorPaymentPeriodView,
  setCountPerPage,
  setInitialState,
  setPageNumber,
  setSorting,
  setStatus,
} from "../../../../Redux/slice/reporting/Group9/VendorPaymentPeriodSlice";
import connectionDataColumn from "./Columns";
import DatePicker from "../../../../Components/common/select/CustomDate";
import { APIService } from "../../../../services/API";
import { formatedFilterData } from "../../../../utils/filters";
import SimpleTable from "../../../../Components/common/table/CustomTable";

const VendorPaymentPeriodView = () => {
  const dispatch = useDispatch();
  const {
    vendorPaymentPeriodData,
    status,
    totalAmount,
    totalCount,
    sorting,
    countPerPage,
    pageNo,
    filter,
  } = useSelector((state) => state.vendorPaymentPeriod);
 
  const [showTable, setShowTable] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [vendorData, setVendor] = useState([]);
  const [search, setSearch] = useState("");
  const [intialFields, setIntialFields] = useState({
    start_date: "",
    end_date: "",
  });

  const columns = useMemo(() => connectionDataColumn(), []);

  const handleSearchvalue = (e) => {
    setSearchInput(e.target.value);
  };

  const handleChange = (e) => {
    let { name, value } = e.target;
    setIntialFields({ ...intialFields, [name]: value });
  };

  const handlePageChange = (value) => {
    dispatch(setPageNumber(value));
  };

  const handlePageCountChange = (e) => {
    dispatch(setCountPerPage(e.target.value));
    dispatch(setPageNumber(1));
  };




  const handleRefresh = () => {
    if (
      intialFields.start_date &&
      intialFields.end_date 
    ) {
      let obj = {
        // user_id: 1234,
        rows: [
          "vendorname","mode_of_payment","registered","vattinno","panno","gstservicetaxno","amount","tds","servicetaxamount"
        ],
      
        
        startdate: intialFields.start_date,
        enddate: intialFields.end_date,
        sort_by: undefined,
        filters: formatedFilterData(filter),
        search_key: search,
        pg_no: +pageNo,
        pg_size: +countPerPage,
        order: undefined,
      };
      dispatch(getVendorPaymentPeriodView(obj));
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
    if (intialFields.start_date && intialFields.end_date) {
      let obj = {
        // user_id: 1234,
        rows: [
          "vendorname","mode_of_payment","registered","vattinno","panno","gstservicetaxno","amount","tds","servicetaxamount"
        ],
       
        
        startdate: intialFields.start_date,
        enddate: intialFields.end_date,
        sort_by: sorting.sort_by ? [sorting.sort_by] : undefined,
        filters: formatedFilterData(filter),
        search_key: search,
        pg_no: +pageNo,
        pg_size: +countPerPage,
        order: sorting.sort_order ? sorting.sort_order : undefined,
      };
      dispatch(getVendorPaymentPeriodView(obj));
    }
  }, [
    filter,
    countPerPage,
    pageNo,
    search,
    sorting.sort_order,
    sorting.sort_by,
  ]);

  useEffect(()=>{
    dispatch(setInitialState());
  },[])
  const handleSortingChange = (accessor) => {
    const sortOrder =
      accessor === sorting.sort_by && sorting.sort_order === "asc"
        ? "desc"
        : "asc";
    dispatch(setSorting({ sort_by: accessor, sort_order: sortOrder }));
  };

  const downloadExcel = async () => {
    let obj = {
      // user_id: 1234,
      rows: [
        "vendorname","mode_of_payment","registered","vattinno","panno","gstservicetaxno","amount","tds","servicetaxamount"
      ],
     
      startdate: intialFields.start_date,
      downloadType: "excel",
      enddate: intialFields.end_date,
      sort_by: sorting.sort_by ? [sorting.sort_by] : undefined,
      filters: formatedFilterData(filter),
      search_key: search,
      pg_no: 0,
      pg_size: 0,
      colmap: {
        vendorname: "Vendor Name",
        mode_of_payment: "Mode of Payment",
        registered: "Registered",
        vattinno: "VAT Tin No",
        panno:"PAN No",
        gstservicetaxno:"Service Tax No.",
        amount:"Total Payment",
        tds :"Total TDS",
        servicetaxamount:"Total Service Tax"
        
      },
      order: sorting.sort_order ? sorting.sort_order : undefined,
    };
    dispatch(downloadVendorPaymentPeriodReport(obj));
  };

  const handleShow = () => {
    if (intialFields.start_date && intialFields.end_date) {
      dispatch(setInitialState());
      setShowTable(true);
    } else {
      setError((prev) => ({
        ...prev,
        year: selectedYear ? prev.year : "please select a year first",
        month: selectedMonth ? prev.month : "please select a year first",
      }));
    }
  };

  return (
    <Stack gap="1rem" sx={{ paddingTop: "20px" }}>
      <div className="flex flex-col px-4">
        <div className="flex justify-between">
          <HeaderBreadcrum
            heading={"Vendor Payment Summary for Period"}
            path={["Reports", " TDS Report", "Vendor Payment Summary for Period"]}
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
            marginLeft={"30px"}
            justifyContent={"space-around"}
            alignItems={"center"}
            gap={"24px"}
          >
           
            
            <div className="flex flex-col h-16 w-[200px]">
              <DatePicker
                label={"Select Start Date"}
                onChange={handleChange}
                name="start_date"
              />
            </div>
            <div className="flex flex-col h-16 w-[200px]">
              <DatePicker
                label={"Select End Date"}
                onChange={handleChange}
                name="end_date"
              />
            </div>

            <Button
              variant="outlined"
              onClick={handleShow}
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
                marginTop: "5px",
                "&:hover": {
                  //you want this to be the same as the backgroundColor above
                  backgroundColor: "#004DD7",
                  color: "#fff",
                },
              }}
              disabled={
                !intialFields.start_date ||
                !intialFields.end_date 
               
                
              }
            >
              Show
            </Button>
          </Stack>
        </Stack>
        <SimpleTable
          columns={columns}
          data={vendorPaymentPeriodData}
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

export default VendorPaymentPeriodView;
