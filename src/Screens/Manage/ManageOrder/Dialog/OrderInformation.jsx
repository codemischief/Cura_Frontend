import React from 'react';
import { useState } from 'react';
import AsyncSelect from "react-select/async"
import { APIService } from '../../../../services/API';
import PropertyDropDown from '../../../../Components/Dropdown/PropertyDropDown';
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
    const getClientPropertyByClientId = async (id) => {
        const data = {
            "client_id": id
        }
        const response = await APIService.getClientPropertyByClientId({...data,user_id : user.id})
        const res = await response.json()
        setPropertyData((prev) => res.data)

    }
    // client name field
    const [options, setOptions] = useState([]);
    const fetchClientData = async () => {
        const data = {
        }
        const response = await APIService.getClientAdmin({...data,user_id : user.id})
        const res = await response.json();
        console.log(res.data)
        setOptions(res.data.map(x => ({
            value: x[0],
            label: x[1]
        })))
    }
    console.log(formValues.order_info.clientid)
    const [selectedOption, setSelectedOption] = useState({
        label: formValues.order_info.clientname ?? 'Select Client',
        value: formValues.order_info.clientid
    });
    const [query, setQuery] = useState('')
    const handleClientNameChange = (e) => {
        console.log('hey')
        console.log(e)
        const existing = { ...formValues }
        const temp = existing.order_info
        temp.clientid = e.value
        temp.clientname = e.label
        getClientPropertyByClientId(e.value)
        existing.order_info = temp;
        setFormValues(existing)
        console.log(formValues)
        setSelectedOption(e)
    }
    const loadOptions = async (e) => {
        console.log(e)
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
                            <div className="text-[13px]">Assigned to <label className="text-red-500">*</label></div>
                            <select className="w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" name="owner" value={formValues.order_info.owner} onChange={handleChange} >
                                <option value={null}>Select User</option>
                                {usersData.map(item => (
                                    <option key={item.id} value={item.id}>
                                        {item.name}
                                    </option>
                                ))}

                            </select>
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
                            <select className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" name="clientpropertyid" value={formValues.order_info.clientpropertyid} onChange={handleChange} >
                                <option value={null} hidden> Select Client Property</option>
                                {console.log(propertyData)}
                                {propertyData.map(item => (
                                    <option key={item.id} value={item.id}>
                                        {item.propertyname}
                                    </option>
                                ))}
                            </select>
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
                            {console.log(hyperlinkstate)}
                            {hyperlinkstate?.hyperlinked ?
                                                 <div className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs py-0.5 bg-[#F5F5F5]" type="text" name="curaoffice" >{formValues.order_info.clientname}</div> : 
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
