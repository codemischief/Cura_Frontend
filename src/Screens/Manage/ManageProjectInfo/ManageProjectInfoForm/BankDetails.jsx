import React from 'react'

const BankDetails = () => {
  return (
    <div className='flex-col justify-center items-center mx-5 mt-10 '>
      <div className="w-full h-full">
        <div className="w-full h-[40px] bg-[#EBEBEB] flex border-[#CBCBCB] border-b-[1px]">
          <div className="w-[30%] h-full p-2" >
            Sr. 
          </div>
          <div className="w-[50%] h-full  p-2">
            Order Status
          </div>
          <div className="w-[20%] h-full  p-2">
            Count 
          </div>
        </div>
      </div>
    </div>
  )
}

export default BankDetails
