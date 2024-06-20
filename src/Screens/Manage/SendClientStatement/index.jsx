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
import { toast } from "react-toastify";
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
import useAuth from "../../../context/JwtContext";
// import ConfirmationModal from "../../../Components/common/ConfirmationModal";
const OrderReceiptList = () => {
  const dispatch = useDispatch();
  const {user} = useAuth()
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
  const [showModal, setShowModal] = useState(false);
  const columns = useMemo(() => connectionDataColumn(), []);
  const [searchInput, setSearchInput] = useState("");
  const [search, setSearch] = useState("");
  const [height, setHeight] = useState("calc(100vh - 15rem)");
  const [openConfirmation,setOpenConfimation] = useState(false)
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
        user_id: user.id,
        startdate: startDate ?? "2021-01-01",
        enddate: endDate ?? "2022-01-01",
        sendEmail:false,
        clientid:selectedOption.value,
        entityid:1,
        rows: [
          "date",
          "type",
          "description",
          "property",
          "amount",
        ],
        sort_by: sorting.sort_by ? [sorting.sort_by] : "",
        order: sorting.sort_order ? sorting.sort_order : "",
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
      dispatch(setInitialState())
  },[])
  useEffect(() => {

    if (searchInput === "") setSearch("");
  }, [searchInput]);
  useEffect(() => {
    if (startDate && endDate && selectedOption.value) {
      let obj = {
        user_id: user.id,
        startdate: startDate ?? "2021-01-01",
        enddate: endDate ?? "2022-01-01",
        sendEmail:false,
        clientid:selectedOption.value,
        entityid:1,
        rows: [
          "date",
          "type",
          "description",
          "property",
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
      user_id: user.id,
      startdate: startDate ?? "2021-01-01",
      enddate: endDate ?? "2022-01-01",
      sendEmail:false,
      clientid:selectedOption.value,
      entityid:1,
      rows: [
        "date",
        "type",
        "description",
        "property",
        "amount",
      ],
      sort_by: sorting.sort_by ? [sorting.sort_by] : "",
      downloadType: "excel",
      colmap: {
        "date": "Date",
        "type": "Type",
        "description": "Description",
        "property" : "Property",
        "amount": "Amount",
      },
      filters: formatedFilterData(filter),
      search_key: search,
      pg_no: 0,
      pg_size: 0,
      order: sorting.sort_order ? sorting.sort_order : "",
    };
    dispatch(downloadData(obj))    
  };
  const downloadPdf = () => {
    let obj = {
      user_id: user.id,
      startdate: startDate ?? "2021-01-01",
      enddate: endDate ?? "2022-01-01",
      sendEmail:false,
      clientid:selectedOption.value,
      entityid:1,
      rows: [
        "date",
        "type",
        "description",
        "property",
        "amount",
      ],
      sort_by: sorting.sort_by ? [sorting.sort_by] : "",
      downloadType: "pdf",
      routename : "/manage/sendclientstatement",
      colmap: {
        "date": "Date",
        "type": "Type",
        "description": "Description",
        "property" : "Property",
        "amount": "Amount",
      },
      filters: formatedFilterData(filter),
      search_key: search,
      pg_no: 0,
      pg_size: 0,
      order: sorting.sort_order ? sorting.sort_order : "",
    };
    dispatch(downloadData(obj,'pdf'))
  }
  const handleShow = () => {
    if(startDate && endDate && selectedOption.value){
      setClientname(selectedOption.label)
      setUiStartDate(startDate)
      setuiEndDate(endDate)
      dispatch(setInitialState());
      setShowTable(true);
      setHeight("calc(100vh - 20.5rem)")
    }
  };

  const [query, setQuery] = useState('')

  const [selectedOption, setSelectedOption] = useState({
    label: "Enter Client Name",
    value: null
  });
  const [clientname,setClientname] = useState("")
  const [uiStartDate,setUiStartDate] = useState("")
  const [uiEndDate,setuiEndDate] = useState("")
  const handleClientNameChange = (e) => {
    
    

    setSelectedOption(e)
  }

  const loadOptions = async (e) => {
    
    if (e.length < 3) return;
    const data = {
      "user_id": user.id,
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
    if(email == "") {
      setOpenConfimation(false)
      toast.error("Email Doesn't Exist For Client")
      return 
    }
    let obj = {
      user_id: user.id,
      startdate: startDate ?? "2021-01-01",
      enddate: endDate ?? "2022-01-01",
      sendEmail:true,
      clientid:selectedOption.value,
      downloadType : 'pdf',
      entityid:1,
      rows: [
        "date",
        "type",
        "description",
        "property",
        "amount",
      ],
      sort_by: sorting.sort_by ? [sorting.sort_by] : "",
      colmap : {
        "date" : "Date",
        "type" : "Type",
        "description" : "Description",
        "property" : "Property",
        "amount" : "Amount",
      },
      filters: formatedFilterData(filter),
      search_key: search,
      pg_no: 0,
      pg_size: 0,
      order: sorting.sort_order ? sorting.sort_order : "",
    };
    dispatch(getData(obj));
    setOpenConfimation(false)
    setShowModal(true)

  }
  function floorDecimal(number) {
    let floorValue = Math.floor(number * 100) / 100; // Get floor value with two decimal places
    return floorValue.toFixed(2); // Convert to string with exactly two decimal places
  }
  const [email,setEmail] = useState("")
  const getClientInfo = async () => {
      const data = {
        user_id : user.id,
        table_name : "get_client_info_view",
        item_id : selectedOption.value
      }
      const response = await APIService.getItembyId(data)
      const res = await response.json()
      setEmail(res.data.email1)
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
                  // sendEmail()
                  getClientInfo()
                  setOpenConfimation(true)
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
                      // lineHeight: '0.8',
                      height: '30px',
                      width: 224,
                      fontSize: 12,
                      // padding: '1px'
                      borderRadius : '2px'
                  }),
                  indicatorSeparator: (provided, state) => ({
                    display : 'none'
                  }),
                  dropdownIndicator: (provided, state) => ({
                      ...provided,
                      padding: '1px',
                      paddingRight : '2px', // Adjust padding for the dropdown indicator
                      width: 15, // Adjust width to make it smaller
                      height: 15, // Adjust height to make it smaller
                      display: 'flex', // Use flex to center the icon
                      alignItems: 'center', // Center vertically
                      justifyContent: 'center'
                       // adjust padding for the dropdown indicator
                  }),
                  input: (provided, state) => ({
                      ...provided,
                      margin: 0, // Remove any default margin
                      padding: 0, // Remove any default padding
                      fontSize: 12, // Match the font size
                      height: 'auto', // Adjust input height
                    }),
                  // options: (provided, state) => ({
                  //     ...provided,
                  //     fontSize: 10// adjust padding for the dropdown indicator
                  // }),
                  option: (provided, state) => ({
                      ...provided,
                      padding: '2px 10px', // Adjust padding of individual options (top/bottom, left/right)
                      margin: 0, // Ensure no extra margin
                      fontSize: 12 // Adjust font size of individual options
                  }),
                  menu: (provided, state) => ({
                      ...provided,
                      width: 224, // Adjust the width of the dropdown menu
                      zIndex: 9999 // Ensure the menu appears above other elements
                  }),
                  menuList: (provided, state) => ({
                      ...provided,
                      padding: 0, // Adjust padding of the menu list
                      fontSize: 12,
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
              justifyContent={'space-around'}
            >
              <div className="border-b-2 space-x-36 w-full text-xs px-2 font-medium flex  items-center py-0.5">
                <div className="">Client Name</div>
                <div className="">{clientname}</div>
              </div>
              <div className="border-b-2 space-x-36 w-full text-xs px-2 font-medium flex  items-center py-0.5">
                <div className="">Opening Balance</div>
                <div className="">{floorDecimal(openingBalance)}</div>
              </div>
            </Stack>
            <Stack
              direction={"row"}
              alignItems={"center"}
            >
              <div className="border-b-2 space-x-36 w-full text-xs px-2 font-medium flex  items-center py-0.5">
                <div className="">Date Range</div>
                <div className="">{formatDate(uiStartDate)} To {formatDate(uiEndDate)}</div>
              </div>
              <div className="border-b-2 space-x-36 w-full text-xs px-2 font-medium flex  items-center py-0.5">
                <div className="">Closing Balance</div>
                <div className="">{floorDecimal(closingBalance)}</div>
              </div>
            </Stack>
            {/* <Stack
              direction={"row"}
              alignItems={"center"}
            >
              <div className="border-b-2 space-x-36 w-full text-xs px-2 font-medium flex  items-center py-0.5">
                <div className="">Opening Balance</div>
                <div className="">{openingBalance}</div>
              </div>
            </Stack> */}
            {/* <Stack
              direction={"row"}
              alignItems={"center"}
            >
              <div className="border-b-2 space-x-36 w-full text-xs px-2 font-medium flex  items-center py-0.5">
                <div className="">Closing Balance</div>
                <div className="">{closingBalance}</div>
              </div>
            </Stack> */}
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
          downloadPdf={downloadPdf}
          height={height}
        />
      </div>
      {showModal && (
        <SucessfullModal
          isOpen={showModal}
          message="Client Statement Sent Successfully"
        />
      )}
      
       {openConfirmation && (
        <ConfirmationModal
          open={openConfirmation}
          // loading={formSubmissionStatus === "loading"}
          btnTitle={"Send"}
          onClose={() => {
            setOpenConfimation(false);
          }}
          // errors={{}}
          onSubmit={sendEmail}
          title={"Send Email"}
          description={
            <div className="flex flex-col items-center">
              <p className="">Email : {email}</p>
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
                Are you sure you want to email Client Statement?
              </Typography>
            </div>
          }
        />
      )}
    </Container>
  );
};

export default OrderReceiptList;
