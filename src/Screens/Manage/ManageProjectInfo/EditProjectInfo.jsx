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
import Draggable from 'react-draggable';
const EditProjectInfo = ({handleClose,currProject,showSuccess ,showCancel}) => {
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
            "duespayablemonth": null,
            "policestation" : null,
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
    const getBuildersData = async () => {
        const data = {
         "user_id" : 1234
        }
        const response = await APIService.getBuildersAdmin(data);
        const res = await response.json();
        console.log(res)
        setBuilderNameData(res.data)
     }
     const getProjectTypeData = async () => {
         const data = {
             "user_id" : 1234
         }
         const response = await APIService.getProjectTypeAdmin(data)
         const res = await response.json();
         console.log(res.data)
         setProjectTypeData(res.data)
     } 
     const getProjectLegalData = async () => {
         const data = {
             "user_id" : 1234
         }
         const response = await APIService.getProjectLegalStatusAdmin(data)
         const res = await response.json();
         console.log(res.data)
         setProjectLegalData(res.data)
     }





















    const [formErrors,setFormErrors] = useState({})
    const [pageLoading,setPageLoading] = useState(false)
    const fetchInitialProjectData = async () => {
        setPageLoading(true)
        const data = {
            "user_id" : 1234,
            "id" : currProject
        }
        console.log(data)
        const response = await APIService.getProjectById(data)
        const res = await response.json()
        console.log(res.data)
        setFormValues(res.data)
        setPageLoading(false)
    }
    const [helperData,setHelperData] = useState({})
    const fetchInitialDataHelper = async () => {
        setPageLoading(true)
        const data = {
            "user_id" : 1234,
            "id" : currProject
        }
        console.log(data)
        const response = await APIService.getProjectById(data)
        const res = await response.json()
        console.log(res.data)
        setHelperData(res.data)
        // setFormValues(res.data)
        setPageLoading(false)
    }
    useEffect(() => {
        fetchInitialDataHelper()
       fetchInitialProjectData()
       getBuildersData()
      getProjectTypeData()
      getProjectLegalData()
    },[])
    const validate = () => {
        // var res = true
        console.log(formValues)
        let res = {
            status : true,
            page : 1
        }
        if(formValues.project_info.project_legal_status == null || formValues.project_info.project_legal_status == "") {
            // we need to set the formErrors
            setFormErrors((existing) => {
                return { ...existing, project_legal_status: "Enter Project Legal Status" }
            })
            
            res.status = false
            res.page = 2
        }else {
            setFormErrors((existing) => {
                return { ...existing, project_legal_status: "" }
            })
        }
        // if(formValues.project_info.)
        if(formValues.project_info.projectname == null || formValues.project_info.projectname == ""  ) {
            // we need to set the formErrors
            setFormErrors((existing) => {
                return { ...existing, projectname: "Enter Project name" }
            })
            res.status = false
        }else {
            setFormErrors((existing) => {
                return { ...existing, projectname: "" }
            })
        }
        if(formValues.project_info.project_type == null || formValues.project_info.project_type == "" || formValues.project_info.project_type == -1) {
            // we need to set the formErrors
            setFormErrors((existing) => {
                return { ...existing, project_type: "Select Project Type" }
            })
            res.status = false
        }else {
            setFormErrors((existing) => {
                return { ...existing, project_type: "" }
            })
        }
        if(formValues.project_info.addressline1 == null || formValues.project_info.addressline1 == "") {
            // we need to set the formErrors
            console.log('hey')
            setFormErrors((existing) => {
                return { ...existing, addressline1: "Enter Adress Line1" }
            })
            res.status = false
        }else {
            setFormErrors((existing) => {
                return { ...existing, addressline1: "" }
            })
        }
        
        if(formValues.project_info.suburb == null || formValues.project_info.suburb == "") {
            // we need to set the formErrors
            setFormErrors((existing) => {
                return { ...existing, suburb: "Enter Suburb" }
            })
            res.status = false
        }else {
            setFormErrors((existing) => {
                return { ...existing, suburb: "" }
            })
        }



        if(formValues.project_info.builderid == null || formValues.project_info.builderid == "") {
            // we need to set the formErrors
            setFormErrors((existing) => {
                return { ...existing, builderid: "Select Builder Name" }
            })
            
            res.status = false
        }else {
            setFormErrors((existing) => {
                return { ...existing, builderid: "" }
            })
        }
        
        return res
    }
    const helper1 = (insertBankDetails,updateBankDetails) => {
        var size = formValues.project_bank_details.length
      for(var i=0;i<size;i++) {
        const tempObj = formValues.project_bank_details[i]
        if(tempObj.hasOwnProperty('id')) {
            // it has a property id
            var weNeed = {};
            for(var j=0;j<helperData.project_bank_details.length;j++) {
                 if(tempObj.id === helperData.project_bank_details[j].id) {
                     weNeed = helperData.project_bank_details[j]
                 }
            }
            const str1 = JSON.stringify(weNeed)
            const str2 = JSON.stringify(tempObj);
            if(str1 !== str2) {
                updateBankDetails.push(tempObj);
            }
        }else {
                insertBankDetails.push(tempObj);   
        }
      }
    }
    const helper2 = (insertContacts,updateContacts) => {
        var size = formValues.project_contacts.length
      for(var i=0;i<size;i++) {
        const tempObj = formValues.project_contacts[i]
        if(tempObj.hasOwnProperty('id')) {
            // it has a property id
            var weNeed = {};
            for(var j=0;j<helperData.project_contacts.length;j++) {
                 if(tempObj.id === helperData.project_contacts[j].id) {
                     weNeed = helperData.project_contacts[j]
                 }
            }
            const str1 = JSON.stringify(weNeed)
            const str2 = JSON.stringify(tempObj);
            if(str1 !== str2) {
                updateContacts.push(tempObj);
            }
        }else {
                insertContacts.push(tempObj);   
        }
      }
    }
    const helper3 = (insertPhotos,updatePhotos) => {
        var size = formValues.project_photos.length
      for(var i=0;i<size;i++) {
        const tempObj = formValues.project_photos[i]
        if(tempObj.hasOwnProperty('id')) {
            // it has a property id
            var weNeed = {};
            for(var j=0;j<helperData.project_photos.length;j++) {
                 if(tempObj.id === helperData.project_photos[j].id) {
                     weNeed = helperData.project_photos[j]
                 }
            }
            const str1 = JSON.stringify(weNeed)
            const str2 = JSON.stringify(tempObj);
            if(str1 !== str2) {
                updatePhotos.push(tempObj);
            }
        }else {
            insertPhotos.push(tempObj);   
        }
      }
    }
    const handleEdit = async () => {
        const temp = validate();
        if(!temp.status) {
            setSelectedDialogue(temp.page)
            return 
        }
        const insertBankDetails = []
        const updateBankDetails = []
        const insertContacts = []
        const updateContacts = []
        const insertPhotos = []
        const updatePhotos = []
        helper1(insertBankDetails,updateBankDetails)
        helper2(insertContacts,updateContacts)
        helper3(insertPhotos,updatePhotos)
        // we need to do the helper logic here
        
        const data = {
            "user_id": 1234,
            "projectid": currProject,
            "project_info": {
              "id": currProject,
              "builderid": Number(formValues.project_info.builderid),
              "projectname": formValues.project_info.projectname,
              "addressline1": formValues.project_info.addressline1,
              "addressline2": formValues.project_info.addressline2,
              "suburb": formValues.project_info.suburb,
              "city": Number(formValues.project_info.city),
              "state": formValues.project_info.state,
              "country": Number(formValues.project_info.country),
              "zip": formValues.project_info.zip,
              "nearestlandmark": formValues.project_info.nearestlandmark,
              "project_type": Number(formValues.project_info.project_type),
              "mailgroup1": formValues.project_info.mailgroup1,
              "mailgroup2": formValues.project_info.mailgroup2,
              "website": formValues.project_info.website,
              "project_legal_status": Number(formValues.project_info.project_legal_status),
              "rules": formValues.project_info.rules,
              "completionyear": Number(formValues.project_info.completionyear),
              "jurisdiction": formValues.project_info.jurisdiction,
              "taluka": formValues.project_info.taluka,
              "corporationward": formValues.project_info.corporationward,
              "policechowkey": formValues.project_info.policechowkey,
              "maintenance_details": formValues.project_info.maintenance_details,
              "numberoffloors": Number(formValues.project_info.numberoffloors),
              "numberofbuildings": Number(formValues.project_info.numberofbuildings),
              "approxtotalunits": formValues.project_info.approxtotalunits,
              "tenantstudentsallowed": formValues.project_info.tenantstudentsallowed,
              "tenantworkingbachelorsallowed": formValues.project_info.tenantworkingbachelorsallowed,
              "tenantforeignersallowed": formValues.project_info.tenantforeignersallowed,
              "otherdetails": formValues.project_info.otherdetails,
              "duespayablemonth": formValues.project_info.duespayablemonth,
              "policestation" : formValues.project_info.policestation
            },
            "project_amenities" : {
                "id" : currProject,
                "swimmingpool": formValues.project_amenities.swimmingpool,
                "lift": formValues.project_amenities.lift,
                "liftbatterybackup": formValues.project_amenities.liftbatterybackup,
                "clubhouse": formValues.project_amenities.clubhouse,
                "gym": formValues.project_amenities.gym,
                "childrensplayarea": formValues.project_amenities.childrensplayarea,
                "pipedgas": formValues.project_amenities.pipedgas,
                "cctvcameras": formValues.project_amenities.cctvcameras,
                "otheramenities": formValues.project_amenities.otheramenities,
                "studio": formValues.project_amenities.studio,
                "1BHK": formValues.project_amenities['1BHK'],
                "2BHK": formValues.project_amenities['2BHK'],
                "3BHK": formValues.project_amenities['3BHK'],
                "4BHK": formValues.project_amenities['4BHK'],
                "RK": formValues.project_amenities['RK'],
                "penthouse": formValues.project_amenities.penthouse,
                "other": formValues.project_amenities.other,
                "duplex": formValues.project_amenities.duplex,
                "rowhouse": formValues.project_amenities.rowhouse,
                "otheraccomodationtypes": formValues.project_amenities.otheraccomodationtypes,
                "sourceofwater": formValues.project_amenities.sourceofwater
            },
            "project_bank_details": {
              "update": updateBankDetails,
              "insert": insertBankDetails,
              "delete": []
            },
            "project_contacts": {
              "insert": insertContacts,
              "update": updateContacts
            },
            "project_photos": {
              "insert": insertPhotos,
              "update": updatePhotos
            }
          }
          const response = await APIService.editProject(data);
          const res = await response.json()
          if(res.result == 'success') {
            showSuccess()
          }
        
    }
    const close = () =>{
        handleClose();
        showCancel();
    }
  return ( 
    <Modal open={true}
                fullWidth={true}
                maxWidth={'md'}
                className='flex justify-center items-center'
            >
                <>
                    <div className='flex justify-center'>
                        <Draggable>
                        <div className="w-[1050px] h-auto bg-white rounded-lg">
                            <div className="h-[40px] bg-[#EDF3FF]  justify-center flex items-center rounded-lg">
                                <div className="mr-[410px] ml-[410px]">
                                    <div className="text-[16px]">Edit project</div>
                                </div>
                                <div className="flex justify-center items-center rounded-full w-[30px] h-[30px] bg-white mr-2">
                                    <button onClick={() => {close()}}><img className="w-[20px] h-[20px] " src={Cross} alt="cross" /></button>
                                </div>
                            </div>
                            <div className="mt-1 flex bg-[#DAE7FF] justify-evenly items-center h-9">
                                <div className={`${selectedDialogue == 1 ? "bg-blue-200" : "bg-[#EBEBEB]"}  px-4 py-1 rounded-md text-[12px] font-semibold flex justify-center items-center h-7 w-40`} >
                                    <button onClick={() => setSelectedDialogue(1)}><div>Project Information</div></button>
                                </div>
                                <div className={`${selectedDialogue == 2 ? "bg-blue-200" : "bg-[#EBEBEB]"}  px-4 py-1 rounded-md text-[12px] font-semibold flex justify-center items-center h-7 w-40`}>
                                    <button onClick={() => setSelectedDialogue(2)}><div>Project details</div></button>
                                </div>
                                <div className={`${selectedDialogue == 3 ? "bg-blue-200" : "bg-[#EBEBEB]"}  px-4 py-1 rounded-md text-[12px] font-semibold flex justify-center items-center h-7 w-40`}>
                                    <button onClick={() => setSelectedDialogue(3)}><div>Bank details</div></button>
                                </div>
                                <div className={`${selectedDialogue == 4 ? "bg-blue-200" : "bg-[#EBEBEB]"}  px-4 py-1 rounded-md text-[12px] font-semibold flex justify-center items-center h-7 w-40`}>
                                    <button onClick={() => setSelectedDialogue(4)}><div>Contacts</div></button>
                                </div>
                                <div className={`${selectedDialogue == 5 ? "bg-blue-200" : "bg-[#EBEBEB]"}  px-4 py-1 rounded-md text-[12px] font-semibold flex justify-center items-center h-7 w-40`}>
                                    <button onClick={() => setSelectedDialogue(5)}><div>Photos</div></button>
                                </div>
                            </div>
                            {!pageLoading && <>
                            {selectedDialogue == 1 && <EditProjectInformation formValues={formValues} setFormValues={setFormValues} builderNameData={builderNameData} projectTypeData={projectTypeData} formErrors={formErrors} />}
                            {selectedDialogue == 2 && <EditProjectDetails formValues={formValues} setFormValues={setFormValues} projectLegalData={projectLegalData} formErrors={formErrors}/>}
                            {selectedDialogue == 3 && <EditBankDetails formValues={formValues} setFormValues={setFormValues}/>}
                            {selectedDialogue == 4 && <EditContact formValues={formValues} setFormValues={setFormValues}/>}
                            {selectedDialogue == 5 &&  <EditPhotos formValues={formValues} setFormValues={setFormValues}/>}
                            </>}
                            {/* {selectedDialogue == 1 && <ProjectInformation  />}
                            {selectedDialogue == 2 && <ProjectDetails />}
                            {selectedDialogue == 3 && <BankDetails formValues={formValues} setFormValues={setFormValues}/>}
                            {selectedDialogue == 4 && <Contact formValues={formValues} setFormValues={setFormValues}/>}
                            {selectedDialogue == 5 && <Photos formValues={formValues} setFormValues={setFormValues}/>} */}
                            <div className="my-2 flex justify-center items-center gap-[10px]">
                                <button className='w-[100px] h-[35px] bg-[#004DD7] text-white rounded-md' onClick={handleEdit} >Save</button>
                                <button className='w-[100px] h-[35px] border-[1px] border-[#282828] rounded-md' onClick={() => {close()}}>Cancel</button>
                            </div>
                        </div>
                        </Draggable>
                    </div>
                </>
            </Modal>
  )
}

export default EditProjectInfo
