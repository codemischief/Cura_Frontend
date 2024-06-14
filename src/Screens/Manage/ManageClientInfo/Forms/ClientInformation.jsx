import React from 'react';
import { useState, useEffect, useRef } from 'react';
import Checkbox from '@mui/material/Checkbox';
import { APIService } from '../../../../services/API';
import AsyncSelect from "react-select/async"
// import OrderDropDown from '../../../../Components/Dropdown/OrderDropdown';
import PropertyDropDown from '../../../../Components/Dropdown/PropertyDropDown';
import useAuth from '../../../../context/JwtContext';
const ClientInformation = ({ formValues, setFormValues, allCountry, clientTypeData, tenentOfData, allEntities, initialStates, initialCities ,formErrors , orderText, setOrderText}) => {
    const { user } = useAuth()
    const [tenantOfProperty,setTenantOfProperty] = useState([]);
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
        },
        {
            id : 5,
            name : "Shri"
        },
        {
            id : 6,
            name : "Smt"
        },
        {
            id : 7,
            name : "MS"
        }

    ]);
    const [clientProperty, setClientProperty] = useState([]);
    const [country, setCountry] = useState([]);
    const [allCity, setAllCity] = useState(initialCities);
    // const [clientType, setClientType] = useState([]);
    const [tenetOf, setTenetOf] = useState([]);
    // const [state, setState] = useState([]);
    const [allState, setAllState] = useState(initialStates);
    const [source, setSource] = useState([]);
    // const [employeeName, setEmployeeName] = useState([]);
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
        const data = { "user_id": user.id, "country_id": id };
        // const data = {"user_id":user.id,"rows":["id","state"],"filters":[],"sort_by":[],"order":"asc","pg_no":0,"pg_size":0};
        const response = await APIService.getState(data);
        const result = (await response.json()).data;
        console.log(result)
        setAllState(result)
        
    }
    const fetchCityData = async (id) => {
        const data = { "user_id": user.id, "state_name": id };
        const response = await APIService.getCities(data);
        const result = (await response.json()).data;
        console.log(result);
        if (Array.isArray(result)) {
            setAllCity(result)
        }
    }


  const [options,setOptions] = useState([]);
  const fetchClientData = async () => {
     const data = {
      "user_id" : user.id
     }
     const response = await APIService.getClientAdmin(data)
     const res = await response.json();
     console.log(res.data)
    //  res.data.map((item) => {
    //      value : item[0],
    //      label : item[1]
    //  })
     setOptions(res.data.map(x => ({
      value: x[0],
      label: x[1]
    })))
  }


  const getClientPropertyByClientId = async (id) => {
    const data = {
     "user_id" : user.id,
     "client_id" : id
    }

    const response = await APIService.getClientPropertyByClientId(data)
    const res = await response.json()
    console.log(res)
    setTenantOfProperty(res.data)
 }

  const [selectedOption,setSelectedOption] = useState({
    label : formValues.client_info.tenantofname  ,
    value : null
   });
   const [query,setQuery] = useState('')
   const handleClientNameChange = (e) => {
       console.log('hey')
       console.log(e)
      //  setFormValues({...formValues,client_property : {
      //   ...formValues.client_property,
      //   clientid : e.value
      //  }})
      setOrderText((prev) => 'Select Tenant Of Property')
       const existing = {...formValues}
       const temp = {...existing.client_info}
       getClientPropertyByClientId(e.value)
       temp.tenantof = e.value
       temp.tenantofname = e.label 
       temp.tenentofproperty = null
       temp.tenentofpropertyname = 'Select Tenant Of Property'
       existing.client_info = temp;
       setFormValues(existing)
       console.log(formValues)
       setSelectedOption(e)
   }
   const loadOptions = async (e) => {
      console.log(e)
      if(e.length < 3) return ;
      const data = {
        "user_id" : user.id,
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
    useEffect(() => {
        if(formValues.client_info.tenantof) {
            getClientPropertyByClientId(formValues.client_info.tenantof)
        }
    }, [])
    
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
                            <option value="" hidden>Select Salutation</option>
                            {Salutation && Salutation.map(item => (
                                <option key={item.id} value={item.name}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                        <div className="text-[8px] text-[#CD0000] absolute ">{formErrors.salutation}</div>
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
                            <option value="" hidden>Select Client Type </option>
                            {clientTypeData && clientTypeData.map(item => (
                                <option key={item.id} value={item.id}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                        {/* <p>hey</p> */}
                        <div className="text-[8px] text-[#CD0000] absolute ">{formErrors.clienttype}</div>
                    </div>
                    <div className="">
                        <div className="text-[13px]">Address Line 1 </div>
                        <input className="text-[11px] px-3 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="addressline1" value={formValues.client_info.addressline1} onChange={handleChange} />
                        {/* <div className="text-[12px] text-[#CD0000] ">{formErrors.amount}</div> */}
                    </div>
                    <div className="">
                        <div className="text-[13px]">Email 1 </div>
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
                            {allEntities && allEntities.map(item => {
                                if(item[0] == formValues.client_info.entityid) {
                                    return <option key={item[0]} value={item[0]} selected>
                                    {item[1]}
                                </option>
                                }else {
                                  return  <option key={item[0]} value={item[0]}>
                                    {item[1]}
                                </option>
                                }
})}
                        </select>
                        {/* <div className="text-[12px] text-[#CD0000] ">{formErrors.modeofpayment}</div> */}
                    </div>
                </div>
                <div className="space-y-3 py-2">
                    <div className="">
                        <div className="text-[13px]">First Name <label className="text-red-500">*</label></div>
                        <input className="text-[11px] px-3 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="firstname" onChange={handleChange} value={formValues.client_info.firstname} />
                        <div className="text-[8px] text-[#CD0000] absolute">{formErrors.firstname}</div>
                    </div>
                    <div className="">
                        <div className="text-[13px]">Country <label className="text-red-500">*</label></div>
                        <select className="text-[11px] px-3 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" 
                        value={formValues.client_info.country}
                        name="country" onChange={
                            (e) => {
                                const existing = {...formValues};
                                const temp = existing.client_info
                                temp.country = e.target.value;
                                temp.state = null
                                temp.city = null
                                existing.client_info = temp;
                                setFormValues(existing)
                               
                                setAllCity([]);
                                setAllState([])
                                fetchStateData(e.target.value)
                                
                            }
                        }
                            // value={formValues.client_info.country}
                        >
                            <option value="" hidden>Select Country</option>
                            {allCountry && allCountry.map(item => {
                                if (item[0] == formValues.client_info.country) {
                                    return <option key={item.id} value={item.id} selected>
                                        {item.id}
                                    </option>
                                } else {
                                    return <option key={item.id} value={item.id} >
                                        {item.name}
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
                        <div className="text-[12px]">Middle Name </div>
                        <input className="text-[11px] px-3 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="middlename" onChange={handleChange} value={formValues.client_info.middlename} />
                        <div className="text-[8px] text-[#CD0000] absolute">{formErrors.middlename}</div>
                    </div>
                    <div className="">
                        <div className="text-[13px]">State <label className="text-red-500">*</label></div>
                        {/* <h1>{allState.length}</h1> */}
                        <select className="text-[11px] px-3 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" value={formValues.client_info.state} name="state" onChange={
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
                            <option value="" hidden>Select State </option>

                            {allState && allState.map(item => {
                                if (item[0] == "Maharashtra") {
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
                        <div className="text-[8px] text-[#CD0000] absolute">{formErrors.state}</div>
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
                                                    minHeight: 23,
                                                    lineHeight: '0.8',
                                                    height: 4,
                                                    width: 230,
                                                    fontSize: 10,
                                                    // padding: '1px'
                                                }),
                                                // indicatorSeparator: (provided, state) => ({
                                                //   ...provided,
                                                //   lineHeight : '0.5',
                                                //   height : 2,
                                                //   fontSize : 12 // hide the indicator separator
                                                // }),
                                                dropdownIndicator: (provided, state) => ({
                                                    ...provided,
                                                    padding: '1px', // adjust padding for the dropdown indicator
                                                }),
                                                // options: (provided, state) => ({
                                                //     ...provided,
                                                //     fontSize: 10// adjust padding for the dropdown indicator
                                                // }),
                                                option: (provided, state) => ({
                                                    ...provided,
                                                    padding: '2px 10px', // Adjust padding of individual options (top/bottom, left/right)
                                                    margin: 0, // Ensure no extra margin
                                                    fontSize: 10 // Adjust font size of individual options
                                                }),
                                                menu: (provided, state) => ({
                                                    ...provided,
                                                    width: 230, // Adjust the width of the dropdown menu
                                                    zIndex: 9999 // Ensure the menu appears above other elements
                                                }),
                                                menuList: (provided, state) => ({
                                                    ...provided,
                                                    padding: 0, // Adjust padding of the menu list
                                                    fontSize: 10,
                                                    maxHeight: 150 // Adjust font size of the menu list
                                                }),
                                                
                                            }}
                                        />
                        {/* <select className="text-[11px] px-3 w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm" name="tenantof" >
                            <option > </option>
                            
                        </select> */}
                        {/* <div className="text-[12px] text-[#CD0000] ">{formErrors.modeofpayment}</div> */}
                    </div>

                </div>
                <div className="space-y-3 py-2 mt-[5px] ">
                <div className="">
                        <div className="text-[12px]">Last Name <label className="text-red-500">*</label></div>
                        <input className="text-[11px] px-3 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="lastname" onChange={handleChange} value={formValues.client_info.lastname} />
                        <div className="text-[8px] text-[#CD0000] absolute">{formErrors.lastname}</div>
                    </div>
                    <div className="">
                        <div className="text-[13px]">City <label className="text-red-500">*</label></div>
                        <select className="text-[11px] px-3 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" value={formValues.client_info.city}name="city" onChange={
                            (e) => {
                                setFormValues({
                                    ...formValues, client_info: {
                                        ...formValues.client_info,
                                        city: e.target.value
                                    }
                                })
                            }
                        }>
                            
                            <option value="none" hidden> Select A City</option>
                            {allCity && allCity.map(item => (
                                <option value={item.city}>
                                    {item.city}
                                </option>
                            ))}
                        </select>
                        <div className="text-[8px] text-[#CD0000] absolute">{formErrors.city}</div>
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
                        <div className="text-[13px]">Tenant Of Property</div>
                        {console.log(tenantOfProperty)}
                        <select className="text-[11px] px-3 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" value={formValues.client_info.tenentofproperty} name="city" onChange={(e) => {
                            setFormValues({
                                ...formValues, client_info: {
                                    ...formValues.client_info,
                                    tenentofproperty: e.target.value
                                }
                            })
                        }}>
                            
                            <option value="none" > Select Tenant Of Property</option>
                            {tenantOfProperty && tenantOfProperty.map(item => (
                                <option value={item.id}>
                                    {item.propertyname}
                                </option>
                            ))}
                        </select>
                        {/* <PropertyDropDown options={tenantOfProperty} orderText={orderText} setOrderText={setOrderText} leftLabel="Builder Name" rightLabel="Property" leftAttr="buildername" rightAttr="propertyname" toSelect="propertyname" handleChange={(e) => {
                            setFormValues({
                                ...formValues, client_info: {
                                    ...formValues.client_info,
                                    tenentofproperty: e.target.value
                                }
                            })
                        }} formValueName="tenentofproperty" value={formValues.client_info.tenentofproperty}  /> */}
                        {/* <select className="text-[10px] px-3 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" name="tenentof" value={formValues.client_info.tenentofproperty} onChange={
                            (e) => {
                                setFormValues({
                                    ...formValues, client_info: {
                                        ...formValues.client_info,
                                        tenentofproperty: e.target.value
                                    }
                                })
                            }
                        }>
                            <option >Select tenant of </option>
                            {tenantOfProperty && tenantOfProperty.map(item => (
                                <option key={item.id} value={item.id}>
                                    {item.propertyname}
                                </option>
                            ))}
                        </select> */}
                        {/* <div className="text-[12px] text-[#CD0000] ">{formErrors.modeofpayment}</div> */}
                    </div>
                    
                </div>
            </div>
            
            {/* <div className="mt-[10px] flex justify-center items-center font-semibold text-[14px]"><input
                        type="checkbox"
                        checked={formValues.client_info.includeinmailinglist}
                        className='mr-3 h-4 w-4'
                        onClick={(e) => {
                            // console.log(e.target.checked)
                            const existing = {...formValues};
                            const temp = {...existing.client_info};
                            temp.includeinmailinglist = !temp.includeinmailinglist
                            existing.client_info = temp;
                            setFormValues(existing) 
                          }}
        />Exclude From Mailing List</div> */}
        </div>
    )
}

export default ClientInformation