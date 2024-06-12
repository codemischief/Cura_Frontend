import React from 'react'
import { Refresh } from '@mui/icons-material'
const RefreshFilterButton = ({setFilterMapState,filterMapping,fetchData,resetAllInputs}) => {
  return (
    <div className="border-solid border-black border-[0.5px] rounded-md w-full h-8 flex items-center justify-center space-x-1 p-2 cursor-pointer text-[0.8vw]"
            onClick={() => {
                setFilterMapState((prev) => {
                    return  filterMapping
                })
                fetchData()
                resetAllInputs()
            }}
    >
        <p className='text-[0.8em]'>Filters</p>
        <Refresh sx={{ height: "0.6em", width: "0.6em" }} />
    </div>
  )
}

export default RefreshFilterButton
