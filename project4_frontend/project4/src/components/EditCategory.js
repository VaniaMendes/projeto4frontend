import React, { useState } from "react";
import { editCategory, getCategoryById } from "../endpoints/categories";
import {NotificationManager } from "react-notifications";
import { showModal } from "../stores/boardStore";

import { userStore } from "../stores/UserStore";
import { useEffect } from "react";

function EditCategory({categoryIdToEdit}) {
  const [newtitle, setNewtitle] = useState("");
  const [newdescription, setNewdescription] = useState("");
  const tokenObject = userStore((state) => state.token);
  const tokenUser = tokenObject.token;
  const categoryId = userStore((state) => state.getCategoryId());
  console.log(categoryId);
 


  

  const [originalTitle, setOriginalTitle] = useState(null);
  const [originalDescription, setOriginalDescription] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      const categoryAll = await getCategoryById(categoryId, tokenUser);
      if(categoryAll){
      setOriginalTitle(categoryAll.title);
      setOriginalDescription(categoryAll.description);
      }
    };
    fetchData();
  },);

  const closeModal = () => {
    showModal.setState({ showEditCategory: false });
  };
  
  async function editCategoryModal(
    categoryId,
    tokenUser,
    newtitle,
    newdescription
  ) {
    if (newtitle !== "") {
      const result = await editCategory(
        categoryId,
        tokenUser,
        newtitle,
        newdescription
      );


      if (result === 200) {
        NotificationManager.success("Category successfully edited", "",1000);
        closeModal();
 

             } else if (result === 422) {
        NotificationManager.warning("Title not available", "",1000);
      } else {
        NotificationManager.error("Failed to edit category","",1000);
      }
    } else {
      NotificationManager.warning("Please put a title", "",1000);
    }
  }

  return (
    
              <div  className="modal_container"> {showModal && (
          <div className="descricaoCategoria">
            <button className="modal_exit" id="cancel" onClick={closeModal}>
              &times;
            </button>
            <h2>Category Edition</h2>
            <label htmlFor="title">Category Title:</label>
            <input
              type="text"
              placeholder={originalTitle}
              id="title"
              value={newtitle}
              onChange={(event) => setNewtitle(event.target.value)}
            />
            <label htmlFor="title">Description:</label>
            <textarea
              cols="30"
              rows="5"
              placeholder={originalDescription}
              id="description"
              value={newdescription}
              onChange={(event) => setNewdescription(event.target.value)}
            ></textarea>

            <div className="buttons">
              <button
                className="btns_task"
                id="category_edit_save"
                onClick={() =>
                  editCategoryModal(
                    categoryId,
                    tokenUser,
                    newtitle,
                    newdescription
                  )
                }
              >
                Edit
              </button>
              <button
                className="btns_task"
                id="category_edit_delete"
                onClick={() => closeModal()}
              >
                Cancel
              </button>
            </div>
          </div>
        
      )}
      ;
    </div>
  );
}

export default EditCategory;
