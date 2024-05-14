import { Modal } from "@mui/material";
import React, { useEffect, useState } from "react";
import Draggable from "react-draggable";
import Cross from "../../../assets/cross.png";
import { Link } from "react-router-dom";
import { APIService } from "../../../services/API";

const EditForm = ({ isOpen, handleClose, item, fetchData, openPrompt,openAddSuccess }) => {
  const [countryData, setCountryData] = useState([]);
  const [stateData, setStateData] = useState([]);
  const [cityData, setCityData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    countryId: item?.country ? item.country : "",
    state: item?.state ? item.state : "",
    city: item?.city ? item.city : "",
    personname: item?.personname ? item.personname : "",
    possibleservices: item?.possibleservices ? item.possibleservices : "",
    propertylocation: item?.propertylocation ? item.propertylocation : "",
    suburb: item?.suburb ? item.suburb : "",
    id: item?.id ? item.id : undefined,
  });

  const fetchCountryData = async () => {
    setLoading(true);
    const data = {
      user_id: 1234,
      rows: ["id", "name"],
      filters: [],
      sort_by: [],
      order: "asc",
      pg_no: 0,
      pg_size: 0,
    };
    const response = await APIService.getCountries(data);
    const result = (await response.json()).data;
    setLoading(false);
    setCountryData(result.data);
  };



  // useEffect(() => {
  
  //   fetchCountryData();
    
  //   fetchStateData(item.country);
  //   fetchCity(item.state);
  // }, [item]);

  useEffect(()=>{

    fetchCountryData();
  },[])


  const fetchStateData = async (id) => {
    const data = { user_id: 1234, country_id: id };
    const response = await APIService.getState(data);
    const result = await response.json();
    setStateData(result.data);
  };

  const fetchCity = async (id) => {
    const data = { user_id: 1234, state_name: id };
    const response = await APIService.getCities(data);
    const result = await response.json();
    setCityData(result.data);
  };

  const handleCountrySelect = (e) => {
    setForm({ ...form, countryId: e.target.value });
    fetchStateData(e.target.value);
  };

  const handleState = (e) => {
    setForm({ ...form, city: e.target.value });
    fetchCity(e.target.value);
  };

  const handleChange = (e) => {
    console.log(e.target.value,"e.taget.value",e.target.name);
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };


  const handleEdit = async () => {
    const data = {
        "user_id": 1234,
        "id": form.id,
        "personname": form.personname,
        "suburb": form.suburb,
        "city": form.city,
        "state": form.state,
        "country": form.countryId,
        "propertylocation": form.propertylocation,
        "possibleservices": form.possibleservices,
        "dated": "2024-01-01 00:00:00",
        "createdby": 1234,
        "isdeleted": false
    }
    if(item.id){
        const response = await APIService.editProspects(data);
        openPrompt();
    }
    else{
        const response = await APIService.addProspects(data);
        openAddSuccess()
    }
    
  
}


  useEffect(() => {
    console.log(form, "formmm");
  }, [form]);

  return (
    <Modal
      open={isOpen}
      fullWidth={true}
      maxWidth={"md"}
      className="flex justify-center items-center"
    >
      <>
        <Draggable>
          <div className="flex justify-center items-center">
            <div className="w-[778px] h-auto bg-white rounded-lg">
              <div className="h-[40px] bg-[#EDF3FF]  justify-center flex items-center rounded-t-lg">
                <div className="mr-[300px] ml-[300px]">
                  <div className="text-[16px]">{item.id? 'Edit Prospect':'New Prospect'}</div>
                </div>
                <div className="flex justify-center items-center rounded-full w-[30px] h-[30px] bg-white">
                  <img
                    onClick={handleClose}
                    className="w-[20px] h-[20px] cursor-pointer"
                    src={Cross}
                    alt="cross"
                  />
                </div>
              </div>
              {/* <form > */}

              <div className="h-auto w-full mt-[5px] ">
                <div className="flex gap-[48px] justify-center items-center">
                  <div className=" space-y-[10px] py-[20px] px-[10px]">
                    <div className="">
                      <div className="text-[13px]">
                        Person name <label className="text-red-500">*</label>
                      </div>
                      <input
                        className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]"
                        type="text"
                        name="personname"
                        value={form.personname}
                        onChange={handleChange}
                      />
                      <div className="text-[10px] text-[#CD0000] ">
                        {/* {formErrors.personname} */}
                      </div>
                    </div>
                    <div className="">
                      <div className="text-[13px]">
                        Country Name<label className="text-red-500">*</label>
                      </div>
                      <select
                        className="w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]"
                        name="country"
                        value={form.countryId}
                        defaultValue="Select Country"
                        onChange={handleCountrySelect}
                        // onChange={handleCountrySelect}
                        //   onChange={(e) => {
                        //     // setselectedCountry(e.target.value);
                        //     // fetchStateData(e);
                        //     // console.log(e.target.value);
                        //     setCurrCountry(e.target.value);
                        //     fetchStateData(e.target.value);
                        //     setFormValues((existing) => {
                        //       const newData = {
                        //         ...existing,
                        //         country: e.target.value,
                        //       };
                        //       return newData;
                        //     });
                        //     // fetchStateData(res);
                        //   }}
                      >
                        <option value="none" hidden={true}>
                          Select a Country
                        </option>

                        {countryData.length > 0 &&
                          countryData?.map((item) => (
                            <option value={item[0]}>{item[1]}</option>
                          ))}
                      </select>
                      <div className="text-[10px] text-[#CD0000] ">
                        {/* {formErrors.country} */}
                      </div>
                    </div>
                    <div className="">
                      <div className="text-[13px]">
                        State Name<label className="text-red-500">*</label>
                      </div>
                      <select
                        className="w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]"
                        name="state"
                        value={form.state}
                        defaultValue="Select State"
                        onChange={
                          handleState
                          //   fetchCityData(e.target.value);
                          //   setFormValues((existing) => {
                          //     const newData = {
                          //       ...existing,
                          //       state: e.target.value,
                          //     };
                          //     return newData;
                          //   });
                        }
                      >
                        {stateData.length > 0 &&
                          stateData.map((item) => {
                            // if(item[0])

                            return <option value={item[0]}>{item[0]}</option>;
                          })}
                      </select>
                      <div className="text-[10px] text-[#CD0000] ">
                        {/* {formErrors.state} */}
                      </div>
                    </div>
                    <div className="">
                      <div className="text-[13px]">
                        City Name <label className="text-red-500">*</label>
                      </div>
                      <select
                        className="w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]"
                        name="city"
                        value={form.city}
                        defaultValue="Select State"
                        onChange={handleChange}
                        
                      >
                        {cityData.length > 0 &&
                          cityData.map((item) => {
                            return (
                              <option value={item.city} selected>
                                {item.city}
                              </option>
                            );
                          })}
                      </select>
                      <div className="text-[10px] text-[#CD0000] ">
                        {/* {formErrors.city} */}
                      </div>
                    </div>
                    <div className="">
                      <div className="text-[13px]">
                        Suburb <label className="text-red-500">*</label>
                      </div>
                      <input
                        className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]"
                        type="text"
                        name="suburb"
                        value={form.suburb}
                        onChange={handleChange}
                      />
                      <div className="text-[10px] text-[#CD0000] ">
                        {/* {formErrors.suburb} */}
                      </div>
                    </div>
                    <div className="">
                      <div className="text-[13px]">
                        Property Location{" "}
                        <label className="text-red-500">*</label>
                      </div>
                      <input
                        className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]"
                        type="text"
                        name="propertylocation"
                        value={form.propertylocation}
                        onChange={handleChange}
                      />
                      <div className="text-[10px] text-[#CD0000] ">
                        {/* {formErrors.propertyLocation} */}
                      </div>
                    </div>
                    <div className="">
                      <div className="text-[13px]">
                        Possible Services{" "}
                        <label className="text-red-500">*</label>
                      </div>
                      <input
                        className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]"
                        type="text"
                        name="possibleservices"
                        value={form.possibleservices}
                        onChange={handleChange}
                      />
                      <div className="text-[10px] text-[#CD0000] ">
                        {/* {formErrors.possibleServices} */}
                      </div>
                    </div>
                  </div>
                  <div className=" space-y-[10px] py-[20px] px-[10px]">
                    <div className="">
                      <div className="text-[13px]">Email </div>
                      <input
                        className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]"
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="">
                      <div className="text-[13px]">Phone Number </div>
                      <input
                        className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]"
                        type="text"
                        name="phoneNumber"
                        value={form.phoneNumber}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="my-5 flex justify-center items-center gap-[10px]">
                <button
                  className="w-[100px] h-[35px] bg-[#004DD7] text-white rounded-md"
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
              {/* </form> */}
            </div>
          </div>
        </Draggable>
      </>
    </Modal>
  );
};

export default EditForm;
