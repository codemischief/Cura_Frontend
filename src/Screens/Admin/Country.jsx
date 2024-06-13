import React from 'react';
import { Outlet, Link, useNavigate, useLocation } from "react-router-dom";
import backLink from "../../assets/back.png";
import searchIcon from "../../assets/searchIcon.png";
import nextIcon from "../../assets/next.png";
import refreshIcon from "../../assets/refresh.png";
import downloadIcon from "../../assets/download.png";
import Cross from "../../assets/cross.png";
import { useState, useEffect, useRef } from 'react';
import Navbar from "../../Components/Navabar/Navbar";
import { Modal, CircularProgress, Pagination, LinearProgress } from "@mui/material";
import Backdrop from '@mui/material/Backdrop';
import Edit from '../../assets/edit.png';
import Trash from "../../assets/trash.png";
import Add from "./../../assets/add.png";
import Pdf from "../../assets/pdf.png";
import Excel from "../../assets/excel.png"
import * as XLSX from 'xlsx';
import FileSaver from 'file-saver';
import SucessfullModal from '../../Components/modals/SucessfullModal';
import FailureModal from '../../Components/modals/FailureModal';
import DeleteModal from '../../Components/modals/DeleteModal';
import { APIService } from '../../services/API';
import EditCountryModal from './Modals/EditCountryModal';
import CharacterFilter from "../../Components/Filters/CharacterFilter"
import NumericFilter from '../../Components/Filters/NumericFilter';
import { authService } from '../../services/authServices';
import Filter from "../../assets/filter.png"
import SaveConfirmationCountry from './Modals/SaveConfirmationCountry';
import CancelModel from './../../Components/modals/CancelModel';
import Draggable from 'react-draggable';
import ActiveFilter from "../../assets/active_filter.png"
import AddButton from '../../Components/common/CustomButton';
import EditButton from '../../Components/common/buttons/EditButton';
import DeleteButton from '../../Components/common/buttons/deleteButton';
const env_URL_SERVER = import.meta.env.VITE_ENV_URL_SERVER
const Country = () => {
  // we have the module here
  const menuRef = useRef();
  const navigate = useNavigate();
  const { pathname } = useLocation()
  const [existingCountries, setCountryValues] = useState([]);
  //   const [isSubmit, setIsSubmit] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  const [userId, setUserId] = useState(0);
  const [showSucess, setShowSucess] = useState(false);
  const [showEditSuccess, setShowEditSuccess] = useState(false);
  const [showFailure, setShowFailure] = useState(false);
  const [showCancel, setShowCancel] = useState(false);
  const [showCancelEdit, setShowCancelEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCountry, setCurrentCountry] = useState("");
  const [currentPages, setCurrentPages] = useState(15);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [downloadModal, setDownloadModal] = useState(false);
  const [sortField, setSortField] = useState("id")
  const [flag, setFlag] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [openAddConfirmation, setOpenAddConfirmation] = useState(false);
  const [isSearchOn, setIsSearchOn] = useState(false);
  const [filterState, setFilterState] = useState([]);
  // const [flag,setFlag] = useState(false);
  const fetchUserId = async () => {
    const response = await authService.getUserId();
    setUserId(response)
  }
  const openSuccessModal = () => {
    setIsCountryDialogue(false);
    setShowSucess(true);
    setTimeout(function () {
      setShowSucess(false)
    }, 2000)
  }
  const openSuccessEditModal = () => {
    setShowEdit(false);
    console.log("edit model called");
    setShowEditSuccess(true);
    setTimeout(function () {
      setShowEditSuccess(false);
    }, 2000)
    fetchCountryData();
  }
  const openFailureModal = () => {
    // we have the error message hre

    setIsCountryDialogue(false);
    setShowFailure(true);
    setTimeout(function () {
      setShowFailure(false)
    }, 4000);
  }

  const [showDeleteSuccess, setShowDeleteSuccess] = useState(false);
  const openDeleteSuccess = () => {
    // setIsLobDialogue(false);
    console.log('hey')
    setShowDeleteSuccess(true);
    setTimeout(function () {
      setShowDeleteSuccess(false);
    }, 2000)
  }

  const openCancelModal = () => {
    // we have the error message hre
    setIsCountryDialogue(false);
    setShowCancel(true);
    setTimeout(function () {
      setShowCancel(false)
    }, 1000);
  }

  const openEditCancelModal = () => {
    // we have the error message hre
    setShowEdit(false);
    setShowCancelEdit(true);
    setTimeout(function () {
      console.log("hello")
      setShowCancelEdit(false)
    }, 1000);
  }

  const fetchPageCountryData = async (pageNumber) => {
    setPageLoading(true);
    setCurrentPage(pageNumber);
    // const user_id = await authService.getUserID();
    const data = {

      "rows": ["id", "name"],
      "filters": filterState,
      "sort_by": [sortField],
      "order": flag ? "asc" : "desc",
      "pg_no": Number(pageNumber),
      "pg_size": Number(currentPages),
      "search_key": isSearchOn ? searchQuery : ""
    };
    const response = await APIService.getCountries(data)
    const res = await response.json()

    setTotalItems(res.total_count);
    setPageLoading(false);

    setCountryValues(res.data)

  }

  const fetchQuantityData = async (quantity) => {
    setPageLoading(true);
    // setCurrentPage(pageNumber);

    // const user_id = await authService.getUserID();
    setCurrentPages(quantity);
    setCurrentPage((prev) => 1)
    const data = {

      "rows": ["id", "name"],
      "filters": filterState,
      "sort_by": [sortField],
      "order": flag ? "asc" : "desc",
      "pg_no": 1,
      "pg_size": Number(quantity),
      "search_key": isSearchOn ? searchQuery : ""
    };
    const response = await APIService.getCountries(data)
    const res = await response.json()

    setTotalItems(res.total_count);
    setPageLoading(false);

    setCountryValues(res.data)
  }
  const fetchCountryData = async () => {
    setPageLoading(true);
    // setCurrentPage(pageNumber);
    // const user_id = await authService.getUserID();
    const tempArray = [];
    // we need to query thru the object
    // console.log(filterMapState);
    // console.log(filterMapState);
    Object.keys(filterMapState).forEach((key) => {
      if (filterMapState[key].filterType != "") {
        if (filterMapState[key].filterData == 'Numeric') {
          tempArray.push([
            key,
            filterMapState[key].filterType,
            Number(filterMapState[key].filterValue),
            filterMapState[key].filterData,
          ]);
        } else {
          tempArray.push([
            key,
            filterMapState[key].filterType,
            filterMapState[key].filterValue,
            filterMapState[key].filterData,
          ]);
        }

      }
    });
    setFilterState((prev) => tempArray)
    const data = {

      "rows": ["id", "name"],
      "filters": tempArray,
      "sort_by": [sortField],
      "order": flag ? "asc" : "desc",
      "pg_no": Number(currentPage),
      "pg_size": Number(currentPages),
      "search_key": isSearchOn ? searchQuery : ""
    };
    const response = await APIService.getCountries(data)
    const res = await response.json()

    setTotalItems(res.total_count);
    setPageLoading(false);
    setCountryValues(res.data)

  }

  const addCountry = async () => {

    const data = { "country_name": formValues.countryName };
    const response = await APIService.addCountries(data);
    const res = await response.json();
    console.log(res)
    // {
    //   "result": "error",
    //   "message": "Already Exists",
    //   
    //   "role_id": 1,
    //   "data": []
    // }
    setOpenAddConfirmation(false)
    if (res.result == "success") {
      setIsLoading(false);
      setFormValues(initialValues);
      openSuccessModal();
    } else {
      setIsLoading(false);
      setFailureMessage(res.message);
      openFailureModal();
    }
    fetchCountryData();
  }

  const deleteCountry = async (item) => {
    setShowDelete(true);
    setCurrentCountry(item.name);
  }

  const editCountry = async (item) => {
    setCurrentCountry(item.name);
    setShowEdit(true);

    // console.log(currentCountry);

  }
  // /edit country modal
  useEffect(() => {
    // fetchUserId()
    fetchCountryData()
    const handler = (e) => {
      if (!menuRef.current.contains(e.target)) {
        setCountryFilter(false)
        setIdFilter(false)
        setDownloadModal(false)
      }
    }

    document.addEventListener("mousedown", handler);
    return () => {
      document.removeEventListener("mousedown", handler);
    };
  }, []);
  //Validation of the form
  const initialValues = {
    countryName: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    if (formValues.countryName == "") {
      return;
    }
    setCurrentCountry(formValues.countryName)
    setIsCountryDialogue(false);
    setOpenAddConfirmation(true);
    // addCountry();
  };

  const [isCountryDialogue, setIsCountryDialogue] = React.useState(false);
  const handleOpen = () => {
    setIsCountryDialogue(true);
  };
  const handleClose = () => {
    initials();
    setIsCountryDialogue(false);
    openCancelModal();

  }
  const initials = () => {
    setFormValues(initialValues);
    setFormErrors({});
  }
  const validate = () => {
    const errors = {};
    if (!formValues.countryName) {
      errors.countryName = "Enter a Country Name"
    }
    return errors;
  }
  const fetchSomeData = async (number) => {
    setPageLoading(true);
    const data = {
      "rows": ["id", "name"],
      "filters": [],
      "sort_by": [],
      "order": "asc",
      "pg_no": Number(currentPage),
      "pg_size": Number(number)
    };
    const response = await APIService.getCountries(data)
    const res = await response.json()

    setTotalItems(res.total_count);


    setCountryValues(res.data)
    setPageLoading(false);
  }

  const handleRefresh = () => {
    fetchCountryData();
  }

  const handleSort = async (field) => {
    console.log('called')
    setPageLoading(true);
    setSortField(field);
    setFlag((prev) => {
      return !prev
    })
    const data = {

      "rows": ["id", "name"],
      "filters": filterState,
      "sort_by": [field],
      "order": !flag ? "asc" : "desc",
      "pg_no": Number(currentPage),
      "pg_size": Number(currentPages)
    };
    const response = await APIService.getCountries(data)
    const res = await response.json()

    setTotalItems(res.total_count);
    setPageLoading(false);

    setCountryValues(res.data)

  }

  const handleSearch = async () => {
    setPageLoading(true);
    setIsSearchOn(true);
    setCurrentPage(1);
    console.log('hey')
    const data = {

      "rows": ["id", "name"],
      "filters": filterState,
      "sort_by": [sortField],
      "order": flag ? "asc" : "desc",
      "pg_no": 1,
      "pg_size": Number(currentPages),
      "search_key": searchQuery
    };
    const response = await APIService.getCountries(data)
    const res = await response.json()

    setTotalItems(res.total_count);
    setPageLoading(false);

    setCountryValues(res.data)

  }
  const [countryFilter, setCountryFilter] = useState(false);
  const [countryFilterInput, setCountryFilterInput] = useState("");
  const toggleCountryFilter = () => {
    setCountryFilter((prev) => !prev)
  }
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    fetchPageCountryData(value);
  }
  const [idFilter, setIdFilter] = useState(false)
  const [idFilterInput, setIdFilterInput] = useState("");
  const handleCloseSearch = async () => {
    setSearchQuery("")
    setIsSearchOn(true);
    setCurrentPage(1);
    setPageLoading(true)
    const data = {
      "rows": ["id", "name"],
      "filters": filterState,
      "sort_by": [sortField],
      "order": "desc",
      "pg_no": 1,
      "pg_size": Number(currentPages),
      "search_key": ""
    };
    const response = await APIService.getCountries(data)
    const res = await response.json()

    setTotalItems(res.total_count);
    setPageLoading(false);

    setCountryValues(res.data)
  }
  const [failureMessage, setFailureMessage] = useState("");

  const openDownload = () => {
    setDownloadModal(true);
  }

  const [backDropLoading, setBackDropLoading] = useState(false)
  const handleDownload = async (type) => {
    setDownloadModal(false)
    setBackDropLoading(true)
    setPageLoading(true)
    const data = {

      "rows": ["name", "id"],
      "filters": filterState,
      "sort_by": [sortField],
      "order": flag ? "asc" : "desc",
      "pg_no": 0,
      "pg_size": 0,
      "search_key": searchQuery,
      "downloadType": type,
      "routename": pathname,
      "colmap": {
        "name": "Country",
        "id": "ID"
      }
    };
    const response = await APIService.getCountries(data)
    const temp = await response.json();
    const result = temp.data;
    console.log(temp)
    if (temp.result == 'success') {
      const d = {
        "filename": temp.filename,
      }
      APIService.download(d, temp.filename).then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.blob();
      })
        .then(result => {
          if (type == "excel") {
            FileSaver.saveAs(result, 'CountryData.xlsx');
          } else if (type == "pdf") {
            FileSaver.saveAs(result, 'CountryData.pdf');
          }
          console.log('Success:', result);
        })
        .catch(error => {
          console.error('Error:', error);
        });

      setTimeout(() => {
        setBackDropLoading(false)
        setPageLoading(false)
      }, 1000)
    }
  }
  const newHandleFilter = async (inputVariable, setInputVariable, type, columnName) => {
    console.log(columnName)
    console.log('hey')
    console.log(filterMapState);
    // console.log(inputVariable)
    var existing = { ...filterMapState };
    existing = {
      ...existing, [columnName]: {
        ...existing[columnName],
        filterType: type == 'noFilter' ? "" : type
      }
    }
    existing = {
      ...existing, [columnName]: {
        ...existing[columnName],
        filterValue: type == 'noFilter' ? "" : inputVariable
      }
    }

    if (type == 'noFilter' || type == 'isNull' || type == "isNotNull") setInputVariable("");
    console.log('existing')
    console.log(existing)
    fetchFiltered(existing);
  }

  const filterMapping = {
    name: {
      filterType: "",
      filterValue: "",
      filterData: "String",
      filterInput: ""
    },
    id: {
      filterType: "",
      filterValue: null,
      filterData: "Numeric",
      filterInput: ""
    }
  }
  const [filterMapState, setFilterMapState] = useState(filterMapping);

  const fetchFiltered = async (mapState) => {

    console.log('this is a test')
    // setCountryValues([])
    setFilterMapState(mapState)
    // console.log('hi')
    const tempArray = [];
    // // we need to query thru the object
    setCountryFilter(false)
    setIdFilter(false)
    // // console.log(filterMapState);
    // // console.log(mapState)
    // console.log(filterMapState)
    Object.keys(mapState).forEach(key => {
      if (mapState[key].filterType != "") {
        if (mapState[key].filterData == 'Numeric') {
          tempArray.push([
            key,
            mapState[key].filterType,
            Number(mapState[key].filterValue),
            mapState[key].filterData,
          ]);
        } else {
          tempArray.push([
            key,
            mapState[key].filterType,
            mapState[key].filterValue,
            mapState[key].filterData,
          ]);
        }

      }
    })
    setFilterState(tempArray)
    setCurrentPage((prev) => 1)
    setPageLoading(true);
    const data = {

      "rows": ["id", "name"],
      "filters": tempArray,
      "sort_by": [sortField],
      "order": flag ? "asc" : "desc",
      "pg_no": 1,
      "pg_size": Number(currentPages),
      "search_key": isSearchOn ? searchQuery : ""
    };
    const response = await APIService.getCountries(data)
    const res = await response.json()
    console.log(res)
    setTotalItems(res.total_count);
    // setCountryValues([])

    setCountryValues(res.data)
    setPageLoading(false);
  }
  function handleKeyDown(event) {
    if (event.keyCode === 13) {
      handleSearch()
    }
  }
  const handleEnterToFilter = (event, inputVariable,
    setInputVariable,
    type,
    columnName) => {
    if (event.keyCode === 13) {
      // if its empty then we remove that 
      // const temp = {...filterMapState};
      // temp[columnName].type = "".
      // setFilterMapState(temp)

      // alert('here')
      if (inputVariable == "") {
        const temp = { ...filterMapState }
        temp[columnName].filterType = ""
        setFilterMapState(temp)
        fetchCountryData()
      } else {
        newHandleFilter(inputVariable,
          setInputVariable,
          type,
          columnName)
      }



    }
  }
  return (
    <div className=' w-full font-medium'>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={pageLoading}
        onClick={() => { }}
      >

        <CircularProgress color="inherit" />

      </Backdrop>
      {showSucess && <SucessfullModal isOpen={showSucess} message="New Country Added Successfully" />}
      {showCancel && <CancelModel isOpen={showCancel} message="Process cancelled, no new Country added." />}
      {showCancelEdit && <CancelModel isOpen={showCancelEdit} message="Process cancelled, no changes saved." />}
      {showFailure && <FailureModal isOpen={showFailure} message={failureMessage} />}
      {showEditSuccess && <SucessfullModal isOpen={showEditSuccess} message="Changes Saved Successfully!" />}
      {showDelete && <DeleteModal isOpen={showDelete} currentCountry={currentCountry} closeDialog={setShowDelete} fetchData={fetchCountryData} showCancel={openEditCancelModal} showSuccess={openDeleteSuccess} />}
      {showEdit && <EditCountryModal isOpen={showEdit} currentCountry={currentCountry} setIsOpen={setShowEdit} showSuccess={openSuccessEditModal} showCancel={openEditCancelModal} />}
      {openAddConfirmation && <SaveConfirmationCountry addCountry={addCountry} handleClose={() => setOpenAddConfirmation(false)} currentCountry={currentCountry} showCancel={openCancelModal} setDefault={initials} />}
      {showDeleteSuccess && <SucessfullModal isOpen={showDeleteSuccess} message="Country Deleted Successfully!" />}
      <div className='h-[calc(100vh_-_123px)] w-full px-10'>
        <div className='h-16 w-full  flex justify-between items-center p-2  border-gray-300 border-b-2'>
          <div className='flex items-center space-x-3'>
            <div className='rounded-2xl  bg-[#EBEBEB] h-8 w-8 flex justify-center items-center'>
              <button onClick={() => navigate(-1)}><img className='w-5 h-5' src={backLink} /></button>
            </div>
            <div className='flex-col'>
              <h1 className='text-[18px]'>Country</h1>
              <p className='text-[14px]'>Admin &gt; Country</p>
            </div>
          </div>
          <div className='flex space-x-2 items-center'>

            <div className='flex bg-[#EBEBEB] '>
              {/* search button */}
              <input
                className="h-[36px] bg-[#EBEBEB] text-[#787878] pl-2 outline-none w-48"
                type="text"
                placeholder="   Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDownCapture={handleKeyDown}
              />
              <button onClick={handleCloseSearch}><img src={Cross} className='w-[20px] h-[20px] mx-2' /></button>
              <div className="h-[36px] w-[40px] bg-[#004DD7] flex items-center justify-center rounded-r-lg">
                <button onClick={handleSearch}><img className="h-[26px] " src={searchIcon} alt="search-icon" /></button>
              </div>
            </div>
            <div>
              {/* button */}
              {/* <button className="bg-[#004DD7] text-white h-[36px] w-[240px] rounded-lg" onClick={handleOpen}>
                <div className="flex items-center justify-center gap-4">
                  Add New Country
                  <img className='h-[18px] w-[18px]' src={Add} alt="add" />
                </div>
              </button> */}
              <AddButton title="Add New Country" onClick={handleOpen} />
            </div>
          </div>

        </div>
        <div className='h-12 w-full bg-white flex justify-between text-xs'>
          <div className='w-[80%] flex'>
            <div className='w-[5%] px-3 py-4'>

            </div>
            <div className='w-[20%] px-3 py-2.5'>
              <div className="w-[60%] flex items-center bg-[#EBEBEB] rounded-[5px]">
                <input className="w-[75%] bg-[#EBEBEB] rounded-[5px] text-[11px] pl-2 outline-none" value={countryFilterInput} onChange={(e) => setCountryFilterInput(e.target.value)}

                  onKeyDown={(event) => handleEnterToFilter(event, countryFilterInput,
                    setCountryFilterInput,
                    'contains',
                    'name')}
                />
                {filterMapState.name.filterType == "" ? <button className='w-[30%] px-1 py-2' onClick={() => setCountryFilter((prev) => !prev)}><img src={Filter} className='h-3 w-3' /></button> : <button className='w-[30%] px-1 py-2' onClick={() => setCountryFilter((prev) => !prev)}><img src={ActiveFilter} className='h-3 w-3' /></button>}
              </div>
              {countryFilter && <CharacterFilter inputVariable={countryFilterInput} setInputVariable={setCountryFilterInput} handleFilter={newHandleFilter} filterColumn='name' menuRef={menuRef} filterType={filterMapState.name.filterType} />}
            </div>

          </div>
          <div className='w-[20%] px-3 py-2.5'>
            <div className='w-[40%] flex items-center bg-[#EBEBEB] rounded-[5px]'>
              <input className="w-[75%] bg-[#EBEBEB] rounded-[5px] text-[11px] pl-2 outline-none" value={idFilterInput} onChange={(e) => { setIdFilterInput(e.target.value) }}

                onKeyDown={(event) => handleEnterToFilter(event, idFilterInput,
                  setIdFilterInput,
                  'equalTo',
                  'id')}

              />
              {filterMapState.id.filterType == "" ? <button className='w-[30%] px-1 py-2' onClick={() => setIdFilter((prev) => !prev)}><img src={Filter} className='h-3 w-3' /></button> : <button className='w-[30%] px-1 py-2' onClick={() => setIdFilter((prev) => !prev)}><img src={ActiveFilter} className='h-3 w-3' /></button>}
            </div>
            {idFilter && <NumericFilter columnName='id' inputVariable={idFilterInput} setInputVariable={setIdFilterInput} handleFilter={newHandleFilter} menuRef={menuRef} filterType={filterMapState.id.filterType} />}
            <div className='w-1/2 p-4'>

            </div>
          </div>
        </div>
        <div className='h-[calc(100vh_-_14rem)] w-full text-xs'>
          <div className='w-full h-12 bg-[#F0F6FF] flex justify-between'>
            <div className='w-[80%] flex'>
              <div className='w-[5%] px-3 py-4'>
                <p>Sr </p>
              </div>
              <div className='w-[95%]  px-3 py-4'>
                <p>Country<button onClick={() => handleSort("name")}><span className="font-extrabold">↑↓</span></button></p>
              </div>
            </div>
            <div className='w-[20%]  flex'>
              <div className='w-1/2  px-3 py-4'>
                <p>ID<button onClick={() => handleSort("id")}><span className="font-extrabold">↑↓</span></button></p>
              </div>
              <div className='w-1/2 px-3 py-4'>
                <p>Edit</p>
              </div>
            </div>
          </div>
          <div className='h-[calc(100vh_-_17rem)] w-full overflow-auto'>



            {!pageLoading && existingCountries && existingCountries.length == 0 && <div className='h-10 border-gray-400 border-b-[1px] flex items-center'>
              <h1 className='ml-10'>No Records To Show</h1>
            </div>}
            {!pageLoading && existingCountries && existingCountries.map((item, index) => {
              return <div className='w-full h-10 flex justify-between items-center border-gray-400 border-b-[1px] text-xs'>
                <div className='w-[80%] flex items-center'>
                  <div className='w-[5%] px-3'>
                    <p>{index + 1 + (currentPage - 1) * currentPages}</p>
                  </div>
                  <div className='w-[95%]  px-3 '>
                    <p>{item.name}</p>
                  </div>
                </div>
                <div className='w-[20%] flex items-center'>
                  <div className='w-1/2  px-3 ml-1'>
                    <p>{item.id}</p>
                  </div>
                  <div className='w-1/2 px-3 flex items-center gap-5'>
                    <EditButton
                      rowData={item}
                      handleEdit={editCountry}
                    />
                    <DeleteButton
                      handleDelete={deleteCountry}
                      rowData={item}
                    />
                    {/* <button onClick={() => editCountry(item)} > <img className='w-5 h-5' src={Edit} alt="edit" /> </button>
                    <button onClick={() => deleteCountry(item)}> <img className='w-5 h-5' src={Trash} alt="trash" /></button> */}
                  </div>
                </div>
              </div>
            })}



          </div>
        </div>
      </div>
      <div className='w-full h-12 flex justify-between justify-self-end px-6  fixed bottom-0 '>
        {/* footer component */}
        <div className='ml-2'>
          <div className='flex items-center w-auto h-full'>
            {/* items */}
            <Pagination count={Math.ceil(totalItems / currentPages)} onChange={handlePageChange} page={currentPage} />

          </div>
        </div>



        <div className='flex mr-10 justify-center items-center space-x-2 '>
          <div className="flex mr-8 space-x-2 text-sm items-center">
            <p className="text-gray-700">Items Per page</p>
            <select className="text-gray-700 border-black border-[1px] rounded-md p-1"
              name="currentPages"
              value={currentPages}
              //  defaultValue="Select State"
              onChange={e => {
                // setCurrentPages(e.target.value);
                console.log(e.target.value);
                fetchQuantityData(e.target.value);
                // fetchPageCountryData(e.target.value)
              }}

            >
              <option>
                15
              </option>
              <option>
                25
              </option>
              <option>
                50
              </option>
            </select>
          </div>
          <div className="flex text-sm">
            <p className="mr-11 text-gray-700">{totalItems} Items in {Math.ceil(totalItems / currentPages)} Pages</p>
          </div>
          {downloadModal && <div className='h-[120px] w-[220px] bg-white shadow-xl rounded-md absolute bottom-12 right-24 flex-col items-center  justify-center p-5' ref={menuRef}>

            <button onClick={() => setDownloadModal(false)}><img src={Cross} className='absolute top-1 right-1 w-4 h-4' /></button>

            <button onClick={() => handleDownload("pdf")}>
              <div className='flex space-x-2 justify-center items-center ml-3 mt-3'>
                <p>Download as pdf</p>
                <img src={Pdf} />
              </div>
            </button>
            <button onClick={() => handleDownload("excel")}>
              <div className='flex space-x-2 justify-center items-center mt-5 ml-3'>
                <p>Download as Excel</p>
                <img src={Excel} />
              </div>
            </button>
          </div>}

          <div className='border-solid border-black border-[0.5px] rounded-md w-28 h-10 flex items-center justify-center space-x-1 p-2' >
            {/* refresh */}
            <button onClick={handleRefresh}><p>Refresh</p></button>
            <img src={refreshIcon} className="h-2/3" />
          </div>
          <div className='border-solid border-black border-[1px] w-28 rounded-md h-10 flex items-center justify-center space-x-1 p-2'>
            {/* download */}
            <button onClick={openDownload}><p>Download</p></button>
            <img src={downloadIcon} className="h-2/3" />
          </div>
        </div>
      </div>
      <Modal open={isCountryDialogue}
        fullWidth={true}
        maxWidth={'md'}
        className='flex justify-center items-center'
      >
        <>
          <Draggable handle='div.move'>
            <div className='flex justify-center '>
              <div className="w-[778px]  h-auto bg-white rounded-lg ">
                <div className='move cursor-move'>

                  <div className="h-[40px] bg-[#EDF3FF]  justify-center flex items-center rounded-t-lg relative">
                    <div className="mr-[270px] ml-[270px]">
                      <div className="text-[20px]">New Country</div>
                    </div>
                    <div className="flex justify-center items-center rounded-full w-[30px] h-[30px] bg-white absolute right-2">
                      <button onClick={handleClose}><img className="w-[20px] h-[20px]" src={Cross} alt="cross" /></button>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className='mb-3 space-y-16'>
                  <div className="h-auto w-full mt-2  ">
                    <div className="flex gap-[48px] justify-center items-center">
                      <div className=" space-y-3 py-5 ">
                        <div className="">
                          <div className="text-[13px]">Country Name<label className="text-red-500">*</label></div>
                          <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm py-1 px-2 text-[12px] outline-none"
                            type="text"
                            name="countryName"
                            value={formValues.countryName}
                            onChange={handleChange}
                            autoComplete="off"
                          />
                          <div className="h-[12px] w-[200px] text-[12px] text-[#CD0000] absolute">{formErrors.countryName}</div>
                          {/* <div className="text-[12px] text-[#CD0000] ">{formErrors.countryName}</div> */}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className=" flex justify-center items-center gap-3">
                    <button className='w-[100px] h-[35px] bg-[#004DD7] text-white rounded-md' type="submit">Add</button>
                    <button className='w-[100px] h-[35px] border-[1px] border-[#282828] rounded-md' onClick={handleClose}>Cancel</button>
                    {isLoading && <CircularProgress />}
                  </div>
                </form>
              </div>
            </div>
          </Draggable>
        </>
      </Modal>
    </div>
  )
}

export default Country
