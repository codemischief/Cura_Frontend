import React from 'react'

const AddFeildBanks = ({index,formValues,setFormValues}) => {
  const handleBankNameChange = (e) => {
        const arrayClone = [...formValues.client_bank_info];
        arrayClone[index].bankname = e.target.value;
        setFormValues({...formValues,client_bank_info : arrayClone})
  }
  const handleBankBranchChange = (e) => {
    const arrayClone = [...formValues.client_bank_info];
    arrayClone[index].bankbranch = e.target.value;
    setFormValues({...formValues,client_bank_info : arrayClone})
  }
  const handleBankCityChange = (e) => {
    const arrayClone = [...formValues.client_bank_info];
    arrayClone[index].bankcity = e.target.value;
    setFormValues({...formValues,client_bank_info : arrayClone})
  }
  const handleBankAccountChange = (e) => {
    const arrayClone = [...formValues.client_bank_info];
    arrayClone[index].bankaccountno = e.target.value;
    setFormValues({...formValues,client_bank_info : arrayClone})
  }
  const handleBankAccountHolderChange = (e) => {
    const arrayClone = [...formValues.client_bank_info];
    arrayClone[index].bankaccountholdername = e.target.value;
    setFormValues({...formValues,client_bank_info : arrayClone})
  }
  const handleBankIfscCode = (e) => {
    const arrayClone = [...formValues.client_bank_info];
    arrayClone[index].bankifsccode = e.target.value;
    setFormValues({...formValues,client_bank_info : arrayClone})
  }
  const handleBankMicr = (e) => {
    console.log('hey')
    const arrayClone = [...formValues.client_bank_info];
    arrayClone[index].bankmicrcode = e.target.value;
    setFormValues({...formValues,client_bank_info : arrayClone})
  }
  const handleAccountType = (e) => {
    const arrayClone = [...formValues.client_bank_info];
    arrayClone[index].bankaccounttype = e.target.value;
    setFormValues({...formValues,client_bank_info : arrayClone})
  }
  return (
    <div className="w-full h-[40px] flex border-[#CBCBCB] border-b-[1px]">
              <div className="w-[2%] h-full p-3 text-[11px]" >
              {index + 1}
              </div>
              <div className="w-[12%] h-full py-1 px-3 text-[11px]" >
                <input className='w-full h-full bg-[#F5F5F5]' type="text" value={formValues.client_bank_info[index].bankname} onChange={handleBankNameChange}/>
              </div>
              <div className="w-[12%] h-full py-1 px-3 text-[11px]" >
                <input className='w-full h-full bg-[#F5F5F5]' type="text" value={formValues.client_bank_info[index].bankbranch} onChange={handleBankBranchChange}/>
              </div>
              <div className="w-[12%] h-full py-1 px-3 text-[11px]" >
                <input className='w-full h-full bg-[#F5F5F5]' type="text" value={formValues.client_bank_info[index].bankcity} onChange={handleBankCityChange}/>
              </div>
              <div className="w-[12%] h-full py-1 px-3 text-[11px]" >
                <input className='w-full h-full bg-[#F5F5F5]' type="text" value={formValues.client_bank_info[index].bankaccountholdername} onChange={handleBankAccountHolderChange}/>
              </div>
              <div className="w-[14%] h-full py-1 px-3 text-[11px]" >
                <input className='w-full h-full bg-[#F5F5F5]' type="text" value={formValues.client_bank_info[index].bankaccountno} onChange={handleBankAccountChange}/>
              </div>
              
              <div className="w-[12%] h-full py-1 px-3 text-[11px]" >
                <input className='w-full h-full bg-[#F5F5F5]' type="text" onChange={handleAccountType} value={formValues.client_bank_info[index].bankaccounttype} />
              </div>
              <div className="w-[12%] h-full py-1 px-3 text-[11px]" >
                <input className='w-full h-full bg-[#F5F5F5]' type="text" onChange={handleBankIfscCode} value={formValues.client_bank_info[index].bankifsccode} />
              </div>
              <div className="w-[12%] h-full py-1 px-3 text-[11px]" >
                
                <input className='w-full h-full bg-[#F5F5F5]' type="text" value={formValues.client_bank_info[index].bankmicrcode} onChange={handleBankMicr}/>
              </div>
            </div>
  )
}

export default AddFeildBanks;
