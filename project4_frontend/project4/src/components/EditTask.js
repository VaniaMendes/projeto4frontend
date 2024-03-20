import React from "react";
import { showModalEditTask } from "../stores/boardStore";
import { useState, useEffect } from "react";
import { getTask, updateTask } from "../endpoints/tasks";
import { userStore } from "../stores/UserStore";
import { getAllCategories } from "../endpoints/categories";
import { NotificationManager } from "react-notifications";

function EditTask() {
  const tokenObject = userStore((state) => state.token);
  const tokenUser = tokenObject.token;

  const { showEditTask, setShowEditTask } = showModalEditTask();
  const taskIdForEdit = userStore((state) => state.taskIdForEdit);

  const [title, setTitle] = useState("");
  const [idCategory, setidCategory] = useState("");
  const [description, setDescription] = useState("");
  const [endDate, setEndDate] = useState("");
  const [initialDate, setInitialDate] = useState("");
  const [priority, setPriority] = useState("");
  const [categories, setCategories] = useState(null);
  const [priorityColor, setPriorityColor] = useState("");
  const [categoryTitle, setCategoryTitle] = useState("");


  //Atributos para guardar os valores alterados
  const [newTitle, setNewTitle] = useState("");
  const [newidCategory, setNewidCategory] = useState("");
  const [newdescription, setNewdescription] = useState("");
  const [newendDate, setNewEndDate] = useState("");
  const [newinitialDate, setNewInitialDate] = useState("");
  const [newpriority, setNewPriority] = useState("");


  const [task, setTask] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getTask(tokenUser, taskIdForEdit);
      setTask(result);
      console.log(result);

      const categories = await getAllCategories(tokenUser);
      setCategories(categories);

      setTitle(result.title);
      setidCategory(result.category.idCategory);
      setCategoryTitle(result.category.title);
      setDescription(result.description);
      setEndDate(result.endDate);
      setInitialDate(result.initialDate);
      setPriority(result.priority);
      switch (result.priority) {
        case "100":
          setPriorityColor("green");
          break;
        case "200":
          setPriorityColor("yellow");
          break;
        case "300":
          setPriorityColor("red");
          break;
        default:
          setPriorityColor("transparent");
      }
    };
    fetchData();
  }, [tokenUser]);

  const handleSubmit = async (tokenUser, taskIdForEdit, idCategory) => {
    const updatedTask = {
      id: taskIdForEdit,
      title: newTitle,
      category: {
        idCategory: newidCategory
     
      },
      description: newdescription,
      endDate: newendDate,
      initialDate: newinitialDate,
      priority: newpriority
    };

    const result =  await updateTask(updatedTask, tokenUser, taskIdForEdit, idCategory)
    console.log(result);
    if(result === true){
      NotificationManager.success("Task updated successfully", "", 1000);
      
      }else{
        NotificationManager.warning("Error updating task", "", 1000);}
    
  };



  async function handleClose(event) {
    event.preventDefault();
    setShowEditTask(false);
  }

  const handlePriorityChange = (event) => {
    setPriorityColor(event.target.value);
    setPriority(event.target.value);
  };
  return (
    <div className="modal_container5">
      {showEditTask && (
        <div className="new-task-container">
          <button className="modal_exit" id="cancel" onClick={handleClose}>
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
            placeholder={title}
            id="title"
            value={newTitle}
            onChange={(event) => setNewTitle(event.target.value)}
            required
          />

          <div>
            <label htmlFor="opcoes" className="descriptioLabelTask">
              Category:
            </label>
            <select
              id="category_element"
              name="opcoes"
              value={newidCategory}
              onChange={(event) => {
                const selectedidCategory = event.target.value;
                const selectedCategoryTitle =
                  event.target.selectedOptions[0].text;
                setNewidCategory(selectedidCategory);
                setCategoryTitle(selectedCategoryTitle);
              }}
            >
              <option>
              {categoryTitle} 
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
            placeholder={description}
            id="description-task"
            value={newdescription}
            onChange={(event) => setNewdescription(event.target.value)}
          ></textarea>

          <div id="date_section">
            <div>
              <p>Initial Date:</p>
              <input
                type="date"
                id="initial_date"
                        
                     value={initialDate}
                onChange={(event) => setNewInitialDate(event.target.value)}
              />
            </div>
            <div id="end_date">
              <p>End date:</p>
              <input
                type="date"
                id="end_dates"
               
                value={endDate}
                onChange={(event) => setNewEndDate(event.target.value)}
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
                checked={newpriority === "100"}
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
                checked={newpriority === "200"}
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
                checked={newpriority === "300"}
              />
              <label htmlFor="high_priority">High</label>
            </div>
            <div
              id="priority_color"
              style={{
                backgroundColor:
                  priority === "100"
                    ? "green"
                    : priority === "200"
                    ? "yellow"
                    : priority === "300"
                    ? "red"
                    : "transparent",
              }}
            ></div>
          </div>

          <div className="buttons">
            <button className="btns_task" id="task_save" onClick={ () =>handleSubmit(tokenUser, task.id, idCategory)}>
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
  );
}

export default EditTask;
