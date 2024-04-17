import React, { useState } from 'react'
import Cross from "../../../assets/cross.png"
import { Modal } from '@mui/material'
const EditPmaAgreement = ({handleClose}) => {
    const handleChange = () => {

    }
    const initialValues = {
        pmaStartDate : null,
        poaStartDate : null,
        actualEndDate : null,
        reason : "Bugs",
        rentFee : 100,
        pmaEndDate : null,
        poaEndDate : null,
        poaHolderName : "Abhishek",
        description : "spacious",
        scan : "example",
        fixedfee : 56,
    }
    const [formErrors,setFormErrors] = useState({})
    const [formValues,setFormValues] = useState(initialValues)
    const order = [];
    const clientProperty = [];
  return (
    <Modal open={true}
    fullWidth={true}
    maxWidth={'md'}
    className='flex justify-center items-center'
>
    <div className='flex justify-center'>
        <div className="w-[1050px] h-auto bg-white rounded-lg">
            <div className="h-[40px] bg-[#EDF3FF]  justify-center flex items-center rounded-t-lg">
                <div className="mr-[410px] ml-[410px]">
                    <div className="text-[16px]">Edit PMA Agreement</div>
                </div>
                <div className="flex justify-center items-center rounded-full w-[30px] h-[30px] bg-white">
                    <button onClick={handleClose}><img  className="w-[20px] h-[20px]" src={Cross} alt="cross" /></button>
                </div>
            </div>

            <div className="h-auto w-full mt-[5px]">
                <div className="flex gap-[48px] justify-center ">
                    <div className=" space-y-3 py-5">
                        <div className="">
                            <div className="text-[13px]">
                                Client <label className="text-red-500">*</label>
                            </div>
                            {/* <AsyncSelect
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
/> */}
                            <div className="text-[10px] text-[#CD0000] ">{formErrors.client}</div>
                        </div>
                        <div className="">
                            <div className="text-[13px]">PMA Start Date <label className="text-red-500">*</label></div>
                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="date" name="pmaStartDate" value={formValues.pmaStartDate} onChange={handleChange} />
                            <div className="text-[10px] text-[#CD0000] ">{formErrors.pmaStartDate}</div>
                        </div>
                        <div className="">
                            <div className="text-[13px]">POA Start Date <label className="text-red-500">*</label></div>
                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="date" name="poaStartDate" value={formValues.poaStartDate} onChange={handleChange} />
                            <div className="text-[10px] text-[#CD0000] ">{formErrors.poaStartDate}</div>
                        </div>
                        <div className="">
                            <div className="text-[13px]">
                                Order <label className="text-red-500">*</label>
                            </div>
                            <select
                                className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]"
                                name="order"
                                value={formValues.order}
                                onChange={handleChange}
                            >
                                {order.map((item) => (
                                    <option key={item} value={item}>
                                        {item}
                                    </option>
                                ))}
                            </select>
                            <div className="text-[10px] text-[#CD0000] ">{formErrors.order}</div>
                        </div>
                        <div className="">
                            <div className="text-[13px]">Actual End Date </div>
                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="date" name="actualEndDate" value={formValues.actualEndDate} onChange={handleChange} />
                            <div className="text-[10px] text-[#CD0000] ">{formErrors.actualEndDate}</div>
                        </div>
                        <div className="">
                            <div className="text-[13px]">Reason for Early Termination if Applicable </div>
                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="text" name="reason" value={formValues.reason} onChange={handleChange} />

                        </div>
                        <div className="">
                            <div className="text-[13px]">Rented Fee in % </div>
                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="text" name="rentFee" value={formValues.rentFee} onChange={handleChange} />
                        </div>
                        <div className=" flex items-center "><input
                            type="checkbox"
                            checked={formValues.gst1}
                            className='mr-3 h-4 w-4'
                            onClick={(e) => {
                                // console.log(e.target.checked)
                                const existing = { ...formValues };
                                existing.gst1 = !existing.gst1;
                                setFormValues(existing)
                            }}
                        />Gst Additional ?</div>
                    </div>
                    <div className=" space-y-3 py-5">
                        <div className="">
                            <div className="text-[13px]">
                                Client Property <label className="text-red-500">*</label>
                            </div>
                            <select
                                className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]"
                                name="clientProperty"
                                value={formValues.clientProperty}
                                onChange={handleChange}
                            >
                                {clientProperty.map((item) => (
                                    <option key={item} value={item}>
                                        {item}
                                    </option>
                                ))}
                            </select>
                            <div className="text-[10px] text-[#CD0000] ">{formErrors.clientProperty}</div>
                        </div>
                        <div className="">
                            <div className="text-[13px]">PMA End Date <label className="text-red-500">*</label></div>
                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="date" name="pmaEndDate" value={formValues.pmaEndDate} onChange={handleChange} />
                            <div className="text-[10px] text-[#CD0000] ">{formErrors.pmaEndDate}</div>
                        </div>
                        <div className="">
                            <div className="text-[13px]">POA End Date </div>
                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="date" name="poaEndDate" value={formValues.poaEndDate} onChange={handleChange} />
                            <div className="text-[10px] text-[#CD0000] ">{formErrors.poaEndDate}</div>
                        </div>
                        <div className="">
                            <div className="text-[13px]">POA Holder Name </div>
                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="text" name="poaHolderName" value={formValues.poaHolderName} onChange={handleChange} />
                        </div>
                        <div className="">
                            <div className="text-[13px]">Description </div>
                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="text" name="description" value={formValues.description} onChange={handleChange} />
                        </div>
                        <div className="">
                            <div className="text-[13px]">Scan Copy </div>
                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="text" name="scan" value={formValues.scan} onChange={handleChange} />
                        </div>
                        <div className="">
                            <div className="text-[13px]">Fixed Fees in Rs </div>
                            <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]" type="text" name="fixedfee" value={formValues.fixedfee} onChange={handleChange} />
                        </div>
                        <div className=" flex items-center "><input
                            type="checkbox"
                            checked={formValues.gst2}
                            className='mr-3 h-4 w-4'
                            onClick={(e) => {
                                // console.log(e.target.checked)
                                const existing = { ...formValues };
                                existing.gst2 = !existing.gst2;
                                setFormValues(existing)
                            }}
                        />Gst Additional ?</div>
                    </div>
                </div>
            </div>
            <div className="mt-2 flex justify-center items-center "><input
                type="checkbox"
                checked={formValues.status}
                className='mr-3 h-4 w-4'
                onClick={(e) => {
                    // console.log(e.target.checked)
                    const existing = { ...formValues };
                    existing.status = !existing.status;
                    setFormValues(existing)
                }}
            />Active</div>
            <div className="my-3 flex justify-center items-center gap-[10px]">
                <button className='w-[100px] h-[35px] bg-[#004DD7] text-white rounded-md' onClick={() => {}} >Update</button>
                <button className='w-[100px] h-[35px] border-[1px] border-[#282828] rounded-md' onClick={handleClose}>Cancel</button>
            </div>
        </div>
    </div>
</Modal>
  )
}

export default EditPmaAgreement
