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
  dowmloadOrderAnalysis,
  getorderAnalysis,
  setCountPerPage,
  setPageNumber,
  setSorting,
  setInitialState,
  setStatus,
} from "../../../Redux/slice/reporting/OrderAnalysis/OrderAnalysis";
import { useSelector } from "react-redux";
import DatePicker from "../../../Components/common/select/CustomDate";
import { formatedFilterData } from "../../../utils/filters";
import * as XLSX from "xlsx";
import Container from "../../../Components/common/Container";
import { APIService } from "../../../services/API";
import AsyncSelect from "react-select/async";

const OrderAnalysis = () => {
  const dispatch = useDispatch();
  const {
    orderAnalysis,
    status,
    totalCount,
    sorting,
    countPerPage,
    pageNo,
    filter,
  } = useSelector((state) => state.orderAnalysis);
  const [showTable, setShowTable] = useState(false);
  const [toast, setToast] = useState(false);
  const columns = useMemo(() => connectionDataColumn(), []);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [data, setData] = useState({
    Lob: [],
    Status: [],
    Service: [],
    Client: [
      {
        label: "Select Client ID",
        value: null,
      },
    ],
  });
  const [query, setQuery] = useState("");
  const [intialValue, setIntialValue] = useState({
    lobname: "",
    status: "",
    service: "",
    client: {
      value:"",
      label:""
    },
  });

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

  const lobDatafetch = async () => {
    const data = {
      user_id: 1234,
      rows: ["id", "name"],
      filters: [],
      sort_by: [],
      order: "asc",
      pg_no: 0,
      pg_size: 0,
    };
    const response = await APIService.getLob(data);
    const result = await response.json();
    setData((prev) => ({ ...prev, Lob: [...result.data] }));
  };

  const loadOptions = async (e) => {
    if (e.length < 2) return;
    const data = {
      user_id: 1234,
      pg_no: 0,
      pg_size: 0,
      search_key: e,
    };
    const response = await APIService.getClientAdminPaginated(data);

    const res = await response.json();

    const results = res.data.map((e) => {
      return {
        label: e[1],
        value: e[1],
      };
    });

    if (results === "No Result Found") {
      return [];
    }
    return results;
  };

  const statusFetch = async () => {
    const data = {
      user_id: 1234,
    };
    const response = await APIService.getPaymentStatusAdmin(data);
    const result = await response.json();
    console.log(result.data, "Status");
    setData((prev) => ({ ...prev, Status: [...result.data] }));
  };

  const serviceFetch = async () => {
    const data = { user_id: 1234 };
    const response = await APIService.getServiceAdmin(data);
    const res = await response.json();
    setData((prev) => ({ ...prev, Service: [...res.data] }));
  };


  useEffect(() => {
    statusFetch();
    serviceFetch();
    lobDatafetch();
    dispatch(setInitialState())

  }, []);

  const handleRefresh = () => {
    if (intialValue.status && intialValue.client && intialValue.lobname && intialValue.service) {
      let obj = {
        user_id: 1234,
        rows: ["service",
          "clientname",
          "orderid",
          "orderdescription",
          "orderstatus",
          "totalorderpayment",
          "totalinvoiceamt",
          "totalorderreceipt"],
        lobName: !isNaN(+intialValue.lobname)
          ? +intialValue.lobname
          : intialValue.lobname,
        statusName: intialValue.status,
        serviceName: intialValue.service,
        clientName: intialValue.client.value,
        sort_by: sorting.sort_by ? [sorting.sort_by] : undefined,
        order: sorting.sort_order ? sorting.sort_order : undefined,
        filters: formatedFilterData(filter),
        search_key: search,
        pg_no: +pageNo,
        pg_size: +countPerPage,
      };
      dispatch(getorderAnalysis(obj));
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
    if (intialValue.status && intialValue.client && intialValue.lobname && intialValue.service) {
      let obj = {
        user_id: 1234,
        lobName: intialValue.lobname,
        statusName: intialValue.status,
        serviceName: intialValue.service,
        clientName: intialValue.client.value,
        rows: [
          "service",
          "clientname",
          "orderid",
          "orderdescription",
          "orderstatus",
          "totalorderpayment",
          "totalinvoiceamt",
          "totalorderreceipt",
        ],
        sort_by: sorting.sort_by ? [sorting.sort_by] : undefined,
        filters: formatedFilterData(filter),
        search_key: search,
        pg_no: +pageNo,
        pg_size: +countPerPage,
        order: sorting.sort_order ? sorting.sort_order : undefined,
      };
      dispatch(getorderAnalysis(obj));
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

  const handleChange = (e) => {
    const { name, value } = e.target
    setIntialValue({ ...intialValue, [name]: value })
  }

  const downloadExcel = async () => {
    let obj = {
      user_id: 1234,

      rows: [
        "service",
        "clientname",
        "orderid",
        "orderdescription",
        "orderstatus",
        "totalorderpayment",
        "totalinvoiceamt",
        "totalorderreceipt",
      ],
      lobName: !isNaN(+intialValue.lobname)
        ? +intialValue.lobname
        : intialValue.lobname,
      statusName: intialValue.status,
      serviceName: intialValue.service,
      clientName: intialValue.client?.value,
      sort_by: sorting.sort_by ? [sorting.sort_by] : undefined,
      downloadType: "excel",
      colmap: {
        service: "Service",
        clientname: "Client Name",
        orderid: "Order ID",
        orderdescription: "Order Description",
        orderstatus: "Order Status",
        totalorderpayment: "OP Amount",
        totalinvoiceamt: "OI Amount",
        totalorderreceipt: "OP Amount",
      },
      filters: formatedFilterData(filter),
      search_key: search,
      pg_no: 0,
      pg_size: 0,
      order: sorting.sort_order ? sorting.sort_order : undefined,
    };
    dispatch(dowmloadOrderAnalysis(obj))
  };

  const handleShow = () => {
   dispatch(setInitialState())
   setShowTable(true)
  };
  
  const handleClient = (value)=>{
    setIntialValue({...intialValue,client:value})
  }
  console.log(intialValue,"valuekjfn");

  return (
    <Container>
      <Stack gap="1rem">
        <div className="flex flex-col px-4">
          <div className="flex justify-between">
            <HeaderBreadcrum
              heading={"Order Analysis"}
              path={["Reports", "Orders", "Order Analysis"]}
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
              <div className="flex flex-col h-16 w-[200px]">
                <label className="font-sans text-sm font-normal leading-5">
                  LOB Name
                </label>

                <select
                  className="w-full max-h-[224px] h-8 border-[1px] border-[#C6C6C6] bg-white rounded-sm px-3 text-xs outline-none"
                  name="lobname"
                  value={intialValue.lobname}
                  onChange={handleChange}
                >
                  <option selected value={""} className="hidden">
                    Select LOB
                  </option>
                  <option value="all">all</option>

                  {data.Lob.map((opt) => (
                    <option value={opt.name}>{opt.name}</option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col h-16 w-[200px]">
                <label className="font-sans text-sm font-normal leading-5">
                  Select status
                </label>

                <select
                  className="w-full max-h-[224px] h-8 border-[1px] border-[#C6C6C6] bg-white rounded-sm px-3 text-xs outline-none"
                  name="status"
                  value={intialValue.status}
                  onChange={handleChange}
                >
                  <option selected value={""} className="hidden">Select Status</option>
                  <option value="all">all</option>
                  {data.Status.map((opt) => (
                    <option value={opt.status}>{opt.status}</option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col h-16 w-[200px]">
                <label className="font-sans text-sm font-normal leading-5">
                  Select Service
                </label>

                <select
                  className="w-full max-h-[224px] h-8 border-[1px] border-[#C6C6C6] bg-white rounded-sm px-3 text-xs outline-none"
                  name="service"
                  value={intialValue.service}
                  onChange={handleChange}
                >
                  <option selected value={""} className="hidden">Select Service</option>
                  <option value="all">all</option>
                  {data.Service.map((opt) => (
                    <option value={opt[1]}>{opt[1]}</option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col h-16 w-[200px]">
                <div className="text-[13px]">Client Name </div>
                <AsyncSelect
                  onChange={handleClient}
                  value={intialValue.client}
                  name={"client"}
                  loadOptions={loadOptions}
                  cacheOptions
                  defaultOptions
                  onInputChange={(value) => setQuery(value)}
                  styles={{
                    control: (provided, state) => ({
                      ...provided,
                      minHeight: 30,
                      lineHeight: "0.8",
                      height: 8,
                      width: 180,
                      fontSize: 10,
                      // padding: '1px'
                    }),

                    dropdownIndicator: (provided, state) => ({
                      ...provided,
                      padding: "1px", // adjust padding for the dropdown indicator
                    }),

                    option: (provided, state) => ({
                      ...provided,
                      padding: "2px 10px", // Adjust padding of individual options (top/bottom, left/right)
                      margin: 0, // Ensure no extra margin
                      fontSize: 10, // Adjust font size of individual options
                    }),
                    menu: (provided, state) => ({
                      ...provided,
                      width: 180, // Adjust the width of the dropdown menu
                      zIndex: 9999, // Ensure the menu appears above other elements
                    }),
                    menuList: (provided, state) => ({
                      ...provided,
                      padding: 0, // Adjust padding of the menu list
                      fontSize: 10,
                      maxHeight: 150, // Adjust font size of the menu list
                    }),
                  }}
                />
              </div>
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
                disabled={!(intialValue.status && intialValue.client && intialValue.lobname && intialValue.service)}
              >
                Show
              </Button>
            </Stack>
          </Stack>

          <SimpleTable
            columns={columns}
            data={orderAnalysis}
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
    </Container>
  );
};

export default OrderAnalysis;
