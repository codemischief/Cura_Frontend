import { useEffect, useState } from "react";
import Draggable from "react-draggable";
import PropTypes from "prop-types";
import * as Yup from "yup";
import { Form, FormikProvider, useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress, Modal, Typography, MenuItem } from "@mui/material";

import { APIService } from "../../../services/API";
import ConfirmationModal from "../../../Components/common/ConfirmationModal";
import CustomSelectNative from "../../../Components/common/select/CustomSelectNative";
import {
  addData,
  editEducational
} from "../../../Redux/slice/Research/EducationalInstitute"
import { ModalHeader } from "../../../Components/modals/ModalAtoms";
import CustomSelect from "../../../Components/common/select/CustomSelect";
import useAuth from "../../../context/JwtContext";

const validationSchema = Yup.object().shape({

});

const EmployerForm = ({ isOpen, handleClose, editData, openSucess }) => {
  const { user } = useAuth()
  const dispatch = useDispatch();
  const [countryData, setCountryData] = useState([]);
  const [stateData, setStateData] = useState([]);
  const [cityData, setCityData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [openConfirmation, setOpenConfimation] = useState(false);
  const { formSubmissionStatus } = useSelector((state) => state.employer);
  const [typeData,setTypeData] = useState([
    
  ])
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
    // setCountryData(result)
    setLoading(false);
    const resultConverted = await result?.reduce((acc, current) => {
      acc[current.id] = current.name;
      return acc;
    }, {});

    setCountryData(resultConverted);
    
  };

  const fetchCityData = async (id) => {
    const data = { user_id: user.id, state_name: id };
    const response = await APIService.getCities(data);
    const result = (await response.json()).data;
    const resultConverted = await result?.reduce((acc, current) => {
      acc[current.id] = current.city;
      return acc;
    }, {});
    setCityData(resultConverted);
  };
  const fetchCollegeTypes = async () => {
    const data = {user_id : user.id}
    const response = await APIService.getCollegeTypesAdmin(data)
    const res = await response.json()
    setTypeData(res.data)
    
  } 
  useEffect(() => {
    fetchCollegeTypes()
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

  
  
  const formik = useFormik({
    initialValues: {
      name : editData?.name ? editData.name : null,
      typeid : editData?.typeid ? editData.typeid : null,
      emailid : editData.emailid ? editData.emailid : null,
      phoneno : editData.phoneno ? editData.phoneno : null,
      suburb : editData.suburb ? editData.suburb : null,
      countryId: editData?.countryid ? editData.countryid: 5,
      state: editData?.state ? editData.state : "Maharashtra",
      city: editData?.cityid ? editData.cityid : 847,
      website : editData?.website ? editData.website : null,
      email1 : editData?.email1 ? editData.email1 : null,
      email2 : editData.email2 ? editData.email2 : null,
      contactname1 : editData?.contactname1 ? editData.contactname1 :  null,
      contactname2 : editData?.contactname2 ? editData.contactname2 : null,
      phoneno1 : editData?.phoneno1 ? editData.phoneno1 : null,
      phoneno2 : editData?.phoneno2 ? editData.phoneno2 : null,
      excludefrommailinglist : editData?.excludefrommailinglist ? editData.excludefrommailinglist : false
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
        
          user_id:user.id,
          name:values.name,
          typeid:values.typeid,
          emailid:values.emailid,
          phoneno:values.phoneno,
          suburb:values.suburb,
          city:values.city,
          state:values.state,
          country : values.countryId,
          website:values.website,
          email1:values.email1,
          email2:values.email2,
          contactname1:values.contactname1,
          contactname2:values.contactname2,
          phoneno1: values.phoneno1,
          phoneno2:values.phoneno2,
          excludefrommailinglist:values.excludefrommailinglist
      };

      if (editData?.id) {
        data.id = editData.id
        await dispatch(editEducational(data));
        openSucess();
      } else {
        await dispatch(addData(data));
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
    fetchCityData(e.target.value);
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
                      title={editData.id ? "Edit Educational Institute" : "New Educational Institute"}
                    />
                    </div>
                    <div className="h-auto w-full mt-[5px] ">
                      <div className="flex gap-[48px] justify-center items-start">
                        <div className=" space-y-[10px] py-[20px] px-[10px]">
                          <div className="">
                            <div className="flex">
                              <label className="inputFieldLabel">
                                Institute Type
                              </label>
                              <span className="requiredError">*</span>
                            </div>
                            <select
                              // className="w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]"
                              className="selectBoxField inputFieldValue"
                              name="typeid"
                              value={formik.values.typeid}
                              defaultValue="Select Type"
                              onChange={handleChange}
                            >
                              <option value="" className="inputFieldValue" hidden>
                                Select Type
                              </option>
                              {typeData?.map((editData) => {
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
                              {touched.typeid && errors.typeid && (
                                <div>{errors.typeid}</div>
                              )}
                            </div>
                          </div>
                          <div className="">
                            <div className="flex">
                              <label className="inputFieldLabel">
                                Name
                              </label>
                            </div>
                            <input
                              className="inputFieldBorder inputFieldValue"
                              type="text"
                              name="name"
                              value={formik.values.name}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            />
                            
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
                              
                            </div>
                            <input
                              // className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]"
                              className="inputFieldBorder inputFieldValue"
                              type="text"
                              name="phoneno"
                              value={formik.values.phoneno}
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
                          <div className="">
                            <div className="flex">
                              <label className="inputFieldLabel">
                                Contact Name 1
                              </label>
                              
                            </div>
                            <input
                              className="inputFieldBorder inputFieldValue"
                              type="text"
                              name="contactname1"
                              value={formik.values.contactname1}
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
                                Contact Email 1
                              </label>
                              
                            </div>
                            <input
                              className="inputFieldBorder inputFieldValue"
                              type="text"
                              name="email1"
                              value={formik.values.email1}
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
                                 Phone 1 
                              </label>
                              
                            </div>
                            <input
                              className="inputFieldBorder inputFieldValue"
                              type="text"
                              name="phoneno1"
                              value={formik.values.phoneno1}
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
                                 Phone 2 
                              </label>
                              
                            </div>
                            <input
                              className="inputFieldBorder inputFieldValue"
                              type="text"
                              name="phoneno2"
                              value={formik.values.phoneno2}
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
                            <div className="flex">
                              <label className="inputFieldLabel">Country</label>
                              <span className="requiredError">*</span>
                            </div>
                            {}
                            {}
                            <CustomSelectNative
                              data={Object.keys(countryData)}
                              value={countryData[formik.values.countryId] ? countryData[formik.values.countryId] : ""}
                              renderData={(item) => {
                                return (
                                  <MenuItem value={item} key={item}>
                                    {countryData[item]}
                                  </MenuItem>
                                );
                              }}
                              placeholder="Select Country"
                              
                              onChange={handleCountrySelect}
                            />
                            <div className="inputValidationError">
                              {errors.countryId && (
                                <div>{errors.countryId}</div>
                              )}
                            </div>
                          </div>
                          <div className="">
                            <div className="flex">
                              <label className="inputFieldLabel">State</label>
                              <span className="requiredError">*</span>
                            </div>
                            <CustomSelectNative
                              name="state"
                              data={stateData}
                              value={formik.values.state}
                              placeholder={"Select State"}
                              renderData={(item) => {
                                return (
                                  <MenuItem value={item[0]} key={item[0]}>
                                    {item[0]}
                                  </MenuItem>
                                );
                              }}
                              onChange={handleState}
                            />
                            <div className="inputValidationError">
                              {errors.state && <div>{errors.state}</div>}
                            </div>
                          </div>
                          <div className="">
                            <div className="flex">
                              <label className="inputFieldLabel">City</label>
                              <span className="requiredError">*</span>
                            </div>
                            {}
                            <CustomSelectNative
                              name="city"
                              data={Object.keys(cityData)}
                              value={
                                cityData[formik.values.city]
                                  ? cityData[formik.values.city]
                                  : ""
                              }
                              placeholder="Select City"
                              renderData={(item) => {
                                return (
                                  <MenuItem value={item} key={item}>
                                    {cityData[item] ? cityData[item] : ""}
                                  </MenuItem>
                                );
                              }}
                              onChange={handleChange}
                            />
                            <div className="inputValidationError">
                              {errors.city && <div>{errors.city}</div>}
                            </div>
                          </div>
                          
                          <div className="">
                            {/* <div className="text-[13px]">Email </div> */}
                            <label className="inputFieldLabel">Locality</label>
                            <span className="requiredError">*</span>
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
                              {touched.suburb && errors.suburb && (
                                <div>{errors.suburb}</div>
                              )}
                            </div>
                          </div>
                          <div className="">
                            {/* <div className="text-[13px]">Phone Number </div> */}
                            <label className="inputFieldLabel">
                              Contact Name 2
                            </label>
                            <input
                              // className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]"
                              className="inputFieldBorder inputFieldValue"
                              type="text"
                              name="contactname2"
                              value={formik.values.contactname2}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                             
                          </div>
                          <div className="">
                            {/* <div className="text-[13px]">Phone Number </div> */}
                            <label className="inputFieldLabel">
                              Contact Email 2
                            </label>
                            <input
                              // className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]"
                              className="inputFieldBorder inputFieldValue"
                              type="text"
                              name="email2"
                              value={formik.values.email2}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </div>
                          <div className="">
                            {/* <div className="text-[13px]">Phone Number </div> */}
                            <label className="inputFieldLabel">
                              Website
                            </label>
                            <input
                              // className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]"
                              className="inputFieldBorder inputFieldValue"
                              type="text"
                              name="website"
                              value={formik.values.website}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
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
          title={`${editData?.id ?  "Save Education Institute" : "Add Educational Institute"}`}
          description={
            <div className="flex flex-col items-center">
              <p className="">Education Institute: {values.name}</p>
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
                Are you sure you want to {editData?.id ? 'Save' : 'Add'} this Education Institute?
              </Typography>
            </div>
          }
        />
      )}
    </>
  );
  // );
};

EmployerForm.propTypes = {
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
export default EmployerForm;
