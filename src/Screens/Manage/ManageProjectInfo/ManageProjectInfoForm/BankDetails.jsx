import React from 'react'

const BankDetails = () => {
  return (
    <div className='flex-col justify-center items-center mx-5 mt-10 '>
      <div className="w-full h-full">
        <div className="w-full h-[40px] bg-[#EBEBEB] flex border-[#CBCBCB] border-b-[1px]">
          <div className="w-[3%] h-full p-3 text-[11px]" >
            Sr. 
          </div>
          <div className="w-[15%] h-full p-3 text-[11px]" >
            Name 
          </div>
          <div className="w-[13%] h-full p-3 text-[11px]" >
            Branch 
          </div>
          <div className="w-[13%] h-full p-3 text-[11px]" >
            City 
          </div>
          <div className="w-[17%] h-full p-3 text-[11px]" >
            Acc.Holder Name 
          </div>
          <div className="w-[14%] h-full p-3 text-[11px]" >
            Acc.No 
          </div>
          <div className="w-[15%] h-full p-3 text-[11px]" >
            Account Type 
          </div>
          <div className="w-[17%] h-full p-3 text-[11px]" >
            IFSC Code  
          </div>
          <div className="w-[20%] h-full p-3 text-[11px]" >
            MICR Code 
          </div>
        </div>
      </div>
    </div>
  )
}

export default BankDetails
