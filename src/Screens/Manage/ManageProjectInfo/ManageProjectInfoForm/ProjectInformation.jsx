import React from "react";
import Checkbox from "@mui/material/Checkbox";
import { useState , useEffect } from "react";
import { APIService } from '../../../../services/API';
const ProjectInformation = () => {
    //For closing a modal
    // const handleDialogClose = () => {
    //     props.setOpenDialog(false);
    // };

    // hardcoded dropdowns 
    const selectedProjectType =[1,2,3,4];
    const selectedBuilderName = [1,2,3,4];

    const [allCountry, setAllCountry] = useState([]);
    const [allState, setAllState] = useState([]);
    const [allCity, setAllCity] = useState([]);

    const fetchCountryData = async () => {
        // const data = { "user_id":  1234 };
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
        console.log(result.data);

        if (Array.isArray(result.data)) {
            setAllCountry(result.data);
        }
        console.log(result.data);
    };
    const fetchStateData = async (id) => {
        console.log(id);
        const data = { user_id: 1234, country_id: id };
        // const data = {"user_id":1234,"rows":["id","state"],"filters":[],"sort_by":[],"order":"asc","pg_no":0,"pg_size":0};
        const response = await APIService.getState(data);
        const result = (await response.json()).data;
        console.log(result);
        if (Array.isArray(result)) {
            setAllState(result);
        }
    };
    const fetchCityData = async (id) => {
        const data = { user_id: 1234, state_name: id };
        const response = await APIService.getCities(data);
        const result = (await response.json()).data;
        console.log(result);
        if (Array.isArray(result)) {
            setAllCity(result);
            // if (result.length > 0) {
            //     setFormValues((existing) => {
            //         const newData = { ...existing, city: result[0].id }
            //         return newData;
            //     })
            // }
        }
    };

    useEffect(() => {
        fetchCountryData();
        fetchStateData(5);
        fetchCityData("Maharashtra");
    }, []);

    //Validation of the form
    const initialValues = {
        projectName: "",
        projectType: "",
        addressLine1: "",
        country: "",
        state: "",
        city: "",
        suburb: "",
        builderName: "",
    };
    const [formValues, setFormValues] = React.useState(initialValues);
    const [formErrors, setFormErrors] = React.useState({});

    // handle changes in input form
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        // setFormErrors(validate(formValues)); // validate form and set error message
        setIsSubmit(true);
    };
    // validate form and to throw Error message
    const validate = (values) => {
        const errors = {};
        if (!values.projectName) {
            errors.projectName = "Enter the name of the project!";
        }
        if (!values.projectType) {
            errors.projectType = "Enter project type!";
        }
        if (!values.addressLine1) {
            errors.addressLine1 = "Enter address!";
        }
        if (!values.country) {
            errors.country = "Enter country!";
        }
        if (!values.state) {
            errors.state = "Enter state!";
        }
        if (!values.city) {
            errors.city = "Enter city!";
        }
        if (!values.suburb) {
            errors.suburb = "Enter suburb!";
        }
        if (!values.builderName) {
            errors.builderName = "Enter the name of the builder!";
        }
        return errors;
    };
    const handleDialogClose = () => { };
    return (
        <>
            <div className="flex items-center justify-evenly mt-5 ">
                <div className="space-y-2">
                    <div className="">
                        <div className="text-[13px]">
                            Project Name <label className="text-red-500">*</label>
                        </div>
                        <input
                            type="text"
                            className="border-[#C6C6C6] border-[1px] rounded-sm w-56 h-5 px-3 text-[11px]"
                            name="projectName"
                            value={formValues.projectName}
                            onChange={handleChange}
                        />
                        {/* <div className="text-[10px] text-[#CD0000] ">{formErrors.projectName}</div> */}
                    </div>
                    <div className="">
                        <div className="text-[13px]">
                            Project Type <label className="text-red-500">*</label>
                        </div>
                        <select
                            className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]"
                            name="projectType"
                            value={formValues.projectType}
                            onChange={handleChange}
                        >
                            {selectedProjectType.map((item) => (
                                <option key={item} value={item}>
                                    {item}
                                </option>
                            ))}
                        </select>
                        {/* <div className="text-[10px] text-[#CD0000] ">{formErrors.projectType}</div> */}
                    </div>
                    <div className="">
                        <div className="text-[13px]">
                            Address Line 1 <label className="text-red-500">*</label>
                        </div>
                        <input
                            type="text"
                            className="border-[#C6C6C6] border-[1px] rounded-sm w-56 h-5 px-3 text-[11px]"
                            name="addressLine1"
                            value={formValues.addressLine1}
                            onChange={handleChange}
                        />
                        {/* <div className="text-[10px] text-[#CD0000] ">{formErrors.addressLine1}</div> */}
                    </div>
                    <div className="">
                        <div className="text-[13px]">
                            Country Name<label className="text-red-500">*</label>
                        </div>
                        <select
                            className="w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]"
                            name="country"
                            value={formValues.country}
                            defaultValue="Select Country"
                            onChange={(e) => {
                                // setselectedCountry(e.target.value);
                                // fetchStateData(e);
                                // console.log(e.target.value);
                                setCurrCountry(e.target.value);
                                fetchStateData(e.target.value);
                                setFormValues((existing) => {
                                    const newData = { ...existing, country: e.target.value };
                                    return newData;
                                });
                                // fetchStateData(res);
                            }}
                        >
                            <option value="none" hidden={true}>
                                Select a Country
                            </option>
                            {allCountry &&
                                allCountry.map((item) => (
                                    <option value={item[0]}>{item[1]}</option>
                                ))}
                        </select>
                        <div className="text-[10px] text-[#CD0000] ">
                            {formErrors.country}
                        </div>
                    </div>
                    <div className="">
                        <div className="text-[13px]">State Name</div>
                        <select
                            className="w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]"
                            name="state"
                            value={formValues.state}
                            defaultValue="Select State"
                            onChange={(e) => {
                                fetchCityData(e.target.value);
                                setFormValues((existing) => {
                                    const newData = { ...existing, state: e.target.value };
                                    return newData;
                                });
                            }}
                        >
                            <option value="none" hidden={true}>
                                Select a State
                            </option>
                            {allState &&
                                allState.map((item) => (
                                    <option value={item[0]}>{item[0]}</option>
                                ))}
                        </select>
                    </div>
                    <div className="">
                        <div className="text-[13px]">City Name </div>
                        <select className="w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]"
                            name="city"
                            value={formValues.city}
                            defaultValue="Select City"
                            onChange={e => {

                                console.log(e.target.value);
                                setFormValues((existing) => {
                                    const newData = { ...existing, city: e.target.value }
                                    return newData;
                                })

                            }}
                        >
                            <option value="none" hidden={true}>Select a City</option>
                            {allCity && allCity.map(item => (
                                <option value={item.city} >
                                    {item.city}
                                </option>
                            ))}
                        </select>

                    </div>
                    <div className="">
                        <div className="text-[13px]">
                            Suburb<label className="text-red-500">*</label>
                        </div>
                        <input
                            type="text"
                            className="border-[#C6C6C6] border-[1px] rounded-sm w-56 h-5 px-3 text-[11px]"
                            name="suburb"
                            value={formValues.suburb}
                            onChange={handleChange}
                        />
                        <div className="text-[10px] text-[#CD0000] ">
                            {formErrors.suburb}
                        </div>
                    </div>
                </div>
                <div className="space-y-2">
                    <div className="">
                        <div className="text-[13px]">
                            Builder Name <label className="text-red-500">*</label>
                        </div>
                        <select
                            className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]"
                            name="builderName"
                            value={formValues.builderName}
                            onChange={handleChange}
                        >
                            {selectedBuilderName.map((item) => (
                                <option key={item} value={item}>
                                    {item}
                                </option>
                            ))}
                        </select>
                        {/* <div className="text-[10px] text-[#CD0000] ">{formErrors.builderName}</div> */}
                    </div>
                    <div className="">
                        <div className="text-[13px]">Mailing Group</div>
                        <input
                            type="text"
                            className="border-[#C6C6C6] border-[1px] rounded-sm w-56 h-5 px-3 text-[11px]"
                        />
                    </div>
                    <div className="">
                        <div className="text-[13px]">Address Line 2</div>
                        <input
                            type="text"
                            className="border-[#C6C6C6] border-[1px] rounded-sm w-56 h-5 px-3 text-[11px]"
                        />
                    </div>
                    <div className="">
                        <div className="text-[13px]">Zip code</div>
                        <input
                            type="text"
                            className="border-[#C6C6C6] border-[1px] rounded-sm w-56 h-5 px-3 text-[11px]"
                        />
                    </div>
                    <div className="">
                        <div className="text-[13px]">Nearest Landmark</div>
                        <input
                            type="text"
                            className="border-[#C6C6C6] border-[1px] rounded-sm w-56 h-5 px-3 text-[11px]"
                        />
                    </div>
                    <div className="">
                        <div className="text-[13px]">Subscribed E-mail</div>
                        <input
                            type="text"
                            className="border-[#C6C6C6] border-[1px] rounded-sm w-56 h-5 px-3 text-[11px]"
                        />
                    </div>
                    <div className="">
                        <div className="text-[13px]">Website</div>
                        <input
                            type="text"
                            className="border-[#C6C6C6] border-[1px] rounded-sm w-56 h-5 px-3 text-[11px]"
                        />
                    </div>
                </div>
            </div>
            <div className="flex justify-center items-center space-x-2 mt-2">
                <div className=" flex justify-center items-center font-semibold text-[12px]">
                    <Checkbox label="Active" />
                    Tenet woking bachlors allowed
                </div>
                <div className=" flex justify-center items-center font-semibold text-[12px]">
                    <Checkbox label="Active" />
                    Tenet student allowed
                </div>
                <div className=" flex justify-center items-center font-semibold text-[12px]">
                    <Checkbox label="Active" />
                    Tenet Foreigners allowed
                </div>
            </div>
        </>
    );
};

export default ProjectInformation;
