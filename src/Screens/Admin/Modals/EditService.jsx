import React, { useState, useEffect } from "react";
import { Modal, responsiveFontSizes } from "@mui/material";
import Cross from "../../../assets/cross.png";
import { APIService } from "../../../services/API";
import Draggable from "react-draggable";

const EditService = ({
  handleClose,
  currService,
  allLOB,
  showSuccess,
  showCancel,
}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };
  const initialValues = {
    lob: null,
    serviceName: null,
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  // const [typeOfOrganization,setTypeOfOrganization] = useState([])
  // const [allCategory,setAllCategory] = useState([])
  // const [tallyLedgerData,setTallyLedgerData] = useState([])
  // const [allCity,setAllCity] = useState([])
  const fetchInitialData = async () => {
    console.log(currService);
    const data = {
      user_id: 1234,
      item_id: currService,
      table_name: "get_services_view",
    };
    const response = await APIService.getItembyId(data);
    const res = await response.json();
    console.log(res);
    const existing = { ...formValues };
    existing.lob = res.data.lobid;
    existing.serviceName = res.data.service;
    setFormValues(existing);
  };
  useEffect(() => {
    fetchInitialData();
  }, []);
  const validate = () => {
    var res = true;

    if (!formValues.serviceName) {
      setFormErrors((existing) => {
        return { ...existing, serviceName: "Enter The Name Of The Service" };
      });
      res = false;
    } else {
      setFormErrors((existing) => {
        return { ...existing, serviceName: "" };
      });
    }
    if (!formValues.lob) {
      setFormErrors((existing) => {
        return { ...existing, lob: "Enter Lob" };
      });
      res = false;
    } else {
      setFormErrors((existing) => {
        return { ...existing, lob: "" };
      });
    }

    return res;
  };
  const handleEdit = async () => {
    // we handle edit here
    if (!validate()) {
      return;
    }
    const data = {
      user_id: 1234,
      id: Number(currService),
      lob: Number(formValues.lob),
      service: formValues.serviceName,
      active: true,
      servicetype: "New service",
      category2: "Category",
      tallyledgerid: 28,
    };
    const response = await APIService.editService(data);
    const res = await response.json();
    if (res.result == "success") {
      //  we need to open edit Modal
      showSuccess();
    }
  };

  const close = () => {
    handleClose();
    showCancel();
  };

  // utility routes

  // end utility routes here
  return (
    <Modal open={true}
      fullWidth={true}
      maxWidth={'md'}
      className='flex justify-center items-center'
    >
      <>
        <Draggable>
          <div className='flex justify-center '>
            <div className="w-[700px] h-auto bg-white rounded-lg">
              <div className="h-[40px] bg-[#EDF3FF]  justify-center flex items-center rounded-lg">
                <div className="mr-[210px] ml-[210px]">
                  <div className="text-[16px]">New Service</div>
                </div>
                <div className="flex justify-center items-center rounded-full w-[30px] h-[30px] bg-white">
                  <button onClick={() => { handleClose() }}>
                    <img className="w-[20px] h-[20px]" src={Cross} alt="cross" />
                  </button>
                </div>
              </div>

              <div className="h-auto w-full">
                <div className="flex gap-[48px] justify-center items-center">
                  <div className=" space-y-[12px] py-[20px] px-[10px]">
                    <div className="">
                      <div className="text-sm">LOB <label className="text-red-500">*</label></div>
                      <select className="w-[230px] h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs"
                        name="lob"
                        value={formValues.lob}
                        defaultValue="Select lob"
                        onChange={e => {
                          // fetchCityData(e.target.value);
                          console.log(e.target.value);
                          setFormValues((existing) => {
                            const newData = { ...existing, lob: e.target.value }
                            return newData;
                          })

                        }}
                      >
                        <option value="none" hidden>Select a LOB</option>
                        {allLOB && allLOB.map(item => (
                          <option value={item.id} >
                            {item.name}
                          </option>
                        ))}
                      </select>
                      <div className="text-[10px] text-[#CD0000] ">{formErrors.lob}</div>
                    </div>
                    <div className="">
                      <div className="text-[13px]">Service Name <label className="text-red-500">*</label></div>
                      <input className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none" type="text" name="serviceName" value={formValues.serviceName} onChange={handleChange} />
                      <div className="text-[10px] text-[#CD0000] ">{formErrors.serviceName}</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="my-2 mt-10 flex justify-center items-center gap-[10px]">
                <button className='w-[100px] h-[35px] bg-[#004DD7] text-white rounded-md' onClick={handleEdit}>Save</button>
                <button className='w-[100px] h-[35px] border-[1px] border-[#282828] rounded-md' onClick={() => { handleClose() }}>Cancel</button>
              </div>
            </div>
          </div>
        </Draggable>
      </>
    </Modal>
  );
};

export default EditService;
