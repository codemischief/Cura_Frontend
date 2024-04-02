import React from 'react';
import { useState, useEffect, useRef } from 'react';
import Checkbox from '@mui/material/Checkbox';

const ClientInformation = () => {
    const [Salutation, setSalutation] = useState([]);
    const [clientProperty, setClientProperty] = useState([]);
    const [country, setCountry] = useState([]);
    const [city, setCity] = useState([]);
    const [clientType, setClientType] = useState([]);
    const [tenetOf, setTenetOf] = useState([]);
    const [state, setState] = useState([]);
    const [source, setSource] = useState([]);
    const [employeeName, setEmployeeName] = useState([]);
    return (
        <div className="h-auto w-full">
            <div className="flex gap-10 justify-center items-center">
                <div className=" space-y-2 ">
                    <div className="">
                        <div className="text-[14px]">Salutation <label className="text-red-500">*</label></div>
                        <select className="text-[12px] pl-4 w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm" name="salutation" >
                            <option >Select Salutation</option>
                            {Salutation && Salutation.map(item => (
                                <option key={item} value={item}>
                                    {item[1]}
                                </option>
                            ))}
                        </select>
                        {/* <div className="text-[12px] text-[#CD0000] ">{formErrors.modeofpayment}</div> */}
                    </div>
                    <div className="">
                        <div className="text-[14px]">Client Name <label className="text-red-500">*</label></div>
                        <input className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="clientName" />
                        {/* <div className="text-[12px] text-[#CD0000] ">{formErrors.amount}</div> */}
                    </div>
                    <div className="">
                        <div className="text-[14px]">Client property </div>
                        <select className="text-[12px] pl-4 w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm" name="clientProperty" >
                            <option >Select Client property</option>
                            {clientProperty && clientProperty.map(item => (
                                <option key={item} value={item}>
                                    {item[1]}
                                </option>
                            ))}
                        </select>
                        {/* <div className="text-[12px] text-[#CD0000] ">{formErrors.modeofpayment}</div> */}
                    </div>
                    <div className="">
                        <div className="text-[14px]">Country <label className="text-red-500">*</label></div>
                        <select className="text-[12px] pl-4 w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm" name="country" >
                            <option >Select Country</option>
                            {country && country.map(item => (
                                <option key={item} value={item}>
                                    {item[1]}
                                </option>
                            ))}
                        </select>
                        {/* <div className="text-[12px] text-[#CD0000] ">{formErrors.modeofpayment}</div> */}
                    </div>
                    <div className="">
                        <div className="text-[14px]">City <label className="text-red-500">*</label></div>
                        <select className="text-[12px] pl-4 w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm" name="city" >
                            <option >Select City</option>
                            {city && city.map(item => (
                                <option key={item} value={item}>
                                    {item[1]}
                                </option>
                            ))}
                        </select>
                        {/* <div className="text-[12px] text-[#CD0000] ">{formErrors.modeofpayment}</div> */}
                    </div>
                    <div className="">
                        <div className="text-[14px]">Address Line 1 </div>
                        <input className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="add1" />
                        {/* <div className="text-[12px] text-[#CD0000] ">{formErrors.amount}</div> */}
                    </div>
                    <div className="">
                        <div className="text-[14px]">Pin Code </div>
                        <input className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="pincode" />
                        {/* <div className="text-[12px] text-[#CD0000] ">{formErrors.amount}</div> */}
                    </div>
                </div>
                <div className="space-y-2">
                    <div className="">
                        <div className="text-[14px]">Client Type <label className="text-red-500">*</label></div>
                        <select className="text-[12px] pl-4 w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm" name="city" >
                            <option >Select Client Type </option>
                            {city && city.map(item => (
                                <option key={item} value={item}>
                                    {item[1]}
                                </option>
                            ))}
                        </select>
                        {/* <div className="text-[12px] text-[#CD0000] ">{formErrors.modeofpayment}</div> */}
                    </div>
                    <div className="">
                        <div className="text-[14px]">Tenent Of </div>
                        <select className="text-[12px] pl-4 w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm" name="tenentOf" >
                            <option >Select tenent of </option>
                            {tenetOf && tenetOf.map(item => (
                                <option key={item} value={item}>
                                    {item[1]}
                                </option>
                            ))}
                        </select>
                        {/* <div className="text-[12px] text-[#CD0000] ">{formErrors.modeofpayment}</div> */}
                    </div>
                    <div className="">
                        <div className="text-[14px]">Client ID </div>
                        <input className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="clientId" />
                        {/* <div className="text-[12px] text-[#CD0000] ">{formErrors.amount}</div> */}
                    </div>
                    <div className="">
                        <div className="text-[14px]">State <label className="text-red-500">*</label></div>
                        <select className="text-[12px] pl-4 w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm" name="state" >
                            <option >Select State </option>
                            {state && state.map(item => (
                                <option key={item} value={item}>
                                    {item[1]}
                                </option>
                            ))}
                        </select>
                        {/* <div className="text-[12px] text-[#CD0000] ">{formErrors.modeofpayment}</div> */}
                    </div>
                    <div className="">
                        <div className="text-[14px]">Area/Locality </div>
                        <input className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="area" />
                        {/* <div className="text-[12px] text-[#CD0000] ">{formErrors.amount}</div> */}
                    </div>
                    <div className="">
                        <div className="text-[14px]">Address Line 2 </div>
                        <input className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="add2" />
                        {/* <div className="text-[12px] text-[#CD0000] ">{formErrors.amount}</div> */}
                    </div>
                </div>
                <div className="space-y-2">
                    <div className="">
                        <div className="text-[14px]">Email 1 <label className="text-red-500">*</label></div>
                        <input className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="email1" />
                        {/* <div className="text-[12px] text-[#CD0000] ">{formErrors.amount}</div> */}
                    </div>
                    <div className="">
                        <div className="text-[14px]">Mobile Phone </div>
                        <input className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="mobilePhone" />
                        {/* <div className="text-[12px] text-[#CD0000] ">{formErrors.amount}</div> */}
                    </div>
                    <div className="">
                        <div className="text-[14px]">Work Phone </div>
                        <input className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="workPhone" />
                        {/* <div className="text-[12px] text-[#CD0000] ">{formErrors.amount}</div> */}
                    </div>
                    <div className="">
                        <div className="text-[14px]">Local Contact 1 Name </div>
                        <input className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="localContact1Name" />
                        {/* <div className="text-[12px] text-[#CD0000] ">{formErrors.amount}</div> */}
                    </div>
                    <div className="">
                        <div className="text-[14px]">Local Contact 1 Details </div>
                        <input className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="localContact1Details" />
                        {/* <div className="text-[12px] text-[#CD0000] ">{formErrors.amount}</div> */}
                    </div>
                    <div className="">
                        <div className="text-[14px]">Local Contact 1 Address </div>
                        <input className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="localContact1Address" />
                        {/* <div className="text-[12px] text-[#CD0000] ">{formErrors.amount}</div> */}
                    </div>
                    <div className="">
                        <div className="text-[14px]">Source <label className="text-red-500">*</label></div>
                        <select className="text-[12px] pl-4 w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm" name="source" >
                            <option >Select entity </option>
                            {source && source.map(item => (
                                <option key={item} value={item}>
                                    {item[1]}
                                </option>
                            ))}
                        </select>
                        {/* <div className="text-[12px] text-[#CD0000] ">{formErrors.modeofpayment}</div> */}
                    </div>
                </div>
                <div className="space-y-2">
                    <div className="">
                        <div className="text-[14px]">Email 2 </div>
                        <input className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="email2" />
                        {/* <div className="text-[12px] text-[#CD0000] ">{formErrors.amount}</div> */}
                    </div>
                    <div className="">
                        <div className="text-[14px]">homePhone </div>
                        <input className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="homePhone" />
                        {/* <div className="text-[12px] text-[#CD0000] ">{formErrors.amount}</div> */}
                    </div>
                    <div className="">
                        <div className="text-[14px]">Employee Name <label className="text-red-500">*</label></div>
                        <select className="text-[12px] pl-4 w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm" name="employeeName" >
                            <option > </option>
                            {employeeName && employeeName.map(item => (
                                <option key={item} value={item}>
                                    {item[1]}
                                </option>
                            ))}
                        </select>
                        {/* <div className="text-[12px] text-[#CD0000] ">{formErrors.modeofpayment}</div> */}
                    </div>
                    <div className="">
                        <div className="text-[14px]">Local Contact 2 Name </div>
                        <input className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="localContact2Name" />
                        {/* <div className="text-[12px] text-[#CD0000] ">{formErrors.amount}</div> */}
                    </div>
                    <div className="">
                        <div className="text-[14px]">Local Contact 2 Details </div>
                        <input className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="localContact2Details" />
                        {/* <div className="text-[12px] text-[#CD0000] ">{formErrors.amount}</div> */}
                    </div>
                    <div className="">
                        <div className="text-[14px]">Local Contact 2 Address </div>
                        <input className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="localContact2Address" />
                        {/* <div className="text-[12px] text-[#CD0000] ">{formErrors.amount}</div> */}
                    </div>
                    <div className="">
                        <div className="text-[14px]">Comments </div>
                        <input className="text-[12px] pl-4 w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm" type="text" name="comments" />
                        {/* <div className="text-[12px] text-[#CD0000] ">{formErrors.amount}</div> */}
                    </div>
                </div>
            </div>
            <div className="mt-[10px] flex justify-center items-center"><Checkbox label="Active" />Exclude from Mailing List</div>
        </div>
    )
}

export default ClientInformation
