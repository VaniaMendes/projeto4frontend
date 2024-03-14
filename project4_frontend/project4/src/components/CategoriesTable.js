import React from "react";
import "../format/tables.css";
import NewCategory from "./NewCategory";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { useState } from "react";
import EditCategory from "./EditCategory";
import { deleteCategory } from "../endpoints/categories";
import {  NotificationManager} from "react-notifications";
import "react-notifications/lib/notifications.css";
import { userStore } from "../stores/UserStore";
import { IoFilter } from "react-icons/io5";

function Categories({ categories }) {
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [categoryId, setCategoryId] = useState(null);
  const tokenObject = userStore((state) => state.token);
  const tokenUser = tokenObject.token;
  const forceUpdate = userStore((state) => state.forceUpdate);

  function openEditModal() {
    setShowEditModal(true);  
  }
  
  function openModal() {
    setShowModal(true);
  }

  async function handleDelete(categoryId, tokenUser) {
    const result = await deleteCategory(categoryId, tokenUser);

    if (result === true) {
      NotificationManager.success("Category deleted successfully", "",1000);
      userStore.getState().setForceUpdate(!forceUpdate);
    } else {
      NotificationManager.error("Failed to delete category", "", 1000);
    }
  }

  return (
    <div>
     
      <div className="users_container">
        <div className="users_table">
          <table id="users_table">
            <thead>
              <tr className="head">
                <th className="titleUser">Categories</th>
                <th className="titleUser"></th>
                <th>
                  <button id="btn_user" onClick={() => openModal()}>
                    +New Category
                  </button>
                </th>
                <th className="titleUser">
                
                  <button className="search_icon"><IoFilter/></button>
                </th>
              </tr>
              <tr className="header">
                <th>Title</th>
                <th>Description</th>
                <th>Author</th>
                <th>Category Edition</th>
              </tr>
            </thead>
            <tbody className="body">
              {categories &&
                categories.map((category, index) => (
                  <tr key={index}>
                    <td>{category.title}</td>
                    <td>{category.description}</td>
                    <td>{category.author.username}</td>

                    <td>
                      <button
                        className="edit_button"
                        onClick={() => {
                          setCategoryId(category.idCategory);
                          openEditModal();
                        }}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="delete_button"
                        onClick={() => {
                          setCategoryId(category.idCategory);
                          handleDelete(category.idCategory, tokenUser);
                        }}
                      >
                        <MdDeleteForever />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
      {showModal && <NewCategory showModal={showModal} />}
      {showEditModal && (
        <EditCategory categoryId={categoryId} showEditModal={showEditModal} />
      )}
    </div>
  );
}

export default Categories;
