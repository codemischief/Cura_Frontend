import React, { useState ,useEffect} from 'react'
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
import EditPhotos from './ManageProjectInfoForm/EditPhotos';
import { APIService } from '../../../services/API';
const EditProjectInfo = ({handleClose,currProject}) => {
    const [selectedDialogue,setSelectedDialogue] = useState(1)
    const initialValues = {
        "project_info": {
            "builderid": null,
            "projectname": null,
            "addressline1": null,
            "addressline2": null,
            "suburb": null,
            "city": 847,
            "state": 'Maharashtra',
            "country": 5,
            "zip": null,
            "nearestlandmark": null,
            "project_type": null,
            "mailgroup1": null,
            "mailgroup2": null,
            "website": null,
            "project_legal_status": null,
            "rules": null,
            "completionyear": null,
            "jurisdiction": null,
            "taluka": null,
            "corporationward": null,
            "policechowkey": null,
            "maintenance_details": null,
            "numberoffloors": null,
            "numberofbuildings": null,
            "approxtotalunits": null,
            "tenantstudentsallowed": null,
            "tenantworkingbachelorsallowed": null,
            "tenantforeignersallowed": null,
            "otherdetails": null,
            "duespayablemonth": null
        },
        "project_amenities": {
            "swimmingpool": null,
            "lift": null,
            "liftbatterybackup": null,
            "clubhouse": null,
            "gym": null,
            "childrensplayarea": null,
            "pipedgas": null,
            "cctvcameras": null,
            "otheramenities": null,
            "studio": null,
            "1BHK": null,
            "2BHK": null,
            "3BHK": null,
            "4BHK": null,
            "RK": null,
            "penthouse": null,
            "other": null,
            "duplex": null,
            "rowhouse": null,
            "otheraccomodationtypes": null,
            "sourceofwater": null
        },
        "project_bank_details": [
            
        ],
        "project_contacts": [
           
        ],
        "project_photos": [
            
        ]
    }
    const [formValues,setFormValues] = useState(initialValues)
    const [projectTypeData,setProjectTypeData] = useState([])
    const [builderNameData,setBuilderNameData] = useState([])
    const [projectLegalData,setProjectLegalData] = useState([])
    const fetchInitialProjectData = async () => {
        const data = {
            "user_id" : 1234,
            "id" : currProject
        }
        console.log(data)
        const response = await APIService.getProjectById(data)
        const res = await response.json()
        console.log(res.data)
        setFormValues(res.data)
    }
    useEffect(() => {
       fetchInitialProjectData()
    },[])
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
                            {selectedDialogue == 5 &&  <EditPhotos formValues={formValues} setFormValues={setFormValues}/>}
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
