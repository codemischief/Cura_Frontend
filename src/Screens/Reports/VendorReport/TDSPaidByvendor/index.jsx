import { Button, Stack } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";

import { useSelector } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";
import HeaderBreadcrum from "../../../../Components/common/HeaderBreadcum";
import SimpleTableWithFooter from "../../../../Components/common/table/CustomTableWithFooter";
import SearchBar from "../../../../Components/common/SearchBar/SearchBar";
import {
  downloadVendorStatementReport,
  getVendorStatementView,
  setCountPerPage,
  setInitialState,
  setPageNumber,
  setSorting,
  setStatus,
} from "../../../../Redux/slice/reporting/Group9/VendorStatement";
import connectionDataColumn from "./Columns";
import DatePicker from "../../../../Components/common/select/CustomDate";
import { APIService } from "../../../../services/API";
import { formatedFilterData } from "../../../../utils/filters";

const TdsPaidByVendorView = () => {
  const dispatch = useDispatch();
  const {
    vendorStatementView,
    status,
    totalAmount,
    totalCount,
    sorting,
    countPerPage,
    pageNo,
    filter,
  } = useSelector((state) => state.vendorStatement);
 
  const [showTable, setShowTable] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [vendorData, setVendor] = useState([]);
  const [search, setSearch] = useState("");
  const [intialFields, setIntialFields] = useState({
    start_date: "",
    end_date: "",
    vendor: "",
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

  const getVendor = async () => {
    const data = {
      user_id: 1234,
    };
    const vendor = await APIService.getVendorAdmin(data);
    console.log(vendor,"vendor");
    setVendor((await vendor.json()).data);
  };

  useState(() => {
    getVendor();
  }, []);

  const handleRefresh = () => {
    if (
      intialFields.start_date &&
      intialFields.end_date &&
      intialFields.vendor
    ) {
      let obj = {
        user_id: 1234,
        rows: [
          "type","id","clientname","invoicedate_orderpaymentdate","invoiceamount_orderpaymentamount",
          "estimatedescription_orderdescription","monthyear","modeofpayment","entityname"
        ],
        vendorID: !isNaN(+intialFields.vendor)
          ? +intialFields.vendor
          : intialFields.vendor,
        
        startdate: intialFields.start_date,
        enddate: intialFields.end_date,
        sort_by: undefined,
        filters: formatedFilterData(filter),
        search_key: search,
        pg_no: +pageNo,
        pg_size: +countPerPage,
        order: undefined,
      };
      dispatch(getVendorStatementView(obj));
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
    if (intialFields.start_date && intialFields.end_date && intialFields.vendor) {
      let obj = {
        user_id: 1234,
        rows: [
          "type","id","clientname","invoicedate_orderpaymentdate","invoiceamount_orderpaymentamount",
          "estimatedescription_orderdescription","monthyear","modeofpayment","entityname"
        ],
        vendorID: !isNaN(+intialFields.vendor)
          ? +intialFields.vendor
          : intialFields.vendor,
        
        startdate: intialFields.start_date,
        enddate: intialFields.end_date,
        sort_by: sorting.sort_by ? [sorting.sort_by] : undefined,
        filters: formatedFilterData(filter),
        search_key: search,
        pg_no: +pageNo,
        pg_size: +countPerPage,
        order: sorting.sort_order ? sorting.sort_order : undefined,
      };
      dispatch(getVendorStatementView(obj));
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
      user_id: 1234,
      rows: [
        "type","id","clientname","invoicedate_orderpaymentdate","invoiceamount_orderpaymentamount",
          "estimatedescription_orderdescription","monthyear","modeofpayment","entityname"
      ],
      paymentMode: !isNaN(+intialFields.vendor)
        ? +intialFields.vendor
        : intialFields.vendor,
     
      startdate: intialFields.start_date,
      downloadType: "excel",
      enddate: intialFields.end_date,
      sort_by: sorting.sort_by ? [sorting.sort_by] : undefined,
      filters: formatedFilterData(filter),
      search_key: search,
      pg_no: 0,
      pg_size: 0,
      colmap: {
        type: "Type",
        id: "ID",
        clientname: "Client Name",
        
        invoicedate_orderpaymentdate: "Date",
        invoiceamount_orderpaymentamount:"Amount",
        estimatedescription_orderdescription:"Estimate / Order Description",
        monthyear:"Month-Year",
        modeofpayment :"Mode of Payment",
        entityname:"Entity"
        
      },
      order: sorting.sort_order ? sorting.sort_order : undefined,
    };
    dispatch(downloadVendorStatementReport(obj));
  };

  const handleShow = () => {
    if (intialFields.start_date && intialFields.end_date && intialFields.vendor) {
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
            heading={"Vendor Statement"}
            path={["Reports", "Vendor", "Vendor Statement"]}
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
              <label className="font-sans text-sm font-normal leading-5">
                Vendor
              </label>

              <select
                className="w-full max-h-[224px] h-8 border-[1px] border-[#C6C6C6] bg-white rounded-sm px-3 text-xs outline-none"
                name="vendor"
                value={intialFields.vendor}
                onChange={handleChange}
              >
                <option selected value={""} >Select Vendor</option>
                <option value="all">all</option>
                {vendorData.map((opt) => (
                  <option value={opt[0]}>{opt[1]}</option>
                ))}
              </select>
            </div>
            
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
                marginTop: "12px",
                "&:hover": {
                  //you want this to be the same as the backgroundColor above
                  backgroundColor: "#004DD7",
                  color: "#fff",
                },
              }}
              disabled={
                !intialFields.start_date ||
                !intialFields.end_date ||
                !intialFields.vendor 
                
              }
            >
              Show
            </Button>
          </Stack>
        </Stack>
        <SimpleTableWithFooter
          pageName={"vendorStatement"}
          columns={columns}
          data={vendorStatementView}
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

export default TdsPaidByVendorView;
