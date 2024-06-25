import React from 'react';
import { useState } from 'react';
import AsyncSelect from "react-select/async"
import { APIService } from '../../../../services/API';
import PropertyDropDown from '../../../../Components/Dropdown/PropertyDropDown';
import ClientPropertySelectNative from '../../../../Components/common/select/ClientPropertySelectNative';
import { MenuItem } from '@mui/material';
import useAuth from '../../../../context/JwtContext';
const orderInformation = ({ setIsStateDialogue, formValues, setFormValues, usersData, orderStatusData, serviceData, vendorData, tallyLedgerData, formErrors , hyperlinkstate, orderText,setOrderText, propertyData, setPropertyData}) => {
    const {user} = useAuth()
    const handleClose = () => {
        setIsStateDialogue(false);
    }
    // const [clientPropertyData, setClientPropertyData] = useState(propertyData);
    const selectedClient = [
        "client 1", "client 2", "client 3"
    ];
    const selectedTallyLedger = [
        "1", "2", "3", "4"
    ];
    const selectedVendors = [
        "1", "2", "3", "4"
    ];
    const selectedAssignedTo = [
        "1", "2", "3", "4"
    ];
    const selectedClientProperty = [
        "1", "2", "3", "4"
    ];
    const selectedStatus = [
        "1", "2", "3", "4"
    ];
    const selectedService = [
        "1", "2", "3", "4"
    ];
    // hardcoded for dropdown instances ********* End*************

    //Validation of the form
    const initialValues = {
        assignedTo: "",
        status: "",
        clientName: "",
        orderDescription: "",
    };
    // const [formValues, setFormValues] = useState(initialValues);
    // const [formErrors, setFormErrors] = useState({});

    // handle changes in input form
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues, order_info: {
                ...formValues.order_info,
                [name]: value
            }
        })
    };

    //   const handleSubmit = (e) => {
    //       e.preventDefault();
    //       setFormErrors(validate(formValues)); // validate form and set error message
    //       setIsSubmit(true);
    //     };
    // validate form and to throw Error message
    //   const validate = (values) => {
    //       const errors = {};
    //       if (!values.assignedTo) {
    //       errors.assignedTo = "select a name";
    //       }
    //       if (!values.status) {
    //       errors.status = "Select your status";
    //       }
    //       if (!values.clientName) {
    //       errors.clientName = "Select Client Name";
    //       }
    //       if (!values.orderDescription) {
    //           errors.orderDescription = "Enter Order Description";
    //       }
    //       return errors;
    //   };
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
    const getClientPropertyByClientId = async (id) => {
        const data = {
            "client_id": id
        }
        const response = await APIService.getClientPropertyByClientId({...data,user_id : user.id})
        const res = await response.json()
        setPropertyData(convertToIdNameObject(res.data))
        

    }
    // client name field
    const [options, setOptions] = useState([]);
    
    
    const [selectedOption, setSelectedOption] = useState({
        label: formValues.order_info.clientname ?? 'Select Client',
        value: formValues.order_info.clientid
    });
    const [query, setQuery] = useState('')
    const handleClientNameChange = (e) => {
        
        
        const existing = { ...formValues }
        const temp = existing.order_info
        temp.clientid = e.value
        temp.clientname = e.label
        getClientPropertyByClientId(e.value)
        existing.order_info = temp;
        setFormValues(existing)
        
        setSelectedOption(e)
    }
    const loadOptions = async (e) => {
        
        if (e.length < 3) return;
        const data = {
            "user_id": user.id,
            "pg_no": 0,
            "pg_size": 0,
            "search_key": e
        }
        const response = await APIService.getClientAdminPaginated({...data,user_id : user.id})
        const res = await response.json()
        const results = res.data.map(e => {
            return {
                label: e[1],
                value: e[0]
            }
        })
        if (results === 'No Result Found') {
            return []
        }
        return results
    }


    return (

        <div >
            <div className="h-auto w-full">
                <div className="flex gap-[48px] justify-center">
                    <div className=" space-y-[12px] py-[20px] px-[10px]">
                        <div className="">
                            <div className="text-[13px]">Cura Office</div>
                            <input className="bg-[#F5F5F5] w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" value={"Pune"} name="Cura Office" readOnly />
                        </div>
                        <div className="">
                            <div className="text-[13px]">Entity</div>
                            <input className="bg-[#F5F5F5] w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" value={"Cura"} name="Entity" readOnly />
                        </div>
                        <div className="">
                            {}
                            <div className="text-[13px]">Assigned to <label className="text-red-500">*</label></div>
                            <ClientPropertySelectNative
                        data={Object.keys(usersData)}
                        value={usersData?.[formValues.order_info.owner]?.name ? usersData?.[formValues.order_info.owner]?.name:null}
                        placeholder="Select Payment To"
                        isSticky={true}
                        menuMaxHeight="18rem"
                        noDataText="Select Username"
                        headerText={{
                            first : 'Name',
                            second : 'Username'
                        }}
                        renderData={(item) => {
                            return (
                              <MenuItem value={item} key={item} sx={{ width : '230px', gap : '5px', fontSize : '12px'}}>
                                <p className="w-[50%] " style={{ overflowWrap: 'break-word', wordWrap: 'break-word', whiteSpace: 'normal', margin: 0 }}>
                                   {usersData[item].name}
                                </p>
                                <p className='w-[50%]' style={{ overflowWrap: 'break-word', wordWrap: 'break-word', whiteSpace: 'normal', margin: 0 }}>
                                  {usersData[item].username}
                                </p>
                                
                               
                              </MenuItem>
                            );
                          }}
                          onChange={(e) => {
                            const temp = {...formValues}
                            const ex = temp.order_info 
                            ex.owner = e.target.value 
                            temp.order_info = ex 
                            setFormValues(temp)
                            
                           }}
                        />




                            {/* <select className="w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" name="owner" value={formValues.order_info.owner} onChange={handleChange} >
                                <option value={null} hidden >Select User</option>
                                {usersData.map(item => (
                                    <option key={item.id} value={item.id}>
                                        {item.name}
                                    </option>
                                ))}

                            </select> */}
                            <div className="h-[12px] w-[230px] text-[9px] text-[#CD0000] ">
                                <p> {formErrors.owner}</p>
                                
                                </div>
                        </div>
                        <div className="">
                            <div className="text-[13px]">Status <label className="text-red-500">*</label></div>
                            <select className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" name="status" value={formValues.order_info.status} onChange={handleChange}>
                                <option value={null} hidden>Select Status</option>
                                {orderStatusData.map(item => (
                                    <option key={item[0]} value={item[0]}>
                                        {item[1]}
                                    </option>
                                ))}
                            </select>
                            <div className="h-[12px] w-[230px] text-[9px] text-[#CD0000] ">
                                <p>{formErrors.status}</p>
                                </div>
                        </div>
                        <div className="">
                            <div className="text-[13px]">Client Property</div>
                            {/* <select className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" name="clientpropertyid" value={formValues.order_info.clientpropertyid} onChange={handleChange} >
                                <option value={null} hidden> Select Client Property</option>
                                {}
                                {propertyData.map(item => (
                                    <option key={item.id} value={item.id}>
                                        {item.propertyname}
                                    </option>
                                ))}
                            </select> */}
                            <ClientPropertySelectNative
                        data={Object.keys(propertyData)}
                        value={propertyData?.[formValues.order_info.clientpropertyid]?.propertyname ? propertyData?.[formValues.order_info.clientpropertyid]?.propertyname:null}
                        placeholder="Select Client Property"
                        isSticky={true}
                        menuMaxHeight='14rem'
                        headerText={{
                            first : 'Property',
                            second : 'Builder'
                        }}
                        renderData={(item) => {
                            return (
                              <MenuItem value={item} key={item} sx={{ width : '230px', gap : '5px', fontSize : '12px'}}>
                                <p className="w-[50%] " style={{ overflowWrap: 'break-word', wordWrap: 'break-word', whiteSpace: 'normal', margin: 0 }}>
                                   {propertyData[item].propertyname}
                                </p>
                                <p className='w-[50%]' style={{ overflowWrap: 'break-word', wordWrap: 'break-word', whiteSpace: 'normal', margin: 0 }}>
                                  {propertyData[item].buildername}
                                </p>
                                
                               
                              </MenuItem>
                            );
                          }}
                          onChange={(e) => {
                            setFormValues({
                                ...formValues, order_info: {
                                    ...formValues.order_info,
                                    clientpropertyid: e.target.value
                                }
                            })
                           }}
                        />
                            {/* <PropertyDropDown options={propertyData} orderText={orderText} setOrderText={setOrderText} leftLabel="Builder Name" rightLabel="Property" leftAttr="buildername" rightAttr="propertyname" toSelect="propertyname" handleChange={(e) => {
                            handleChange(e)
                        }} formValueName="clientpropertyid" value={formValues.order_info.clientpropertyid}  /> */}
                            {/* <select className="w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" value={formValues.order_info.clientpropertyid} onChange={handleChange} name="clientpropertyid" >
                                <option value={null}>Select Client Property</option>
                                {clientPropertyData.map(item => (
                                    <option key={item.id} value={item.id}>
                                        {item.propertyname}
                                    </option>
                                ))}
                            </select> */}
                        </div>
                        <div className="">
                            <div className="text-[13px]">Service <label className="text-red-500">*</label></div>
                            <select className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" name="service" value={formValues.order_info.service} onChange={handleChange} >
                                <option value={null} hidden> Select Service</option>
                                {serviceData.map(item => (
                                    <option key={item[0]} value={item[0]}>
                                        {item[1]}
                                    </option>
                                ))}
                            </select>
                            <div className="h-[12px] text-[9px] w-[230px] text-[#CD0000] ">
                                <p>
                                {formErrors.service}
                                </p>
                                </div>
                        </div>
                    </div>
                    <div className=" space-y-[12px] py-[20px] px-[10px]">
                        <div className="">
                            <div className="text-[13px]">Client Name<label className="text-red-500">*</label></div>
                            {}
                            {hyperlinkstate?.hyperlinked ?
                                                 <div className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs py-0.5 bg-[#F5F5F5]" type="text" name="curaoffice" >{hyperlinkstate.clientname}</div> : 
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
                            />}
                            <div className="h-[12px] w-[230px] text-[9px] text-[#CD0000] ">
                                
                                <p>
                                {formErrors.clientid}
                                    </p></div>
                        </div>
                        <div className="">
                            <div className="text-[13px]">Order Date</div>
                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="date" name="orderdate" value={formValues.order_info.orderdate} onChange={handleChange} />
                        </div>
                        <div className="">
                            <div className="text-[13px]">Start Date</div>
                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="date" name="earlieststartdate" value={formValues.order_info.earlieststartdate} onChange={handleChange} />
                        </div>
                        <div className="">
                            <div className="text-[13px]">Expected Completion Date</div>
                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="date" name="expectedcompletiondate" value={formValues.order_info.expectedcompletiondate} onChange={handleChange} />

                        </div>
                        <div className="">
                            <div className="text-[13px]">Actual Completion Date</div>
                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="date" name="actualcompletiondate" value={formValues.order_info.actualcompletiondate} onChange={handleChange} />
                        </div>
                        <div className="">
                            <div className="text-[13px]">Vendor</div>
                            <select className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" name="vendorid" value={formValues.order_info.vendorid} onChange={handleChange} >
                                <option value={null} hidden> Select Vendor</option>
                                {vendorData.map(item => (
                                    <option key={item[0]} value={item[0]}>
                                        {item[1]}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className=" space-y-[12px] py-[20px] px-[10px]">
                        <div className="">
                            <div className="text-[13px]">Tally Ledger</div>
                            <select className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" name="tallyledgerid" value={formValues.order_info.tallyledgerid} onChange={handleChange} >
                                <option value={null} hidden> Select Tally Ledger</option>
                                {tallyLedgerData.map(item => (
                                    <option key={item[0]} value={item[0]}>
                                        {item[1]}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="">
                            <div className="text-[13px] mt-6">Order Description <label className="text-red-500">*</label></div>
                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="text" name="briefdescription" value={formValues.order_info.briefdescription} onChange={handleChange} />
                            <div className=" h-[12px] w-[230px] text-[9px] text-[#CD0000] ">
                                <p>{formErrors.briefdescription}</p>
                                </div>
                        </div>
                        <div className="">
                            <div className="text-[13px]">Comments</div>
                            <textarea className="w-[230px] h-[75px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px] max-h-[90px] min-h-[90px]" type="text" value={formValues.order_info.comments} name="comments" onChange={handleChange} />
                        </div>
                        
                        <div className="">
                            <div className="text-[13px]">Additional Comments</div>
                            <textarea className="w-[230px] h-[75px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px] max-h-[90px] min-h-[90px]" type="text" value={formValues.order_info.additionalcomments} name="additionalcomments" onChange={handleChange} />
                        </div>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default orderInformation
