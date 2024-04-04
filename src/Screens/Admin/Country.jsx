import React from 'react';
import { Outlet, Link } from "react-router-dom";
import backLink from "../../assets/back.png";
import searchIcon from "../../assets/searchIcon.png";
import nextIcon from "../../assets/next.png";
import refreshIcon from "../../assets/refresh.png";
import downloadIcon from "../../assets/download.png";
import Cross from "../../assets/cross.png";
import { useState, useEffect , useRef} from 'react';
import Navbar from "../../Components/Navabar/Navbar";
import { Modal, CircularProgress, Pagination } from "@mui/material";
import Edit from '../../assets/edit.png';
import Trash from "../../assets/trash.png"
import * as XLSX from 'xlsx';
import FileSaver from 'file-saver';
import SucessfullModal from '../../Components/modals/SucessfullModal';
import FailureModal from '../../Components/modals/FailureModal';
import DeleteModal from '../../Components/modals/DeleteModal';
import { APIService } from '../../services/API';
import EditCountryModal from './Modals/EditCountryModal';
import { authService } from '../../services/authServices';
import Filter from "../../assets/filter.png"
const Country = () => {
  // we have the module here
  const menuRef = useRef()
  const [existingCountries, setCountryValues] = useState([]);
  //   const [isSubmit, setIsSubmit] = useState(false);
  const [pageLoading, setPageLoading] = useState(false);
  const [userId, setUserId]=useState(0);
  const [showSucess, setShowSucess] = useState(false);
  const [showFailure, setShowFailure] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentCountry, setCurrentCountry] = useState("");
  const [currentPages,setCurrentPages] = useState(15);
  const [currentPage,setCurrentPage] = useState(1);
  const [totalItems,setTotalItems] = useState(0);
  const [downloadModal,setDownloadModal] = useState(false);
  const [sortField,setSortField] = useState("id")
  const [flag,setFlag] = useState(false);
  const [searchQuery,setSearchQuery] = useState(""); 
  // const [flag,setFlag] = useState(false);
  const fetchUserId = async() =>{
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
  const openFailureModal = () => {
    // we have the error message hre

    setIsCountryDialogue(false);
    setShowFailure(true);
    setTimeout(function () {
      setShowFailure(false)
    }, 4000);
  }
  
  const fetchPageCountryData = async (pageNumber) => {
    setPageLoading(true);
    setCurrentPage(pageNumber);
    // const user_id = await authService.getUserID();
    const data = { 
      "user_id" : 1234,
      "rows" : ["id","name"],
      "filters" : [],
      "sort_by" : [sortField],
      "order" : flag ? "asc" : "desc",
      "pg_no" : Number(pageNumber),
      "pg_size" : Number(currentPages),
      "search_key" : searchQuery
   };
    const response = await APIService.getCountries(data)
    
    const temp =(await response.json());
    console.log(pageNumber)
    console.log(temp);
    const result = temp.data.data;
    const t = temp.total_count;
  
    setTotalItems(t);
    console.log(t);
    console.log(result);
    
    // setCountryValues(result);
    setCountryValues(result.map(x => ({
      sl: x[0],
      country_name: x[1]
    })))
    setPageLoading(false);
   
  }
  
  const fetchQuantityData = async (quantity) => {
    setPageLoading(true);
    // setCurrentPage(pageNumber);

    // const user_id = await authService.getUserID();
    setCurrentPages(quantity);
    const data = { 
      "user_id" : 1234,
      "rows" : ["id","name"],
      "filters" : [],
      "sort_by" : [sortField],
      "order" : flag ? "asc" : "desc",
      "pg_no" : Number(currentPage),
      "pg_size" : Number(quantity),
      "search_key" : searchQuery
   };
    const response = await APIService.getCountries(data)
    
    const temp =(await response.json());
    // console.log(pageNumber)
    console.log(temp);
    const result = temp.data.data;
    const t = temp.total_count;
  
    setTotalItems(t);
    console.log(t);
    console.log(result);
    
    // setCountryValues(result);
    setCountryValues(result.map(x => ({
      sl: x[0],
      country_name: x[1]
    })))
    setPageLoading(false);
  }
  const fetchCountryData = async () => {
    setPageLoading(true);
    // setCurrentPage(pageNumber);
    // const user_id = await authService.getUserID();
    const data = { 
      "user_id" :  1234,
      "rows" : ["id","name"],
      "filters" : [],
      "sort_by" : [sortField],
      "order" : "desc",
      "pg_no" : 1,
      "pg_size" : 15,
      "search_key" : searchQuery
   };
    const response = await APIService.getCountries(data)
    const temp =(await response.json()).data;
    const result = temp.data;
    const t = temp.total_count;
  
    setTotalItems(t);
    console.log(t);
    console.log(result);
    setPageLoading(false);
    // setCountryValues(result);
    setCountryValues(result.map(x => ({
      sl: x[0],
      country_name: x[1]
    })))
   
  }

  const addCountry = async () => {
    const data = { "user_id": userId ||  1234, "country_name": formValues.countryName };
    const response = await APIService.addCountries(data);
    const res = await response.json();
    console.log(res)
    // {
    //   "result": "error",
    //   "message": "Already Exists",
    //   "user_id": 1234,
    //   "role_id": 1,
    //   "data": []
    // }
    if (res.result == "success") {
      setIsLoading(false);
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
    setCurrentCountry(item.country_name);
  }

  const editCountry = async (item) => {
    setShowEdit(true);
    setCurrentCountry(item.country_name);
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
    setIsLoading(true);
    addCountry();
  };

  const [isCountryDialogue, setIsCountryDialogue] = React.useState(false);
  const handleOpen = () => {
    setIsCountryDialogue(true);
  };
  const handleClose = () => {
    setIsCountryDialogue(false);
  }
  const validate = () => {
    const errors = {};
    if (!formValues.countryName) {
      errors.countryName = "Enter A Country Name"
    }
    return errors;
  }
  const fetchSomeData = async (number) => {
    setPageLoading(true);
    const data = { 
        "user_id" : userId ||1234,
        "rows" : ["id","name"],
        "filters" : [],
        "sort_by" : [],
        "order" : "asc",
        "pg_no" : Number(currentPage),
        "pg_size" : Number(number)
     };
     const response = await APIService.getCountries(data)
     const result = (await response.json()).data;
     const t = result.total_count;
     setTotalItems(t);
     setPageLoading(false);
     setCountryValues(result.map(x => ({
       sl: x[0],
       country_name: x[1]
     })))
}
  const handleDownload = () => {
    // we handle the download here
    const worksheet = XLSX.utils.json_to_sheet(existingCountries);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    XLSX.writeFile(workbook, "CountryData.xlsx");
    FileSaver.saveAs(workbook, "demo.xlsx");
  }
  const handleRefresh = () => {
    fetchCountryData();
  }
  
  const handleSort = async (field) => {
        setPageLoading(true);
        setSortField(field)
        const data = { 
            "user_id" : userId|| 1234,
            "rows" : ["id","name"],
            "filters" : [],
            "sort_by" : [field],
            "order" : flag ? "asc" : "desc",
            "pg_no" : 1,
            "pg_size" : Number(currentPages)
         };
        const response = await APIService.getCountries(data)
        const result = (await response.json()).data;
        const t = temp.total_count;
        setTotalItems(t);
        setPageLoading(false);
        setCountryValues(result.map(x => ({
          sl: x[0],
          country_name: x[1]
        })))
  }
  
  const handleSearch = async () => {
    setPageLoading(true)
    const data = { 
      "user_id" : 1234,
      "rows" : ["id","name"],
      "filters" : [],
      "sort_by" : [field],
      "order" : flag ? "asc" : "desc",
      "pg_no" : 1,
      "pg_size" : Number(currentPages),
      "search_key" : searchQuery
      };
      const response = await APIService.getCountries(data)
      const result = (await response.json()).data;
      const t = temp.total_count;
      setTotalItems(t);
      setPageLoading(false);
      setCountryValues(result.map(x => ({
        sl: x[0],
        country_name: x[1]
      })))
    setPageLoading(false)

  }
  const [countryFilter,setCountryFilter] = useState(false);
  const [countryFilterInput,setCountryFilterInput] = useState("");
  const toggleCountryFilter = () => {
       setCountryFilter((prev) => !prev)
  }
  const fetchFiltered = async (filterType,filterField) => {
    const filterArray = [];
    
    setPageLoading(true);
    const data = { 
        "user_id" : userId || 1234,
        "rows" : ["id","name"],
        "filters" : [["name",String(filterType),countryFilterInput]],
        "sort_by" : [],
        "order" : "asc",
        "pg_no" : 1,
        "pg_size" : Number(currentPages)
     };
    const response = await APIService.getCountries(data)
    const temp = await response.json();
    const result = temp.data;
    const t = temp.total_count;
    setTotalItems(t);

    // setPageLoading(false);
    setCountryValues(result.map(x => ({
      sl: x[0],
      country_name: x[1]
    })))
    setFlag((prev) => {
        return !prev;
    })
    setPageLoading(false);
  }
  const handlePageChange = (event,value) => {
     setCurrentPage(value);
     fetchPageCountryData(value);
  }
  const [idFilter,setIdFilter] = useState(false)
  const [idFilterInput,setIdFilterInput] = useState("");
  const handleCloseSearch = async  () => {
       setSearchQuery("")
       setPageLoading(true)
       const data = { 
        "user_id" : userId || 1234,
        "rows" : ["id","name"],
        "filters" : [],
        "sort_by" : [sortField],
        "order" : "desc",
        "pg_no" : 1,
        "pg_size" : Number(currentPages),
        "search_key" : ""
     };
     const response = await APIService.getCountries(data)
    const temp = await response.json();
    const result = temp.data;
    const t = temp.total_count;
    setTotalItems(t);

    // setPageLoading(false);
    setCountryValues(result.map(x => ({
      sl: x[0],
      country_name: x[1]
    })))
     setPageLoading(false)
  }
  const [failureMessage,setFailureMessage] = useState("");
  return (
    <div className='h-screen'>
      <Navbar />
      <SucessfullModal isOpen={showSucess} message="Country Added Successfully" />
      <FailureModal isOpen={showFailure} message={failureMessage} />
      <DeleteModal isOpen={showDelete} currentCountry={currentCountry} closeDialog={setShowDelete} fetchData={fetchCountryData} />
      <EditCountryModal isOpen={showEdit} currentCountry={currentCountry} setIsOpen={setShowEdit}/>
      <div className='flex-col w-full h-full  bg-white'>
        <div className='flex-col'>
          {/* this div will have all the content */}
          <div className='w-full  flex-col px-6'>
            {/* the top section of the div */}
            
            
          </div>

          <div className='w-full h-[500px] bg-white px-6 text-[12px]'>
           
            
          </div>

          
            </div>
      </div>

      {/* modal goes here */}
      
    </div>
  )
}

export default Country
