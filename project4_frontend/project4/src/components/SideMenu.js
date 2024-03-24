import React, { useState, useEffect } from "react";
import { userStore } from "../stores/UserStore";
import { NotificationManager } from "react-notifications";
import 'react-notifications/lib/notifications.css';
import { HiHome } from "react-icons/hi2";
import { RiLogoutCircleFill } from "react-icons/ri";
import { RiEdit2Fill } from "react-icons/ri";
import { logout } from "../endpoints/users";
import { getUserByToken } from "../endpoints/users";
import { useNavigate  } from 'react-router-dom';
import { MdTask } from "react-icons/md";
import { myTasks} from '../endpoints/tasks';
import {showMyTasks, showModal} from '../stores/boardStore';



function SideMenu() {

  
  const { setRole } = userStore();
  const tokenObject = userStore((state) => state.token);
  const tokenUser = tokenObject.token;
  const {filterOn, setFilterOn} = showModal();

  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

 const {showUserTasks, setShowUserTasks} = showMyTasks();
 console.log(showUserTasks);




  const handleClick = () => {
    navigate("/editProfile");
    setFilterOn(false);
    setShowUserTasks(false);
  };
  const homeclick = () => {
    setShowUserTasks(false);
    setFilterOn(false);
    navigate( "/principalPage");
  };

  const handleMyTaks = async(tokenUser) => {
    navigate("/principalPage");

    //Vou buscar as tasks do user que está logado
  const result = await myTasks(tokenUser);
  console.log(result);
  if(result !== null){
    userStore.getState().setMyTasks(result);
    setShowUserTasks(true);
  
  }else{
    NotificationManager.warning("No tasks found", "", 800);
  }
    
  };

  const logoutClick = async (event) => {
    event.preventDefault();
    try{
    const result = await logout(tokenUser);

    if (result === true) {
      NotificationManager.success("Logout successfully");
      setTimeout(() => {
        navigate("/login");
      }, 800);
    } else {
      console.log("Erro ao buscar dados do usuário:", result.error);
    }
  }catch(error){
    console.log("Erro durante logout", error);
  }
  };



  useEffect(() => {
    async function fetchData() {
      try {
        const user = await getUserByToken(tokenUser);
        setUserData(user);
        setRole(user.typeOfUser);
       
      } catch (error) {
        console.log("Error fetching user data:", error);
      }
    }
    fetchData();
  }, [tokenUser]);


  return (
    <div>
           <div id="side_menu">
        <div id="menu">
          <div className="menu_image" id="user_name">
            <div id="user_info">
            <img id="user_img" src={userData && userData.imgURL} alt="User logo" />
              <span className="welcome">{userData && userData.firstName}</span>
            </div>
            <div className = "menuSide">
            <div className='menuPO'>
            <ul className="menu_list">
              <li className="item_PO" onClick={homeclick}>
                <HiHome /> Home
              </li>
              <li className="item_PO" onClick={logoutClick}>
                <RiLogoutCircleFill /> Logout
              </li>
              <li className="item_PO" onClick={handleClick}>
                <RiEdit2Fill /> Edit Profile
              </li>
              <li className="item_PO" onClick={() =>handleMyTaks(tokenUser)}>
                <MdTask /> My Tasks
              </li>
            </ul>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideMenu;
