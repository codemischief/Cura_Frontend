import { Button, Stack } from "@mui/material";
import HeaderBreadcrum from "../../../Components/common/HeaderBreadcum";
import { useEffect, useMemo, useState } from "react";
import SucessfullModal from "../../../Components/modals/SucessfullModal";
import SimpleTable from "../../../Components/common/table/CustomTable";
import connectionDataColumn from "./Columns";
import SearchBar from "../../../Components/common/SearchBar/SearchBar";

import { useDispatch } from "react-redux";
import {
  downloadPaymentDataXls,
  getOrderPaymentData,
  resetOrderPaymentData,
  setCountPerPage,
  setInitialState,
  setPageNumber,
  setSorting,
} from "../../../Redux/slice/reporting/OrderPaymentSlice";
import { useSelector } from "react-redux";
import DatePicker from "../../../Components/common/select/CustomDate";
import { formatedFilterData } from "../../../utils/filters";
import Container from "../../../Components/common/Container";
import useAuth from "../../../context/JwtContext";
const OrderPaymentList = () => {
  const dispatch = useDispatch();
  const {user} = useAuth();
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
        user_id: user.id,
        startdate: startDate ?? "2021-01-01",
        enddate: endDate ?? "2022-01-01",
        rows: [
          "id",
          "type",
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
        sort_by: sorting.sort_by ? [sorting.sort_by] : undefined,
        order: sorting.sort_order ? sorting.sort_order : undefined,
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
    dispatch(setInitialState());
    dispatch(resetOrderPaymentData());
  }, []);

  useEffect(() => {
    if (searchInput === "") setSearch("");
  }, [searchInput]);

  useEffect(() => {
    if (startDate && endDate) {
      let obj = {
        user_id: user.id,
        startdate: startDate ?? "2021-01-01",
        enddate: endDate ?? "2022-01-01",
        rows: [
          "id",
          "type",
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
        sort_by: sorting.sort_by ? [sorting.sort_by] : undefined,

        filters: formatedFilterData(filter),
        search_key: search,
        pg_no: +pageNo,
        pg_size: +countPerPage,
        order: sorting.sort_order ? sorting.sort_order : undefined,
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

  const downloadExcel = async () => {
    let obj = {
      user_id: user.id,
      startdate: startDate ?? "2021-01-01",
      enddate: endDate ?? "2022-01-01",
      rows: [
        "id",
        "type",
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
      sort_by: sorting.sort_by ? [sorting.sort_by] : undefined,
      downloadType: "excel",
      colmap: {
        id: "ID",
        type: "Type",
        paymentdate: "Payment Date",
        monthyear: "Fiscal Month",
        fy: "Fiscal Year",
        amount: "Amount",
        entityname: "Entity",
        mode_of_payment: "Mode",
        clientid: "Client ID",
        clientname: "Client Name",
        vendorname: "Vendor Name",
        orderid: "Order ID",
        orderdescription: "Order Description",
        serviceid: "Service ID",
        service: "Service",
        lobname: "LOB name",
      },
      filters: formatedFilterData(filter),
      search_key: search,
      pg_no: 0,
      pg_size: 0,
      order: sorting.sort_order ? sorting.sort_order : undefined,
    };
    dispatch(downloadPaymentDataXls(obj));
  };

  const downloadPdf = () => {
    let obj = {
      // user_id: user.id,
      startdate: startDate ?? "2021-01-01",
      enddate: endDate ?? "2022-01-01",
      rows: [
        "id",
        "type",
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
      sort_by: sorting.sort_by ? [sorting.sort_by] : "",
      downloadType: "pdf",
      routename: "/reports/orderPaymentList",
      colmap: {
        id: "ID",
        type: "Type",
        paymentdate: "Payment Date",
        monthyear: "Fiscal Month",
        fy: "Fiscal Year",
        amount: "Amount",
        entityname: "Entity",
        mode_of_payment: "Mode",
        clientid: "Client ID",
        clientname: "Client Name",
        vendorname: "Vendor Name",
        orderid: "Order ID",
        orderdescription: "Order Description",
        serviceid: "Service ID",
        service: "Service",
        lobname: "LOB name",
      },
      filters: formatedFilterData(filter),
      search_key: search,
      pg_no: 0,
      pg_size: 0,
      order: sorting.sort_order ? sorting.sort_order : "",
    };
    dispatch(downloadPaymentDataXls(obj, 'pdf'))
  }

  const handleShow = () => {
    if (startDate && endDate) {
      dispatch(setInitialState());

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
                  marginTop: "14px",
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
            downloadPdf={downloadPdf}
            height="calc(100vh - 15rem)"
          />
        </div>
        {toast && (
          <SucessfullModal
            isOpen={toast}
            message="New Invoice Added Successfully"
            />
          )}
      
          </Stack>
    </Container>
  );
};

export default OrderPaymentList;
