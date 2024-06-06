import React from 'react'
import { Delete } from '@mui/icons-material'
const DeleteButton = ({handleDelete,rowData}) => {
  return (
    <Delete
        sx={{ width: "20px", height: "20px", color : '#c6c6c6', cursor : 'pointer'}}
        onClick={() => handleDelete(rowData)}
    />
  )
}

export default DeleteButton
