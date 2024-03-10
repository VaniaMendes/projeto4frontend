import React from 'react';
import {userStore } from '../stores/UserStore';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';




function SideMenu(){

   const tokenObject = userStore(state => state.token);
    const tokenUSer = tokenObject.token;
   
   const handleClick = () => {
      window.location.href = './editProfile'
      
    }

    const logoutClick = async (event) => {
      event.preventDefault();
     
   
      try{
         const response = await fetch("http://localhost:8080/project_backend/rest/users/logout",{
   
            method: "POST",
            headers: {
             Accept: "*/*",
             "Content-Type": "application/json",
             'token': tokenUSer
            }
            });
            console.log(response);
   
            if(response.ok){
               userStore.getState().setToken("");
               NotificationManager.sucess("Logout with sucess");
               
            }else{
               const error = await response.json();
               return error;
            }
      }catch (error) {
          console.error('Fetch Error:', error);
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
      <button className="menu_item" id="btn_edit" onClick={handleClick}>&#9998; &nbsp; Edit Profile </button>
     
      <button className="menu_item" id="logout" onClick = {logoutClick}>&#x2B24; &nbsp; Logout</button>
   </div>    
   </div>
   </div>
   )           
}

export default SideMenu;
          