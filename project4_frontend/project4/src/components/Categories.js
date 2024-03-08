import React from 'react';

function Categories(){


    return(
        <div id="categoryModal" className="modal-category">
        <div id="overlay-modal-category"></div>
        <div className="descricaoCategoria">
            <button className="modal_exit" id="cancel">&times;</button>
            <h2 id="task_creationTitle"></h2>
            <label htmlFor="title">Category Title:</label>
            <input type="text" placeholder="Category Title" id="title" required />
            <label htmlFor="description">Description:</label>
            <textarea cols="30" rows="14" placeholder="Category Description" id="description"></textarea>
                 
            <div className="buttons">
                <button className="btns_task" id="category_save">Save</button>
                <button className="btns_task" id="category_delete">Cancel</button>
            </div>
                
            <div id="error_creating_category"></div>
        </div>
    </div>
    
    )
}

export default Categories;