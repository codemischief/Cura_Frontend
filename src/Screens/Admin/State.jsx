import React from 'react';
import { Outlet, Link } from "react-router-dom";
import backLink from "../../assets/back.png";
import searchIcon from "../../assets/searchIcon.png";
import nextIcon from "../../assets/next.png";
import refreshIcon from "../../assets/refresh.png";
import downloadIcon from "../../assets/download.png";
import { useState, useEffect, useRef } from 'react';
import Navbar from "../../components/Navabar/Navbar";
import Cross from "../../assets/cross.png";
import Edit from "../../assets/edit.png";
import Add from "../../assets/add.png";
import Trash from "../../assets/trash.png";
import Pdf from "../../assets/pdf.png";
import Excel from "../../assets/excel.png"
import { Modal, CircularProgress, Pagination } from "@mui/material";
import * as XLSX from 'xlsx';
import FileSaver from 'file-saver';
import { APIService } from '../../services/API';
import { authService } from '../../services/authServices';
import Filter from "../../assets/filter.png"
import CharacterFilter from "../../components/Filters/CharacterFilter"
import DateFilter from '../../components/Filters/DateFilter';
import NumericFilter from '../../components/Filters/NumericFilter';

const State = () => {
    const menuRef = useRef()
    const [existingState, setExistingState] = useState([]);
    const [pageLoading, setPageLoading] = useState(false);
    const [showSucess, setShowSucess] = useState(false);
    const [showFailure, setShowFailure] = useState(false);
    const [showDelete, setShowDelete] = useState(false);
    const [showEdit, setShowEdit] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [currentPages, setCurrentPages] = useState(15);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [downloadModal, setDownloadModal] = useState(false);
    const [userId, setUserId] = useState(0);
    const [sortField, setSortField] = useState("id");
    const [searchInput, setSearchInput] = useState("");
    const [isSearchOn, setIsSearchOn] = useState(false);
    //   const fetchUserId = async() =>{
    //     const response = await authService.getUserId();
    //     setUserId(response)
    // }
    const openSuccessModal = () => {
        // set the state for true for some time
        setIsCountryDialogue(false);
        setShowSucess(true);
        setTimeout(function () {
            setShowSucess(false)
        }, 2000)
    }
    const openFailureModal = () => {
        setIsCountryDialogue(false);
        setShowFailure(true);
        setTimeout(function () {
            setShowFailure(false)
        }, 4000);
    }
    const fetchStateData = async () => {
        setPageLoading(true);
        const data = {
            "user_id": 1234,
            "rows": ["id", "state", "countryname"],
            "filters": [],
            "sort_by": [sortField],
            "order": "desc",
            "pg_no": 1,
            "pg_size": 15
        };
        const response = await APIService.getStatesAdmin(data)
        const temp = await response.json();
        const result = temp.data;
        const t = temp.total_count;
        console.log(temp)
        console.log(temp.total_count)
        setTotalItems(t);
        setPageLoading(false);
        setExistingState(result)
    }

    const [allCountry, setAllCountry] = useState([]);
    const fetchCountryData = async () => {
        // setPageLoading(true);
        const data = { "user_id": 1234 };
        const response = await APIService.getCountries(data)
        const result = (await response.json()).data;
        if (Array.isArray(result)) {
            setAllCountry(result);
        }
    }

    const fetchSomeData = async (number) => {
        setPageLoading(true);
        setCurrentPages(number)
        const data = {
            "user_id": 1234,
            "rows": ["id", "state", "countryname"],
            "filters": [],
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
            "pg_no": Number(currentPage),
            "pg_size": Number(number)
        };


        const response = await APIService.getStatesAdmin(data)

        const temp = await response.json();
        const result = temp.data;
        const t = temp.total_count;
        setTotalItems(t);
        setExistingState(result);
        setPageLoading(false);
    }
    useEffect(() => {
        // fetchUserId()
        fetchStateData();
        fetchCountryData();
        const handler = (e) => {
            if (!menuRef.current.contains(e.target)) {
                setCountryFilter(false)
                setStateFilter(false)
                setIdFilter(false)
            }
        }

        document.addEventListener("mousedown", handler);
        return () => {
            document.removeEventListener("mousedown", handler);
        };
    }, []);
    //Validation of the form
    const initialValues = {
        country: "",
        stateName: ""
    };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     setIsSubmit(true);
    // };

    const [isStateDialogue, setIsStateDialogue] = React.useState(false);
    const handleOpen = () => {
        setIsStateDialogue(true);
    };
    const handleClose = () => {
        setIsStateDialogue(false);
    }
    const handleRefresh = () => {
        fetchStateData();
    }
    const openDownload = () => {
        setDownloadModal(true);
    }
    const [flag, setFlag] = useState(true);
    const handleSort = async (field) => {
        setPageLoading(true);
        setSortField(field)
        const data = {
            "user_id": 1234,
            "rows": ["id", "state", "countryname"],
            "filters": [],
            "sort_by": [field],
            "order": flag ? "asc" : "desc",
            "pg_no": 1,
            "pg_size": Number(currentPages)
        };
        setFlag((prev) => !prev);
        const response = await APIService.getStatesAdmin(data)
        const temp = await response.json();
        const result = temp.data;
        const t = temp.total_count;
        setTotalItems(t);
        setPageLoading(false);
        setExistingState(result)
    }
    const [stateFilter, setStateFilter] = useState(false);
    const [stateFilterInput, setStateFilterInput] = useState("");
    const toggleStateFilter = () => {
        setStateFilter((prev) => !prev)
    }
    const handlePageChange = (event, value) => {
        setCurrentPage(value);
        fetchPageCountryData(value);
    }
    const fetchPageCountryData = async (page) => {
        setPageLoading(true)
        setCurrentPage(page);
        const data = {
            "user_id": 1234,
            "rows": ["id", "state", "countryname"],
            "filters": [],
            "sort_by": [],
            "order": "desc",
            "pg_no": Number(page),
            "pg_size": Number(currentPages),
            "search_key": ""
        };
        const response = await APIService.getStatesAdmin(data)
        const temp = await response.json();
        const result = temp.data;
        const t = temp.total_count;
        setTotalItems(t);
        setPageLoading(false);
        setExistingState(result)
    }

    const handleExcelDownload = async () => {
        const data = {
            "user_id": 1234,
            "rows": ["id", "state", "countryname"],
            "filters": [],
            "sort_by": [],
            "order": "asc",
            "pg_no": 0,
            "pg_size": 0
        };
        const response = await APIService.getStatesAdmin(data)
        const temp = await response.json();
        const result = temp.data;
        const worksheet = XLSX.utils.json_to_sheet(result);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        XLSX.writeFile(workbook, "StateData.xlsx");
        FileSaver.saveAs(workbook, "demo.xlsx");
    }

    const handleSearch = async () => {
        // console.log("clicked")
        setPageLoading(true);
        setIsSearchOn(true);
        const data = {
            "user_id": 1234,
            "rows": ["id", "state", "countryname"],
            "filters": [],
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
            "pg_no": 1,
            "pg_size": 15,
            "search_key": searchInput
        };
        const response = await APIService.getStatesAdmin(data)
        const temp = await response.json();
        const result = temp.data;
        const t = temp.total_count;
        setTotalItems(t);
        setPageLoading(false);
        setExistingState(result)
    }

    const handleCloseSearch = async () => {
        setIsSearchOn(false);
        setPageLoading(true);
        setSearchInput("");
        const data = {
            "user_id": 1234,
            "rows": ["id", "state", "countryname"],
            "filters": [],
            "sort_by": [sortField],
            "order": "desc",
            "pg_no": 1,
            "pg_size": Number(currentPages),
            "search_key": ""
        };
        const response = await APIService.getStatesAdmin(data)
        const temp = await response.json();
        const result = temp.data;
        const t = temp.total_count;
        setTotalItems(t);
        setPageLoading(false);
        setExistingState(result)
    }

    const [idFilter, setIdFilter] = useState(false);
    const [idFilterInput, setIdFilterInput] = useState("");
    const [countryFilter, setCountryFilter] = useState(false)
    const [countryFilterInput, setCountryFilterInput] = useState("");

    const filterMapping = {
        state: {
            filterType: "",
            filterValue: "",
            filterData: "String",
            filterInput: ""
        },
        countryname: {
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

    const newHandleFilter = async (inputVariable, setInputVariable, type, columnName) => {
        console.log(columnName)
        console.log('hey')
        console.log(filterMapState);
        if (columnName == 'status') {
            var existing = filterMapState;
            if (type == 'noFilter') {
                setInputVariable("");
            }
            if (inputVariable.toLowerCase() == 'active') {
                existing = {
                    ...existing, [columnName]: {
                        ...existing[columnName],
                        filterValue: 'true'
                    }
                }
                existing = {
                    ...existing, [columnName]: {
                        ...existing[columnName],
                        filterType: type == 'noFilter' ? "" : type
                    }
                }
            } else if (inputVariable.toLowerCase() == 'inactive') {
                existing = {
                    ...existing, [columnName]: {
                        ...existing[columnName],
                        filterValue: 'false'
                    }
                }
                existing = {
                    ...existing, [columnName]: {
                        ...existing[columnName],
                        filterType: type == 'noFilter' ? "" : type
                    }
                }
            } else {
                return;
            }

        } else {
            var existing = filterMapState;
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

            if (type == 'noFilter') setInputVariable("");
        }

        fetchFiltered(existing);
    }

    const fetchFiltered = async (mapState) => {
        setFilterMapState(mapState)
        const tempArray = [];
        // we need to query thru the object
        // console.log(filterMapState);
        console.log(filterMapState)
        Object.keys(mapState).forEach(key => {
            if (mapState[key].filterType != "") {
                tempArray.push([key, mapState[key].filterType, mapState[key].filterValue, mapState[key].filterData]);
            }
        })
        setPageLoading(true);
        const data = {
            "user_id": 1234,
            "rows": ["id", "state", "countryname"],
            "filters": tempArray,
            "sort_by": [sortField],
            "order": flag ? "asc" : "desc",
            "pg_no": Number(currentPage),
            "pg_size": Number(currentPages),
            "search_key": isSearchOn ? searchInput : ""
        };
        const response = await APIService.getStatesAdmin(data)
        const temp = await response.json();
        const result = temp.data;
        const t = temp.total_count;
        setTotalItems(t);
        setPageLoading(false);
        setExistingState(result)
    }

    const validate = () => {
        var res = true;
       
        if (!formValues.country) {
            setFormErrors((existing) => {
                return { ...existing, country: "Select Country" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, country: "" }
            })
        }
        if (!formValues.stateName) {
            setFormErrors((existing) => {
                return { ...existing, stateName: "Enter State" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, stateName: "" }
            })
        }

        return res;
    }

    return (
        <div className='h-screen'>
            <Navbar />


            <div className='h-[calc(100vh_-_7rem)] w-full px-10'>
                < div className='h-16 w-full  flex justify-between items-center p-2  border-gray-300 border-b-2'>
                    <div className='flex items-center space-x-3'>
                        <div className='rounded-2xl  bg-[#EBEBEB] h-8 w-8 flex justify-center items-center '>
                            <Link to="/dashboard"><img className='w-5 h-5' src={backLink} /></Link>
                        </div>

                        <div className='flex-col'>
                            <h1 className='text-lg' >State</h1>
                            <p className='text-sm'>Admin &gt; State</p>
                        </div>
                    </div>
                    <div className='flex space-x-2 items-center'>

                        <div className='flex bg-[#EBEBEB]'>
                            {/* search button */}
                            <input
                                className="h-9 w-48 bg-[#EBEBEB] text-[#787878] pl-3 outline-none"
                                type="text"
                                placeholder="  Search"
                                value={searchInput}
                                onChange={(e) => {
                                    setSearchInput(e.target.value);
                                }}
                            />
                            <button onClick={handleCloseSearch}><img src={Cross} className='w-5 h-5 mx-2' /></button>
                            <div className="h-9 w-10 bg-[#004DD7] flex items-center justify-center rounded-r-lg">
                                <button onClick={handleSearch}><img className="h-6" src={searchIcon} alt="search-icon" /></button>
                            </div>
                        </div>

                        <div>
                            {/* button */}
                            <button className="bg-[#004DD7] text-white h-9 w-60 rounded-lg" onClick={handleOpen}>
                                <div className="flex items-center justify-center gap-4">
                                    Add New State
                                    <img className='h-4 w-4' src={Add} alt="add" />
                                </div>
                            </button>
                        </div>

                    </div>

                </div>

                <div className='h-12 w-full bg-white flex justify-between'>
                    <div className='w-[80%] flex'>
                        <div className='w-[5%] p-4'>

                        </div>
                        <div className='w-[25%] px-4 py-2.5'>
                            <div className='w-[45%] flex items-center bg-[#EBEBEB] rounded-[5px]'>
                                <input className="w-[70%] bg-[#EBEBEB] rounded-[5px] text-xs pl-2 outline-none" value={countryFilterInput} onChange={(e) => { setCountryFilterInput(e.target.value) }} />
                                <button className='px-1 py-2 w-[30%]' onClick={() => { setCountryFilter((prev) => !prev) }}><img src={Filter} className='h-3 w-3' /></button>
                            </div>
                            {countryFilter && <CharacterFilter inputVariable={countryFilterInput} setInputVariable={setCountryFilterInput} handleFilter={newHandleFilter} filterColumn='countryname' menuRef={menuRef} />}
                        </div>
                        <div className='w-[20%] px-4 py-2.5'>
                            <div className='w-[55%] flex items-center bg-[#EBEBEB] rounded-[5px] text-xs pl-2 outline-none'>
                                <input className="w-[70%] bg-[#EBEBEB] rounded-[5px]" value={stateFilterInput} onChange={(e) => { setStateFilterInput(e.target.value) }} />
                                <button className='px-1 py-2 w-[30%]' onClick={() => { setStateFilter((prev) => !prev) }}><img src={Filter} className='h-3 w-3' /></button>
                            </div>
                            {stateFilter && <CharacterFilter inputVariable={stateFilterInput} setInputVariable={setStateFilterInput} handleFilter={newHandleFilter} filterColumn='state' menuRef={menuRef} />}
                        </div>
                    </div>
                    <div className='w-[20%]   px-4 py-2.5'>
                        <div className='w-[45%] flex items-center bg-[#EBEBEB] rounded-[5px] '>
                            <input className="w-[70%] bg-[#EBEBEB] rounded-[5px] text-xs pl-2 outline-none" value={idFilterInput} onChange={(e) => { setIdFilterInput(e.target.value) }} />
                            <button className='px-1 py-2 w-[30%]' onClick={() => { setIdFilter((prev) => !prev) }}><img src={Filter} className='h-3 w-3' /></button>
                        </div>
                        {idFilter && <NumericFilter columnName='id' inputVariable={idFilterInput} setInputVariable={setIdFilterInput} handleFilter={newHandleFilter} menuRef={menuRef} />}
                        <div className='w-1/2 p-4'>

                        </div>
                    </div>
                </div>

                <div className='h-[calc(100vh_-_14rem)] w-full  text-[12px]'>
                    <div className='w-full h-12 bg-[#F0F6FF] flex justify-between'>
                        <div className='w-[80%] flex'>
                            <div className='w-[5%] p-4'>
                                <p>Sr. </p>
                            </div>
                            <div className='w-[25%]  p-4'>
                                <p>Country <button onClick={() => handleSort("countryname")}><span className="font-extrabold">↑↓</span></button></p>
                            </div>
                            <div className='w-[45%]  p-4'>
                                <p>State <button onClick={() => handleSort("state")}><span className="font-extrabold">↑↓</span></button></p>
                            </div>
                        </div>
                        <div className='w-[20%] flex'>
                            <div className='w-1/2  p-4'>
                                <p>ID <button onClick={() => handleSort("id")}><span className="font-extrabold">↑↓</span></button></p>
                            </div>
                            <div className='w-1/2 p-4'>
                                <p>Edit</p>
                            </div>
                        </div>
                    </div>





                    <div className='w-full h-[calc(100vh_-_17rem)] overflow-auto'>
                        {!pageLoading && existingState
                            .map((item, index) => {
                                return <div className='w-full h-10 flex justify-between border-gray-400 border-b-[1px]'>
                                    <div className='w-[80%] flex'>
                                        <div className='w-[5%] px-4 py-2.5'>
                                            <p>{index + 1 + (currentPage - 1) * currentPages}</p>
                                        </div>
                                        <div className='w-[25%] px-4 py-2.5'>
                                            <p>{item[2]}</p>
                                        </div>
                                        <div className='w-[20%] px-4 py-2.5'>
                                            <p>{item[1]}</p>
                                        </div>
                                    </div>
                                    <div className='w-[20%]  flex'>
                                        <div className='w-1/2 px-4 py-2.5'>
                                            <p>{item[0]}</p>
                                        </div>
                                        <div className='w-1/2 0 p-4 flex items-center gap-5'>
                                            <img className='w-5 h-5' src={Edit} alt="edit" />
                                            <img className='w-5 h-5' src={Trash} alt="trash" />
                                        </div>
                                    </div>
                                </div>
                            })}
                        {/* we get all the existing cities here */}

                    </div>

                </div>

            </div>








            <div className='w-full h-12 flex justify-between px-6 '>
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
                                setCurrentPages(e.target.value);
                                console.log(e.target.value);
                                fetchSomeData(e.target.value)
                            }}

                        >
                            <option>
                                15
                            </option>
                            <option>
                                20
                            </option>
                            <option>
                                25
                            </option>
                        </select>
                    </div>
                    <div className="flex text-sm">
                        <p className="mr-11 text-gray-700">{totalItems} Items in {Math.ceil(totalItems / currentPages)} Pages</p>
                    </div>
                    {downloadModal && <div className='h-[120px] w-[220px] bg-white shadow-xl rounded-md absolute bottom-12 right-24 flex-col items-center  justify-center p-5'>
                        <button onClick={() => setDownloadModal(false)}><img src={Cross} className='absolute top-1 left-1 w-4 h-4' /></button>

                        <button>
                            <div className='flex space-x-2 justify-center items-center ml-3 mt-3'>

                                <p>Download as pdf</p>
                                <img src={Pdf} />
                            </div>
                        </button>
                        <button onClick={handleExcelDownload}>
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


            <Modal open={isStateDialogue}
                fullWidth={true}
                maxWidth={'md'}
                className='flex justify-center items-center'
            >
                <div className='flex justify-center'>
                    <div className="w-[800px]  h-auto bg-white rounded-lg">
                        <div className="h-[40px] bg-[#EDF3FF]  justify-center flex items-center rounded-t-lg">
                            <div className="mr-[270px] ml-[270px]">
                                <div className="text-base">Add New State</div>
                            </div>
                            <div className="flex justify-center items-center rounded-full w-7 h-7 bg-white">
                                <button onClick={handleClose}><img className="w-5 h-5" src={Cross} alt="cross" /></button>
                            </div>
                        </div>
                        {/* <form onSubmit={handleSubmit}> */}
                        <div className="h-auto w-full mt-4 mb-20 ">
                            <div className="flex gap-12 justify-center items-center">
                                <div className=" space-y-3 py-5">
                                    {/* <select className="w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm"
                                                name="country"
                                                value={formValues.country}
                                                defaultValue="Select Country"
                                                onChange={e => {
                                                    setselectedCountry(e.target.value);
                                                    fetchStateData(e);
                                                    setFormValues((existing) => {
                                                        const newData = {...existing, country: e.target.value}
                                                        return newData;
                                                    })
                                                    // fetchStateData(res);
                                                }}
                                            >
                                                {allCountry && allCountry.map(item => (
                                                    <option value={item}>
                                                        {item[1]}
                                                    </option>
                                                ))}
                                            </select> */}

                                    <div className="">
                                        <div className="text-sm">Country Name <label className="text-red-500">*</label></div>
                                        {/* <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="empName" value={formValues.stateName} onChange={handleChange} /> */}
                                        <select className='w-56 h-5 border-[1px] border-[#C6C6C6] px-3 text-xs outline-none'>
                                            {allCountry.map((item, index) => {
                                                return (
                                                    <option name="country"
                                                        value={formValues.country}
                                                        defaultValue="Select Country"
                                                        onChange={e => {
                                                            // setselectedCountry(e.target.value);
                                                            fetchStateData(e);
                                                            setFormValues((existing) => {
                                                                const newData = { ...existing, country: e.target.value }
                                                                return newData;
                                                            })
                                                        }}>
                                                        {item[1]}
                                                    </option>
                                                )
                                            })}
                                        </select>
                                        <div className="text-[10px] text-[#CD0000] ">{formErrors.country}</div>
                                    </div>
                                    <div className="">
                                        <div className="text-sm">State Name <label className="text-red-500">*</label></div>
                                        <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none" type="text" name="stateName" value={formValues.stateName} onChange={handleChange} />
                                    </div>
                                    <div className="text-[10px] text-[#CD0000] ">{formErrors.stateName}</div>
                                </div>
                            </div>
                        </div>

                        <div className="my-2 flex justify-center items-center gap-2">

                            <button className='w-28 h-10 bg-[#004DD7] text-white rounded-md' type="submit">Add</button>
                            <button className='w-28 h-10 border-[1px] border-[#282828] rounded-md' onClick={handleClose}>Cancel</button>
                        </div>
                        {/* </form> */}
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default State
