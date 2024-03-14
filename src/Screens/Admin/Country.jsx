import React from 'react';
import { Outlet, Link } from "react-router-dom";
import backLink from "../../assets/back.png";
import searchIcon from "../../assets/searchIcon.png";
import nextIcon from "../../assets/next.png";
import refreshIcon from "../../assets/refresh.png";
import downloadIcon from "../../assets/download.png";
import Cross from "../../assets/cross.png";
import { useState ,useEffect} from 'react';
import Navbar from "../../Components/Navabar/Navbar";
import { Modal , CircularProgress} from "@mui/material";
import Edit from '../../assets/edit.png';
import Trash from "../../assets/trash.png"
import * as XLSX from 'xlsx';
import FileSaver from 'file-saver';
import SucessfullModal from '../../Components/modals/SucessfullModal';
import FailureModal from '../../Components/modals/FailureModal';
import DeleteModal from '../../Components/modals/DeleteModal';
import { APIService } from '../../services/API';
const Country = () => {
  // we have the module here
  const [existingCountries, setCountryValues] = useState([]);
//   const [isSubmit, setIsSubmit] = useState(false);
const [pageLoading,setPageLoading] = useState(false);
  const [showSucess,setShowSucess] = useState(false);
  const [showFailure,setShowFailure] = useState(false);
  const [showDelete,setShowDelete] = useState(false);
  const [isLoading,setIsLoading] = useState(false);
  const [currentCountry,setCurrentCountry] = useState("");
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
  const fetchCountryData = async () => {
    setPageLoading(true);
    const data = {"user_id":1};
    const response = await APIService.getCountries(data)
    // const response = await fetch('http://192.168.10.133:8000/getCountries', {
    //     method: 'POST',
    //     body: JSON.stringify(data),
    //     headers: {
    //       'Content-Type': 'application/json'
    //     }
    //   });
      const result = (await response.json()).data;
             
    setPageLoading(false);
      setCountryValues(result.map(x => ({ 
        sl: x[0], 
        country_name: x[1] 
      })))
  }

  const addCountry = async () => {
    const data = {"user_id":1,"country_name":formValues.countryName};
    const response = await fetch('http://192.168.10.133:8000/addCountry', {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'Content-Type': 'application/json'
        }
      });
     
    if(response.ok) {
        setIsLoading(false);
        openSuccessModal();
    }else {

        setIsLoading(false);
        openFailureModal();
    }
    fetchCountryData();
     
  }

  const deleteCountry = async (item) =>{
    setShowDelete(true);
    setCurrentCountry(item.country_name);
    // const data = {"user_id":1,"country_name":item.country_name};
    // console.log(data);
    // const response = await fetch('http://192.168.10.133:8000/deleteCountry', {
    //     method: 'POST',
    //     body: JSON.stringify(data),
    //     headers: {
    //       'Content-Type': 'application/json'
    //     }
    //   });
      
      
      // fetchCountryData();
  }
  useEffect(()=> {
    fetchCountryData()
  },[]);
  //Validation of the form
  const initialValues = {
    countryName:"",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors,setFormErrors] = useState({});
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };
   
  const handleSubmit = (e) => {
      e.preventDefault();
      setFormErrors(validate(formValues));
      if(formValues.countryName == "") {
        return ;
      }
      setIsLoading(true);
      addCountry();
    //   setIsCountryDialogue(false);
  };
    
  const [isCountryDialogue,setIsCountryDialogue] = React.useState(false);
  const handleOpen = () => {
     setIsCountryDialogue(true);
  };
  const handleClose = () => {
    setIsCountryDialogue(false);
  }
  const validate = () => {
    const errors = {};
    if(!formValues.countryName) {
      errors.countryName = "Enter A Country Name"
    }
    return errors;
  }
  const handleDownload = () => {
    // we handle the download here
    const worksheet = XLSX.utils.json_to_sheet(existingCountries);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook,worksheet,"Sheet1");
    XLSX.writeFile(workbook,"CountryData.xlsx");
    FileSaver.saveAs(workbook,"demo.xlsx");
  }
  const handleRefresh = () => {
    fetchCountryData();
  }
  return (
    <div className='h-screen'>
      <Navbar/>
      <SucessfullModal isOpen={showSucess} message="Country Added Successfully" />
      <FailureModal isOpen={showFailure} message="Error! Couldnt Add Country"/>
      <DeleteModal isOpen={showDelete} currentCountry={currentCountry} closeDialog={setShowDelete} fetchData={fetchCountryData}/>
      <div className='flex-col w-full h-full  bg-white'>
        <div className='flex-col'>
            {/* this div will have all the content */}
            <div className='w-full  flex-col px-6'>
                {/* the top section of the div */}
                <div className='h-1/2 w-full  flex justify-between items-center p-2  border-gray-300 border-b-2'>
                   <div className='flex items-center space-x-3'>
                      <div className='rounded-2xl  bg-[#EBEBEB] h-8 w-8 flex justify-center items-center'>
                          <Link to="/dashboard"><img className="w-5 h-5"src={backLink} /></Link>
                      </div>
                        
                      <div className='flex-col'>
                          <h1>Country</h1>
                          <p>Admin &gt; Country</p>
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
                            <button className="bg-[#004DD7] text-white h-[36px] w-[200px] rounded-lg" onClick={handleOpen}>
                                Add New Country +
                            </button>
                        </div>

                   </div>
                   
                </div>
                <div className='h-12 w-full bg-white'>
                  
                </div>
            </div>
            
            <div className='w-full h-[400px] bg-white px-6 text-[12px]'>
                <div className='w-full h-12 bg-[#F0F6FF] flex justify-between'>
                   <div className='w-3/4 flex'>
                      <div className='w-1/6 p-4'>
                         <p>Sr. No</p>
                      </div>
                      <div className='w-5/6  p-4'>
                        <p>Country</p>
                      </div>
                   </div>
                   <div className='w-1/6  flex'>
                      <div className='w-1/2  p-4'>
                          <p>ID</p>
                      </div>
                      <div className='w-1/2 0 p-4'>
                          <p>Edit</p>
                      </div>
                   </div>
                </div>
                <div className='w-full h-80 overflow-auto'>
                     
                     {pageLoading && <div className='ml-11 mt-9'>
                        <CircularProgress />
                     </div>}
                    {existingCountries.map((item,index) => {
                       return <div className='w-full h-12  flex justify-between border-gray-400 border-b-[1px]'>
                                <div className='w-3/4 flex'>
                                    <div className='w-1/6 p-4'>
                                        <p>{index+1}</p>
                                    </div>
                                    <div className='w-5/6  p-4'>
                                        <p>{item.country_name}</p>
                                    </div>
                                </div>
                                <div className='w-1/6  flex'>
                                    <div className='w-1/2  p-4'>
                                        <p>{item.sl}</p>
                                    </div>
                                    <div className='w-1/2 0 p-4 flex justify-between items-center'>
                                            <img className='w-5 h-5' src={Edit} alt="edit" />
                                            <button onClick={() => deleteCountry(item)}> <img className='w-5 h-5' src={Trash} alt="trash"/></button>
                                    </div>
                                </div>
                          </div>
                    })}
                   {/* we get all the existing countries here */}
                    
                </div>
            </div>
            
            <div className='w-full h-12 flex justify-between justify-self-end px-6 '>
                {/* footer component */}
                <div className='ml-2'>
                    <div className='flex items-center w-auto h-full'>
                       {/* items */}
                       <div className='h-12 flex justify-center items-center'>
                          <img src={backLink} className='h-2/4'/>
                       </div>
                       <div className='flex space-x-1 mx-5'>
                          {/* pages */}
                          <div className='w-6 bg-[#DAE7FF] p-1 pl-2 rounded-md'>
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
                          </div>
                       </div>
                       <div className='h-12 flex justify-center items-center'>
                        {/* right button */}
                           <img src={nextIcon} className='h-2/4'/>
                       </div>
                    </div>
                    <div>
                        {/* items per page */}
                    </div>
                </div>
                <div className='flex mr-10 justify-center items-center space-x-2 '>
                    <div className='border-solid border-black border-[0.5px] rounded-md w-28 h-10 flex items-center justify-center space-x-1' >
                       {/* refresh */}
                       <button onClick={handleRefresh}><p>Refresh</p></button>
                       <img src={refreshIcon} className='h-1/2'/>
                    </div>

                    <div className='border-solid border-black border-[1px] w-28 rounded-md h-10 flex items-center justify-center space-x-1'>
                        {/* download */}
                        
                        <button onClick={handleDownload}> <p>Download</p></button>
                            <img src={downloadIcon} className='h-1/2'/>
                    </div>
                </div>
            </div>
        </div>
     
    </div>

    {/* modal goes here */}
    <Modal open={isCountryDialogue} 
          fullWidth={true}
          maxWidth = {'md'} >
            <div className='flex justify-center mt-[200px]'>
                <div className="w-6/7  h-[250px] bg-white rounded-lg">
                    <div className="h-[40px] bg-[#EDF3FF]  justify-center flex items-center">
                        <div className="mr-[410px] ml-[410px]">
                            <div className="text-[16px]">Add New Country</div>
                        </div>
                        <div className="flex justify-center items-center rounded-full w-[30px] h-[30px] bg-white">
                            <button onClick={handleClose}><img  className="w-[20px] h-[20px]" src={Cross} alt="cross" /></button>
                        </div>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="h-auto w-full mt-[5px] ">
                            <div className="flex gap-[48px] justify-center items-center">
                                <div className=" space-y-[12px] py-[20px] px-[10px]">
                                    <div className="">
                                        <div className="text-[14px]">Country Name<label className="text-red-500">*</label></div>
                                        <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" 
                                        type="text"
                                        name="countryName"
                                        value={formValues.countryName}
                                        onChange={handleChange}
                                        autoComplete="off"
                                         />
                                         <div className="text-[12px] text-[#CD0000] ">{formErrors.countryName}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="mt-[10px] flex justify-center items-center gap-[10px]"> 
                            <button className='w-[100px] h-[35px] bg-[#004DD7] text-white rounded-md' type="submit">Save</button>
                            <button className='w-[100px] h-[35px] border-[1px] border-[#282828] rounded-md' onClick={handleClose}>Cancel</button>
                            {isLoading && <CircularProgress/>}
                        </div>
                    </form>
                </div>
            </div>
    </Modal>
    </div>
  )
}

export default Country
