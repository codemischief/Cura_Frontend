import React from 'react';
import { Link } from 'react-router-dom';

const ProjectDialogHeader = (props) => {
    const handleDialogClose = () => {
        props.setOpenDialog(false);
    };
  return (
    <div>
      <div className="h-[40px] bg-[#EDF3FF]  justify-center flex items-center">
                        <div className="mr-[410px] ml-[410px]">
                            <div className="text-[16px]">New project</div>
                        </div>
                        <div className="flex justify-center items-center rounded-full w-[30px] h-[30px] bg-white">
                            <Link to="/manageprojectinfo"><img onClick={handleDialogClose} className="w-[20px] h-[20px]" src={Cross} alt="cross" /></Link>
                        </div>
                    </div>
                    <div className="mt-1 flex bg-[#DAE7FF] justify-evenly items-center h-9">
                        <div className="bg-[#EBEBEB] px-4 py-1 rounded-md text-[12px] font-semibold flex justify-center items-center h-7 w-40" >
                            <div>Project Information</div>
                        </div>
                        <div className="bg-[#EBEBEB] px-4 py-1 rounded-md text-[12px] font-semibold flex justify-center items-center h-7 w-40">
                            <div>Project details</div>
                        </div>
                        <div className="bg-[#EBEBEB] px-4 py-1 rounded-md text-[12px] font-semibold flex justify-center items-center h-7 w-40">
                            <div>Bank details</div>
                        </div>
                        <div className="bg-[#EBEBEB] px-4 py-1 rounded-md text-[12px] font-semibold flex justify-center items-center h-7 w-40">
                            <div>Contacts</div>
                        </div>
                        <div className="bg-[#EBEBEB] px-4 py-1 rounded-md text-[12px] font-semibold flex justify-center items-center h-7 w-40">
                            <div>Photos</div>
                        </div>
                    </div>
    </div>
  )
}

export default ProjectDialogHeader
