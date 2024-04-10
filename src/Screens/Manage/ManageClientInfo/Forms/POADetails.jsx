import React from 'react'
import { useState } from 'react';
import { APIService } from '../../../../services/API';
const POADetails = ({formValues,setFormValues,relationData,allCountries,initialStates,initialCities}) => {

  const [country, setCountry] = useState(allCountries);
  const [allCity, setAllCity] = useState(initialCities);
  const [allStates, setAllStates] = useState(initialStates);
  // const [relation, setRelation] = useState([]);
   const handleChange = (e) => {
    const {name,value} = e.target;
     setFormValues({...formValues,client_poa : {
      ...formValues.client_poa,
         [name] : value
     }})
   }
   const fetchStateData = async (id) => {
    console.log(id);
    console.log('this is being called')
    const data = { "user_id": 1234, "country_id": id };
    const response = await APIService.getState(data);
    const result = (await response.json()).data;
    console.log('here')
    console.log(result)
    if (Array.isArray(result)) {
        setAllStates(result)
        if(result.length >= 1) {
          fetchCityData(result[0][0]);
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
  return (
    <div className="h-auto w-full">
      <div className="flex gap-10 justify-center">
        <div className=" space-y-2 ">
          <div className="">
            <div className="text-[14px]">Full Legal Name </div>
            <input className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="poalegalname" value={formValues.client_poa.poalegalname} onChange={handleChange} />
            {/* <div className="text-[12px] text-[#CD0000] ">{formErrors.amount}</div> */}
          </div>
          <div className="">
            <div className="text-[14px]">Address Line 1 </div>
            <input className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="poaaddressline1" value={formValues.client_poa.poaaddressline1} onChange={handleChange} />
            {/* <div className="text-[12px] text-[#CD0000] ">{formErrors.amount}</div> */}
          </div>
          <div className="">
            <div className="text-[14px]">Country </div>
            <select className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" name="country" value={formValues.client_poa.poacountry} onChange={
              (e) => {
                setFormValues({...formValues,client_poa : {
                  ...formValues.client_poa,
                  poacountry : e.target.value
              }})
               setAllCity([]);
               fetchStateData(e.target.value);
              }
            }>
              <option >Select country</option>
              {country && country.map(item => {
                if(item[0] == 5) {
                  return <option key={item[0]} value={item[0]} selected>
                  {item[1]}
                  </option>
                  }else {
                      return <option key={item[0]} value={item[0]} >
                      {item[1]}
                  </option>
                  }
})}
            </select>
            {/* <div className="text-[12px] text-[#CD0000] ">{formErrors.modeofpayment}</div> */}
          </div>
          <div className="">
            <div className="text-[14px]">City </div>
            <select className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" name="city" value={formValues.client_poa.poacity} onChange={(e) => {
              setFormValues({...formValues,client_poa : {
                  ...formValues.client_poa,
                  poacity : e.target.value
              }})
            }}>
              <option >Select city</option>
              {allCity && allCity.map(item => (
                <option  value={item.city}>
                  {item.city}
                </option>
              ))}
            </select>
            {/* <div className="text-[12px] text-[#CD0000] ">{formErrors.modeofpayment}</div> */}
          </div>
          <div className="">
            <div className="text-[14px]">Zip Code </div>
            <input className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" value={formValues.client_poa.poazip} name="poazip" onChange={handleChange} />
            {/* <div className="text-[12px] text-[#CD0000] ">{formErrors.amount}</div> */}
          </div>
          <div className="">
            <div className="text-[14px]">Birth Year </div>
            <input className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="date" name="poabirthyear" value={formValues.client_poa.poabirthyear} onChange={handleChange}/>
            {/* <div className="text-[12px] text-[#CD0000] ">{formErrors.amount}</div> */}
          </div>
          <div className="">
            <div className="text-[14px]">Relation with </div>
            <input className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="poarelationwith" value={formValues.client_poa.poarelationwith} onChange={handleChange}/>
            {/* <div className="text-[12px] text-[#CD0000] ">{formErrors.amount}</div> */}
          </div>
        </div>
        <div className="space-y-2">
          <div className="">
            <div className="text-[14px]">PAN No </div>
            <input className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="poapanno" value={formValues.client_poa.poapanno} onChange={handleChange}/>
            {/* <div className="text-[12px] text-[#CD0000] ">{formErrors.amount}</div> */}
          </div>
          <div className="">
            <div className="text-[14px]">Address Line 2 </div>
            <input className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="poaaddressline2" value={formValues.client_poa.poaaddressline2} onChange={handleChange}/>
            {/* <div className="text-[12px] text-[#CD0000] ">{formErrors.amount}</div> */}
          </div>
          <div className="">
            <div className="text-[14px]">State </div>
            <select className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" name="state" value={formValues.client_poa.poastate} onChange={(e) => {
               setFormValues({...formValues,client_poa : {
                ...formValues.client_poa,
                    poastate : e.target.value
                }})
                fetchCityData(e.target.value);
            }}>
              <option >Select state</option>
              {allStates && allStates.map(item => {
                if(item[0] == "Maharashtra") {
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
            <input className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="poasuburb" value={formValues.client_poa.poasuburb} onChange={handleChange}/>
            {/* <div className="text-[12px] text-[#CD0000] ">{formErrors.amount}</div> */}
          </div>
          <div className="">
            <div className="text-[14px]">Occupation </div>
            <input className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="poaoccupation" value={formValues.client_poa.poaoccupation} onChange={handleChange}/>
            {/* <div className="text-[12px] text-[#CD0000] ">{formErrors.amount}</div> */}
          </div>
          <div className="">
            <div className="text-[14px]">Photos </div>
            <input className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="poaphoto" placeholder='paste photo hyperlink' value={formValues.client_poa.poaphoto} onChange={handleChange}/>
            {/* <div className="text-[12px] text-[#CD0000] ">{formErrors.amount}</div> */}
          </div>
          <div className="">
            <div className="text-[14px]">Relation </div>
            <select className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" name="poarelation" value={formValues.client_poa.poarelation} onChange={handleChange}>
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
        <div className="space-y-2">
          <div className="">
            <div className="text-[14px]">Employer Name </div>
            <input className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="poaemployername" value={formValues.client_poa.poaemployername} onChange={handleChange}/>
            {/* <div className="text-[12px] text-[#CD0000] ">{formErrors.amount}</div> */}
          </div>
          <div className="">
            <div className="text-[14px]">POA For </div>
            <input className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="poafor" value={formValues.client_poa.poafor} onChange={handleChange}/>
            {/* <div className="text-[12px] text-[#CD0000] ">{formErrors.amount}</div> */}
          </div>
          <div className="">
            <div className="text-[14px]">Effective Date </div>
            <input className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="date" name="poaeffectivedate" value={formValues.client_poa.poaeffectivedate} onChange={handleChange}/>
            {/* <div className="text-[12px] text-[#CD0000] ">{formErrors.amount}</div> */}
          </div>
          <div className="">
            <div className="text-[14px]">End Date </div>
            <input className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="date" name="poaenddate" value={formValues.client_poa.poaenddate} onChange={handleChange}/>
            {/* <div className="text-[12px] text-[#CD0000] ">{formErrors.amount}</div> */}
          </div>
          <div className="">
            <div className="text-[14px]">Scan Copy </div>
            <input className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="scancopy" value={formValues.client_poa.scancopy} placeholder='paste hyperlink here' onChange={handleChange}/>
            {/* <div className="text-[12px] text-[#CD0000] ">{formErrors.amount}</div> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default POADetails;
