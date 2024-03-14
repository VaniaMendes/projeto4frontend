import React, {useState} from 'react';
import {userStore} from '../stores/UserStore';
import { NotificationContainer, NotificationManager } from "react-notifications";
import 'react-notifications/lib/notifications.css';
import { MdOutlineRestore } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";
import "../format/tables.css";
import { deleteUserForever, restoreUser} from '../endpoints/users';


function InactiveUsersTable({ users }) {
    const tokenObject = userStore(state => state.token);
    const tokenUser = tokenObject.token;
    const forceUpdate = userStore(state=>state.forceUpdate);


    async function handleRestore (tokenUser, username) {
       const result= await restoreUser(tokenUser, username);
       if(result){
        NotificationManager.success("User restored successfully", "", 1000);
        userStore.getState().setForceUpdate(!forceUpdate);
        
       }else{
        NotificationManager.error("Failed to restore user", "", 1000);
       }
        
    }
    
    const handleDeleteForever = (tokenUser, username) => {
       
        NotificationManager.info("Are you sure you want to delete this user?", "Confirm", 7000, () => {
            deleteUserForever(tokenUser, username)
                .then(result => {
                    
                    if (result===true) {
                        userStore.getState().setForceUpdate(!forceUpdate);
                        NotificationManager.success("User deleted successfully", "", 1000);
                    } else {
                        NotificationManager.error("Failed to delete user", "", 1000);
                    }
                })
                .catch(error => {
                    NotificationManager.error("Error deleting user");
                });
        });
    };

    return (
        <div className='users_container'>
            
        <div className='users_table'>
        <table id="users_table">
       
        <thead className='header'>
            <tr className='head'>
            <th className='titleUser' id= 'users_table'><img src='user_icon.png'></img></th>
            <th className='titleUser1'>Inactive Users</th>
            <th className='titleUser'></th>
            <th className = 'titleUser'></th>
            <th className = 'titleUser'></th>
            <th className = 'titleUser'>
                <input className='searchUser' placeholder='Search User'></input>
                <button className="search_icon">&#128269;</button>
                </th>
                </tr>
           
                <tr>
                    <th className='image'></th>
                    <th >Name</th>
                    <th >Email</th>
                    <th >Phone</th>
                    <th >Role</th>
                    <th></th>

                </tr>
            </thead>
            <tbody className = 'body'>
                {users && users.map((user, index) => (
                    <tr key={index}>
                        <td ><img className='imagem_user' src={user.imgURL} alt='user.png' /></td>
                        <td>{user.firstName + "  " + user.lastName}</td>
                        <td>{user.email}</td>
                        <td>{user.phoneNumber}</td>
                        <td>
                        {user.typeOfUser === 'developer' ? 'Developer' : 
                         user.typeOfUser === 'scrum_master' ? 'Scrum Master' :
                        user.typeOfUser === 'product_owner' ? 'Product Owner' : ''}
                        </td>
                        <td>
                            <button className='edit_button' onClick={() => handleRestore(tokenUser, user.username)}><MdOutlineRestore /></button>
                            <button className='delete_button' onClick={() => handleDeleteForever(tokenUser, user.username)}><MdDeleteForever /></button>
                           
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        </div>
        </div>
    );
}

export default InactiveUsersTable;
