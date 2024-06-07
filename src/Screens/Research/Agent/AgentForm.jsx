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
  addAgents,
  editAgents
} from "../../../Redux/slice/Research/AgentSlice"
import { ModalHeader } from "../../../Components/modals/ModalAtoms";
import CustomSelect from "../../../Components/common/select/CustomSelect";

const validationSchema = Yup.object().shape({
  nameofagent : Yup.string().required('Enter Name Of Agent'),
  // employername : Yup.string().required('Employer Name Is Required'),
  // countryId: Yup.string().required("Country Name is required"),
  // state: Yup.string().required("State is required"),
  // city: Yup.string().required("City is required"),
});
const AgentForm = ({ isOpen, handleClose, editData, openSucess }) => {
  const dispatch = useDispatch();
  const [countryData, setCountryData] = useState([]);
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
    setCountryData(result)
    setLoading(false);
  };

  const fetchCityData = async (id) => {
    const data = { user_id: 1234, state_name: id };
    const response = await APIService.getCities(data);
    const result = (await response.json()).data;
    setCityData(result);
  };

  useEffect(() => {
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
//   {
//     "user_id": "1234",
//     "nameofagent": "John Doe",
//     "agencyname": "Doe Realty",
//     "emailid": "john.doe@example.com",
//     "phoneno": "123-456-7890",
//     "phoneno2": "987-654-3210",
//     "localitiesdealing": "Downtown, Suburbia",
//     "nameofpartners": "Jane Smith, Michael Johnson",
//     "registered": "registered"
// }
  const formik = useFormik({
    initialValues: {
      nameofagent : editData.nameofagent ? editData.nameofagent : null,
      emailid : editData.emailid ? editData.emailid : null,
      phoneno : editData.phoneno ? editData.phoneno : null,
      localitiesdealing : editData.localitiesdealing ? editData.localitiesdealing : null,
      agencyname : editData.agencyname ? editData.agencyname : null,
      phoneno2 : editData.phoneno2 ? editData.phoneno2 : null,
      registered : editData.registered ? editData.registered : false,
      reraregistrationnumber : editData.reraregistrationnumber ? editData.reraregistrationnumber : null,
      // employername : editData?.employername ? editData.employername : "",
      // adressline1 : editData?.addressline1 ? editData.addressline1 : "",
      // adressline2 : editData?.addressline2 ? editData.addressline2 : "",
      // countryId: editData?.country ? editData.country : 5,
      // state: editData?.state ? editData.state : "Maharashtra",
      // city: editData?.city ? editData.city : "Pune",
      // zip : editData?.zip ? editData.zip : "",
      // industry : editData?.industry ? editData.industry : "",
      // hrcontactname : editData?.hrcontactname ? editData.hrcontactname : "",
      // hrcontactphone : editData?.hrcontactphone ? editData.hrcontactphone : "",
      // hrcontactmail : editData?.hrcontactmail ? editData.hrcontactmail : "",
      // admincontactname : editData?.admincontactname ? editData.admincontactname : "",
      // admincontactmail : editData?.admincontactmail ? editData.admincontactmail : "",
      // hc : editData?.hc ? emailData.hc : "",
      // website : editData?.website ? emailData.website : "",
      // contactname1 : editData?.contactname1 ? emailData.contactname1 : "",
      // contactphone1 : editData?.contactphone1 ? emailData.contactphone1 : "",
      // contactmail1 : editData?.contactmail1 ? emailData.contactmail1 : "",
      // contactname2 : editData?.contactname2 ? emailData.contactname2 : "",
      // contactphone2 : editData?.contactphone2 ? emailData.contactphone2 : "",
      // contactmail2 : editData?.contactmail2 ? emailData.contactmail2 : ""
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
    // console.log(e.target)
    // setFieldValue(e.target.name, e.target.value);
    const { type, name, value, checked } = e.target;
    // const fieldValue = type === 'checkbox' ? checked : value;
    console.log(name, checked);
    if(type == 'checkbox') {
      setFieldValue(name,checked)
    }else {

      setFieldValue(name, value);
    }
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
                      title={editData.id ? "Edit Real Estate Agent" : "New Real Estate Agent"}
                    />
                    </div>
                    <div className="h-auto w-full mt-[5px] ">
                      <div className="flex gap-[48px] justify-center items-start">
                        <div className=" space-y-[10px] py-[20px] px-[10px]">
                          <div className="">
                            <div className="flex">
                              <label className="inputFieldLabel">
                                 Name Of Agent
                              </label>
                              <span className="requiredError">*</span>
                            </div>
                            <input
                              className="inputFieldBorder inputFieldValue"
                              type="text"
                              name="nameofagent"
                              value={formik.values.nameofagent}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            />
                            <div className="inputValidationError">
                              {touched.nameofagent && errors.nameofagent && (
                                <div>{errors.nameofagent}</div>
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
                            <div className="flex">
                              <label className="inputFieldLabel">
                                Phone Number
                              </label>
                            </div>
                            <input
                              className="inputFieldBorder inputFieldValue"
                              type="text"
                              name="phoneno"
                              value={formik.values.phoneno}
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
                                Locality Dealing
                              </label>
                              
                            </div>
                            <input
                              // className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]"
                              className="inputFieldBorder inputFieldValue"
                              type="text"
                              name="localitiesdealing"
                              value={formik.values.localitiesdealing}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            
                          </div>
                         
                          
                          
                         
                          
                          

                          
                        </div>
                        <div className=" space-y-[10px] py-[20px] px-[10px]">
                          <div className="">
                            {/* <div className="text-[13px]">Email </div> */}
                            <label className="inputFieldLabel">Agency Name</label>
                            <input
                              // className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]"
                              className="inputFieldBorder inputFieldValue"
                              type="text"
                              name="agencyname"
                              value={formik.values.agencyname}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </div>
                          <div className="">
                            {/* <div className="text-[13px]">Phone Number </div> */}
                            <label className="inputFieldLabel">
                              Whatsapp Number
                            </label>
                            <input
                              // className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]"
                              className="inputFieldBorder inputFieldValue"
                              type="text"
                              name="phoneno2"
                              value={formik.values.phoneno2}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </div>
                          <div className="">
                            {/* <div className="text-[13px]">Phone Number </div> */}
                            <label className="inputFieldLabel">
                              Address 
                            </label>
                            <input
                              // className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]"
                              className="inputFieldBorder inputFieldValue"
                              type="text"
                              name="hrcontactphone"
                              value={formik.values.localitiesdealing}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </div>
                          <div className="">
                            {/* <div className="text-[13px]">Phone Number </div> */}
                            <label className="inputFieldLabel">
                              RERA Registration Number
                            </label>
                            <input
                              // className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px]"
                              className="inputFieldBorder inputFieldValue"
                              type="text"
                              name="localitiesdealing"
                              value={formik.values.localitiesdealing}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                          </div>
                          
                          
                          
                          
                          
                        </div>



                        
                      </div>
                      <div className="w-full h-20  flex items-center justify-center">
                         <div className="flex items-center">
                            <input 
                             type="checkbox" checked={formik.values.registered}
                                className='mr-3 h-4 w-4'
                                name="registered"
                                onBlur={handleBlur}
                                onChange={handleChange}/>
                              <label className="inputFieldLabel">
                                RERA Registered
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
          btnTitle={editData?.id ? "Save" : "Add"}
          onClose={() => {
            setOpenConfimation(false);
          }}
          errors={apiError}
          onSubmit={handleConfirm}
          title={`${editData?.id ? 'Save' : 'Add'} Real Estate Agent`}
          description={
            <div>
              <p className="">Agent: {values.nameofagent}</p>
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
                Are you sure you want to {editData?.id ? 'Save' : 'Add'} this Real Estate Agent?
              </Typography>
            </div>
          }
        />
      )}
    </>
  );
  // );
};

AgentForm.propTypes = {
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
export default AgentForm;
