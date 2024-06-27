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
  addGovernmentDepartment,
  editGovernmentDepartment
} from "../../../Redux/slice/Research/GovernmentDepartmentSlice"
import { ModalHeader } from "../../../Components/modals/ModalAtoms";
import CustomSelect from "../../../Components/common/select/CustomSelect";
import useAuth from "../../../context/JwtContext";

const validationSchema = Yup.object().shape({
  departmentname : Yup.string().required('Enter Department Name'),
  countryId: Yup.string().required("Select Country"),
  state: Yup.string().required("Select State"),
  city: Yup.string().required("Select City"),
  departmenttype  : Yup.string().required('Select Department Type'),
  details : Yup.string().required('Enter Details'),
  suburb : Yup.string().required('Enter Suburb'),
  contactname : Yup.string().required('Enter Contact Name'),
  contactphone : Yup.string().required('Enter Contact Phone'),

});
const GovernmentDepartmentForm = ({ isOpen, handleClose, editData, openSucess }) => {
  const dispatch = useDispatch();
  const {user} = useAuth();
  const [countryData, setCountryData] = useState([]);
  const [stateData, setStateData] = useState([]);
  const [cityData, setCityData] = useState([]);
  const [departmentTypeData,setDepartmentTypeData] = useState([])
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [openConfirmation, setOpenConfimation] = useState(false);
  const { formSubmissionStatus } = useSelector((state) => state.employer);

  const fetchCountryData = async () => {
    
    const data = {
      user_id: user.id,
      rows: ["id", "name"],
      filters: [],
      sort_by: [],
      order: "asc",
      pg_no: 0,
      pg_size: 0,
    };
    const response = await APIService.getCountries(data);
    const result = (await response.json()).data;
    setCountryData(result)
  
  };

  const fetchCityData = async (id) => {
    const data = { user_id: user.id, state_name: id };
    const response = await APIService.getCities(data);
    const result = (await response.json()).data;
    setCityData(result);
  };

  useEffect(() => {
    fetchCountryData();
    fetchDepartmentTypeData()
    if(editData?.id) {
      // then its edit
      fetchStateData(editData?.countryid)
      fetchCityData(editData?.state)
    }else {

      fetchStateData(5);
      fetchCityData("Maharashtra");
    }
  }, []);

  const fetchStateData = async (id) => {
    const data = { user_id: user.id, country_id: id };
    const response = await APIService.getState(data);
    const result = await response.json();
    setStateData(result.data);
  };

  const fetchCity = async (id) => {
    const data = { user_id: user.id, state_name: id };
    const response = await APIService.getCities(data);
    const result = await response.json();
    setCityData(result.data);
  };
  
  const formik = useFormik({
    initialValues: {
      departmentname : editData?.agencyname ? editData.agencyname : null,
      adressline1 : editData?.addressline1 ? editData.addressline1 : "",
      adressline2 : editData?.addressline2 ? editData.addressline2 : "",
      countryId: editData?.countryid ? editData.countryid : 5,
      state: editData?.state ? editData.state : "Maharashtra",
      city: editData?.city ? editData.city : "Pune",
      suburb : editData.suburb ? editData.suburb : null,
      departmenttype : editData.departmenttypeid ? editData.departmenttypeid : null,
      details : editData.details ? editData.details : null,
      contactname : editData.contactname ? editData.contactname : null,
      contactemail : editData.contactmail ? editData.contactmail : null,
      contactphone : editData.contactphone ? editData.contactphone : null,
      maplink : editData.maplink ? editData.maplink : null,
      zip : editData?.zip ? editData.zip : null,
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
        user_id: user.id,
        agencyname : values.departmentname,
        addressline1 : values.adressline1,
        addressline2 : values.adressline2,
        suburb : values.suburb,
        city : values.city,
        state : values.state,
        country: Number(values.countryId),
        zip : values.zip,
        departmenttype : Number(values.departmenttype),
        details : values.details,
        contactname : values.contactname,
        contactmail : values.contactemail,
        contactphone : values.contactphone,
        maplink : values.maplink
      };

      if (editData?.id) {
        data.id = editData?.id
        await dispatch(editGovernmentDepartment(data));
        openSucess();
      } else {
        await dispatch(addGovernmentDepartment(data));
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
    // 
    // setFieldValue(e.target.name, e.target.value);
    const { type, name, value, checked } = e.target;
    // const fieldValue = type === 'checkbox' ? checked : value;
    
    if(type == 'checkbox') {
      setFieldValue(name,checked)
    }else {

      setFieldValue(name, value);
    }
  };
  const handleCountrySelect = (e) => {
    // 
    setFieldValue("countryId", e.target.value);
    setFieldValue("city", null);
    setFieldValue("state", null);
    setCityData([])
    fetchStateData(e.target.value);
  };

  const handleState = (e) => {
    setFieldValue(e.target.name, e.target.value);
    fetchCity(e.target.value);
  };
  const fetchDepartmentTypeData = async () => {
     const data = {"user_id" : user.id,}
     const response = await APIService.getDepartmentTypeAdmin(data)
     const res = await response.json()
     setDepartmentTypeData(res.data)
     
  }
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
                      title={editData.id ? "Edit Government Department" : "New Government Department"}
                    />
                    </div>
                    <div className="h-auto w-full mt-[5px] ">
                      <div className="flex gap-[48px] justify-center items-start">
                        <div className=" space-y-[10px] py-[20px] px-[10px]">
                          <div className="">
                            <div className="flex">
                              <label className="inputFieldLabel">
                                Department Name
                              </label>
                              <span className="requiredError">*</span>
                            </div>
                            <input
                              className="inputFieldBorder inputFieldValue"
                              type="text"
                              name="departmentname"
                              value={formik.values.departmentname}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            />
                            <div className="inputValidationError">
                              {touched.departmentname && errors.departmentname && (
                                <div>{errors.departmentname}</div>
                              )}
                            </div>
                          </div>
                          <div className="pt-2">
                            <div className="flex">
                              <label className="inputFieldLabel">
                                Address Line 1
                              </label>
                            </div>
                            <input
                              className="inputFieldBorder inputFieldValue"
                              type="text"
                              name="adressline1"
                              value={formik.values.adressline1}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            />
                            {/* <div className="inputValidationError">
                              {touched.employername && errors.employername && (
                                <div>{errors.employername}</div>
                              )}
                            </div> */}
                          </div>
                          <div className="pt-7">
                            <div className="flex">
                              <label className="inputFieldLabel">
                                Address Line 2
                              </label>
                            </div>
                            <input
                              className="inputFieldBorder inputFieldValue"
                              type="text"
                              name="adressline2"
                              value={formik.values.adressline2}
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
                            <div className="flex">
                              <label className="inputFieldLabel">
                                Country 
                              </label>
                              <span className="requiredError">*</span>
                            </div>

                            <select
                              // className="w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]"
                              className="selectBoxField inputFieldValue"
                              name="countryId"
                              value={formik.values.countryId}
                              defaultValue="Select Country"
                              onChange={handleCountrySelect}
                              onBlur={handleBlur}
                            >
                              <option value="" className="inputValidationError" hidden>
                                Select Country
                              </option>
                              {countryData?.length > 0 &&
                                countryData?.map((editData) => {
                                  return (
                                    <option
                                      value={editData.id}
                                      key={editData.id}
                                      
                                    >
                                      {editData.name}
                                    </option>
                                  );
                                })}
                            </select>
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
                                      value={editData.city}
                                      key={editData.city}
                                    >
                                      {editData.city}
                                    </option>
                                  );
                                })}
                            </select>
                             <div className="inputValidationError">
                              {touched.city && errors.city && (
                                <div>{errors.city}</div>
                              )}
                            </div> 
                            
                          </div>
                          <div className="">
                            {/* <div className="text-[13px]">
                              Suburb <label className="text-red-500">*</label>
                            </div> */}
                            <div className="flex">
                              <label className="inputFieldLabel">Suburb</label>
                              <span className="requiredError">*</span>
                            </div>
                            <input
                              // className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]"
                              className="inputFieldBorder inputFieldValue"
                              type="text"
                              name="suburb"
                              value={formik.values.suburb}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            <div className="inputValidationError">
                              {/* {formErrors.suburb} */}
                              {touched.suburb && errors.suburb && (
                                <div>{errors.suburb}</div>
                              )}
                            </div>
                          </div>
                          
                        </div>
                        <div className=" space-y-[10px] py-[20px] px-[10px]">
                          <div className="">
                            {/* <div className="text-[13px]">Email </div> */}
                            <label className="inputFieldLabel">Department Type</label>
                            <span className="requiredError">*</span>
                            <select
                              // className="w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]"
                              className="selectBoxField inputFieldValue"
                              name="departmenttype"
                              value={formik.values.departmenttype}
                              defaultValue="Select Department Type"
                              onChange={handleChange}
                            >
                              <option value="" className="inputFieldValue" hidden>
                                Select Department Type
                              </option>
                              {departmentTypeData.length > 0 &&
                                departmentTypeData.map((editData) => {
                                  return (
                                    <option
                                      value={editData.id}
                                      key={editData.id}
                                    >
                                      {editData.name}
                                    </option>
                                  );
                                })}
                            </select>
                            <div className="inputValidationError">
                              {/* {formErrors.city} */}
                              {errors.departmenttype && <div>{errors.departmenttype}</div>}
                            </div>
                          </div>
                          <div className="">
                            {/* <div className="text-[13px]">Phone Number </div> */}
                            <label className="inputFieldLabel">
                              Details
                            </label>
                            <span className="requiredError">*</span>
                            <textarea
                              //className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]"
                              className="inputFieldBorder inputFieldValue min-h-[50px] max-h-[50px]"
                              type="text"
                              name="details"
                              value={formik.values.details}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            <div className="inputValidationError">
                              {/* {formErrors.suburb} */}
                              {touched.details && errors.details && (
                                <div>{errors.details}</div>
                              )}
                            </div>
                          </div>
                          <div className="">
                            {/* <div className="text-[13px]">Phone Number </div> */}
                            <label className="inputFieldLabel">
                              Contact Name
                            </label>
                            <span className="requiredError">*</span>
                            <input
                              // className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]"
                              className="inputFieldBorder inputFieldValue"
                              type="text"
                              name="contactname"
                              value={formik.values.contactname}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                             <div className="inputValidationError">
                              {/* {formErrors.suburb} */}
                              {touched.contactname && errors.contactname && (
                                <div>{errors.contactname}</div>
                              )}
                            </div>
                          </div>
                          <div className="">
                            {/* <div className="text-[13px]">Phone Number </div> */}
                            <label className="inputFieldLabel">
                              Contact Email
                            </label>
                            <input
                              // className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]"
                              className="inputFieldBorder inputFieldValue"
                              type="email"
                              name="contactemail"
                              value={formik.values.contactemail}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </div>
                          <div className="">
                            {/* <div className="text-[13px]">Phone Number </div> */}
                            <label className="inputFieldLabel">
                              Contact Phone
                            </label>
                            <span className="requiredError">*</span>
                            <input
                              // className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]"
                              className="inputFieldBorder inputFieldValue"
                              type="text"
                              name="contactphone"
                              value={formik.values.contactphone}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            <div className="inputValidationError">
                              {/* {formErrors.suburb} */}
                              {touched.contactphone && errors.contactphone && (
                                <div>{errors.contactphone}</div>
                              )}
                            </div>
                          </div>
                          <div className="">
                            {/* <div className="text-[13px]">Phone Number </div> */}
                            <label className="inputFieldLabel">
                              Map Link
                            </label>
                            <input
                              // className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]"
                              className="inputFieldBorder inputFieldValue"
                              type="text"
                              name="maplink"
                              value={formik.values.maplink}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </div>
                          <div className="">
                            <div className="flex">
                              <label className="inputFieldLabel">
                                ZIP Code
                              </label>
                              
                            </div>
                            <input
                              className="inputFieldBorder inputFieldValue"
                              type="text"
                              name="zip"
                              value={formik.values.zip}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            />
                            {/* <div className="inputValidationError">
                              {touched.employername && errors.employername && (
                                <div>{errors.employername}</div>
                              )}
                            </div> */}
                          </div>
                         
                          
                          
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
          title={`${editData?.id ? 'Save Government Department' : 'Add Government Department'}`}
          description={
            <div>
              <p className="">Government Department Name: {values.departmentname}</p>
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
                Are you sure you want to {editData?.id ? 'Save' : 'Add'} this Government Department?
              </Typography>
            </div>
          }
        />
      )}
    </>
  );
  // );
};

GovernmentDepartmentForm.propTypes = {
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
export default GovernmentDepartmentForm;
