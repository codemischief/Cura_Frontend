import { useEffect, useState } from "react";
import Draggable from "react-draggable";
import PropTypes from "prop-types";
import * as Yup from "yup";
import { Form, FormikProvider, useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress, Modal, Typography, MenuItem } from "@mui/material";
import { APIService } from "../../../../services/API";
import ConfirmationModal from "../../../../Components/common/ConfirmationModal";

import {
  addContactData,
  editContact,
} from "../../../../Redux/slice/Manage/contact";
import { ModalHeader } from "../../../../Components/modals/ModalAtoms";
import CustomSelectNative from "../../../../Components/common/select/CustomSelectNative";
import useAuth from "../../../../context/JwtContext";

const validationSchema = Yup.object().shape({
  contactname : Yup.string().required('Enter Contact Name'),
  jobtitle : Yup.string().required('Enter Job Title'),
  businessphone : Yup.string().required('Enter Business Phone'),
  email : Yup.string().required('Enter Email'),
  suburb : Yup.string().required('Enter Suburb'),
  countryId: Yup.string().required("Select Country"),
  state: Yup.string().required("Select State"),
  city: Yup.string().required("Select City"),
});
// {
//   "user_id": user.id,
//   "country": 5,
//   "onsiteopportunity": true,
//   "city": "Pune",
//   "state": "Maharashtra",
//   "admincontactmail": "admin@example.com",
//   "zip": "10001",
//   "hc": "Healthcare",
//   "website": "www.example.com",
//   "admincontactphone": "user.id567890",
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
const ContactForm = ({ isOpen, handleClose, editData, openSucess }) => {
  const { user } = useAuth()
  const dispatch = useDispatch();
  const { countryData } = useSelector((state) => state.commonApi);
  const [stateData, setStateData] = useState([]);
  const [cityData, setCityData] = useState([]);
  const [apiError, setApiError] = useState("");
  const [openConfirmation, setOpenConfimation] = useState(false);
  const { formSubmissionStatus } = useSelector((state) => state.employer);

  function convertToIdNameObject(data) {
    const idNameObject = {};
    data.forEach((item) => {
      idNameObject[item.id] = item.city;
    });
    return idNameObject;
  }
  const fetchCityData = async (id) => {
    const data = { user_id: user.id, state_name: id };
    const response = await APIService.getCities(data);
    const result = (await response.json()).data;
    setCityData(convertToIdNameObject(result));
  };

  useEffect(() => {
    if (editData?.id) {
      fetchStateData(editData?.countryid);
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
  console.log(editData);
  const formik = useFormik({
    initialValues: {
      contactname: editData?.contactname ? editData.contactname : null,
      jobtitle: editData?.jobtitle ? editData.jobtitle : null,
      email: editData?.email1 ? editData.email1 : null,
      businessphone: editData?.businessphone ? editData.businessphone : null,
      mobilephone: editData?.mobilephone ? editData.mobilephone : null,
      adressline1: editData?.addressline1 ? editData.addressline1 : null,
      countryId: editData?.country ? editData.country : 5,
      state: editData?.state ? editData.state : "Maharashtra",
      city: editData?.city ? editData.city : 847,
      suburb: editData.suburb ? editData.suburb : null,
      zip: editData?.zip ? editData.zip : null,
      homephone: editData?.homephone ? editData.homephone : null,
      addressline2: editData?.addressline2 ? editData.addressline2 : null,
      notes: editData?.notes ? editData.notes : null,
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
        builderid: editData?.builderid,
        contactname: values.contactname,
        email1: values.email,
        jobtitle: values.jobtitle,
        businessphone: values.businessphone,
        homephone: values.homephone,
        mobilephone: values.mobilephone,
        addressline1: values.adressline1,
        addressline2: values.addressline2,
        suburb: values.suburb,
        city: values.city,
        state: values.state,
        country: values.countryId,
        zip: values.zip,
        notes: values.notes,
      };

      if (editData?.id) {
        data.id = editData.id;
        await dispatch(editContact(data));
        openSucess();
      } else {
        await dispatch(addContactData(data));
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
    const { type, name, value, checked } = e.target;
    if (type == "checkbox") {
      setFieldValue(name, checked);
    } else {
      setFieldValue(name, value);
    }
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
                        title={
                          editData.id
                            ? "Edit Builder Contact"
                            : "New Builder Contact"
                        }
                      />
                    </div>
                    <div className="h-auto w-full mt-[5px] ">
                      <div className="flex gap-[48px] justify-center items-start">
                        <div className=" space-y-[10px] py-[20px] px-[10px]">
                          <div className="">
                            <div className="flex">
                              <label className="inputFieldLabel">
                                Builder Name
                              </label>
                              
                            </div>
                            <input
                              className="inputFieldBorder inputFieldValue"
                              type="text"
                              name="employername"
                              value={editData.buildername}
                              onBlur={handleBlur}
                              readOnly
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
                                Contact Name
                              </label>
                              <span className="requiredError">*</span>
                            </div>
                            <input
                              className="inputFieldBorder inputFieldValue"
                              type="text"
                              name="contactname"
                              value={formik.values.contactname}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            />
                            <div className="inputValidationError">
                              {touched.contactname && errors.contactname && (
                                <div>{errors.contactname}</div>
                              )}
                            </div>
                          </div>
                          <div className="">
                            <div className="flex">
                              <label className="inputFieldLabel">
                                Job Title
                              </label>
                              <span className="requiredError">*</span>
                            </div>
                            <input
                              className="inputFieldBorder inputFieldValue"
                              type="text"
                              name="jobtitle"
                              value={formik.values.jobtitle}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            />
                            <div className="inputValidationError">
                              {touched.jobtitle && errors.jobtitle && (
                                <div>{errors.jobtitle}</div>
                              )}
                            </div>
                          </div>

                          <div className="">
                            {/* <div className="text-[13px]">
                              Suburb <label className="text-red-500">*</label>
                            </div> */}
                            <div className="flex">
                              <label className="inputFieldLabel">Email</label>
                              <span className="requiredError">*</span>
                            </div>
                            <input
                              // className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]"
                              className="inputFieldBorder inputFieldValue"
                              type="email"
                              name="email"
                              value={formik.values.email}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            <div className="inputValidationError">
                              {/* {formErrors.suburb} */}
                              {touched.email && errors.email && (
                                <div>{errors.email}</div>
                              )}
                            </div>
                          </div>
                          <div className="">
                            <div className="flex">
                              <label className="inputFieldLabel">
                                Business Phone
                              </label>
                              <span className="requiredError">*</span>
                            </div>
                            <input
                              className="inputFieldBorder inputFieldValue"
                              type="text"
                              name="businessphone"
                              value={formik.values.businessphone}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            />
                            <div className="inputValidationError">
                              {touched.businessphone && errors.businessphone && (
                                <div>{errors.businessphone}</div>
                              )}
                            </div>
                          </div>
                          <div className="">
                            <div className="flex">
                              <label className="inputFieldLabel">
                                Mobile Phone
                              </label>
                            </div>
                            <input
                              className="inputFieldBorder inputFieldValue"
                              type="text"
                              name="mobilephone"
                              value={formik.values.mobilephone}
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
                        </div>
                        <div className=" space-y-[10px] py-[20px] px-[10px]">
                          <div className="">
                            <div className="flex">
                              <label className="inputFieldLabel">Country</label>
                              <span className="requiredError">*</span>
                            </div>
                            {console.log(countryData)}
                            {console.log(countryData[formik.values.countryId])}
                            <CustomSelectNative
                              data={Object.keys(countryData)}
                              renderData={(item) => {
                                return (
                                  <MenuItem value={item} key={item}>
                                    {countryData[item]}
                                  </MenuItem>
                                );
                              }}
                              placeholder="Select Country"
                              value={countryData[formik.values.countryId]}
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
                            <label className="inputFieldLabel">Suburb</label>
                            <span className="requiredError">*</span>
                            <input
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
                            <label className="inputFieldLabel">ZIP Code</label>
                            <input
                              className="inputFieldBorder inputFieldValue"
                              type="text"
                              name="zip"
                              value={formik.values.zip}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </div>
                          <div className="">
                            <label className="inputFieldLabel">
                              Home Phone
                            </label>
                            <input
                              // className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]"
                              className="inputFieldBorder inputFieldValue"
                              type="text"
                              name="homephone"
                              value={formik.values.homephone}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </div>
                          <div className="">
                            {/* <div className="text-[13px]">Phone Number </div> */}
                            <label className="inputFieldLabel">
                              Address Line 2
                            </label>
                            <input
                              // className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]"
                              className="inputFieldBorder inputFieldValue"
                              type="text"
                              name="addressline2"
                              value={formik.values.addressline2}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </div>

                          <div className="">
                            {/* <div className="text-[13px]">Phone Number </div> */}
                            <label className="inputFieldLabel">Notes</label>
                            <input
                              // className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]"
                              className="inputFieldBorder inputFieldValue"
                              type="text"
                              name="notes"
                              value={formik.values.notes}
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
          title={`${editData?.id ? "Save Contact" : "Add Contact"}`}
          description={
            <div className="flex flex-col items-center">
              <p className="">Contact Name: {values.contactname}</p>
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
                Contact?
              </Typography>
            </div>
          }
        />
      )}
    </>
  );
  // );
};

ContactForm.propTypes = {
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
export default ContactForm;
