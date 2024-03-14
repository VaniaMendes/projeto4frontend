import React from 'react';
import { NotificationManager } from "react-notifications";
import {createCategory} from '../endpoints/categories';
import {useState, useEffect} from 'react';
import {userStore} from '../stores/UserStore';


function Categories(){

    const [title, setTitle] = useState(''); 
    const [description, setDescription] = useState('');
    const tokenObject = userStore(state => state.token);
    const tokenUser = tokenObject.token;
    const forceUpdate = userStore(state=>state.forceUpdate);

    const [showModal, setShowModal] = useState(true);  

  function closeModal() {
    setShowModal(false);
  };


    const handleCategory = async (title, description, tokenUser) => {
        if(title !== ""){
        const result = await createCategory(title, description, tokenUser);
        if (result === 200) {
            userStore.getState().setForceUpdate(!forceUpdate);
          NotificationManager.success("Category successfully created", "", 800);
          closeModal();
        }else if (result === 422){
            NotificationManager.warning("Title already exists", "", 800);
         
        } else {
          NotificationManager.error("Failed to create category", "", 800);
        }
    }else{
        NotificationManager.warning("Please fill the title", "", 800);
    }

      };
     

    return(
        <div>
          
        {showModal && (
          
        <div className="modal_container">
        <div className="descricaoCategoria">
            <button className="modal_exit" id="cancel" onClick={closeModal}>&times;</button>
            <label htmlFor="title">Category Title:</label>
            <input type="text" placeholder="Category Title" id="title" 
            value={title} onChange={(event) => setTitle(event.target.value)} required />
            <label htmlFor="description">Description:</label>
            <textarea cols="30" rows="5" placeholder="Category Description" id="description" 
            value={description} onChange={(event) => setDescription(event.target.value)}></textarea>
                 
            <div className="buttons">
                <button className="btns_task" id="category_save" onClick={() => handleCategory(title, description, tokenUser)}>Save</button>
                <button className="btns_task" id="category_delete" onClick={closeModal}>Cancel</button>
            </div>
        </div>
    </div>
  
    )};
    </div>
    
    )
}

export default Categories;