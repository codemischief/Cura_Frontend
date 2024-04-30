import React from "react";
import { Outlet, Link } from "react-router-dom";
import backLink from "../../../assets/back.png";
import searchIcon from "../../../assets/searchIcon.png";
import nextIcon from "../../../assets/next.png";
import refreshIcon from "../../../assets/refresh.png";
import downloadIcon from "../../../assets/download.png";
import { useState } from "react";
// import Navbar from "../../../components/Navabar/Navbar";
import Cross from "../../../assets/cross.png";
import { Modal } from "@mui/material";
import eyeIcon from "../../../assets/eye.jpg";
import Checkbox from "@mui/material/Checkbox";
import Navbar from "../../../components/Navabar/NavigationBar";

const ManageUser = () => {
  // we have the module here
  const [type1, setType1] = useState("password");
  const [type2, setType2] = useState("password");

  // password visibility
  const passwordToggle = () => {
    if (type1 === "password") {
      setType1("text");
    } else {
      setType1("password");
    }
  };

  const confirmPasswordToggle = () => {
    if (type2 === "password") {
      setType2("text");
    } else {
      setType2("password");
    }
  };

  // hardcoded for dropdown instances ********* start*************
  const selectedCity = ["City1", "City2", "City3", "City4"];
  const assignedRoles = ["Role1", "Role2", "Role3", "Role4"];
  // hardcoded for dropdown instances ********* End*************

  //For closing a modal
  const handleDialogClose = () => {
    props.setOpenDialog(false);
  };

  //Validation of the form
  const initialValues = {
    nameOfTheUser: "",
    userName: "",
    password: "",
    lob: "",
    email: "",
    addressLine1: "",
    effectiveDate: "",
    confirmPassword: "",
    role: "",
    homePhone: "",
    city: "",
    suburb: "",
    zipCode: "",
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
    if (!values.nameOfTheUser) {
      errors.nameOfTheUser = "Enter the name of the user";
    }
    if (!values.userName) {
      errors.userName = "Enter username";
    }
    if (!values.password) {
      errors.password = "Enter password";
    }
    if (!values.lob) {
      errors.lob = "Select lob";
    }
    if (!values.email) {
      errors.email = "Enter your Email address";
    }
    if (!values.addressLine1) {
      errors.addressLine1 = "Enter address";
    }
    if (!values.effectiveDate) {
      errors.effectiveDate = "Select Effective Date";
    }
    if (!values.confirmPassword) {
      errors.confirmPassword = "Re-enter your password";
    }
    if (!values.role) {
      errors.role = "select role";
    }
    if (!values.homePhone) {
      errors.homePhone = "Enter home phone number";
    }
    if (!values.city) {
      errors.city = "Select city";
    }
    if (!values.suburb) {
      errors.suburb = "Enter suburb";
    }
    if (!values.zipCode) {
      errors.zipCode = "Enter zip code";
    }
    return errors;
  };

  const [isStateDialogue, setIsStateDialogue] = React.useState(false);
  const handleOpen = () => {
    setIsStateDialogue(true);
  };
  const handleClose = () => {
    setIsStateDialogue(false);
  };
  return (
    <div>
      {/* <Navbar/> */}
      <Navbar />
      <div className="flex-col w-full h-full  bg-white">
        <div className="flex-col">
          {/* this div will have all the content */}
          <div className="w-full  flex-col px-6">
            {/* the top section of the div */}
            <div className="h-1/2 w-full  flex justify-between items-center p-2  border-gray-300 border-b-2">
              <div className="flex items-center space-x-3">
                <div className="rounded-2xl  bg-[#EBEBEB] h-8 w-8 ">
                  <img src={backLink} />
                </div>

                <div className="flex-col">
                  <h1>Manage User</h1>
                  <p>Admin &gt; Manage User</p>
                </div>
              </div>
              <div className="flex space-x-2 items-center">
                <div className="flex">
                  {/* search button */}
                  <input
                    className="h-[36px] bg-[#EBEBEB] text-[#787878]"
                    type="text"
                    placeholder="  Search"
                  />
                  <div className="h-[36px] w-[40px] bg-[#004DD7] flex items-center justify-center rounded-r-lg">
                    <img
                      className="h-[26px] "
                      src={searchIcon}
                      alt="search-icon"
                    />
                  </div>
                </div>

                <div>
                  {/* button */}
                  <button
                    className="bg-[#004DD7] text-white h-[30px] w-[200px] rounded-lg"
                    onClick={handleOpen}
                  >
                    Add New User +
                  </button>
                </div>
              </div>
            </div>
            <div className="h-12 w-full bg-white"></div>
          </div>

          <div className="w-full h-[400px] bg-white px-6">
            <div className="w-full h-12 bg-[#F0F6FF] flex justify-between">
              <div className="w-3/4 flex">
                <div className="w-1/6 p-4">
                  <p>Sr. No</p>
                </div>
                <div className="w-5/6  p-4">
                  <p>State</p>
                </div>
              </div>
              <div className="w-1/6  flex">
                <div className="w-1/2  p-4">
                  <p>ID</p>
                </div>
                <div className="w-1/2 0 p-4">
                  <p>Edit</p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full h-12 flex justify-between justify-self-end px-6 ">
            {/* footer component */}
            <div className="ml-2">
              <div className="flex items-center w-auto h-full">
                {/* items */}
                <div className="h-12 flex justify-center items-center">
                  <img src={backLink} className="h-2/4" />
                </div>
                <div className="flex space-x-1 mx-5">
                  {/* pages */}
                  <div className="w-6 bg-[#DAE7FF] p-1 pl-2 rounded-md">
                    <p>1</p>
                  </div>
                  <div className="w-6  p-1 pl-2">
                    <p>2</p>
                  </div>
                  <div className="w-6 p-1 pl-2">
                    <p>3</p>
                  </div>
                  <div className="w-6  p-1 pl-2">
                    <p>4</p>
                  </div>
                </div>
                <div className="h-12 flex justify-center items-center">
                  {/* right button */}
                  <img src={nextIcon} className="h-2/4" />
                </div>
              </div>
              <div>{/* items per page */}</div>
            </div>
            <div className="flex mr-10 justify-center items-center space-x-2 ">
              <div className="border-solid border-black border-[0.5px] rounded-md w-28 h-10 flex items-center justify-center space-x-1">
                {/* refresh */}
                <p>Refresh</p>
                <img src={refreshIcon} className="h-1/2" />
              </div>
              <div className="border-solid border-black border-[1px] w-28 rounded-md h-10 flex items-center justify-center space-x-1">
                {/* download */}
                <p>Download</p>
                <img src={downloadIcon} className="h-1/2" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* modal goes here */}
      <Modal open={isStateDialogue} fullWidth={true} maxWidth={"md"}>
        <div className="flex justify-center ">
          <div className="w-auto h-auto bg-white rounded-lg">
            <div className="h-[40px] bg-[#EDF3FF]  justify-center flex items-center">
              <div className="mr-[410px] ml-[410px]">
                <div className="text-[16px]">Add New User</div>
              </div>
              <div className="flex justify-center items-center rounded-full w-[30px] h-[30px] bg-white">
                <Link to="/manageuser">
                  <img
                    onClick={handleClose}
                    className="w-[20px] h-[20px]"
                    src={Cross}
                    alt="cross"
                  />
                </Link>
              </div>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="h-auto w-full">
                <div className="flex gap-[48px] justify-center items-center">
                  <div className=" space-y-[12px] py-[20px] px-[10px]">
                    <div className="">
                      <div className="text-[14px]">
                        Name of the User
                        <label className="text-red-500">*</label>
                      </div>
                      <input
                        className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm"
                        type="text"
                        name="nameOfTheUser"
                        value={formValues.nameOfTheUser}
                        onChange={handleChange}
                      />
                      <div className="text-[12px] text-[#CD0000] ">
                        {formErrors.nameOfTheUser}
                      </div>
                    </div>
                    <div className="">
                      <div className="text-[14px]">
                        Create Username<label className="text-red-500">*</label>
                      </div>
                      <input
                        className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm"
                        type="text"
                        name="userName"
                        value={formValues.userName}
                        onChange={handleChange}
                      />
                      <div className="text-[12px] text-[#CD0000] ">
                        {formErrors.userName}
                      </div>
                    </div>
                    <div className="">
                      <div className="text-[14px]">
                        Create Password<label className="text-red-500">*</label>
                      </div>
                      <div className="m-0 p-0 relative">
                        <input
                          className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm"
                          type={type1}
                          name="password"
                          value={formValues.password}
                          onChange={handleChange}
                        />
                        <span className="w-4 h-4 absolute right-1 bottom-0.5">
                          <img
                            className="cursor-pointer"
                            onClick={passwordToggle}
                            src={eyeIcon}
                            alt="eye-icon"
                          />
                        </span>
                      </div>
                      <div className="text-[12px] text-[#CD0000]">
                        {formErrors.password}
                      </div>
                    </div>
                    <div className="">
                      <div className="text-[14px]">
                        LOB<label className="text-red-500">*</label>
                      </div>
                      <input
                        className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm"
                        type="date"
                        name="lob"
                        value={formValues.lob}
                        onChange={handleChange}
                      />
                      <div className="text-[12px] text-[#CD0000] ">
                        {formErrors.lob}
                      </div>
                    </div>
                    <div className="">
                      <div className="text-[14px]">
                        Email 1<label className="text-red-500">*</label>
                      </div>
                      <input
                        className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm"
                        type="email"
                        name="email"
                        value={formValues.email}
                        onChange={handleChange}
                      />
                      <div className="text-[12px] text-[#CD0000] ">
                        {formErrors.email}
                      </div>
                    </div>
                    <div className="">
                      <div className="text-[14px]">Work Phone</div>
                      <input
                        className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm"
                        type="text"
                        name="Work phone"
                      />
                    </div>
                    <div className="">
                      <div className="text-[14px]">
                        Address Line 1<label className="text-red-500">*</label>
                      </div>
                      <input
                        className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm"
                        type="text"
                        name="addressLine1"
                        value={formValues.addressLine1}
                        onChange={handleChange}
                      />
                      <div className="text-[12px] text-[#CD0000] ">
                        {formErrors.addressLine1}
                      </div>
                    </div>
                  </div>
                  <div className=" space-y-[12px] py-[20px] px-[10px]">
                    <div className="">
                      <div className="text-[14px]">
                        Office<label className="text-red-500">*</label>
                      </div>
                      <input
                        className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm"
                        type="text"
                        name="Office"
                      />
                    </div>
                    <div className="">
                      <div className="text-[14px]">
                        Effective Date<label className="text-red-500">*</label>
                      </div>
                      <input
                        className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm"
                        type="date"
                        name="effectiveDate"
                        value={formValues.effectiveDate}
                        onChange={handleChange}
                      />
                      <div className="text-[12px] text-[#CD0000] ">
                        {formErrors.effectiveDate}
                      </div>
                    </div>
                    <div className="">
                      <div className="text-[14px]">
                        Confirm Password
                        <label className="text-red-500">*</label>
                      </div>
                      <div className="m-0 p-0 relative">
                        <input
                          className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm"
                          type={type2}
                          name="confirmPassword"
                          value={formValues.confirmPassword}
                          onChange={handleChange}
                        />
                        <span className="w-4 h-4 absolute right-1 bottom-0.5">
                          <img
                            className="cursor-pointer"
                            onClick={confirmPasswordToggle}
                            src={eyeIcon}
                            alt="eye-icon"
                          />
                        </span>
                      </div>
                      <div className="text-[12px] text-[#CD0000] ">
                        {formErrors.confirmPassword}
                      </div>
                    </div>
                    <div className="">
                      <div className="text-[14px]">
                        Assign role<label className="text-red-500">*</label>
                      </div>
                      <select
                        className="w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm"
                        name="role"
                        value={formValues.role}
                        onChange={handleChange}
                      >
                        {assignedRoles.map((item) => (
                          <option key={item} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                      <div className="text-[12px] text-[#CD0000] ">
                        {formErrors.role}
                      </div>
                    </div>
                    <div className="">
                      <div className="text-[14px]">Email 2</div>
                      <input
                        className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm"
                        type="email"
                        name="Email2"
                      />
                    </div>
                    <div className="">
                      <div className="text-[14px]">
                        Home Phone<label className="text-red-500">*</label>
                      </div>
                      <input
                        className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm"
                        type="text"
                        name="homePhone"
                        value={formValues.homePhone}
                        onChange={handleChange}
                      />
                      <div className="text-[12px] text-[#CD0000] ">
                        {formErrors.homePhone}
                      </div>
                    </div>
                    <div className="">
                      <div className="text-[14px]">Address Line 2</div>
                      <input
                        className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm"
                        type="text"
                        name="addressLine2"
                      />
                    </div>
                  </div>
                  <div className=" space-y-[12px] py-[20px] px-[10px] ">
                    <div className="">
                      <div className="text-[14px]">
                        City<label className="text-red-500">*</label>
                      </div>
                      <select
                        className="w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm"
                        name="city"
                      >
                        {" "}
                        value={formValues.city} onChange={handleChange}
                        {selectedCity.map((item) => (
                          <option key={item} value={item}>
                            {item}
                          </option>
                        ))}
                      </select>
                      <div className="text-[12px] text-[#CD0000] ">
                        {formErrors.city}
                      </div>
                    </div>
                    <div className="">
                      <div className="text-[14px]">
                        Suburb<label className="text-red-500">*</label>
                      </div>
                      <input
                        className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm"
                        type="text"
                        name="suburb"
                        value={formValues.suburb}
                        onChange={handleChange}
                      />
                      <div className="text-[12px] text-[#CD0000] ">
                        {formErrors.suburb}
                      </div>
                    </div>
                    <div className="">
                      <div className="text-[14px]">
                        Zip Code<label className="text-red-500">*</label>
                      </div>
                      <input
                        className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm"
                        type="text"
                        name="zipCode"
                        value={formValues.zipCode}
                        onChange={handleChange}
                      />
                      <div className="text-[12px] text-[#CD0000] ">
                        {formErrors.zipCode}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mt-[10px] flex justify-center items-center">
                <Checkbox label="Active" />
                Active
              </div>
              <div className="my-[10px] flex justify-center items-center gap-[10px]">
                <button
                  className="w-[100px] h-[35px] bg-[#004DD7] text-white rounded-md"
                  type="submit"
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
            </form>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ManageUser;
