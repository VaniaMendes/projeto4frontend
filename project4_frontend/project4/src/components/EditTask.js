import React from 'react';
import { showModalEditTask } from '../stores/boardStore';
import { useState } from 'react';

function EditTask(){
    const { showEditTask, setShowEditTask } = showModalEditTask();

    const [title, setTitle] = useState("");
    const [categoryID, setCategoryID] = useState("");
    const [description, setDescription] = useState("");
    const [endDate, setEndDate] = useState("");
    const [initialDate, setInitialDate] = useState("");
    const [priority, setPriority] = useState("");
    const [categories, setCategories] = useState(null);
    const [priorityColor, setPriorityColor] = useState("");
    const [categoryTitle, setCategoryTitle] = useState("");

    const handleSubmit = async (event) => {
      
      };

      const handleClose = async (event) => {
        event.preventDefault();
        
      };

      const handlePriorityChange = (event) => {
        setPriorityColor(event.target.value);
        setPriority(event.target.value);
      };


    return (
        
<div className = 'modal_container5'>
      {showEditTask && (
          <div className="new-task-container">
              
            <button className="modal_exit" id="cancel" >
              &times;
            </button>
        
            <h2 id="task_creationTitle">Task Edition</h2>

            <label
              htmlFor="opcoes"
              className="descriptioLabelTask"
              id="current-category-label"
            ></label>

            <label htmlFor="opcoes" className="descriptioLabelTask">
              Title:
            </label>
            <input
              type="text"
              placeholder="Task Title"
              id="title"
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              required
            />

            <div>
              <label htmlFor="opcoes" className="descriptioLabelTask">
                Category:
              </label>
              <select
                id="category_element"
                name="opcoes"
                value={categoryID}
                onChange={(event) => {
                  const selectedCategoryID = event.target.value;
                  const selectedCategoryTitle = event.target.selectedOptions[0].text;
                  setCategoryID(selectedCategoryID);
                  setCategoryTitle(selectedCategoryTitle);
                }}

              >
                {categories &&
                  categories.map((category, index) => (
                    <option key={index} value={category.idCategory}>
                      {category.title}
                    </option>
                  ))}
              </select>
            </div>
            <label htmlFor="opcoes" className="descriptioLabelTask">
              Description:
            </label>
            <textarea
              cols="30"
              rows="14"
              placeholder="Task Description"
              id="description-task"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
            ></textarea>

            <div id="date_section">
              <div>
                <p>Initial Date:</p>
                <input
                  type="date"
                  id="initial_date"
                  value={initialDate}
                  onChange={(event) => setInitialDate(event.target.value)}
                />
              </div>
              <div id="end_date">
                <p>End date:</p>
                <input
                  type="date"
                  id="end_dates"
                  value={endDate}
                  onChange={(event) => setEndDate(event.target.value)}
                />
              </div>
            </div>

            <div id="color_section">
              <label id="label_color">Priority:</label>
              <div className="priority_div">
                <input
                  type="radio"
                  name="priority"
                  id="low_priority"
                  selected
                  value="100"
                  onChange={handlePriorityChange}
                  checked={priority === "100"}
                 />
                <label htmlFor="low_priority">Low</label>
              </div>
              <div className="priority_div">
                <input
                  type="radio"
                  name="priority"
                  id="medium_priority"
                  value="200"
                  onChange={handlePriorityChange}
                  checked={priority === "200"}
                />
                <label htmlFor="medium_priority">Medium</label>
              </div>
              <div className="priority_div">
                <input
                  type="radio"
                  name="priority"
                  id="high_priority"
                  value="300"
                  onChange={handlePriorityChange}
                  checked={priority === "300"}
                />
                <label htmlFor="high_priority">High</label>
              </div>
              <div
                id="priority_color"
                style={{
                  backgroundColor:
                    priorityColor === "100"
                      ? "green"
                      : priorityColor === "200"
                      ? "yellow"
                      : priorityColor === "300"
                      ? "red"
                      : "transparent",
                }}
              ></div>
            </div>

            <div className="buttons">
              <button
                className="btns_task"
                id="task_save"
                onClick={handleSubmit}
              >
                Save
              </button>
              <button
                className="btns_task"
                id="task_cancel"
                onClick={handleClose}
              >
                Cancel
              </button>
            </div>

            <div id="error_creating_task"></div>
          </div>
      
      )}
      ;
    </div>
    )
}

export default EditTask;