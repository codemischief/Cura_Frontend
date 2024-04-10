import React, { useState } from "react";
import Checkbox from '@mui/material/Checkbox';

const ProjectInformation = ({initialSociety,initialStates,initialCities}) => {
  const [propertyType, setPropertyType] = useState([]);
  const [levelOfFurnishing, setLevelOfFurnishing] = useState([]);
  const [state, setState] = useState(initialStates);
  const [city, setCity] = useState(initialCities);
  const [society, setSociety] = useState([]);
  const [status, setStatus] = useState([]);
  const [electricity, setElectricity] = useState([]);
  const [existingSociety,setExistingSociety] = useState(initialSociety);
  return (
    <div className="h-auto w-full">
      <div className="flex gap-10 justify-center mt-3">
        <div className=" space-y-2 ">
          <div className="">
            <div className="text-[13px]">
                Client Name <label className="text-red-500">*</label>
            </div>
            <input
              className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm"
              type="text"
              name="clientName"
            />
            {/* <div className="text-[10px] text-[#CD0000] ">{formErrors.amount}</div> */}
          </div>
          <div className="">
            <div className="text-[13px]">
              Level of Furnishing <label className="text-red-500">*</label>
            </div>
            <select
              className="text-[12px] pl-4 w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm"
              name="levelOfFurnishing"
            >
              <option>Select Level of Furnishing</option>
              {levelOfFurnishing &&
                levelOfFurnishing.map((item) => (
                  <option key={item} value={item}>
                    {item[1]}
                  </option>
                ))}
            </select>
            {/* <div className="text-[10px] text-[#CD0000] ">{formErrors.modeofpayment}</div> */}
          </div>
          <div className="">
            <div className="text-[13px]">
              State <label className="text-red-500">*</label>
            </div>
            <select
              className="text-[12px] pl-4 w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm"
              name="state"
            >
              <option>Select State</option>
              {state &&
                state.map((item) => (
                  <option key={item[0]} value={item[0]}>
                    {item[0]}
                  </option>
                ))}
            </select>
            {/* <div className="text-[10px] text-[#CD0000] ">{formErrors.modeofpayment}</div> */}
          </div>
          <div className="">
            <div className="text-[13px]">
              Initial Possesion Date
            </div>
            <input
              className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm"
              type="date"
              name="initialPossesionDate"
            />
            {/* <div className="text-[10px] text-[#CD0000] ">{formErrors.amount}</div> */}
          </div>
          <div className="">
            <div className="text-[13px]">Other Electricity Details </div>
            <input
              className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm"
              type="text"
              name="otherElecticityDetails"
            />
            {/* <div className="text-[10px] text-[#CD0000] ">{formErrors.amount}</div> */}
          </div>
          <div className="">
            <div className="text-[13px]">Property Tax Number </div>
            <input
              className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm"
              type="text"
              name="propertyTaxNumber"
            />
            {/* <div className="text-[10px] text-[#CD0000] ">{formErrors.amount}</div> */}
          </div>

          
          
          
          
          
          
        </div>
        <div className="space-y-2">
          <div className="">
            <div className="text-[13px]">
              Society/Project Name <label className="text-red-500">*</label>
            </div>
            <select
              className="text-[12px]  w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm"
              name="society"
            >
              <option>Select Builder </option>
              {existingSociety &&
                existingSociety.map((item) => (
                  <option key={item[0]} value={item.builderid} >
                       <p>{item.buildername}</p> 
                       &nbsp;
                       &nbsp;
                       &nbsp;
                       <p>{item.projectname}</p> 
                  </option>
                ))}
            </select>
            {/* <div className="text-[10px] text-[#CD0000] ">{formErrors.modeofpayment}</div> */}
          </div>
          <div className="">
            <div className="text-[13px]">Property Description <label className="text-red-500">*</label></div>
            <input
              className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm"
              type="text"
              name="propertyDescription"
            />
            {/* <div className="text-[10px] text-[#CD0000] ">{formErrors.amount}</div> */}
          </div>
          <div className="">
            <div className="text-[13px]">
              City <label className="text-red-500">*</label>
            </div>
            <select
              className="text-[12px] pl-4 w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm"
              name="city"
            >
              <option>Select City</option>
              {city &&
                city.map((item) => (
                  <option key={item.id} value={item.city}>
                    {item.city}
                  </option>
                ))}
            </select>
            {/* <div className="text-[10px] text-[#CD0000] ">{formErrors.modeofpayment}</div> */}
          </div>
          <div className="space-y-2">
          <div className="">
            <div className="text-[13px]">Gas Connection Details </div>
            <input
              className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm"
              type="text"
              name="gasConnectionDetails"
            />
            {/* <div className="text-[10px] text-[#CD0000] ">{formErrors.amount}</div> */}
          </div>
          <div className="">
            <div className="text-[13px]">
              Number Of Parking
            </div>
            <input
              className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm"
              type="text"
              name="numberOfParking"
            />
            {/* <div className="text-[10px] text-[#CD0000] ">{formErrors.amount}</div> */}
          </div>
          <div className="">
            <div className="text-[13px]">Electricity Billing Unit </div>
            <input
              className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm"
              type="text"
              name="electricityBillingUnit"
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
              name="propertyType"
            >
              <option>Select Property Type</option>
              {propertyType &&
                propertyType.map((item) => (
                  <option key={item} value={item}>
                    {item[1]}
                  </option>
                ))}
            </select>
            {/* <div className="text-[10px] text-[#CD0000] ">{formErrors.modeofpayment}</div> */}
          </div>

          <div className="">
            <div className="text-[13px]">Property Manager </div>
            <input
              className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm"
              type="text"
              name="email"
            />
            {/* <div className="text-[10px] text-[#CD0000] ">{formErrors.amount}</div> */}
          </div>
          <div className="">
            <div className="text-[13px]">Suburb <label className="text-red-500">*</label></div>
            <input
              className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm"
              type="text"
              name="suburb"
            />
            {/* <div className="text-[10px] text-[#CD0000] ">{formErrors.amount}</div> */}
          </div>
          <div className="">
            <div className="text-[13px]">Electricity Consumer Number </div>
            <input
              className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm"
              type="text"
              name="electicityConsumerNumber"
            />
            {/* <div className="text-[10px] text-[#CD0000] ">{formErrors.amount}</div> */}
          </div>
          
          <div className="">
            <div className="text-[13px]">Layout Details (Sch A)</div>
            <input
              className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm"
              type="text"
              name="layoutDetails"
            />
            {/* <div className="text-[10px] text-[#CD0000] ">{formErrors.amount}</div> */}
          </div>
          <div className="">
            <div className="text-[13px]">Comments </div>
            <input
              className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm"
              type="text"
              name="comments"
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
            >
              <option>Select Status </option>
              {status &&
                status.map((item) => (
                  <option key={item} value={item}>
                    {item[1]}
                  </option>
                ))}
            </select>
            {/* <div className="text-[10px] text-[#CD0000] ">{formErrors.modeofpayment}</div> */}
          </div>
          <div className="">
            <div className="text-[13px]">Client Service Manager </div>
            <input
              className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm"
              type="text"
              name="website"
            />
            {/* <div className="text-[10px] text-[#CD0000] ">{formErrors.amount}</div> */}
          </div>
          <div className="">
            <div className="text-[13px]">Electricity Bill Due Date <label className="text-red-500">*</label></div>
            <select
              className="text-[12px] pl-4 w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm"
              name="electricityBillDueDate"
            >
              <option>Select Status </option>
              {electricity &&
                electricity.map((item) => (
                  <option key={item} value={item}>
                    {item[1]}
                  </option>
                ))}
            </select>
            {/* <div className="text-[10px] text-[#CD0000] ">{formErrors.modeofpayment}</div> */}
          </div>

          <div className="">
            <div className="text-[13px]">Text For Posting </div>
            <input
              className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm"
              type="text"
              name="textForPosting"
            />
            {/* <div className="text-[10px] text-[#CD0000] ">{formErrors.amount}</div> */}
          </div>
          <div className="">
            <div className="text-[13px]">Internal Furniture and fittings (Sch B) </div>
            <input
              className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm"
              type="text"
              name="furniture"
            />
            {/* <div className="text-[10px] text-[#CD0000] ">{formErrors.amount}</div> */}
          </div> 

          
        </div>
      </div>
      <div className="mt-2 flex justify-center items-center gap-2">
        <div className="flex justify-center items-center text-[13px] font-semibold"><Checkbox label="Active" />
          Prpperty Owner By Client Only</div>
        <div className="flex justify-center items-center text-[13px] font-semibold"><Checkbox label="Active" />
          Index || Collected </div>
      </div>
    </div>
  );
};

export default ProjectInformation;
