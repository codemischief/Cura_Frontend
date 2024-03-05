import React from 'react';
import { Outlet, Link } from "react-router-dom";
import Back from "../assets/back.png";
import searchIcon from "../assets/searchIcon.png";
import Next from "../assets/next.png";
import Refresh from "../assets/refresh.png";
import Download from "../assets/download.png";
import Body from '../Body/Body';
import CountryDialogue from '../modals/CountryDialogue';

const Country = () => {
  // we have the module here
  const [isCountryDialogue,setIsCountryDialogue] = React.useState(false);
  const handleOpen = () => {
    //  handleDisplay(false);
     setIsCountryDialogue(true);
  };
  const handleClose = () => {
    setIsCountryDialogue(false);
  }
  return (
    <div>
      <div>
        <Outlet />
      </div>
      <Body openDialog={handleOpen} closeDialog={handleClose}/>
      <CountryDialogue openDialog={isCountryDialogue} setOpenDialog={handleOpen} closeDialog={handleClose}/>
    </div>
  )
}

export default Country
