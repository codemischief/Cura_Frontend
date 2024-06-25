import React from 'react';
import { useState, useEffect, useRef } from 'react';
import Checkbox from '@mui/material/Checkbox';
import { MenuItem } from '@mui/material';
import { APIService } from '../../../../services/API';
import AsyncSelect from "react-select/async"
// import OrderDropDown from '../../../../Components/Dropdown/OrderDropdown';
import PropertyDropDown from '../../../../Components/Dropdown/PropertyDropDown';
import useAuth from '../../../../context/JwtContext';
import ClientPropertySelectNative from '../../../../Components/common/select/ClientPropertySelectNative';
const EditClientInformation = ({formErrors, formValues, setFormValues, allCountry, clientTypeData, tenentOfData, allEntities, initialStates, initialCities,tenantofname, orderText , setOrderText, setTenantOfName}) => {
    const { user } = useAuth()
    
    // 
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
    // 
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
        
        const data = { "user_id": user.id, "country_id": id };
        // const data = {"user_id":user.id,"rows":["id","state"],"filters":[],"sort_by":[],"order":"asc","pg_no":0,"pg_size":0};
        const response = await APIService.getState(data);
        const result = (await response.json()).data;
        
        if (Array.isArray(result)) {
            setAllState(result)
            if(result.length >= 1) {
                
                fetchCityData(result[0][0])
            }
        }
    }
    const fetchCityData = async (id) => {
        const data = { "user_id": user.id, "state_name": id };
        const response = await APIService.getCities(data);
        const result = (await response.json()).data;
        
        if (Array.isArray(result)) {
            setAllCity(result)
        }
    }
    function convertToIdNameObject(items) {
        const idNameObject = {};
        items.forEach((item) => {
          idNameObject[item.id] = {
            buildername : item.buildername,
            propertyname : item.propertyname
          }
        });
        return idNameObject;
    }
    const [tenantOfProperty,setTenantOfProperty] = useState([])
    const getClientPropertyByClientId = async (id) => {
        const data = {
         "user_id" : user.id,
         "client_id" : id
        }
    
        const response = await APIService.getClientPropertyByClientId(data)
        const res = await response.json()
        
        setTenantOfProperty(convertToIdNameObject(res.data))
        // setTenantOfProperty(res.data)
     }
    useEffect(() => {
        // we need to fetch the client property
        
        // getClientPropertyByClientId(tenantofname.value)
        getClientPropertyByClientId(formValues.client_info.tenantof)
        setAllState(initialStates);
        setAllCity(initialCities);
    }, [initialStates,initialCities,tenantofname])



  const [options,setOptions] = useState([]);
 
   
   const [selectedOption,setSelectedOption] = useState(tenantofname);
   const [query,setQuery] = useState('')
   const handleClientNameChange = (e) => {
       
       
      //  setFormValues({...formValues,client_property : {
      //   ...formValues.client_property,
      //   clientid : e.value
      //  }})
       const l = {...tenantofname}
       l.label = e.label 
       l.value = e.value 
       setTenantOfName(l)
       
       setOrderText((prev) => 'Select Tenant Of Property')
       const existing = {...formValues}
       const temp = {...existing.client_info}
       temp.tenantof = e.value
       temp.tenantofproperty = null
       existing.client_info = temp;
       getClientPropertyByClientId(e.value)
       setFormValues(existing)
       
       setSelectedOption(e)
   }
   const loadOptions = async (e) => {
      
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
                        <div className="text-[8px] text-[#CD0000] absolute">{formErrors.salutation}</div>
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
                        <div className="text-[8px] text-[#CD0000] absolute ">{formErrors.clienttype}</div>
                    </div>
                    <div className="">
                        <div className="text-[13px]">Address Line 1 </div>
                        <input className="text-[11px] px-3 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="addressline1" value={formValues.client_info.addressline1} onChange={handleChange} />
                        {/* <div className="text-[8px] text-[#CD0000] absolute ">{formErrors.amount}</div> */}
                    </div>
                    <div className="">
                        <div className="text-[13px]">Email 1</div>
                        <input className="text-[11px] px-3 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="email1" onChange={handleChange} value={formValues.client_info.email1} />
                        {/* <div className="text-[8px] text-[#CD0000] absolute ">{formErrors.amount}</div> */}
                    </div>
                    <div className="">
                        <div className="text-[13px]">Local Contact 1 Name </div>
                        <input className="text-[11px] px-3 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="localcontact1name" onChange={handleChange} value={formValues.client_info.localcontact1name} />
                        {/* <div className="text-[8px] text-[#CD0000] absolute ">{formErrors.amount}</div> */}
                    </div>
                    <div className="">
                        <div className="text-[13px]">Local Contact 2 Name </div>
                        <input className="text-[11px] px-3 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="localcontact2name" onChange={handleChange} value={formValues.client_info.localcontact2name} />
                        {/* <div className="text-[8px] text-[#CD0000] absolute ">{formErrors.amount}</div> */}
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
                        {/* <div className="text-[8px] text-[#CD0000] absolute ">{formErrors.modeofpayment}</div> */}
                    </div>
                </div>
                <div className="space-y-3 py-2">
                    <div className="">
                        <div className="text-[13px]">First Name <label className="text-red-500">*</label></div>
                        <input className="text-[11px] px-3 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="firstname" onChange={handleChange} value={formValues.client_info.firstname} />
                        <div className="text-[8px] text-[#CD0000] absolute ">{formErrors.firstname}</div>
                    </div>
                    <div className="">
                        <div className="text-[13px]">Country <label className="text-red-500">*</label></div>
                        <select className="text-[11px] px-3 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" name="country" onChange={
                            (e) => {
                                const temp = {...formValues}
                                const exis = temp.client_info
                                exis.country = e.target.value
                                exis.state = null 
                                exis.city = null
                                temp.client_info = exis 
                                setFormValues(temp)
                                
                                setAllState([])
                                fetchStateData(e.target.value)
                                setAllCity([]);
                            }
                        }
                            value={formValues.client_info.country}
                        >
                            <option value={null} hidden> Select Country</option>
                            {allCountry && allCountry.map(item => {
                                if (item.id == formValues.client_info.country) {
                                    return <option key={item.id} value={item.id} selected>
                                        {item.name}
                                    </option>
                                } else {
                                    return <option key={item.id} value={item.id} >
                                        {item.name}
                                    </option>
                                }

                            })}
                        </select>
                        <div className="text-[8px] text-[#CD0000] absolute ">{formErrors.country}</div>
                    </div>
                    <div className="">
                        <div className="text-[13px]">Address Line 2 </div>
                        <input className="text-[11px] px-3 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="addressline2" onChange={handleChange} value={formValues.client_info.addressline2} />
                        {/* <div className="text-[8px] text-[#CD0000] absolute ">{formErrors.amount}</div> */}
                    </div>
                    <div className="">
                        <div className="text-[13px]">Email 2 </div>
                        <input className="text-[11px] px-3 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="email2" onChange={handleChange} value={formValues.client_info.email2} />
                        {/* <div className="text-[8px] text-[#CD0000] absolute ">{formErrors.amount}</div> */}
                    </div>
                    <div className="">
                        <div className="text-[13px]">Local Contact 1 Details </div>
                        <input className="text-[11px] px-3 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="localcontact1details" onChange={handleChange} value={formValues.client_info.localcontact1details} />
                        {/* <div className="text-[8px] text-[#CD0000] absolute ">{formErrors.amount}</div> */}
                    </div>
                    <div className="">
                        <div className="text-[13px]">Local Contact 2 Details </div>
                        <input className="text-[11px] px-3 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="localcontact2details" onChange={handleChange} value={formValues.client_info.localcontact2details} />
                        {/* <div className="text-[8px] text-[#CD0000] absolute ">{formErrors.amount}</div> */}
                    </div>
                    <div className="">
                        <div className="text-[13px]">Comments </div>
                        <input className="text-[11px] px-3 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="comments" onChange={handleChange} value={formValues.client_info.comments} />
                        {/* <div className="text-[8px] text-[#CD0000] absolute ">{formErrors.amount}</div> */}
                    </div>
                </div>
                <div className="space-y-3 py-2">
                    <div className="">
                        <div className="text-[12px]">Middle Name </div>
                        <input className="text-[11px] px-3 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="middlename" onChange={handleChange} value={formValues.client_info.middlename} />
                        <div className='text-[8px] text-[#CD0000] absolute '>
                            {formErrors.middlename}
                        </div>
                        {/* <div className="text-[8px] text-[#CD0000] absolute ">{formErrors.amount}</div> */}
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
                            <option value="" hidden>Select State</option>
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
                        <div className="text-[8px] text-[#CD0000] absolute ">{formErrors.state}</div>
                    </div>
                    <div className="">
                        <div className="text-[13px]">Pin Code </div>
                        <input className="text-[11px] px-3 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="zip" onChange={handleChange} value={formValues.client_info.zip} />
                        {/* <div className="text-[8px] text-[#CD0000] absolute ">{formErrors.amount}</div> */}
                    </div>
                    <div className="">
                        <div className="text-[13px]">Mobile Phone </div>
                        <input className="text-[11px] px-3 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="mobilephone" onChange={handleChange} value={formValues.client_info.mobilephone} />
                        {/* <div className="text-[8px] text-[#CD0000] absolute ">{formErrors.amount}</div> */}
                    </div>
                    <div className="">
                        <div className="text-[13px]">Local Contact 1 Address </div>
                        <input className="text-[11px] px-3 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="localcontact1address" onChange={handleChange} value={formValues.client_info.localcontact1address} />
                        {/* <div className="text-[8px] text-[#CD0000] absolute ">{formErrors.amount}</div> */}
                    </div>
                    <div className="">
                        <div className="text-[13px]">Local Contact 2 Address </div>
                        <input className="text-[10px] px-3 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="localcontact2address" onChange={handleChange} value={formValues.client_info.localcontact2address} />
                        {/* <div className="text-[8px] text-[#CD0000] absolute ">{formErrors.amount}</div> */}
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
                                                    // lineHeight: '0.8',
                                                    height: '20px',
                                                    width: 230,
                                                    fontSize: 12,
                                                    // padding: '1px'
                                                    borderRadius : '2px'
                                                }),
                                                indicatorSeparator: (provided, state) => ({
                                                  display : 'none'
                                                }),
                                                dropdownIndicator: (provided, state) => ({
                                                    ...provided,
                                                    padding: '1px',
                                                    paddingRight : '2px', // Adjust padding for the dropdown indicator
                                                    width: 15, // Adjust width to make it smaller
                                                    height: 15, // Adjust height to make it smaller
                                                    display: 'flex', // Use flex to center the icon
                                                    alignItems: 'center', // Center vertically
                                                    justifyContent: 'center'
                                                     // adjust padding for the dropdown indicator
                                                }),
                                                input: (provided, state) => ({
                                                    ...provided,
                                                    margin: 0, // Remove any default margin
                                                    padding: 0, // Remove any default padding
                                                    fontSize: 12, // Match the font size
                                                    height: 'auto', // Adjust input height
                                                  }),
                                                // options: (provided, state) => ({
                                                //     ...provided,
                                                //     fontSize: 10// adjust padding for the dropdown indicator
                                                // }),
                                                option: (provided, state) => ({
                                                    ...provided,
                                                    padding: '2px 10px', // Adjust padding of individual options (top/bottom, left/right)
                                                    margin: 0, // Ensure no extra margin
                                                    fontSize: 12 // Adjust font size of individual options
                                                }),
                                                menu: (provided, state) => ({
                                                    ...provided,
                                                    width: 230, // Adjust the width of the dropdown menu
                                                    zIndex: 9999 // Ensure the menu appears above other elements
                                                }),
                                                menuList: (provided, state) => ({
                                                    ...provided,
                                                    padding: 0, // Adjust padding of the menu list
                                                    fontSize: 12,
                                                    maxHeight: 150 // Adjust font size of the menu list
                                                }),
                                                
                                            }}
                                        />
                        
                        {/* <div className="text-[8px] text-[#CD0000] absolute ">{formErrors.modeofpayment}</div> */}
                    </div>

                </div>
                <div className="space-y-3 py-2 mt-[5px]">
                <div className="">
                        <div className="text-[12px]">Last Name <label className="text-red-500">*</label></div>
                        <input className="text-[11px] px-3 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="lastname" onChange={handleChange} value={formValues.client_info.lastname} />
                        <div className="text-[8px] text-[#CD0000] absolute ">{formErrors.lastname}</div>
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
                            <option value="" hidden>Select City</option>
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
                        <div className="text-[8px] text-[#CD0000] absolute ">{formErrors.city}</div>
                    </div>
                    <div className="">
                        <div className="text-[13px]">Area/Locality </div>
                        <input className="text-[11px] px-3 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="suburb" value={formValues.client_info.suburb} onChange={handleChange}/>
                        {/* <div className="text-[8px] text-[#CD0000] absolute ">{formErrors.amount}</div> */}
                    </div>
                    <div className="">
                        <div className="text-[13px]">Home Phone </div>
                        <input className="text-[11px] px-3 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="homephone" onChange={handleChange} value={formValues.client_info.homephone} />
                        {/* <div className="text-[8px] text-[#CD0000] absolute ">{formErrors.amount}</div> */}
                    </div>
                    <div className="">
                        <div className="text-[13px]">Work Phone </div>
                        <input className="text-[11px] px-3 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="workphone" onChange={handleChange} value={formValues.client_info.workphone} />
                        {/* <div className="text-[8px] text-[#CD0000] absolute ">{formErrors.amount}</div> */}
                    </div>
                    <div className="">
                        <div className="text-[13px]">Employer Name </div>
                        
                            <input className="text-[11px] px-3 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="employername" onChange={handleChange} value={formValues.client_info.employername} />
                        {/* <div className="text-[8px] text-[#CD0000] absolute ">{formErrors.modeofpayment}</div> */}
                    </div>
                    
                    <div className="">
                        {}
                        <div className="text-[13px]">Tenant Of Property</div>
                        {/* <select className="text-[11px] px-3 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" value={formValues.client_info.tenantofproperty} name="city" onChange={(e) => {
                            setFormValues({
                                ...formValues, client_info: {
                                    ...formValues.client_info,
                                    tenantofproperty: e.target.value
                                }
                            })
                        }}>
                            
                            <option value="none" hidden> Select Tenant Of Property</option>
                            {tenantOfProperty && tenantOfProperty.map(item => (
                                <option value={item.id}>
                                    {item.propertyname}
                                </option>
                            ))}
                        </select> */}
                        <ClientPropertySelectNative
                        data={Object.keys(tenantOfProperty)}
                        value={tenantOfProperty?.[formValues.client_info.tenantofproperty]?.propertyname ? tenantOfProperty?.[formValues.client_info.tenantofproperty]?.propertyname:null}
                        placeholder="Select Client Property"
                        isSticky={true}
                        headerText={{
                            first : 'Property',
                            second : 'Builder'
                        }}
                        renderData={(item) => {
                            return (
                              <MenuItem value={item} key={item} sx={{ width : '230px', gap : '5px', fontSize : '12px'}}>
                                <p className="w-[50%] " style={{ overflowWrap: 'break-word', wordWrap: 'break-word', whiteSpace: 'normal', margin: 0 }}>
                                   {tenantOfProperty[item].propertyname}
                                </p>
                                <p className='w-[50%]' style={{ overflowWrap: 'break-word', wordWrap: 'break-word', whiteSpace: 'normal', margin: 0 }}>
                                  {tenantOfProperty[item].buildername}
                                </p>
                                
                               
                              </MenuItem>
                            );
                          }}
                          onChange={(e) => {
                            setFormValues({
                                ...formValues, client_info: {
                                    ...formValues.client_info,
                                    tenantofproperty: e.target.value
                                }
                            })
                           }}
                        />
                        {/* <PropertyDropDown options={tenantOfProperty} orderText={orderText} setOrderText={setOrderText} leftLabel="Builder Name" rightLabel="Property" leftAttr="buildername" rightAttr="propertyname" toSelect="propertyname" handleChange={(e) => {
                            setFormValues({
                                ...formValues, client_info: {
                                    ...formValues.client_info,
                                    tenantofproperty: e.target.value
                                }
                            })
                        }} formValueName="tenantofproperty" value={formValues.client_info.tenantofproperty}  /> */}
                        {/* <select className="text-[10px] px-3 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" name="tenentof" value={formValues.client_info.tenantofproperty} onChange={
                            (e) => {
                                setFormValues({
                                    ...formValues, client_info: {
                                        ...formValues.client_info,
                                        tenantofproperty: e.target.value
                                    }
                                })
                            }
                        }>
                            <option value={null}>Select tenant of </option>
                            {tenantOfProperty && tenantOfProperty.map(item => {
                               return <option value={item.id}>
                                     {item.propertyname}
                               </option>
                             })}
                        </select> */}
                        {/* <div className="text-[8px] text-[#CD0000] absolute ">{formErrors.modeofpayment}</div> */}
                    </div>
                    
                </div>
            </div>
            
        </div>
    )
}

export default EditClientInformation