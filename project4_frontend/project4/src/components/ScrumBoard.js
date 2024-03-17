import React from 'react';
import NewTask from './newTask';
import {useState, useEffect} from 'react'
import '../format/ScrumBoard.css';
import {getActiveTasks} from '../endpoints/tasks';
import { userStore } from "../stores/UserStore";
import { MdModeEditOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { softDeleteTask} from '../endpoints/tasks';
import {NotificationManager } from "react-notifications";
import {showModalNewTask, updateTasksList} from '../stores/boardStore';



function ScrumBoard(){

   const tokenObject = userStore((state) => state.token);
   const tokenUser = tokenObject.token;
      
   const {showNewTask,  setShowNewTask } = showModalNewTask();
   const {updateTasks} = updateTasksList();
 
   const [listTasks, setListTasks] = useState([]);

   const handleNewTaskClick = () => {
    setShowNewTask(true);
   }

   useEffect(() => {
       const fetchData = async () => {
           const tasks = await getActiveTasks(tokenUser);
           setListTasks(tasks);
                  
       };

       fetchData();
   }, [tokenUser, updateTasks]);



function getColorForPriority(priority) {
  if (priority === 100) {
    return 'green';
  } else if (priority === 200) {
    return 'yellow'; 
  } else if (priority === 300) {
    return 'red'; 
  } else {
    return 'grey'; 
  }
}

const handleDeleteTask = async (tokenUser, taskId) => {
  try {
      const result = await softDeleteTask(tokenUser, taskId);
      console.log(result);
      if(result===200){
      NotificationManager.success("Task deleted successfully", "", 800);
      const updatedTasks = listTasks.filter((task) => task.id !== taskId);
        setListTasks(updatedTasks);
      
      }else{
        NotificationManager.warning("Error deleting task " + taskId.title);
      }
  } catch (error) {
      console.error('Erro ao excluir a tarefa:', error);
  }
  
};

// Função para ordenar as tarefas
const sortTasks = (tasks) => {
  return tasks.sort((b, a) => {
    // Ordenar por prioridade
    if (a.priority !== b.priority) {
      return a.priority - b.priority;
    }
    // Ordenar por data inicial
    if (a.initialDate !== b.initialDate) {
      return new Date(a.initialDate) - new Date(b.initialDate);
    }
    // Ordenar por data final
    return new Date(a.endDate) - new Date(b.endDate);
  });
};
      
const todoList = sortTasks(listTasks.filter(tasks => tasks.state ==='toDo'));
const doingList = sortTasks(listTasks.filter(tasks => tasks.state ==='doing'));
const doneList = sortTasks(listTasks.filter(tasks => tasks.state ==='done'));
   
     return(
      <div>
      <div className="scrum_section" id="scrum_section">
        <div className="column" id="column1">
          <div className="title">To Do</div>
          <section className="task_list" id="toDo">
          {todoList.map((task) => (
            <div className='task' key={task.id}>
              <div className="priority-bar" style={{ backgroundColor: getColorForPriority(task.priority) }}></div>
              <div className ="task-header">
              <div className="task-title">{task.title}</div>
              <div className="task-author">{task.author.username}</div>
              <div className="task-category">{task.category.title}</div>
              
              </div>
              <div className = "task-details">
              <div className='buttons_scrum'>
                <button className='delete_btnS' ><MdModeEditOutline/></button>
                <button className='task_btnS' onClick={() => handleDeleteTask(tokenUser, task.id)}><MdDelete/></button>
              </div>
              </div>
              
            </div>
          ))}
          </section>
          <button id="btn_task" onClick={handleNewTaskClick}>+ New Task</button>
          {showNewTask && <NewTask />}
        </div>
        <div className="column" id="column2">
          <div className="title">Doing</div>
          <section className="task_list" id="doing">
          {doingList.map((task) => (
              <div className='task' key={task.id}>{task.title}</div>
            ))}
           
          </section>
        </div>
        <div className="column" id="column3">
          <div className="title">Done</div>
          <section className="task_list" id="done">
          {doneList.map((task) => (
              <div className='task' key={task.id}>{task.title}</div>
            ))}
          
          </section>
        </div>
      </div>
    </div>
 
     )
 }

 export default ScrumBoard;