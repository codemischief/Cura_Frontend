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
  downloadAgedOrders,
  getAgedOrders,
  setCountPerPage,
  setPageNumber,
  setSorting,
  setStatus,
  setInitialState
} from "../../../Redux/slice/reporting/Orders/AgedOrders";
import { useSelector } from "react-redux";
import DatePicker from "../../../Components/common/select/CustomDate";
import { formatedFilterData } from "../../../utils/filters";
import * as XLSX from "xlsx";
import Container from "../../../Components/common/Container";
import { APIService } from "../../../services/API";
import AsyncSelect from "react-select/async";

const AgedOrders = () => {
  const dispatch = useDispatch();
  const {
    AgedOrders,
    status,
    totalCount,
    sorting,
    countPerPage,
    pageNo,
    filter,
  } = useSelector((state) => state.agedOrders);
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
    if (intialValue.clientId && intialValue.status && intialValue.type && intialValue.clientProperty) {
      let obj = {
        user_id: 1234,
        rows:  [
          "service",
          "clientname",
          "propertydescription",
          "briefdescription",
          "agingdays"
        ],
        statusName: intialValue.status,
        clientName: intialValue.clientId.label,
        typeName: intialValue.type,
        clientPropertyID: intialValue.clientProperty,
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
      dispatch(getAgedOrders(obj));
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
    if (intialValue.clientId && intialValue.status && intialValue.type && intialValue.clientProperty) {
      let obj = {
        user_id: 1234,
        rows:  [
          "service",
          "clientname",
          "propertydescription",
          "briefdescription",
          "agingdays"
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
      dispatch(getAgedOrders(obj));
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
      rows:  [
        "service",
        "clientname",
        "propertydescription",
        "briefdescription",
        "agingdays"
      ],
      sort_by: sorting.sort_by ? [sorting.sort_by] : undefined,
      downloadType: "excel",
      colmap: {
          service:"Service",
          clientname:"Client Name",
          propertydescription:"Property Description",
          briefdescription:"Brief Description",
          agingdays:"Ageing"
      },
      statusName: intialValue.status,
      clientName: intialValue.clientId.label,
      typeName: intialValue.type,
      clientPropertyID: intialValue.clientProperty,
      filters: formatedFilterData(filter),
      search_key: search,
      pg_no: 0,
      pg_size: 0,
      order: sorting.sort_order ? sorting.sort_order : undefined,
    };
    dispatch(downloadAgedOrders(obj))
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
              heading={"Aged Orders"}
              path={["Reports", "Orders", "Aged Orders"]}
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
                  name="status"
                  value={intialValue.status}
                  onChange={handleChange}
                >
                  <option selected value={""} className="hidden">Property Management</option>
                  {/* <option value="all">all</option> */}
                  {statusDropdown.map((opt) => (
                    <option value={opt.type}>{opt.type}</option>
                  ))}
                </select>
              </div>

              <div className="flex flex-col h-16 w-[200px]">
                <label className="font-sans text-sm font-normal leading-5">
                  Status
                </label>

                <select
                  className="w-full max-h-[224px] h-8 border-[1px] border-[#C6C6C6] bg-white rounded-sm px-3 text-xs outline-none"
                  name="type"
                  value={intialValue.type}
                  onChange={handleChange}
                >
                  <option selected value={""} className="hidden">In progess</option>
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
                disabled={!(intialValue.type && intialValue.clientId && intialValue.status && intialValue.clientProperty)}
              >
                Show
              </Button>
            </Stack>
          </Stack>

          <SimpleTable
            columns={columns}
            data={AgedOrders}
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

export default AgedOrders;
