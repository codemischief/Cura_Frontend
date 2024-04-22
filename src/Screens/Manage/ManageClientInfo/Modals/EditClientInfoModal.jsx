import React, { useState ,useEffect} from 'react'
import Cross from "../../../../assets/cross.png";
import { Modal, Pagination, LinearProgress, CircularProgress } from "@mui/material";
import ClientInformation from '../Forms/ClientInformation';
import ClientPortal from '../Forms/ClientPortal';
import BankDetails from "../Forms/BankDetails";
import LegalInformation from "../Forms/LegalInformation";
import POADetails from '../Forms/POADetails';
import { all } from 'axios';
import EditClientInformation from '../Forms/EditClientInformation';
import EditBankDetails from '../Forms/EditBankDetails';
import EditClientPortal from '../Forms/EditClientPortal';
import EditPOADetails from '../Forms/EditPOADetails';
import EditLegalInformation from '../Forms/EditLegalInformation';
import { APIService } from '../../../../services/API';
const EditClientInfoModal = (props) => {
  
  const initalValues = {
    "client_info": {
        "firstname":"ABC",
        "middlename":"DEF",
        "lastname":"GHI",
        "salutation":"Mrs",
        "clienttype":2,
        "addressline1":"abcdefg",
        "addressline2":"hijklmno",
        "suburb":"sub",
        "city":"Navi Mumbai",
        "state":"Maharashtra",
        "country":5,
        "zip":"zipcode",
        "homephone":"9892839021",
        "workphone":"8934628291",
        "mobilephone":"9855645531",
        "email1":"abc@def.com",
        "email2":"ghi@jkl.com",
        "employername":"Employer",
        "comments":"abc\ndef\n",
        "photo":"efiufheu",
        "onlineaccreated":false,
        "localcontact1name":"abcd",
        "localcontact1address":"ghijklm",
        "localcontact1details":"jwdiuheduhef",
        "localcontact2name":"efgh",
        "localcontact2address":"fgeifhui",
        "localcontact2details":"efiehiufhurihf",
        "includeinmailinglist":true,
        "entityid":2,
        "tenantof":181132,
        "tenantofproperty":0
},
"client_access":[
        {
                "onlinemailid":"abc@efg.com",
                "onlinepwd":"abcdefgh",
                "onlineclue":"2024-03-03"
        },
        {
                "onlinemailid":"abc@JKL.com",
                "onlinepwd":"abcdeIJK",
                "onlineclue":"2024-03-03"
        }
],
"client_bank_info":[{
        "bankname":"banktest",
        "bankbranch":"branchtest",
        "bankcity":"abcd",
        "bankaccountno":"2635261394",
        "bankaccountholdername":"ABC",
        "bankifsccode":"tbcd",
        "bankmicrcode":"ufge",
        "bankaccounttype":"savings",
        "description":"dfheiuhfurhfuhrf"
},
{
        "bankname":"banktest",
        "bankbranch":"branchtest",
        "bankcity":"abcd",
        "bankaccountno":"2635261394",
        "bankaccountholdername":"ABC",
        "bankifsccode":"tbcd",
        "bankmicrcode":"ufge",
        "bankaccounttype":"savings",
        "description":"dfheiuhfurhfuhrf"
}],
"client_legal_info":{
        "fulllegalname":"ABC DEF GHI",
        "panno":"12345670",
        "addressline1":"hcegfegf efhiuhf",
        "addressline2":"frufhruigh fhirf",
        "suburb":"frhufh",
        "city":"Navi Mumbai",
        "state":"Maharashtra",
        "country":5,
        "zip":"zipcode",
        "occupation":"person",
        "birthyear":"2024-03-03",
        "employername":"GHI JKL",
        "relation":1,
        "relationwith":"MNOP QRST"
},
"client_poa":{
        "poalegalname":"abcdef ghijkl",
        "poapanno":"647364873",
        "poaaddressline1":"eyge rfhrughur rf",
        "poaaddressline2":"jrijg fruhfur ijf",
        "poasuburb":"sub",
        "poacity":"Mumbai",
        "poastate":"Maharashtra",
        "poacountry":5,
        "poazip":"zipcode",
        "poaoccupation":"person",
        "poabirthyear":"2024-03-03",
        "poaphoto":"fjr furhfusfufbrf",
        "poaemployername":"frijiurgh nfr",
        "poarelation":2,
        "poarelationwith":"ABC DEF",
        "poaeffectivedate":"2024-03-02",
        "poaenddate":"2024-03-03",
        "poafor":"ABC EFG",
        "scancopy":"dhegfhuefu"
}        
  }
  const [pageLoading,setPageLoading] = useState(false);
  const [updatedBankDetails,setUpdatedBankDetails] = useState([]);
  const [addedBankDetails,setAddedBankDetails] = useState([]);
  const [intitialClientData,setInitialClientData] = useState({});
  const [formValues,setFormValues] = useState(initalValues);
  const [allCountry,setAllCountry] = useState([]);
  const [allStates,setAllStates] = useState([]);
  const [allCities,setAllCities] = useState([]); 
  const [allEntities,setAllEntities] = useState([]);
  const [clientTypeData,setClientTypeData] = useState([]);
  const [tenentOfData,setTenentOfData] = useState([]);
  const [relationData,setRelationData] = useState([]);
  const [selectedDialog,setSelectedDialogue] = useState(1);
  
  function helper1(updateArrayAccess,insertArrayAccess, deleteArrayAccess,) {
      var size = formValues.client_access.length
      for(var i=0;i<size;i++) {
        const tempObj = formValues.client_access[i]
        if(tempObj.hasOwnProperty('id')) {
            // it has a property id
            var weNeed = {};
            for(var j=0;j<intitialClientData.client_access.length;j++) {
                 if(tempObj.id === intitialClientData.client_access[j].id) {
                     weNeed = intitialClientData.client_access[j]
                 }
            }
            const str1 = JSON.stringify(weNeed)
            const str2 = JSON.stringify(tempObj);
            if(str1 !== str2) {
                updateArrayAccess.push(tempObj);
            }
        }else {
            if(tempObj.onlineclue != null && tempObj.onlinemailid != "" && tempObj.onlinepwd != "") {
                insertArrayAccess.push(tempObj);
            }
            
        }
      }
  }
  function helper2(updateArrayBank,insertArrayBank,deleteArrayBank) {
    var size = formValues.client_bank_info.length
    //   console.log(initialClientData.client_bank_info)
      for(var i=0;i<size;i++) {
        const tempObj = formValues.client_bank_info[i]
        if(tempObj.hasOwnProperty('id')) {
            var weNeed = {};
            for(var j=0;j<intitialClientData.client_bank_info.length;j++) {
                 if(tempObj.id === intitialClientData.client_bank_info[j].id) {
                     weNeed = intitialClientData.client_bank_info[j]
                 }
            }
            const str1 = JSON.stringify(weNeed)
            const str2 = JSON.stringify(tempObj);
            if(str1 !== str2) {
                updateArrayBank.push(tempObj);
            }
        }else {
            insertArrayBank.push(tempObj); 
        }
      }
  }

  const [formErrorsClientInfo, setFormErrorsClientInfo] = useState({});
    const validate = () => {
        var res = true
        console.log(formValues)
        if (formValues.client_info.salutation === 'Select Salutation' || formValues.client_info.salutation === '') {
            res = false
            setFormErrorsClientInfo((existing) => ({
                ...existing,
                salutation: "Select Saluation"
            }))

        } else {
            setFormErrorsClientInfo((existing) => ({
                ...existing,
                salutation: ""
            }))
        }


        if (formValues.client_info.firstname === "") {
            res = false
            setFormErrorsClientInfo((existing) => ({
                ...existing,
                firstname: "Enter First Name"
            }))

        } else {
            setFormErrorsClientInfo((existing) => ({
                ...existing,
                firstname: ""
            }))
        }
        if (formValues.client_info.middlename === "") {
            res = false
            setFormErrorsClientInfo((existing) => ({
                ...existing,
                middlename: "Enter Middle Name"
            }))
            // console.log('hey')
        } else {
            setFormErrorsClientInfo((existing) => ({
                ...existing,
                middlename: ""
            }))
        }
        if (formValues.client_info.lastname === "") {
            res = false
            setFormErrorsClientInfo((existing) => ({
                ...existing,
                lastname: "Enter Last Name"
            }))
        } else {
            setFormErrorsClientInfo((existing) => ({
                ...existing,
                lastname: ""
            }))
        }

        if (formValues.client_info.clienttype === 'Select Client Type') {
            res = false
            setFormErrorsClientInfo((existing) => ({
                ...existing,
                clienttype: "Select Client Type "
            }))
        } else {
            setFormErrorsClientInfo((existing) => ({
                ...existing,
                clienttype: ""
            }))
        }
        if (formValues.client_info.state === "") {
            res = false
            setFormErrorsClientInfo((existing) => ({
                ...existing,
                state: "Select State "
            }))
        } else {
            setFormErrorsClientInfo((existing) => ({
                ...existing,
                state: ""
            }))
        }
        if (formValues.client_info.city === "") {
            res = false
            setFormErrorsClientInfo((existing) => ({
                ...existing,
                city: "Select City "
            }))
        } else {
            setFormErrorsClientInfo((existing) => ({
                ...existing,
                city: ""
            }))
        }
        
        //  if(formValues.client_info.middlename == "") {
        //     res = false
        //     setFormErrors({...formErrors,client_info : {
        //         ...formErrors.client_info,
        //         middlename : "Enter Middle Name"
        //     } 
        //     }) 
        //  }else {
        //     setFormErrors({...formErrors,client_info : {
        //         ...formErrors.client_info,
        //         middlename : ""
        //     } 
        //     }) 
        //  }


        //  if(formValues.client_info.lastname === "") {
        //     res = false
        //     setFormErrors({...formErrors,client_info : {
        //         ...formErrors.client_info,
        //         lastname : "Enter Last Name"
        //     } 
        //     }) 
        //  }else {
        //     setFormErrors({...formErrors,client_info : {
        //         ...formErrors.client_info,
        //         lastname : ""
        //     } 
        //     }) 
        //  }
        //  if(formValues.client_info.lastname == "") {
        //     res = false
        //     setFormErrors({...formErrors,client_info : {
        //         ...formErrors.client_info,
        //         lastname : "Enter Last Name"
        //     } 
        //     }) 
        //  }else {
        //     setFormErrors({...formErrors,client_info : {
        //         ...formErrors.client_info,
        //         lastname : ""
        //     } 
        //     }) 
        //  }
        //  if(formValues.client_info.clienttype === null) {
        //     res = false
        //     setFormErrors({...formErrors,client_info : {
        //         ...formErrors.client_info,
        //         clienttype : "Enter Client Type"
        //     } 
        //     }) 
        //  }else {
        //     setFormErrors({...formErrors,client_info : {
        //         ...formErrors.client_info,
        //         clienttype : ""
        //     } 
        //     }) 
        //  }

        //  if(formValues.client_info.state == null) {
        //     res = false
        //     setFormErrors({...formErrors,client_info : {
        //         ...formErrors.client_info,
        //         state : "Enter Country Name"
        //     } 
        //     }) 
        //  }else {
        //     setFormErrors({...formErrors,client_info : {
        //         ...formErrors.client_info,
        //         state : ""
        //     } 
        //     }) 
        //  }


        //  if(formValues.client_info.city == null) {
        //     res = false
        //     setFormErrors({...formErrors,client_info : {
        //         ...formErrors.client_info,
        //         city : "Enter Country Name"
        //     } 
        //     }) 
        //  }else {
        //     setFormErrors({...formErrors,client_info : {
        //         ...formErrors.client_info,
        //         city : ""
        //       } 
        //     }) 
        //  }



        return res;
    }
  const handleEditClient = async () => {
    if(!validate()) {
        console.log(formErrors)
        setSelectedDialogue(1)
        return ;
    }
    const updateArrayAccess =[]
    const insertArrayAccess = []
    const deleteArrayAccess = []

    const updateArrayBank =[]
    const insertArrayBank = []
    const deleteArrayBank = []
    helper1(updateArrayAccess,insertArrayAccess, deleteArrayAccess)
    helper2(updateArrayBank,insertArrayBank,deleteArrayBank)
    const data = {
        "user_id" : 1234,
        client_id : props.currClient,
        client_info : formValues.client_info,
        client_access : {
            update : updateArrayAccess,
            insert : insertArrayAccess,
            delete : deleteArrayAccess
        },
        client_bank_info : {
            update : updateArrayBank,
            insert : insertArrayBank,
            delete : deleteArrayBank
        },
        client_legal_info : formValues.client_legal_info,
        client_poa : formValues.client_poa
    }
    console.log(data);
    const response = await APIService.editCLientInfo(data);
    const res = await response.json();
    console.log(res);
    if(res.result == 'success') {
        // then we need to close the modal
        props.openEditSuccess();
    }else {

    }
  }
  const [tenantofName,setTenantOfName] = useState({
    label : "Select Client",
    value : null
  });
  const fetchTenantOfData = async (id) => {
    const data = {
        "user_id":1234,
        "table_name":"get_client_info_view",
        "item_id": id
    }
    const response = await APIService.getItembyId(data)
    const res = await (response.json());
    console.log(res);
    if(id != null) {
        const existing = {...tenantofName};
        var name = res.data.firstname + " " + res.data.middlename + " " + res.data.lastname
    
        existing.label = name
        existing.value = id;
        setTenantOfName(existing);
    }
    
    // setTenantOfName(res.data.firstname + " " + res.data.middlename + " " + res.data.lastname)
  }
  const fetchInitialClientData = async () => {
    setPageLoading(true);
    const data = {"user_id" : 1234, "id": props.currClient};
     const response = await APIService.getClientInfoByClientId(data)
     const res = await response.json();
     console.log(res.data)
     if(res.data.client_info.tenantof != null) {
        await fetchTenantOfData(res.data.client_info.tenantof)
     }
     
     setInitialClientData(res.data);
     setPageLoading(false);
    //  setFormValues(res.data);
  }
  const fetchClientData = async () => {
     const data = {"user_id" : 1234, "id": props.currClient};
     const response = await APIService.getClientInfoByClientId(data)
     const res = await response.json();
     console.log(res.data);
     fetchStateData(res.data.client_info.country)
     fetchCityData(res.data.client_info.state);
     setFormValues(res.data);
     setInitialClientAccessData(res.data.client_access);
  }
  const fetchCountryData = async () => {
    // setPageLoading(true);
    // const data = { "user_id":  1234 };
    const data = { "user_id": 1234, "rows": ["id", "name"], "filters": [], "sort_by": [], "order": "asc", "pg_no": 0, "pg_size": 0 };
    const response = await APIService.getCountries(data)
    const result = (await response.json()).data;
    console.log(result.data);
    if (Array.isArray(result.data)) {
        setAllCountry(result.data);
    }
}
const fetchStateData = async (id) => {
    console.log(id);
    const data = { "user_id": 1234, "country_id": id };
    const response = await APIService.getState(data);
    const result = (await response.json()).data;
    console.log(result)
    if (Array.isArray(result)) {
        setAllStates(result)
    }
}
const fetchRelation = async () => {
    const data = {
        "user_id" : 1234
    }
    const response = await APIService.getRelationAdmin(data)
    const res = await response.json()
    console.log(res)
    setRelationData(res.data)
}
const fetchClientTypeData = async () => {
    const data = {
        "user_id": 1234
    }
    const response = await APIService.getClientTypeAdmin(data);
    const res = await response.json()
    console.log(res)
    setClientTypeData(res.data)
}
  const selectFirst = () => {
     setSelectedDialogue(1);
  }
  const selectSecond = () => {
    setSelectedDialogue(2);
  }
  const selectThird = () => {
    setSelectedDialogue(3);
  }
  const selectForth = () => {
    setSelectedDialogue(4);
  }
  const selectFifth =  () => {
    setSelectedDialogue(5);
  }
  const handleAddClientInfo = () => {
      console.log(formValues);
  }
  const handleClose = () => {
     props.handleClose();
  }
  const fetchCityData = async (id) => {
    const data = { "user_id": 1234, "state_name": id };
    const response = await APIService.getCities(data);
    const result = (await response.json()).data;
    console.log(result);
    if (Array.isArray(result)) {
        setAllCities(result)
    }
}
const fetchEntitiesData = async () => {
    // setPageLoading(true);
    // const data = { "user_id":  1234 };
    const data = { "user_id": 1234 };

    const response = await APIService.getEntityAdmin(data)
    const result = (await response.json());
    console.log(result)
    if (Array.isArray(result.data)) {
        setAllEntities(result.data);
    }
}

const fetchTenentOfData = async () => {
    const data = {
        "user_id" : 1234
    }
    const response = await APIService.getTenantOfPropertyAdmin(data)
    const res = await response.json()
    console.log(res)
    setTenentOfData(res.data)
}
  useEffect(()=>{
     fetchInitialClientData();
      fetchClientData();
      fetchCountryData();
      fetchClientTypeData();
      fetchEntitiesData();
      fetchTenentOfData();
      fetchRelation();
  },[])
   return ( 
    <Modal open={true}
                fullWidth={true}
                maxWidth={'md'}
                className='flex justify-center items-center'
            >
                <div className='flex justify-center'>
                    <div className="w-[1300px] h-auto  bg-white rounded-lg relative">
                        <div className="h-[40px] bg-[#EDF3FF]  justify-center flex items-center rounded-lg">
                            <div className="mr-[410px] ml-[410px]">
                                <div className="text-[16px]">Edit Client : Client Id : {props.currClient}</div>
                            </div>
                            <div className="flex justify-center items-center rounded-full w-[30px] h-[30px] bg-white absolute right-2">
                                <button onClick={props.handleClose}><img className="w-[20px] h-[20px]" src={Cross} alt="cross" /></button>
                            </div>
                        </div>

                        <div className="mt-1 flex bg-[#DAE7FF] justify-center space-x-4 items-center h-9 ">
                            <div className={`${selectedDialog == 1 ? "bg-blue-200" : "bg-[#EBEBEB]"} px-4 py-1 rounded-md text-[12px] font-semibold flex justify-center items-center h-7 w-60 cursor-pointer`} onClick={selectFirst}>
                                <div>Client Information</div>
                            </div>
                            <div className={`${selectedDialog == 2 ? "bg-blue-200" : "bg-[#EBEBEB]"} px-4 py-1 rounded-md text-[12px] font-semibold flex justify-center items-center h-7 w-60 cursor-pointer`} onClick={selectSecond}>
                                <div>Client portal</div>
                            </div>
                            <div className={`${selectedDialog == 3 ? "bg-blue-200" : "bg-[#EBEBEB]"} px-4 py-1 rounded-md text-[12px] font-semibold flex justify-center items-center h-7 w-60 cursor-pointer`} onClick={selectThird}>
                                <div>Bank Details</div>
                            </div>
                            <div className={`${selectedDialog == 4 ? "bg-blue-200" : "bg-[#EBEBEB]"}  px-4 py-1 rounded-md text-[12px] font-semibold flex justify-center items-center h-7 w-60 cursor-pointer`} onClick={selectForth}>
                                <div>Legal Information</div>
                            </div>
                            <div className={`${selectedDialog == 5 ? "bg-blue-200" : "bg-[#EBEBEB]"}  px-4 py-1 rounded-md text-[12px] font-semibold flex justify-center items-center h-7 w-60 cursor-pointer`} onClick={selectFifth}>
                                <div>POA details</div>
                            </div>
                        </div>
                        
                        {pageLoading && <div className='flex justify-center items-center my-10 space-x-3'>
                            <h1>Fetching Data</h1>
                            <CircularProgress/>
                        </div>}
                        {!pageLoading && selectedDialog == 1 && <EditClientInformation formValues={formValues} setFormValues={setFormValues} allCountry={allCountry} clientTypeData={clientTypeData} tenentOfData={tenentOfData} allEntities={allEntities} initialStates={allStates} initialCities={allCities} formErrors={formErrorsClientInfo} tenantofname={tenantofName}/>}
                        {selectedDialog == 2 && <EditClientPortal formValues={formValues} setFormValues={setFormValues}/>}
                        {selectedDialog == 3 && <EditBankDetails formValues={formValues} setFormValues={setFormValues}/>}
                        
                        {selectedDialog == 4 && <EditLegalInformation formValues={formValues} setFormValues={setFormValues} relationData={relationData} allCountry={allCountry} initialStates={allStates} initialCities={allCities}/>}
                       
                        {selectedDialog == 5 && <EditPOADetails formValues={formValues} setFormValues={setFormValues} relationData={relationData} allCountries={allCountry} initialStates={allStates} initialCities={allCities}/>}

                        <div className="my-[10px] flex justify-center items-center gap-[10px] pb-8">
                            <button className="bg-[#004DD7]  w-[100px] h-[35px]  text-white rounded-md" onClick={handleEditClient}>Save</button>
                            <button className='w-[100px] h-[35px] border-[1px] border-[#282828] rounded-md' onClick={props.handleClose}>Cancel</button>
                        </div>

                    </div>
                </div>
            </Modal>
  )
}

export default EditClientInfoModal
