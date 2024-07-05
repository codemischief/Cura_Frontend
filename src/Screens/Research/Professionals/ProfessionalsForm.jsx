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
  addProfessionals,
  editProfessionals
} from "../../../Redux/slice/Research/ProfessionalsSlice"
import { ModalHeader } from "../../../Components/modals/ModalAtoms";
import CustomSelect from "../../../Components/common/select/CustomSelect";
import useAuth from "../../../context/JwtContext";

const validationSchema = Yup.object().shape({
  type : Yup.string().required('Select Type'),
  name : Yup.string().required('Enter Name'),
  countryId: Yup.string().required("Select Country"),
  state: Yup.string().required("Select State"),
  city: Yup.string().required("Select City"),
});
const ProfessionalsForm = ({ isOpen, handleClose, editData, openSucess }) => {
  const dispatch = useDispatch();
  const {user} = useAuth();
  const [countryData, setCountryData] = useState({
    arr: [],
    obj: {},
  });
  const [stateData, setStateData] = useState([]);
  const [typeData,setTypeData] = useState([])
  const [cityData, setCityData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [openConfirmation, setOpenConfimation] = useState(false);
  const { formSubmissionStatus } = useSelector((state) => state.employer);

  const fetchCountryData = async () => {
    setLoading(true);
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
    
    setLoading(false);
    setCountryData(result);
  };

  const fetchCityData = async (id) => {
    const data = { user_id: user.id, state_name: id };
    const response = await APIService.getCities(data);
    const result = (await response.json()).data;
    setCityData(result);
  };
  const fetchTypeData = async () => {
    const d = {
      "user_id" : user.id
    }
    const response = await APIService.getProfessionalTypesAdmin(d)
    const res = await response.json()
    
    setTypeData(res.data)
  }
  useEffect(() => {
    fetchTypeData()
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
      type : editData?.typeid ? editData.typeid : null,
      name : editData?.name ? editData.name : null,
      emailid : editData?.emailid ? editData.emailid : null,
      phonenumber : editData?.phonenumber ? editData.phonenumber : null,
      website : editData?.website ? editData.website : null,
      professionid : editData?.professionalid ? editData.professionalid : null,
      countryId : editData?.countryid ? editData.countryid : 5,
      state : editData?.state ? editData.state : "Maharashtra",
      city : editData?.cityid ? editData.cityid : 847,
      locality : editData?.suburb ? editData.suburb : null,
      excludefrommailinglist : editData?.excludefrommailinglist ? editData.excludefrommailinglist : null,
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
        name: values.name,
        typeid: values.type,
        emailid: values.emailid,
        professionalid:values.professionid,
        phonenumber: values.phonenumber,
        suburb: values.locality,
        city: values.city,
        state: values.state,
        country: values.countryId,
        website: values.website,
        excludefrommailinglist: values.excludefrommailinglist,
      };

      if (editData?.id) {
        data.id = editData.id
        await dispatch(editProfessionals(data));
        openSucess();
      } else {
        await dispatch(addProfessionals(data));
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
                      title={editData.id ? "Edit Professional" : "New Professional"}
                    />
                    </div>
                    <div className="h-auto w-full mt-[5px] ">
                      <div className="flex gap-[48px] justify-center items-start">
                        <div className=" space-y-[10px] py-[20px] px-[10px]">
                          <div className="">
                            <div className="flex">
                              <label className="inputFieldLabel">
                                Type
                              </label>
                              <span className="requiredError">*</span>
                            </div>
                            <select
                              // className="w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]"
                              className="selectBoxField inputFieldValue"
                              name="type"
                              value={formik.values.type}
                              defaultValue="Select Type"
                              onChange={handleChange}
                            >
                              <option value="" className="inputFieldValue" hidden>
                                Select Type
                              </option>
                              {typeData.length > 0 &&
                                typeData.map((editData) => {
                                  return (
                                    <option
                                      value={editData.professionalid}
                                      key={editData.professionalid}
                                    >
                                      {editData.name}
                                    </option>
                                  );
                                })}
                            </select>
                            
                            <div className="inputValidationError ">
                              {touched.type && errors.type && (
                                <div>{errors.type}</div>
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
                            {/* <div className="inputValidationError">
                              {touched.suburb && errors.suburb && (
                                <div>{errors.suburb}</div>
                              )}
                            </div> */}
                          </div>
                          <div className="">
                            <div className="flex">
                              <label className="inputFieldLabel">
                                Website
                              </label>
                              
                            </div>
                            <input
                              className="inputFieldBorder inputFieldValue"
                              type="text"
                              name="website"
                              value={formik.values.website}
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
                        <div className=" space-y-[10px] py-[20px] px-[10px]">
                          <div className="">
                            {/* <div className="text-[13px]">Email </div> */}
                            <label className="inputFieldLabel">Professional ID</label>
                            <input
                              // className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]"
                              className="inputFieldBorder inputFieldValue"
                              type="text"
                              name="professionid"
                              value={formik.values.professionid}
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
                            <select
                              // className="w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]"
                              className="selectBoxField inputFieldValue"
                              name="countryId"
                              value={formik.values.countryId}
                              defaultValue="Select Country"
                              onChange={handleCountrySelect}
                            >
                              <option value="" className="inputFieldValue" hidden>
                                Select Country
                              </option>
                              {countryData.length > 0 &&
                                countryData.map((editData) => {
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
                              {/* {formErrors.state} */}
                              {errors.countryId && <div>{errors.countryId}</div>}
                            </div>
                          </div>
                          <div className="">
                            <div className="flex">
                              <label className="inputFieldLabel">
                                State Name
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
                                City Name
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
          btnTitle={`${editData?.id ? 'Save' : 'Add'}`}
          onClose={() => {
            setOpenConfimation(false);
          }}
          errors={apiError}
          onSubmit={handleConfirm}
          title={editData?.id ? "Save Professional" : "Add Professional"}
          description={
            <div>
              <p className="">Name : {values.name}</p>
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
                Are you sure you want to {editData?.id ? 'Save' : 'Add'} this Prosfessional?
              </Typography>
            </div>
          }
        />
      )}
    </>
  );
  // );
};

ProfessionalsForm.propTypes = {
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
export default ProfessionalsForm;
