import { useEffect, useState } from "react";
import Draggable from "react-draggable";
import PropTypes from "prop-types";
import * as Yup from "yup";
import { Form, FormikProvider, useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress, Modal, Typography } from "@mui/material";

import { APIService } from "../../../services/API";
import ConfirmationModal from "../../../Components/common/ConfirmationModal";

import {
  addOwner,
  editOwner
} from "../../../Redux/slice/Research/OwnerSlice"
import { ModalHeader } from "../../../Components/modals/ModalAtoms";
import CustomSelect from "../../../Components/common/select/CustomSelect";

const validationSchema = Yup.object().shape({
  name : Yup.string().required('Enter Name '),
  countryId: Yup.string().required("Select Country"),
  state: Yup.string().required("Select State"),
  city: Yup.string().required("Select City"),
});
// {
//   "user_id": 1234,
//   "country": 5,
//   "onsiteopportunity": true,
//   "city": "Pune",
//   "state": "Maharashtra",
//   "admincontactmail": "admin@example.com",
//   "zip": "10001",
//   "hc": "Healthcare",
//   "website": "www.example.com",
//   "admincontactphone": "1234567890",
//   "contactname1": "Jane Smith",
//   "contactmail1": "jane@example.com",
//   "contactphone1": "2345678901",
//   "contactname2": "Michael Johnson",
//   "contactmail2": "michael@example.com",
//   "contactphone2": "3456789012",
//   "hrcontactname": "Emily Brown",
//   "hrcontactmail": "hr@example.com",
//   "hrcontactphone": "4567890123",
//   "admincontactname": "Admin Name",
//   "employername": "Example Corp",
//   "industry": "Technology",
//   "addressline1": "123 Main St",
//   "addressline2": "Suite 101",
//   "suburb": "Downtown"
// }
const OwnerForm = ({ isOpen, handleClose, editData, openSucess }) => {
  const dispatch = useDispatch();
  const [countryData, setCountryData] = useState({
    arr: [],
    obj: {},
  });
  const [stateData, setStateData] = useState([]);
  const [cityData, setCityData] = useState([]);
  const [saleRent,setSaleRent] = useState([
    {
      'name' : "Sale"
    },
    {
      'name' : "Rent"
    }
  ])
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [openConfirmation, setOpenConfimation] = useState(false);
  const { formSubmissionStatus } = useSelector((state) => state.owner);

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
    const resultConverted = await result?.reduce((acc, current) => {
      acc[current.id] = current.name;
      return acc;
    }, {});

    setLoading(false);
    setCountryData({ arr: result, obj: resultConverted });
  };

  const fetchCityData = async (id) => {
    const data = { user_id: 1234, state_name: id };
    const response = await APIService.getCities(data);
    const result = (await response.json()).data;
    setCityData(result);
  };

  useEffect(() => {
    fetchCountryData();
    if(editData?.id) {
      // then its update wala case
      fetchStateData(editData?.countryid)
      fetchCityData(editData?.state)
    }else {
      // then its add wala case
      fetchStateData(5);
      fetchCityData("Maharashtra");
    }
  }, []);

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

  const formik = useFormik({
    initialValues: {
      corporation : editData?.corporation ? editData.corporation : null,
      name : editData?.name ? editData.name : null,
      emailid : editData?.emailid ? editData.emailid : null,
      phonenumber : editData?.phoneno ? editData.phoneno : null,
      phone1 : editData?.phoneno1 ? editData.phoneno1 : null,
      phone2 : editData?.phoneno2 ? editData.phoneno2 : null,
      saleorrent : editData?.propertyfor ? editData.propertyfor : null,
      address : editData?.address ? editData.address : null,
      propertytaxnumber : editData?.propertytaxno ? editData.propertytaxno : null,
      countryId: editData?.countryid ? editData.countryid : 5,
      state: editData?.state ? editData.state : "Maharashtra",
      city: editData?.cityid ? editData.cityid : 847,
      locality : editData?.suburb ? editData.suburb : null,
      propertydetails : editData?.propertydetails ? editData.propertydetails : null,
      societyname : editData?.societyname ? editData.societyname : null,
      source : editData?.source ? editData.source : null,
      excludefrommailinglist : editData?.isexcludedmailinglist ? editData.isexcludedmailinglist : null,

      
    },
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      setSubmitting(true);
      setOpenConfimation(true);
    },
  });

  const handleConfirm = async () => {
    try {
      const data = {
        
    
        user_id: 1234,
        societyname: values.societyname,
        name : values.name,
        propertytaxno: values.propertytaxnumber,
        address: values.address,
        phoneno: values.phonenumber,
        emailid: values.emailid,
        corporation: values.corporation,
        suburb: values.locality,
        city: values.city,
        state: values.state,
        country: values.countryId,
        isexcludedmailinglist: values.excludefrommailinglist,
        propertydetails: values.propertydetails,
        propertyfor: values.saleorrent,
        phoneno1: values.phone1,
        phoneno2: values.phone2,
        source: values.source,
      
      };

      if (editData?.id) {
        data.id = editData.id
        await dispatch(editOwner(data));
        openSucess();
      } else {
        await dispatch(addOwner(data));
        openSucess();
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setApiError(error.response.data.message);
      } else {
        setApiError("An unexpected error occurred.");
      }
    } finally {
      formik.setSubmitting(false);
    }
  };

  const {
    errors,
    values,
    touched,
    isSubmitting,
    handleBlur,
    handleSubmit,
    setFieldValue,
  } = formik;

  const handleChange = (e) => {
    // console.log(e.target)
    // setFieldValue(e.target.name, e.target.value);
    const { type, name, value, checked } = e.target;
    // const fieldValue = type === 'checkbox' ? checked : value;
    console.log(name, checked);
    if(type == 'checkbox') {
      setFieldValue(name,checked)
    }else {

      setFieldValue(name, value);
    }
  };
  const handleCountrySelect = (country) => {
    setFieldValue("countryId", country?.id);
    setFieldValue("state", null);
    setFieldValue("city", null);
    setCityData([])
    fetchStateData(country?.id);
  };

  const handleState = (e) => {
    setFieldValue(e.target.name, e.target.value);
    fetchCity(e.target.value);
  };

  return (
    <>
      <Modal
        open={isOpen}
        fullWidth={true}
        maxWidth={"md"}
        className="flex justify-center items-center"
      >
        <>
          <Draggable handle="div.move">
            <div className="flex justify-center items-center">
              <FormikProvider value={values}>
                <Form className="space-y-4" onSubmit={handleSubmit}>
                  <div className="w-[1100px] h-auto bg-white rounded-lg">
                    <div className="move cursor-move">

                    <ModalHeader
                      onClose={handleClose}
                      title={editData.id ? "Edit Owner" : "New Owner"}
                    />
                    </div>
                    <div className="h-auto w-full mt-[5px] ">
                      <div className="flex gap-[48px] justify-center items-start">
                        <div className=" space-y-[10px] py-[20px] px-[10px]">
                          <div className="">
                            <div className="flex">
                              <label className="inputFieldLabel">
                                 Corporation
                              </label>
                             
                            </div>
                            <input
                              className="inputFieldBorder inputFieldValue"
                              type="text"
                              name="corporation"
                              value={formik.values.corporation}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            />
                            <div className="inputValidationError">
                              {touched.corporation && errors.corporation && (
                                <div>{errors.corporation}</div>
                              )}
                            </div>
                          </div>
                          <div className="">
                            <div className="flex">
                              <label className="inputFieldLabel">
                                Name
                              </label>
                              <span className="requiredError">*</span>
                            </div>
                            <input
                              className="inputFieldBorder inputFieldValue"
                              type="text"
                              name="name"
                              value={formik.values.name}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            />
                            <div className="inputValidationError">
                              {touched.name && errors.name && (
                                <div>{errors.name}</div>
                              )}
                            </div>
                          </div>
                          <div className="">
                            <div className="flex">
                              <label className="inputFieldLabel">
                                Email ID
                              </label>
                            </div>
                            <input
                              className="inputFieldBorder inputFieldValue"
                              type="email"
                              name="emailid"
                              value={formik.values.emailid}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            />
                            {/* <div className="inputValidationError">
                              {touched.employername && errors.employername && (
                                <div>{errors.employername}</div>
                              )}
                            </div> */}
                          </div>
                          
                          <div className="">
                            {/* <div className="text-[13px]">
                              Suburb <label className="text-red-500">*</label>
                            </div> */}
                            <div className="flex">
                              <label className="inputFieldLabel">Phone Number</label>
                              {/* <span className="requiredError">*</span> */}
                            </div>
                            <input
                              // className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]"
                              className="inputFieldBorder inputFieldValue"
                              type="text"
                              name="phonenumber"
                              value={formik.values.phonenumber}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            
                          </div>
                          <div className="">
                            <div className="flex">
                              <label className="inputFieldLabel">
                                Phone 1 
                              </label>
                              
                            </div>
                            <input
                              className="inputFieldBorder inputFieldValue"
                              type="text"
                              name="phone1"
                              value={formik.values.phone1}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            />
                           
                          </div>
                          
                          <div className="">
                            {/* <div className="text-[13px]">Email </div> */}
                            <label className="inputFieldLabel">Phone 2</label>
                            <input
                              // className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]"
                              className="inputFieldBorder inputFieldValue"
                              type="text"
                              name="phone2"
                              value={formik.values.phone2}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </div>
                          <div className="">
                            {/* <div className="text-[13px]">Email </div> */}
                            <label className="inputFieldLabel">Sale / Rent</label>
                            <select
                              // className="w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]"
                              className="selectBoxField inputFieldValue"
                              name="saleorrent"
                              value={formik.values.saleorrent}
                              defaultValue="Select Property For"
                              onChange={handleChange}
                            >
                              <option value="" className="inputFieldValue" hidden>
                                Select Property For
                              </option>
                              {saleRent.length > 0 &&
                                saleRent.map((editData) => {
                                  return (
                                    <option
                                      value={editData.name}
                                    >
                                      {editData.name}
                                    </option>
                                  );
                                })}
                            </select>
                            
                          </div>
                          <div className="">
                            {/* <div className="text-[13px]">Email </div> */}
                            <label className="inputFieldLabel">Address</label>
                            <input
                              // className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]"
                              className="inputFieldBorder inputFieldValue"
                              type="text"
                              name="address"
                              value={formik.values.address}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </div>
                          
                        </div>
                        <div className=" space-y-[10px] py-[20px] px-[10px]">
                          <div className="">
                            {/* <div className="text-[13px]">Email </div> */}
                            <label className="inputFieldLabel">Property Tax Number</label>
                            <input
                              // className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]"
                              className="inputFieldBorder inputFieldValue"
                              type="text"
                              name="propertytaxnumber"
                              value={formik.values.propertytaxnumber}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </div>
                          <div className="">
                            <div className="flex">
                              <label className="inputFieldLabel">
                                Country 
                              </label>
                              <span className="requiredError">*</span>
                            </div>

                            <CustomSelect
                              isLoading={loading}
                              value={countryData?.obj[formik.values.countryId]}
                              onSelect={handleCountrySelect}
                              options={countryData?.arr}
                            />
                            <div className="inputValidationError">
                              {errors.countryId && (
                                <div>{errors.countryId}</div>
                              )}
                            </div>
                          </div>
                          <div className="">
                            <div className="flex">
                              <label className="inputFieldLabel">
                                State 
                              </label>
                              <span className="requiredError">*</span>
                            </div>
                            <select
                              // className="w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]"
                              className="selectBoxField inputFieldValue"
                              name="state"
                              value={formik.values.state}
                              defaultValue="Select State"
                              onChange={handleState}
                            >
                              <option value="" className="inputFieldValue" hidden>
                                Select State
                              </option>
                              {stateData.length > 0 &&
                                stateData.map((editData) => {
                                  return (
                                    <option
                                      value={editData[0]}
                                      key={editData[0]}
                                    >
                                      {editData[0]}
                                    </option>
                                  );
                                })}
                            </select>
                            <div className="inputValidationError">
                              {/* {formErrors.state} */}
                              {errors.state && <div>{errors.state}</div>}
                            </div>
                          </div>
                          <div className="">
                            {/* <div className="text-[13px]">
                              City Name{" "}
                              <label className="text-red-500">*</label>
                            </div> */}
                            <div className="flex">
                              <label className="inputFieldLabel">
                                City 
                              </label>
                              <span className="requiredError">*</span>
                              {/* <span className="requiredError">*</span> */}
                            </div>

                            <select
                              // className="w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]"
                              className="selectBoxField inputFieldValue"
                              name="city"
                              value={formik.values.city}
                              defaultValue="Select State"
                              onChange={handleChange}
                              onBlur={handleBlur}
                            >
                              <option value="" className="inputValidationError" hidden>
                                Select City
                              </option>
                              {cityData.length > 0 &&
                                cityData.map((editData) => {
                                  return (
                                    <option
                                      value={editData.id}
                                      key={editData.id}
                                    >
                                      {editData.city}
                                    </option>
                                  );
                                })}
                            </select>
                            <div className="inputValidationError">
                              {/* {formErrors.city} */}
                              {errors.city && <div>{errors.city}</div>}
                            </div>
                          </div>
                          <div className="">
                            {/* <div className="text-[13px]">Phone Number </div> */}
                            <label className="inputFieldLabel">
                              Locality
                            </label>
                            <input
                              // className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]"
                              className="inputFieldBorder inputFieldValue"
                              type="text"
                              name="locality"
                              value={formik.values.locality}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </div>
                          <div className="">
                            {/* <div className="text-[13px]">Phone Number </div> */}
                            <label className="inputFieldLabel">
                              Property Details
                            </label>
                            <input
                              // className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]"
                              className="inputFieldBorder inputFieldValue"
                              type="text"
                              name="propertydetails"
                              value={formik.values.propertydetails}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </div>
                          <div className="">
                            {/* <div className="text-[13px]">Phone Number </div> */}
                            <label className="inputFieldLabel">
                              Society Name
                            </label>
                            <input
                              // className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]"
                              className="inputFieldBorder inputFieldValue"
                              type="text"
                              name="societyname"
                              value={formik.values.societyname}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </div>
                          <div className="">
                            {/* <div className="text-[13px]">Phone Number </div> */}
                            <label className="inputFieldLabel">
                              Source
                            </label>
                            <input
                              // className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]"
                              className="inputFieldBorder inputFieldValue"
                              type="text"
                              name="source"
                              value={formik.values.source}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </div>
                          
                        </div>
                         


                        
                      </div>
                      <div className="w-full   flex items-center justify-center">
                         <div className="flex items-center">
                             <input 
                              type="checkbox" checked={formik.values.excludefrommailinglist}
                                className='mr-3 h-4 w-4'
                                name="excludefrommailinglist"
                                onBlur={handleBlur}
                                onChange={handleChange}/>
                              <label className="inputFieldLabel">
                                Exclude From Mailing List
                              </label>
                         </div>
                      </div>
                    </div>

                    <div className="my-5 flex justify-center items-center gap-[10px] h-[84px]">
                      <button
                        className="w-[100px] h-[35px] bg-[#004DD7] text-white rounded-md"
                        //   onClick={handleEdit}
                        disabled={isSubmitting}
                        type="submit"
                      >
                        {isSubmitting ? (
                          <CircularProgress />
                        ) : editData?.id ? (
                          "Save"
                        ) : (
                          "Add"
                        )}
                      </button>
                      <button
                        className="w-[100px] h-[35px] border-[1px] border-[#282828] rounded-md"
                        onClick={handleClose}
                        //   onClick={handleClose}
                      >
                        Cancel
                      </button>
                    </div>
                    {/* </form> */}
                  </div>
                </Form>
              </FormikProvider>
            </div>
          </Draggable>
        </>
      </Modal>
      {openConfirmation && (
        <ConfirmationModal
          open={openConfirmation}
          loading={formSubmissionStatus === "loading"}
          btnTitle={editData?.id ? "Save" : "Add"}
          onClose={() => {
            setOpenConfimation(false);
          }}
          errors={apiError}
          onSubmit={handleConfirm}
          title={`${editData?.id ? 'Save Owner' : 'Add Owner'}`}
          description={
            <div className="flex flex-col items-center">
              <p className="">Owner: {values.name}</p>
              <Typography
                sx={{
                  fontFamily: "Open Sans",
                  fontSize: "14px",
                  fontStyle: "normal",
                  fontWeight: 400,
                  lineHeight: "150%" /* 21px */,
                  color: "#282828",
                }}
              >
                Are you sure you want to {editData?.id ? 'Save' : 'Add'} this Owner?
              </Typography>
            </div>
          }
        />
      )}
    </>
  );
  // );
};

OwnerForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  editData: PropTypes.shape({
    id: PropTypes.string,
    country: PropTypes.number,
    state: PropTypes.string,
    city: PropTypes.string,
    personname: PropTypes.string,
    suburb: PropTypes.string,
    propertylocation: PropTypes.string,
    possibleservices: PropTypes.string,
  }),
  openSucess: PropTypes.func.isRequired,
};
export default OwnerForm;
