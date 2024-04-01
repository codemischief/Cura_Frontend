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
import { Modal ,CircularProgress,Pagination} from "@mui/material";
import * as XLSX from 'xlsx';
import FileSaver from 'file-saver';
import { APIService } from '../../services/API';
import { authService } from '../../services/authServices';
import Filter from "../../assets/filter.png"

const State = () => {
    // we have the module here
    const [existingState, setExistingState] = useState([]);
    const [pageLoading, setPageLoading] = useState(false);
    
    const [showSucess, setShowSucess] = useState(false);
  const [showFailure, setShowFailure] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPages,setCurrentPages] = useState(15);
  const [currentPage,setCurrentPage] = useState(1);
  const [totalItems,setTotalItems] = useState(0);
  const [downloadModal,setDownloadModal] = useState(false);
  const [userId, setUserId]=useState(0);
  const fetchUserId = async() =>{
    const response = await authService.getUserId();
    setUserId(response)
}
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
        "user_id" : 1234,
        "rows" : ["id","name"],
        "filters" : [],
        "sort_by" : [],
        "order" : "asc",
        "pg_no" : 1,
        "pg_size" : 15
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
    
    const [allCountry,setAllCountry] = useState([]);
    const fetchCountryData = async () => {
        // setPageLoading(true);
        const data = { "user_id": userId || 1234 };
        const response = await APIService.getCountries(data)
        const result = (await response.json()).data;
        if(Array.isArray(result)) {
            setAllCountry(result);
        }
    }
    const fetchSomeData = async (number) => {
        setPageLoading(true);
        const data = { 
            "user_id" : userId || 1234,
            "rows" : ["id","name"],
            "filters" : [],
            "sort_by" : [],
            "order" : "asc",
            "pg_no" : Number(currentPage),
            "pg_size" : Number(number)
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
        fetchUserId()
        fetchStateData();
        fetchCountryData();
    }, []);
    //Validation of the form
    const initialValues = {
        country:"",
        stateName: ""
    };
    const [formValues, setFormValues] = useState(initialValues);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setIsSubmit(true);
    };

    const [isStateDialogue, setIsStateDialogue] = React.useState(false);
    const handleOpen = () => {
        setIsStateDialogue(true);
    };
    const handleClose = () => {
        setIsStateDialogue(false);
    }
    const handleDownload = () => {
        // we handle the download here
        const worksheet = XLSX.utils.json_to_sheet(existingState);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook,worksheet,"Sheet1");
        XLSX.writeFile(workbook,"StateData.xlsx");
        FileSaver.saveAs(workbook,"demo.xlsx");
      }
      const handleRefresh = () => {
        fetchStateData();
      }
      const [flag,setFlag] = useState(true);
      const handleSort = async (field) => {
            setPageLoading(true);
            const data = { 
                "user_id" : userId|| 1234,
                "rows" : ["id","name"],
                "filters" : [],
                "sort_by" : [field],
                "order" : flag ? "asc" : "desc",
                "pg_no" : 1,
                "pg_size" : Number(currentPages)
             };
             const response = await APIService.getStatesAdmin(data)
             const temp = await response.json();
            const result = temp.data;
            const t = temp.total_count;
             setTotalItems(t);
             setPageLoading(false);
             setExistingState(result)
      }
      const handleSearch = async () => {}
      const [stateFilter,setStateFilter] = useState(false);
      const [stateFilterInput,setStateFilterInput] = useState("");
      const toggleStateFilter = () => {
           setStateFilter((prev) => !prev)
      }
      const fetchFiltered = async (filterType,filterField) => {
        const filterArray = [];
        
        setPageLoading(true);
        const data = { 
            "user_id" : userId || 1234,
            "rows" : ["id","name"],
            "filters" : [["name",String(filterType),stateFilterInput]],
            "sort_by" : [],
            "order" : "asc",
            "pg_no" : 1,
            "pg_size" : Number(currentPages)
         };
         const response = await APIService.getStatesAdmin(data)
         const temp = await response.json();
        const result = temp.data;
        const t = temp.total_count;
         setTotalItems(t);
         setPageLoading(false);
         setExistingState(result)
        setFlag((prev) => {
            return !prev;
        })
        setPageLoading(false);
      }
      const handlePageChange = (event,value) => {
         setCurrentPage(value)
      }
    return (
        <div>
            <Navbar />
            <div className='flex-col w-full h-full  bg-white'>
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
                                    <h1>State</h1>
                                    <p>Admin &gt; State</p>
                                </div>
                            </div>
                            <div className='flex space-x-2 items-center'>

                                <div className='flex'>
                                    {/* search button */}
                                    <input
                                        className="h-[36px] bg-[#EBEBEB] text-[#787878]"
                                        type="text"
                                        placeholder="  Search"
                                    />
                                    <div className="h-[36px] w-[40px] bg-[#004DD7] flex items-center justify-center rounded-r-lg">
                                        <img className="h-[26px] " src={searchIcon} alt="search-icon" />
                                    </div>
                                </div>

                                <div>
                                    {/* button */}
                                    <button className="bg-[#004DD7] text-white h-[30px] w-[200px] rounded-lg" onClick={handleOpen}>
                                        Add New State +
                                    </button>
                                </div>

                            </div>

                        </div>
                        <div className='h-12 w-full bg-white flex justify-between'>
                             <div className='w-3/4 flex'>
                                <div className='w-[10%] p-4'>
                                    
                                </div>
                                <div className='w-[20%] p-4'>
                                    <div className='w-[45%] flex items-center bg-[#EBEBEB] rounded-[5px]'>
                                        <input className="w-14 bg-[#EBEBEB] rounded-[5px]" value={stateFilterInput} onChange={(e) => {setStateFilterInput(e.target.value)}}/>
                                        <button className='p-1' onClick={() => {setStateFilter((prev) => !prev)}}><img src={Filter} className='h-[15px] w-[15px]' /></button>
                                    </div>
                                   {stateFilter && <div className='h-[270px] w-[150px] mt-3 bg-white shadow-xl font-thin font-sans absolute p-2 flex-col rounded-md space-y-1 text-sm'>
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
                                    <div className='w-[45%] flex items-center bg-[#EBEBEB] rounded-[5px]'>
                                        <input className="w-14 bg-[#EBEBEB] rounded-[5px]" value={stateFilterInput} onChange={(e) => {setStateFilterInput(e.target.value)}}/>
                                        <button className='p-1' onClick={() => {setStateFilter((prev) => !prev)}}><img src={Filter} className='h-[15px] w-[15px]' /></button>
                                    </div>
                                   {stateFilter && <div className='h-[270px] w-[150px] mt-3 bg-white shadow-xl font-thin font-sans absolute p-2 flex-col rounded-md space-y-1 text-sm'>
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

                    <div className='w-full h-[500px] bg-white px-6 text-[12px]'>
                        <div className='w-full h-12 bg-[#F0F6FF] flex justify-between'>
                            <div className='w-3/4 flex'>
                                <div className='w-[10%] p-4'>
                                    <p>Sr. </p>
                                </div>
                                <div className='w-[20%]  p-4'>
                                    <p>Country<button onClick={() => handleSort("name")}><span className="font-extrabold">↑↓</span></button></p>
                                </div>
                                <div className='w-[45%]  p-4'>
                                    <p>State<button onClick={() => handleSort("name")}><span className="font-extrabold">↑↓</span></button></p>
                                </div>
                            </div>
                            <div className='w-1/6  flex'>
                                <div className='w-1/2  p-4'>
                                    <p>ID<button onClick={() => handleSort("id")}><span className="font-extrabold">↑↓</span></button></p>
                                </div>
                                <div className='w-1/2 0 p-4'>
                                    <p>Edit</p>
                                </div>
                            </div>
                        </div>
                        {pageLoading && <div className='ml-11 mt-9'>
                <CircularProgress />
              </div>}
                        <div className='w-full h-[430px] overflow-auto'>
                            {!pageLoading && existingState
                            .map((item, index) => {
                                return <div className='w-full h-12  flex justify-between border-gray-400 border-b-[1px]'>
                                    <div className='w-3/4 flex'>
                                        <div className='w-[10%] p-4'>
                                            <p>{index + 1}</p>
                                        </div>
                                        <div className='w-[20%]  p-4'>
                                            <p>{item[1]}</p>
                                        </div>
                                        <div className='w-[20%]  p-4'>
                                            <p>{item[0]}</p>
                                        </div>
                                    </div>
                                    <div className='w-1/6  flex'>
                                        <div className='w-1/2  p-4'>
                                            <p>{item[2]}</p>
                                        </div>
                                        <div className='w-1/2 0 p-4 flex justify-between items-center'>
                                            <img className='w-5 h-5' src={Edit} alt="edit" />
                                            <img className='w-5 h-5' src={Trash} alt="trash" />
                                        </div>
                                    </div>
                                </div>
                            })}
                            {/* we get all the existing cities here */}

                        </div>
                    </div>
                    <div className='w-full h-12 flex justify-between justify-self-end px-6 mt-5 fixed bottom-0 '>
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
                                <p className="mr-11 text-gray-700">{totalItems} Items in {Math.ceil(totalItems/currentPages)} Pages</p>
                            </div>
                            {downloadModal && <div className='h-[130px] w-[200px] bg-red-800 absolute bottom-12 right-24 flex-col items-center  justify-center space-y-6 p-5'>
                               
                               <div className='flex'>
                                 <p>Download as pdf</p>
                                 {/* <img src=''/> */}
                               </div>
                               <div>
                                  <p>Download as Excel</p>
                               </div>
                            </div>}
                            
                            <div className='border-solid border-black border-[0.5px] rounded-md w-28 h-10 flex items-center justify-center space-x-1 p-2' >
                                {/* refresh */}
                                <button onClick={handleRefresh}><p>Refresh</p></button>
                                <img src={refreshIcon} className="h-2/3" />
                            </div>
                            <div className='border-solid border-black border-[1px] w-28 rounded-md h-10 flex items-center justify-center space-x-1 p-2'>
                                {/* download */}
                                <button onClick={handleDownload}><p>Download</p></button>
                                <img src={downloadIcon} className="h-2/3" />
                            </div>
                        </div> 
                    </div>
                </div>

            </div>

            {/* modal goes here */}
            <Modal open={isStateDialogue}
                fullWidth={true}
                maxWidth={'md'} >
                <div className='flex justify-center mt-[200px]'>
                    <div className="w-6/7  h-[300px] bg-white rounded-lg">
                        <div className="h-[40px] bg-[#EDF3FF]  justify-center flex items-center">
                            <div className="mr-[410px] ml-[410px]">
                                <div className="text-[16px]">Add New State</div>
                            </div>
                            <div className="flex justify-center items-center rounded-full w-[30px] h-[30px] bg-white">
                                <button onClick={handleClose}><img className="w-[20px] h-[20px]" src={Cross} alt="cross" /></button>
                            </div>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="h-auto w-full mt-[5px] ">
                                <div className="flex gap-[48px] justify-center items-center">
                                    <div className=" space-y-[12px] py-[20px] px-[10px]">
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
                                            <div className="text-[14px]">Country Name<label className="text-red-500">*</label></div>
                                            {/* <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="empName" value={formValues.stateName} onChange={handleChange} /> */}
                                            <select className='w-[230px] h-[25px] border-[1px] border-[#C6C6C6]'>
                                                {allCountry.map((item,index) => {
                                                   return (
                                                    <option name="country"
                                                    value={formValues.country}
                                                    defaultValue="Select Country"
                                                    onChange={e => {
                                                        // setselectedCountry(e.target.value);
                                                        fetchStateData(e);
                                                        setFormValues((existing) => {
                                                            const newData = {...existing, country: e.target.value}
                                                            return newData;
                                                        })
                                                    }}>
                                                        {item[1]}
                                                    </option>
                                                   )
                                                })}
                                            </select>
                                        </div>
                                        <div className="">
                                            <div className="text-[14px]">State Name<label className="text-red-500">*</label></div>
                                            <input className="w-[230px] h-[25px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="stateName" value={formValues.stateName} onChange={handleChange} />
                                        </div>


                                    </div>
                                </div>
                            </div>

                            <div className="mt-[10px] flex justify-center items-center gap-[10px]">

                                <button className='w-[100px] h-[35px] bg-[#004DD7] text-white rounded-md' type="submit">Save</button>
                                <button className='w-[100px] h-[35px] border-[1px] border-[#282828] rounded-md' onClick={handleClose}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default State
