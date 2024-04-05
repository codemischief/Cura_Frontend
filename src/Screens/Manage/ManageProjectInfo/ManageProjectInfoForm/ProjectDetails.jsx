import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import { useState, useEffect } from "react";

const ProjectDetails = () => {

  const selectedProjectLegalStatus = [
    "1", "2", "3", "4"
  ]
  const initialValues = {
    projectLegalStatus: "",


  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});

  // handle changes in input form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues)); // validate form and set error message
    setIsSubmit(true);
  };
  // validate form and to throw Error message
  const validate = (values) => {
    const errors = {};
    if (!values.projectLegalStatus) {
      errors.projectLegalStatus = "Select Project legal Status";
    }

    return errors;
  };
  return (
    <>
        <div className="flex justify-center space-x-10 mt-5">
          <div>
            <div className="flex space-x-10">
              <div className="space-y-2">
                <div className="flex  items-center space-x-2">
                  <Checkbox className='w-4 h-4' /> <div className='text-[#505050] text-[14px]'>Swimming Pool</div>
                </div>
                <div className="flex  items-center space-x-2">
                  <Checkbox className='w-4 h-4' /> <div className='text-[#505050] text-[14px]'>Lift Battery backup</div>
                </div>
                <div className="flex  items-center space-x-2">
                  <Checkbox className='w-4 h-4' /> <div className='text-[#505050] text-[14px]'>Gym</div>
                </div>
                <div className="flex  items-center space-x-2">
                  <Checkbox className='w-4 h-4' /> <div className='text-[#505050] text-[14px]'>piped gas</div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex  items-center space-x-2">
                  <Checkbox className='w-4 h-4' /> <div className='text-[#505050] text-[14px]'>Lift</div>
                </div>
                <div className="flex  items-center space-x-2">
                  <Checkbox className='w-4 h-4' /> <div className='text-[#505050] text-[14px]'>Club House</div>
                </div>
                <div className="flex  items-center space-x-2">
                  <Checkbox className='w-4 h-4' /> <div className='text-[#505050] text-[14px]'>Children play area</div>
                </div>
                <div className="flex  items-center space-x-2">
                  <Checkbox className='w-4 h-4' /> <div className='text-[#505050] text-[14px]'>CCTV Camera</div>
                </div>
              </div>
            </div>
            <div className="mt-6 mb-2 font-semibold text-[14px]"> project Config</div>
            <div className="flex  space-x-10">
              <div className="space-y-2">
                <div className="flex  items-center space-x-2">
                  <Checkbox className='w-4 h-4' /> <div className='text-[#505050] text-[14px]'>Studio</div>
                </div>
                <div className="flex  items-center space-x-2">
                  <Checkbox className='w-4 h-4' /> <div className='text-[#505050] text-[14px]'>1BHK</div>
                </div>
                <div className="flex  items-center space-x-2">
                  <Checkbox className='w-4 h-4' /> <div className='text-[#505050] text-[14px]'>2BHK</div>
                </div>
                <div className="flex  items-center space-x-2">
                  <Checkbox className='w-4 h-4' /> <div className='text-[#505050] text-[14px]'>4BHK</div>
                </div>
                <div className="flex  items-center space-x-2">
                  <Checkbox className='w-4 h-4' /> <div className='text-[#505050] text-[14px]'>Duplex</div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex  items-center space-x-2">
                  <Checkbox className='w-4 h-4' /> <div className='text-[#505050] text-[14px]'>RK</div>
                </div>
                <div className="flex  items-center space-x-2">
                  <Checkbox className='w-4 h-4' /> <div className='text-[#505050] text-[14px]'>3BHK</div>
                </div>
                <div className="flex  items-center space-x-2">
                  <Checkbox className='w-4 h-4' /> <div className='text-[#505050] text-[14px]'>Penthouse</div>
                </div>
                <div className="flex  items-center space-x-2">
                  <Checkbox className='w-4 h-4' /> <div className='text-[#505050] text-[14px]'>Other</div>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <div className="text-[#505050] text-[13px] ">Other Amenities</div>
              <input className='w-52 h-5 border-[#C6C6C6] border-[1px] rounded-sm px-3 text-[11px]' type="text" name="" id="" />
            </div>
          </div>
          <div className="flex space-x-4">
            <div className="space-y-2">
              <div className="">
                <div className="text-[13px]">Project Legal Status <label className="text-red-500">*</label></div>
                <select className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" name="projectLegalStatus" value={formValues.projectLegalStatus} onChange={handleChange} >
                  {selectedProjectLegalStatus.map(item => (
                    <option key={item} value={item}>
                      {item}
                    </option>
                  ))}
                </select>
                <div className="text-[10px] text-[#CD0000] ">{formErrors.projectLegalStatus}</div>
              </div>
              <div className="">
                <div className="text-[13px]">Competition Year</div>
                <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="date" name="competitionYear" />
              </div>
              <div className="">
                <div className="text-[13px]">Taluka</div>
                <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="text" name="taluka" />
              </div>
              <div className="">
                <div className="text-[13px]">Police Chowkey</div>
                <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="text" name="policeChowkey" />
              </div>
              <div className="">
                <div className="text-[13px]">Maintenance Detail</div>
                <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="text" name="maintainanceDetail" />
              </div>
              <div className="">
                <div className="text-[13px]">Number of Buildings</div>
                <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="text" name="numberOfBuildings" />
              </div>
              <div className="">
                <div className="text-[13px]">Numbher of Floors</div>
                <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="text" name="numberOfFloors" />
              </div>
            </div>
          </div>
          <div className="flex space-x-4">
            <div className="space-y-2">
              <div className="">
                <div className="text-[13px]">Rules</div>
                <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="date" name="rules" />
              </div>
              <div className="">
                <div className="text-[13px]">Jurisdiction</div>
                <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]"  type="text" name="jurisdiction" />
              </div>
              <div className="">
                <div className="text-[13px]">Corporation Ward</div>
                <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="text" name="corporationWard" />
              </div>
              <div className="">
                <div className="text-[13px]">Police Station</div>
                <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="text" name="policeStation" />
              </div>
              <div className="">
                <div className="text-[13px]">Dues Payable Month</div>
                <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="date" name="duesPayableMonth" />
              </div>
              <div className="">
                <div className="text-[13px]">Approx Total Month</div>
                <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="text" name="approxTotalMonth" />
              </div>
              <div className="">
                <div className="text-[13px]">Other Details</div>
                <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="text" name="Work phone" />
              </div>
            </div>
          </div>
        </div>
        
      
    </>
  )
}

export default ProjectDetails
