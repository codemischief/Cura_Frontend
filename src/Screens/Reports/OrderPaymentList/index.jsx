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
  getOrderPaymentData,
  setCountPerPage,
  setPageNumber,
  setSorting,
} from "../../../Redux/slice/reporting/OrderPaymentSlice";
import { useSelector } from "react-redux";
import DatePicker from "../../../Components/common/select/CustomDate";
import { formatedFilterData } from "../../../utils/filters";
import * as XLSX from "xlsx";

const OrderPaymentList = () => {
  const dispatch = useDispatch();
  const {
    orderPaymentData,
    status,
    totalCount,
    sorting,
    countPerPage,
    pageNo,
    filter,
  } = useSelector((state) => state.orderPayment);
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
    dispatch(setPageNumber(1))
  };

  const handleRefresh = () => {
    if (startDate && endDate) {
      let obj = {
        user_id: 1234,
        startdate: startDate ?? "2021-01-01",
        enddate: endDate ?? "2022-01-01",
        rows: [
          "paymentdate",
          "monthyear",
          "fy",
          "amount",
          "entityname",
          "mode_of_payment",
          "clientid",
          "clientname",
          "vendorname",
          "orderid",
          "orderdescription",
          "serviceid",
          "service",
          "lobname",
        ],
        sort_by: ["id"],
       
        filters: formatedFilterData(filter),
        search_key: search,
        pg_no: +pageNo,
        pg_size: +countPerPage,
      };
      dispatch(getOrderPaymentData(obj));
    }
  };

  const handleSearch = () => {
    setSearch(searchInput);
  };

  const removeSearchValue = () => {
    setSearch("");
    setSearchInput("");
  };

  useEffect(() => {
    if (startDate && endDate) {
      let obj = {
        user_id: 1234,
        startdate: startDate ?? "2021-01-01",
        enddate: endDate ?? "2022-01-01",
        rows: [
          "paymentdate",
          "monthyear",
          "fy",
          "amount",
          "entityname",
          "mode_of_payment",
          "clientid",
          "clientname",
          "vendorname",
          "orderid",
          "orderdescription",
          "serviceid",
          "service",
          "lobname",
        ],
        sort_by: sorting.sort_by ? [sorting.sort_by]: undefined,
        
        filters: formatedFilterData(filter),
        search_key: search,
        pg_no: +pageNo,
        pg_size: +countPerPage,
        sort_order: sorting.sort_order ? sorting.sort_order:undefined
      };
      dispatch(getOrderPaymentData(obj));
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

  const downloadExcel = () => {
    const tableData = orderPaymentData;
    const worksheet = XLSX.utils.json_to_sheet(tableData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, "orderPayment.xlsx");
  };

  const handleShow = () => {
    if (startDate && endDate) {
      let obj = {
        user_id: 1234,
        startdate: startDate ?? "2021-01-01",
        enddate: endDate ?? "2022-01-01",
        rows: [
          "paymentdate",
          "monthyear",
          "fy",
          "amount",
          "entityname",
          "mode_of_payment",
          "clientid",
          "clientname",
          "vendorname",
          "orderid",
          "orderdescription",
          "serviceid",
          "service",
          "lobname",
        ],
        sort_by: ["id"],
        order: "desc",
        filters: [],
        search_key: "",
        pg_no: 1,
        pg_size: 15,
      };
      dispatch(getOrderPaymentData(obj));
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
      <div className="flex flex-col p-4">
        <div className="flex justify-between">
          <HeaderBreadcrum
            heading={"Order Payment List"}
            path={["Reports", "Lists", "Order Payment List"]}
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
                marginTop: "4px",
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
          data={orderPaymentData}
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
      <ConfirmationModal
        open={openModal}
        loading={false}
        btnTitle="Confirm"
        onClose={() => {
          setOpenModal(false);
        }}
        onSubmit={() => {
          // hadleConfirm();
        }}
        title="Generate New Invoices"
        description={
          <Typography
            sx={{
              fontFamily: "Open Sans",
              fontSize: "14px",
              fontStyle: "normal",
              fontWeight: 400,
              lineHeight: "150%" /* 21px */,
              color: "#282828",
            }}
          >
            Are you sure you want to generate new invoices?
          </Typography>
        }
      />
      {toast && (
        <SucessfullModal
          isOpen={toast}
          message="New Invoice Added Successfully"
        />
      )}
    </Stack>
  );
};

export default OrderPaymentList;
