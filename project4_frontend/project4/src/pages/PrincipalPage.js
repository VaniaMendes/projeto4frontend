import React, { useEffect } from "react";
import HomePage from '../components/MainPage';
import SideMenu from '../components/SideMenu';
import SearchFields from '../components/SearchFields';
import ScrumBoard from '../components/ScrumBoard';
import MenuProductOwner from '../components/MenuProductOwner';
import {userStore} from '../stores/UserStore';
import { useState } from "react";
import { useNavigate  } from 'react-router-dom';



function PrincipalPage(){

    const tokenObject = userStore(state => state.token);
    const tokenUser = tokenObject.token;
    const [userType, setUserType] = useState(null);
    const navigate=useNavigate();
    
   useEffect(() => {
    const fetchData = async()=> {
        try {
            const response = await fetch("http://localhost:8080/project_backend/rest/users", {
                method: "GET",
                headers: {
                    Accept: "*/*",
                    "Content-Type": "application/json",
                    'token':tokenUser
                }
            });
     
            if (response.ok) {
                const user = await response.json();
                setUserType(user.typeOfUser);
                
            } else {
                console.error("Failed to fetch user data");
              navigate('/login');
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
            return null;
        }
     };
     fetchData();
    }, [tokenUser]);

    return(
        <div>
            
            {userType === 'product_owner' && <MenuProductOwner />}
            <HomePage />
            <SideMenu />
            <SearchFields />
            <ScrumBoard />
        </div>
    );
}
    
    export default PrincipalPage;

