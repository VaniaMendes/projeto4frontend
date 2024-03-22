import React from "react";
import { useState, useEffect } from "react";
import { userStore } from "../stores/UserStore";
import { getAllCategories } from "../endpoints/categories";
import {addTask, getTask, updateTask} from '../endpoints/tasks';
import { NotificationManager } from "react-notifications";
import '../format/tables.css'
import {showModalNewTask, updateTasksList, modeEditTask} from '../stores/boardStore'

function NewTask() {

  //Vai buscar o valor do token ao store
  const tokenObject = userStore((state) => state.token);
  const tokenUser = tokenObject.token;

  //Controla a visibilidade do modal
  const {showNewTask,  setShowNewTask } = showModalNewTask();
  const {updateTasks, setUpdateTasks} = updateTasksList();

  //Controla o estado do modo de edit
  const {editTask, setEditTask} = modeEditTask();

//Vai buscar o id da task para atualizar
  const taskIdForEdit = userStore((state) => state.taskIdForEdit);

  //Guarda os dados da task para editar
  const [tasktoEdit, setTakstoEdit] = useState("");

  
  const [title, setTitle] = useState("");

  const [description, setDescription] = useState("");
  const [endDate, setEndDate] = useState("");
  const [initialDate, setInitialDate] = useState("");
  const [priority, setPriority] = useState("");
  const [categories, setCategories] = useState(null);
  const [priorityColor, setPriorityColor] = useState("");
  const [categoryTitle, setCategoryTitle] = useState("");
  const [idCategory, setIdCategory] = useState("");


  useEffect(() => {
    const fetchData = async () => {
      const categoriesData = await getAllCategories(tokenUser);
      setCategories(categoriesData);

      if (editTask && taskIdForEdit) {
        const result = await getTask(tokenUser, taskIdForEdit);
        setTakstoEdit(result);
        setTitle(result.title);
        setIdCategory(result.category.idCategory);
        setCategoryTitle(result.category.title);
        setDescription(result.description);
        setEndDate(result.endDate);
        setInitialDate(result.initialDate);
        setPriority(result.priority);

      }
    };  
    fetchData();
  }, [tokenUser]);

  const task={
    title: title,
    description: description,
    initialDate: initialDate,
    endDate: endDate,
    category:{title: categoryTitle},
    priority: priority
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    if(editTask && taskIdForEdit){

      const result =  await updateTask(task, tokenUser, taskIdForEdit, idCategory)
    console.log(result);
    if(result === true){
      NotificationManager.success("Task updated successfully", "", 1000);
      setShowNewTask(false);

      
      }else{
        NotificationManager.warning(result, "", 1000);}

    }else{

    const result = await addTask(tokenUser, idCategory, task);
  
    if(result===200){
      NotificationManager.success("Task added successfully", "", 800);
      setShowNewTask(false);
      setUpdateTasks(!updateTasks);

    }else{
    NotificationManager.warning(result, "", 800);
   }
  }

  };


  const handleClose = async (event) => {
    event.preventDefault();
    setShowNewTask(false);
    setEditTask(false);
  };

  const handlePriorityChange = (event) => {
    setPriorityColor(event.target.value);
    setPriority(event.target.value);
  };

  return (
    <div className = 'modal_container4'>
      {showNewTask && (
          <div className="new-task-container">
              
            <button className="modal_exit" id="cancel" onClick={handleClose}>
              &times;
            </button>
        
            <h2 id="task_creationTitle">{editTask? "Task Edition" : "Task Creation" }</h2>

          

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
                value={idCategory}
                placeholder="Select a category"
                onChange={(event) => {
                  const selectedCategoryID = event.target.value;
                  const selectedCategoryTitle = event.target.selectedOptions[0].text;
                  setIdCategory(selectedCategoryID);
                  setCategoryTitle(selectedCategoryTitle);
                }}

              >
                 <option value="" disabled selected>
      Select a category:
    </option>
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
                {editTask? "Update" : "Save" }
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
  );
}

export default NewTask;
