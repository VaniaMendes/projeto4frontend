
import MainPage from '../components/MainPage';
import MenuProductOwner from '../components/MenuProductOwner';
import SideMenu from '../components/SideMenu';
import UserTable from '../components/UserTable';
import React, { useEffect, useState } from 'react';
import { userStore } from '../stores/UserStore';


function Users(){

    const tokenObject = userStore(state => state.token);
    const tokenUSer = tokenObject.token;
    const [users, setUsers] = useState(null);
    const forceUpdate = userStore(state => state.forceUpdate)

    useEffect(() => {
        const fetchData = async()=> {
            try {
                const response = await fetch("http://localhost:8080/project_backend/rest/users/activeUsers", {
                    method: "GET",
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        'token':tokenUSer
                    }
                });
         
                if (response.ok) {
                    const users = await response.json();
                    setUsers(users);
                    
                } else {
                    console.error("Failed to fetch user data");
                  
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
                return null;
            }
         };
         fetchData();
        }, [tokenUSer, forceUpdate]);


    return(
        <div>
           <UserTable users={users} />
            <MainPage />
            <SideMenu/>
            <MenuProductOwner/>
        </div>
    )
}

export default Users;