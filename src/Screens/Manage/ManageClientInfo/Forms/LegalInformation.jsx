import React from 'react'
import { useState } from 'react';
import { APIService } from '../../../../services/API';
const LegalInformation = ({formValues,setFormValues,relationData,allCountry}) => {

  const [country, setCountry] = useState(allCountry);
  const [city, setCity] = useState([]);
  const [allState, setAllState] = useState([]);
  // const [relation, setRelation] = useState([]);
  const handleChange = (e) => {
    const {name,value} = e.target;
     setFormValues({...formValues,client_legal_info : {
         ...formValues.client_legal_info,
         [name] : value
     }})
   }
   const fetchStateData = async (id) => {
    console.log(id);
    const data = { "user_id": 1234, "country_id": id };
    // const data = {"user_id":1234,"rows":["id","state"],"filters":[],"sort_by":[],"order":"asc","pg_no":0,"pg_size":0};
    const response = await APIService.getState(data);
    const result = (await response.json()).data;
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
      if (result.length > 0) {
          setFormValues((existing) => {
              const newData = { ...existing, city: result[0].id }
              return newData;
          })
      }
  }
}
  return (
    <div className="h-auto w-full">
      <div className="flex gap-10 justify-center items-center">
        <div className=" space-y-2 ">
          <div className="">
            <div className="text-[14px]">Full Legal Name </div>
            <input className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="fulllegalname" value={formValues.client_legal_info.fulllegalname} onChange={handleChange} />
            {/* <div className="text-[12px] text-[#CD0000] ">{formErrors.amount}</div> */}
          </div>
          <div className="">
            <div className="text-[14px]">Address Line 1 </div>
            <input className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="addressline1" value={formValues.client_legal_info.addressline1} onChange={handleChange} />
            {/* <div className="text-[12px] text-[#CD0000] ">{formErrors.amount}</div> */}
          </div>
          <div className="">
            <div className="text-[14px]">Country </div>
            <select className="text-[12px] pl-4 w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm" name="country" onChange={
              (e) => {
                fetchStateData(e.target.value);
              }
            }>
              <option >Select country</option>
              {country && country.map(item => (
                <option key={item[0]} value={item[0]}>
                  {item[1]}
                </option>
              ))}
            </select>
            {/* <div className="text-[12px] text-[#CD0000] ">{formErrors.modeofpayment}</div> */}
          </div>
          <div className="">
            <div className="text-[14px]">City </div>
            <select className="text-[12px] pl-4 w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm" name="city" >
              <option >Select city</option>
              {city && city.map(item => (
                <option key={item} value={item}>
                  {item[1]}
                </option>
              ))}
            </select>
            {/* <div className="text-[12px] text-[#CD0000] ">{formErrors.modeofpayment}</div> */}
          </div>
          <div className="">
            <div className="text-[14px]">Zip Code </div>
            <input className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="zip" value={formValues.client_legal_info.zip} onChange={handleChange} />
            {/* <div className="text-[12px] text-[#CD0000] ">{formErrors.amount}</div> */}
          </div>
          <div className="">
            <div className="text-[14px]">Birth Year </div>
            <input className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="date" name="birthyear" value={formValues.client_legal_info.birthyear} onChange={handleChange} />
            {/* <div className="text-[12px] text-[#CD0000] ">{formErrors.amount}</div> */}
          </div>
          <div className="">
            <div className="text-[14px]">Relation with </div>
            <input className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="relationwith" onChange={handleChange} value={formValues.client_legal_info.relationwith}/>
            {/* <div className="text-[12px] text-[#CD0000] ">{formErrors.amount}</div> */}
          </div>
        </div>
        <div className="space-y-2">
          <div className="">
            <div className="text-[14px]">PAN No </div>
            <input className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="panno" onChange={handleChange} value={formValues.client_legal_info.panno}/>
            {/* <div className="text-[12px] text-[#CD0000] ">{formErrors.amount}</div> */}
          </div>
          <div className="">
            <div className="text-[14px]">Address Line 2 </div>
            <input className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="addressline2" onChange={handleChange} value={formValues.client_legal_info.addressline2} />
            {/* <div className="text-[12px] text-[#CD0000] ">{formErrors.amount}</div> */}
          </div>
          <div className="">
            <div className="text-[14px]">State </div>
            <select className="text-[12px] pl-4 w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm" name="state" onChange={
              (e) => {
                fetchCityData(e.target.value)
              }
            }>
              <option >Select state</option>
              {allState && allState.map(item => (
                <option key={item} value={item}>
                  {item[1]}
                </option>
              ))}
            </select>
            {/* <div className="text-[12px] text-[#CD0000] ">{formErrors.modeofpayment}</div> */}
          </div>
          <div className="">
            <div className="text-[14px]">Suburb </div>
            <input className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="suburb" onChange={handleChange} value={formValues.client_legal_info.suburb} />
            {/* <div className="text-[12px] text-[#CD0000] ">{formErrors.amount}</div> */}
          </div>
          <div className="">
            <div className="text-[14px]">Occupation </div>
            <input className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="occupation" onChange={handleChange} value={formValues.client_legal_info.occupation}  />
            {/* <div className="text-[12px] text-[#CD0000] ">{formErrors.amount}</div> */}
          </div>
          <div className="">
            <div className="text-[14px]">Relation </div>
            <select className="text-[12px] pl-4 w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm" name="relation" value={formValues.client_legal_info.relation} onChange={handleChange} >
              <option >Select Relation</option>
              {relationData && relationData.map(item => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
            {/* <div className="text-[12px] text-[#CD0000] ">{formErrors.modeofpayment}</div> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default LegalInformation
