import React from 'react';
import Checkbox from '@mui/material/Checkbox';
import { useState, useEffect } from "react";

const ProjectDetails = ({formValues,setFormValues,projectLegalData,formErrors}) => {

  const selectedProjectLegalStatus = [
    "1", "2", "3", "4"
  ]
  const initialValues = {
    projectLegalStatus: "",


  };
  // const [formValues, setFormValues] = useState(initialValues);
  // const [formErrors, setFormErrors] = useState({});

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



  const handleProjectInfoChange = (e) => {
    const {name,value} = e.target;
    setFormValues({...formValues,project_info : {
        ...formValues.project_info,
        [name] : value
    }})
   } 
   const handleProjectAmenitiesChange = (e) => {
    const {name,value} = e.target;
    setFormValues({...formValues,project_amenities : {
        ...formValues.project_amenities,
        [name] : value
    }})
   }


  return (
    <>
        <div className="flex justify-center space-x-10 mt-5">
          <div>
            <div className="flex space-x-10">
              <div className="space-y-2">
                <div className="flex  items-center space-x-2">
                      <input
                            type="checkbox"
                            checked={formValues.project_amenities.swimmingpool}
                            className='mr-3 h-4 w-4'
                            onClick={(e) => {
                                // console.log(e.target.checked)
                                const existing = {...formValues};
                                const temp = {...existing.project_amenities};
                                temp.swimmingpool = !temp.swimmingpool
                                existing.project_amenities = temp;
                                setFormValues(existing)
                            }}
                        />
                  
                   <div className='text-[#505050] text-[14px]'>Swimming Pool</div>
                </div>
                <div className="flex  items-center space-x-2">
                       <input
                            type="checkbox"
                            checked={formValues.project_amenities.liftbatterybackup}
                            className='mr-3 h-4 w-4'
                            onClick={(e) => {
                                // console.log(e.target.checked)
                                const existing = {...formValues};
                                const temp = {...existing.project_amenities};
                                temp.liftbatterybackup = !temp.liftbatterybackup
                                existing.project_amenities = temp;
                                setFormValues(existing)
                            }}
                        />
                 
                  <div className='text-[#505050] text-[14px]'>Lift Battery backup</div>
                </div>
                <div className="flex  items-center space-x-2">
                    <input
                            type="checkbox"
                            checked={formValues.project_amenities.gym}
                            className='mr-3 h-4 w-4'
                            onClick={(e) => {
                                // console.log(e.target.checked)
                                const existing = {...formValues};
                                const temp = {...existing.project_amenities};
                                temp.gym = !temp.gym
                                existing.project_amenities = temp;
                                setFormValues(existing)
                            }}
                        />
                   <div className='text-[#505050] text-[14px]'>Gym</div>
                </div>
                <div className="flex  items-center space-x-2">
                       <input
                            type="checkbox"
                            checked={formValues.project_amenities.pipedgas}
                            className='mr-3 h-4 w-4'
                            onClick={(e) => {
                                // console.log(e.target.checked)
                                const existing = {...formValues};
                                const temp = {...existing.project_amenities};
                                temp.pipedgas = !temp.pipedgas
                                existing.project_amenities = temp;
                                setFormValues(existing)
                            }}
                        />
                  <div className='text-[#505050] text-[14px]'>piped gas</div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex  items-center space-x-2">
                       <input
                            type="checkbox"
                            checked={formValues.project_amenities.lift}
                            className='mr-3 h-4 w-4'
                            onClick={(e) => {
                                // console.log(e.target.checked)
                                const existing = {...formValues};
                                const temp = {...existing.project_amenities};
                                temp.lift = !temp.lift
                                existing.project_amenities = temp;
                                setFormValues(existing)
                            }}
                        />
                  <div className='text-[#505050] text-[14px]'>Lift</div>
                </div>
                <div className="flex  items-center space-x-2">
                   <input
                            type="checkbox"
                            checked={formValues.project_amenities.clubhouse}
                            className='mr-3 h-4 w-4'
                            onClick={(e) => {
                                // console.log(e.target.checked)
                                const existing = {...formValues};
                                const temp = {...existing.project_amenities};
                                temp.clubhouse = !temp.clubhouse
                                existing.project_amenities = temp;
                                setFormValues(existing)
                            }}
                        />
                   <div className='text-[#505050] text-[14px]'>Club House</div>
                </div>
                <div className="flex  items-center space-x-2">
                    <input
                            type="checkbox"
                            checked={formValues.project_amenities.childrensplayarea}
                            className='mr-3 h-4 w-4'
                            onClick={(e) => {
                                // console.log(e.target.checked)
                                const existing = {...formValues};
                                const temp = {...existing.project_amenities};
                                temp.childrensplayarea = !temp.childrensplayarea
                                existing.project_amenities = temp;
                                setFormValues(existing)
                            }}
                        />
                  <div className='text-[#505050] text-[14px]'>Children play area</div>
                </div>
                <div className="flex  items-center space-x-2">
                      <input
                            type="checkbox"
                            checked={formValues.project_amenities.cctvcameras}
                            className='mr-3 h-4 w-4'
                            onClick={(e) => {
                                // console.log(e.target.checked)
                                const existing = {...formValues};
                                const temp = {...existing.project_amenities};
                                temp.cctvcameras = !temp.cctvcameras
                                existing.project_amenities = temp;
                                setFormValues(existing)
                            }}
                        />
                   <div className='text-[#505050] text-[14px]'>CCTV Camera</div>
                </div>
              </div>
            </div>
            <div className="mt-6 mb-2 font-semibold text-[14px]"> Project Config</div>
            <div className="flex  space-x-10">
              <div className="space-y-2">
                <div className="flex  items-center space-x-2">
                     <input
                            type="checkbox"
                            checked={formValues.project_amenities.studio}
                            className='mr-3 h-4 w-4'
                            onClick={(e) => {
                                // console.log(e.target.checked)
                                const existing = {...formValues};
                                const temp = {...existing.project_amenities};
                                temp.studio = !temp.studio
                                existing.project_amenities = temp;
                                setFormValues(existing)
                            }}
                        />
                   <div className='text-[#505050] text-[14px]'>Studio</div>
                </div>
                <div className="flex  items-center space-x-2">
                    <input
                            type="checkbox"
                            checked={formValues.project_amenities["1BHK"]}
                            className='mr-3 h-4 w-4'
                            onClick={(e) => {
                                // console.log(e.target.checked)
                                const existing = {...formValues};
                                const temp = {...existing.project_amenities};
                                temp["1BHK"] = !temp["1BHK"]
                                existing.project_amenities = temp;
                                setFormValues(existing)
                            }}
                        />
                  <div className='text-[#505050] text-[14px]'>1BHK</div>
                </div>
                <div className="flex  items-center space-x-2">
                      <input
                            type="checkbox"
                            checked={formValues.project_amenities["2BHK"]}
                            className='mr-3 h-4 w-4'
                            onClick={(e) => {
                                // console.log(e.target.checked)
                                const existing = {...formValues};
                                const temp = {...existing.project_amenities};
                                temp["2BHK"] = !temp["2BHK"]
                                existing.project_amenities = temp;
                                setFormValues(existing)
                            }}
                        />
                  
                   <div className='text-[#505050] text-[14px]'>2BHK</div>
                </div>
                <div className="flex  items-center space-x-2">
                <input
                            type="checkbox"
                            checked={formValues.project_amenities["4BHK"]}
                            className='mr-3 h-4 w-4'
                            onClick={(e) => {
                                // console.log(e.target.checked)
                                const existing = {...formValues};
                                const temp = {...existing.project_amenities};
                                temp["4BHK"] = !temp["4BHK"]
                                existing.project_amenities = temp;
                                setFormValues(existing)
                            }}
                        />
                 
                  <div className='text-[#505050] text-[14px]'>4BHK</div>
                </div>
                <div className="flex  items-center space-x-2">
                <input
                            type="checkbox"
                            checked={formValues.project_amenities.duplex}
                            className='mr-3 h-4 w-4'
                            onClick={(e) => {
                                // console.log(e.target.checked)
                                const existing = {...formValues};
                                const temp = {...existing.project_amenities};
                                temp.duplex= !temp.duplex
                                existing.project_amenities = temp;
                                setFormValues(existing)
                            }}
                        />
                  
                   <div className='text-[#505050] text-[14px]'>Duplex</div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex  items-center space-x-2">
                  
                   <input
                            type="checkbox"
                            checked={formValues.project_amenities.RK}
                            className='mr-3 h-4 w-4'
                            onClick={(e) => {
                                // console.log(e.target.checked)
                                const existing = {...formValues};
                                const temp = {...existing.project_amenities};
                                temp.RK = !temp.RK
                                existing.project_amenities = temp;
                                setFormValues(existing)
                            }}
                        />
                  
                  <div className='text-[#505050] text-[14px]'>RK</div>
                </div>
                <div className="flex  items-center space-x-2">
                    <input
                            type="checkbox"
                            checked={formValues.project_amenities["3BHK"]}
                            className='mr-3 h-4 w-4'
                            onClick={(e) => {
                                // console.log(e.target.checked)
                                const existing = {...formValues};
                                const temp = {...existing.project_amenities};
                                temp["3BHK"] = !temp["3BHK"]
                                existing.project_amenities = temp;
                                setFormValues(existing)
                            }}
                        /> <div className='text-[#505050] text-[14px]'>3BHK</div>
                </div>
                <div className="flex  items-center space-x-2">
                     <input
                            type="checkbox"
                            checked={formValues.project_amenities.penthouse}
                            className='mr-3 h-4 w-4'
                            onClick={(e) => {
                                // console.log(e.target.checked)
                                const existing = {...formValues};
                                const temp = {...existing.project_amenities};
                                temp.penthouse = !temp.penthouse
                                existing.project_amenities = temp;
                                setFormValues(existing)
                            }}
                        />
                  
                  
                  
                   <div className='text-[#505050] text-[14px]'>Penthouse</div>
                </div>
                <div className="flex  items-center space-x-2">
                     <input
                            type="checkbox"
                            checked={formValues.project_amenities.other}
                            className='mr-3 h-4 w-4'
                            onClick={(e) => {
                                // console.log(e.target.checked)
                                const existing = {...formValues};
                                const temp = {...existing.project_amenities};
                                temp.other = !temp.other
                                existing.project_amenities = temp;
                                setFormValues(existing)
                            }}
                        />
                  
                  
                   <div className='text-[#505050] text-[14px]'>Other</div>
                </div>
              </div>
            </div>
            <div className="mt-6">
              <div className="text-[#505050] text-[13px] ">Other Amenities</div>
              <input className='w-52 h-5 border-[#C6C6C6] border-[1px] rounded-sm px-3 text-[11px]' type="text" name="otheramenities" value={formValues.project_amenities.otheramenities} onChange={handleProjectAmenitiesChange} />
            </div>
          </div>
          <div className="flex space-x-4">
            <div className="space-y-4">
              <div className="">
                <div className="text-[13px]">Project Legal Status <label className="text-red-500">*</label></div>
                <select className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" name="project_legal_status" value={formValues.project_info.project_legal_status} onChange={handleProjectInfoChange} >
                  <option value="none" hidden> Select Project Legal Status</option>
                  {projectLegalData.map(item => (
                    <option key={item.id} value={item.id}>
                      {item.name}
                    </option>
                  ))}
                </select>
                <div className="w-full text-[9.5px] text-[#CD0000] absolute ">{formErrors.project_legal_status}</div>
              </div>
              <div className="">
                <div className="text-[13px]">Completion Year</div>
                <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="number" name="completionyear" value={formValues.project_info.completionyear} onChange={handleProjectInfoChange}/>
              </div>
              <div className="">
                <div className="text-[13px]">Taluka</div>
                <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="text" name="taluka" value={formValues.project_info.taluka} onChange={handleProjectInfoChange}/>
              </div>
              <div className="">
                <div className="text-[13px]">Police Chowkey</div>
                <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="text" name="policechowkey" value={formValues.project_info.policechowkey} onChange={handleProjectInfoChange} />
              </div>
              <div className="">
                <div className="text-[13px]">Maintenance Detail</div>
                <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="text" name="maintenance_details" value={formValues.project_info.maintenance_details} onChange={handleProjectInfoChange}/>
              </div>
              <div className="">
                <div className="text-[13px]">Number of Buildings</div>
                <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="text" name="numberofbuildings" value={formValues.project_info.numberofbuildings} onChange={handleProjectInfoChange}/>
              </div>
              <div className="">
                <div className="text-[13px]">Number of Floors</div>
                <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="number" name="numberoffloors" value={formValues.project_info.numberoffloors} onChange={handleProjectInfoChange} />
              </div>
            </div>
          </div>
          <div className="flex space-x-4">
            <div className="space-y-4">
              <div className="">
                <div className="text-[13px]">Rules</div>
                <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="test" name="rules" value={formValues.project_info.rules} onChange={handleProjectInfoChange} />
              </div>
              <div className="">
                <div className="text-[13px]">Jurisdiction</div>
                <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]"  type="text" name="jurisdiction" value={formValues.project_info.jurisdiction} onChange={handleProjectInfoChange} />
              </div>
              <div className="">
                <div className="text-[13px]">Corporation Ward</div>
                <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="text" name="corporationward" value={formValues.project_info.corporationward} onChange={handleProjectInfoChange}/>
              </div>
              <div className="">
                <div className="text-[13px]">Police Station</div>
                <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="text" name="policestation"  value={formValues.project_info.policestation} onChange={handleProjectInfoChange}/>
              </div>
              <div className="">
                <div className="text-[13px]">Dues Payable Month</div>
                <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="number" name="duespayablemonth" value={formValues.project_info.duespayablemonth} onChange={handleProjectInfoChange} />
              </div>
              <div className="">
                <div className="text-[13px]">Approx Total Units</div>
                <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="number" name="approxtotalunits" value={formValues.project_info.approxtotalunits} onChange={handleProjectInfoChange} />
              </div>
              <div className="">
                <div className="text-[13px]">Other Details</div>
                <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="text" name="otherdetails" value={formValues.project_info.otherdetails} onChange={handleProjectInfoChange} />
              </div>
            </div>
          </div>
        </div>
        
      
    </>
  )
}

export default ProjectDetails
