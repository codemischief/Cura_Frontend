import React from 'react'
import { useState } from 'react';

const POADetails = ({initialCountries,initialStates,initialCities}) => {

  const [country, setCountry] = useState(initialCountries);
  const [city, setCity] = useState(initialCities);
  const [state, setState] = useState(initialCities);
  const [relation, setRelation] = useState([]);

  return (
    <div className="h-auto w-full">
      <div className="flex gap-10 justify-center mt-3 mb-5">
        <div className=" space-y-2 ">
          <div className="">
            <div className="text-[13px]">Full Legal Name </div>
            <input className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="fullLegalName" />
            {/* <div className="text-[10px] text-[#CD0000] ">{formErrors.amount}</div> */}
          </div>
          <div className="">
            <div className="text-[13px]">Address Line 1 </div>
            <input className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="add1" />
            {/* <div className="text-[10px] text-[#CD0000] ">{formErrors.amount}</div> */}
          </div>
          <div className="">
            <div className="text-[13px]">Country </div>
            <select className="text-[12px] pl-4 w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm" name="country" >
              <option >Select country</option>
              {country && country.map(item => (
                <option key={item[0]} value={item[0]}>
                  {item[1]}
                </option>
              ))}
            </select>
            {/* <div className="text-[10px] text-[#CD0000] ">{formErrors.modeofpayment}</div> */}
          </div>
          <div className="">
            <div className="text-[13px]">City </div>
            <select className="text-[12px] pl-4 w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm" name="city" >
              <option >Select city</option>
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
            <input className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="zipcode" />
            {/* <div className="text-[10px] text-[#CD0000] ">{formErrors.amount}</div> */}
          </div>
          <div className="">
            <div className="text-[13px]">Birth Year </div>
            <input className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="date" name="birthYear" />
            {/* <div className="text-[10px] text-[#CD0000] ">{formErrors.amount}</div> */}
          </div>
        </div>
        <div className="space-y-2">
          <div className="">
            <div className="text-[13px]">PAN No </div>
            <input className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="panno" />
            {/* <div className="text-[10px] text-[#CD0000] ">{formErrors.amount}</div> */}
          </div>
          <div className="">
            <div className="text-[13px]">Address Line 2 </div>
            <input className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="add2" />
            {/* <div className="text-[10px] text-[#CD0000] ">{formErrors.amount}</div> */}
          </div>
          <div className="">
            <div className="text-[13px]">State </div>
            <select className="text-[12px] pl-4 w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm" name="state" >
              <option >Select state</option>
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
            <input className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="suburb" />
            {/* <div className="text-[10px] text-[#CD0000] ">{formErrors.amount}</div> */}
          </div>
          <div className="">
            <div className="text-[13px]">Occupation </div>
            <input className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="occupation" />
            {/* <div className="text-[10px] text-[#CD0000] ">{formErrors.amount}</div> */}
          </div>
          <div className="">
            <div className="text-[13px]">Photos </div>
            <input className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="photos" placeholder='paste photo hyperlink' />
            {/* <div className="text-[10px] text-[#CD0000] ">{formErrors.amount}</div> */}
          </div>
        </div>
        <div className="space-y-2">
          <div className="">
            <div className="text-[13px]">Employee Name </div>
            <input className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="employeeName" />
            {/* <div className="text-[10px] text-[#CD0000] ">{formErrors.amount}</div> */}
          </div>
          <div className="">
            <div className="text-[13px]">End Date </div>
            <input className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="date" name="endDate" />
            {/* <div className="text-[10px] text-[#CD0000] ">{formErrors.amount}</div> */}
          </div>
          <div className="">
            <div className="text-[13px]">Scan Copy </div>
            <input className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="scanCopy" placeholder='paste hyperlink here' />
            {/* <div className="text-[10px] text-[#CD0000] ">{formErrors.amount}</div> */}
          </div>
          <div className="">
            <div className="text-[13px]">Effective Date </div>
            <input className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="date" name="effectiveDate" />
            {/* <div className="text-[10px] text-[#CD0000] ">{formErrors.amount}</div> */}
          </div>
          <div className="">
            <div className="text-[13px]">POA For </div>
            <input className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="POAFor" />
            {/* <div className="text-[10px] text-[#CD0000] ">{formErrors.amount}</div> */}
          </div>  
        </div>
      </div>
    </div>
  )
}

export default POADetails;
