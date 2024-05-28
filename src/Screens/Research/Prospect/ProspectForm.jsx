import { CircularProgress, Modal, Typography } from "@mui/material";
import React, { useEffect, useState, useTransition } from "react";
import Draggable from "react-draggable";
import Cross from "../../../assets/cross.png";
import { APIService } from "../../../services/API";
import { Form, Formik, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import SucessfullModal from "../../../Components/modals/SucessfullModal";
import ConfirmationModal from "../../../Components/common/ConfirmationModal";
import { useDispatch } from "react-redux";
import { addProspectData } from "../../../Redux/slice/research/prospectSlice";

const validationSchema = Yup.object().shape({
  countryId: Yup.string().required("Country Name is required"),
  state: Yup.string().required("State is required"),
  city: Yup.string().required("City is required"),
  personname: Yup.string().required("Person Name is required"),
  suburb: Yup.string().required("suburbis required"),
  propertylocation: Yup.string().required("Location is required"),
  possibleservices: Yup.string().required("posiible services is required"),
});

const ProspectForm = ({ isOpen, handleClose, editData }) => {
  const dispatch = useDispatch();
  // const [isPending, startTransition] = useTransition();
  const [countryData, setCountryData] = useState([]);
  const [stateData, setStateData] = useState([]);
  const [cityData, setCityData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [openConfirmation, setOpenConfimation] = useState(false);
  // const [isProspectDialogue, setIsProspectDialogue] = React.useState(false);

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
    setLoading(false);
    setCountryData(result);
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

  // useEffect(() => {
  //   if (isProspectDialogue) {
  //     setTimeout(() => {
  //       setIsProspectDialogue(false);
  //       // handleClose();
  //     }, 3000);
  //   }
  // }, [isProspectDialogue]);

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
      const data = {
        user_id: 1234,
        personname: values.personname,
        suburb: values.suburb,
        city: values.city,
        state: values.state,
        phoneno: values.phoneNumber,
        email: values.email,
        country: Number(values.countryId),
        propertylocation: values.propertylocation,
        possibleservices: values.possibleservices,
        dated: "2024-01-01 00:00:00",
        createdby: 1234,
        isdeleted: false,
      };
      setOpenConfimation(true);
      // if (editData?.id) {
      //   try {
      //     const response = await APIService.editProspects(data);
      //   } catch (e) {
      //     setApiError("something went wrong");
      //   } finally {
      //     setIsProspectDialogue(true);
      //     setSubmitting(false);
      //   }
      // } else {
      //   try {
      //     const response = await APIService.addProspects(data);
      //   } catch (e) {
      //     setApiError("something went wrong");
      //   } finally {
      //     setIsProspectDialogue(true);
      //     setSubmitting(false);
      //   }
      // }
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
        email: values.email,
        country: Number(values.countryId),
        propertylocation: values.propertylocation,
        possibleservices: values.possibleservices,
        dated: "2024-01-01 00:00:00",
        createdby: 1234,
        isdeleted: false,
      };
      // await APIService.editProspects(data);
      dispatch(addProspectData(data));
      // handleClose();
    } catch (error) {
      setApiError("something went wrong");
    } finally {
      // setIsProspectDialogue(true);
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
    setFieldValue(e.target.name, e.target.value);
    setFieldValue("state", "");
    setFieldValue("city", "");
    fetchStateData(e.target.value);
  };

  const handleState = (e) => {
    setFieldValue(e.target.name, e.target.value);
    fetchCity(e.target.value);
  };

  console.log("loading", loading);
  // console.log("isProspectDialogue", isProspectDialogue);

  // return isProspectDialogue ? (
  //   <SucessfullModal
  //     isOpen={isProspectDialogue}
  //     message={
  //       editData.id
  //         ? "Changes saved succesffuly"
  //         : "New Prospect Created Successfully"
  //     }
  //   />
  // ) : (
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
                  <div className="h-[40px] bg-[#EDF3FF]  justify-center flex items-center rounded-t-lg">
                    <div className="mr-[300px] ml-[300px]">
                      <div className="text-[16px]">
                        {editData.id ? "Edit Prospect" : "New Prospect"}
                      </div>
                    </div>
                    <div className="flex justify-center items-center rounded-full w-[30px] h-[30px] bg-white">
                      <img
                        onClick={handleClose}
                        className="w-[20px] h-[20px] cursor-pointer"
                        src={Cross}
                        alt="cross"
                      />
                    </div>
                  </div>
                  <div className="h-auto w-full mt-[5px] ">
                    <div className="flex gap-[48px] justify-center items-center">
                      <div className=" space-y-[10px] py-[20px] px-[10px]">
                        <div className="">
                          <div className="text-[13px]">
                            Person name{" "}
                            <label className="text-red-500">*</label>
                          </div>
                          <input
                            className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]"
                            type="text"
                            name="personname"
                            value={formik.values.personname}
                            onBlur={handleBlur}
                            onChange={handleChange}
                          />
                          <div className="text-[10px] text-[#CD0000] ">
                            {touched.personname && errors.personname && (
                              <div className="text-red-600 text-xs">
                                {errors.personname}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="">
                          <div className="text-[13px]">
                            Country Name
                            <label className="text-red-500">*</label>
                          </div>
                          <select
                            className="w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]"
                            name="countryId"
                            value={formik.values.countryId}
                            defaultValue="Select Country"
                            onChange={handleCountrySelect}
                          >
                            <option value="none" hidden={true}>
                              Select a Country
                            </option>

                            {countryData.length > 0 &&
                              countryData?.map((editData) => (
                                <option value={editData.id} key={editData.id}>
                                  {editData.name}
                                </option>
                              ))}
                          </select>
                          <div className="text-[10px] text-[#CD0000] ">
                            {/* {formErrors.country} */}
                            {errors.countryId && (
                              <div className="text-red-600 text-xs">
                                {errors.countryId}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="">
                          <div className="text-[13px]">
                            State Name
                            <label className="text-red-500">*</label>
                          </div>
                          <select
                            className="w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]"
                            name="state"
                            value={formik.values.state}
                            defaultValue="Select State"
                            onChange={handleState}
                          >
                            <option value="">select state</option>
                            {stateData.length > 0 &&
                              stateData.map((editData) => {
                                return (
                                  <option value={editData[0]}>
                                    {editData[0]}
                                  </option>
                                );
                              })}
                          </select>
                          <div className="text-[10px] text-[#CD0000] ">
                            {/* {formErrors.state} */}
                            {errors.state && (
                              <div className="text-red-600 text-xs">
                                {errors.state}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="">
                          <div className="text-[13px]">
                            City Name <label className="text-red-500">*</label>
                          </div>

                          <select
                            className="w-[230px] hy-[10px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]"
                            name="city"
                            value={formik.values.city}
                            defaultValue="Select State"
                            onChange={handleChange}
                            onBlur={handleBlur}
                          >
                            <option value="">select country</option>
                            {cityData.length > 0 &&
                              cityData.map((editData) => {
                                return (
                                  <option value={editData.city} selected>
                                    {editData.city}
                                  </option>
                                );
                              })}
                          </select>
                          <div className="text-[10px] text-[#CD0000] ">
                            {/* {formErrors.city} */}
                            {errors.city && (
                              <div className="text-red-600 text-xs">
                                {errors.city}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="">
                          <div className="text-[13px]">
                            Suburb <label className="text-red-500">*</label>
                          </div>
                          <input
                            className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]"
                            type="text"
                            name="suburb"
                            value={formik.values.suburb}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          <div className="text-[10px] text-[#CD0000] ">
                            {/* {formErrors.suburb} */}
                            {touched.suburb && errors.suburb && (
                              <div className="text-red-600 text-xs">
                                {errors.suburb}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="">
                          <div className="text-[13px]">
                            Property Location{" "}
                            <label className="text-red-500">*</label>
                          </div>
                          <input
                            className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]"
                            type="text"
                            name="propertylocation"
                            value={formik.values.propertylocation}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          <div className="text-[10px] text-[#CD0000] ">
                            {touched.propertylocation &&
                              errors.propertylocation && (
                                <div className="text-red-600 text-xs">
                                  {errors.propertylocation}
                                </div>
                              )}
                          </div>
                        </div>
                        <div className="">
                          <div className="text-[13px]">
                            Possible Services{" "}
                            <label className="text-red-500">*</label>
                          </div>
                          <input
                            className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]"
                            type="text"
                            name="possibleservices"
                            value={formik.values.possibleservices}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          <div className="text-[10px] text-[#CD0000] ">
                            {/* {formErrors.possibleServices} */}
                            {touched.possibleservices &&
                              errors.possibleservices && (
                                <div className="text-red-600 text-xs">
                                  {errors.possibleservices}
                                </div>
                              )}
                          </div>
                        </div>
                      </div>
                      <div className=" space-y-[10px] py-[20px] px-[10px]">
                        <div className="">
                          <div className="text-[13px]">Email </div>
                          <input
                            className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]"
                            type="email"
                            name="email"
                            value={formik.values.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                        </div>
                        <div className="">
                          <div className="text-[13px]">Phone Number </div>
                          <input
                            className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]"
                            type="text"
                            name="phoneNumber"
                            value={formik.values.phoneNumber}
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
                      {isSubmitting ? <CircularProgress /> : "Save"}
                    </button>
                    <button
                      className="w-[100px] h-[35px] border-[1px] border-[#282828] rounded-md"
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
        loading={false}
        btnTitle="Save"
        onClose={() => {
          setOpenConfimation(false);
        }}
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
  </>;
  // );
};

export default ProspectForm;
