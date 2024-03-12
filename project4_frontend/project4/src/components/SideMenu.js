import React from 'react';
import {userStore } from '../stores/UserStore';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { HiHome } from "react-icons/hi2";
import { RiLogoutCircleFill } from "react-icons/ri";
import { RiEdit2Fill } from "react-icons/ri";
import {logout} from "../endpoints/users";




function SideMenu(){

   const tokenObject = userStore(state => state.token);
    const tokenUser = tokenObject.token;
    const forceUpdate = userStore(state=>state.forceUpdate);
  
   
   const handleClick = () => {
      window.location.href = '/editProfile';
      
    }
    const homeclick = () => {
      window.location.href = './principalPage';
      
    }

    const logoutClick = async (event) => {
      event.preventDefault();
      const result = await logout(tokenUser);

      if (result===true) {
         NotificationManager.success("Logout successfully")
         setTimeout(() => {
            window.location.href = '/login';
         }, 1500);
      } else {
          console.error("Erro ao buscar dados do usuário:", result.error);
         
      }
     
    }


   return(
      <div>
      <NotificationContainer />

   <div id="side_menu">
   <div id="menu">
   <p className="menu_item" id="user_name">
   <img id="user_img" src="user.png" alt="User logo" /><span id="user">Username</span>
   </p>
   <div className="menu_item" id="date"></div>
   <button className="menu_item" id="home" onClick = {homeclick}><HiHome /> Home</button>
   <button className="menu_item" id="logout" onClick = {logoutClick} ><RiLogoutCircleFill/> Logout</button>
      <button className="menu_item" id="btn_edit" onClick={handleClick}><RiEdit2Fill/> Edit Profile </button>
     
      
   </div>    
   </div>
   </div>
   )           
}

export default SideMenu;
          