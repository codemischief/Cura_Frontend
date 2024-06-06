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
  addProspectData,
  editProspectData,
} from "../../../Redux/slice/Research/ProspectSlice";
import { ModalHeader } from "../../../Components/modals/ModalAtoms";
import CustomSelect from "../../../Components/common/select/CustomSelect";

const validationSchema = Yup.object().shape({
  countryId: Yup.string().required("Country Name is required"),
  state: Yup.string().required("State is required"),
  city: Yup.string().required("City is required"),
  personname: Yup.string().required("Person Name is required"),
  suburb: Yup.string().required("suburb is required"),
  propertylocation: Yup.string().required("Location is required"),
  possibleservices: Yup.string().required("posiible services is required"),
});

const ProspectForm = ({ isOpen, handleClose, editData, openSucess }) => {
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
  const { formSubmissionStatus } = useSelector((state) => state.prospect);

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
  console.log(editData)
  const formik = useFormik({
    initialValues: {
      countryId: editData?.country ? editData.country : 5,
      state: editData?.state ? editData.state : "Maharashtra",
      city: editData?.city ? editData.city : "Pune",
      personname: editData?.personname ? editData.personname : "",
      possibleservices: editData?.possibleservices
        ? editData.possibleservices
        : "",
      propertylocation: editData?.propertylocation
        ? editData.propertylocation
        : "",
      suburb: editData?.suburb ? editData.suburb : "",
      id: editData?.id ? editData.id : undefined,
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
        await dispatch(editProspectData(data));
        openSucess();
      } else {
        await dispatch(addProspectData(data));
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
          <Draggable>
            <div className="flex justify-center items-center">
              <FormikProvider value={values}>
                <Form className="space-y-4" onSubmit={handleSubmit}>
                  <div className="w-[778px] h-auto bg-white rounded-lg">
                    <ModalHeader
                      onClose={handleClose}
                      title={editData.id ? "Edit Prospect" : "New Prospect"}
                    />
                    <div className="h-auto w-full mt-[5px] ">
                      <div className="flex gap-[48px] justify-center items-start">
                        <div className=" space-y-[10px] py-[20px] px-[10px]">
                          <div className="">
                            <div className="flex">
                              <label className="inputFieldLabel">
                                Person name
                              </label>
                              <span className="requiredError">*</span>
                            </div>
                            <input
                              className="inputFieldBorder inputFieldValue"
                              type="text"
                              name="personname"
                              value={formik.values.personname}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            />
                            <div className="inputValidationError">
                              {touched.personname && errors.personname && (
                                <div>{errors.personname}</div>
                              )}
                            </div>
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
                          <div className="">
                            <label className="inputFieldLabel">
                              Property Location
                            </label>
                             <span className="requiredError">*</span>
                            <input
                              // className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]"
                              className="inputFieldBorder inputFieldValue"
                              type="text"
                              name="propertylocation"
                              value={formik.values.propertylocation}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            <div className="inputValidationError">
                              {touched.propertylocation &&
                                errors.propertylocation && (
                                  <div>{errors.propertylocation}</div>
                                )}
                            </div>
                          </div>
                          <div className="">
                            {/* <div className="text-[13px]">
                              Possible Services{" "}
                              <label className="text-red-500">*</label>
                            </div> */}
                            <div className="flex">
                              <label className="inputFieldLabel">
                                Possible Services
                              </label>
                              <span className="requiredError">*</span> 
                            </div>
                            <input
                              // className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]"
                              className="inputFieldBorder inputFieldValue"
                              type="text"
                              name="possibleservices"
                              value={formik.values.possibleservices}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            <div className="inputValidationError">
                              {/* {formErrors.possibleServices} */}
                              {touched.possibleservices &&
                                errors.possibleservices && (
                                  <div>{errors.possibleservices}</div>
                                )}
                            </div>
                          </div>
                        </div>
                        {/* <div className=" space-y-[10px] py-[20px] px-[10px]"> */}
                          {/* <div className="">
                            
                            <label className="inputFieldLabel">Email</label>
                            <input
                              // className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]"
                              className="inputFieldBorder inputFieldValue"
                              type="email"
                              name="email"
                              value={formik.values.email}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </div> */}
                          {/* <div className="">
                           
                            <label className="inputFieldLabel">
                              Phone Number
                            </label>
                            <input
                              // className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]"
                              className="inputFieldBorder inputFieldValue"
                              type="text"
                              name="phoneNumber"
                              value={formik.values.phoneNumber}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </div> */}
                        {/* </div> */}
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
          title="Add Prospect"
          description={
            <div>
              <p className="">Prospect: {values.personname}</p>
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
                Are you sure you want to add this Prospect?
              </Typography>
            </div>
          }
        />
      )}
    </>
  );
  // );
};

ProspectForm.propTypes = {
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
export default ProspectForm;
