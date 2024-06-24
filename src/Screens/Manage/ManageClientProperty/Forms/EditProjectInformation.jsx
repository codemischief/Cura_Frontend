import React, { useState, useEffect } from "react";
import Checkbox from '@mui/material/Checkbox';
import AsyncSelect from "react-select/async"
import DropDown from "../../../../Components/Dropdown/Dropdown";
import { MenuItem } from "@mui/material";
import useAuth from "../../../../context/JwtContext";
import { APIService } from "../../../../services/API";
import ClientPropertySelectNative from "../../../../Components/common/select/ClientPropertySelectNative";
const EditProjectInformation = ({ clientData, initialSociety, initialStates, initialCities, formValues, setFormValues, propertyType, levelOfFurnishing, propertyStatus, clientNameOption, formErrors }) => {
  // 
  const {user} = useAuth()
  
  
  
  // const [propertyType, setPropertyType] = useState([]);
  // const [levelOfFurnishing, setLevelOfFurnishing] = useState([]);
  const [state, setState] = useState(initialStates);
  const [city, setCity] = useState(initialCities);
  const [society, setSociety] = useState([]);
  const [status, setStatus] = useState([]);
  const [electricity, setElectricity] = useState([]);
  const [existingSociety, setExistingSociety] = useState(initialSociety);
  const [clientName, setClientName] = useState(clientData);
  
  const dueDate = [];
  for (var i = 1; i <= 31; i++) {
    dueDate.push({
      id: i - 1,
      date: i
    })
  }
  const fetchCityData = async (id) => {
    const data = { "user_id": user.id, "state_name": id };
    const response = await APIService.getCities(data);
    const result = (await response.json()).data;
    
    
    if (Array.isArray(result)) {
        setCity(result)
        
    }
  }
  const handleChange = (e) => {
    

    const { name, value } = e.target;
    
    setFormValues({
      ...formValues, client_property: {
        ...formValues.client_property,
        [name]: value
      }
    })
  }
  const [selectedOption, setSelectedOption] = useState(clientNameOption);
  const [query, setQuery] = useState('')
  const handleClientNameChange = (e) => {
    setSelectedOption(e)

    
    
    const existing = {...formValues}
    const temp = existing.client_property
    temp.clientid = e.value
    existing.client_property = temp
    setFormValues(existing)
  }
  const loadOptions = async (e) => {
    
    if (e.length < 3) return;
    const data = {
      "user_id": user.id,
      "pg_no": 0,
      "pg_size": 0,
      "search_key": e
    }
    const response = await APIService.getClientAdminPaginated(data)
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
  useEffect(() => {
     fetchCityData(formValues.client_property.state)
  },[])
  return (
    <div className="h-auto w-full">
      <div className="flex gap-10 justify-center mt-3">
        <div className=" space-y-2 ">
          <div className="">
            <div className="text-[13px]">
              Client Name <label className="text-red-500">*</label>
            </div>
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
            {/* <select
              className="text-[12px] pl-4 w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm"
              name="clientid"
              value={formValues.client_property.clientid}
              onChange={handleChange}
            >
              <option>Select Client Name </option>
              {clientData &&
                clientData.map((item) => (
                  <option key={item[0]} value={item[0]}>
                    {item[1]}
                  </option>
                ))} 
           </select>  */}
            <div className="text-[10px] text-[#CD0000] ">{formErrors.clientid}</div>
          </div>
          <div className="">
            <div className="text-[13px]">
              Level of Furnishing <label className="text-red-500">*</label>
            </div>
            <select
              className="text-[12px] pl-4 w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm"
              name="leveloffurnishing"
              onChange={handleChange}
              value={formValues.client_property.leveloffurnishing}
            >
              <option value="" hidden>Select Level of Furnishing</option>
              {levelOfFurnishing &&
                levelOfFurnishing.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
            </select>
            <div className="text-[10px] text-[#CD0000] ">{formErrors.leveloffurnishing}</div>
          </div>
          <div className="">
            <div className="text-[13px]">
              State <label className="text-red-500">*</label>
            </div>
            <select
              className="text-[12px] pl-4 w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm"
              name="state"
              value={formValues.client_property.state}
              onChange={(e) => {
                // handleChange(e) 
                fetchCityData(e.target.value)
                const temp = {...formValues}
                const ex = temp.client_property
                ex.city = null
                ex.state = e.target.value
                temp.client_property = ex 
                setFormValues(temp)
              }}
            >
              {/* <option>Select State</option> */}
              {initialStates &&
                initialStates.map((item) => (
                  <option key={item[0]} value={item[0]}>
                    {item[0]}
                  </option>
                ))}
            </select>
            <div className="text-[10px] text-[#CD0000] ">{formErrors.state}</div>
          </div>
           <div className="">
           <div className="text-[13px]">
              Initial Possession Date
            </div>
            <input
              className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm"
              type="date"
              name="initialpossessiondate"
              onChange={handleChange}
              value={formValues.client_property.initialpossessiondate}
            />
           </div>
           <div className="">
              <div className="text-[13px]">
                Number Of Parkings
              </div>
              <input
                className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm"
                type="number"
                name="numberofparkings"
                value={formValues.client_property.numberofparkings}
                onChange={handleChange}
              />
              {/* <div className="text-[10px] text-[#CD0000] ">{formErrors.amount}</div> */}
            </div>
            <div className="">
            <div className="text-[13px]">Property Tax Number </div>
            <input
              className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm"
              type="text"
              name="propertytaxnumber"
              onChange={handleChange}
              value={formValues.client_property.propertytaxnumber}
            />
            {/* <div className="text-[10px] text-[#CD0000] ">{formErrors.amount}</div> */}
          </div>
            
            {/* <div className="text-[10px] text-[#CD0000] ">{formErrors.amount}</div> */}
          
          
          







        </div>
        <div className="space-y-2">
          <div className="">
            <div className="text-[13px]">
              Society/Project Name <label className="text-red-500">*</label>
            </div>
            {/* <select
              className="text-[12px]  w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm"
              name="projectid"
              onChange={handleChange}
              value={formValues.client_property.projectid}
            >
              <option>Select Builder </option>
              {initialSociety &&
                initialSociety.map((item) => (
                  <option key={item.projectid} value={item.projectid} >
                       <p>{item.buildername}</p> 
                       &nbsp;
                       &nbsp;
                       &nbsp;
                       <p>{item.projectname}</p> 
                  </option>
                ))}
            </select> */}
            {/* {formValues.client_property.projectid} */}
            <ClientPropertySelectNative
                        data={Object.keys(existingSociety)}
                        value={existingSociety?.[formValues.client_property.projectid]?.projectname ? existingSociety?.[formValues.client_property.projectid]?.projectname:null}
                        placeholder="Select Project"
                        isSticky={true}
                        menuMaxHeight="20rem"
                        headerText={{
                            first : 'Property',
                            second : 'Builder'
                        }}
                        renderData={(item) => {
                            return (
                              <MenuItem value={item} key={item} sx={{ width : '230px', gap : '5px', fontSize : '12px'}}>
                                <p className="w-[50%] " style={{ overflowWrap: 'break-word', wordWrap: 'break-word', whiteSpace: 'normal', margin: 0 }}>
                                   {existingSociety[item].projectname}
                                </p>
                                <p className='w-[50%]' style={{ overflowWrap: 'break-word', wordWrap: 'break-word', whiteSpace: 'normal', margin: 0 }}>
                                  {existingSociety[item].buildername}
                                </p>
                                
                               
                              </MenuItem>
                            );
                          }}
                          onChange={(e) => {
                            setFormValues({
                                ...formValues, client_property: {
                                    ...formValues.client_property,
                                    projectid: e.target.value
                                }
                            })
                           }}
                        />
            {/* <DropDown options={initialSociety} initialValue="Select Project" leftLabel="Builder Name" rightLabel="Project" leftAttr="buildername" rightAttr="projectname" toSelect="projectname" handleChange={handleChange} formValueName="projectid" value={formValues.client_property.projectid} idName="projectid" /> */}
            <div className="text-[10px] text-[#CD0000] ">{formErrors.projectid}</div>
          </div>
          <div className="">
            <div className="text-[13px]">Property Description <label className="text-red-500">*</label></div>
            <input
              className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm"
              type="text"
              name="propertydescription"
              value={formValues.client_property.propertydescription}
              onChange={handleChange}
            />
            <div className="text-[10px] text-[#CD0000] ">{formErrors.propertydescription}</div>
          </div>
          <div className="">
            <div className="text-[13px]">
              City <label className="text-red-500">*</label>
            </div>
            <select
              className="text-[12px] pl-4 w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm"
              name="city"
              onChange={handleChange}
              value={formValues.client_property.city}
            >
              <option value="" hidden>Select City</option>
              {city &&
                city.map((item) => (
                  <option key={item.id} value={item.city}>
                    {item.city}
                  </option>
                ))}
            </select>
            <div className="text-[10px] text-[#CD0000] ">{formErrors.city}</div>
          </div>
          <div className="space-y-2">
          <div className="">
            <div className="text-[13px]">Electricity Consumer Number </div>
            <input
              className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm"
              type="text"
              name="electricityconsumernumber"
              value={formValues.client_property.electricityconsumernumber}
              onChange={handleChange}
            />
            {/* <div className="text-[10px] text-[#CD0000] ">{formErrors.amount}</div> */}
          </div>
          <div className="">
              <div className="text-[13px]">Electricity Billing Unit </div>
              <input
                className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm"
                type="text"
                name="electricitybillingunit"
                value={formValues.client_property.electricitybillingunit}
                onChange={handleChange}
              />
              {/* <div className="text-[10px] text-[#CD0000] ">{formErrors.amount}</div> */}
            </div>
            <div className="">
            <div className="text-[13px]">Other Electricity Details </div>
            <input
              className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm"
              type="text"
              name="otherelectricitydetails"
              value={formValues.client_property.otherelectricitydetails}
              onChange={handleChange}
            />
            {/* <div className="text-[10px] text-[#CD0000] ">{formErrors.amount}</div> */}
          </div>
            
            
           

          </div>






        </div>
        <div className="space-y-2">
          <div className="">
            <div className="text-[13px]">
              Property type <label className="text-red-500">*</label>
            </div>
            <select
              className="text-[12px] pl-4 w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm"
              name="propertytype"
              onChange={handleChange}
              value={formValues.client_property.propertytype}
            >
              <option value="" hidden>Select Property Type </option>
              {propertyType &&
                propertyType.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
            </select>
            <div className="text-[10px] text-[#CD0000] ">{formErrors.propertytype}</div>
          </div>

          <div className="">
            <div className="text-[13px]">Property Manager </div>
            <input
              className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm"
              type="text"
              name="propertymanager"
              value={formValues.client_property.propertymanager}
              onChange={handleChange}

            />
            {/* <div className="text-[10px] text-[#CD0000] ">{formErrors.amount}</div> */}
          </div>
          <div className="">
            <div className="text-[13px]">Suburb <label className="text-red-500">*</label></div>
            <input
              className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm"
              type="text"
              name="suburb"
              value={formValues.client_property.suburb}
              onChange={handleChange}
            />
            <div className="text-[10px] text-[#CD0000] ">{formErrors.suburb}</div>
          </div>
          <div className="">
              <div className="text-[13px]">Gas Connection Details </div>
              <input
                className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm"
                type="text"
                name="gasconnectiondetails"
                value={formValues.client_property.gasconnectiondetails}
                onChange={handleChange}
              />
              {/* <div className="text-[10px] text-[#CD0000] ">{formErrors.amount}</div> */}
            </div>

          <div className="">
            <div className="text-[13px]">Layout Details (Sch A)</div>
            <input
              className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm"
              type="text"
              name="layoutdetails"
              value={formValues.client_property.layoutdetails}
              onChange={handleChange}
            />
            {/* <div className="text-[10px] text-[#CD0000] ">{formErrors.amount}</div> */}
          </div>
          <div className="">
            <div className="text-[13px]">Comments </div>
            <input
              className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm"
              type="text"
              name="comments"
              value={formValues.client_property.comments}
              onChange={handleChange}
            />
            {/* <div className="text-[10px] text-[#CD0000] ">{formErrors.amount}</div> */}
          </div>

        </div>
        <div className="space-y-2">
          <div className="">
            <div className="text-[13px]">Status <label className="text-red-500">*</label></div>
            <select
              className="text-[12px] pl-4 w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm"
              name="status"
              value={formValues.client_property.status}
              onChange={handleChange}
            >
              <option value="" hidden>Select Status </option>
              {propertyStatus &&
                propertyStatus.map((item) => (
                  <option key={item.id} value={item.id}>
                    {item.name}
                  </option>
                ))}
            </select>
            <div className="text-[10px] text-[#CD0000] ">{formErrors.status}</div>
          </div>
          <div className="">
            <div className="text-[13px]">Client Service Manager </div>
            <input
              className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm"
              type="text"
              name="clientservicemanager"
              value={formValues.client_property.clientservicemanager}
              onChange={handleChange}
            />
            {/* <div className="text-[10px] text-[#CD0000] ">{formErrors.amount}</div> */}
          </div>
          <div className="">
            <div className="text-[13px]">Electricity Bill Due Date</div>
            <select
              className="text-[12px] pl-4 w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm"
              name="electricitybillingduedate"
              value={formValues.client_property.electricitybillingduedate}
              onChange={handleChange}
            >
              <option value="" hidden>Select Date </option>
              {dueDate &&
                dueDate.map((item) => (
                  <option key={item.id} value={item.date}>
                    {item.date}
                  </option>
                ))}
            </select>
            <div className="text-[10px] text-[#CD0000] ">{formErrors.electricitybillingduedate}</div>
          </div>

          <div className="">
            <div className="text-[13px]">Detailed Address</div>
            <textarea
              className="text-[12px] pl-4 w-[230px] min-h-[50px] max-h-[50px] border-[1px] border-[#C6C6C6] rounded-sm"
              type="text"
              name="textforposting"
              value={formValues.client_property.textforposting}
              onChange={handleChange}
            />
            {/* <div className="text-[10px] text-[#CD0000] ">{formErrors.amount}</div> */}
          </div>
          <div className="">
            <div className="text-[13px]">Internal Furniture and fittings (Sch B) </div>
            <textarea
              className="text-[12px] pl-4 w-[230px] max-h-[77px] min-h-[77px] border-[1px] border-[#C6C6C6] rounded-sm"
              type="text"
              name="internalfurnitureandfittings"
              onChange={handleChange}
              value={formValues.client_property.internalfurnitureandfittings}
            />
            {/* <div className="text-[10px] text-[#CD0000] ">{formErrors.amount}</div> */}
          </div>


        </div>
      </div>
      <div className="mt-2 flex justify-center items-center gap-2">
        <div className="flex justify-center items-center text-[13px] font-semibold"><input
          type="checkbox"
          checked={formValues.client_property.propertyownedbyclientonly}
          className='mr-3 h-4 w-4'
          onClick={(e) => {
            // 
            const existing = { ...formValues };
            const temp = { ...existing.client_property };
            temp.propertyownedbyclientonly = !temp.propertyownedbyclientonly
            existing.client_property = temp;
            setFormValues(existing)
            // existing.status = !existing.status;
            // setFormValues(existing)
          }}
        />
          Property Owned By Client Only</div>
        <div className="flex justify-center items-center text-[13px] font-semibold">
          <input
            type="checkbox"
            checked={formValues.client_property.indexiicollected}
            className='mr-3 h-4 w-4'
            onClick={(e) => {

              const existing = { ...formValues };
              const temp = { ...existing.client_property };
              temp.indexiicollected = !temp.indexiicollected
              existing.client_property = temp;
              setFormValues(existing)
            }}
          />
          Index II Collected </div>
      </div>
    </div>
  );
};

export default EditProjectInformation;
