import React from 'react'
import { Modal, useScrollTrigger } from '@mui/material';
import { useState , useEffect} from 'react';
import Cross from "../../../assets/cross.png"
import { APIService } from '../../../services/API';
import Draggable from 'react-draggable';
const EditCityModal = ({handleClose,initialCountry,initialData,openSuccess}) => {
    console.log(initialData)
    // const [allCountry,setAllCountry] = useState(initialCountry) 
    const initialValues = {
        country : 5,
        state : null,
        cityName: null,
    };
    const [formValues,setFormValues] = useState(initialValues)
    const [formErrors,setFormErrors] = useState({})

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };
    useEffect(() => {
    //    setAllCountry(initialCountry)
    const temp = {...formValues}
    temp.country = initialData.countryid 
    temp.cityName = initialData.city 
    temp.state = initialData.state
    setFormValues(temp)
    },[])

    const validate = () => {
        var res = true;
       
        if (!formValues.country || formValues.country == "") {
            setFormErrors((existing) => {
                return { ...existing, country: "Select Country" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, country: "" }
            })
        }
        if (!formValues.state || formValues.state == "") {
            setFormErrors((existing) => {
                return { ...existing, state: "Enter State" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, state: "" }
            })
        }
        if (!formValues.cityName || formValues.cityName == "") {
            setFormErrors((existing) => {
                return { ...existing, cityName: "Enter City" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, cityName: "" }
            })
        }

        return res;
    }
    const handleEdit = async () => {
        if(!validate()) return ;
        const data = {
            "user_id":1234,
            "city":formValues.cityName,
            "state":formValues.state,
            "countryid":formValues.country,
            "id":initialData.id
        }
        const response = await APIService.editCities(data)
        const res = await response.json()
        console.log(res)
        if(res.result == 'success') {
            openSuccess()
        }
    }
    
  return (
    <Modal open={true} 
    fullWidth={true} 
    maxWidth={"md"}
    className="flex justify-center items-center"
    >
        <>
            <Draggable handle="div.move">
        <div className="flex justify-center ">
            <div className="w-[800px]  h-auto bg-white rounded-lg relative">
                <div className='move cursor-move'>

                <div className="h-[40px] bg-[#EDF3FF]  justify-center flex items-center rounded-t-lg">
                    <div className="">
                        <div className="text-base"> Edit City</div>
                    </div>
                    <div className="flex justify-center items-center rounded-full w-7 h-7  bg-white absolute right-3">
                        <button onClick={handleClose}>
                            <img className="w-5 h-5 " src={Cross} alt="cross" />
                        </button>
                    </div>
                </div>
                </div>
                <div className="h-auto w-full mt-4 mb-20 ">
                    <div className="flex gap-12 justify-center items-center">
                        <div className=" space-y-3 py-5">
                        <div className="">
                                <div className="text-sm">Country Name <label className="text-red-500">*</label></div>
                                <select className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none"
                                    name="country"
                                    value={formValues.country}
                                    defaultValue="Select Country"
                                    onChange={e => {
                                        // setCurrCountry(e.target.value);
                                        setFormValues((existing) => {
                                            const newData = { ...existing, country: e.target.value }
                                            return newData;
                                        })
                                        // fetchStateData(res);
                                    }}
                                >
                                    {initialCountry && initialCountry.map(item => {
                                        return <option value={item[0]}> {item[1]}</option>
                                    })}
                                </select>
                                
                            </div>
                            <div className="">
                                <div className="text-sm">State Name <label className="text-red-500">*</label></div>
                                <input
                                    className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none"
                                    type="text"
                                    name="state"
                                    value={formValues.state}
                                    onChange={handleChange}
                                />
                                
                                <div className="h-[25px] w-56 text-[9px] mt-[3px] text-[#CD0000] absolute">{formErrors.state}</div>
                            </div>
                            <div className="">
                                <div className="text-sm">
                                   Enter City Name<label className="text-red-500">*</label>
                                </div>
                                <input
                                    className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none"
                                    type="text"
                                    name="cityName"
                                    value={formValues.cityName}
                                    onChange={handleChange}
                                />
                               <div className="h-[25px] w-56 text-[9px] mt-[3px] text-[#CD0000] absolute">{formErrors.cityName}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="my-2 flex justify-center items-center gap-[10px]">
                    <button
                        className="w-[100px] h-[35px] bg-[#004DD7] text-white rounded-md"
                        type="submit"
                        onClick={handleEdit}
                    >
                        Save
                    </button>
                    <button
                        className="w-[100px] h-[35px] border-[1px] border-[#282828] rounded-md"
                        onClick={handleClose}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
            </Draggable>
            </>
    </Modal>
  )
}

export default EditCityModal
