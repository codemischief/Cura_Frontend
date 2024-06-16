import React from 'react'
import {Modal, CircularProgress} from "@mui/material"
import Cross from "../../../../assets/cross.png"
import { useSearchParams } from 'react-router-dom'
import { useState , useEffect} from 'react'
import EditProjectInformation from './EditProjectInformation'
import EditPhotos from './EditPhotos'
import EditPOADetails from './EditPoaDetails'
import EditOwnerDetails from './EditOwnerDetails'
import { APIService } from '../../../../services/API'
import Draggable from 'react-draggable'
import useAuth from '../../../../context/JwtContext'
const EditClientProperty = (props) => {
    const {user} = useAuth()
    useEffect(() => {
        fetchLevelOfFurnishing();
        getBuildersAndProjectsList();
        fetchPropertyType();
        
        fetchPropertyStatus();
        fetchCountryData();
        fetchStateData('5');
         fetchExistingData();
    },[])
    const [clientName,setClientName] = useState({
        label : "",
        value : null
    })
    const fetchCountryData = async () => {
        setPageLoading(true);
        const data = { "user_id": user.id, "rows": ["id", "name"], "filters": [], "sort_by": [], "order": "asc", "pg_no": 0, "pg_size": 0 };
        const response = await APIService.getCountries(data)
        const result = (await response.json()).data;
        setAllCountry(result)
    }
    const fetchClientName = async (id) => { 
            const data = {
                "user_id":user.id,
                "table_name":"get_client_info_view",
                "item_id": id
            }
            const response = await APIService.getItembyId(data)
            const res = await (response.json());
            console.log(res);
            const existing = {...clientName};
            existing.label = res.data.firstname + " " + res.data.middlename + " " + res.data.lastname;
            existing.value = id;
            console.log(existing)
            setClientName(existing);
          
    }
    const [pageLoading,setPageLoading] = useState(false)
    const fetchExistingData = async () => {
        setPageLoading(true);
        // in this we fetch the data of the existing
        const data = {
            "user_id" : user.id,
            "id" : props.clientId
        }
        const response = await APIService.getClientPropertyById(data);
        const res = await response.json()
        console.log(res);
        await fetchClientName(res.data.client_property.clientid);
        setFormValues(res.data);
        setInitialClientPropertyData({...res.data});
        // setPageLoading(false);
        setTimeout(() => {
            setPageLoading(false)
        },1000)
        console.log(formValues);
    }
    
    const [initialClientPropertyData,setInitialClientPropertyData] = useState({});
    const initialValues = {
        "client_property": {
          "clientid": null,
          "propertytype": null,
          "leveloffurnishing": null,
          "numberofparkings": null,
          "state": "Maharashtra",
          "city": "Pune",
          "suburb": "",
          "country":5,
          "projectid":null,
          "status": null,
          "propertydescription": "",
          "layoutdetails": "",
          "email": "",
          "website": "",
          "initialpossessiondate": null,
          "electricityconsumernumber": "",
          "otherelectricitydetails": "",
          "electricitybillingduedate": null,
          "comments": "",
          "propertytaxnumber":"",
          "clientservicemanager":null,
          "propertymanager":null,
          "propertyownedbyclientonly":false,
          "gasconnectiondetails": "",
          "internalfurnitureandfittings":"",
          "textforposting": "",
          "poagiven":true,
          "poaid":null,
          "electricitybillingunit":"",
          "indexiicollected" : null
        },
        "client_property_photos": [
              {
                  "photolink": "",
                  "description": "",
                  "phototakenwhen": null
              }
          ],
        "client_property_owner": {
            "owner1name": null,
            "owner1panno": null,
            "owner1aadhaarno": null,
            "owner1pancollected": null,
            "owner1aadhaarcollected": null,
            "owner2name": null,
            "owner2panno":null,
            "owner2aadhaarno": null,
            "owner2pancollected": null,
            "owner2aadhaarcollected": null,
            "owner3name": null,
            "owner3panno": null,
            "owner3aadhaarno": null,
            "owner3pancollected": null,
            "owner3aadhaarcollected": null,
            "comments": null,
        },
        "client_property_poa": {
          "poalegalname": "",
          "poapanno": "",
          "poaaddressline1": "",
          "poaaddressline2": "",
          "poasuburb": "",
          "poacity": "Mumbai",
          "poastate": "Maharashtra",
          "poacountry": "5",
          "poazip": "",
          "poaoccupation": "",
          "poabirthyear": null,
          "poaphoto": "",
          "poaemployername": "",
          "poarelation": null,
          "poarelationwith": "",
          "poaeffectivedate": null,
          "poaenddate": null,
          "poafor": "",
          "scancopy": ""
        }
      }
    const [selectedDialog,setSelectedDialogue] = useState(1);
    const [clientData,setClientData] = useState([])
    const [allCountry,setAllCountry] = useState([])
    const [existingSociety,setExistingSociety] = useState([])
    const [allState,setAllState] = useState([])
    const [allCity,setAllCity] = useState([])
    const [clientTypeData,setClientTypeData] = useState([])
    const [formValues,setFormValues] = useState(initialValues)
    const [propertyType,setPropertyType] = useState([])
    const [levelOfFurnishing,setLevelOfFurnishing] = useState([])
    const [propertyStatus,setPropertyStatus] = useState([])
    const fetchLevelOfFurnishing = async () => {
        const data = {"user_id" : user.id}
        const response = await APIService.getLevelOfFurnishingAdmin(data);
        const res = await response.json()
        console.log(res);
        setLevelOfFurnishing(res);
    }
    function projectHelper(items) {
        const idNameObject = {};
        items.forEach((item) => {
          idNameObject[item.projectid] = {
            buildername : item.buildername,
            projectname : item.projectname
          }
        });
        return idNameObject;
    }
    
    const getBuildersAndProjectsList = async () => {
        const data = {"user_id" : user.id};
        const response = await APIService.getBuildersAndProjectsList(data);
        const res = await response.json();
        console.log(res.data);
        setExistingSociety(projectHelper(res.data));
    }
    const fetchPropertyType = async () => {
        const data = {"user_id" : user.id}
        const response = await APIService.getPropertyType(data)
        const res = await response.json();
        console.log(res);
        setPropertyType(res);
    }
    const fetchPropertyStatus = async () => {
        const data = {"user_id" : user.id};
        const response = await APIService.getPropertyStatusAdmin(data);
        const res = await response.json();
        console.log(res);
        setPropertyStatus(res);
    }
    const fetchStateData = async (id) => {
        console.log(id);
        const data = { "user_id": user.id, "country_id": id };
        // const data = {"user_id":user.id,"rows":["id","state"],"filters":[],"sort_by":[],"order":"asc","pg_no":0,"pg_size":0};
        const response = await APIService.getState(data);
        const result = (await response.json()).data;
        console.log(result)
        fetchCityData(formValues.client_property.state);
        if (Array.isArray(result)) {
            setAllState(result)
        }
    }
    const fetchCityData = async (id) => {
        const data = { "user_id": user.id, "state_name": id };
        const response = await APIService.getCities(data);
        const result = (await response.json()).data;
        console.log(result);
        if (Array.isArray(result)) {
            setAllCity(result)
        }
    }
    function helper1(updateArrayClientPhotos,insertArrayClientPhotos, deleteArrayClientPhotos,) {
        var size = formValues.client_property_photos.length
        for(var i=0;i<size;i++) {
          const tempObj = formValues.client_property_photos[i]
          if(tempObj.hasOwnProperty('id')) {
              // it has a property id
              var weNeed = {};
              for(var j=0;j<initialClientPropertyData.client_property_photos.length;j++) {
                   if(tempObj.id === initialClientPropertyData.client_property_photos[j].id) {
                       weNeed = initialClientPropertyData.client_property_photos[j]
                   }
              }
              const str1 = JSON.stringify(weNeed)
              const str2 = JSON.stringify(tempObj);
              if(str1 !== str2) {
                updateArrayClientPhotos.push(tempObj);
              }
          }else {
                insertArrayClientPhotos.push(tempObj);
          }
        }
    }
    const [formErrors, setFormErrors] = useState({});
    const validate = () => {
        var res = true;
        if (!formValues.client_property.clientid) {
            setFormErrors((existing) => {
                return { ...existing, clientid: "Enter Client Name" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, clientid: "" }
            })
        }
        if (!formValues.client_property.leveloffurnishing) {
            setFormErrors((existing) => {
                return { ...existing, leveloffurnishing: "Select Level Of Furnishing" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, leveloffurnishing: "" }
            })
        }
        if (!formValues.client_property.propertydescription) {
            setFormErrors((existing) => {
                return { ...existing, propertydescription: "Enter Property Description" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, propertydescription: "" }
            })
        }
        console.log(formValues.client_property.projectid)
        if (!formValues.client_property.projectid) {
            setFormErrors((existing) => {
                return { ...existing, projectid: "Select Project Name" }
            })
            res = false;
            // console.log('here')
        } else {
            setFormErrors((existing) => {
                return { ...existing, projectid: "" }
            })
            console.log('here')
        }
        if (!formValues.client_property.status) {
            setFormErrors((existing) => {
                return { ...existing, status: "Enter Project Status" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, status: "" }
            })
        }
        if (!formValues.client_property.city) {
            setFormErrors((existing) => {
                return { ...existing, city: "Enter City " }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, city: "" }
            })
        }
        if (!formValues.client_property.propertytype) {
            setFormErrors((existing) => {
                return { ...existing, propertytype: "Enter Property Type " }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, propertytype: "" }
            })
        }
        if (!formValues.client_property.suburb) {
            setFormErrors((existing) => {
                return { ...existing, suburb: "Enter Suburb" }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, suburb: "" }
            })
        }
        if (!formValues.client_property.state) {
            setFormErrors((existing) => {
                return { ...existing, state: "Enter State Name " }
            })
            res = false;
        } else {
            setFormErrors((existing) => {
                return { ...existing, state: "" }
            })
        }
        
        return res;
    }

    const handleEdit = async () => {
        if(!validate()) {
            setSelectedDialogue(1)
            return ;
        }

        const updateArrayClientPhotos = []
        const insertArrayClientPhotos = []
        const deleteArrayClientPhotos = []
        helper1(updateArrayClientPhotos,insertArrayClientPhotos,deleteArrayClientPhotos)
        console.log(formValues)
        console.log(initialClientPropertyData)
        console.log(formValues.client_property_owner.owner1name)
        const data = {
            "user_id": user.id,
            "client_property_id": props.clientId,
            "client_property_info": {
              "clientid": Number(formValues.client_property.clientid),
              "propertytype": Number(formValues.client_property.propertytype),
              "leveloffurnishing": Number(formValues.client_property.leveloffurnishing),
              "numberofparkings": Number(formValues.client_property.numberofparkings),
              "state": formValues.client_property.state,
              "city": formValues.client_property.city,
              "suburb": formValues.client_property.suburb,
              "projectid":Number(formValues.client_property.projectid),
              "status": Number(formValues.client_property.status),
              "propertydescription": formValues.client_property.propertydescription,
              "layoutdetails": formValues.client_property.layoutdetails,
              "clientservicemanager": formValues.client_property.clientservicemanager,
              "propertymanager": formValues.client_property.propertymanager,
              "email": formValues.client_property.email,
              "website": formValues.client_property.website,
              "initialpossessiondate": formValues.client_property.initialpossessiondate,
              "electricityconsumernumber": formValues.client_property.electricityconsumernumber,
              "otherelectricitydetails": formValues.client_property.otherelectricitydetails,
              "electricitybillingduedate": Number(formValues.client_property.electricitybillingduedate),
              "comments": formValues.client_property.comments,
              "gasconnectiondetails": formValues.client_property.gasconnectiondetails,
              "textforposting": formValues.client_property.textforposting,
              "indexiicollected" : formValues.client_property.indexiicollected
            },
            "client_property_photos": {
              "update" : updateArrayClientPhotos,
              "insert" : insertArrayClientPhotos,
              "delete" : deleteArrayClientPhotos
            },
            "client_property_owner": formValues.client_property_owner,
            "client_property_poa": formValues.client_property_poa
        };
        const response = await APIService.editClientProperty(data)
        const res = await response.json()
        console.log(res);
        if(res.result == 'success') {
            props.openEditSuccess();
        }
    }
    const close = () =>{
        props.handleClose();
        props.showCancel();
    }
  return (
    <Modal open={true}
    fullWidth={true}
    maxWidth={'md'}
    className='flex justify-center items-center'
>
    <div className='flex justify-center relative'>
        <Draggable handle='div.move'>
        <div className="w-[1150px] h-auto bg-white rounded-lg">
            <div className='move cursor-move'>

            <div className="h-[40px] bg-[#EDF3FF]  justify-center flex items-center rounded-lg">
                <div className="mr-[410px] ml-[410px]">
                    <div className="text-[16px]">Edit Client Property : </div>
                </div>
                <div className="flex justify-center items-center rounded-full w-[30px] h-[30px] bg-white absolute right-2">
                    <button onClick={() => {close()}}><img  className="w-[20px] h-[20px]" src={Cross} alt="cross" /></button>
                </div>
            </div>
            </div>

            <div className="mt-1 flex bg-[#DAE7FF] justify-center space-x-4 items-center h-9">
                <div className={`${selectedDialog == 1 ? "bg-blue-200" : "bg-[#EBEBEB]"} px-4 py-1 rounded-md text-[12px] font-semibold flex justify-center items-center h-7 w-60 cursor-pointer`} onClick={() => setSelectedDialogue(1)}>
                    <div>Property Information</div>
                </div>
                <div className={`${selectedDialog == 2 ? "bg-blue-200" : "bg-[#EBEBEB]"} px-4 py-1 rounded-md text-[12px] font-semibold flex justify-center items-center h-7 w-60 cursor-pointer`} onClick={() => setSelectedDialogue(2)}>
                    <div>Photos</div>
                </div>
                <div className={`${selectedDialog == 3 ? "bg-blue-200" : "bg-[#EBEBEB]"} px-4 py-1 rounded-md text-[12px] font-semibold flex justify-center items-center h-7 w-60 cursor-pointer`} onClick={() => setSelectedDialogue(3)}>
                    <div>POA Details</div>
                </div>
                <div className={`${selectedDialog == 4 ? "bg-blue-200" : "bg-[#EBEBEB]"} px-4 py-1 rounded-md text-[12px] font-semibold flex justify-center items-center h-7 w-60 cursor-pointer`} onClick={() => setSelectedDialogue(4)}>
                    <div>Owner Details</div>
                </div>
            </div>
            {pageLoading && <div className='flex justify-center items-center my-10 space-x-3'>
                            <h1>Fetching Data</h1>
                            <CircularProgress/>
                        </div>}
            {!pageLoading && selectedDialog == 1 && <EditProjectInformation clientData={clientData} initialCountries={allCountry} initialSociety={existingSociety} initialStates={allState} initialCities={allCity} clientTypeData={clientTypeData} formValues={formValues} setFormValues={setFormValues} propertyType={propertyType} levelOfFurnishing={levelOfFurnishing} propertyStatus={propertyStatus} clientNameOption={clientName} formErrors={formErrors}/>}
            {selectedDialog == 2 && <EditPhotos formValues={formValues} setFormValues={setFormValues}/>}
            {selectedDialog == 3 && <EditPOADetails initialCountries={allCountry} initialStates={allState} initialCities={allCity} formValues={formValues} setFormValues={setFormValues}/>}
            {selectedDialog == 4 && <EditOwnerDetails  formValues={formValues} setFormValues={setFormValues}/>}
            <div className="my-2 flex justify-center items-center gap-[10px]">
                <button className='w-[100px] h-[35px] bg-[#004DD7] text-white rounded-md' onClick={handleEdit} >Save</button>
                <button className='w-[100px] h-[35px] border-[1px] border-[#282828] rounded-md' onClick={() => {close()}}>Cancel</button>
            </div>

        </div>
        </Draggable>
    </div>
</Modal>
  )
}

export default EditClientProperty
