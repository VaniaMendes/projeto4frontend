import React from 'react';

function Categories(){


    return(
        <div id="categoryModal" class="modal-category">
        <div id="overlay-modal-category"></div>
        <div class="descricaoCategoria">
            <btn class="modal_exit" id="cancel">&times;</btn>
            <h2 id="task_creationTitle"></h2>
            <label for="title">Category Title:</label>
            <input type="text" placeholder="Category Title" id="title" required />
            <label for="title">Description:</label>
            <textarea cols="30" rows="14" placeholder="Category Description" id="description"></textarea>
             
            <div class="buttons">
            <button class="btns_task" id="category_save">Save</button>
            <button class="btns_task" id="category_delete">Cancel</button>
            </div>
            
            <div id="error_creating_category"></div>
        </div>
      </div>

    )
}

export default Categories;