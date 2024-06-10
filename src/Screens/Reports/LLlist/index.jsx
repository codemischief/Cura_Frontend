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
  downloadLLlist,
  getLLlist,
  setCountPerPage,
  setPageNumber,
  setSorting,
  setStatus,
  setInitialState
} from "../../../Redux/slice/reporting/LLlist/LllistSlice";
import { useSelector } from "react-redux";
import DatePicker from "../../../Components/common/select/CustomDate";
import { formatedFilterData } from "../../../utils/filters";
import * as XLSX from "xlsx";
import Container from "../../../Components/common/Container";
import { APIService } from "../../../services/API";
import AsyncSelect from "react-select/async";

const LLlistReport = () => {
  const dispatch = useDispatch();
  const {
    LLlist,
    status,
    totalCount,
    sorting,
    countPerPage,
    pageNo,
    filter,
  } = useSelector((state) => state.LLlist);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [showTable, setShowTable] = useState(false);
  const [toast, setToast] = useState(false);
  const columns = useMemo(() => connectionDataColumn(), []);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [data, setData] = useState({
    StatusData: [],
    ClientData: [
      {
        label: "Select Client", value: ""
      }
    ],
    ClientPropertyData: [],
    TypeData: [],
  });

  const [statusDropdown, setStatusDropdown] = useState([
    {
        id: 1,
        type: "Active"
    },
    {
        id: 2,
        type: "Inactive"
    },
    
]);

  const [query, setQuery] = useState("");

  const [intialValue, setIntialValue] = useState({
    status: "",
    clientId: {
      label: "select Client Name",
      value: ""
    },
    clientProperty: "",
    type: "",
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
        value: e[0],
      };
    })

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
    setData((prev) => ({ ...prev, StatusData: [...result.data] }));
  };


  const typeFetch = async () => {
    const data = { user_id: 1234 };
    const response = await APIService.getClientTypeAdmin(data);
    const res = await response.json();
    setData((prev) => ({ ...prev, TypeData: [...res.data] }));
  }



  useEffect(() => {
    statusFetch();
    typeFetch();
    dispatch(setInitialState())
  }, []);

  const handleRefresh = () => {
    if (intialValue.clientId && intialValue.status && intialValue.type) {
      let obj = {
        user_id: 1234,
        startdate: startDate ?? "2021-01-01",
        enddate: endDate ?? "2022-01-01",
        rows: ["clienttypename", "startdate", "actualenddate", "startdatemonthyear",
          "enddatemonthyear", "paymentcycle", "rentamount", "depositamount", "entityname",
          "clientid", "propertydescription", "property_status", "status",
          "registrationtype", "noticeperiodindays", "type", "id"],
        sort_by: sorting.sort_by ? [sorting.sort_by] : undefined,
        order: sorting.sort_order ? sorting.sort_order : undefined,
        filters: formatedFilterData(filter),
        search_key: search,
        pg_no: +pageNo,
        pg_size: +countPerPage,
        statusName: intialValue.status,
        clientName: intialValue.clientId.label,
        typeName: intialValue.type,
        clientPropertyID: intialValue.clientProperty,
      };
      dispatch(getLLlist(obj));
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
    if (intialValue.clientId && intialValue.status && intialValue.type) {
      let obj = {
        user_id: 1234,
        rows: [
          "clienttypename", "startdate", "actualenddate", "startdatemonthyear",
          "enddatemonthyear", "paymentcycle", "rentamount", "depositamount", "entityname",
          "clientid", "propertydescription", "property_status", "status",
          "registrationtype", "noticeperiodindays", "type", "id"
        ],
        sort_by: sorting.sort_by ? [sorting.sort_by] : undefined,
        filters: formatedFilterData(filter),
        statusName: intialValue.status,
        clientName: intialValue.clientId.label,
        typeName: intialValue.type,
        clientPropertyID: intialValue.clientProperty,
        search_key: search,
        pg_no: +pageNo,
        pg_size: +countPerPage,
        order: sorting.sort_order ? sorting.sort_order : undefined,
      };
      dispatch(getLLlist(obj));
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

  const handleClient = async (value) => {
    const data = { user_id: 1234, "client_id": value.value, };
    const response = await APIService.getClientPropertyByClientId(data);
    const res = await response.json();
    console.log(res, "resresresresres");
    setData((prev) => ({ ...prev, ClientPropertyData: [...res.data] }));
    setIntialValue({ ...intialValue, clientId: value })


  }

  const downloadExcel = async () => {
    let obj = {
      user_id: 1234,
      startdate: startDate ?? "2021-01-01",
      enddate: endDate ?? "2022-01-01",
      rows: [
        "clienttypename", "startdate", "actualenddate", "startdatemonthyear",
          "enddatemonthyear", "paymentcycle", "rentamount", "depositamount", "entityname",
          "clientid", "propertydescription", "property_status", "status",
          "registrationtype", "noticeperiodindays", "type", "id"
      ],
      sort_by: sorting.sort_by ? [sorting.sort_by] : undefined,
      downloadType: "excel",
      colmap: {
        type: "Type",
        id: "ID",
        startdate:'Start Date',
        actualenddate:"End Date",
        startdatemonthyear:"StartDate Fiscal Month",
        enddatemonthyear:'EndDate Fiscal Month',
        rentamount:"Rent",
        depositamount:"Deposit",
        entityname:"Entity",
        clientid:"Client ID",
        clienttypename:"Client Name",
        propertydescription:"Property Description",
        property_status:"Property Status",
        status:"Status",
        registrationtype:"Registration Type",
        paymentcycle:"Payment Cycle",
        noticeperiodindays:"Notice Period In Days"

      },
      statusName: intialValue.status,
      clientName: intialValue.clientId.label,
      typeName: intialValue.type,
      clientPropertyID:intialValue.clientProperty,
      filters: formatedFilterData(filter),
      search_key: search,
      pg_no: 0,
      pg_size: 0,
      order: sorting.sort_order ? sorting.sort_order : undefined,
    };
    dispatch(downloadLLlist(obj))
  };


  const handleShow = () => {
    dispatch(setInitialState())
    setShowTable(true)
  };
  return (
    <Container>
      <Stack gap="1rem">
        <div className="flex flex-col px-4">
          <div className="flex justify-between">
            <HeaderBreadcrum
              heading={"L and L List"}
              path={["Reports", "Lists", "L and L List"]}
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
                  Select status
                </label>

                <select
                  className="w-full max-h-[224px] h-8 border-[1px] border-[#C6C6C6] bg-white rounded-sm px-3 text-xs outline-none"
                  name="status"
                  value={intialValue.status}
                  onChange={handleChange}
                >
                  <option selected value={""} className="hidden">Select Status</option>
                  {/* <option value="all">all</option> */}
                  {statusDropdown.map((opt) => (
                    <option value={opt.type}>{opt.type}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col h-16 w-[200px]">
                <div className="text-[13px]">Client Name </div>
                <AsyncSelect
                  onChange={handleClient}
                  value={intialValue.clientId}
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
              <div className="flex flex-col h-16 w-[200px]">
                <label className="font-sans text-sm font-normal leading-5">
                  Client Property
                </label>

                <select
                  className="w-full max-h-[224px] h-8 border-[1px] border-[#C6C6C6] bg-white rounded-sm px-3 text-xs outline-none"
                  name="clientProperty"
                  value={intialValue.clientProperty}
                  onChange={handleChange}
                >
                  <option selected value={""} className="hidden">Select Client Property</option>
                  {data.ClientPropertyData.map((opt) => (
                    <option value={opt.id}>{opt.propertyname}</option>
                  ))}
                </select>
              </div>
              <div className="flex flex-col h-16 w-[200px]">
                <label className="font-sans text-sm font-normal leading-5">
                  Type
                </label>

                <select
                  className="w-full max-h-[224px] h-8 border-[1px] border-[#C6C6C6] bg-white rounded-sm px-3 text-xs outline-none"
                  name="type"
                  value={intialValue.type}
                  onChange={handleChange}
                >
                  <option selected value={""} className="hidden">Select Client Property</option>
                  <option selected value={"all"} >all</option>

                  {data.TypeData.map((opt) => (
                    <option value={opt.name}>{opt.name}</option>
                  ))}
                </select>
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
                disabled={!(intialValue.type && intialValue.clientId && intialValue.status)}
              >
                Show
              </Button>
            </Stack>
          </Stack>

          <SimpleTable
            columns={columns}
            data={LLlist}
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

export default LLlistReport;
