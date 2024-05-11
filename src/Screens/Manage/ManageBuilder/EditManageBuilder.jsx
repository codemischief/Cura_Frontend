import React from 'react';
import Cross from "../../../assets/cross.png";
import { Link } from 'react-router-dom';
import { Modal, CircularProgress } from "@mui/material";
import { useState, useEffect } from "react";
import SucessfullModal from '../../../Components/modals/SucessfullModal';
import FailureModal from '../../../Components/modals/FailureModal';
import { APIService } from '../../../services/API';
import Draggable from 'react-draggable';


const EditManageBuilder = (props) => {
    const [pageLoading, setPageLoading] = useState(false);
    const [showSucess, setShowSucess] = useState(false);
    const [showFailure, setShowFailure] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    console.log(props.currBuilder)
    const openSuccessModal = () => {
        // set the state for true for some time
        // props.setOpenDialog(false);
        setShowSucess(true);
        props.setOpenDialog(false)
        setTimeout(function () {
            setShowSucess(false)
            
        }, 2000)
        
    }
    const openFailureModal = () => {
        props.setOpenDialog(false);
        setShowFailure(true);
        setTimeout(function () {
            setShowFailure(false)
        }, 4000);
    }

    const editNewBuilder = async () => {
        const data = {
            "user_id": 1234,
            "builder_id": Number(props.builder.id),
            "builder_name": formValues.builderName,
            "phone_1": formValues.phone1,
            "phone_2": formValues.phone2,
            "email1": formValues.email1,
            "email2": formValues.email2,
            "addressline1": formValues.address1,
            "addressline2":formValues.address2,
            "suburb":formValues.suburb,
            "city": Number(formValues.city),
            "state": formValues.state,
            "country": Number(formValues.country),
            "zip": formValues.zip,
            "website": formValues.website,
            "comments": formValues.comment
        }
        console.log(data);
        const response = await APIService.editBuilderInfo(data);
        const res = await response.json()
        if (res.result == 'success') {
              
            // openSuccessModal();
            props.showSuccess();
        } else {
            openFailureModal();
        }
        console.log("done");
        
    }

    const selectedCountry = [
        "India", "USA", "UK", "Germany", "France", "Italy"
    ]
    const selectedState = [
        "State1", "State2", "State3", "State4"
    ]
    const selectedCity = [
        "City1", "City2", "City3", "City4"
    ]
    const fetchCountryData = async () => {
        setPageLoading(true);
        const data = { "user_id": 1234, "rows": ["id", "name"], "filters": [], "sort_by": [], "order": "asc", "pg_no": 0, "pg_size": 0 };
        const response = await APIService.getCountries(data)
        const result = (await response.json()).data;
        console.log(result.data);

        if (Array.isArray(result.data)) {
            setAllCountry(result.data);
        }
    }
    const [allState,setAllState] = useState([])
    const [allCountry,setAllCountry] = useState([])
    const [allCity,setAllCity] = useState([])
    const fetchStateData = async (e) => {

        const data = { "user_id": 1234, "country_id": e };
        const response = await APIService.getState(data);
        const result = (await response.json()).data;
        console.log(result)
        if (Array.isArray(result)) {
            setAllState(result)
        }
    }
    const close = () => {
        props.setOpenDialog(false);
        props.showCancel(false);
    };
    console.log(props.builder)
    const initialValues = {
        builderName: null ,
        phone1: null,
        phone2: null,
        email1: null,
        email2: null,
        suburb : null,
        address1: null,
        address2: null,
        country: null,
        state: null,
        city: null,
        zip: null,
        website: null,
        comment: null
    };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});

    // handle changes in input form
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    const handleSubmit = async  (e) => {
        e.preventDefault();
        setFormErrors(validate(formValues)); // validate form and set error message
        if (formValues.builderName == "") {
            return;
        }
        console.log('here')
        setIsLoading(true);
        editNewBuilder();
         
        setIsLoading(false);
    };
    // validate form and to throw Error message
    const validate = (values) => {
        const errors = {};
        if (!values.builderName) {
            errors.employeeName = "Enter Builder name";
        }
        if (!values.phone1) {
            errors.phone1 = "Enter Phone number";
        }
        if (!values.address1) {
            errors.address1 = "Enter Builder Adress";
        }
        if (!values.country) {
            errors.country = " Select country";
        }
        if (!values.state) {
            errors.state = "Select state";
        }
        if (!values.city) {
            errors.city = "Select city";
        }
        if (!values.suburb) {
            errors.suburb = "Select suburb";
        }

        return errors;
    };
    // just fetch the data here
    const fetchCityData = async (d) => {
        const data = { "user_id": 1234,"state_name": d };
        const response = await APIService.getCities(data);
        const result = (await response.json()).data;
        if (Array.isArray(result)) {
            setAllCity(result)
        }
    }
    const getInitialData = async () => {
        setLoading(true)
        const data = {
            "user_id":1234,
            "table_name":"builder",
            "item_id": props.builder.id
        }
        const response  = await APIService.getItembyId(data)
        const res = await response.json()
        fetchStateData(res.data.country)
        fetchCityData(res.data.state)
        const temp = {...formValues}
        temp.builderName =  res.data.buildername
        temp.phone1 =  res.data.phone1
        temp.phone2 =  res.data.phone2
        temp.email1 =  res.data.email1
        temp.email2 =  res.data.email2
        temp.suburb  =  res.data.suburb,
        temp.address1 =  res.data.addressline1
        temp.address2 =  res.data.addressline2
        temp.country =  res.data.country
        temp.state =  res.data.state
        temp.city =  res.data.city
        temp.zip =  res.data.zip
        temp.website =  res.data.website
        temp.comment =  res.data.comments
        setFormValues(temp)
        console.log(res)
        setLoading(false)
    }
    useEffect(() => {
        // we need to fetch the data first
        
        getInitialData()
        fetchCountryData()
        // fetchStateData(props.builder.country)
       
        // fetchCityData()
    },[])
    const [loading,setLoading] = useState(false)
    return (
        <>
            <SucessfullModal isOpen={showSucess} message="Changes saved succesfully " />
            <FailureModal isOpen={showFailure} message="Error! cannot edit the builder" />
            <Modal open={true}
                fullWidth={true}
                maxWidth={'md'}
                className='flex justify-center items-center' >
                    {!isLoading && 
                <div className='flex justify-center rounded-lg'>
                    {/* <Draggable> */}
                    <div className="w-[1050px] h-auto bg-white rounded-lg  ">
                        <div className="h-[40px] bg-[#EDF3FF]  justify-center flex items-center rounded-lg">
                            <div className="mr-[410px] ml-[410px]">
                                <div className="text-[16px]">Edit Builder</div>
                            </div>
                            <div className="flex justify-center items-center rounded-full w-[30px] h-[30px] bg-white">
                                <img onClick={() => {close()}} className="w-[20px] h-[20px]" src={Cross} alt="cross" />
                            </div>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="h-auto w-full">
                                <div className="flex gap-[48px] justify-center items-center">
                                    <div className=" space-y-[12px] py-[20px] px-[10px]">
                                        <div className="">
                                            <div className="text-[13px]">Builder Name <label className="text-red-500">*</label></div>
                                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]"  type="text" name="builderName" value={formValues.builderName} onChange={handleChange} />
                                            <div className="text-[10px] text-[#CD0000] ">{formErrors.builderName}</div>
                                        </div>
                                        <div className="">
                                            <div className="text-[13px]">Phone1 <label className="text-red-500">*</label></div>
                                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="text" name="phone1" value={formValues.phone1} onChange={handleChange} />
                                            <div className="text-[10px] text-[#CD0000] ">{formErrors.phone1}</div>

                                        </div>
                                        <div className="">
                                            <div className="text-[13px]">Phone2 </div>
                                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="text" name="phone2" value={formValues.phone2} onChange={handleChange} />
                                        </div>
                                        <div className="">
                                            <div className="text-[13px]">Email1</div>
                                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="email" name="email1" value={formValues.email1} onChange={handleChange} />
                                        </div>
                                        <div className="">
                                            <div className="text-[13px]">Email2</div>
                                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="email" name="email2" value={formValues.email2} onChange={handleChange} />
                                        </div>
                                        <div className="">
                                            <div className="text-[13px]">Address 1 <label className="text-red-500">*</label></div>
                                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="text" name="address1" value={formValues.address1} onChange={handleChange} />
                                            <div className="text-[12px] text-[#CD0000] ">{formErrors.address1}</div>
                                        </div>
                                        <div className="">
                                            <div className="text-[13px]">Address Line 2</div>
                                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="text" name="address2" value={formValues.address2} onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className=" space-y-[12px] py-[20px] px-[10px]">
                                        <div className="">
                                            <div className="text-[13px]">Country <label className="text-red-500">*</label></div>
                                            <select className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]"  name="country" value={formValues.country} onChange={(e) => {
                                                handleChange(e)
                                                setFormValues({ ...formValues, state: null });
                                                setFormValues({ ...formValues, city: null });
                                                setAllState([])
                                                fetchStateData(e.target.value)
                                                setAllCity([])
                                            }} >
                                                {allCountry && allCountry.map(item => (
                                                    <option key={item[0]} value={item[0]}>
                                                        {item[1]}
                                                    </option>
                                                ))}
                                            </select>
                                            <div className="text-[10px] text-[#CD0000] ">{formErrors.country}</div>
                                        </div>
                                        <div className="">
                                            <div className="text-[13px]">State <label className="text-red-500">*</label></div>
                                            <select className="w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" name="state" value={formValues.state} onChange={handleChange} >
                                            <option  hidden>Select A State</option>
                                                {allState && allState.map(item => (
                                                    <option value={item}>
                                                        {item}
                                                    </option>
                                                ))}
                                            </select>
                                            <div className="text-[10px] text-[#CD0000] ">{formErrors.state}</div>
                                        </div>
                                        <div className="">
                                            <div className="text-[13px]">City <label className="text-red-500">*</label></div>
                                            <select className="w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" name="city" value={formValues.city} onChange={handleChange} >
                                                <option  hidden>Select A City</option>
                                                {allCity && allCity.map(item => (
                                                    <option key={item.id} value={item.id}>
                                                        {item.city}
                                                    </option>
                                                ))}
                                            </select>
                                            <div className="text-[10px] text-[#CD0000] ">{formErrors.city}</div>
                                        </div>
                                        <div className="">
                                            <div className="text-[13px]">Suburb <label className="text-red-500">*</label></div>
                                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="text" name="suburb" value={formValues.suburb} onChange={handleChange} />
                                            <div className="h-[10px] w-[230px] text-[9px] text-[#CD0000] absolute">{formErrors.suburb}</div>
                                        </div>
                                        <div className="">
                                            <div className="text-[13px]">Zip Code</div>
                                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="text" name="zip" value={formValues.zip} onChange={handleChange} />
                                        </div>
                                        <div className="">
                                            <div className="text-[13px]">Website</div>
                                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="text" name="website" value={formValues.website} onChange={handleChange} />
                                        </div>
                                        <div className="">
                                            <div className="text-[13px]">Comment</div>
                                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="text" name="comment" value={formValues.comment} onChange={handleChange} />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="my-[10px] flex justify-center items-center gap-[10px]">
                                <button className='w-[100px] h-[35px] bg-[#004DD7] text-white rounded-md' type="submit">Save</button>
                                <button className='w-[100px] h-[35px] border-[1px] border-[#282828] rounded-md' onClick={() => {close()}}>Cancel</button>
                                {isLoading && <CircularProgress />}
                            </div>
                        </form>
                    </div>
                    {/* </Draggable> */}
                </div>}
            </Modal>
        </>

    )
}

export default EditManageBuilder
