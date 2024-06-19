import React, { useEffect } from 'react'
import { useState } from 'react';
import { APIService } from '../../../../services/API';
import useAuth from '../../../../context/JwtContext';
const EditLegalInformation = ({formValues,setFormValues,relationData,allCountry,initialStates,initialCities}) => {
 const { user } = useAuth()
//   const [country, setCountry] = useState(allCountry);
//   const [state,setAllState] = useState(allState);
  const [allState,setAllState] = useState([]);
  // console.log(initialCities)
  const [allCity, setAllCity] = useState([]);
  // const [allState, setAllState] = useState([]);
  const handleChange = (e) => {
    const {name,value} = e.target;
     setFormValues({...formValues,client_legal_info : {
         ...formValues.client_legal_info,
         [name] : value
     }})
   }
   const fetchStateData = async (id) => {
    console.log('hey')
    console.log(id);
    const data = { "user_id": user.id, "country_id": id };
    const response = await APIService.getState(data);
    const result = (await response.json()).data;
    console.log(result)
    if (Array.isArray(result)) {
        setAllState(result)
        // if(result.length >= 1) {
        //     console.log('hey')
        //     fetchCityData(result[0][0])
        // }
    }
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
useEffect(() => {
   setAllState(initialStates);
   setAllCity(initialCities);
   fetchStateData(formValues.client_legal_info.country)
   fetchCityData(formValues.client_legal_info.state)
},[initialCities,initialStates])
  return (
    <div className="h-auto w-full">
      <div className="flex gap-10 justify-center">
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
            <select className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" name="country" value={formValues.client_legal_info.country} onChange={
              (e) => {
                // setAllCity([]);
                const existing = {...formValues};
                const temp = existing.client_legal_info
                temp.country = e.target.value 
                temp.state = null 
                temp.city = null
                existing.client_legal_info = temp;
                setFormValues(existing)
                setAllState([])
                fetchStateData(e.target.value);
                setAllCity([]);
              }
            }>
              <option value="" hidden>Select country</option>
              {allCountry && allCountry.map(item => {
                if(item.id == formValues.client_legal_info.country) {
                  return <option key={item.id} value={item.id} selected>
                  {item.name}
                  </option>
                  }else {
                      return <option key={item.id} value={item.id} >
                      {item.name}
                  </option>
                  }
})}
            </select>
            {/* <div className="text-[12px] text-[#CD0000] ">{formErrors.modeofpayment}</div> */}
          </div>
          <div className="">
            <div className="text-[14px]">City </div>
            <select className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" name="city" value={formValues.client_legal_info.city} onChange={
              (e) => {
                setFormValues({...formValues,client_legal_info : {
                  ...formValues.client_legal_info,
                  city : e.target.value
              }})
              }
            }>
              <option value="" hidden>Select City</option>
              {allCity.map(item => {
                if(item.city == formValues.client_legal_info.city) {
                    return <option key={item.city} value={item.city} selected>
                         {item.city}
                    </option>
                }else {
                    return <option key={item.city} value={item.city}>
                         {item.city}
                    </option>
                }
})}
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
            <input className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type='number' name="birthyear" value={formValues.client_legal_info.birthyear} onChange={handleChange} />
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
            <select className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" name="state" onChange={
              (e) => {
                setFormValues({...formValues,client_legal_info : {
                  ...formValues.client_legal_info,
                  state : e.target.value
                }})
                fetchCityData(e.target.value)
              }
            }>
              <option value="" hidden> Select State</option>
              {allState.map(item => {
                if(item[0] == formValues.client_legal_info.state) {
                  return <option key={item[0]} selected>
                         {item[0]}
                  </option>
               }else {
                   return <option key={item[0]}>
                       {item[0]}
                   </option>
               }
})}
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
            <select className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" name="relation" value={formValues.client_legal_info.relation} onChange={handleChange} >
              <option value="" hidden>Select Relation</option>
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

export default EditLegalInformation
