import { useEffect, useState } from "react";
import Draggable from "react-draggable";
import PropTypes from "prop-types";
import * as Yup from "yup";
import { Form, FormikProvider, useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { CircularProgress, Modal, Typography, MenuItem } from "@mui/material";

import { APIService } from "../../../services/API";
import ConfirmationModal from "../../../Components/common/ConfirmationModal";

import { ModalHeader } from "../../../Components/modals/ModalAtoms";
import CustomSelect from "../../../Components/common/select/CustomSelect";
import { addMandals, editMandals } from "../../../Redux/slice/Research/MandalSlice";
import CustomSelectNative from "../../../Components/common/select/CustomSelectNative";
import { getCountries } from "../../../Redux/slice/commonApis";
import useAuth from "../../../context/JwtContext";
const validationSchema = Yup.object().shape({
  countryId: Yup.string().required("Select Country"),
  state: Yup.string().required("Select State"),
  city: Yup.string().required("Select City"),
});
const MandalsForm = ({ isOpen, handleClose, editData, openSucess }) => {
  const dispatch = useDispatch();
  const {user} = useAuth();
  const { countryData } = useSelector((state) => state.commonApi);
  console.log(countryData)

  // const [countryData,setCountryData] = useState([])
  const [stateData, setStateData] = useState([]);
  const [cityData, setCityData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [openConfirmation, setOpenConfimation] = useState(false);
  const { formSubmissionStatus } = useSelector((state) => state.employer);

  

  const fetchCityData = async (id) => {
    const data = { user_id: user.id, state_name: id };
    const response = await APIService.getCities(data);
    const result = (await response.json()).data;
    setCityData(result);
  };
  const fetchCountryData = async () => {
    // setLoading(true);
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
    const idNameObject = {};
    result.forEach((country) => {
      idNameObject[country.id] = country.name;
    });
    // setCountryData(idNameObject)
    // setCountryData(result)
    // setLoading(false);
    // const resultConverted = await result?.reduce((acc, current) => {
    //   acc[current.id] = current.name;
    //   return acc;
    // }, {});

    // setCountryData({ arr: result, obj: resultConverted });
    console.log(countryData)
  };
  const [typeData,setTypeData] = useState([])
  const fetchTypeData = async () => {
    const d = {"user_id" : user.id}
    const response = await APIService.getMandalAdmin(d)
    const res = await response.json()
    setTypeData(res.data)
    console.log('hey')
  }
  useEffect(() => {
    fetchTypeData()
    // fetchCountryData()
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
      name : editData?.name ? editData.name :null,
      emailid : editData?.emailid ? editData.emailid : null,
      phonenumber : editData?.phoneno ? editData.phoneno : null,
      contactname1 : editData?.contactname1 ? editData.contactname1 : null,
      contactemail1 : editData?.email1 ? editData.email1 : null,
      phone1 : editData?.phoneno1 ? editData.phoneno1 : null,
      phone2 : editData?.phoneno2 ? editData.phoneno2 : null,
      countryId: editData?.countryid ? editData.countryid : 5,
      state: editData?.state ? editData.state : "Maharashtra",
      city: editData?.cityid ? editData.cityid : 847,
      locality : editData?.suburb ? editData.suburb : null,
      contactname2 : editData?.contactname2 ? editData.contactname2 : null,
      contactemail2 : editData?.email2 ? editData.email2 : null,
      website : editData?.website ? editData.website : null,
      excludefrommailinglist : editData?.excludefrommailinglist ? editData.excludefrommailinglist : null
      
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
        // {
          user_id: user.id,
          name:values.name,
          typeid: values.type,
          emailid:values.emailid,
          phoneno:values.phonenumber,
          suburb:values.locality,
          city : values.city,
          state : values.state,
          country : values.countryId,
          website : values.website,
          email1 : values.contactemail1,
          email2 : values.contactemail2,
          contactname1 : values.contactname1,
          contactname2 : values.contactname2,
          phoneno1 : values.phone1,
          phoneno2 : values.phone2,
          excludefrommailinglist : values.excludefrommailinglist
    
      };

      if (editData?.id) {
        data.id = editData?.id
        await dispatch(editMandals(data));
        openSucess();
      } else {
        await dispatch(addMandals(data));
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
                  <div className="w-[1100px] h-auto bg-white rounded-lg">
                    <div className="move cursor-move">

                    <ModalHeader
                      onClose={handleClose}
                      title={editData.id ? "Edit Mandal" : "New Mandal"}
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
                              onBlur={handleBlur}
                            >
                              <option value="" className="inputValidationError" hidden>
                                Select Type
                              </option>
                              {typeData?.length > 0 &&
                                typeData?.map((editData) => {
                                  return (
                                    <option
                                      value={editData.mandalid}
                                      key={editData.mandalid}
                                      
                                    >
                                      {editData.name}
                                    </option>
                                  );
                                })}
                            </select>
                            
                            {/* <div className="inputValidationError">
                              {touched.employername && errors.employername && (
                                <div>{errors.employername}</div>
                              )}
                            </div> */}
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
                            {/* <div className="inputValidationError">
                              {touched.employername && errors.employername && (
                                <div>{errors.employername}</div>
                              )}
                            </div> */}
                          </div>
                          <div className="">
                            <div className="flex">
                              <label className="inputFieldLabel">
                                Email ID
                              </label>
                            </div>
                            <input
                              className="inputFieldBorder inputFieldValue"
                              type="text"
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
                              name="contactemail1"
                              value={formik.values.contactemail1}
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
                              name="phone1"
                              value={formik.values.phone1}
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
                              name="phone2"
                              value={formik.values.phone2}
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
                              <label className="inputFieldLabel">
                                Country 
                              </label>
                              <span className="requiredError">*</span>
                            </div>
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
                                State Name
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
                                City Name
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
                                  <MenuItem value={item.id} key={item.id}>
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
                            {/* <div className="text-[13px]">Email </div> */}
                            <label className="inputFieldLabel">Locality</label>
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
                              name="contactemail2"
                              value={formik.values.contactemail2}
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
          title={`${editData?.id ? 'Save Mandal' : 'Add Mandal'}`}
          description={
            <div>
              <p className="">Mandal: {values.name}</p>
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
                Are you sure you want to {editData?.id ? 'Save' : 'Add'} this Mandal?
              </Typography>
            </div>
          }
        />
      )}
    </>
  );
  // );
};

MandalsForm.propTypes = {
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
export default MandalsForm;
