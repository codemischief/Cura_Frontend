import React, { useState , useEffect} from 'react'
import { Modal, responsiveFontSizes } from '@mui/material'
import Cross from "../../../assets/cross.png"
import { APIService } from '../../../services/API'
import Draggable from 'react-draggable'

const EditVendor = ({handleClose ,currVendor,allCity,tallyLedgerData,allCategory,typeOfOrganization,showSuccess , showCancel}) => {
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };
  const initialValues = {
    vendorName: null,
    addressLine1: null,
    suburb: null,
    phone: null,
    ownerDetails: null,
    category: null,
    addressLine2: null,
    city: null,
    email: null,
    details: null,
    typeOfOrganization: null,
    pan: null,
    gstin: null,
    tallyLedger: null,
    tan: null,
    tdsSection: null,
    accountHolderName: null,
    accountNumber: null,
    accountType: null,
    bankName: null,
    bankBranch: null,
    ifscCode: null,
    bankBranchCity: null,
};
  const [formValues,setFormValues] = useState(initialValues)
  const [formErrors,setFormErrors] = useState({})
  // const [typeOfOrganization,setTypeOfOrganization] = useState([])
  // const [allCategory,setAllCategory] = useState([])
  // const [tallyLedgerData,setTallyLedgerData] = useState([])
  // const [allCity,setAllCity] = useState([])
  const fetchInitialData = async () => {
    console.log(currVendor)
      const data = {
        "user_id" : 1234,
        "item_id" : currVendor,
        "table_name" : "get_vendor_view"
      }
      const response = await APIService.getItembyId(data)
      const res = await response.json()
      console.log(res)
      const existing = {...formValues}
      existing.vendorName = res.data.vendorname 
      existing.addressLine1 = res.data.addressline1 
      existing.addressLine2 = res.data.addressline2 
      existing.city = res.data.cityid
      existing.suburb = res.data.suburb 
      existing.phone = res.data.phone1 
      existing.ownerDetails = res.data.ownerinfo 
      existing.typeOfOrganization = res.data.type
      existing.pan = res.data.panno 
      existing.gstin = res.data.gstservicetaxno
      existing.category = res.data.categoryid
      existing.email = res.data.email 
      existing.details = res.data.details 
      existing.tallyLedger = res.data.tallyledgerid
      existing.tan = res.data.tanno
      existing.tdsSection = res.data.tdssection 
      existing.accountHolderName = res.data.bankacctholdername
      existing.accountNumber = res.data.bankacctno
      existing.accountType = res.data.bankaccttype 
      existing.bankName = res.data.bankname 
      existing.bankBranch = res.data.bankbranch 
      existing.ifscCode = res.data.bankifsccode 
      existing.bankBranchCity = res.data.bankcity 
      setFormValues(existing)
  }
  useEffect(() => {
     fetchInitialData()
  },[])
  const validate = () => {
    var res = true;

    if (!formValues.vendorName) {
        setFormErrors((existing) => {
            return { ...existing, vendorName: "Enter Vendor name" }
        })
        res = false;
    } else {
        setFormErrors((existing) => {
            return { ...existing, vendorName: "" }
        })
    }

    if (!formValues.phone) {
        setFormErrors((existing) => {
            return { ...existing, phone: "Enter Phone Number" }
        })
        res = false;
    } else {
        setFormErrors((existing) => {
            return { ...existing, phone: "" }
        })
    }

    if (!formValues.category) {
        setFormErrors((existing) => {
            return { ...existing, category: "Select Category" }
        })
        res = false;
    } else {
        setFormErrors((existing) => {
            return { ...existing, category: "" }
        })
    }

    if (!formValues.email) {
        setFormErrors((existing) => {
            return { ...existing, email: "Enter Email" }
        })
        res = false;
    } else {
        setFormErrors((existing) => {
            return { ...existing, email: "" }
        })
    }

    return res;
}
  const handleEdit = async () => {
    // we handle edit here
    if(!validate()) {
        return ;
    }
    const data  = {
      "user_id":1234,
      "id":currVendor,
      "vendorname":formValues.vendorName,
      "addressline1":formValues.addressLine1,
      "addressline2":formValues.addressLine2,
      "suburb":formValues.suburb,
      "city": Number(formValues.city),
      "state":"Maharashtra",
      "country":5,
      "type":formValues.typeOfOrganization,
      "details":formValues.details,
      "category":Number(formValues.category),
      "phone1":formValues.phone,
      "email":formValues.email,
      "ownerinfo":formValues.ownerDetails,
      "panno":formValues.pan,
      "tanno":formValues.tan,
      "gstservicetaxno":formValues.gstin,
      "tdssection":formValues.tdsSection,
      "bankname":formValues.bankName,
      "bankbranch":formValues.bankBranch,
      "bankcity":formValues.bankBranchCity,
      "bankacctholdername":formValues.accountHolderName,
      "bankacctno":formValues.accountNumber,
      "bankifsccode":formValues.ifscCode,
      "bankaccttype":formValues.accountType,
      "companydeductee":true,
      "tallyledgerid":formValues.tallyLedger
    }
    const response  = await APIService.editVendors(data)
    const res = await response.json()
    if(res.result == 'success') {
        //  we need to open edit Modal
        showSuccess()
    }
  }

  const close = () =>{
    handleClose();
    showCancel();
  }


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
                <div className='flex justify-center'>
                    <div className="w-[1050px] h-auto bg-white rounded-lg">
                        <div className="h-10  justify-center flex items-center rounded-t-lg">
                            <div className="mr-[410px] ml-[410px]">
                                <div className="text-base">Edit Vendor </div>
                            </div>
                            <div className="flex justify-center items-center rounded-full w-7 h-7 bg-[#EBEBEB]">
                                <button onClick={() => {close()}}><img className="w-5 h-5" src={Cross} alt="cross" /></button>
                            </div>
                        </div>

                        <div className="h-auto w-full mt-1 ">
                            <div className="flex gap-12 justify-center">
                                <div className="">
                                    <div className=" space-y-1 py-1">
                                        <div className="font-semibold text-sm text-[#282828]">Basic Information</div>
                                        <div className="">
                                            <div className="text-sm text-[#505050]">Vendor Name <label className="text-red-500">*</label></div>
                                            <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none" type="text" name="vendorName" value={formValues.vendorName} onChange={handleChange} />
                                            <div className="text-[10px] text-[#CD0000] ">{formErrors.vendorName}</div>
                                        </div>
                                        <div className="">
                                            <div className="text-sm text-[#505050]">Address Line 1</div>
                                            <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none" type="text" name="addressLine1" value={formValues.addressLine1} onChange={handleChange} />

                                        </div>
                                        <div className="">
                                            <div className="text-sm text-[#505050]">Suburb</div>
                                            <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none" type="text" name="suburb" value={formValues.suburb} onChange={handleChange} />

                                        </div>
                                        <div className="">
                                            <div className="text-sm text-[#505050]">Phone <label className="text-red-500">*</label></div>
                                            <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none" type="text" name="phone" value={formValues.phone} onChange={handleChange} />
                                            <div className="text-[10px] text-[#CD0000] ">{formErrors.phone}</div>
                                        </div>
                                        <div className="">
                                            <div className="text-sm text-[#505050]">Owner Details </div>
                                            <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none" type="text" name="ownerDetails" value={formValues.ownerDetails} onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className=" space-y-1 py-1 mt-2">
                                        <div className="font-semibold text-sm text-[#282828]">Accounting Information</div>
                                        <div className="">
                                            <div className="text-[13px] text-[#505050]">Type Of Organization </div>
                                            <select className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px] outline-none" name="typeOfOrganization"
                                                value={formValues.typeOfOrganization}
                                                onChange={
                                                    handleChange
                                                }>
                                                <option hidden>Select Type Of Organization</option>
                                                {typeOfOrganization && typeOfOrganization.map(item => (
                                                    <option key={item.id} value={item.type}>
                                                        {item.type}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="">
                                            <div className="text-sm text-[#505050]">PAN </div>
                                            <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none" type="text" name="pan" value={formValues.pan} onChange={handleChange} />

                                        </div>
                                        <div className="">
                                            <div className="text-sm text-[#505050]">GSTIN</div>
                                            <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none" type="text" name="gstin" value={formValues.gstin} onChange={handleChange} />

                                        </div>
                                    </div>
                                </div>
                                <div className="">
                                    <div className=" space-y-1 py-1 mt-6">
                                        <div className="">
                                            <div className="text-sm text-[#505050]">Category <label className="text-red-500">*</label></div>
                                            <select className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none"
                                                name="category"
                                                value={formValues.category}
                                                defaultValue="Select Category"
                                                onChange={handleChange}
                                            >
                                                {/* <option value="none" hidden={true}>Select a City</option> */}
                                                <option value="none" hidden> Select Category</option>
                                                {allCategory && allCategory.map(item => (
                                                    <option key={item.id} value={item.id} >
                                                        {item.name}
                                                    </option>
                                                ))}
                                            </select>
                                            <div className="text-[10px] text-[#CD0000] ">{formErrors.category}</div>
                                        </div>
                                        <div className="">
                                            <div className="text-sm text-[#505050]">Address Line 2</div>
                                            <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none" name="addressLine2" value={formValues.addressLine2} onChange={handleChange} />
                                        </div>
                                        <div className="">
                                            <div className="text-sm text-[#505050]">City</div>
                                            <select className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none"
                                                name="city"
                                                value={formValues.city}
                                                defaultValue="Select City"
                                                onChange={handleChange}
                                            >
                                                {/* <option value="none" hidden={true}>Select a City</option> */}
                                                <option value="none" hidden> Select A City</option>
                                                {allCity && allCity.map(item => (
                                                    <option value={item.id} >
                                                        {item.city}
                                                    </option>
                                                ))}
                                            </select>
                                            {/* <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none" name="city" value={formValues.city} onChange={handleChange} /> */}
                                        </div>
                                        <div className="">
                                            <div className="text-sm text-[#505050]">Email <label className="text-red-500">*</label></div>
                                            <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none" name="email" value={formValues.email} onChange={handleChange} />
                                            <div className="text-[10px] text-[#CD0000] ">{formErrors.email}</div>
                                        </div>
                                        <div className=""> 
                                            <div className="text-sm text-[#505050]">Details </div>
                                            <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none" name="details" value={formValues.details} onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className=" space-y-1 py-1 mt-8">

                                        <div className="">
                                            <div className="text-sm text-[#505050]" >Tally Ledger </div>
                                            <select className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none"
                                                name="tallyLedger"
                                                value={formValues.tallyLedger}
                                                defaultValue="Select Tally Ledger"
                                                onChange={handleChange}
                                            >
                                                {/* <option value="none" hidden={true}>Select a City</option> */}
                                                <option value="none" hidden> Select Tally Ledger</option>
                                                {tallyLedgerData && tallyLedgerData.map(item => (
                                                    <option value={item[0]} >
                                                        {item[1]}
                                                    </option>
                                                ))}
                                            </select>



                                            {/* <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none" type="text" name="tallyLedger" value={formValues.tallyLedger} onChange={handleChange} /> */}

                                        </div>
                                        <div className="">
                                            <div className="text-sm text-[#505050]">TAN</div>
                                            <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none" type="text" name="tan" value={formValues.tan} onChange={handleChange} />

                                        </div>
                                        <div className="">
                                            <div className="text-sm text-[#505050]">TDS Section</div>
                                            <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none" type="text" name="tdsSection" value={formValues.tdsSection} onChange={handleChange} />

                                        </div>

                                    </div>
                                </div>
                                <div className=" space-y-1 py-1">
                                    <div className="font-semibold text-sm text-[#282828]">Vendor Bank Details </div>
                                    <div className="">
                                        <div className="text-sm text-[#505050]">Account Holder Name </div>
                                        <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none" type="text" name="accountHolderName" value={formValues.accountHolderName} onChange={handleChange} />

                                    </div>
                                    <div className="">
                                        <div className="text-sm text-[#505050]">Account Number</div>
                                        <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none" type="text" name="accountNumber" value={formValues.accountNumber} onChange={handleChange} />

                                    </div>
                                    <div className="">
                                        <div className="text-sm text-[#505050]">Account Type</div>
                                        <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none" type="text" name="accountType" value={formValues.accountType} onChange={handleChange} />

                                    </div>
                                    <div className="">
                                        <div className="text-sm text-[#505050]">Bank Name </div>
                                        <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none" type="text" name="bankName" value={formValues.bankName} onChange={handleChange} />

                                    </div>
                                    <div className="">
                                        <div className="text-sm text-[#505050]">Bank Branch </div>
                                        <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none" type="text" name="bankBranch" value={formValues.bankBranch} onChange={handleChange} />
                                    </div>
                                    <div className="">
                                        <div className="text-sm text-[#505050]">IFSC Code </div>
                                        <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none" type="text" name="ifscCode" value={formValues.ifscCode} onChange={handleChange} />
                                    </div>
                                    <div className="">
                                        <div className="text-sm text-[#505050]">Bank Branch City </div>
                                        <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none" type="text" name="bankBranchCity" value={formValues.bankBranchCity} onChange={handleChange} />
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="my-3 flex justify-center items-center gap-3">
                            <button className='w-28 h-10 bg-[#004DD7] text-white rounded-md text-lg' onClick={handleEdit} >Save</button>
                            <button className='w-28 h-10 border-[1px] border-[#282828] rounded-md text-lg' onClick={() => {close()}}>Cancel</button>
                        </div>

                    </div>
                </div>
                    </Draggable>
                    </>
            </Modal>
  )
}

export default EditVendor
