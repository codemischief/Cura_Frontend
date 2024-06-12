import { Button, Stack, Typography } from "@mui/material";
import Navbar from "../../../Components/Navabar/Navbar";
import HeaderBreadcrum from "../../../Components/common/HeaderBreadcum";
import { useEffect, useMemo, useState } from "react";
import ConfirmationModal from "../../../Components/common/ConfirmationModal";
import SucessfullModal from "../../../Components/modals/SucessfullModal";
import SimpleTable from "../../../Components/common/table/CustomTable";
import connectionDataColumn from "./Columns";
import SearchBar from "../../../Components/common/SearchBar/SearchBar";
import CustomButton from "../../../Components/common/CustomButton";
import AsyncSelect from "react-select/async";
import { APIService } from '../../../services/API';
import Container from "../../../Components/common/Container";
import { formatDate } from "../../../utils/formatDate";

import { useDispatch } from "react-redux";
import {
  downloadData,
  getData,
  setCountPerPage,
  setPageNumber,
  setSorting,
  setStatus,
  setInitialState,
} from "../../../Redux/slice/SendClientStatement";
import { useSelector } from "react-redux";
import DatePicker from "../../../Components/common/select/CustomDate";
import { formatedFilterData } from "../../../utils/filters";
import * as XLSX from "xlsx";

const OrderReceiptList = () => {
  const dispatch = useDispatch();
  const {
    Data,
    status,
    totalCount,
    sorting,
    countPerPage,
    pageNo,
    filter,
    openingBalance,
    closingBalance,
  } = useSelector((state) => state.sendClientStatement);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [toast, setToast] = useState(false);
  const columns = useMemo(() => connectionDataColumn(), []);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [height, setHeight] = useState("calc(100vh - 16rem)");

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
    if (startDate && endDate && selectedOption.value) {
      let obj = {
        user_id: 1234,
        startdate: startDate ?? "2021-01-01",
        enddate: endDate ?? "2022-01-01",
        sendEmail:false,
        clientid:selectedOption.value,
        entityid:1,
        rows: [
          "date",
          "type",
          "description",
          "amount",
        ],
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
    if (startDate && endDate && selectedOption.value) {
      let obj = {
        user_id: 1234,
        startdate: startDate ?? "2021-01-01",
        enddate: endDate ?? "2022-01-01",
        sendEmail:false,
        clientid:selectedOption.value,
        entityid:1,
        rows: [
          "date",
          "type",
          "description",
          "amount",
        ],
        sort_by: sorting.sort_by ? [sorting.sort_by] : "",

        filters: formatedFilterData(filter),
        search_key: search,
        pg_no: +pageNo,
        pg_size: +countPerPage,
        order: sorting.sort_order ? sorting.sort_order : "",
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

  const downloadExcel = async () => {
    let obj = {
      user_id: 1234,
      startdate: startDate ?? "2021-01-01",
      enddate: endDate ?? "2022-01-01",
      sendEmail:false,
      clientid:selectedOption.value,
      entityid:1,
      rows: [
        "date",
        "type",
        "description",
        "amount",
      ],
      sort_by: sorting.sort_by ? [sorting.sort_by] : "",
      downloadType: "excel",
      colmap: {
        "date": "Date",
        "type": "Type",
        "description": "Description",
        "amount": "Amount",
      },
      filters: formatedFilterData(filter),
      search_key: search,
      pg_no: 0,
      pg_size: 0,
      order: sorting.sort_order ? sorting.sort_order : "",
    };
    dispatch(downloadData(obj)).then((response) => {
      // const tableData = response.data;
      // const worksheet = XLSX.utils.json_to_sheet(tableData);
      // const workbook = XLSX.utils.book_new();
      // XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
      // XLSX.writeFile(workbook, "SendClientStatement.xlsx");
      // dispatch(setStatus("success"));
    });
  };

  const handleShow = () => {
    if(startDate && endDate && selectedOption.value){
      dispatch(setInitialState());
      setShowTable(true);
      setHeight("calc(100vh - 24rem)")
    }
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
  const sendEmail = () => {
    console.log(sorting)
    let obj = {
      user_id: 1234,
      startdate: startDate ?? "2021-01-01",
      enddate: endDate ?? "2022-01-01",
      sendEmail:true,
      clientid:selectedOption.value,
      entityid:1,
      rows: [
        "date",
        "type",
        "description",
        "amount",
      ],
      sort_by: sorting.sort_by ? [sorting.sort_by] : "",

      filters: formatedFilterData(filter),
      search_key: search,
      pg_no: 0,
      pg_size: 0,
      order: sorting.sort_order ? sorting.sort_order : "",
    };
    dispatch(getData(obj));
  }
  return (
    <Container>
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
                  sendEmail()
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
                    height: 30,
                    width: 180,
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
                  // options: (provided, state) => ({
                  //     ...provided,
                  //     fontSize: 10// adjust padding for the dropdown indicator
                  // }),
                  option: (provided, state) => ({
                    ...provided,
                    padding: '2px 10px', // Adjust padding of individual options (top/bottom, left/right)
                    margin: 0, // Ensure no extra margin
                    fontSize: 10 // Adjust font size of individual options
                  }),
                  menu: (provided, state) => ({
                    ...provided,
                    width: 180, // Adjust the width of the dropdown menu
                    zIndex: 9999 // Ensure the menu appears above other elements
                  }),
                  menuList: (provided, state) => ({
                    ...provided,
                    padding: 0, // Adjust padding of the menu list
                    fontSize: 10,
                    maxHeight: 150 // Adjust font size of the menu list
                  }),

                }}
              />
            </div>

            <DatePicker
              label={"From"}
              onChange={handleDateChange}
              name="startDate"
            />

            <DatePicker
              label={"To"}
              onChange={handleDateChange}
              name="endDate"
            />
            {console.log(startDate)}
            {console.log(endDate)}
            {console.log(selectedOption.value)}
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
              disabled={!(startDate && endDate && selectedOption.value)}
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
                <div className="">{selectedOption.label}</div>
              </div>
            </Stack>
            <Stack
              direction={"row"}
              alignItems={"center"}
            >
              <div className="border-b-2 space-x-36 w-full text-xs px-2 font-medium flex  items-center py-0.5">
                <div className="">Data Range</div>
                <div className="">{formatDate(startDate)} To {formatDate(endDate)}</div>
              </div>
            </Stack>
            <Stack
              direction={"row"}
              alignItems={"center"}
            >
              <div className="border-b-2 space-x-36 w-full text-xs px-2 font-medium flex  items-center py-0.5">
                <div className="">Opening Balance</div>
                <div className="">{openingBalance}</div>
              </div>
            </Stack>
            <Stack
              direction={"row"}
              alignItems={"center"}
            >
              <div className="border-b-2 space-x-36 w-full text-xs px-2 font-medium flex  items-center py-0.5">
                <div className="">Current Balance</div>
                <div className="">{closingBalance}</div>
              </div>
            </Stack>
          </Stack>
        </div>
        }

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
          height={height}
        />
      </div>
      {toast && (
        <SucessfullModal
          isOpen={toast}
          message="New Receipt Added Successfully"
        />
      )}

    </Container>
  );
};

export default OrderReceiptList;
