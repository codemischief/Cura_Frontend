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
  dowmloadData,
  getData,
  setCountPerPage,
  setPageNumber,
  setSorting,
  setInitialState,
  setStatus,
} from "../../../Redux/slice/reporting/AgedOrder";
import { useSelector } from "react-redux";
import DatePicker from "../../../Components/common/select/CustomDate";
import { formatedFilterData } from "../../../utils/filters";
import * as XLSX from "xlsx";
import Container from "../../../Components/common/Container";
import { APIService } from "../../../services/API";
import AsyncSelect from "react-select/async";
import useAuth from '../../../context/JwtContext';
const AgedOrders = () => {
  const dispatch = useDispatch();
  const { user } = useAuth(); 
  const {
    Data,
    status,
    totalCount,
    sorting,
    countPerPage,
    pageNo,
    filter,
  } = useSelector((state) => state.agedOrder);
  const [showTable, setShowTable] = useState(false);
  const [toast, setToast] = useState(false);
  const columns = useMemo(() => connectionDataColumn(), []);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [data, setData] = useState({
    Lob: [],
    Status: [],
  });
  const [query, setQuery] = useState("");
  const [intialValue, setIntialValue] = useState({
    lobname: "",
    status: "",
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
      user_id: user.id,
      rows: ["id", "name"],
      filters: [],
      sort_by: [],
      order: "asc",
      pg_no: 0,
      pg_size: 0,
    };
    const response = await APIService.getLob({ ...data, user_id: user.id });
    const result = await response.json();
    setData((prev) => ({ ...prev, Lob: [...result.data] }));
  };

  const statusFetch = async () => {
    const data = {
      user_id: user.id,
    };
    const response = await APIService.getOrderStatusAdmin({ ...data, user_id: user.id });
    const result = await response.json();
    
    setData((prev) => ({ ...prev, Status: [...result.data] }));
  };


  useEffect(() => {
    statusFetch();
    lobDatafetch();
    dispatch(setInitialState())

  }, []);

  const handleRefresh = () => {
    if (intialValue.status && intialValue.lobname) {
      let obj = {
        user_id: user.id,
        rows: ["service",
          "clientname",
          "propertydescription",
          "briefdescription",
          "agingdays"],
        lobname: !isNaN(+intialValue.lobname)
          ? +intialValue.lobname
          : intialValue.lobname,
        orderstatus: intialValue.status,
        sort_by: sorting.sort_by ? [sorting.sort_by] : undefined,
        order: sorting.sort_order ? sorting.sort_order : undefined,
        filters: formatedFilterData(filter),
        search_key: search,
        pg_no: +pageNo,
        pg_size: +countPerPage,
      };
      dispatch(getData(obj));
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
    if (intialValue.status && intialValue.lobname) {
      let obj = {
        user_id: user.id,
        lobname: intialValue.lobname,
        orderstatus: intialValue.status,
        rows: ["service",
          "clientname",
          "propertydescription",
          "briefdescription",
          "agingdays"],
        sort_by: sorting.sort_by ? [sorting.sort_by] : undefined,
        filters: formatedFilterData(filter),
        search_key: search,
        pg_no: +pageNo,
        pg_size: +countPerPage,
        order: sorting.sort_order ? sorting.sort_order : undefined,
      };
      dispatch(getData(obj));
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
      user_id: user.id,

      rows: ["service",
        "clientname",
        "propertydescription",
        "briefdescription",
        "agingdays"],
      lobname: !isNaN(+intialValue.lobname)
        ? +intialValue.lobname
        : intialValue.lobname,
      orderstatus: intialValue.status,
      sort_by: sorting.sort_by ? [sorting.sort_by] : undefined,
      downloadType: "excel",
      colmap: {
        service: "Service",
        clientname: "Client Name",
        propertydescription: "Property Description",
        briefdescription: "Brief Description",
        agingdays: "Aging",
      },
      filters: formatedFilterData(filter),
      search_key: search,
      pg_no: 0,
      pg_size: 0,
      order: sorting.sort_order ? sorting.sort_order : undefined,
    };
    dispatch(dowmloadData(obj))
  };

  const downloadPdf = () => {
    let obj = {
      user_id: user.id,
      rows: ["service",
        "clientname",
        "propertydescription",
        "briefdescription",
        "agingdays"],
      sort_by: sorting.sort_by ? [sorting.sort_by] : "",
      downloadType: "pdf",
      routename: "/reports/agedOrders",
      colmap: {
        service: "Service",
        clientname: "Client Name",
        propertydescription: "Property Description",
        briefdescription: "Brief Description",
        agingdays: "Aging",
      },
      filters: formatedFilterData(filter),
      search_key: search,
      pg_no: 0,
      pg_size: 0,
      order: sorting.sort_order ? sorting.sort_order : "",
    }; 
    dispatch(dowmloadData(obj, 'pdf'))
  }

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
                  LOB Name <span className="text-red-500">*</span>
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
                  Select status <span className="text-red-500">*</span>
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
                    <option value={opt[1]}>{opt[1]}</option>
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
                disabled={!(intialValue.status && intialValue.lobname)}
              >
                Show
              </Button>
            </Stack>
          </Stack>

          <SimpleTable
            columns={columns}
            data={Data}
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
             height = {"calc(100vh - 15rem)"}
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
