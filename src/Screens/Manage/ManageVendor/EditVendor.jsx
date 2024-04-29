import React, { useState , useEffect} from 'react'
import { Modal, responsiveFontSizes } from '@mui/material'
import Cross from "../../../assets/cross.png"
import { APIService } from '../../../services/API'

const EditVendor = ({currVendor,allCity,tallyLedgerData,allCategory,typeOfOrganization}) => {
  const handleClose = () => {

  }
  const handleChange = () => {

  }
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
      existing.city = res.data.city 
      existing.suburb = res.data.suburb 
      existing.phone = res.data.phone1 
      existing.ownerDetails = res.data.ownerinfo 
      existing.typeOfOrganization = res.data.type
      existing.pan = res.data.panno 
      existing.gstin = res.data.gstservicetaxno
      existing.category = res.data.category 
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

  const handleEdit = () => {
    // we handle edit here
    const data  = {
      "user_id":1234,
      "id":13348,
      "vendorname":"Rudra_test",
      "addressline1":"Line1 address",
      "addressline2":"Line2 address",
      "suburb":"suburb 1",
      "city":847,
      "state":"Maharashtra",
      "country":5,
      "type":"New type",
      "details":"details",
      "category":3,
      "phone1":"934840984",
      "email":"emailid@gmail",
      "ownerinfo":"data",
      "panno":"abc123",
      "tanno":"def456",
      "gstservicetaxno":"ijk789",
      "tdssection":"opq345",
      "bankname":"testbank",
      "bankbranch":"testbranch",
      "bankcity":"Pune",
      "bankacctholdername":"holder",
      "bankacctno":"acctno",
      "bankifsccode":"code",
      "bankaccttype":"savings",
      "companydeductee":true,
      "tallyledgerid":1
    }
    // const response  = await APIService.editVendorInvoice(d)

  }


  // utility routes








  // end utility routes here
  return (
    <Modal open={true}
                fullWidth={true}
                maxWidth={'md'}
                className='flex justify-center items-center'
            >
                <div className='flex justify-center'>
                    <div className="w-[1050px] h-auto bg-white rounded-lg">
                        <div className="h-10  justify-center flex items-center rounded-t-lg">
                            <div className="mr-[410px] ml-[410px]">
                                <div className="text-base">Edit Vendor </div>
                            </div>
                            <div className="flex justify-center items-center rounded-full w-7 h-7 bg-[#EBEBEB]">
                                <button onClick={handleClose}><img className="w-5 h-5" src={Cross} alt="cross" /></button>
                            </div>
                        </div>

                        <div className="h-auto w-full mt-1 ">
                            <div className="flex gap-12 justify-center">
                                <div className="">
                                    <div className=" space-y-1 py-1">
                                        <div className="font-semibold text-sm">Basic Information</div>
                                        <div className="">
                                            <div className="text-sm">Vendor Name <label className="text-red-500">*</label></div>
                                            <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none" type="text" name="vendorName" value={formValues.vendorName} onChange={handleChange} />
                                            <div className="text-[10px] text-[#CD0000] ">{formErrors.vendorName}</div>
                                        </div>
                                        <div className="">
                                            <div className="text-sm">Address Line 1</div>
                                            <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none" type="text" name="addressLine1" value={formValues.addressLine1} onChange={handleChange} />

                                        </div>
                                        <div className="">
                                            <div className="text-sm">Suburb</div>
                                            <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none" type="text" name="suburb" value={formValues.suburb} onChange={handleChange} />

                                        </div>
                                        <div className="">
                                            <div className="text-sm">Phone <label className="text-red-500">*</label></div>
                                            <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none" type="text" name="phone" value={formValues.phone} onChange={handleChange} />
                                            <div className="text-[10px] text-[#CD0000] ">{formErrors.phone}</div>
                                        </div>
                                        <div className="">
                                            <div className="text-sm">Owner Details </div>
                                            <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none" type="text" name="ownerDetails" value={formValues.ownerDetails} onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className=" space-y-1 py-1 mt-2">
                                        <div className="font-semibold text-sm">Accounting Information</div>
                                        <div className="">
                                            <div className="text-[13px]">Type Of Organization </div>
                                            <select className="w-[230px] h-[20px] border-[1px] border-[#C6C6C6] rounded-sm px-3 text-[11px] outline-none" name="typeOfOrganization"
                                                value={formValues.typeOfOrganization}
                                                onChange={
                                                    handleChange
                                                }>
                                                <option >Select Type Of Organization</option>
                                                {typeOfOrganization && typeOfOrganization.map(item => (
                                                    <option key={item.id} value={item.type}>
                                                        {item.type}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="">
                                            <div className="text-sm">PAN </div>
                                            <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none" type="text" name="pan" value={formValues.pan} onChange={handleChange} />

                                        </div>
                                        <div className="">
                                            <div className="text-sm">GSTIN</div>
                                            <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none" type="text" name="gstin" value={formValues.gstin} onChange={handleChange} />

                                        </div>
                                    </div>
                                </div>
                                <div className="">
                                    <div className=" space-y-1 py-1 mt-6">
                                        <div className="">
                                            <div className="text-sm">Category <label className="text-red-500">*</label></div>
                                            <select className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none"
                                                name="category"
                                                value={formValues.category}
                                                defaultValue="Select Category"
                                                onChange={handleChange}
                                            >
                                                {/* <option value="none" hidden={true}>Select a City</option> */}
                                                <option value="none" hidden> Select Category</option>
                                                {allCategory && allCategory.map(item => (
                                                    <option key={item.id} value={item.name} >
                                                        {item.name}
                                                    </option>
                                                ))}
                                            </select>
                                            <div className="text-[10px] text-[#CD0000] ">{formErrors.category}</div>
                                        </div>
                                        <div className="">
                                            <div className="text-sm">Address Line 2</div>
                                            <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none" name="addressLine2" value={formValues.addressLine2} onChange={handleChange} />
                                        </div>
                                        <div className="">
                                            <div className="text-sm">City</div>
                                            <select className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none"
                                                name="city"
                                                value={formValues.city}
                                                defaultValue="Select City"
                                                onChange={handleChange}
                                            >
                                                {/* <option value="none" hidden={true}>Select a City</option> */}
                                                <option value="none" hidden> Select A City</option>
                                                {allCity && allCity.map(item => (
                                                    <option value={item.city} >
                                                        {item.city}
                                                    </option>
                                                ))}
                                            </select>
                                            {/* <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none" name="city" value={formValues.city} onChange={handleChange} /> */}
                                        </div>
                                        <div className="">
                                            <div className="text-sm">Email <label className="text-red-500">*</label></div>
                                            <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none" name="email" value={formValues.email} onChange={handleChange} />
                                            <div className="text-[10px] text-[#CD0000] ">{formErrors.email}</div>
                                        </div>
                                        <div className="">
                                            <div className="text-sm">Details </div>
                                            <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none" name="details" value={formValues.details} onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className=" space-y-1 py-1 mt-8">

                                        <div className="">
                                            <div className="text-sm">Tally Ledger </div>
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
                                            <div className="text-sm">TAN</div>
                                            <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none" type="text" name="tan" value={formValues.tan} onChange={handleChange} />

                                        </div>
                                        <div className="">
                                            <div className="text-sm">TDS Section</div>
                                            <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none" type="text" name="tdsSection" value={formValues.tdsSection} onChange={handleChange} />

                                        </div>

                                    </div>
                                </div>
                                <div className=" space-y-1 py-1">
                                    <div className="font-semibold text-sm">Vendor Bank Details </div>
                                    <div className="">
                                        <div className="text-sm">Account Holder Name </div>
                                        <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none" type="text" name="accountHolderName" value={formValues.accountHolderName} onChange={handleChange} />

                                    </div>
                                    <div className="">
                                        <div className="text-sm">Account Number</div>
                                        <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none" type="text" name="accountNumber" value={formValues.accountNumber} onChange={handleChange} />

                                    </div>
                                    <div className="">
                                        <div className="text-sm">Account Type</div>
                                        <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none" type="text" name="accountType" value={formValues.accountType} onChange={handleChange} />

                                    </div>
                                    <div className="">
                                        <div className="text-sm">Bank Name </div>
                                        <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none" type="text" name="bankName" value={formValues.bankName} onChange={handleChange} />

                                    </div>
                                    <div className="">
                                        <div className="text-sm">Bank Branch </div>
                                        <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none" type="text" name="bankBranch" value={formValues.bankBranch} onChange={handleChange} />
                                    </div>
                                    <div className="">
                                        <div className="text-sm">IFSC Code </div>
                                        <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none" type="text" name="ifscCode" value={formValues.ifscCode} onChange={handleChange} />
                                    </div>
                                    <div className="">
                                        <div className="text-sm">Bank Branch City </div>
                                        <input className="w-56 h-5 border-[1px] border-[#C6C6C6] rounded-sm px-3 text-xs outline-none" type="text" name="bankBranchCity" value={formValues.bankBranchCity} onChange={handleChange} />
                                    </div>
                                </div>

                            </div>
                        </div>
                        <div className="my-3 flex justify-center items-center gap-3">
                            <button className='w-28 h-10 bg-[#505050] text-white rounded-md text-lg' onClick={() => {}} >Save</button>
                            <button className='w-28 h-10 border-[1px] border-[#282828] rounded-md text-lg' onClick={handleClose}>Cancel</button>
                        </div>

                    </div>
                </div>
            </Modal>
  )
}

export default EditVendor
