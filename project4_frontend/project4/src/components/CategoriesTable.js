import React from 'react';
import '../format/tables.css';
import NewCategory from './NewCategory';
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import {useState} from 'react';
import EditCategory from './EditCategory';
import {deleteCategory} from '../endpoints/categories';
import { NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import {userStore } from '../stores/UserStore';

function Categories({categories}) {

  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [categoryId, setCategoryId] = useState(null);
  const tokenObject = userStore(state => state.token);
  const tokenUser = tokenObject.token;
  const forceUpdate = userStore(state=>state.forceUpdate);

  
  function openModal() {
    setShowModal(true);
  }

  function openEditModal(){
    setShowEditModal(true);
  }

  const handleDelete = (categoryId, tokenUser) => {
    console.log(categoryId, tokenUser);
       
    NotificationManager.info("Are you sure you want to delete this category?", "Confirm", 8000, () => {
      deleteCategory(categoryId, tokenUser)
            .then(result => {
                
                if (result===true) {
                    NotificationManager.success("Category deleted successfully", "", 1000);
                    userStore.getState().setForceUpdate(!forceUpdate);
                } else {
                    NotificationManager.error("Failed to delete category", "", 1000);
                }
            })
            .catch(error => {
                NotificationManager.error("Error deleting category");
            });
    });
};

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
              <button id="btn_user" onClick={() => openModal()}>+New Category</button>
            </th>
            <th className="titleUser">
              <input className="searchUser" placeholder="Search User" />
              <button className="search_icon">&#128269;</button>
            </th>
          </tr>
          <tr className ="header">
            <th>Title</th>
            <th>Description</th>
            <th>Author</th>
            <th>Category Edition</th>
          </tr>
        </thead>
        <tbody className = 'body'>
                {categories && categories.map((category, index) => (
                    <tr key={index}>

                        <td>{category.title}</td>
                        <td>{category.description}</td>
                        <td>{category.author.username}</td>
                        
                        <td>
                        <button
                      className="edit_button"
                      onClick={() => {
                        setCategoryId(category.idCategory);
                        console.log(category)
                        openEditModal(true);
                      }}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="delete_button"
                      onClick  ={() => {
                        setCategoryId(category.idCategory);
                        handleDelete(category.idCategory, tokenUser)}
                    }
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
    {showModal && <NewCategory/>}
    {showEditModal && <EditCategory categoryId={categoryId} />}
    </div>
    
  );
}

export default Categories;