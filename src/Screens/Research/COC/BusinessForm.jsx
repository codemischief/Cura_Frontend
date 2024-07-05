import * as Yup from "yup";
import { useEffect, useState } from "react";
import Draggable from "react-draggable";
import PropTypes from "prop-types";
import { Form, FormikProvider, useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress, MenuItem, Modal, Typography } from "@mui/material";

import { APIService } from "../../../services/API";
import ConfirmationModal from "../../../Components/common/ConfirmationModal";
import {
  addBusinessGroup,
  editBusinessGroup,
} from "../../../Redux/slice/Research/BusinessGroup";
import { ModalHeader } from "../../../Components/modals/ModalAtoms";
import CustomSelectNative from "../../../Components/common/select/CustomSelectNative";
import useAuth from "../../../context/JwtContext";

const validationSchema = Yup.object().shape({
  groupname : Yup.string().required('Select Group'),
  name : Yup.string().required('Enter Name'),
  countryId: Yup.string().required("Select Country"),
  state: Yup.string().required("Select State"),
  city: Yup.string().required("Select City"),
  // personname: Yup.string().required("Enter Name Of The Person"),
  // suburb: Yup.string().required("Enter Suburb"),
  // propertylocation: Yup.string().required("Enter Property Location"),
  // possibleservices: Yup.string().required("Enter Possible Services"),
});

const BusinessForm = ({ isOpen, handleClose, editData, openSucess }) => {
  const { user } = useAuth()
  const dispatch = useDispatch();
  // const { countryData } = useSelector((state) => state.commonApi);
  
  const [countryData,setCountryData] = useState([])
  const [stateData, setStateData] = useState([]);
  const [cityData, setCityData] = useState([]);
  const [groupsData,setGroupsData] = useState([])
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [openConfirmation, setOpenConfimation] = useState(false);
  const { formSubmissionStatus } = useSelector((state) => state.prospect);
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
    const response = await APIService.getCountries(data)
    const res = await response.json()
    setCountryData(res.data)
  }
  const fetchCityData = async (id) => {
    const data = { user_id: user.id, state_name: id };
    const response = await APIService.getCities(data);
    const result = (await response.json()).data;
    setCityData(result);
  };
  const fetchGroupsData = async (id) => {
    const data = {user_id : user.id}
    const response = await APIService.getGroupsAdmin(data)
    const res  = await response.json()
    setGroupsData(res.data)
  }
  useEffect(() => {
    fetchCountryData()
    fetchGroupsData()
    if (editData?.id) {
      fetchStateData(editData?.country);
      fetchCityData(editData?.state);
    } else {
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
      groupname : editData.groupid ? editData.groupid : null,
      name : editData.name ? editData.name : null,
      emailid : editData.emailid ? editData.emailid : null,
      phonenumber : editData.phoneno ? editData.phoneno : null,
      contactname1 : editData.contactname1 ? editData.contactname1 : null,
      contactperson1 : editData.contactperson1 ? editData.contactperson1 : null,
      contactemail1 : editData.email1 ? editData.email1 : null,
      countryId: editData?.country ? editData.country : 5,
      state: editData?.state ? editData.state : "Maharashtra",
      city: editData?.cityid ? editData.cityid : 847,
      locality : editData?.locality ? editData.locality : null,
      contactname2 : editData?.contactname2 ? editData.contactname2 : null,
      contactperson2 : editData?.contactperson2 ? editData.contactperson2 : null,
      contactemail2 : editData?.email2 ? editData.email2 : null,
      address : editData?.address ? editData.address : null,
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
        suburb : "",
        phoneno : values.phonenumber,
        contactperson1 : values.contactperson1,
        contactperson2 : values.contactperson2,
        contactname1 : values.contactname1,
        contactname2 : values.contactname2,
        email1 : values.contactemail1,
        email2 : values.contactemail2,
        emailid: values.emailid,
        city : values.city,
        state : values.state,
        country : values.countryId,
        groupid : values.groupname,
        address : values.address,
        excludefrommailinglist : true
      };

      if (editData?.id) {
        data.id = editData?.id;
        await dispatch(editBusinessGroup(data));
        openSucess();
      } else {
        await dispatch(addBusinessGroup(data));
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
    setFieldValue(e.target.name, e.target.value);
  };
  const handleCountrySelect = (e) => {
    
    setFieldValue("countryId", e.target.value);
    setFieldValue("city", null);
    setFieldValue("state", null);
    setCityData([]);
    fetchStateData(e.target.value);
  };

  const handleState = (e) => {
    setFieldValue(e.target.name, e.target.value);
    fetchCity(e.target.value);
    setFieldValue("city", null);
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
                  <div className="w-[778px] h-auto bg-white rounded-lg">
                    <div className="move cursor-move">
                      <ModalHeader
                        onClose={handleClose}
                        title={editData.id ? "Edit COC & Business Group" : "New COC & Business Group"}
                      />
                    </div>
                    <div className="h-auto w-full mt-[5px] ">
                      <div className="flex gap-[48px] justify-center items-start">
                        <div className=" space-y-[10px] py-[20px] px-[10px]">
                        <div className="">
                            <div className="flex">
                              <label className="inputFieldLabel">
                                Group Type 
                              </label>
                              <span className="requiredError">*</span>
                            </div>
                            <select
                              // className="w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]"
                              className="selectBoxField inputFieldValue"
                              name="groupname"
                              value={formik.values.groupname}
                              defaultValue="Select Type"
                              onChange={handleChange}
                            >
                              <option value="" className="inputFieldValue" hidden>
                                Select Type
                              </option>
                              {groupsData?.map((editData) => {
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
                            {/* <input
                              className="inputFieldBorder inputFieldValue"
                              type="text"
                              name="personname"
                              value={formik.values.personname}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            /> */}
                            <div className="inputValidationError">
                              {touched.groupname && errors.groupname && (
                                <div>{errors.groupname}</div>
                              )}
                            </div>
                          </div>
                          <div className="">
                            <div className="flex">
                              <label className="inputFieldLabel">Name</label>
                              <span className="requiredError">*</span>
                            </div>
                            <input
                              className="inputFieldBorder inputFieldValue"
                              type="text"
                              name="name"
                              value={formik.values.name}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            <div className="inputValidationError">
                              {touched.name && errors.name && (
                                <div>{errors.name}</div>
                              )}
                            </div>
                          </div>
                          <div className="">
                            <label className="inputFieldLabel">
                              Email ID
                            </label>
                            
                            <input
                              className="inputFieldBorder inputFieldValue"
                              type="email"
                              name="emailid"
                              value={formik.values.emailid}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            {/* <div className="inputValidationError">
                              {touched.propertylocation &&
                                errors.propertylocation && (
                                  <div>{errors.propertylocation}</div>
                                )}
                            </div> */}
                          </div>
                          <div className="">
                            <div className="flex">
                              <label className="inputFieldLabel">
                                Phone Number
                              </label>
                              
                            </div>
                            <input
                              className="inputFieldBorder inputFieldValue"
                              type="text"
                              name="phonenumber"
                              value={formik.values.phonenumber}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            {/* <div className="inputValidationError">
                              {touched.possibleservices &&
                                errors.possibleservices && (
                                  <div>{errors.possibleservices}</div>
                                )}
                            </div> */}
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
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            {/* <div className="inputValidationError">
                              {touched.possibleservices &&
                                errors.possibleservices && (
                                  <div>{errors.possibleservices}</div>
                                )}
                            </div> */}
                          </div>
                          <div className="">
                            <div className="flex">
                              <label className="inputFieldLabel">
                                Contact Designation 1
                              </label>
                             
                            </div>
                            <input
                              className="inputFieldBorder inputFieldValue"
                              type="text"
                              name="contactperson1"
                              value={formik.values.contactperson1}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            {/* <div className="inputValidationError">
                              {touched.possibleservices &&
                                errors.possibleservices && (
                                  <div>{errors.possibleservices}</div>
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
                              type="email"
                              name="contactemail1"
                              value={formik.values.contactemail1}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            {/* <div className="inputValidationError">
                              {touched.possibleservices &&
                                errors.possibleservices && (
                                  <div>{errors.possibleservices}</div>
                                )}
                            </div> */}
                          </div>
                          
                        </div>
                        <div className="space-y-[10px] py-[20px] px-[10px]">
                        
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
                              defaultValue="Select Type"
                              onChange={handleCountrySelect}
                            >
                              <option value="" className="inputFieldValue" hidden>
                                Select Country
                              </option>
                              {countryData?.map((editData) => {
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
                              {touched.countryId && errors.countryId && (
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
                              defaultValue="Select Type"
                              onChange={handleState}
                            >
                              <option value="" className="inputFieldValue" hidden>
                                Select State
                              </option>
                              {stateData?.map((editData) => {
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
                              {touched.state && errors.state && (
                                <div>{errors.state}</div>
                              )}
                            </div>
                          </div>
                          <div className="">
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
                              defaultValue="Select Type"
                              onChange={handleChange}
                            >
                              <option value="" className="inputFieldValue" hidden>
                                Select City
                              </option>
                              {cityData?.map((editData) => {
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
                              {touched.city && errors.city && (
                                <div>{errors.city}</div>
                              )}
                            </div>
                          </div>
                         <div className="">
                            <div className="flex">
                              <label className="inputFieldLabel">
                                Contact Name 2
                              </label>
                              
                            </div>
                            <input
                              className="inputFieldBorder inputFieldValue"
                              type="text"
                              name="contactname2"
                              value={formik.values.contactname2}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            {/* <div className="inputValidationError">
                              {touched.possibleservices &&
                                errors.possibleservices && (
                                  <div>{errors.possibleservices}</div>
                                )}
                            </div> */}
                          </div>
                          <div className="">
                            <div className="flex">
                              <label className="inputFieldLabel">
                                Contact Designation 2
                              </label>
                              
                            </div>
                            <input
                              className="inputFieldBorder inputFieldValue"
                              type="text"
                              name="contactperson2"
                              value={formik.values.contactperson2}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            {/* <div className="inputValidationError">
                              {touched.possibleservices &&
                                errors.possibleservices && (
                                  <div>{errors.possibleservices}</div>
                                )}
                            </div> */}
                          </div>
                          <div className="">
                            <div className="flex">
                              <label className="inputFieldLabel">
                                Contact Email 2
                              </label>
                              
                            </div>
                            <input
                              className="inputFieldBorder inputFieldValue"
                              type="email"
                              name="contactemail2"
                              value={formik.values.contactemail2}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            {/* <div className="inputValidationError">
                              {touched.possibleservices &&
                                errors.possibleservices && (
                                  <div>{errors.possibleservices}</div>
                                )}
                            </div> */}
                          </div>
                          <div className="">
                            <div className="flex">
                              <label className="inputFieldLabel">
                                Address
                              </label>
                              
                            </div>
                            <textarea
                              className="inputFieldBorder inputFieldValue !h-[67px] focus-visible:outline-none"
                              type="text"
                              name="address"
                              value={formik.values.address}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            {/* <div className="inputValidationError">
                              {touched.possibleservices &&
                                errors.possibleservices && (
                                  <div>{errors.possibleservices}</div>
                                )}
                            </div> */}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="my-5 flex justify-center items-center gap-[10px] h-[84px]">
                      <button
                        className="w-[100px] h-[35px] bg-[#004DD7] text-white rounded-md"
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
                      >
                        Cancel
                      </button>
                    </div>
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
          title={`${editData?.id ? "Save Business Group" : "Add Business Group"}`}
          description={
            <div className="flex flex-col items-center justify-center">
              <p className="">Group Name: {values.name}</p>
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
                Are you sure you want to {editData?.id ? "Save" : "Add"} this
                Business Group?
              </Typography>
            </div>
          }
        />
      )}
    </>
  );
  // );
};

BusinessForm.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  editData: PropTypes.shape({
    id: PropTypes.number,
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
export default BusinessForm;
