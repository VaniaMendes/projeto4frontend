import React from 'react';
import { NotificationManager } from "react-notifications";
import {createCategory} from '../endpoints/categories';
import {useState, useEffect} from 'react';
import {userStore} from '../stores/UserStore';
import {showModal, updateCategoriesTable, modeEditOn} from '../stores/boardStore';
import { editCategory, getCategoryById } from "../endpoints/categories";

function Categories(){

   //Vai buscar o token
  const tokenUser = userStore(state => state.token.token);

  //Variáveis para guardar o titulo e a descrição
  const [title, setTitle] = useState(''); 
  const [description, setDescription] = useState('');
 
  //Vai buscar o id da categoria  para editar 
  const categoryId = userStore((state) => state.getCategoryId());

  //Se o modeEdit for true está no modo edição
  const { modeEdit, setModeEdit } = modeEditOn();


//Va ibuscar o estado do show Category table
  const { setShowCategoriesTable, showCategoriesTable } = updateCategoriesTable();


  //Se abrir o modal no modo edit vamos buscar as informações da categoria para preencher
  useEffect(() => {
    const fetchData = async () => {
      if(modeEdit){
      const categoryAll = await getCategoryById(categoryId, tokenUser);
      if(categoryAll){
      setTitle(categoryAll.title);
      setDescription(categoryAll.description);
      }
    }
    };
    fetchData();
  },[]);



    //Função  que fecha o modal e coloca o modo de edição a false
    const closeModal = () => {
    showModal.setState({ showModalNewCategory: false });
    setModeEdit(false);
    setDescription('');
    setTitle('');
  
  };

 //Função para criar ou editar uma categoria
    const handleCategory = async (title, description, tokenUser) => {

      //Se o modo edit for true e o categoryId existir vamos editar

      if(modeEdit && categoryId){
   
          if (title !== "") {
            const result = await editCategory(
              categoryId,
              tokenUser,
              title,
              description
            );
      
    
            if (result === 200) {
              NotificationManager.success("Category successfully edited", "",1000);
              
              setShowCategoriesTable(!showCategoriesTable);
              closeModal();
       
      
                   } else if (result === 422) {
              NotificationManager.warning("Title not available", "",1000);
            } else {
              NotificationManager.error("Failed to edit category","",1000);
            }
          } else {
            NotificationManager.warning("Please put a title", "",1000);
          }
        

      }else{
//Se o modo edit for false vamos criar uma nova categoria

        if(title !== ""){
        const result = await createCategory(title, description, tokenUser);
        if (result === 200) {
          NotificationManager.success("Category successfully created", "", 800);        
          closeModal();
          setShowCategoriesTable(!showCategoriesTable);
        }else if (result === 422){
            NotificationManager.warning("Title already exists", "", 800);
         
        } else {
          NotificationManager.error("Failed to create category", "", 800);
        }
    }else{
        NotificationManager.warning("Please fill the title", "", 800);
    }
  }

      };
     
    return(
  
          
        <div className="modal_container">             
        {showModal && (
        <div className="descricaoCategoria">
            <button className="modal_exit" id="cancel" onClick={closeModal}>&times;</button>
            <h2>{modeEdit ? 'Edit Category' : 'New Category'}</h2>
            <label htmlFor="title">Category Title:</label>
            <input type="text" placeholder= {modeEdit ? title : "Category Title"}  id="title" 
            value={title} onChange={(event) => setTitle(event.target.value)} required />
            <label htmlFor="description">Description:</label>
            <textarea cols="30" rows="5" placeholder={modeEdit ? description : "Category Description"} id="description" 
            value={description} onChange={(event) => setDescription(event.target.value)}></textarea>
                 
            <div className="buttons">
                <button className="btns_task" id="category_save" onClick={() => handleCategory(title, description, tokenUser)}>  {modeEdit ? 'Update' : 'Save'}</button>
                <button className="btns_task" id="category_delete" onClick={closeModal}>Cancel</button>
            </div>
        </div>
   
  
    )};
     </div>
    
    )
}

export default Categories;