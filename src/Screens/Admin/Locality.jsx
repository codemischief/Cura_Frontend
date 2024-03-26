import React from 'react';
import { Outlet, Link } from "react-router-dom";
import backLink from "../../assets/back.png";
import searchIcon from "../../assets/searchIcon.png";
import nextIcon from "../../assets/next.png";
import refreshIcon from "../../assets/refresh.png";
import downloadIcon from "../../assets/download.png";
import { useState, useEffect } from 'react';
import Navbar from "../../Components/Navabar/Navbar";
import Cross from "../../assets/cross.png";
import Edit from "../../assets/edit.png";
import Trash from "../../assets/trash.png";
import { Modal , CircularProgress, LinearProgress , Pagination} from "@mui/material";
import * as XLSX from 'xlsx';
import FileSaver from 'file-saver';
import { APIService } from '../../services/API';
import Filter from "../../assets/filter.png"
import Pdf from "../../assets/pdf.png";
import Excel from "../../assets/excel.png"
import EditLobModal from './Modals/EditLobModal';
const Locality = () => {
    const [existingLocalities,setExistingLocalities] = useState([]);
    const [currentPages,setCurrentPages] = useState(15);
    const [currentPage,setCurrentPage] = useState(1);
    const [pageLoading,setPageLoading] = useState(false);
    const [totalItems,setTotalItems] = useState(0);
    const [downloadModal,setDownloadModal] = useState(false);
    const [editModal,setEditModal] = useState(false);
    const [lobError,setLobError] = useState("");
    const [currItem,setCurrItem] = useState({});
    const [allCountry,setAllCountry] = useState([]);
    const [allState,setAllState] = useState([]);
    const [allCity,setAllCity] = useState([]);
    const [currCountry,setCurrCountry] = useState(-1);
    const [isSearchOn,setIsSearchOn] = useState(false);
    const initialValues = {
        country : 0,
        state : 0,
        city : 0,
        locality : ""
    }
    const [formValues,setFormValues] = useState(initialValues);
    
    const fetchCountryData = async () => {
        setPageLoading(true);
        // const data = { "user_id":  1234 };
        const data = {"user_id":1234,"rows":["id","name"],"filters":[],"sort_by":[],"order":"asc","pg_no":0,"pg_size":0};
        const response = await APIService.getCountries(data)
        const result = (await response.json()).data;
        console.log(result.data);
        
        if(Array.isArray(result.data)) {
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
        if(Array.isArray(result)){
            setAllState(result)
        }
    }
    const fetchCityData = async (id) => {
        const data = { "user_id": 1234, "state_id": id };
        const response = await APIService.getCities(data);
        const result = (await response.json()).data;
        console.log(result);
        if(Array.isArray(result)){
            setAllCity(result)
            if(result.length > 0) {
                setFormValues((existing) => {                                
                    const newData = {...existing, city: result[0].id}
                    return newData;
                })
            }
        }
    }
    useEffect(() => {
        fetchData();
        fetchCountryData();
    }, []);
    const fetchPageData = async (pageNumber) => {
        setPageLoading(true);
        setCurrentPage(pageNumber);
        const data = { 
            "user_id" : 1234,
            "rows" : ["id","country","cityid","city","state","locality"],
            "filters" : [],
            "sort_by" : [],
            "order" : "asc",
            "pg_no" : Number(pageNumber),
            "pg_size" : Number(currentPages),
            "search_key" : isSearchOn ? searchQuery : ""
         };
        const response = await APIService.getLocality(data)
        const temp = await response.json();
        const result = temp.data;
        const t = temp.total_count;
        setTotalItems(t);
        setExistingLocalities(result);
        setPageLoading(false);
    }
    const fetchQuantityData = async (number) => {
        setPageLoading(true);
        const data = { 
            "user_id" : 1234,
            "rows" : ["id","country","cityid","city","state","locality"],
            "filters" : [],
            "sort_by" : [],
            "order" : "asc",
            "pg_no" : Number(currentPage),
            "pg_size" : Number(number),
            "search_key" : isSearchOn ? searchQuery : ""
         };
        const response = await APIService.getLocality(data)
        const temp = await response.json();
        const result = temp.data;
        if(number == 25) console.log(result);
        const t = temp.total_count;
        setTotalItems(t);
        setExistingLocalities(result);
        setPageLoading(false);
    }
    const fetchData = async () => {
        setPageLoading(true);
        const data = { 
            "user_id" : 1234,
            "rows" : ["id","country","cityid","city","state","locality"],
            "filters" : [],
            "sort_by" : [],
            "order" : "asc",
            "pg_no" : Number(currentPage),
            "pg_size" : Number(currentPages),
            "search_key" : isSearchOn ? searchQuery : ""
         };
         console.log(data);
        const response = await APIService.getLocality(data)
        const temp = await response.json();
        const result = temp.data;
        const t = temp.total_count;
        setTotalItems(t);
        console.log(t);
        console.log(result);
        setExistingLocalities(result);
        setPageLoading(false);
    }
    const handleSort = async (field) => {
            setPageLoading(true);
            const data = { 
                "user_id" : 1234,
                "rows" : ["id","country","cityid","city","state","locality"],
                "filters" : [],
                "sort_by" : [field],
                "order" : flag ? "asc" : "desc",
                "pg_no" : 1,
                "pg_size" : Number(currentPages),
                "search_key" : isSearchOn ? searchQuery : ""
            };
            const response = await APIService.getLocality(data)
            const temp = await response.json();
            const result = temp.data;
            const t = temp.total_count;
            setTotalItems(t);
            // setExistingLOB(result);
            setFlag((prev) => {
                return !prev;
            })
            setPageLoading(false);
    }
    const addLocality = async () => {
        const data = {
            "user_id" : 1234,
            "cityid" : formValues.city,
            "locality" : formValues.locality
        }
        console.log(data);
        const response = await APIService.addLocality(data);
        const res = await response.json();
        console.log(res);
        setIsLocalityDialogue(false);
        fetchData();
    }
    const deleteLob = async (name) => {
        // we write delete lob logic here
        // setPageLoading(true);
        // const data = {
        //     "user_id" : 1234,
        //     "name" : String(name)
        // }
        // const response = await APIService.deleteLob(data);
        // // fetchPageData();
        // fetchData();
        // setPageLoading(false);
    }
    const [isLocalityDialogue, setIsLocalityDialogue] = React.useState(false);
    const handleOpen = () => {
        setIsLocalityDialogue(true);
    };
    const handleClose = () => {
        setIsLocalityDialogue(false);
    }
    const handleExcelDownload = async () => {
        const data = { 
            "user_id" : 1234,
            "rows" : ["id","country","cityid","city","state","locality"],
            "filters" : [],
            "sort_by" : [],
            "order" : "asc",
            "pg_no" : 0,
            "pg_size" : 0,
            "search_key" : isSearchOn ? searchQuery : ""
         };
        const response = await APIService.getLob(data)
        const temp = await response.json();
        const result = temp.data;
        const worksheet = XLSX.utils.json_to_sheet(result);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook,worksheet,"Sheet1");
        XLSX.writeFile(workbook,"LobData.xlsx");
        FileSaver.saveAs(workbook,"demo.xlsx");
      }
      const [lobName,setLobName] = useState("");
      const [searchQuery,setSearchQuery] = useState("");
      const handleRefresh = () => {
        fetchData();
      }
      const handleChange = (e) => {
        const { value } = e.target;
        console.log(value);
        setLobName(value);
      }
      const [flag,setFlag] = useState(true);
      const handleSearch = async () => {
        setPageLoading(true);
        setIsSearchOn(true);
        const data = { 
            "user_id" : 1234,
            "rows" : ["id","country","cityid","city","state","locality"],
            "filters" : [],
            "sort_by" : [],
            "order" : "asc",
            "pg_no" : Number(currentPage),
            "pg_size" : Number(currentPages),
            "search_key" : searchQuery
         };
        const response = await APIService.getLocality(data)
        const temp = await response.json();
        const result = temp.data;
        const t = temp.total_count;
        setTotalItems(t);
        console.log(t);
        setExistingLocalities(result);
        setPageLoading(false);
      }
      const [lobFilter,setLobFilter] = useState(false);
      const [lobFilterInput,setLobFilterInput] = useState("");
      const toggleLobFilter = () => {
           setLobFilter((prev) => !prev)
      }
      const fetchFiltered = async (filterType,filterField) => {
        const filterArray = [];
        
        setPageLoading(true);
        const data = { 
            "user_id" : 1234,
            "rows" : ["id","name"],
            "filters" : [["name",String(filterType),lobFilterInput]],
            "sort_by" : [],
            "order" : "asc",
            "pg_no" : 1,
            "pg_size" : Number(currentPages),
            "search_key" : isSearchOn ? searchQuery : ""
         };
        const response = await APIService.getLob(data)
        const temp = await response.json();
        const result = temp.data;
        const t = temp.total_count;
        setTotalItems(t);
        // setExistingLOB(result);
        setFlag((prev) => {
            return !prev;
        })
        setPageLoading(false);
      }
      const handlePageChange = (event,value) => {
        console.log(value);
         setCurrentPage(value)
         fetchPageData(value);
      }
      const openDownload = () => {
        setDownloadModal((prev) => !prev);
      }
      const handleOpenEdit = (oldItem) => {
        setEditModal(true);
        setCurrItem(oldItem)
      }
      const handleCloseSearch = async () => {
         setPageLoading(true);
         setSearchQuery("");
         setIsSearchOn(false);
         const data = { 
            "user_id" : 1234,
            "rows" : ["id","country","cityid","city","state","locality"],
            "filters" : [],
            "sort_by" : [],
            "order" : "asc",
            "pg_no" : Number(currentPage),
            "pg_size" : Number(currentPages),
            "search_key" : ""
         };
        const response = await APIService.getLocality(data)
        const temp = await response.json();
        const result = temp.data;
        const t = temp.total_count;
        setTotalItems(t);
        console.log(t);
        setExistingLocalities(result);
         setPageLoading(false);
      }
      const deleteLocality = async (id) => {
        console.log(id);
        const data = {
            "user_id":1234,
            "id":Number(id)
        };
        const response = await APIService.deleteLocality(data);
        console.log(response);
        fetchData();
      }
    return (
        <div className=''>
            <Navbar />
            {editModal && <EditLobModal isOpen={editModal} handleClose={() => setEditModal(false)} item={currItem} fetchData={fetchData}/>}
            <div className='flex-col w-full h-full '>
                <div className='flex-col'>
                    {/* this div will have all the content */}
                    <div className='w-full  flex-col px-6'>
                        {/* the top section of the div */}
                        <div className='h-1/2 w-full  flex justify-between items-center p-2  border-gray-300 border-b-2'>
                            <div className='flex items-center space-x-3'>
                                <div className='rounded-2xl  bg-[#EBEBEB] h-8 w-8 '>
                                    <Link to="/dashboard"><img src={backLink} /></Link>
                                </div>

                                <div className='flex-col'>
                                    <h1>LOB</h1>
                                    <p>Admin &gt; Localities</p>
                                </div>
                            </div>
                            <div className='flex space-x-2 items-center'>

                                <div className='flex relative'>
                                    {/* search button */}
                                    <input
                                        className="h-[36px] bg-[#EBEBEB] text-[#787878] pl-2"
                                        type="text"
                                        placeholder="Search"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value) }
                                    />
                                    <button onClick={handleCloseSearch}><img src={Cross} className='absolute w-[20px] h-[20px] left-[160px] top-2'/></button>
                                    <div className="h-[36px] w-[40px] bg-[#004DD7] flex items-center justify-center rounded-r-lg">
                                        <button onClick={handleSearch}><img className="h-[26px] " src={searchIcon} alt="search-icon" /></button>
                                    </div>
                                </div>

                                <div>
                                    {/* button */}
                                    <button className="bg-[#004DD7] text-white h-[30px] w-[200px] rounded-lg" onClick={handleOpen}>
                                        Add New LOB +
                                    </button>
                                </div>

                            </div>

                        </div>
                        <div className='h-12 w-full bg-white flex justify-between'>
                             <div className='w-[85%] flex'>
                                <div className='w-[5%] p-4'>
                                    {/* <p>Sr. </p> */}
                                </div>
                                <div className='w-[15%] p-4'>
                                   <input className="w-14 bg-[#EBEBEB]" value={lobFilterInput} onChange={(e) => setLobFilterInput(e.target.value)}/>
                                   <button className='p-1' onClick={toggleLobFilter}><img src={Filter} className='h-[17px] w-[17px]'/></button>
                                   {lobFilter && <div className='h-[270px] w-[150px] mt-3 bg-white shadow-xl font-thin font-sans absolute p-2 flex-col rounded-md space-y-1 text-sm'>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                              <h1 >No Filter</h1>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                              <button onClick={() => fetchFiltered('contains')}><h1 >Contains</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                            <button onClick={() => fetchFiltered('contains')}><h1 >DoesNotContain</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                            <button onClick={() => fetchFiltered('startsWith')}><h1 >StartsWith</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer '>
                                            <button onClick={() => fetchFiltered('endsWith')}><h1 >EndsWith</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                            <button onClick={() => fetchFiltered('exactMatch')}><h1 >EqualTo</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                               <button onClick={() => fetchFiltered('isNull')}><h1 >isNull</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                               <button onClick={() => fetchFiltered('isNotNull')}><h1 >NotIsNull</h1></button>
                                            </div>
                                        </div>} 
                                </div>
                                <div className='w-[20%] p-4'>
                                   <input className="w-14 bg-[#EBEBEB]" value={lobFilterInput} onChange={(e) => setLobFilterInput(e.target.value)}/>
                                   <button className='p-1' onClick={toggleLobFilter}><img src={Filter} className='h-[17px] w-[17px]'/></button>
                                   {lobFilter && <div className='h-[270px] w-[150px] mt-3 bg-white shadow-xl font-thin font-sans absolute p-2 flex-col rounded-md space-y-1 text-sm'>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                              <h1 >No Filter</h1>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                              <button onClick={() => fetchFiltered('contains')}><h1 >Contains</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                            <button onClick={() => fetchFiltered('contains')}><h1 >DoesNotContain</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                            <button onClick={() => fetchFiltered('startsWith')}><h1 >StartsWith</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer '>
                                            <button onClick={() => fetchFiltered('endsWith')}><h1 >EndsWith</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                            <button onClick={() => fetchFiltered('exactMatch')}><h1 >EqualTo</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                               <button onClick={() => fetchFiltered('isNull')}><h1 >isNull</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                               <button onClick={() => fetchFiltered('isNotNull')}><h1 >NotIsNull</h1></button>
                                            </div>
                                        </div>} 
                                </div>

                                <div className='w-[20%] p-4'>
                                   <input className="w-14 bg-[#EBEBEB]" value={lobFilterInput} onChange={(e) => setLobFilterInput(e.target.value)}/>
                                   <button className='p-1' onClick={toggleLobFilter}><img src={Filter} className='h-[17px] w-[17px]'/></button>
                                   {lobFilter && <div className='h-[270px] w-[150px] mt-3 bg-white shadow-xl font-thin font-sans absolute p-2 flex-col rounded-md space-y-1 text-sm'>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                              <h1 >No Filter</h1>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                              <button onClick={() => fetchFiltered('contains')}><h1 >Contains</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                            <button onClick={() => fetchFiltered('contains')}><h1 >DoesNotContain</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                            <button onClick={() => fetchFiltered('startsWith')}><h1 >StartsWith</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer '>
                                            <button onClick={() => fetchFiltered('endsWith')}><h1 >EndsWith</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                            <button onClick={() => fetchFiltered('exactMatch')}><h1 >EqualTo</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                               <button onClick={() => fetchFiltered('isNull')}><h1 >isNull</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                               <button onClick={() => fetchFiltered('isNotNull')}><h1 >NotIsNull</h1></button>
                                            </div>
                                        </div>} 
                                </div>
                                <div className='w-[20%] p-4'>
                                   <input className="w-14 bg-[#EBEBEB]" value={lobFilterInput} onChange={(e) => setLobFilterInput(e.target.value)}/>
                                   <button className='p-1' onClick={toggleLobFilter}><img src={Filter} className='h-[17px] w-[17px]'/></button>
                                   {lobFilter && <div className='h-[270px] w-[150px] mt-3 bg-white shadow-xl font-thin font-sans absolute p-2 flex-col rounded-md space-y-1 text-sm'>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                              <h1 >No Filter</h1>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                              <button onClick={() => fetchFiltered('contains')}><h1 >Contains</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                            <button onClick={() => fetchFiltered('contains')}><h1 >DoesNotContain</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                            <button onClick={() => fetchFiltered('startsWith')}><h1 >StartsWith</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer '>
                                            <button onClick={() => fetchFiltered('endsWith')}><h1 >EndsWith</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                            <button onClick={() => fetchFiltered('exactMatch')}><h1 >EqualTo</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                               <button onClick={() => fetchFiltered('isNull')}><h1 >isNull</h1></button>
                                            </div>
                                            <div className='hover:bg-[#dae7ff] p-1 rounded-sm cursor-pointer'>
                                               <button onClick={() => fetchFiltered('isNotNull')}><h1 >NotIsNull</h1></button>
                                            </div>
                                        </div>} 
                                </div>

                                
                            </div>
                            <div className='w-1/6  flex'>
                                <div className='w-[50%] p-2 mt-2'>
                                   <input className="w-14 bg-[#EBEBEB]"/>
                                   <button className='p-1'><img src={Filter} className='h-[17px] w-[17px]'/></button>
                                </div>
                                <div className='w-1/2 0 p-4'>
                                     
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='w-full h-[400px]  px-6 text-[12px]'>
                            <div className='w-full h-12 bg-[#F0F6FF] flex justify-between'>
                                    <div className='w-[85%] flex'>
                                        <div className='w-[5%] p-4'>
                                            <p>Sr. </p>
                                        </div>
                                        <div className='w-[15%]  p-4'>
                                            <p>Country <button onClick={() => handleSort("name")}><span className="font-extrabold">↑↓</span></button></p>
                                        </div>
                                        <div className='w-[20%]  p-4'>
                                            <p>State <button onClick={() => handleSort("name")}><span className="font-extrabold">↑↓</span></button></p>
                                        </div>
                                        <div className='w-[20%]  p-4'>
                                            <p>City <button onClick={() => handleSort("name")}><span className="font-extrabold">↑↓</span></button></p>
                                        </div>
                                        <div className='w-[25%]  p-4'>
                                            <p>Locality <button onClick={() => handleSort("name")}><span className="font-extrabold">↑↓</span></button></p>
                                        </div>
                                    </div>
                                    <div className='w-[15%] flex'>
                                        <div className='w-1/2  p-4'>
                                            <p>ID<button onClick={() => handleSort("id")}><span className="font-extrabold">↑↓</span></button> </p>
                                        </div>
                                        <div className='w-1/2 0 p-4'>
                                            <p>Edit</p>
                                        </div>
                                    </div>
                                </div>
                        <div className='w-full h-[450px] overflow-auto'>
                            {pageLoading && <LinearProgress/>}
                            {!pageLoading && existingLocalities.map((item, index) => {
                                return <div className='w-full h-12  flex justify-between border-gray-400 border-b-[1px]'>
                                    <div className='w-[85%] flex'>
                                        <div className='w-[5%] p-4'>
                                            <p>{index + 1}</p>
                                        </div>
                                        <div className='w-[15%]  p-4'>
                                            <p>{item.country}</p>
                                        </div>
                                        <div className='w-[20%]  p-4'>
                                            <p>{item.state}</p>
                                        </div>
                                        <div className='w-[20%]  p-4'>
                                            <p>{item.city}</p>
                                        </div>
                                        <div className='w-[25%]  p-4'>
                                            <p>{item.locality}</p>
                                        </div>
                                    </div>
                                    <div className='w-[15%] flex'>
                                        <div className='w-1/2  p-4'>
                                            <p>{item.id}</p>
                                        </div>
                                        <div className='w-1/2 0 p-4 flex justify-between items-center'>
                                            <img className='w-5 h-5' src={Edit} alt="edit" />
                                            <button onClick={() => deleteLocality(item.id)}><img className='w-5 h-5' src={Trash} alt="trash" /></button>
                                        </div>
                                    </div>
                                </div>
                            })}
                            {/* we get all the existing localities here */}
                        </div>
                        <div className='w-full h-12 flex justify-between justify-self-end px-6 mt-5 fixed bottom-0 bg-white'>
                        {/* footer component */}
                        <div className='ml-2'>
                            <div className='flex items-center w-auto h-full'>
                                {/* items */}
                                <Pagination count={Math.ceil(totalItems/currentPages)} onChange={handlePageChange} page={currentPage}/>
                                
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
                                            fetchQuantityData(e.target.value)
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
                                <p className="mr-11 text-gray-700">{totalItems} Items in {Math.ceil(totalItems/currentPages)} Pages</p>
                            </div>
                            {downloadModal && <div className='h-[120px] w-[220px] bg-white shadow-xl rounded-md absolute bottom-12 right-24 flex-col items-center justify-center  p-5'>
                                <button onClick={() => setDownloadModal(false)}><img src={Cross} className='absolute top-1 left-1 w-4 h-4'/></button>
                                
                               <button>
                                <div className='flex space-x-2 justify-center items-center ml-3 mt-3'>
                                    
                                    <p>Download as pdf</p>
                                    <img src={Pdf}/>
                                </div>
                               </button>
                               <button onClick={handleExcelDownload}>
                                <div className='flex space-x-2 justify-center items-center mt-5 ml-3'>
                                    <p>Download as Excel</p>
                                    <img src={Excel}/>
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
                    </div>
                    
                </div>

            </div>

            {/* modal goes here */}
            <Modal open={isLocalityDialogue}
                fullWidth={true}
                maxWidth={'md'} >
                <div className='flex justify-center mt-[150px]'>
                    <div className="w-6/7  h-[400px] bg-white rounded-lg">
                        <div className="h-[40px] bg-[#EDF3FF]  justify-center flex items-center">
                            <div className="mr-[410px] ml-[410px]">
                                <div className="text-[16px]">Add New Locality</div>
                            </div>
                            <div className="flex justify-center items-center rounded-full w-[30px] h-[30px] bg-white">
                                <button onClick={handleClose}><img className="w-[20px] h-[20px]" src={Cross} alt="cross" /></button>
                            </div>
                        </div>
                        
                            <div className="h-auto w-full mt-[5px] ">
                                <div className="flex gap-[48px] justify-center items-center">
                                    <div className=" space-y-[12px] py-[20px] px-[10px]">
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
                                                        const newData = {...existing, country: e.target.value}
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
                                                        const newData = {...existing, state: e.target.value}
                                                        return newData;
                                                    })
                                                    
                                                }}
                                            >
                                                {allState && allState.map(item => (
                                                    <option value={item[0]} >
                                                        {item[1]}
                                                    </option>
                                                  
                                                ))}
                                            </select>
                                        </div>
                                        <div className="">
                                            <div className="text-[14px]">City Name<label className="text-red-500">*</label></div>
                                            <select className="w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm"
                                                name="country"
                                                value={formValues.city}
                                                defaultValue="Select State"
                                                onChange={e => {
                                                    // fetchCityData(e.target.value);
                                                    console.log(e.target.value);
                                                    setFormValues((existing) => {
                                                        
                                                        const newData = {...existing, city: e.target.value}
                                                        return newData;
                                                    })
                                                    
                                                }}
                                            >
                                                {allCity && allCity.map(item => (
                                                    <option value={item.id} >
                                                        {item.city}
                                                    </option>
                                                  
                                                ))}
                                            </select>
                                        </div>
                                        <div className="">
                                            <div className="text-[14px]">Locality Name<label className="text-red-500">*</label></div>
                                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="empName" value={formValues.locality} onChange={(e) => {
                                                
                                                setFormValues((existing) => {
                                                    const newData = {...existing, locality: e.target.value}
                                                    return newData;
                                                })
                                            }} />
                                        </div>

                                    </div>
                                </div>
                            </div>

                            <div className="mt-[10px] flex justify-center items-center gap-[10px]">

                                <button className='w-[100px] h-[35px] bg-[#004DD7] text-white rounded-md' type="submit" onClick={addLocality}>Save</button>
                                <button className='w-[100px] h-[35px] border-[1px] border-[#282828] rounded-md' onClick={handleClose}>Cancel</button>
                            </div>
                        
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default Locality
