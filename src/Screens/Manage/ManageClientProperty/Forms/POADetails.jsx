import React from 'react'
import { useState } from 'react';
import { APIService } from '../../../../services/API';
import useAuth from '../../../../context/JwtContext';
const POADetails = ({initialCountries,initialStates,initialCities,formValues,setFormValues}) => {
  const {user} = useAuth()
  {}
  const [country, setCountry] = useState(initialCountries);
  const [city, setCity] = useState(initialCities);
  const [state, setState] = useState(initialStates);
  const [relation, setRelation] = useState([]);
  const handleChange = (e) => {
    const {name,value} = e.target;
     setFormValues({...formValues,client_property_poa : {
         ...formValues.client_property_poa,
         [name] : value
     }})
   }
   const fetchStateData = async (id) => {
    
    const data = { "user_id": user.id, "country_id": id };
    // const data = {"user_id":user.id,"rows":["id","state"],"filters":[],"sort_by":[],"order":"asc","pg_no":0,"pg_size":0};
    const response = await APIService.getState(data);
    const result = (await response.json())
    
    
    if (Array.isArray(result.data)) {
        setState(result.data)
    }
}
const fetchCityData = async (id) => {
  const data = { "user_id": user.id, "state_name": id };
  const response = await APIService.getCities(data);
  const result = (await response.json()).data;
  
  if (Array.isArray(result)) {
      setCity(result)
      
  }
}
  return (
    <div className="h-auto w-full">
      <div className="flex gap-10 justify-center mt-3 mb-5">
        <div className=" space-y-2 ">
          <div className="">
            <div className="text-[13px]"> Full Legal Name </div>
            <input className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="poalegalname" value={formValues.client_property_poa.poalegalname} onChange={handleChange} />
            {/* <div className="text-[10px] text-[#CD0000] ">{formErrors.amount}</div> */}
          </div>
          <div className="">
            <div className="text-[13px]">Address Line 1 </div>
            <input className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="poaaddressline1" value={formValues.client_property_poa.poaaddressline1} onChange={handleChange} />
            {/* <div className="text-[10px] text-[#CD0000] ">{formErrors.amount}</div> */}
          </div>
          <div className="">
            <div className="text-[13px]">Country </div>
            <select className="text-[12px] pl-4 w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm" name="poacountry"
            value={formValues.client_property_poa.poacountry} onChange={(e) => {
                handleChange(e)
                fetchStateData(e.target.value)
                setCity([]);
            }} > 
            {}
              <option value="" hidden>Select country</option>
              {country && country.map(item => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
            {/* <div className="text-[10px] text-[#CD0000] ">{formErrors.modeofpayment}</div> */}
          </div>
          <div className="">
            <div className="text-[13px]">City </div>
            <select className="text-[12px] pl-4 w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm" name="poacity" value={formValues.client_property_poa.poacity} onChange={handleChange}>
              <option value="" hidden >Select city</option>
              {city && city.map(item => (
                <option key={item.city} value={item.city}>
                  {item.city}
                </option>
              ))}
            </select>
            {/* <div className="text-[10px] text-[#CD0000] ">{formErrors.modeofpayment}</div> */}
          </div>
          <div className="">
            <div className="text-[13px]">Zip Code </div>
            <input className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="poazip" value={formValues.client_property_poa.poazip} onChange={handleChange}/>
            {/* <div className="text-[10px] text-[#CD0000] ">{formErrors.amount}</div> */}
          </div>
          <div className="">
            <div className="text-[13px]">Birth Year </div>
            <input className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="number" name="poabirthyear" value={formValues.client_property_poa.poabirthyear} onChange={handleChange} />
            {/* <div className="text-[10px] text-[#CD0000] ">{formErrors.amount}</div> */}
          </div>
        </div>
        <div className="space-y-2">
          <div className="">
            <div className="text-[13px]">PAN No </div>
            <input className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="poapanno" value={formValues.client_property_poa.poapanno} onChange={handleChange}/>
            {/* <div className="text-[10px] text-[#CD0000] ">{formErrors.amount}</div> */}
          </div>
          <div className="">
            <div className="text-[13px]">Address Line 2 </div>
            <input className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="poaaddressline2" value={formValues.client_property_poa.poaaddressline2} onChange={handleChange}/>
            {/* <div className="text-[10px] text-[#CD0000] ">{formErrors.amount}</div> */}
          </div>
          <div className="">
            <div className="text-[13px]">State </div>
            <select className="text-[12px] pl-4 w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm" name="poastate" value={formValues.client_property_poa.poastate} onChange={(e) => {
              handleChange(e)
              fetchCityData(e.target.value);
            }}>
              
              <option value="" hidden>Select state</option>
              {state && state.map((item) => (
                
                <option key={item[0]} value={item[0]}>
                  {item[0]}
                </option>
              ))}
            </select>
            {/* <div className="text-[10px] text-[#CD0000] ">{formErrors.modeofpayment}</div> */}
          </div>
          <div className="">
            <div className="text-[13px]">Suburb </div>
            <input className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="poasuburb" onChange={handleChange} value={formValues.client_property_poa.poasuburb}/>
            {/* <div className="text-[10px] text-[#CD0000] ">{formErrors.amount}</div> */}
          </div>
          <div className="">
            <div className="text-[13px]">Occupation </div>
            <input className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="poaoccupation" value={formValues.client_property_poa.poaoccupation} onChange={handleChange}/>
            {/* <div className="text-[10px] text-[#CD0000] ">{formErrors.amount}</div> */}
          </div>
          <div className="">
            <div className="text-[13px]">Photos </div>
            <input className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="poaphoto" placeholder='paste photo hyperlink' onChange={handleChange} value={formValues.client_property_poa.poaphoto}/>
            {/* <div className="text-[10px] text-[#CD0000] ">{formErrors.amount}</div> */}
          </div>
        </div>
        <div className="space-y-2">
          <div className="">
            <div className="text-[13px]">Employer Name </div>
            <input className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="poaemployername" value={formValues.client_property_poa.poaemployername} onChange={handleChange}/>
            {/* <div className="text-[10px] text-[#CD0000] ">{formErrors.amount}</div> */}
          </div>
          <div className="">
            <div className="text-[13px]">End Date </div>
            <input className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="date" name="poaenddate"  value={formValues.client_property_poa.poaenddate} onChange={handleChange}/>
            {/* <div className="text-[10px] text-[#CD0000] ">{formErrors.amount}</div> */}
          </div>
          <div className="">
            <div className="text-[13px]">Scan Copy </div>
            <input className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="scancopy" placeholder='paste hyperlink here' value={formValues.client_property_poa.scancopy} onChange={handleChange}/>
            {/* <div className="text-[10px] text-[#CD0000] ">{formErrors.amount}</div> */}
          </div>
          <div className="">
            <div className="text-[13px]">Effective Date </div>
            <input className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="date" name="poaeffectivedate" value={formValues.client_property_poa.poaeffectivedate} onChange={handleChange}/>
            {/* <div className="text-[10px] text-[#CD0000] ">{formErrors.amount}</div> */}
          </div>
          <div className="">
            <div className="text-[13px]">POA For </div>
            <input className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="poafor" onChange={handleChange} value={formValues.client_property_poa.poafor}/>
            {/* <div className="text-[10px] text-[#CD0000] ">{formErrors.amount}</div> */}
          </div>  
        </div>
      </div>
    </div>
  )
}

export default POADetails;
