import React from 'react';
import { useState } from 'react';

function NewTask() {
    const [title, setTitle] = useState(''); 
        const [category, setCategory] = useState('');
        const [description, setDescription] = useState('');
        const [endDate, setEndDate] = useState('');
        const [initialDate, setInitialDate] = useState('');
        const [priority, setPriority] = useState(''); 

        const [priorityColor, setPriorityColor] = useState('');


    const handleSubmit = async (event) => {
        event.preventDefault();

    }

    const handlePriorityChange = (event) => {
      setPriorityColor(event.target.value);
  };

  return (
    
    <div className="new-task-container">
            <btn className="modal_exit" id="cancel">&times;</btn>
            <h2 id="task_creationTitle"></h2>
            
            <label for = "opcoes" className="descriptioLabelTask" id="current-category-label"></label>
             
            <label for="opcoes" className="descriptioLabelTask">Title:</label>
            <input type="text" placeholder="Task Title" id="title" 
             value={title}onChange={(event) => setTitle(event.target.value)} required />
            
            <div>
               <label for="opcoes" className="descriptioLabelTask">Category:</label>
               <select id="category_element" name="opcoes">
                  
               </select>
           </div>
           <label for="opcoes" className="descriptioLabelTask">Description:</label>
            <textarea cols="30" rows="14" placeholder="Task Description" id="description-task"></textarea>

            <div id="date_section">
               <div>
                  <p>Initial Date:</p>
                  <input type="date" id="initial_date" value={initialDate}onChange={(event) => setInitialDate(event.target.value)}/>
               </div>
               <div id="end_date">
                  <p>End date:</p>
                  <input type="date" id="end_dates" value={endDate}onChange={(event) => setEndDate(event.target.value)}/>
               </div>
            </div>

            <div id="color_section">
               <label id="label_color">Priority:</label>
               <div className="priority_div">
                  <input type="radio" name="priority" id="low_priority" value="100" onChange={handlePriorityChange} checked={priority === "100"} />
                  <label for="low_priority">Low</label>
               </div>
               <div className="priority_div">
                  <input type="radio" name="priority" id="medium_priority" value="200" onChange={handlePriorityChange}  checked={priority === "200"} />
                  <label for="medium_priority">Medium</label>
               </div>
               <div className="priority_div">
                  <input type="radio" name="priority" id="high_priority" value="300" onChange={handlePriorityChange} checked={priority === "300"}/>
                  <label for="high_priority">High</label>
               </div>
               <div id="priority_color" style={{ backgroundColor: priorityColor === "100" ? "green" : priorityColor === "200" ? "yellow" : priorityColor === "300" ? "red" : "green" }}></div>

            </div>

            <div className="buttons">
               <button className="btns_task" id="task_save" onClick={handleSubmit}>Save</button>
               <button className="btns_task" id="task_cancel">Cancel</button>
            </div>

            <div id="error_creating_task"></div>
         </div>
      
  );
}

export default NewTask;