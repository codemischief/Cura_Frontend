import React, { useEffect } from "react"
import { useState } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { Backdrop, CircularProgress, Typography, Modal , Button } from "@mui/material"
import { Add } from "@mui/icons-material"
import Navbar from "../../../Components/Navabar/Navbar"
import backLink from "../../../assets/back.png"
import { APIService } from "../../../services/API"
import errorHandler from "../../../Components/common/ErrorHandler"
import ConfirmationModal from "../../../Components/common/ConfirmationModal"
import Draggable from "react-draggable"
import { CrossIcon } from "../../../Components/Svg/CrossIcon"
import DeleteIcon from "../../../Components/Svg/DeleteIcon"
import CancelModel from "../../../Components/modals/CancelModel"
import SucessfullModal from "../../../Components/modals/SucessfullModal"
import useAuth from "../../../context/JwtContext"
const UpdateCompanyKey = () => {
  const { user } = useAuth()
//   let { state } = useLocation();
//   console.log(state)
  const navigate = useNavigate(-1)
  const [pageLoading, setPageLoading] = useState(false)
  const [id, setId] = useState("")
  const [openDialog, setOpenDialog] = useState(false)
  const [data, setData] = useState({})
  const [showCancelModel, setShowCancelModel] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const openCancelModal = () => {
    setShowCancelModel(true);
    setTimeout(function () {
      setShowCancelModel(false)
    }, 3000)
  }
  const openSuccess = () => {
    setShowSuccess(true);
    setTimeout(function () {
      setShowSuccess(false)
    }, 2000)
  }
  const handleCheck = async () => {
    // here we check if the id actually exists or not
    setOpenDialog(true)
    try {

      
    } catch (error) {

      errorHandler(error)
    }

  }
  const handleDelete = async () => {
    // we do the hard delete here
    
  }
  const fetchCompanyKey = async () => {
     const d = {"user_id" : user.id}
     const response = await APIService.getCompanyKey(d)
     const res = await response.json()
     console.log(res)
     setId(res.data.companykey)
  } 
  useEffect(() => {
    fetchCompanyKey()
  },[])
  return (
    <div className='font-medium'>
      
      {showSuccess && <SucessfullModal isOpen={showSuccess} message="Successfully Updated Company Key"/>}
      {showCancelModel && <CancelModel isOpen={showCancelModel} message="Proccess Cancelled, No Changes Saved."/>}
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={pageLoading}
        onClick={() => { }}
      >

        <CircularProgress color="inherit" />

      </Backdrop>
      {/* <Navbar /> */}
      <div className="w-full h-[calc(100vh_-_75px)] px-5 ">

        <div className='h-16 w-full  flex justify-between items-center p-2  mb-10'>
          <div className='flex items-center space-x-3'>
            <div className='rounded-2xl  bg-[#EBEBEB] h-8 w-8 flex justify-center items-center '>
              <button onClick={() => navigate(-1)}><img className='h-5 w-5' src={backLink} /></button>
            </div>

            <div className='flex-col'>
              <h1 className='text-[18px]'>Update Company Key</h1>
              <p className='text-[14px]'>Admin &gt; Update Company Key</p>
            </div>
          </div>

        </div>

        <h1 className="mb-5 text-[22px] font-semibold">Enter Updated Company Key</h1>
        <div className="w-full h-40 bg-[#F5F5F5] rounded-lg p-10 flex items-center ">
          <div className="flex space-x-4 items-center">
            <div className="flex flex-col justify-center text-[#505050]">
              <label>Enter Key </label>
              <div className="flex space-x-10 items-center ">

                <input className="h-[30px] p-2 font-normal" value={id} onChange={(e) => setId(e.target.value)} type="number"  />

                <Button
                variant="outlined"
                //   onClick={handleShow}
                sx={{
                  height: "36px",
                  textTransform: "none",
                  color: "#004DD7",
                  borderRadius: "8px",
                  width: "133px",
                  fontSize: "14px",
                  border: "1px solid #004DD7",
                  fontWeight: "600px",
                  lineHeight: "18.9px",
                  "&:hover": {
                    //you want this to be the same as the backgroundColor above
                    backgroundColor: "#004DD7",
                    color: "#fff",
                  },
                }}
                onClick={handleCheck}
                disabled={!(id)}
              >
                Update
              </Button>

              </div>
            </div>

          </div>

        </div>


      </div>
      {openDialog && <Modal
        open={openDialog}
        fullWidth={true}
        className="flex justify-center items-center rounded-lg"
      >
        <>
          <Draggable>
            <div className="bg-white rounded-lg w-[39.8865rem] h-[200px] flex items-center justify-center relative">
              <div className="w-auto h-auto  ">
                <div className="  h-[30px] justify-center flex items-center ">

                  <div className="text-[16px] font-semibold">Save Company Key </div>

                  <div className="absolute right-4 top-5">
                    <CrossIcon
                      bgColor="bg-[#EBEBEB]"
                      onClick={() => setOpenDialog(false)}
                    />
                  </div>
                </div>
                <div className="flex justify-center items-center">
                  {/* <DeleteIcon /> */}
                </div>
                <span className="text-red-700 flex justify-center">

                </span>
                <div className="mt-4 w-full text-center">
                  <p></p>
                </div>
                <div className="mt-4 w-full text-center">
                  <p>Do you want to update company key : {id} ?</p>
                </div>
                <div className="my-5 flex justify-center items-center gap-[10px]">
                  <button
                    className={`w-[100px] h-[35px] rounded-md ${false ? "bg-gray-500 cursor-not-allowed" : "bg-[#004DD7]"
                      } text-white`}
                    disabled={false}
                    onClick={handleDelete}
                  >
                    {/* {isloading ? "Deleting..." : "Delete"} */} Save
                  </button>
                  <button
                    className="w-[100px] h-[35px] border-[1px] border-[#282828] rounded-md"
                    onClick={() => {
                       setOpenDialog(false)
                      openCancelModal() }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </Draggable>
        </>
      </Modal>}
    </div>
  )
}

export default UpdateCompanyKey
