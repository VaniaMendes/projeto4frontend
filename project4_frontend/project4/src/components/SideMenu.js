import React from 'react';


function SideMenu(){

<div id="menu">
   <p className="menu_item" id="user_name">
   <img id="user_img" src="user.png" alt="User logo" /><span id="user">Username</span>
   </p>

   <div className="menu_item" id="date"></div>
      <button className="menu_item" id="btn_edit">&#9998; &nbsp; Edit Profile</button>
      <button className="menu_item" id="logout">&#x2B24; &nbsp; Logout</button>
   <div className = "menu_item" id="menu"></div>
   </div>               
}

export default SideMenu;
          