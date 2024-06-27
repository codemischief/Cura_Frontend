import React from 'react'
import { Refresh } from '@mui/icons-material'
const RefreshReports = ({onClick}) => {
  return (
    <div
              className="border-solid border-black border-[0.5px] rounded-md w-28 h-9 flex items-center justify-center space-x-1 p-2 cursor-pointer"
              onClick={onClick}
            >
              <button>
                <p>Filters</p>
              </button>
              <Refresh sx={{ height: "16px", width: "16px" }} />
        </div>
  )
}

export default RefreshReports
