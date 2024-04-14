import React from 'react';
import { useState, useEffect, useRef } from 'react';
import Checkbox from '@mui/material/Checkbox';
import { APIService } from '../../../../services/API';
import AsyncSelect from "react-select/async"
const EditClientInformation = ({formErrors, formValues, setFormValues, allCountry, clientTypeData, tenentOfData, allEntities, initialStates, initialCities,tenantofname}) => {
    console.log(formErrors)
    const [Salutation, setSalutation] = useState([
        {
            id: 1,
            name: "Mr"
        },
        {
            id: 2,
            name: "Mrs"
        },
        {
            id: 3,
            name: "Miss"
        },
        {
            id: 4,
            name: "Master"
        }

    ]);
    const [clientProperty, setClientProperty] = useState([]);
    const [country, setCountry] = useState([]);
    const [allCity, setAllCity] = useState(initialCities);
    // const [clientType, setClientType] = useState([]);
    const [tenetOf, setTenetOf] = useState([]);
    // const [state, setState] = useState([]);
    // console.log(initialStates)
    const [allState, setAllState] = useState([]);
    const [source, setSource] = useState([]);
    const [employeeName, setEmployeeName] = useState([]);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues, client_info: {
                ...formValues.client_info,
                [name]: value
            }
        })
    };
    const fetchStateData = async (id) => {
        console.log(id);
        const data = { "user_id": 1234, "country_id": id };
        // const data = {"user_id":1234,"rows":["id","state"],"filters":[],"sort_by":[],"order":"asc","pg_no":0,"pg_size":0};
        const response = await APIService.getState(data);
        const result = (await response.json()).data;
        console.log(result)
        if (Array.isArray(result)) {
            setAllState(result)
            if(result.length >= 1) {
                console.log('hey')
                fetchCityData(result[0][0])
            }
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
    }
    useEffect(() => {
        setAllState(initialStates);
        setAllCity(initialCities);
    }, [initialStates,initialCities,tenantofname])



  const [options,setOptions] = useState([]);
  const fetchClientData = async () => {
     const data = {
      "user_id" : 1234
     }
     const response = await APIService.getClientAdmin(data)
     const res = await response.json();
     console.log(res.data)
     setOptions(res.data.map(x => ({
      value: x[0],
      label: x[1]
    })))
  }
   console.log(tenantofname)
   const [selectedOption,setSelectedOption] = useState(tenantofname);
   const [query,setQuery] = useState('')
   const handleClientNameChange = (e) => {
       console.log('hey')
       console.log(e)
      //  setFormValues({...formValues,client_property : {
      //   ...formValues.client_property,
      //   clientid : e.value
      //  }})
       const existing = {...formValues}
       const temp = {...existing.client_info}
       temp.tenantof = e.value
       existing.client_info = temp;
       setFormValues(existing)
       console.log(formValues)
       setSelectedOption(e)
   }
   const loadOptions = async (e) => {
      console.log(e)
      if(e.length < 3) return ;
      const data = {
        "user_id" : 1234,
        "pg_no" : 0,
        "pg_size" : 0,
        "search_key" : e
      }
      const response = await APIService.getClientAdminPaginated(data)
      const res = await response.json()
      const results = res.data.map(e => {
        return {
          label : e[1],
          value : e[0]
        }
      })
      if(results === 'No Result Found') {
        return []
      }
      return results
   }
    return (
        <div className="h-auto w-full">
            <div className="flex gap-10 justify-center items-center">
                <div className=" space-y-3 py-2">
                    <div className="">
                        <div className="text-[13px]">Salutation <label className="text-red-500">*</label></div>
                        <select className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" name="salutation"
                            value={formValues.client_info.salutation}
                            onChange={
                                handleChange
                            }>
                            <option value={""}> Select Salutation</option>
                            {Salutation && Salutation.map(item => {
                                if(item.name == formValues.client_info.salutation) {
                                    return <option value={item.name} selected>
                                         {item.name}
                                    </option>
                                }else {
                                    return <option value={item.name}>
                                         {item.name}
                                    </option>
                                }
})}
                        </select>
                        <div className="text-[10px] text-[#CD0000] ">{formErrors.salutation}</div>
                    </div>
                    <div className="">
                        <div className="text-[13px]">Client Type <label className="text-red-500">*</label></div>
                        <select className="text-[11px] px-3 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" value={formValues.client_info.clienttype} onChange={
                            (e) => {
                                setFormValues({
                                    ...formValues, client_info: {
                                        ...formValues.client_info,
                                        clienttype: e.target.value
                                    }
                                })
                            }
                        } >
                            <option value={null}>Select Client Type </option>
                            {clientTypeData && clientTypeData.map(item => (
                                <option key={item.id} value={item.id}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                        <div className="text-[12px] text-[#CD0000] ">{formErrors.clienttype}</div>
                    </div>
                    <div className="">
                        <div className="text-[13px]">Address Line 1 </div>
                        <input className="text-[11px] px-3 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="addressline1" value={formValues.client_info.addressline1} onChange={handleChange} />
                        {/* <div className="text-[12px] text-[#CD0000] ">{formErrors.amount}</div> */}
                    </div>
                    <div className="">
                        <div className="text-[13px]">Email 1</div>
                        <input className="text-[11px] px-3 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="email1" onChange={handleChange} value={formValues.client_info.email1} />
                        {/* <div className="text-[12px] text-[#CD0000] ">{formErrors.amount}</div> */}
                    </div>
                    <div className="">
                        <div className="text-[13px]">Local Contact 1 Name </div>
                        <input className="text-[11px] px-3 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="localcontact1name" onChange={handleChange} value={formValues.client_info.localcontact1name} />
                        {/* <div className="text-[12px] text-[#CD0000] ">{formErrors.amount}</div> */}
                    </div>
                    <div className="">
                        <div className="text-[13px]">Local Contact 2 Name </div>
                        <input className="text-[11px] px-3 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="localcontact2name" onChange={handleChange} value={formValues.client_info.localcontact2name} />
                        {/* <div className="text-[12px] text-[#CD0000] ">{formErrors.amount}</div> */}
                    </div>
                    <div className="">
                        <div className="text-[13px]">Source <label className="text-red-500">*</label></div>
                        <select className="text-[11px] px-3 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" name="source" value={formValues.client_info.entityid} onChange={
                            (e) => {
                                setFormValues({
                                    ...formValues, client_info: {
                                        ...formValues.client_info,
                                        entityid: e.target.value
                                    }
                                })
                            }
                        }>
                            {/* <option >Select entity </option> */}
                            {allEntities && allEntities.map(item => (
                                <option key={item[0]} value={item[0]}>
                                    {item[1]}
                                </option>
                            ))}
                        </select>
                        {/* <div className="text-[12px] text-[#CD0000] ">{formErrors.modeofpayment}</div> */}
                    </div>
                </div>
                <div className="space-y-3 py-2">
                    <div className="">
                        <div className="text-[13px]">First Name <label className="text-red-500">*</label></div>
                        <input className="text-[11px] px-3 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="firstname" onChange={handleChange} value={formValues.client_info.firstname} />
                        <div className="text-[12px] text-[#CD0000] ">{formErrors.firstname}</div>
                    </div>
                    <div className="">
                        <div className="text-[13px]">Country <label className="text-red-500">*</label></div>
                        <select className="text-[11px] px-3 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" name="country" onChange={
                            (e) => {
                                setFormValues({
                                    ...formValues, client_info: {
                                        ...formValues.client_info,
                                        country: e.target.value
                                    }
                                })
                                fetchStateData(e.target.value)
                                setAllCity([]);
                            }
                        }
                            value={formValues.client_info.country}
                        >
                            <option value={null}>Select Country</option>
                            {allCountry && allCountry.map(item => {
                                if (item[0] == formValues.client_info.country) {
                                    return <option key={item[0]} value={item[0]} selected>
                                        {item[1]}
                                    </option>
                                } else {
                                    return <option key={item[0]} value={item[0]} >
                                        {item[1]}
                                    </option>
                                }

                            })}
                        </select>
                        {/* <div className="text-[12px] text-[#CD0000] ">{formErrors.modeofpayment}</div> */}
                    </div>
                    <div className="">
                        <div className="text-[13px]">Address Line 2 </div>
                        <input className="text-[11px] px-3 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="addressline2" onChange={handleChange} value={formValues.client_info.addressline2} />
                        {/* <div className="text-[12px] text-[#CD0000] ">{formErrors.amount}</div> */}
                    </div>
                    <div className="">
                        <div className="text-[13px]">Email 2 </div>
                        <input className="text-[11px] px-3 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="email2" onChange={handleChange} value={formValues.client_info.email2} />
                        {/* <div className="text-[12px] text-[#CD0000] ">{formErrors.amount}</div> */}
                    </div>
                    <div className="">
                        <div className="text-[13px]">Local Contact 1 Details </div>
                        <input className="text-[11px] px-3 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="localcontact1details" onChange={handleChange} value={formValues.client_info.localcontact1details} />
                        {/* <div className="text-[12px] text-[#CD0000] ">{formErrors.amount}</div> */}
                    </div>
                    <div className="">
                        <div className="text-[13px]">Local Contact 2 Details </div>
                        <input className="text-[11px] px-3 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="localcontact2details" onChange={handleChange} value={formValues.client_info.localcontact2details} />
                        {/* <div className="text-[12px] text-[#CD0000] ">{formErrors.amount}</div> */}
                    </div>
                    <div className="">
                        <div className="text-[13px]">Comments </div>
                        <input className="text-[11px] px-3 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="comments" onChange={handleChange} value={formValues.client_info.comments} />
                        {/* <div className="text-[12px] text-[#CD0000] ">{formErrors.amount}</div> */}
                    </div>
                </div>
                <div className="space-y-3 py-2">
                    <div className="">
                        <div className="text-[12px]">Middle Name <label className="text-red-500">*</label></div>
                        <input className="text-[11px] px-3 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="middlename" onChange={handleChange} value={formValues.client_info.middlename} />
                        <div className='text-[12px] text-[#CD0000] '>
                            {formErrors.middlename}
                        </div>
                        {/* <div className="text-[12px] text-[#CD0000] ">{formErrors.amount}</div> */}
                    </div>
                    <div className="">
                        <div className="text-[13px]">State <label className="text-red-500">*</label></div>
                        <select className="text-[11px] px-3 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" name="state" value={formValues.client_info.state}onChange={
                            (e) => {
                                setFormValues({
                                    ...formValues, client_info: {
                                        ...formValues.client_info,
                                        state: e.target.value
                                    }
                                })
                                fetchCityData(e.target.value)
                            }
                        }>
                            {allState.map(item => {
                                if (item[0] == formValues.client_info.state) {
                                    return <option key={item[0]} selected>
                                        {item[0]}
                                    </option>
                                } else {
                                    return <option key={item[0]}>
                                        {item[0]}
                                    </option>
                                }
                            })}
                        </select>
                        {/* <div className="text-[12px] text-[#CD0000] ">{formErrors.modeofpayment}</div> */}
                    </div>
                    <div className="">
                        <div className="text-[13px]">Pin Code </div>
                        <input className="text-[11px] px-3 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="zip" onChange={handleChange} value={formValues.client_info.zip} />
                        {/* <div className="text-[12px] text-[#CD0000] ">{formErrors.amount}</div> */}
                    </div>
                    <div className="">
                        <div className="text-[13px]">Mobile Phone </div>
                        <input className="text-[11px] px-3 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="mobilephone" onChange={handleChange} value={formValues.client_info.mobilephone} />
                        {/* <div className="text-[12px] text-[#CD0000] ">{formErrors.amount}</div> */}
                    </div>
                    <div className="">
                        <div className="text-[13px]">Local Contact 1 Address </div>
                        <input className="text-[11px] px-3 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="localcontact1address" onChange={handleChange} value={formValues.client_info.localcontact1address} />
                        {/* <div className="text-[12px] text-[#CD0000] ">{formErrors.amount}</div> */}
                    </div>
                    <div className="">
                        <div className="text-[13px]">Local Contact 2 Address </div>
                        <input className="text-[10px] px-3 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="localcontact2address" onChange={handleChange} value={formValues.client_info.localcontact2address} />
                        {/* <div className="text-[12px] text-[#CD0000] ">{formErrors.amount}</div> */}
                    </div>
                    <div className="">
                        <div className="text-[13px]">Tenant Of </div>
                        <AsyncSelect
                        onChange={handleClientNameChange}
                        value={selectedOption}
                        loadOptions={loadOptions}
                        cacheOptions
                        defaultOptions
                        onInputChange={(value) => setQuery(value)}
                 
                 styles={{
                  control: (provided, state) => ({
                    ...provided,
                    minHeight : 25,
                    lineHeight : '1.3',
                    height : 2,
                    fontSize : 12,
                    padding : '1px'
                  }),
                  // indicatorSeparator: (provided, state) => ({
                  //   ...provided,
                  //   lineHeight : '0.5',
                  //   height : 2,
                  //   fontSize : 12 // hide the indicator separator
                  // }),
                  dropdownIndicator: (provided, state) => ({
                    ...provided,
                    padding: '3px', // adjust padding for the dropdown indicator
                  }),
                  options : (provided, state) => ({
                    ...provided,
                    fontSize : 12 // adjust padding for the dropdown indicator
                  })
                 }}
            />
                        
                        {/* <div className="text-[12px] text-[#CD0000] ">{formErrors.modeofpayment}</div> */}
                    </div>

                </div>
                <div className="space-y-3 py-2">
                <div className="">
                        <div className="text-[12px]">Last Name <label className="text-red-500">*</label></div>
                        <input className="text-[11px] px-3 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="lastname" onChange={handleChange} value={formValues.client_info.lastname} />
                        <div className="text-[12px] text-[#CD0000] ">{formErrors.lastname}</div>
                        {/* <h1>this is an error</h1> */}
                    </div>
                    <div className="">
                        <div className="text-[13px]">City <label className="text-red-500">*</label></div>
                        <select className="text-[11px] px-3 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" name="city" onChange={
                            (e) => {
                                setFormValues({
                                    ...formValues, client_info: {
                                        ...formValues.client_info,
                                        city: e.target.value
                                    }
                                })
                            }
                        }>
                            {allCity && allCity.map(item => {
                                if(item.city == formValues.client_info.city) {
                                     return <option value={item.city} selected>
                                     {item.city}
                                 </option>
                                }else {
                                      return <option value={item.city}>
                                      {item.city}
                                  </option>
                                }
})}
                        </select>
                        {/* <div className="text-[12px] text-[#CD0000] ">{formErrors.modeofpayment}</div> */}
                    </div>
                    <div className="">
                        <div className="text-[13px]">Area/Locality </div>
                        <input className="text-[11px] px-3 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="suburb" value={formValues.client_info.suburb} onChange={handleChange}/>
                        {/* <div className="text-[12px] text-[#CD0000] ">{formErrors.amount}</div> */}
                    </div>
                    <div className="">
                        <div className="text-[13px]">Home Phone </div>
                        <input className="text-[11px] px-3 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="homephone" onChange={handleChange} value={formValues.client_info.homephone} />
                        {/* <div className="text-[12px] text-[#CD0000] ">{formErrors.amount}</div> */}
                    </div>
                    <div className="">
                        <div className="text-[13px]">Work Phone </div>
                        <input className="text-[11px] px-3 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="workphone" onChange={handleChange} value={formValues.client_info.workphone} />
                        {/* <div className="text-[12px] text-[#CD0000] ">{formErrors.amount}</div> */}
                    </div>
                    <div className="">
                        <div className="text-[13px]">Employer Name </div>
                        
                            <input className="text-[11px] px-3 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="employername" onChange={handleChange} value={formValues.client_info.employername} />
                        {/* <div className="text-[12px] text-[#CD0000] ">{formErrors.modeofpayment}</div> */}
                    </div>
                    
                    <div className="">
                        <div className="text-[13px]">Tenent Of Property</div>
                        <select className="text-[10px] px-3 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" name="tenentof" value={formValues.client_info.tenantofproperty} onChange={
                            (e) => {
                                setFormValues({
                                    ...formValues, client_info: {
                                        ...formValues.client_info,
                                        tenantofproperty: e.target.value
                                    }
                                })
                            }
                        }>
                            {/* <option >Select tenent of </option> */}
                            {tenentOfData && tenentOfData.map(item => {
                                if(item.id == formValues.client_info.tenantofproperty) {
                                    return <option key={item.id} value={item.id} selected>
                                          {item.suburb}
                                          &nbsp;
                                          &nbsp;
                                          {item.propertydescription}
                                    </option>
                                }else {
                                     return <option key={item.id} value={item.id}>
                                           {item.suburb}
                                          &nbsp;
                                          &nbsp;
                                          {item.propertydescription}
                                 </option>
                                }
})}
                        </select>
                        {/* <div className="text-[12px] text-[#CD0000] ">{formErrors.modeofpayment}</div> */}
                    </div>
                    
                </div>
            </div>
            
        </div>
    )
}

export default EditClientInformation
