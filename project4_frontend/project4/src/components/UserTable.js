import React, { useState } from "react";
import { FaUserEdit } from "react-icons/fa";
import { MdAutoDelete } from "react-icons/md";
import { userStore } from "../stores/UserStore";
import { NotificationManager } from "react-notifications";
import "react-notifications/lib/notifications.css";
import "../format/tables.css";
import { deleteUser } from "../endpoints/users";

function UserTable({ users }) {
  const tokenObject = userStore((state) => state.token);
  const tokenUSer = tokenObject.token;

  const handleEdit = (tokenUSer, username) => {};

  const handleDelete = async (tokenUser, username) => {
    const result = await deleteUser(tokenUser, username);

    if (result === true) {
      NotificationManager.success("User deleted successfully", "", 800);
    } else {
      NotificationManager.error("Failed to delete user", "", 800);
    }
  };

  const handleDeleteTasks = (tokenUser, username) => {};

  return (
    <div className="users_container">
      <div className="users_table">
        <table id="users_table">
          <thead>
            <tr className="head">
              <th className="titleUser"></th>
              <th className="titleUser">Active Users</th>
              <th className="titleUser"></th>
              <th className="titleUser">
                <button id="btn_user">+New User</button>
              </th>
              <th className="titleUser"></th>
              <th className="titleUser">
                <input className="searchUser" placeholder="Search User" />
                <button className="search_icon">&#128269;</button>
              </th>
            </tr>
            <tr className="header">
              <th className="image"></th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Role</th>
              <th></th>
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
                      onClick={() => handleEdit(tokenUSer, user.username)}
                    >
                      <FaUserEdit />
                    </button>
                    <button
                      className="delete_button"
                      onClick={() => handleDelete(tokenUSer, user.username)}
                    >
                      <MdAutoDelete />
                    </button>
                    <button
                      className="delete_task"
                      onClick={() =>
                        handleDeleteTasks(tokenUSer, user.username)
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
  );
}

export default UserTable;
