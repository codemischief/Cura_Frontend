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
  addBanksAndBranches,
  editBanksAndBranches
} from "../../../Redux/slice/Research/BanksAndBranchesSlice"
import { ModalHeader } from "../../../Components/modals/ModalAtoms";
import CustomSelect from "../../../Components/common/select/CustomSelect";

const validationSchema = Yup.object().shape({
  bankname : Yup.string().required('Enter Bank Name '),
  bankaddress : Yup.string().required('Enter Bank Address'),

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
const BankAndBranchesForm = ({ isOpen, handleClose, editData, openSucess }) => {
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState("");
  const [openConfirmation, setOpenConfimation] = useState(false);
  const { formSubmissionStatus } = useSelector((state) => state.employer);

  



  useEffect(() => {

  }, []);


  const formik = useFormik({
    initialValues: {
      
      bankname : editData?.name ? editData.name : null,
      bankaddress : editData?.branchaddress ? editData.branchaddress : null,
      contactperson : editData?.contactperson ? editData.contactperson : null,
      phonenumber : editData?.phoneno ? editData.phoneno : null,
      emailid : editData?.emailid ? editData.emailid : null,
      website : editData?.website ? editData.website : null,
      notes : editData?.notes ? editData.notes : null,
      excludefrommailinglist : editData?.excludefrommailinglist ? editData.excludefrommailinglist : false,
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
        name : values.bankname,
        branchaddress : values.bankaddress,
        emailid : values.emailid,
        phoneno : values.phonenumber,
        website : values.website,
        contactperson : values.contactperson,
        excludefrommailinglist : values.excludefrommailinglist,
        notes : values.notes
      };

      if (editData?.id) {
        data.id = editData.id
        await dispatch(editBanksAndBranches(data));
        openSucess();
      } else {
        await dispatch(addBanksAndBranches(data));
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
                      title={editData.id ? "Edit Banks And Branches" : "New Banks And Branches"}
                    />
                    </div>
                    <div className="h-auto w-full mt-[5px] ">
                      <div className="flex gap-[48px] justify-center items-start">
                        <div className=" space-y-[10px] py-[20px] px-[10px]">
                          <div className="">
                            <div className="flex">
                              <label className="inputFieldLabel">
                                Bank Name
                              </label>
                              <span className="requiredError">*</span>
                            </div>
                            <input
                              className="inputFieldBorder inputFieldValue"
                              type="text"
                              name="bankname"
                              value={formik.values.bankname}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            />
                            <div className="inputValidationError">
                              {touched.bankname && errors.bankname && (
                                <div>{errors.bankname}</div>
                              )}
                            </div>
                          </div>
                          <div className="">
                            <div className="flex">
                              <label className="inputFieldLabel">
                                Branch Address
                              </label>
                              <span className="requiredError">*</span>
                            </div>
                            <input
                              className="inputFieldBorder inputFieldValue"
                              type="text"
                              name="bankaddress"
                              value={formik.values.bankaddress}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            />
                            <div className="inputValidationError">
                              {touched.bankaddress && errors.bankaddress && (
                                <div>{errors.bankaddress}</div>
                              )}
                            </div>
                          </div>
                          <div className="">
                            <div className="flex">
                              <label className="inputFieldLabel">
                                Contact Person 
                              </label>
                            </div>
                            <input
                              className="inputFieldBorder inputFieldValue"
                              type="text"
                              name="contactperson"
                              value={formik.values.contactperson}
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
                            
                          </div>
                          <div className="">
                            <div className="flex">
                              <label className="inputFieldLabel">
                                Notes
                              </label>
                              
                            </div>
                            <input
                              className="inputFieldBorder inputFieldValue"
                              type="text"
                              name="notes"
                              value={formik.values.notes}
                              onBlur={handleBlur}
                              onChange={handleChange}
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
          btnTitle={editData?.id ? "Save" : "Add"}
          onClose={() => {
            setOpenConfimation(false);
          }}
          errors={apiError}
          onSubmit={handleConfirm}
          title={`${editData?.id ? 'Save Bank And Branch' : 'Add Bank And Branch'}`}
          description={
            <div>
              <p className="">Bank Name: {values.bankname}</p>
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
                Are you sure you want to {editData?.id ? 'Save' : 'Add'} this Bank and Branch?
              </Typography>
            </div>
          }
        />
      )}
    </>
  );
  // );
};

BankAndBranchesForm.propTypes = {
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
export default BankAndBranchesForm;
