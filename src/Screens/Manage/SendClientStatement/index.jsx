import { Button, Stack, Typography } from "@mui/material";
import Navbar from "../../../Components/Navabar/Navbar";
import HeaderBreadcrum from "../../../Components/common/HeaderBreadcum";
import { useEffect, useMemo, useState } from "react";
import ConfirmationModal from "../../../Components/common/ConfirmationModal";
import SucessfullModal from "../../../Components/modals/SucessfullModal";
import SimpleTable from "../../../Components/common/table/ClientPortalTable";
import connectionDataColumn from "./Columns";
import SearchBar from "../../../Components/common/SearchBar/SearchBar";
import CustomButton from "../../../Components/common/CustomButton";
import AsyncSelect from "react-select/async";
import { APIService } from '../../../services/API';

import { useDispatch } from "react-redux";
import {
  downloadReceiptDataXls,
  getOrderReceiptData,
  setCountPerPage,
  setPageNumber,
  setSorting,
  setStatus,
} from "../../../Redux/slice/reporting/OrderReceiptSlice";
import { useSelector } from "react-redux";
import DatePicker from "../../../Components/common/select/CustomDate";
import { formatedFilterData } from "../../../utils/filters";
import * as XLSX from "xlsx";

const OrderReceiptList = () => {
  const dispatch = useDispatch();
  const {
    orderReceiptData,
    status,
    totalCount,
    sorting,
    countPerPage,
    pageNo,
    filter,
  } = useSelector((state) => state.orderReceipt);
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
        rows: [
          "type",
          "id",
          "recddate",
          "monthyear",
          "fy",
          "amount",
          "entityname",
          "paymentmode",
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
      dispatch(getOrderReceiptData(obj));
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
          "recddate",
          "monthyear",
          "fy",
          "amount",
          "entityname",
          "paymentmode",
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
      dispatch(getOrderReceiptData(obj));
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
        "recddate",
        "monthyear",
        "fy",
        "amount",
        "entityname",
        "paymentmode",
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
        "type": "Type",
        "id": "ID",
        "recddate": "Received Date",
        "monthyear": "Fiscal Month",
        "fy": "Fiscal year",
        "amount": "Amount",
        "entityname": "Entity",
        "paymentmode": "Mode",
        "clientid": "Client ID",
        "clientname": "Client Name",
        "vendorname": "Vendor Name",
        "orderid": "Order ID",
        "orderdescription": "Order Description",
        "serviceid": "Service ID",
        "service": "Service",
        "lobname": "LOB Name"
      },
      filters: formatedFilterData(filter),
      search_key: search,
      pg_no: 0,
      pg_size: 0,
      order: sorting.sort_order ? sorting.sort_order : undefined,
    };
    dispatch(downloadReceiptDataXls(obj)).then((response) => {
      const tableData = response.data;
      const worksheet = XLSX.utils.json_to_sheet(tableData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
      XLSX.writeFile(workbook, "OrderPaymentList.xlsx");
      dispatch(setStatus("success"));
    });
  };

  const handleShow = () => {

    let obj = {
      user_id: 1234,
      startdate: "2020-01-01",
      enddate: "2022-01-01",
      rows: [
        "id",
        "type",
        "recddate",
        "fy",
        "monthyear",
        "amount",
        "entityname",
        "paymentmode",
        "clientid",
        "clientname",
        "orderid",
        "orderdescription",
        "serviceid",
        "service",
        "lobname"
      ],
      sort_by: ["id"],
      order: "desc",
      filters: [],
      search_key: "",
      pg_no: 1,
      pg_size: 15,
    };
    dispatch(getOrderReceiptData(obj));
    setShowTable(true);
  };

  const [query, setQuery] = useState('')

  const [selectedOption, setSelectedOption] = useState({
    label: "Enter Client Name",
    value: null
  });

  const handleClientNameChange = (e) => {
    console.log('hey')
    console.log(e)

    setSelectedOption(e)
  }

  const loadOptions = async (e) => {
    console.log(e)
    if (e.length < 3) return;
    const data = {
      "user_id": 1234,
      "pg_no": 0,
      "pg_size": 0,
      "search_key": e
    }
    const response = await APIService.getClientAdminPaginated(data)
    const res = await response.json()
    const results = res.data.map(e => {
      return {
        label: e[1],
        value: e[0]
      }
    })
    if (results === 'No Result Found') {
      return []
    }
    return results
  }

  return (
    <Stack gap="1rem">
      <Navbar />
      <div className="flex flex-col px-4">
        <div className="flex justify-between">
          <HeaderBreadcrum
            heading={"Send Client Statement"}
            path={["Manage", "Send Client Statement"]}
          />
          <div className="flex justify-between gap-7 h-[36px]">
            <SearchBar
              value={searchInput}
              handleSearchvalue={handleSearchvalue}
              handleSearch={handleSearch}
              removeSearchValue={removeSearchValue}
              onKeyDown={handleSearchEnterKey}
            />
            {showTable && (
              <CustomButton
                title="Send Client Statement"
                onClick={() => {
                  showTable && setOpenModal(true);
                }}
              />
            )}
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
              <div className="text-[13px]">
                Client <label className="text-red-500">*</label>
              </div>
              <AsyncSelect
                onChange={handleClientNameChange}
                value={selectedOption}
                loadOptions={loadOptions}
                cacheOptions
                defaultOptions
                onInputChange={(value) => setQuery(value)}

                styles={{
                  control: (provided, state) => ({
                    ...provided,
                    minHeight: 23,
                    lineHeight: '0.8',
                    height: 28,
                    width: 200,
                    fontSize: 10,
                    // padding: '1px'
                  }),
                  // indicatorSeparator: (provided, state) => ({
                  //   ...provided,
                  //   lineHeight : '0.5',
                  //   height : 2,
                  //   fontSize : 12 // hide the indicator separator
                  // }),
                  dropdownIndicator: (provided, state) => ({
                    ...provided,
                    padding: '1px', // adjust padding for the dropdown indicator
                  }),
                  options: (provided, state) => ({
                    ...provided,
                    fontSize: 10// adjust padding for the dropdown indicator
                  }),
                  menu: (provided, state) => ({
                    ...provided,
                    width: 230, // Adjust the width of the dropdown menu
                  }),
                }}
              />
            </div>

            <div className="">
              <div className="text-sm">From <label className="text-red-500">*</label></div>
              <input className="w-40 h-7 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs" name="amount" />
            </div>

            <div className="">
              <div className="text-sm">To <label className="text-red-500">*</label></div>
              <input className="w-40 h-7 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs" name="amount" />
            </div>

            {/* <DatePicker
              label={"Select Start Date"}
              onChange={handleDateChange}
              name="startDate"
            />
            <DatePicker
              label={"Select End Date"}
              onChange={handleDateChange}
              name="endDate"
            /> */}
            <Button
              variant="outlined"
              //   onClick={handleShow}
              sx={{
                height: "36px",
                textTransform: "none",
                color: "#004DD7",
                borderRadius: "8px",
                width: "200px",
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
            // disabled={!(startDate && endDate)}
            >
              View Statement
            </Button>
          </Stack>
        </Stack>


        {showTable && <div className="py-1">
          <div className="font-semibold mb-2 text-base ">
            Statement of Account
          </div>
          <Stack
            spacing={0.5}
          >
            <Stack
              direction={"row"}
              alignItems={"center"}
            >
              <div className="border-b-2 space-x-36 w-full text-xs px-2 font-medium flex  items-center py-0.5">
                <div className="">Client Name</div>
                <div className=""></div>
              </div>
            </Stack>
            <Stack
              direction={"row"}
              alignItems={"center"}
            >
              <div className="border-b-2 space-x-36 w-full text-xs px-2 font-medium flex  items-center py-0.5">
                <div className="">Data Range</div>
                <div className=""></div>
              </div>
            </Stack>
            <Stack
              direction={"row"}
              alignItems={"center"}
            >
              <div className="border-b-2 space-x-36 w-full text-xs px-2 font-medium flex  items-center py-0.5">
                <div className="">Opening Balance</div>
                <div className=""></div>
              </div>
            </Stack>
            <Stack
              direction={"row"}
              alignItems={"center"}
            >
              <div className="border-b-2 space-x-36 w-full text-xs px-2 font-medium flex  items-center py-0.5">
                <div className="">Current Balance</div>
                <div className=""></div>
              </div>
            </Stack>
          </Stack>
        </div>
        }

        <SimpleTable
          columns={columns}
          data={orderReceiptData}
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
      {toast && (
        <SucessfullModal
          isOpen={toast}
          message="New Receipt Added Successfully"
        />
      )}
    </Stack>
  );
};

export default OrderReceiptList;
