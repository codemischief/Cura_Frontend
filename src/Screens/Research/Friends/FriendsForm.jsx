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
  addEmployerData,
  editEmployerData
} from "../../../Redux/slice/Research/EmployerSlice"
import { ModalHeader } from "../../../Components/modals/ModalAtoms";
import CustomSelect from "../../../Components/common/select/CustomSelect";

const validationSchema = Yup.object().shape({
  employername : Yup.string().required('Employer Name Is Required'),
  countryId: Yup.string().required("Country Name is required"),
  state: Yup.string().required("State is required"),
  city: Yup.string().required("City is required"),
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
const FriendsForm = ({ isOpen, handleClose, editData, openSucess }) => {
  const dispatch = useDispatch();
  const [countryData, setCountryData] = useState({
    arr: [],
    obj: {},
  });
  const [stateData, setStateData] = useState([]);
  const [cityData, setCityData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [openConfirmation, setOpenConfimation] = useState(false);
  const { formSubmissionStatus } = useSelector((state) => state.employer);

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
    fetchStateData(5);
    fetchCityData("Maharashtra");
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
      employername : editData?.employername ? editData.employername : "",
      adressline1 : editData?.addressline1 ? editData.addressline1 : "",
      adressline2 : editData?.addressline2 ? editData.addressline2 : "",
      countryId: editData?.country ? editData.country : 5,
      state: editData?.state ? editData.state : "Maharashtra",
      city: editData?.city ? editData.city : "Pune",
      zip : editData?.zip ? editData.zip : "",
      industry : editData?.industry ? editData.industry : "",
      hrcontactname : editData?.hrcontactname ? editData.hrcontactname : "",
      hrcontactphone : editData?.hrcontactphone ? editData.hrcontactphone : "",
      hrcontactmail : editData?.hrcontactmail ? editData.hrcontactmail : "",
      admincontactname : editData?.admincontactname ? editData.admincontactname : "",
      admincontactmail : editData?.admincontactmail ? editData.admincontactmail : "",
      hc : editData?.hc ? emailData.hc : "",
      website : editData?.website ? emailData.website : "",
      contactname1 : editData?.contactname1 ? emailData.contactname1 : "",
      contactphone1 : editData?.contactphone1 ? emailData.contactphone1 : "",
      contactmail1 : editData?.contactmail1 ? emailData.contactmail1 : "",
      contactname2 : editData?.contactname2 ? emailData.contactname2 : "",
      contactphone2 : editData?.contactphone2 ? emailData.contactphone2 : "",
      contactmail2 : editData?.contactmail2 ? emailData.contactmail2 : ""
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
        personname: values.personname,
        suburb: values.suburb,
        city: values.city,
        state: values.state,
        phoneno: values.phoneNumber,
        email1: values.email,
        country: Number(values.countryId),
        propertylocation: values.propertylocation,
        possibleservices: values.possibleservices,
        createdby: 1234,
        isdeleted: false,
      };

      if (editData?.id) {
        await dispatch(editEmployerData(data));
        openSucess();
      } else {
        await dispatch(addEmployerData(data));
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
  const handleCountrySelect = (country) => {
    setFieldValue("countryId", country?.id);
    setFieldValue("state", "");
    setFieldValue("city", "");
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
                      title={editData.id ? "Edit Employer" : "New Employer"}
                    />
                    </div>
                    <div className="h-auto w-full mt-[5px] ">
                      <div className="flex gap-[48px] justify-center items-start">
                        <div className=" space-y-[10px] py-[20px] px-[10px]">
                          <div className="">
                            <div className="flex">
                              <label className="inputFieldLabel">
                                Employer Name
                              </label>
                              <span className="requiredError">*</span>
                            </div>
                            <input
                              className="inputFieldBorder inputFieldValue"
                              type="text"
                              name="employername"
                              value={formik.values.employername}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            />
                            <div className="inputValidationError">
                              {touched.employername && errors.employername && (
                                <div>{errors.employername}</div>
                              )}
                            </div>
                          </div>
                          <div className="">
                            <div className="flex">
                              <label className="inputFieldLabel">
                                Address Line 1
                              </label>
                            </div>
                            <input
                              className="inputFieldBorder inputFieldValue"
                              type="text"
                              name="addressline1"
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
                          <div className="">
                            <div className="flex">
                              <label className="inputFieldLabel">
                                Address Line 2
                              </label>
                            </div>
                            <input
                              className="inputFieldBorder inputFieldValue"
                              type="text"
                              name="addressline2"
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
                                Country Name
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
                                State Name
                              </label>
                              {/* <span className="requiredError">*</span> */}
                            </div>
                            <select
                              // className="w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]"
                              className="selectBoxField inputFieldValue"
                              name="state"
                              value={formik.values.state}
                              defaultValue="Select State"
                              onChange={handleState}
                            >
                              <option value="" className="inputFieldValue">
                                select state
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
                              <option value="" className="inputValidationError">
                                select city
                              </option>
                              {cityData.length > 0 &&
                                cityData.map((editData) => {
                                  return (
                                    <option
                                      value={editData.city}
                                      key={editData.city}
                                      selected
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
                            {/* <div className="text-[13px]">
                              Suburb <label className="text-red-500">*</label>
                            </div> */}
                            <div className="flex">
                              <label className="inputFieldLabel">Suburb</label>
                              {/* <span className="requiredError">*</span> */}
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
                        <div className=" space-y-[10px] py-[20px] px-[10px]">
                          <div className="">
                            {/* <div className="text-[13px]">Email </div> */}
                            <label className="inputFieldLabel">Industry</label>
                            <input
                              // className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]"
                              className="inputFieldBorder inputFieldValue"
                              type="text"
                              name="industry"
                              value={formik.values.industry}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </div>
                          <div className="">
                            {/* <div className="text-[13px]">Phone Number </div> */}
                            <label className="inputFieldLabel">
                              HR Name
                            </label>
                            <input
                              // className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]"
                              className="inputFieldBorder inputFieldValue"
                              type="text"
                              name="hrcontactname"
                              value={formik.values.hrcontactname}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </div>
                          <div className="">
                            {/* <div className="text-[13px]">Phone Number </div> */}
                            <label className="inputFieldLabel">
                              HR Phone
                            </label>
                            <input
                              // className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]"
                              className="inputFieldBorder inputFieldValue"
                              type="text"
                              name="hrcontactphone"
                              value={formik.values.hrcontactphone}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </div>
                          <div className="">
                            {/* <div className="text-[13px]">Phone Number </div> */}
                            <label className="inputFieldLabel">
                              HR Email
                            </label>
                            <input
                              // className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]"
                              className="inputFieldBorder inputFieldValue"
                              type="text"
                              name="hrcontactmail"
                              value={formik.values.hrcontactmail}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </div>
                          <div className="">
                            {/* <div className="text-[13px]">Phone Number </div> */}
                            <label className="inputFieldLabel">
                              Admin Name
                            </label>
                            <input
                              // className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]"
                              className="inputFieldBorder inputFieldValue"
                              type="text"
                              name="admincontactname"
                              value={formik.values.admincontactname}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </div>
                          <div className="">
                            {/* <div className="text-[13px]">Phone Number </div> */}
                            <label className="inputFieldLabel">
                              Admin Phone
                            </label>
                            <input
                              // className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]"
                              className="inputFieldBorder inputFieldValue"
                              type="text"
                              name="admincontactphone"
                              value={formik.values.admincontactphone}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </div>
                          <div className="">
                            {/* <div className="text-[13px]">Phone Number </div> */}
                            <label className="inputFieldLabel">
                              Admin Email
                            </label>
                            <input
                              // className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]"
                              className="inputFieldBorder inputFieldValue"
                              type="email"
                              name="admincontactmail"
                              value={formik.values.admincontactmail}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </div>
                          <div className="">
                            {/* <div className="text-[13px]">Phone Number </div> */}
                            <label className="inputFieldLabel">
                              Notes
                            </label>
                            <input
                              // className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]"
                              className="inputFieldBorder inputFieldValue"
                              type="text"
                              name="hc"
                              value={formik.values.hc}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </div>
                          
                        </div>



                        <div className=" space-y-[10px] py-[20px] px-[10px]">
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
                            
                          </div>
                          <div className="">
                            <div className="flex">
                              <label className="inputFieldLabel">
                                Contact Phone 1
                              </label>
                              
                            </div>
                            <input
                              className="inputFieldBorder inputFieldValue"
                              type="text"
                              name="contactphone1"
                              value={formik.values.contactphone1}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            />
                            
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
                              name="contactmail1"
                              value={formik.values.contactmail1}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            />
                            
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
                              onBlur={handleBlur}
                              onChange={handleChange}
                            />
                            
                          </div>
                          <div className="">
                            <div className="flex">
                              <label className="inputFieldLabel">
                                Contact Phone 2
                              </label>
                              
                            </div>
                            <input
                              className="inputFieldBorder inputFieldValue"
                              type="text"
                              name="contactphone2"
                              value={formik.values.contactphone2}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            />
                            
                          </div>
                          <div className="">
                            <div className="flex">
                              <label className="inputFieldLabel">
                                Contact Email 2
                              </label>
                              
                            </div>
                            <input
                              className="inputFieldBorder inputFieldValue"
                              type="text"
                              name="contactmail2"
                              value={formik.values.contactmail2}
                              onBlur={handleBlur}
                              onChange={handleChange}
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
                          "Update"
                        ) : (
                          "Save"
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
          btnTitle={editData?.id ? "Update" : "Save"}
          onClose={() => {
            setOpenConfimation(false);
          }}
          errors={apiError}
          onSubmit={handleConfirm}
          title="Add Client"
          description={
            <div>
              <p className="">Client: {values.personname}</p>
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
                Are you sure you want to add this client?
              </Typography>
            </div>
          }
        />
      )}
    </>
  );
  // );
};

FriendsForm.propTypes = {
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
export default FriendsForm;
