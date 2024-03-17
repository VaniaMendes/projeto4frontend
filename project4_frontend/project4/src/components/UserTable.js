import React, { useState, useEffect } from "react";
import { FaUserEdit } from "react-icons/fa";
import { MdAutoDelete } from "react-icons/md";
import { userStore } from "../stores/UserStore";
import "../format/tables.css";
import { deleteUser } from "../endpoints/users";
import NewUser from "./NewUser";
import { NotificationManager } from "react-notifications";
import { IoFilter } from "react-icons/io5";
import{ getActiveUsers} from '../endpoints/users';
import { showModal } from '../stores/boardStore';
import {deleteUserTasks} from '../endpoints/tasks';
import { editProfileByPO } from '../stores/boardStore';
import EditProfile from "./edit_profile";


function UserTable() {
  const tokenObject = userStore((state) => state.token);
  const tokenUser = tokenObject.token;
  const [users, setUsers] = useState(null);
  const { showNewUserModal, setShowNewUserModal } = showModal();
  const { showEditProfilePO, setShowEditProfilePO } = editProfileByPO();
  
  

  useEffect(() => {
        const fetchData = async()=> {
          const users = await getActiveUsers(tokenUser);
          setUsers(users);
              
         };
         fetchData();
        }, [tokenUser]);




  const handleEdit = async () => {
    setShowEditProfilePO(true);
    

  };

const openModal= ()=>{
  setShowNewUserModal(true);
 
};


const handleDelete = async (tokenUser, username) => {
  try {
    const result = await deleteUser(tokenUser, username);
    if (result === true) {
      NotificationManager.success("User deleted successfully", "", 1000);
      const updatedUsers = users.filter((user) => user.username !== username);
      setUsers(updatedUsers);
    } else {
      NotificationManager.error("Failed to delete user");
    }
  } catch (error) {
    console.error("Erro ao excluir usuário:", error);
    NotificationManager.error("Failed to delete user");
  }
};

const handleDeleteTasks = async (tokenUser, username) => {
  try {
    const result = await deleteUserTasks(tokenUser, username);
    if (result === true) {
      NotificationManager.success("User tasks deleted successfully", "", 1000);
    } else {
      NotificationManager.error("Failed to delete user tasks");
    }
  } catch (error) {
    console.error("Error deleting user tasks:", error);
    NotificationManager.error("Failed to delete user tasks");
  }
};


  return (
    
    
    <div>
     
    <div className="table_container">
      
        <table classname="users_table">
          <thead >
            <tr  >
              <th className="titleUser"><img src="icon-green.png"></img></th>
              <th className="titleUser2">Active Users</th>
              <th className="titleUser">
              <button id="btn_user"onClick={openModal}>+New User</button>
              </th>
              <th className="titleUser">
                
              </th>
              <th className="titleUser"></th>
              <th className="titleUser">
                
                <button className="search_icon"><IoFilter/></button>
              </th>
            </tr>
            <tr className="header">
              <th className="image"></th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Role</th>
              <th>User Edition</th>
            </tr>
          </thead>
          
          <tbody className="body">
            {users &&
              users.map((user, index) => (
                <tr key={index}>
                  <td>
                    <img
                      className="imagem_user"
                      src={user.imgURL}
                      alt="user.png"
                    />
                  </td>
                  <td>{user.firstName + "  " + user.lastName}</td>
                  <td>{user.email}</td>
                  <td>{user.phoneNumber}</td>
                  <td>
                    {user.typeOfUser === "developer"
                      ? "Developer"
                      : user.typeOfUser === "scrum_master"
                      ? "Scrum Master"
                      : user.typeOfUser === "product_owner"
                      ? "Product Owner"
                      : ""}
                  </td>
                  <td>
                    <button
                      className="edit_button"
                      onClick={() => handleEdit()}
                    >
                      <FaUserEdit />
                    </button>
                    <button
                      className="delete_button"
                      onClick={() => handleDelete(tokenUser, user.username)}
                    >
                      <MdAutoDelete />
                    </button>
                    <button
                      className="delete_task"
                      onClick={() =>
                        handleDeleteTasks(tokenUser, user.username)
                      }
                    >
                      Delete Tasks
                    </button>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
</div>
  {showEditProfilePO && <EditProfile/>}
    {showNewUserModal && <NewUser/>}</div>
  );
}

export default UserTable;
