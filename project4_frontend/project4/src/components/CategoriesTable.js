import React from "react";
import "../format/tables.css";
import NewCategory from "./NewCategory";
import { FaEdit } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { useState, useEffect } from "react";
import EditCategory from "./EditCategory";
import { deleteCategory } from "../endpoints/categories";
import {  NotificationManager} from "react-notifications";
import "react-notifications/lib/notifications.css";
import { userStore } from "../stores/UserStore";
import { IoFilter } from "react-icons/io5";
import {getAllCategories} from '../endpoints/categories'
import { BiSolidCategoryAlt } from "react-icons/bi";

import { showModal, updateCategoriesTable } from '../stores/boardStore';

function Categories() {
  const [categories, setCategories] = useState(null);

  const tokenObject = userStore((state) => state.token);
  const tokenUser = tokenObject.token;
  const showModalNewCategory = showModal((state) => state.showModalNewCategory);
  const showEditCategory = showModal((state) => state.showEditCategory);
  const setShowModalNewCategory = showModal((state) => state.setShowModalNewCategory);
  const setShowEditCategory = showModal((state) => state.setShowEditCategory);
  const { setShowCategoriesTable, showCategoriesTable } = updateCategoriesTable();

 
        const fetchData = async()=> {
                const categories = await getAllCategories(tokenUser);
                setCategories(categories);
         };
        
        
        useEffect(() => {
          fetchData();
        }, [tokenUser, showCategoriesTable]);

        const openEditModal = (categoryId) => {
          userStore.getState().setCategoryId(categoryId);
          setShowEditCategory(true);
            
        };

  const handleDelete = async (categoryId, tokenUser) => {
    const result = await deleteCategory(categoryId, tokenUser);
    console.log(result); 
    console.log(categoryId);
    
    if (result === true) {
      NotificationManager.success("Category deleted successfully", "",1000);
      fetchData();
    } else {
      NotificationManager.error(result, "", 1200);
    }
  }

  return (
    <div >
    <div className="table_container">
          <table id="users_table">
            <thead>
              <tr >
                <th className="titleUser"><BiSolidCategoryAlt className='task_icon'/></th>
                <th className="titleUser3">  Categories</th>
                <th>
                  <button id="btn_user" onClick={() => setShowModalNewCategory(true)}>
                    +New Category
                  </button>
                </th>
                <th className="titleUser">
                
                  <button className="search_icon"><IoFilter/></button>
                </th>
              </tr>
              <tr className="header">
              <th>Author</th>
                <th>Title</th>
                <th>Description</th>
                <th>Category Edition</th>
              </tr>
            </thead>
            <tbody className="body">
              {categories &&
                categories.map((category, index) => (
                  <tr key={index}>
                     <td>{category.author.username}</td>
                    <td>{category.title}</td>
                    <td>{category.description}</td>
                    <td>
                      <button
                        className="edit_button"
                        onClick={() => openEditModal(category.idCategory)}
                      
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="delete_button"
                        onClick={() => handleDelete(category.idCategory, tokenUser)}
                       
                      >
                        <MdDeleteForever />
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
    </div>
      {showModalNewCategory && <NewCategory />}
      {showEditCategory && <EditCategory />}
    </div>
  );
}

export default Categories;
