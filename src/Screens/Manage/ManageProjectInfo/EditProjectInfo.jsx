import React, { useState } from 'react'
import { Modal } from '@mui/material'
import Cross from "../../../assets/cross.png"
import ProjectInformation from "./ManageProjectInfoForm/ProjectInformation";
import ProjectDetails from "./ManageProjectInfoForm/ProjectDetails";
import BankDetails from "./ManageProjectInfoForm/BankDetails";
import Contact from './ManageProjectInfoForm/Contact';
import Photos from './ManageProjectInfoForm/Photos';
import EditProjectInformation from './ManageProjectInfoForm/EditProjectInformation';
import EditProjectDetails from './ManageProjectInfoForm/EditProjectDetails';
import EditBankDetails from './ManageProjectInfoForm/EditBankDetails';
import EditContact from './ManageProjectInfoForm/EditContact';
const EditProjectInfo = ({handleClose}) => {
    const [selectedDialogue,setSelectedDialogue] = useState(1)
    const initialValues = {
        "project_info": {
            "builderid": 10231,
            "projectname": "testproject",
            "addressline1": "addressline1",
            "addressline2": "addressline2",
            "suburb": "testsub",
            "city": 847,
            "state": "Maharashtra",
            "country": 5,
            "zip": "testzip",
            "nearestlandmark": "landmark1",
            "project_type": 2,
            "mailgroup1": "mailgrouptest",
            "mailgroup2": "newmailgrouptest",
            "website": "websitetest.com",
            "project_legal_status": 2,
            "rules": "rule1, rule2, rule3",
            "completionyear": 2021,
            "jurisdiction": "ajuri",
            "taluka": "tal",
            "corporationward": "ward",
            "policechowkey": "chowkey",
            "maintenance_details": "deets",
            "numberoffloors": 5,
            "numberofbuildings": 4,
            "approxtotalunits": 100,
            "tenantstudentsallowed": true,
            "tenantworkingbachelorsallowed": true,
            "tenantforeignersallowed": true,
            "otherdetails": true,
            "duespayablemonth": 3
        },
        "project_amenities": {
          "swimmingpool": true,
          "lift": true,
          "liftbatterybackup": true,
          "clubhouse": true,
          "gym": true,
          "childrensplayarea": true,
          "pipedgas": true,
          "cctvcameras": true,
          "otheramenities": "newdata",
          "studio": true,
          "1BHK": true,
          "2BHK": true,
          "3BHK": true,
          "4BHK": true,
          "RK": true,
          "penthouse": true,
          "other": true,
          "duplex": true,
          "rowhouse": false,
          "otheraccomodationtypes": "4BHK, RK, penthouse, other, duplex",
          "sourceofwater": "abc"
        },
        "project_bank_details": [
          {
            "bankname": "Banktest",
            "bankbranch": "branchtest",
            "bankcity": "Pune",
            "bankaccountholdername": "Rudra",
            "bankaccountno": "ABD102834732",
            "bankifsccode": "PUN101",
            "banktypeofaccount": "savings",
            "bankmicrcode": "MICR1234"
          },
          {
            "bankname": "Banktest",
            "bankbranch": "branchtest1",
            "bankcity": "Pune",
            "bankaccountholdername": "Rudra",
            "bankaccountno": "ABD1046464732",
            "bankifsccode": "PUN102",
            "banktypeofaccount": "savings",
            "bankmicrcode": "MICR1234"
          }
        ],
        "project_contacts": [
          {
            "contactname": "Rudra",
            "phone": "9796543567",
            "email": "abc",
            "role": "owner",
            "effectivedate": "2021-02-04 10:00:00",
            "tenureenddate": "2024-02-04 10:00:00",
            "details": "hreiufhuire"
          },
          {
            "contactname": "Rudra_2",
            "phone": "9456545514",
            "email": "efg",
            "role": "manager",
            "effectivedate": "2021-02-04 10:00:00",
            "tenureenddate": "2024-02-04 10:00:00",
            "details": "hreiufhuire"
          }
        ],
        "project_photos":[
          {
              "photo_link":"link1",
              "description":"Desc 1",
              "date_taken":"2024-03-01"
          },
          {
              "photo_link":"link2",
              "description":"Desc2",
              "date_taken":"2024-01-01"   
          }
        ]
      }
    const [formValues,setFormValues] = useState(initialValues)
    const [projectTypeData,setProjectTypeData] = useState([])
    const [builderNameData,setBuilderNameData] = useState([])
    const [projectLegalData,setProjectLegalData] = useState([])
  return ( 
    <Modal open={true}
                fullWidth={true}
                maxWidth={'md'}
                className='flex justify-center items-center'
            >
                <>
                    <div className='flex justify-center'>
                        <div className="w-[1050px] h-auto bg-white rounded-lg">
                            <div className="h-[40px] bg-[#EDF3FF]  justify-center flex items-center rounded-lg">
                                <div className="mr-[410px] ml-[410px]">
                                    <div className="text-[16px]">Edit project</div>
                                </div>
                                <div className="flex justify-center items-center rounded-full w-[30px] h-[30px] bg-white mr-2">
                                    <button onClick={handleClose}><img className="w-[20px] h-[20px] " src={Cross} alt="cross" /></button>
                                </div>
                            </div>
                            <div className="mt-1 flex bg-[#DAE7FF] justify-evenly items-center h-9">
                                <div className="bg-[#EBEBEB] px-4 py-1 rounded-md text-[12px] font-semibold flex justify-center items-center h-7 w-40" >
                                    <button onClick={() => setSelectedDialogue(1)}><div>Project Information</div></button>
                                </div>
                                <div className="bg-[#EBEBEB] px-4 py-1 rounded-md text-[12px] font-semibold flex justify-center items-center h-7 w-40">
                                    <button onClick={() => setSelectedDialogue(2)}><div>Project details</div></button>
                                </div>
                                <div className="bg-[#EBEBEB] px-4 py-1 rounded-md text-[12px] font-semibold flex justify-center items-center h-7 w-40">
                                    <button onClick={() => setSelectedDialogue(3)}><div>Bank details</div></button>
                                </div>
                                <div className="bg-[#EBEBEB] px-4 py-1 rounded-md text-[12px] font-semibold flex justify-center items-center h-7 w-40">
                                    <button onClick={() => setSelectedDialogue(4)}><div>Contacts</div></button>
                                </div>
                                <div className="bg-[#EBEBEB] px-4 py-1 rounded-md text-[12px] font-semibold flex justify-center items-center h-7 w-40">
                                    <button onClick={() => setSelectedDialogue(5)}><div>Photos</div></button>
                                </div>
                            </div>
                            {selectedDialogue == 1 && <EditProjectInformation formValues={formValues} setFormValues={setFormValues} builderNameData={builderNameData} projectTypeData={projectTypeData} />}
                            {selectedDialogue == 2 && <EditProjectDetails formValues={formValues} setFormValues={setFormValues} projectLegalData={projectLegalData}/>}
                            {selectedDialogue == 3 && <EditBankDetails formValues={formValues} setFormValues={setFormValues}/>}
                            {selectedDialogue == 4 && <EditContact formValues={formValues} setFormValues={setFormValues}/>}
                            {/* {selectedDialogue == 1 && <ProjectInformation  />}
                            {selectedDialogue == 2 && <ProjectDetails />}
                            {selectedDialogue == 3 && <BankDetails formValues={formValues} setFormValues={setFormValues}/>}
                            {selectedDialogue == 4 && <Contact formValues={formValues} setFormValues={setFormValues}/>}
                            {selectedDialogue == 5 && <Photos formValues={formValues} setFormValues={setFormValues}/>} */}
                            <div className="my-2 flex justify-center items-center gap-[10px]">
                                <button className='w-[100px] h-[35px] bg-[#004DD7] text-white rounded-md' onClick={() => {}} >Save</button>
                                <button className='w-[100px] h-[35px] border-[1px] border-[#282828] rounded-md' onClick={handleClose}>Cancel</button>
                            </div>
                        </div>
                    </div>
                </>
            </Modal>
  )
}

export default EditProjectInfo
