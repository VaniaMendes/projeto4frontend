import React, { useState } from "react";
import { FaUserEdit } from "react-icons/fa";
import { MdAutoDelete } from "react-icons/md";
import { userStore } from "../stores/UserStore";
import "../format/tables.css";
import { deleteUser } from "../endpoints/users";
import NewUser from "./NewUser";
import { NotificationManager } from "react-notifications";
import { IoFilter } from "react-icons/io5";


function UserTable({ users }) {
  const tokenObject = userStore((state) => state.token);
  const tokenUser = tokenObject.token;
  const forceUpdate = userStore(state=>state.forceUpdate);
  const [showModal, setShowModal] = useState(false);

  const handleEdit = (tokenUser, username) => {

  };

function showModalNewUSer(){
  setShowModal(true);
  userStore.getState().setForceUpdate(!forceUpdate);
}

async function handleDelete (tokenUser, username){
    const result = await deleteUser(tokenUser, username);

    if (result === true) {
      NotificationManager.success("User deleted successfully", "", 1000);
      
    } else {
      NotificationManager.error("Failed to delete user");
    }
    userStore.getState().setForceUpdate(!forceUpdate);
  };

  async function handleDeleteTasks(tokenUser, username) {

  };

  return (
    <div>
    
    <div className="users_container">
      <div className="users_table">
        <table id="users_table">
          <thead>
            <tr className="head">
              <th className="titleUser"><img src='icon-green.png'></img></th>
              <th className="titleUser2">Active Users</th>
              <th className="titleUser"></th>
              <th className="titleUser">
                <button id="btn_user"onClick={showModalNewUSer}>+New User</button>
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
                      onClick={() => handleEdit(tokenUser, user.username)}
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
    </div>
    {showModal && <NewUser/>}</div>
  );
}

export default UserTable;
