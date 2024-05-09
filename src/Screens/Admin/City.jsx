import React from "react";
import { Outlet, Link } from "react-router-dom";
import backLink from "../../assets/back.png";
import searchIcon from "../../assets/searchIcon.png";
import nextIcon from "../../assets/next.png";
import refreshIcon from "../../assets/refresh.png";
import downloadIcon from "../../assets/download.png";
import { useState, useEffect, useRef } from "react";
import Navbar from "../../Components/Navabar/Navbar";
import Cross from "../../assets/cross.png";
import Edit from "../../assets/edit.png";
import Trash from "../../assets/trash.png";
import Add from "./../../assets/add.png";
import Pdf from "../../assets/pdf.png";
import Excel from "../../assets/excel.png";
import Filter from "../../assets/filter.png";
import { LinearProgress, Modal, Pagination, useScrollTrigger } from "@mui/material";
import * as XLSX from "xlsx";
import FileSaver from "file-saver";
import { APIService } from "../../services/API";
import { authService } from "../../services/authServices";
import CharacterFilter from "../../Components/Filters/CharacterFilter";
import NumericFilter from "../../Components/Filters/NumericFilter";
import Draggable from "react-draggable";
import SaveConfirmationCity from "./Modals/SaveConfirmationCity";
import SucessfullModal from "../../Components/modals/SucessfullModal";
import DeleteCityModal from "./Modals/DeleteCityModal";
import CancelModel from "../../Components/modals/CancelModel";
import EditCityModal from "./Modals/EditCityModal";
const City = () => {
    const menuRef = useRef();
    // we have the module here

    const [existingCities, setExistingCities] = useState([]);
    const [pageLoading, setPageLoading] = useState(false);
    const [showSucess, setShowSucess] = useState(false);
    const [showFailure, setShowFailure] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [currentPages, setCurrentPages] = useState(15);
    const [totalItems, setTotalItems] = useState(0);
    const [sortField, setSortField] = useState("id");
    const [flag, setFlag] = useState(false);
    const [downloadModal, setDownloadModal] = useState(false);
    const [searchInput, setSearchInput] = useState("");
    const [isSearchOn, setIsSearchOn] = useState(false);
    const [currCountry, setCurrCountry] = useState(-1);
    const [allCountry, setAllCountry] = useState([]);
    const [allState, setAllState] = useState([]);
    const [allCity, setAllCity] = useState([]);
    const openSuccessModal = () => {
        // set the state for true for some time
        setIsCountryDialogue(false);
        setShowSucess(true);
        setTimeout(function () {
            setShowSucess(false);
        }, 2000);
    };
    const openFailureModal = () => {
        setIsCountryDialogue(false);
        setShowFailure(true);
        setTimeout(function () {
            setShowFailure(false);
        }, 4000);
    };
    const fetchCountryData = async () => {
        setPageLoading(true);
        // const data = { "user_id":  1234 };
        const data = { "user_id": 1234, "rows": ["id", "name"], "filters": [], "sort_by": [], "order": "asc", "pg_no": 0, "pg_size": 0 };
        const response = await APIService.getCountries(data)
        const result = (await response.json()).data;
        console.log(result.data);
        if (Array.isArray(result.data)) {
            setAllCountry(result.data);
        }
    }
    const fetchStateData = async (id) => {
        console.log(id);
        const data = { "user_id": 1234, "country_id": id };
        // const data = {"user_id":1234,"rows":["id","state"],"filters":[],"sort_by":[],"order":"asc","pg_no":0,"pg_size":0};
        const response = await APIService.getState(data);
        const result = (await response.json()).data;
        console.log(result)
        if (Array.isArray(result)) {
            setAllState(result)
        }
    }
    const fetchCityData = async () => {
        const tempArray = [];
        // we need to query thru the object
        // console.log(filterMapState);
        // console.log(filterMapState);
        Object.keys(filterMapState).forEach((key) => {
            if (filterMapState[key].filterType != "") {
                if(filterMapState[key].filterData == 'Numeric') {
                    tempArray.push([
                        key,
                        filterMapState[key].filterType,
                        Number(filterMapState[key].filterValue),
                        filterMapState[key].filterData,
                    ]);
                }else {
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
        setPageLoading(true);
        // const user_id = await authService.getUserID();
        // console.log(user_id)
        setCurrentPage((prev) => 1)
        setCurrentPages((prev) => 15)
        const data = {
            user_id: 1234,
            rows: ["id", "city", "state", "countryid", "country"],
            filters: tempArray,
            sort_by: [sortField],
            order: flag ? "asc" : "desc",
            pg_no: 1,
            pg_size: 15
        };
        const response = await APIService.getCitiesAdmin(data);
        const res = await response.json();
        const result = res.data;
        const t = res.total_count;
        setTotalItems(t);
        setPageLoading(false);

        setExistingCities(result);
    };
    const fetchQuantityData = async (quantity) => {
        setPageLoading(true);
        // const user_id = await authService.getUserID();
        // console.log(user_id)
        setCurrentPages(quantity);
        setCurrentPage((prev) => 1)
        const data = {
            user_id: 1234,
            rows: ["id", "city", "state", "countryid", "country"],
            filters: filterState,
            sort_by: [sortField],
            order: flag ? "asc" : "desc",
            pg_no: 1,
            pg_size: Number(quantity),
            search_key : searchInput
        };
        const response = await APIService.getCitiesAdmin(data);
        const res = await response.json();
        const result = res.data;
        const t = res.total_count;
        setTotalItems(t);
        setPageLoading(false);

        setExistingCities(result);
    };
    useEffect(() => {
        fetchCityData()
        fetchCountryData()

        const handler = (e) => {
            if (menuRef.current == null || !menuRef.current.contains(e.target)) {
                setCountryFilter(false);
                setStateFilter(false);
                setCityFilter(false);
                setIdFilter(false);
            }
        };

        document.addEventListener("mousedown", handler);
        return () => {
            document.removeEventListener("mousedown", handler);
        };
    }, []);
    //Validation of the form
    const initialValues = {
        country : 5,
        state : null,
        cityName: null,
    };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmit(true);
    };

    const [isCityDialogue, setIsCityDialogue] = React.useState(false);
    const handleOpen = () => {
        setIsCityDialogue(true);
    };
    const handleClose = () => {
        setFormErrors({})
        setFormValues(initialValues)
        setIsCityDialogue(false);
        openCancel()
    };
    const handleDownload = () => {
        // we handle the download here
        const worksheet = XLSX.utils.json_to_sheet(existingCities);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        XLSX.writeFile(workbook, "CityData.xlsx");
        FileSaver.saveAs(workbook, "demo.xlsx");
    };
    const handleRefresh = () => {
        fetchCityData();
    };
    const fetchPageData = async (page) => {
        setPageLoading(true);
        setCurrentPage((prev) => page)
        const data = {
            user_id: 1234,
            rows: ["id", "city", "state", "countryid", "country"],
            filters: filterState,
            sort_by: [sortField],
            order: flag ? "asc" : "desc",
            pg_no: Number(page),
            pg_size: Number(currentPages),
            search_key : searchInput
        };
        const response = await APIService.getCitiesAdmin(data);
        const res = await response.json();
        const result = res.data;
        const t = res.total_count;
        setTotalItems(t);
        setExistingCities(result);
        setPageLoading(false);
    };
    const handlePageChange = (event, value) => {
        setCurrentPage(value);
        console.log("hey");
        fetchPageData(value);
    };
    const enterSearch = (e) => {
        e.preventDefault();
        
        console.log('hey')
        handleSearch()
    }
    const handleSearch = async () => {
        // e.preventDefault();
        // console.log("clicked");
        setPageLoading(true);
        // setIsSearchOn(true);
        setCurrentPage((prev) => 1)

        const data = {
            user_id: 1234,
            rows: ["id", "city", "state", "countryid", "country"],
            filters: filterState,
            sort_by: [sortField],
            order: flag ? "asc" : "desc",
            pg_no: 1,
            pg_size: Number(currentPages),
            search_key: searchInput,
        };
        const response = await APIService.getCitiesAdmin(data);
        const res = await response.json();
        const result = res.data;
        const t = res.total_count;
        setTotalItems(t);
        setPageLoading(false);

        setExistingCities(result);
    };
    const handleCloseSearch = async () => {
        setIsSearchOn(false);
        setPageLoading(true);
        setSearchInput("");
        setCurrentPage((prev) => 1)
        const data = {
            user_id: 1234,
            rows: ["id", "city", "state", "countryid", "country"],
            filters: filterState,
            sort_by: [sortField],
            order: flag ? "asc" : "desc",
            pg_no: 1,
            pg_size: Number(currentPages),
            search_key: "",
        };
        const response = await APIService.getCitiesAdmin(data);
        const res = await response.json();
        const result = res.data;
        const t = res.total_count;
        setTotalItems(t);

        setPageLoading(false);
        setExistingCities(result);
    };

    const openDownload = () => {
        setDownloadModal(true);
    };

    const handleExcelDownload = async () => {
        const data = {
            user_id: 1234,
            rows: ["country","state","city","id"],
            filters: filterState,
            sort_by: [sortField],
            order: flag ? "asc" : "desc",
            pg_no: 0,
            pg_size: 0,
            search_key : searchInput
        };
        const response = await APIService.getCitiesAdmin(data);
        const res = await response.json();
        const result = res.data;
        const worksheet = XLSX.utils.json_to_sheet(result);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        XLSX.writeFile(workbook, "CityData.xlsx");
        FileSaver.saveAs(workbook, "demo.xlsx");
    };

    const filterMapping = {
        country: {
            filterType: "",
            filterValue: "",
            filterData: "String",
            filterInput: "",
        },
        state: {
            filterType: "",
            filterValue: "",
            filterData: "String",
            filterInput: "",
        },
        city: {
            filterType: "",
            filterValue: "",
            filterData: "String",
            filterInput: "",
        },
        id: {
            filterType: "",
            filterValue: null,
            filterData: "Numeric",
            filterInput: "",
        },
    };
    const [filterMapState, setFilterMapState] = useState(filterMapping);
    const [countryFilter, setCountryFilter] = useState(false);
    const [countryFilterInput, setCountryFilterInput] = useState("");
    const [stateFilter, setStateFilter] = useState(false);
    const [stateFilterInput, setStateFilterInput] = useState("");
    const [cityFilter, setCityFilter] = useState(false);
    const [cityFilterInput, setCityFilterInput] = useState("");
    const [idFilter, setIdFilter] = useState(false);
    const [idFilterInput, setIdFilterInput] = useState("");
   
    const [filterState,setFilterState] = useState([])
    const fetchFiltered = async (mapState) => {
        setFilterMapState(mapState);
        const tempArray = [];
        setCountryFilter(false);
                setStateFilter(false);
                setCityFilter(false);
                setIdFilter(false);
        // we need to query thru the object
        // console.log(filterMapState);
        console.log(filterMapState);
        Object.keys(mapState).forEach((key) => {
            if (mapState[key].filterType != "") {
                if(mapState[key].filterData == 'Numeric') {
                    tempArray.push([
                        key,
                        mapState[key].filterType,
                        Number(mapState[key].filterValue),
                        mapState[key].filterData,
                    ]);
                }else {
                    tempArray.push([
                        key,
                        mapState[key].filterType,
                        mapState[key].filterValue,
                        mapState[key].filterData,
                    ]);
                }
               
            }
        });
        setFilterState((prev) => tempArray)
        setPageLoading(true);
        setCurrentPage((prev) => 1)

        const data = {
            user_id: 1234,
            rows: ["id", "city", "state", "countryid", "country"],
            filters: tempArray,
            sort_by: [sortField],
            order: flag ? "asc" : "desc",
            pg_no: 1,
            pg_size: Number(currentPages),
            search_key: searchInput,
        };
        const response = await APIService.getCitiesAdmin(data);
        const res = await response.json();
        const result = res.data;
        const t = res.total_count;
        setTotalItems(t);
        setPageLoading(false);

        setExistingCities(result);
    };
    const newHandleFilter = async (
        inputVariable,
        setInputVariable,
        type,
        columnName
    ) => {
        var existing = filterMapState;
        existing = {
            ...existing,
            [columnName]: {
                ...existing[columnName],
                filterType: type == "noFilter" ? "" : type,
            },
        };
        existing = {
            ...existing,
            [columnName]: {
                ...existing[columnName],
                filterValue: type == "noFilter" ? "" : inputVariable,
            },
        };

        if (type == "noFilter" || type == "isNull" || type == "isNotNull") setInputVariable("");
        
        fetchFiltered(existing);
    };
    const handleSort = async (field) => {
        setPageLoading(true);
        // const tempArray = [];
        // we need to query thru the object
        setSortField(field);
        setFlag((prev) => !prev);
        const data = {
            user_id: 1234,
            rows: ["id", "city", "state", "countryid", "country"],
            filters: filterState,
            sort_by: [field],
            order: !flag ? "asc" : "desc",
            pg_no: Number(currentPage),
            pg_size: Number(currentPages),
            search_key: searchInput ,
        };
        
        const response = await APIService.getCitiesAdmin(data);
        const res = await response.json();
        const result = res.data;
        const t = res.total_count;
        setTotalItems(t);
        setPageLoading(false);

        setExistingCities(result);
    };

    const validate = () => {
        var res = true;
       
        if (!formValues.country || formValues.country == "") {
            setFormErrors((existing) => {
                return { ...existing, country: "Select Country" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, country: "" }
            })
        }
        if (!formValues.state || formValues.state == "") {
            setFormErrors((existing) => {
                return { ...existing, state: "Enter State" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, state: "" }
            })
        }
        if (!formValues.cityName || formValues.cityName == "") {
            setFormErrors((existing) => {
                return { ...existing, cityName: "Enter City" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, cityName: "" }
            })
        }

        return res;
    }
    const handleAddCity = () => {

      

        
        if(!validate()) {
            return ;
        }
        setErrorMessage((prev) => "Proccess Cancelled, Changes Not Saved")
        setButtonLoading(true)
         setIsCityDialogue(false)
         setCurrentCity(formValues.cityName)
         setShowAddConfirmation(true)
         setButtonLoading(false)
    }
    const addCity = async () => {
        const data = {
            "user_id":1234,
            "city":formValues.cityName,
            "state":formValues.state,
            "countryid":formValues.country
        }
        const response = await APIService.addCities(data)
        const res = await response.json()
        if(res.result == 'success') {
            setShowAddConfirmation(false)
            setFormValues(initialValues)
            setFormErrors({})
            openAddSuccess()
        }else {
           // we need to open error prompt here
           
        }
    }  
    const handleDeleteCity = (id) => {
    setErrorMessage((prev) => "Proccess Cancelled,Changes Not Saved")
       setCurrentCity(id)
       setShowDeleteModal(true)
    }
    const deleteCity = async (id) => {
       const data = {
        "user_id":1234,
        "id":id
       }
       const response = await APIService.deleteCities(data)
       const res = await response.json()
       if(res.result === 'success') {
          // delete success
          setShowDeleteModal(false)
          openDeleteSuccess()
       }else {
        // get Failure
       }
    }
    const handleEdit = (item) => {
        // setCurrentCity(id)
        setErrorMessage((prev) => "Proccess Cancelled,Changes Not Saved")
        setCurrentCityData(item)
        setShowEditModal(true)
    }
    const editCities = () => {

    }
    const [showAddConfirmation,setShowAddConfirmation] = useState(false)
    const [showAddSuccess,setShowAddSuccess] = useState(false)
    const [showDeleteSuccess,setShowDeleteSuccess] = useState(false)
    const [showEditSuccess,setShowEditSuccess] = useState(false)
    const [currentCity,setCurrentCity] = useState("")

    const [showDeleteModal,setShowDeleteModal] = useState(false)

    const openAddSuccess = () => {
        setShowAddSuccess(true);
        setTimeout(function () {
            setShowAddSuccess(false);
        }, 2000)
        fetchCityData()
    }
    const openDeleteSuccess = () => {
        setShowDeleteSuccess(true);
        setTimeout(function () {
            setShowDeleteSuccess(false);
        }, 2000)
        fetchCityData()
    }
    const openEditSuccess = () => {
        setShowEditModal(false)
        setShowEditSuccess(true);
        setTimeout(function () {
            setShowEditSuccess(false);
        }, 2000)
        fetchCityData()
    }
    const openCancel = () => {
        setShowCancelModal(true);
        setTimeout(function () {
            setShowCancelModal(false);
        }, 2000)
        // fetchCityData()
    }
    const initials = () => {
        setFormErrors({})
        setFormValues(initialValues)
    }
    
    const [showCancelModal,setShowCancelModal] = useState(false)

    const [errorMessage,setErrorMessage] = useState("Process Cancelled, No New City Added")
    const [showEditModal,setShowEditModal] = useState(false)
    const [currentCityData,setCurrentCityData] = useState({})
    const [buttonLoading,setButtonLoading] = useState(false)
    function handleKeyDown(event) {
        if (event.keyCode === 13) {
          handleSearch()
        }
    }
      const handleEnterToFilter = (event,inputVariable,
        setInputVariable,
        type,
        columnName) => {
            if (event.keyCode === 13) {
                    // if its empty then we remove that 
                    // const temp = {...filterMapState};
                    // temp[columnName].type = "".
                    // setFilterMapState(temp)
                    if(inputVariable == "") {
                        const temp = {...filterMapState}
                        temp[columnName].filterType = ""
                        setFilterMapState(temp)
                        fetchCityData()
                    }else {
                        newHandleFilter(inputVariable,
                            setInputVariable,
                            type,
                            columnName)
                    }
                    
                
                
              }
      }
    return (
        <div className="h-screen">
            <Navbar />
            {showAddConfirmation && <SaveConfirmationCity currentCity={currentCity} showCancel={openCancel} initials={initials} handleClose={() => setShowAddConfirmation(false)} addCity={addCity} />}
            {showAddSuccess && <SucessfullModal isOpen={showAddSuccess} message="New City added successfully"/>}
            {showDeleteSuccess && <SucessfullModal isOpen={showDeleteSuccess} message="City Deleted Successully"/>}
            {showEditSuccess && <SucessfullModal isOpen={showEditSuccess} message="Changes Saved Successfully"/>}
            {showDeleteModal && <DeleteCityModal handleDelete={deleteCity} handleClose={() => { openCancel(); setShowDeleteModal(false);}} showCancel={openCancel} id={currentCity} />}
             {showEditModal  && <EditCityModal handleClose={() => {setShowEditModal(false);  openCancel()}} initialCountry={allCountry} initialData={currentCityData} openSuccess={openEditSuccess}/>}
            {showCancelModal && <CancelModel isOpen={showCancelModal} message={errorMessage} />}

            <div className="h-[calc(100vh_-_7rem)] w-full px-10">
                <div className="h-16 w-full  flex justify-between items-center p-2  border-gray-300 border-b-2">
                    <div className="flex items-center space-x-3">
                        <div className="rounded-2xl  bg-[#EBEBEB] h-8 w-8 flex justify-center items-center">
                            <Link to="/dashboard">
                                <img className="w-5 h-5" src={backLink} />
                            </Link>
                        </div>

                        <div className="flex-col">
                            <h1 className="text-lg">City</h1>
                            <p className="text-sm">Admin &gt; City</p>
                        </div>
                    </div>
                    <div className="flex space-x-2 items-center">
                        {/* <form onSubmit={enterSearch} > */}
                        <div className="flex bg-[#EBEBEB]">
                            {/* search button */}
                            <input
                                className="h-9 w-48 bg-[#EBEBEB] text-[#787878] pl-3 outline-none"
                                type="text"
                                placeholder="  Search"
                                value={searchInput}
                                onChange={(e) => {
                                    setSearchInput(e.target.value);
                                }}
                                onKeyDownCapture={handleKeyDown}
                            />
                            <button onClick={handleCloseSearch}>
                                <img src={Cross} className="w-5 h-5 mx-2" />
                            </button>
                            <div className="h-9 w-10 bg-[#004DD7] flex items-center justify-center rounded-r-lg">
                              
                                <button onClick={handleSearch} >
                                    <img className="h-6" src={searchIcon} alt="search-icon" />
                                </button>
                            </div>
                        </div>
                                {/* </form> */}

                        <div>
                            {/* button */}
                            <button
                                className="bg-[#004DD7] text-white h-9 w-64 rounded-lg"
                                onClick={handleOpen}
                            >
                                <div className="flex items-center justify-center gap-4">
                                    Add New City
                                    <img className="h-[18px] w-[18px]" src={Add} alt="add" />
                                </div>
                            </button>
                        </div>
                    </div>
                </div>

                <div className="w-full h-12 flex justify-between">
                    <div className="w-3/4 flex">
                        <div className="w-[10%] p-4">{/* <p>Sr. </p> */}</div>
                        <div className="w-[20%]  p-4">
                            <div className="w-[65%] flex items-center bg-[#EBEBEB] rounded-md">
                                <input
                                    className="w-[75%] bg-[#EBEBEB] rounded-md text-xs pl-2 outline-none"
                                    value={countryFilterInput}
                                    onChange={(e) => setCountryFilterInput(e.target.value)}
                                    onKeyDown={(event) => handleEnterToFilter(event,countryFilterInput,
                                        setCountryFilterInput,
                                        'contains',
                                        'country')}
                                />
                                <button
                                    className="w-[25%] px-1 py-2"
                                    onClick={() => {
                                        setCountryFilter((prev) => !prev);
                                    }}
                                >
                                    <img src={Filter} className="h-3 w-3" />
                                </button>
                            </div>
                            {countryFilter && (
                                <CharacterFilter
                                    inputVariable={countryFilterInput}
                                    setInputVariable={setCountryFilterInput}
                                    handleFilter={newHandleFilter}
                                    filterColumn="country"
                                    menuRef={menuRef}
                                />
                            )}
                        </div>
                        <div className="w-[20%]  p-4">
                            <div className="w-[65%] flex items-center bg-[#EBEBEB] rounded-md">
                                <input
                                    className="w-[70%] bg-[#EBEBEB] rounded-md text-xs pl-2 outline-none"
                                    value={stateFilterInput}
                                    onChange={(e) => setStateFilterInput(e.target.value)}
                                    onKeyDown={(event) => handleEnterToFilter(event,stateFilterInput,
                                        setStateFilterInput,
                                        'contains',
                                        'state')}
                                />
                                <button
                                    className="w-[30%] px-1 py-2"
                                    onClick={() => {
                                        setStateFilter((prev) => !prev);
                                    }}
                                >
                                    <img src={Filter} className="h-3 w-3" />
                                </button>
                            </div>
                            {stateFilter && (
                                <CharacterFilter
                                    inputVariable={stateFilterInput}
                                    setInputVariable={setStateFilterInput}
                                    handleFilter={newHandleFilter}
                                    filterColumn="state"
                                    menuRef={menuRef}
                                />
                            )}
                        </div>
                        <div className="w-[25%]  p-4">
                            <div className="w-[55%] flex items-center bg-[#EBEBEB] rounded-md">
                                <input
                                    className="w-[70%] bg-[#EBEBEB] rounded-md text-xs pl-2 outline-none"
                                    value={cityFilterInput}
                                    onChange={(e) => setCityFilterInput(e.target.value)}
                                    onKeyDown={(event) => handleEnterToFilter(event,cityFilterInput,
                                        setCityFilterInput,
                                        'contains',
                                        'city')}
                                />
                                <button
                                    className="w-[30%] px-1 py-2"
                                    onClick={() => {
                                        setCityFilter((prev) => !prev);
                                    }}
                                >
                                    <img src={Filter} className="h-3 w-3" />
                                </button>
                            </div>
                            {cityFilter && (
                                <CharacterFilter
                                    inputVariable={cityFilterInput}
                                    setInputVariable={setCityFilterInput}
                                    handleFilter={newHandleFilter}
                                    filterColumn="city"
                                    menuRef={menuRef}
                                />
                            )}
                        </div>
                    </div>
                    <div className="w-1/6  flex">
                        <div className="w-1/2  p-4">
                            <div className="w-[100%] flex items-center bg-[#EBEBEB] rounded-md">
                                <input
                                    className="w-[65%] bg-[#EBEBEB] rounded-md text-xs pl-2 outline-none"
                                    value={idFilterInput}
                                    onChange={(e) => setIdFilterInput(e.target.value)}
                                    onKeyDown={(event) => handleEnterToFilter(event,idFilterInput,
                                        setIdFilterInput,
                                        'equalTo',
                                        'id')}
                                />
                                <button
                                    className="w-[35%] px-1 py-2"
                                    onClick={() => {
                                        setIdFilter((prev) => !prev);
                                    }}
                                >
                                    <img src={Filter} className="h-3 w-3" />
                                </button>
                            </div>
                            {idFilter && (
                                <NumericFilter
                                    columnName="id"
                                    inputVariable={idFilterInput}
                                    setInputVariable={setIdFilterInput}
                                    handleFilter={newHandleFilter}
                                    menuRef={menuRef}
                                />
                            )}
                        </div>
                        <div className="w-1/2 p-4"></div>
                    </div>
                </div>

                <div className="h-[calc(100vh_-_14rem)] w-full text-[12px]">
                    <div className="w-full h-12 bg-[#F0F6FF] flex justify-between">
                        <div className="w-3/4 flex">
                            <div className="w-[10%] p-4">
                                <p>Sr. </p>
                            </div>
                            <div className="w-[20%]  p-4">
                                <p>
                                    Country{" "}
                                    <button onClick={() => handleSort("country")}>
                                        <span className="font-extrabold">↑↓</span>
                                    </button>
                                </p>
                            </div>
                            <div className="w-[20%]  p-4">
                                <p>
                                    State{" "}
                                    <button onClick={() => handleSort("state")}>
                                        <span className="font-extrabold">↑↓</span>
                                    </button>
                                </p>
                            </div>
                            <div className="w-[25%]  p-4">
                                <p>
                                    City{" "}
                                    <button onClick={() => handleSort("city")}>
                                        <span className="font-extrabold">↑↓</span>
                                    </button>
                                </p>
                            </div>
                        </div>
                        <div className="w-1/6  flex">
                            <div className="w-1/2  p-4">
                                <p>
                                    ID{" "}
                                    <button onClick={() => handleSort("id")}>
                                        <span className="font-extrabold">↑↓</span>
                                    </button>
                                </p>
                            </div>
                            <div className="w-1/2 p-4">
                                <p>Edit</p>
                            </div>
                        </div>
                    </div>

                    <div className="h-[calc(100vh_-_17rem)] w-full  overflow-auto">
                        {pageLoading && <LinearProgress />}
                        {!pageLoading &&
                            existingCities.map((item, index) => {
                                return (
                                    <div className="w-full h-12  flex justify-between border-gray-400 border-b-[1px]">
                                        <div className="w-3/4 flex">
                                            <div className="w-[10%] p-4">
                                                <p>{index + 1 + (currentPage - 1) * currentPages}</p>
                                            </div>
                                            <div className="w-[20%]  p-4">
                                                <p>{item.country}</p>
                                            </div>
                                            <div className="w-[20%]  p-4">
                                                <p>{item.state}</p>
                                            </div>
                                            <div className="w-[25%]  p-4">
                                                <p>{item.city}</p>
                                            </div>
                                        </div>
                                        <div className="w-1/6  flex">
                                            <div className="w-1/2  p-4">
                                                <p>{item.id}</p>
                                            </div>
                                            <div className="w-1/2 0 p-4 flex justify-between items-center">
                                                <button onClick={() => handleEdit(item)}><img className="w-5 h-5" src={Edit} alt="edit" /></button>
                                                <button onClick={() => handleDeleteCity(item.id)}><img className="w-5 h-5" src={Trash} alt="trash" /></button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        {/* we get all the existing cities here */}
                    </div>
                </div>
            </div>

            <div className="w-full h-12 flex justify-between justify-self-end px-6 ">
                {/* footer component */}
                <div className="ml-2">
                    <div className="flex items-center w-auto h-full">
                        {/* items */}
                        <Pagination
                            count={Math.ceil(totalItems / currentPages)}
                            onChange={handlePageChange}
                            page={currentPage}
                        />
                    </div>
                </div>
                <div className="flex mr-10 justify-center items-center space-x-2 ">
                    <div className="flex mr-8 space-x-2 text-sm items-center">
                        <p className="text-gray-700">Items Per page</p>
                        <select
                            className="text-gray-700 border-black border-[1px] rounded-md p-1"
                            name="currentPages"
                            value={currentPages}
                            //  defaultValue="Select State"
                            onChange={(e) => {
                                setCurrentPages(e.target.value);
                                // console.log(e.target.value);
                                fetchQuantityData(e.target.value);
                            }}
                        >
                            <option>15</option>
                            <option>25</option>
                            <option>50</option>
                        </select>
                    </div>
                    <div className="flex text-sm">
                        <p className="mr-11 text-gray-700">
                            {totalItems} Items in {Math.ceil(totalItems / currentPages)} Pages
                        </p>
                    </div>
                    {downloadModal && (
                        <div className="h-[120px] w-[220px] bg-white shadow-xl rounded-md absolute bottom-12 right-24 flex-col items-center  justify-center p-5">
                            <button onClick={() => setDownloadModal(false)}>
                                <img src={Cross} className="absolute top-1 left-1 w-4 h-4" />
                            </button>

                            <button>
                                <div className="flex space-x-2 justify-center items-center ml-3 mt-3">
                                    <p>Download as pdf</p>
                                    <img src={Pdf} />
                                </div>
                            </button>
                            <button onClick={handleExcelDownload}>
                                <div className="flex space-x-2 justify-center items-center mt-5 ml-3">
                                    <p>Download as Excel</p>
                                    <img src={Excel} />
                                </div>
                            </button>
                        </div>
                    )}

                    <div className="border-solid border-black border-[0.5px] rounded-md w-28 h-10 flex items-center justify-center space-x-1 p-2">
                        {/* refresh */}
                        <button onClick={handleRefresh}>
                            <p>Refresh</p>
                        </button>
                        <img src={refreshIcon} className="h-2/3" />
                    </div>
                    <div className="border-solid border-black border-[1px] w-28 rounded-md h-10 flex items-center justify-center space-x-1 p-2">
                        {/* download */}
                        <button onClick={openDownload}>
                            <p>Download</p>
                        </button>
                        <img src={downloadIcon} className="h-2/3" />
                    </div>
                </div>
            </div>

            <Modal open={isCityDialogue} 
            fullWidth={true} 
            maxWidth={"md"}
            className="flex justify-center items-center"
            >
                <>
                    {/* <Draggable> */}
                <div className="flex justify-center ">
                    <div className="w-[800px]  h-auto bg-white rounded-lg relative">
                        <div className="h-[40px] bg-[#EDF3FF]  justify-center flex items-center rounded-t-lg">
                            <div className="">
                                <div className="text-base"> New City</div>
                            </div>
                            <div className="flex justify-center items-center rounded-full w-7 h-7  bg-white absolute right-3">
                                <button onClick={handleClose}>
                                    <img className="w-5 h-5 " src={Cross} alt="cross" />
                                </button>
                            </div>
                        </div>
                        <div className="h-auto w-full mt-4 mb-20 ">
                            <div className="flex gap-12 justify-center items-center">
                                <div className=" space-y-5 py-5">
                                <div className="">
                                        <div className="text-sm">Country Name <label className="text-red-500">*</label></div>
                                        <select className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none"
                                            name="country"
                                            value={formValues.country}
                                            defaultValue="Select Country"
                                            onChange={e => {
                                                setCurrCountry(e.target.value);
                                                                                           
                                                setFormValues((existing) => {
                                                    const newData = { ...existing, country: e.target.value }
                                                    return newData;
                                                })
                                                // fetchStateData(res);
                                            }}
                                        >

                                            {allCountry && allCountry.map(item => {
                                                return <option value={item[0]}> {item[1]}</option>
                                                // if (item[0] == 5) {
                                                //     return <option value={item[0]} selected>
                                                //         {item[1]}
                                                //     </option>
                                                // } else {
                                                //     return <option value={item[0]} >
                                                //         {item[1]}
                                                //     </option>
                                                // }
                                            })}
                                        </select>
                                        {/* <div className="h-[25px] w-56 text-[9px] mt-[3px] text-[#CD0000] absolute ">{formErrors.country}</div> */}
                                    </div>
                                    <div className="">
                                        <div className="text-sm">State Name <label className="text-red-500">*</label></div>
                                        <input
                                            className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none"
                                            type="text"
                                            name="state"
                                            value={formValues.state}
                                            onChange={handleChange}
                                        />
                                        
                                        <div className="h-[25px] w-56 text-[9px] mt-[3px] text-[#CD0000] absolute">{formErrors.state}</div>
                                    </div>
                                    <div className="">
                                        <div className="text-sm">
                                           Enter City Name<label className="text-red-500">*</label>
                                        </div>
                                        <input
                                            className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none"
                                            type="text"
                                            name="cityName"
                                            value={formValues.cityName}
                                            onChange={handleChange}
                                        />
                                        <div className="h-[100px] w-56 text-[9px] mt-[3px] text-[#CD0000] absolute">{formErrors.cityName}</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="my-2 flex justify-center items-center gap-[10px]">
                            <button
                                className={`w-[100px] h-[35px] ${buttonLoading ? "#505050"  : "bg-[#004DD7]"}  text-white rounded-md`}
                                // type="submit"
                                onClick={handleAddCity}
                            >
                                Add
                            </button>
                            <button
                                className="w-[100px] h-[35px] border-[1px] border-[#282828] rounded-md"
                                onClick={handleClose}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
                    {/* </Draggable> */}
                    </>
            </Modal>
        </div>
    );
};

export default City;
