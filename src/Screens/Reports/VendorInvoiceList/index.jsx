import { Button, Stack, Typography } from "@mui/material";
import Navbar from "../../../Components/Navabar/Navbar";
import HeaderBreadcrum from "../../../Components/common/HeaderBreadcum";
import { useEffect, useMemo, useState } from "react";
import ConfirmationModal from "../../../Components/common/ConfirmationModal";
import SucessfullModal from "../../../Components/modals/SucessfullModal";
import SimpleTable from "../../../Components/common/table/CustomTable";
import connectionDataColumn from "./Columns";
import SearchBar from "../../../Components/common/SearchBar/SearchBar";

import { useDispatch } from "react-redux";
import {
  downloadVendorInvoiceDataXls,
  getVendorInvoiceData,
  setCountPerPage,
  setInitialState,
  setPageNumber,
  setSorting,
  setStatus,
} from "../../../Redux/slice/reporting/VendorInvoiceSlice";
import { useSelector } from "react-redux";
import DatePicker from "../../../Components/common/select/CustomDate";
import { formatedFilterData } from "../../../utils/filters";
import * as XLSX from "xlsx";

const VendorInvoiceList = () => {
  const dispatch = useDispatch();
  const {
    VendorInvoiceData,
    status,
    totalCount,
    sorting,
    countPerPage,
    pageNo,
    filter,
  } = useSelector((state) => state.vendorInvoice);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [toast, setToast] = useState(false);
  const columns = useMemo(() => connectionDataColumn(), []);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");

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
    if (startDate && endDate) {
      let obj = {
        user_id: 1234,
        startdate: startDate ?? "2021-01-01",
        enddate: endDate ?? "2022-01-01",
        rows:
          [
            "type",
            "id",
            "invoicedate",
            "monthyear",
            "fy",
            "invoiceamount",
            "entityname",
            "mode",
            "clientid",
            "clientname",
            "vendorname",
            "orderid",
            "briefdescription",
            "serviceid",
            "lobname",
            "service"
          ],
        sort_by: sorting.sort_by ? [sorting.sort_by] : undefined,
        order: sorting.sort_order ? sorting.sort_order : undefined,
        filters: formatedFilterData(filter),
        search_key: search,
        pg_no: +pageNo,
        pg_size: +countPerPage,
      };
      dispatch(getVendorInvoiceData(obj));
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
    if (startDate && endDate) {
      let obj = {
        user_id: 1234,
        startdate: startDate ?? "2021-01-01",
        enddate: endDate ?? "2022-01-01",
        rows: [
          "type",
          "id",
          "invoicedate",
          "monthyear",
          "fy",
          "invoiceamount",
          "entityname",
          "mode",
          "clientid",
          "clientname",
          "vendorname",
          "orderid",
          "briefdescription",
          "serviceid",
          "lobname",
          "service"
        ],
        sort_by: sorting.sort_by ? [sorting.sort_by] : undefined,

        filters: formatedFilterData(filter),
        search_key: search,
        pg_no: +pageNo,
        pg_size: +countPerPage,
        order: sorting.sort_order ? sorting.sort_order : undefined,
      };
      dispatch(getVendorInvoiceData(obj));
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
      startdate: startDate ?? "2021-01-01",
      enddate: endDate ?? "2022-01-01",
      rows: [
        "type",
        "id",
        "invoicedate",
        "monthyear",
        "fy",
        "invoiceamount",
        "entityname",
        "mode",
        "clientid",
        "clientname",
        "vendorname",
        "orderid",
        "briefdescription",
        "serviceid",
        "service",
        "lobname",
      ],
      downloadType: "excel",
      colmap : {
        "id" : "ID",
        "type" : "Type",
        "invoicedate" : "Invoice Date",
        "monthyear" : "Fiscal Month",
        "fy" : "Fiscal Year",
        "invoiceamount" : "Amount",
        "entityname" : "Entity",
        "mode" : "Mode",
        "clientid" : "Client ID",
        "clientname" : "Client Name",
        "vendorname" : "Vendor Name",
        "orderid" : "Order ID",
        "briefdescription" : "Order Description",
        "serviceid" : "Service ID",
        "service" : "Service",
        "lobname" : "LOB name"
      },
      sort_by: sorting.sort_by ? [sorting.sort_by] : undefined,
      filters: formatedFilterData(filter),
      search_key: search,
      pg_no: 0,
      pg_size: 0,
      order: sorting.sort_order ? sorting.sort_order : undefined,
    };
    dispatch(downloadVendorInvoiceDataXls(obj)).then((response) => {
      const tableData = response.data;
      const worksheet = XLSX.utils.json_to_sheet(tableData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
      XLSX.writeFile(workbook, "vendorInvoice.xlsx");
      dispatch(setStatus("success"));
    });
  };

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
    <Stack gap="1rem">
      <Navbar />
      <div className="flex flex-col px-4">
        <div className="flex justify-between">
          <HeaderBreadcrum
            heading={"Vendor Invoice List"}
            path={["Reports", "Lists", "Vendor Invoice List"]}
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
                marginTop: "12px",
                "&:hover": {
                  //you want this to be the same as the backgroundColor above
                  backgroundColor: "#004DD7",
                  color: "#fff",
                },
              }}
              onClick={handleShow}
              disabled={!(startDate && endDate)}
            >
              Show
            </Button>
          </Stack>
        </Stack>

        <SimpleTable
          columns={columns}
          data={VendorInvoiceData}
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
        />
      </div>
    </Stack>
  );
};

export default VendorInvoiceList;
