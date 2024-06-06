import React from 'react'
import { Create } from '@mui/icons-material'
const EditButton = ({handleEdit,rowData}) => {
  return (
    <Create
              sx={{ width: "20px", height: "20px", color : 'gray', cursor : 'pointer'}}

              onClick={() => handleEdit(rowData)}
   />
  )
}

export default EditButton
