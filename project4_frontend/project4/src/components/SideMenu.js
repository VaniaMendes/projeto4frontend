import React, { useState, useEffect } from "react";
import { userStore } from "../stores/UserStore";
import { NotificationContainer, NotificationManager } from "react-notifications";
import 'react-notifications/lib/notifications.css';
import { HiHome } from "react-icons/hi2";
import { RiLogoutCircleFill } from "react-icons/ri";
import { RiEdit2Fill } from "react-icons/ri";
import { logout } from "../endpoints/users";
import { getUserByToken } from "../endpoints/users";
import { useNavigate  } from 'react-router-dom';


function SideMenu() {
  const tokenObject = userStore((state) => state.token);
  const tokenUser = tokenObject.token;
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/editProfile");
  };
  const homeclick = () => {
    navigate( "/principalPage");
  };

  const logoutClick = async (event) => {
    event.preventDefault();
    const result = await logout(tokenUser);

    if (result === true) {
      NotificationManager.success("Logout successfully");
      setTimeout(() => {
        navigate("/login");
      }, 800);
    } else {
      console.error("Erro ao buscar dados do usuário:", result.error);
    }
  };
  useEffect(() => {
    async function fetchData() {
      try {
        const user = await getUserByToken(tokenUser);
        setUserData(user);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    }
    fetchData();
  }, [tokenUser]);

  return (
    <div>
     <NotificationContainer  className='notification-container' />

      <div id="side_menu">
        <div id="menu">
          <div className="menu_image" id="user_name">
            <div id="user_info">
              <img id="user_img" src={userData.imgURL} alt="User logo" />
              <span className="welcome">{userData.firstName}</span>
            </div>
            <button className="menu_item" onClick={homeclick}>
              <HiHome /> Home
            </button>
            <button className="menu_item" onClick={logoutClick}>
              <RiLogoutCircleFill /> Logout
            </button>
            <button className="menu_item" onClick={handleClick}>
              <RiEdit2Fill /> Edit Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideMenu;
