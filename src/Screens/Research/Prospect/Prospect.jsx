import React from 'react';
import { Outlet, Link } from "react-router-dom";
import backLink from "../../../assets/back.png";
import searchIcon from "../../../assets/searchIcon.png";
import nextIcon from "../../../assets/next.png";
import refreshIcon from "../../../assets/refresh.png";
import downloadIcon from "../../../assets/download.png";
import { useState, useEffect } from 'react';
import Navbar from "../../../Components/Navabar/Navbar";
import Edit from "../../../assets/edit.png";
import Trash from "../../../assets/trash.png";
import Cross from "../../../assets/cross.png";
import { APIService } from '../../../services/API';
import { Modal, LinearProgress, Pagination } from "@mui/material";
import EditProspect from './EditProspect';
import DeleteProspect from './DeleteProspect';
import Pdf from "../../../assets/pdf.png";
import Excel from "../../../assets/excel.png"
import * as XLSX from 'xlsx';
import FileSaver from 'file-saver';
import SucessfullModal from '../../../Components/modals/SucessfullModal';
const Prospect = () => {

    // we have the module here
    const [existingProspect, setExistingProspect] = useState([]);
    const [currentPages, setCurrentPages] = useState(15);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageLoading, setPageLoading] = useState(false);
    const [totalItems, setTotalItems] = useState(0);
    const [downloadModal, setDownloadModal] = useState(false);
    const [prospectError, setProspectError] = useState("");
    const [prospectName, setProspectName] = useState("");
    const [currItem, setCurrItem] = useState({});
    const [allCountry, setAllCountry] = useState([]);
    const [allState, setAllState] = useState([]);
    const [allCity, setAllCity] = useState([]);
    const [currCountry, setCurrCountry] = useState(-1);
    const [searchInput,setSearchInput] = useState("");
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
        console.log(result.data);
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
    const fetchCityData = async (id) => {
        const data = { "user_id": 1234, "state_name": id };
        const response = await APIService.getCities(data);
        const result = (await response.json()).data;
        console.log(result);
        if (Array.isArray(result)) {
            setAllCity(result)
            // if (result.length > 0) {
            //     setFormValues((existing) => {
            //         const newData = { ...existing, city: result[0].id }
            //         return newData;
            //     })
            // }
        }
    }
    useEffect(() => {
        fetchData();
        fetchCountryData();
    }, []);
    const fetchData = async () => {
        setPageLoading(true);
        const data = {
            "user_id": 1234,
            "rows": ["id", "personname", "suburb", "city","state", "country", "propertylocation", "possibleservices"],
            "filters": [],
            "sort_by": [],
            "order": "asc",
            "pg_no": 1,
            "pg_size": 15,
            "search_key" : searchInput
        };
        const response = await APIService.getProspects(data)
        const temp = await response.json();
        const result = temp.data;
        const t = temp.total_count;
        setTotalItems(t);
        console.log(result);
        setExistingProspect(result);
        setPageLoading(false);
    }
    const addProspect = async () => {
        if(!validate()) {
            return ;
        }
        // setPageLoading(true);
        const data = {
            "user_id": 1234,
            "personname": formValues.personName,
            "suburb": formValues.suburb,
            "city": formValues.city,
            "state": formValues.state,
            "country": Number(formValues.country),
            "propertylocation": formValues.propertyLocation,
            "possibleservices": formValues.possibleServices,
            "dated": "2024-01-01 00:00:00",
            "createdby": 1234,
            "isdeleted": false
        }
        const response = await APIService.addProspects(data);
        console.log(response);
        setIsProspectDialogue(false);
        // setPageLoading(false);
        openAddSuccess();
        fetchData();
    }

    const deleteProspects = async (id) => {
        console.log(id);
        const data = {
            "user_id":1234,
            "id":Number(id)
        };
        const response = await APIService.deleteProspects(data);
        console.log(response);
        fetchData();
      }
    //Validation of the form
    const initialValues = {
        personName: "",
        country: "",
        state: "",
        city: "",
        suburb: "",
        propertyLocation: "",
        possibleServices: ""
    };

    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };
    const validate = () => {
        var res = true;
        if(!formValues.personName) {
            setFormErrors((existing) => {
               return {...existing,personName: "Enter Person Name"}
            })
            res = false;
        }else {
            setFormErrors((existing) => {
                return {...existing,personName: ""}
             })
        }
        if(!formValues.country) {
            setFormErrors((existing) => {
               return  {...existing,country: "Enter Country Name"}
            })
            res = false;
        }else {
            setFormErrors((existing) => {
                return  {...existing,country: ""}
             })
        }
        if(!formValues.state) {
            setFormErrors((existing) => {
               return  {...existing,state: "Enter State Name"}
            })
            res = false;
        }else {
            setFormErrors((existing) => {
                return  {...existing,state: ""}
             })
        }
        if(!formValues.city) {
            setFormErrors((existing) => {
               return  {...existing,city: "Enter City Name"}
            })
            res = false;
        }else {
            setFormErrors((existing) => {
                return  {...existing,city: ""}
             })
        }
        if(!formValues.suburb) {
            setFormErrors((existing) => {
               return  {...existing,suburb: "Enter Suburb Name"}
            })
            res = false;
        }else {
            setFormErrors((existing) => {
                return  {...existing,suburb: ""}
             })
        }
        if(!formValues.possibleServices) {
            setFormErrors((existing) => {
               return  {...existing,possibleServices: "Enter Possible Services"}
            })
            res = false;
        }else {
            setFormErrors((existing) => {
                return  {...existing,possibleServices: ""}
             })
        }
        if(!formValues.propertyLocation) {
            setFormErrors((existing) => {
               return  {...existing,propertyLocation: "Enter Property Location"}
            })
            res = false;
        }else {
            setFormErrors((existing) => {
                return  {...existing,propertyLocation: ""}
             })
        }
        return res;
    };

    const [isProspectDialogue, setIsProspectDialogue] = React.useState(false);
    const handleOpen = () => {
        setIsProspectDialogue(true);
    };
    const handleClose = () => {
        setIsProspectDialogue(false);
    }

    const [isEditDialogue, setIsEditDialogue] = React.useState(false);
    const handleOpenEdit = (oldItem) => {
        setCurrItem(oldItem)
        setIsEditDialogue(true);
    };
    const handleCloseEdit = () => {
        setIsEditDialogue(false);
    }

    const [isDeleteDialogue, setIsDeleteDialogue] = React.useState(false);
    const handleOpenDelete = (item) => {
        setIsDeleteDialogue(true);
        setCurrItem(item)
    };
    const handleCloseDelete = () => {
        setIsDeleteDialogue(false);
    }
    const openDownload = () => {
        setDownloadModal((prev) => !prev);
    }
    const handleExcelDownload = async () => {
        const data = {
            "user_id": 1234,
            "rows": ["id", "personname", "suburb", "city","state", "country", "propertylocation", "possibleservices"],
            "filters": [],
            "sort_by": [],
            "order": "asc",
            "pg_no": 0,
            "pg_size": 0
        };
        const response = await APIService.getProspects(data)
        const temp = await response.json();
        const result = temp.data;
        const worksheet = XLSX.utils.json_to_sheet(result);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        XLSX.writeFile(workbook, "ProspectsData.xlsx");
        FileSaver.saveAs(workbook, "demo.xlsx");
    }
    const handleRefresh = async () => {
        await fetchData();
    }
    const handleSearch = async () => {
        setPageLoading(true);
        
        const data = {
            "user_id": 1234,
            "rows": ["id", "personname", "suburb", "city","state", "country", "propertylocation", "possibleservices"],
            "filters": [],
            "sort_by": [],
            "order": "asc",
            "pg_no": 0,
            "pg_size": 0,
            "search_key" : searchInput
        };
        const response = await APIService.getProspects(data)
        const temp = await response.json();
        const result = temp.data;
        const t = temp.total_count;
        setTotalItems(t);
        console.log(result);
        setExistingProspect(result);
        setPageLoading(false);
    }
    const handleCloseSearch = async () => {
        setPageLoading(true);
        setSearchInput("");
        const data = {
            "user_id": 1234,
            "rows": ["id", "personname", "suburb", "city","state", "country", "propertylocation", "possibleservices"],
            "filters": [],
            "sort_by": [],
            "order": "asc",
            "pg_no": 1,
            "pg_size": Number(currentPages),
            "search_key" : ""
        };
        const response = await APIService.getProspects(data)
        const temp = await response.json();
        const result = temp.data;
        const t = temp.total_count;
        setTotalItems(t);
        console.log(result);
        setExistingProspect(result);
        setPageLoading(false);
    }
    const [showAddSuccess,setShowAddSuccess] = useState(false);
    const openAddSuccess = () => {
        setShowAddSuccess(true);
        setTimeout(function () {
            setShowAddSuccess(false);
        }, 2000)
    }
    const [showEditSuccess,setShowEditSuccess] = useState(false);
    const openEditSuccess = () => {
        setIsEditDialogue(false);
        setShowEditSuccess(true);
        setTimeout(function () {
            setShowEditSuccess(false);
        }, 2000)
        fetchData();
    }
    return (
        <div>
            <Navbar />
            {isEditDialogue && <EditProspect isOpen={isEditDialogue} handleClose={() => setIsEditDialogue(false)} item={currItem}
                fetchData={fetchData} openPrompt={openEditSuccess}/>}
            {isDeleteDialogue && <DeleteProspect openDialog={isDeleteDialogue} setOpenDialog={setIsDeleteDialogue} item={currItem} />}
            {showAddSuccess && <SucessfullModal isOpen={showAddSuccess} message="prospect added succesffuly"/>}
            {showEditSuccess && <SucessfullModal isOpen={showEditSuccess} message="prospect edited succesffuly"/>}
            <div className='flex-col w-full h-full  bg-white'>
                <div className='flex-col'>
                    {/* this div will have all the content */}
                    <div className='w-full  flex-col px-6'>
                        {/* the top section of the div */}
                        <div className='h-1/2 w-full  flex justify-between items-center p-2  border-gray-300 border-b-2'>
                            <div className='flex items-center space-x-3'>
                                <div className='rounded-2xl  bg-[#EBEBEB] h-8 w-8 flex justify-center items-center'>
                                    <img className='h-5 w-5' src={backLink} />
                                </div>

                                <div className='flex-col'>
                                    <h1 className='text-[18px]'>Prospect</h1>
                                    <p className='text-[14px]'>Research &gt; Prospect</p>
                                </div>
                            </div>
                            <div className='flex space-x-2 items-center relative'>

                                <div className='flex'>
                                    {/* search button */}
                                    <input
                                        className="h-[36px] bg-[#EBEBEB] text-[#787878]"
                                        type="text"
                                        placeholder="  Search"
                                        value={searchInput}
                                        onChange={(e) => setSearchInput(e.target.value)}
                                    />
                                    <button onClick={handleCloseSearch}><img src={Cross} className='absolute w-[20px] h-[20px] left-[160px] top-2' /></button>
                                    <div className="h-[36px] w-[40px] bg-[#004DD7] flex items-center justify-center rounded-r-lg">
                                        <button onClick={handleSearch}><img className="h-[26px] " src={searchIcon} alt="search-icon" /></button>
                                    </div>
                                </div>

                                <div>
                                    {/* button */}
                                    <button className="bg-[#004DD7] text-white h-[36px] w-[200px] rounded-lg" onClick={handleOpen}>
                                        Add New Prospect +
                                    </button>
                                </div>

                            </div>

                        </div>
                        <div className='h-12 w-full bg-white'>
                            <div className='flex justify-between'>
                                <div className='w-[85%] flex'>
                                    <div className='w-[5%] p-4'>
                                        {/* <p>Sr. </p> */}
                                    </div>
                                    <div className='w-[25%]  px-4 py-3'>
                                        <input className="w-14 h-6 bg-[#EBEBEB] rounded-md" />
                                    </div>
                                    <div className='w-[15%]  px-4 py-3'>
                                        <input className="w-14 h-6 bg-[#EBEBEB] rounded-md" />
                                    </div>
                                    <div className='w-[15%]  px-4 py-3'>
                                        <input className="w-14 h-6 bg-[#EBEBEB] rounded-md" />
                                    </div>
                                    <div className='w-[20%]  px-4 py-3'>
                                        {/* <input className="w-14 bg-[#EBEBEB]"/> */}
                                    </div>
                                    <div className='w-[20%]  px-4 py-3'>
                                        <input className="w-14 h-6 bg-[#EBEBEB] rounded-md" />
                                    </div>
                                </div>
                                <div className='w-[15%] flex'>
                                    <div className='w-1/2  px-4 py-3'>
                                        <input className="w-14 h-6 bg-[#EBEBEB] rounded-md" />
                                    </div>
                                    <div className='w-1/2 0 p-4'>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='w-full h-[400px] bg-white px-6 text-[12px]'>
                        <div className='w-full h-12 bg-[#F0F6FF] flex justify-between'>
                            <div className='w-[85%] flex'>
                                <div className='w-[5%] p-4'>
                                    <p>Sr. </p>
                                </div>
                                <div className='w-[25%]  p-4'>
                                    <p>Person Name</p>
                                </div>
                                <div className='w-[15%]  p-4'>
                                    <p>Suburb</p>
                                </div>
                                <div className='w-[15%]  p-4'>
                                    <p>City</p>
                                </div>
                                <div className='w-[20%]  p-4'>
                                    <p>Property Location</p>
                                </div>
                                <div className='w-[20%]  p-4'>
                                    <p>Possible Location</p>
                                </div>
                            </div>
                            <div className='w-[15%] flex'>
                                <div className='w-1/2  p-4'>
                                    <p>ID</p>
                                </div>
                                <div className='w-1/2 0 p-4'>
                                    <p>Edit</p>
                                </div>
                            </div>
                        </div>
                        <div className='w-full h-[450px] overflow-auto'>
                            {pageLoading && <div className='ml-5 mt-5'><LinearProgress /></div>}
                            {!pageLoading && existingProspect.map((item, index) => {
                                return <div className='w-full h-12  flex justify-between border-gray-400 border-b-[1px]'>
                                    <div className='w-[85%] flex'>
                                        <div className='w-[5%] p-4'>
                                            <p>{index + 1}</p>
                                        </div>
                                        <div className='w-[25%]  p-4'>
                                            <p>{item.personname}</p>
                                        </div>
                                        <div className='w-[15%]  p-4'>
                                            <p>{item.suburb}</p>
                                        </div>
                                        <div className='w-[15%]  p-4'>
                                            <p>{item.city}</p>
                                        </div>
                                        <div className='w-[20%]  p-4'>
                                            <p>{item.propertylocation}</p>
                                        </div>
                                        <div className='w-[20%]  p-4'>
                                            <p>{item.possibleservices}</p>
                                        </div>
                                    </div>
                                    <div className='w-[15%] flex'>
                                        <div className='w-1/2  p-4'>
                                            <p>{item.id}</p>
                                        </div>
                                        <div className='w-1/2 0 p-4 flex justify-between items-center'>
                                            <img className='w-5 h-5 cursor-pointer' src={Edit} alt="edit" onClick={() => handleOpenEdit(item)} />
                                            <img className='w-5 h-5 cursor-pointer' src={Trash} alt="trash" onClick={() => deleteProspects(item.id)} />
                                        </div>
                                    </div>
                                </div>
                            })}
                            {/* we get all the existing prospect here */}

                        </div>
                    </div>
                    <div className='w-full h-12 flex justify-between justify-self-end px-6 mt-5 fixed bottom-0 '>
                        {/* <div className="w-full h-[2px] bg-[#CBCBCB] mb-[2px]"></div> */}
                        {/* footer component */}
                        <div className='ml-2'>
                            <div className='flex items-center w-auto h-full'>
                                {/* items */}
                                <div className='h-12 flex justify-center items-center'>
                                    {/* <img src={backLink} className='h-2/4' /> */}
                                </div>
                                <div className='flex space-x-1 mx-5'>
                                    {/* pages */}
                                    {/* <div className='w-6 bg-[#DAE7FF] p-1 pl-2 rounded-md'>
                                        <p>1</p>
                                    </div>
                                    <div className='w-6  p-1 pl-2'>
                                        <p>2</p>
                                    </div>
                                    <div className='w-6 p-1 pl-2'>
                                        <p>3</p>
                                    </div>
                                    <div className='w-6  p-1 pl-2'>
                                        <p>4</p>
                                    </div> */}
                                </div>
                                <div className='h-12 flex justify-center items-center'>
                                    {/* right button */}
                                    {/* <img src={nextIcon} className='h-2/4' /> */}
                                </div>
                            </div>
                            <div>
                                {/* items per page */}
                            </div>
                        </div>
                        {downloadModal && <div className='h-[120px] w-[220px] bg-white shadow-xl rounded-md absolute bottom-12 right-24 flex-col items-center justify-center  p-5'>
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
                        <div className='flex mr-10 justify-center items-center space-x-2 '>
                            <div className='border-solid border-black border-[0.5px] rounded-md w-28 h-10 flex items-center justify-center space-x-1' >
                                {/* refresh */}
                                <button onClick={handleRefresh}><p>Refresh</p></button>
                                <img src={refreshIcon} className='h-1/2' />
                            </div>
                            <div className='border-solid border-black border-[1px] w-28 rounded-md h-10 flex items-center justify-center space-x-1'>
                                {/* download */}
                                <button onClick={openDownload}><p>Download</p></button>
                                <img src={downloadIcon} className='h-1/2' />
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            {/* modal goes here */}
            <Modal open={isProspectDialogue}
                fullWidth={true}
                maxWidth={'md'}
            >
                <div className='flex justify-center mt-[10px]'>
                    <div className="w-6/7  h-auto bg-white rounded-lg">
                        <div className="h-[40px] bg-[#EDF3FF]  justify-center flex items-center">
                            <div className="mr-[410px] ml-[410px]">
                                <div className="text-[16px]">New Prospect</div>
                            </div>
                            <div className="flex justify-center items-center rounded-full w-[30px] h-[30px] bg-white">
                                <button onClick={handleClose}><img className="w-[20px] h-[20px]" src={Cross} alt="cross" /></button>
                            </div>
                        </div>
                        {/* <form > */}
                            <div className="h-auto w-full mt-[5px] ">
                                <div className="flex gap-[48px] justify-center">
                                    <div className=" space-y-[12px] py-[20px] px-[10px]">
                                        <div className="">
                                            <div className="text-[14px]">Person Name<label className="text-red-500">*</label></div>
                                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="personName" value={formValues.personName} onChange={handleChange} />
                                            <div className="text-[12px] text-[#CD0000] ">{formErrors.personName}</div>
                                        </div>
                                        <div className="">
                                            <div className="text-[14px]">Country Name<label className="text-red-500">*</label></div>
                                            <select className="w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm"
                                                name="country"
                                                value={formValues.country}
                                                defaultValue="Select Country"
                                                onChange={e => {
                                                    // setselectedCountry(e.target.value);
                                                    // fetchStateData(e);
                                                    // console.log(e.target.value);
                                                    setCurrCountry(e.target.value);
                                                    fetchStateData(e.target.value);
                                                    setFormValues((existing) => {
                                                        const newData = { ...existing, country: e.target.value }
                                                        return newData;
                                                    })
                                                    // fetchStateData(res);
                                                }}
                                            >
                                                <option value="none" hidden={true}>Select a Country</option>
                                                {allCountry && allCountry.map(item => (
                                                    <option value={item[0]} >
                                                        {item[1]}
                                                    </option>

                                                ))}
                                                
                                            </select>
                                            <div className="text-[12px] text-[#CD0000] ">{formErrors.country}</div>
                                        </div>
                                        <div className="">
                                            <div className="text-[14px]">State Name<label className="text-red-500">*</label></div>
                                            <select className="w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm"
                                                name="country"
                                                value={formValues.state}
                                                defaultValue="Select State"
                                                onChange={e => {
                                                    fetchCityData(e.target.value);
                                                    setFormValues((existing) => {
                                                        const newData = { ...existing, state: e.target.value }
                                                        return newData;
                                                    })

                                                }}
                                            >
                                                <option value="none" hidden={true}>Select a State</option>
                                                {allState && allState.map(item => (
                                                    <option value={item[1]}>
                                                        {item[1]}
                                                    </option>

                                                ))}
                                            </select>
                                            <div className="text-[12px] text-[#CD0000] ">{formErrors.state}</div>
                                        </div>
                                        <div className="">
                                            <div className="text-[14px]">City Name <label className="text-red-500">*</label></div>
                                            <select className="w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm"
                                                name="country"
                                                value={formValues.city}
                                                defaultValue="Select State"
                                                onChange={e => {

                                                    console.log(e.target.value);
                                                    setFormValues((existing) => {
                                                        const newData = { ...existing, city: e.target.value }
                                                        return newData;
                                                    })

                                                }}
                                            >
                                                <option value="none" hidden={true}>Select a City</option>
                                                {allCity && allCity.map(item => (
                                                    <option value={item.city} >
                                                        {item.city}
                                                    </option>
                                                ))}
                                            </select>
                                            <div className="text-[12px] text-[#CD0000] ">{formErrors.city}</div>
                                        </div>
                                        <div className="">
                                            <div className="text-[14px]">Suburb <label className="text-red-500">*</label></div>
                                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="suburb" value={formValues.suburb} onChange={handleChange} />
                                            <div className="text-[12px] text-[#CD0000] ">{formErrors.suburb}</div>
                                        </div>
                                        <div className="">
                                            <div className="text-[14px]">Property Location <label className="text-red-500">*</label></div>
                                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="propertyLocation" value={formValues.propertyLocation} onChange={handleChange} />
                                            <div className="text-[12px] text-[#CD0000] ">{formErrors.propertyLocation}</div>
                                        </div>
                                        <div className="">
                                            <div className="text-[14px]">Possible Services <label className="text-red-500">*</label></div>
                                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="possibleServices" value={formValues.possibleServices} onChange={handleChange} />
                                            <div className="text-[12px] text-[#CD0000] ">{formErrors.possibleServices}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="my-[10px] flex justify-center items-center gap-[10px]">
                                <button className='w-[100px] h-[35px] bg-[#004DD7] text-white rounded-md' onClick={addProspect}>Add</button>
                                <button className='w-[100px] h-[35px] border-[1px] border-[#282828] rounded-md' onClick={handleClose}>Cancel</button>
                            </div>
                        {/* </form> */}
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default Prospect;