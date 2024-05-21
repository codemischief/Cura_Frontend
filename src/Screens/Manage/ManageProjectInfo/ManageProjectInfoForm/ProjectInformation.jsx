import React from "react";
import Checkbox from "@mui/material/Checkbox";
import { useState, useEffect } from "react";
import { APIService } from '../../../../services/API';
const ProjectInformation = ({ formValues, setFormValues, projectTypeData, builderNameData, formErrors }) => {

    const selectedProjectType = [1, 2, 3, 4];
    const selectedBuilderName = [1, 2, 3, 4];

    const [allCountry, setAllCountry] = useState([]);
    const [allState, setAllState] = useState([]);
    const [allCity, setAllCity] = useState([]);
    const [currCountry, setCurrCountry] = useState(-1);

    const fetchCountryData = async () => {
        // setPageLoading(true);
        // const data = { "user_id":  1234 };
        const data = { "user_id": 1234, "rows": ["id", "name"], "filters": [], "sort_by": [], "order": "asc", "pg_no": 0, "pg_size": 0 };
        const response = await APIService.getCountries(data)
        const result = (await response.json()).data;
        setAllCountry(result)
    }
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
        }
    };

    useEffect(() => {
        fetchCountryData();
        fetchStateData(formValues.project_info.country);
        fetchCityData(formValues.project_info.state);
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
    // const [formValues, setFormValues] = React.useState(initialValues);
    // const [formErrors, setFormErrors] = React.useState({});

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
    const handleProjectInfoChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues, project_info: {
                ...formValues.project_info,
                [name]: value
            }
        })
    }
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
                            name="projectname"
                            value={formValues.project_info.projectname}
                            onChange={handleProjectInfoChange}
                        />
                        <div className="text-[10px] text-[#CD0000] ">{formErrors.projectname}</div>
                    </div>
                    <div className="">
                        <div className="text-[13px]">
                            Project Type <label className="text-red-500">*</label>
                        </div>
                        <select
                            className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]"
                            name="project_type"
                            value={formValues.project_info.project_type}
                            onChange={handleProjectInfoChange}
                        >
                            <option value="none" hidden>Select Project Type</option>
                            {projectTypeData.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                        <div className="text-[10px] text-[#CD0000] ">{formErrors.project_type}</div>
                    </div>
                    <div className="">
                        <div className="text-[13px]">
                            Address Line 1 <label className="text-red-500">*</label>
                        </div>
                        <input
                            type="text"
                            className="border-[#C6C6C6] border-[1px] rounded-sm w-56 h-5 px-3 text-[11px]"
                            name="addressline1"
                            value={formValues.project_info.addressline1}
                            onChange={handleProjectInfoChange}
                        />
                        <div className="text-[10px] text-[#CD0000] ">{formErrors.addressline1}</div>
                    </div>
                    <div className="">
                        <div className="text-sm">Country <label className="text-red-500">*</label></div>
                        <select className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none"
                            name="country"
                            value={formValues.project_info.country}
                            defaultValue="Select Country"
                            onChange={e => {
                                setCurrCountry(e.target.value);
                                fetchStateData(e.target.value);
                                setAllCity([]);
                                const existing = { ...formValues }
                                const temp = existing.project_info;
                                temp.state = ""
                                temp.city = null;
                                existing.project_info = temp;
                                setFormValues(existing)
                                // fetchStateData(res);
                            }}
                        >

                            {allCountry && allCountry.map(item => {
                                return <option value={item.id}> {item.name}</option>
                                // if (item[0] == 5) {
                                //     return <option value={item[0]} selected>
                                //         {item[1]}
                                //     </option>
                                // } else {
                                //     return <option value={item[0]} >
                                //         {item[1]}
                                //     </option>
                                // }
                            })}
                        </select>
                        <div className="height-[10px] w-full text-[9.5px] text-[#CD0000] absolute ">{formErrors.country}</div>
                    </div>
                    <div className="">
                        <div className="text-sm">State <label className="text-red-500">*</label></div>
                        <select className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none"
                            name="state"
                            value={formValues.project_info.state}
                            defaultValue="Select State"
                            onChange={(e) => {
                                const existing = { ...formValues };
                                const temp = existing.project_info;
                                temp.state = e.target.value
                                existing.project_info = temp;
                                setFormValues(existing)
                                fetchCityData(e.target.value);
                            }}
                        >
                            <option value="" hidden> Select A State</option>
                            {allState && allState.map(item => {
                                return <option value={item[0]} >
                                    {item[0]}
                                </option>
                            })}
                        </select>
                        <div className="height-[10px] w-full text-[9.5px] text-[#CD0000] absolute ">{formErrors.state}</div>
                    </div>
                    <div className="">
                        <div className="text-sm">City <label className="text-red-500">*</label></div>
                        <select className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none"
                            name="city"
                            value={formValues.project_info.city}
                            defaultValue="Select City"
                            onChange={e => {
                                const existing = { ...formValues };
                                const temp = existing.project_info;
                                temp.city = e.target.value
                                existing.project_info = temp;
                                setFormValues(existing)
                            }}
                        >
                            {/* <option value="none" hidden={true}>Select a City</option> */}
                            <option value="none" hidden> Select A City</option>
                            {allCity && allCity.map(item => (
                                <option value={item.id} >
                                    {item.city}
                                </option>
                            ))}
                        </select>
                        <div className="height-[10px] w-full text-[9.5px] text-[#CD0000] absolute ">{formErrors.city}</div>
                    </div>
                    {/* <div className="">
                        <div className="text-[13px]">
                            Country Name<label className="text-red-500">*</label>
                        </div>
                        <select
                            className="w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]"
                            name="country"
                            value={formValues.project_info.country}
                            defaultValue="Select Country"
                            onChange={(e) => {
                                const existing = { ...formValues };
                                const temp = existing.project_info;
                                temp.country = e.target.value
                                temp.state = null
                                temp.city = null
                                existing.project_info = temp;
                                setFormValues(existing)

                                setAllState([])
                                setAllCity([])
                                fetchStateData(e.target.value)
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
                            value={formValues.project_info.state}
                            defaultValue="Select State"
                            onChange={(e) => {
                                const existing = { ...formValues };
                                const temp = existing.project_info;
                                temp.state = e.target.value
                                existing.project_info = temp;
                                setFormValues(existing)
                                fetchCityData(e.target.value);
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
                            value={formValues.project_info.city}
                            defaultValue="Select City"
                            onChange={e => {
                                const existing = { ...formValues };
                                const temp = existing.project_info;
                                temp.city = e.target.value
                                existing.project_info = temp;
                                setFormValues(existing)
                            }}
                        >
                            <option value="none" hidden={true}>Select a City</option>
                            {allCity && allCity.map(item => (
                                <option value={item.id} >
                                    {item.city}
                                </option>
                            ))}
                        </select>

                    </div> */}
                    <div className="">
                        <div className="text-[13px]">
                            Suburb<label className="text-red-500">*</label>
                        </div>
                        <input
                            type="text"
                            className="border-[#C6C6C6] border-[1px] rounded-sm w-56 h-5 px-3 text-[11px]"
                            name="suburb"
                            value={formValues.project_info.suburb}
                            onChange={handleProjectInfoChange}
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
                            name="builderid"
                            value={formValues.project_info.builderid}
                            onChange={handleProjectInfoChange}
                        >
                            <option value="none">Select Builder Name</option>
                            {builderNameData.map((item) => (
                                <option key={item.id} value={item.id}>
                                    {item.buildername}
                                </option>
                            ))}
                        </select>
                        <div className="text-[10px] text-[#CD0000] ">{formErrors.builderid}</div>
                    </div>
                    <div className="">
                        <div className="text-[13px]">Mailing Group</div>
                        <input
                            type="text"
                            className="border-[#C6C6C6] border-[1px] rounded-sm w-56 h-5 px-3 text-[11px]"
                            name="mailgroup1"
                            value={formValues.project_info.mailgroup1}
                            onChange={handleProjectInfoChange}
                        />
                    </div>
                    <div className="">
                        <div className="text-[13px]">Address Line 2</div>
                        <input
                            type="text"
                            className="border-[#C6C6C6] border-[1px] rounded-sm w-56 h-5 px-3 text-[11px]"
                            name="addressline2"
                            value={formValues.project_info.addressline2}
                            onChange={handleProjectInfoChange}
                        />
                    </div>
                    <div className="">
                        <div className="text-[13px]">Zip code</div>
                        <input
                            type="text"
                            className="border-[#C6C6C6] border-[1px] rounded-sm w-56 h-5 px-3 text-[11px]"
                            name="zip"
                            value={formValues.project_info.zip}
                            onChange={handleProjectInfoChange}
                        />
                    </div>
                    <div className="">
                        <div className="text-[13px]">Nearest Landmark</div>
                        <input
                            type="text"
                            className="border-[#C6C6C6] border-[1px] rounded-sm w-56 h-5 px-3 text-[11px]"
                            name="nearestlandmark"
                            value={formValues.project_info.nearestlandmark}
                            onChange={handleProjectInfoChange}
                        />
                    </div>
                    <div className="">
                        <div className="text-[13px]">Subscribed E-mail</div>
                        <input
                            type="text"
                            className="border-[#C6C6C6] border-[1px] rounded-sm w-56 h-5 px-3 text-[11px]"
                            name="mailgroup2"
                            value={formValues.project_info.mailgroup2}
                            onChange={handleProjectInfoChange}
                        />
                    </div>
                    <div className="">
                        <div className="text-[13px]">Website</div>
                        <input
                            type="text"
                            className="border-[#C6C6C6] border-[1px] rounded-sm w-56 h-5 px-3 text-[11px]"
                            name="website"
                            value={formValues.project_info.website}
                            onChange={handleProjectInfoChange}
                        />
                    </div>
                </div>
            </div>
            <div className="flex justify-center items-center space-x-2 mt-2">
                <div className=" flex justify-center items-center font-semibold text-[12px]">
                    <input
                        type="checkbox"
                        checked={formValues.project_info.tenantworkingbachelorsallowed}
                        className='mr-3 h-4 w-4'
                        onClick={(e) => {
                            // console.log(e.target.checked)
                            const existing = { ...formValues };
                            const temp = { ...existing.project_info };
                            temp.tenantworkingbachelorsallowed = !temp.tenantworkingbachelorsallowed
                            existing.project_info = temp;
                            setFormValues(existing)
                        }}
                    />
                    Tenet woking bachlors allowed
                </div>
                <div className=" flex justify-center items-center font-semibold text-[12px]">
                    <input
                        type="checkbox"
                        checked={formValues.project_info.tenantstudentsallowed}
                        className='mr-3 h-4 w-4'
                        onClick={(e) => {
                            // console.log(e.target.checked)
                            const existing = { ...formValues };
                            const temp = { ...existing.project_info };
                            temp.tenantstudentsallowed = !temp.tenantstudentsallowed
                            existing.project_info = temp;
                            setFormValues(existing)
                        }}
                    />


                    Tenet student allowed
                </div>
                <div className=" flex justify-center items-center font-semibold text-[12px]">
                    <input
                        type="checkbox"
                        checked={formValues.project_info.tenantforeignersallowed}
                        className='mr-3 h-4 w-4'
                        onClick={(e) => {
                            // console.log(e.target.checked)
                            const existing = { ...formValues };
                            const temp = { ...existing.project_info };
                            temp.tenantforeignersallowed = !temp.tenantforeignersallowed
                            existing.project_info = temp;
                            setFormValues(existing)
                        }}
                    />

                    Tenet Foreigners allowed
                </div>
            </div>
        </>
    );
};

export default ProjectInformation;
