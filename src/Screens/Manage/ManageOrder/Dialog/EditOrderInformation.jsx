import React from 'react';
import { useState } from 'react';
import AsyncSelect from "react-select/async"
import { APIService } from '../../../../services/API';
const EditOrderInformation = ({setIsStateDialogue,formValues,setFormValues,usersData,orderStatusData, clientPropertyData, serviceData,vendorData, tallyLedgerData}) => {
    const handleClose = () => {
        setIsStateDialogue(false);
    }

    const selectedClient = [
        "client 1","client 2","client 3"
       ];
       const selectedTallyLedger=[
        "1","2","3","4"
       ];
       const selectedVendors=[
        "1","2","3","4"
       ];
       const selectedAssignedTo=[
        "1","2","3","4"
       ];
       const selectedClientProperty=[
        "1","2","3","4"
       ];
       const selectedStatus=[
        "1","2","3","4"
       ];
       const selectedService=[
        "1","2","3","4"
       ];
        // hardcoded for dropdown instances ********* End*************
    
        //Validation of the form
        const initialValues = {
          assignedTo:"",
          status:"",
          clientName:"",
          orderDescription:"",
        };
        // const [formValues, setFormValues] = useState(initialValues);
        const [formErrors, setFormErrors] = useState({});
        
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
         
          const handleSubmit = (e) => {
              e.preventDefault();
              setFormErrors(validate(formValues)); // validate form and set error message
              setIsSubmit(true);
            };
          // validate form and to throw Error message
          const validate = (values) => {
              const errors = {};
              if (!values.assignedTo) {
              errors.assignedTo = "select a name";
              }
              if (!values.status) {
              errors.status = "Select your status";
              }
              if (!values.clientName) {
              errors.clientName = "Select Client Name";
              }
              if (!values.orderDescription) {
                  errors.orderDescription = "Enter Order Description";
              }
              return errors;
          };
        


















          // client name field
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
          const [selectedOption,setSelectedOption] = useState({
            label : "Select Client",
            value : null
           });
           const [query,setQuery] = useState('')
           const handleClientNameChange = (e) => {
               console.log('hey')
               console.log(e)
               const existing = {...formValues}
               const temp = {...existing.order_info}
               temp.clientid = e.value
               existing.order_info = temp;
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
    <div>
      <form onSubmit={handleSubmit}>
                        <div className="h-auto w-full">
                            <div className="flex gap-[48px] justify-center items-center">
                                <div className=" space-y-[12px] py-[20px] px-[10px]">
                                    <div className="">
                                        <div className="text-[13px]">Cura office</div>
                                        <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" value={"Pune"} name="Cura Office" readOnly/>
                                    </div>
                                    <div className="">
                                        <div className="text-[13px]">Entity</div>
                                        <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" value={"Cura"}  name="Entity" readOnly />
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
                                        <div className="text-[10px] text-[#CD0000] ">{formErrors.assignedTo}</div>
                                    </div>
                                    <div className="">
                                        <div className="text-[13px]">Status <label className="text-red-500">*</label></div>
                                        <select className="w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" name="status" value={formValues.order_info.status} onChange={handleChange}>
                                        <option value={null}>Select Status</option>
                                        {orderStatusData.map(item => (
                                                    <option key={item[0]} value={item[0]}>
                                                        {item[1]}
                                                    </option>
                                                    ))}
                                        </select>
                                        <div className="text-[10px] text-[#CD0000] ">{formErrors.status}</div>
                                    </div>
                                    <div className="">
                                        <div className="text-[13px]">Client Property</div>
                                        <select className="w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" value={formValues.order_info.clientpropertyid} onChange={handleChange}name="clientpropertyid" >
                                            <option value={null}>Select Client Property</option>
                                            {clientPropertyData.map(item => (
                                                    <option key={item[0]} value={item[0]}>
                                                        {item[1]}
                                                    </option>
                                                    ))}
                                        </select>
                                    </div>
                                    <div className="">
                                        <div className="text-[13px]">Service</div>
                                        <select className="w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" name="service"  value={formValues.order_info.service} onChange={handleChange} >
                                        <option value={null}> Select Service</option>
                                            {serviceData.map(item => (
                                                    <option key={item[0]} value={item[0]}>
                                                        {item[1]}
                                                    </option>
                                                    ))}
                                        </select>
                                    </div>
                                </div>
                                <div className=" space-y-[12px] py-[20px] px-[10px]">
                                    <div className="">
                                        <div className="text-[13px]">Client Name<label className="text-red-500">*</label></div>
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
                                            <div className="text-[10px] text-[#CD0000] ">{formErrors.clientName}</div>
                                    </div>
                                    <div className="">
                                        <div className="text-[13px]">Order Date</div>
                                        <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="date" name="orderdate" value={formValues.order_info.orderdate} onChange={handleChange}/>  
                                    </div>
                                    <div className="">
                                        <div className="text-[13px]">Start Date</div>
                                        <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="date" name="earlieststartdate" value={formValues.order_info.earlieststartdate} onChange={handleChange} />
                                    </div>
                                    <div className="">
                                        <div className="text-[13px]">Expected Competition Date</div>
                                        <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="date" name="expectedcompletiondate" value={formValues.order_info.expectedcompletiondate} onChange={handleChange}/>
                                        
                                    </div>
                                    <div className="">
                                        <div className="text-[13px]">Actual Competition Date</div>
                                        <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="date" name="actualcompletiondate" value={formValues.order_info.actualcompletiondate} onChange={handleChange} />
                                    </div>
                                    <div className="">
                                        <div className="text-[13px]">Vendor</div>
                                            <select className="w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" name="vendorid" value={formValues.order_info.vendorid} onChange={handleChange} >
                                            <option value={null}> Select Vendor</option>
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
                                            <select className="w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" name="tallyledgerid" value={formValues.order_info.tallyledgerid} onChange={handleChange} >
                                                <option value={null}> Select Tally Ledger</option>
                                            {tallyLedgerData.map(item => (
                                                    <option key={item[0]} value={item[0]}>
                                                        {item[1]}
                                                    </option>
                                                    ))}
                                            </select>
                                    </div>
                                    <div className="">
                                        <div className="text-[13px]">Comments</div>
                                        <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="text" value={formValues.order_info.comments} name="comments" onChange={handleChange}/>  
                                    </div>
                                    <div className="">
                                        <div className="text-[13px]">Order Description <label className="text-red-500">*</label></div>
                                        <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="text" name="briefdescription" value={formValues.order_info.briefdescription} onChange={handleChange} />
                                        <div className="text-[12px] text-[#CD0000] ">{formErrors.orderDescription}</div>
                                    </div>
                                    <div className="">
                                        <div className="text-[13px]">Additional Comments</div>
                                        <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="text" value={formValues.order_info.additionalcomments} name="additionalcomments" onChange={handleChange} />
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        
                    </form>
    </div>
  )
}

export default EditOrderInformation
