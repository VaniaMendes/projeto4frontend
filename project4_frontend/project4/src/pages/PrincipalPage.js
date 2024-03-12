import React, { useEffect } from "react";
import HomePage from '../components/MainPage';
import SideMenu from '../components/SideMenu';
import SearchFields from '../components/SearchFields';
import ScrumBoard from '../components/ScrumBoard';
import MenuProductOwner from '../components/MenuProductOwner';
import {userStore} from '../stores/UserStore';
import { useState } from "react";



function PrincipalPage(){

    const tokenObject = userStore(state => state.token);
    const tokenUSer = tokenObject.token;
    const [userType, setUserType] = useState(null);
    

   useEffect(() => {
    const fetchData = async()=> {
        try {
            const response = await fetch("http://localhost:8080/project_backend/rest/users", {
                method: "GET",
                headers: {
                    Accept: "*/*",
                    "Content-Type": "application/json",
                    'token':tokenUSer
                }
            });
     
            if (response.ok) {
                const user = await response.json();
                setUserType(user.typeOfUser);
                
                
            } else {
                console.error("Failed to fetch user data");
               window.location.href='/login';
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
            return null;
        }
     };
     fetchData();
    }, [tokenUSer]);


    console.log(userType);

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

