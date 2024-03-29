import React from 'react';
import Cross from "../../../assets/cross.png";
import { Link } from 'react-router-dom';
import { Modal } from "@mui/material";
import { useState, useEffect } from "react";
import { APIService } from '../../../services/API';

const EditProspect = (props) => {
    console.log(props.item);
    const [editModalInput,setEditModalInput] = useState(props.item.personname);
    const [errorMessage,setErrorMessage] = useState("");
    const [allCountry, setAllCountry] = useState([]);
    const [allState, setAllState] = useState([]);
    const [allCity, setAllCity] = useState([]);
    const [currCountry, setCurrCountry] = useState(-1);
    const [pageLoading,setPageLoading] = useState(false);
    const [cityId,setCityId] = useState(0);
    const fetchCityId = async (name) => {
        const data = {"user_id":1234,"attr_name":"city","item_name":name,"table_name":"cities"};
        const response = await APIService.getItemByAttr(data);
        const result = await response.json();
        setCityId(result.data.id);
        // console.log(result);
    }
    const fetchCountryData = async () => {
        setPageLoading(true);
        // const data = { "user_id":  1234 };
        const data = { "user_id": 1234, "rows": ["id", "name"], "filters": [], "sort_by": [], "order": "asc", "pg_no": 0, "pg_size": 0 };
        const response = await APIService.getCountries(data)
        const result = (await response.json()).data;
        console.log(result.data);
        // await fetchCityId(props.item.city);
        await fetchStateData(props.item.countryid);
        // setPageLoading(false);
        if (Array.isArray(result.data)) {
            setAllCountry(result.data);
        }
    }
    const fetchStateData = async (id) => {
        console.log(id);
        const data = { "user_id": 1234, "country_id": id };
        const response = await APIService.getState(data);
        const result = (await response.json()).data;
        await fetchCityData(props.item.state);
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
        }
        setPageLoading(false);
    }
    const handleEdit = async () => {
        console.log('called');
        if(!validate()) {
            return ;
        }

        const data = {
            "user_id": 1234,
            "id": props.item.id,
            "personname": formValues.personname,
            "suburb": formValues.suburb,
            "city": formValues.city,
            "state": formValues.state,
            "country": formValues.country,
            "propertylocation": formValues.propertyLocation,
            "possibleservices": formValues.possibleServices,
            "dated": "2024-01-01 00:00:00",
            "createdby": 1234,
            "isdeleted": false
        }
        console.log('called')
        const response = await APIService.editProspects(data);
        // props.handleClose();
        props.openPrompt();
        // props.fetchData();
    }
    const handleDialogClose = () => {
        props.setOpenDialog(false);
    }

    useEffect(() => {
        fetchCityId(props.item.city);
        fetchCountryData();
    }, []);

    const initialValues = {
        personname: props.item.personname,
        country: props.item.countryid,
        state: props.item.state,
        city: props.item.city,
        suburb: props.item.suburb,
        propertyLocation: props.item.propertylocation,
        possibleServices: props.item.possibleservices,
    };
    const [formValues, setFormValues] = useState(initialValues);
    const [formErrors, setFormErrors] = useState({});

    // handle changes in input form
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };
    // validate form and to throw Error message
    const validate = () => {
        var res = true;
        if(!formValues.personname) {
            setFormErrors((existing) => {
               return {...existing,personname: "Enter Person Name"}
            })
            res = false;
        }else {
            setFormErrors((existing) => {
                return {...existing,personname: ""}
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
               return  {...existing,possibleServices: "Enter Suburb Name"}
            })
            res = false;
        }else {
            setFormErrors((existing) => {
                return  {...existing,possibleServices: ""}
             })
        }
        if(!formValues.propertyLocation) {
            setFormErrors((existing) => {
               return  {...existing,propertyLocation: "Enter Suburb Name"}
            })
            res = false;
        }else {
            setFormErrors((existing) => {
                return  {...existing,propertyLocation: ""}
             })
        }
        return res;
    };

    return (
        <Modal open={props.isOpen}
            fullWidth={true}
            maxWidth={'md'} >

            <div className='flex justify-center mt-[20px]'>
                <div className="w-auto h-auto bg-white rounded-lg">
                    <div className="h-[40px] bg-[#EDF3FF]  justify-center flex items-center">
                        <div className="mr-[410px] ml-[410px]">
                            <div className="text-[16px]">Edit Prospect</div>
                        </div>
                        <div className="flex justify-center items-center rounded-full w-[30px] h-[30px] bg-white">
                            <img  onClick={props.handleClose} className="w-[20px] h-[20px] cursor-pointer" src={Cross} alt="cross" />
                        </div>
                    </div>
                    {/* <form > */}
                        {!pageLoading && <div className="h-auto w-full mt-[5px] ">
                            <div className="flex gap-[48px] justify-center items-center">
                                <div className=" space-y-[12px] py-[20px] px-[10px]">
                                    <div className="">
                                        <div className="text-[14px]">Person name <label className="text-red-500">*</label></div>
                                        <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="personname" value={formValues.personname} onChange={handleChange} />
                                        <div className="text-[12px] text-[#CD0000] ">{formErrors.personname}</div>
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
                                                {allState && allState.map((item) => {
                                                    // if(item[0])
                                                    if(item[1] == formValues.state) {
                                                        return <option value={item[1]} selected>
                                                            {item[1]}
                                                        </option>
                                                    }else {
                                                        return (<option value={item[1]} >
                                                            {item[1]}
                                                        </option>);
                                                    }
                                                 })}
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
                                                    // fetchCityData(e.target.value);
                                                    console.log(e.target.value);
                                                    setFormValues((existing) => {
                                                        const newData = { ...existing, city: e.target.value }
                                                        return newData;
                                                    })

                                                }}
                                            >
                                                { allCity && allCity.map((item) => {
                                                    if(item.city == props.item.city) {
                                                        return <option value={item.city} selected>
                                                            {item.city}
                                                        </option>
                                                    }else {
                                                        return <option value={item.city} selected>
                                                            {item.city}
                                                        </option>
                                                    }
                                                 })}
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
                        </div>}

                        <div className="my-5 flex justify-center items-center gap-[10px]">
                            <button className='w-[100px] h-[35px] bg-[#004DD7] text-white rounded-md'  onClick={handleEdit}>Save</button>
                            <button className='w-[100px] h-[35px] border-[1px] border-[#282828] rounded-md'  onClick={props.handleClose}>Cancel</button>
                        </div>
                    {/* </form> */}
                </div>
            </div>
        </Modal>
    )
}

export default EditProspect
