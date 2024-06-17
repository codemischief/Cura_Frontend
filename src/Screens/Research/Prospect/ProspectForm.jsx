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
  addProspectData,
  editProspectData,
} from "../../../Redux/slice/Research/ProspectSlice";
import { ModalHeader } from "../../../Components/modals/ModalAtoms";
import CustomSelectNative from "../../../Components/common/select/CustomSelectNative";
import useAuth from "../../../context/JwtContext";

const validationSchema = Yup.object().shape({
  countryId: Yup.string().required("Select Country"),
  state: Yup.string().required("Select State"),
  city: Yup.string().required("Select City"),
  personname: Yup.string().required("Enter Name Of The Person"),
  suburb: Yup.string().required("Enter Suburb"),
  propertylocation: Yup.string().required("Enter Property Location"),
  possibleservices: Yup.string().required("Enter Possible Services"),
});

const ProspectForm = ({ isOpen, handleClose, editData, openSucess }) => {
  const dispatch = useDispatch();
  const {user} = useAuth();
  const { countryData } = useSelector((state) => state.commonApi);
  console.log(countryData)
  console.log('hey')
  const [stateData, setStateData] = useState([]);
  const [cityData, setCityData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [openConfirmation, setOpenConfimation] = useState(false);
  const { formSubmissionStatus } = useSelector((state) => state.prospect);

  const fetchCityData = async (id) => {
    const data = { user_id: user.id, state_name: id };
    const response = await APIService.getCities(data);
    const result = (await response.json()).data;
    setCityData(result);
  };

  useEffect(() => {
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
      phoneno : editData?.phoneno ? editData?.phoneno : null,
      email : editData?.email1 ? editData?.email1 : null
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
        personname: values.personname,
        suburb: values.suburb,
        city: values.city,
        state: values.state,
        phoneno: values.phoneno,
        email1: values.email,
        country: Number(values.countryId),
        propertylocation: values.propertylocation,
        possibleservices: values.possibleservices,
      };

      if (editData?.id) {
        data.id = editData?.id;
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
                        title={editData.id ? "Edit Prospect" : "New Prospect"}
                      />
                    </div>
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
                                Country 
                              </label>
                              <span className="requiredError">*</span>
                            </div>
                            {console.log(Object.keys(countryData))}
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
                              <label className="inputFieldLabel">
                                State 
                              </label>
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
                              <label className="inputFieldLabel">
                                City 
                              </label>
                              <span className="requiredError">*</span>
                            </div>
                            <CustomSelectNative
                              name="city"
                              data={cityData}
                              value={formik.values.city}
                              placeholder="Select City"
                              renderData={(item) => {
                                return (
                                  <MenuItem value={item.city} key={item.city}>
                                    {item.city}
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
                            <div className="flex">
                              <label className="inputFieldLabel">Suburb</label>
                              <span className="requiredError">*</span>
                            </div>
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
                            <label className="inputFieldLabel">
                              Property Location
                            </label>
                            <span className="requiredError">*</span>
                            <input
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
                          
                        </div>
                        <div className="space-y-[10px] py-[20px] px-[10px]">
                        <div className="">
                            <div className="flex">
                              <label className="inputFieldLabel">
                                Email 
                              </label>
                              {/* <span className="requiredError">*</span> */}
                            </div>
                            <input
                              className="inputFieldBorder inputFieldValue"
                              type="email"
                              name="email"
                              value={formik.values.email}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            />
                            <div className="inputValidationError">
                              {touched.email && errors.email && (
                                <div>{errors.email}</div>
                              )}
                            </div>
                          </div>
                          <div className="">
                            <div className="flex">
                              <label className="inputFieldLabel">
                                Phone No
                              </label>
                              {/* <span className="requiredError">*</span> */}
                            </div>
                            <input
                              className="inputFieldBorder inputFieldValue"
                              type="text"
                              name="phoneno"
                              value={formik.values.phoneno}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            />
                            <div className="inputValidationError">
                              {touched.phoneno && errors.phoneno && (
                                <div>{errors.phoneno}</div>
                              )}
                            </div>
                          </div>
                          <div className="">
                            <div className="flex">
                              <label className="inputFieldLabel">
                                Possible Services
                              </label>
                              <span className="requiredError">*</span>
                            </div>
                            <textarea
                              className="inputFieldBorder inputFieldValue min-h-[70px] max-h-[70px]"
                              type="text"
                              name="possibleservices"
                              value={formik.values.possibleservices}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            <div className="inputValidationError">
                              {touched.possibleservices &&
                                errors.possibleservices && (
                                  <div>{errors.possibleservices}</div>
                                )}
                            </div>
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
          title={`${editData?.id ? "Save Prospect" : "Add Prospect"}`}
          description={
            <div className="flex flex-col items-center justify-center">
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
                Are you sure you want to {editData?.id ? "Save" : "Add"} this
                Prospect?
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
