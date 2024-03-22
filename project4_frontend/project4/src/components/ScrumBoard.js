import React from 'react';
import TaskBoard from './TaskBoard';
import {useState, useEffect} from 'react'
import '../format/ScrumBoard.css';
import {getActiveTasks} from '../endpoints/tasks';
import { userStore } from "../stores/UserStore";
import { MdModeEditOutline } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { softDeleteTask} from '../endpoints/tasks';
import {NotificationManager } from "react-notifications";
import {showModalNewTask, showModal, modeEditTask, showMyTasks} from '../stores/boardStore';
import {updateTaskState} from '../endpoints/tasks';
import {useLocation} from 'react-router-dom';


function ScrumBoard(){

   const tokenObject = userStore((state) => state.token);
   const tokenUser = tokenObject.token;
      
   const {showNewTask,  setShowNewTask } = showModalNewTask();

   const filteredTasks = userStore((state) => state.filteredTasks);
   const myTasks= null;
   console.log(myTasks);

   const {filterOn} = showModal();
   const {showUserTasks} = showMyTasks();
   
   const [listTasks, setListTasks] = useState([]);
   const [taskId, setTaskId] = useState(null);

   const {editTask, setEditTask} = modeEditTask();


   //Path------------
   const location = useLocation();
   const {pathName} = location;

   const handleNewTaskClick = () => {
    setShowNewTask(true);
   }

   const handleEdit = (taskId) => {
    setShowNewTask(true);
    userStore.getState().setTaskIdForEdit(taskId);
    setEditTask(true);
  
   };

   useEffect(() => {
       const fetchData = async () => {
        if(filterOn && filteredTasks.length > 0){
        setListTasks(filteredTasks);
        }else if(showUserTasks && myTasks.length > 0){
          console.log(myTasks);
           setListTasks(myTasks);
        }else{
          const tasks = await getActiveTasks(tokenUser);
           setListTasks(tasks);
        }
                        
       };

       fetchData();
   }, [tokenUser, filterOn, filteredTasks, showNewTask]);

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



const handleDragStart = (event, taskId) => {
  event.dataTransfer.setData("taskId", taskId);
  setTaskId(taskId);

};

const handleDrop = async (event, tokenUser, taskId, newState) => {
  event.preventDefault();


  try {
    // Atualiza o estado da tarefa no servidor
    await updateTaskState(tokenUser, taskId, newState);
    
    // Atualiza o estado local das tarefas após a mudança
    const updatedTasks = listTasks.map(task => {
      if (task.id === taskId) {
        return { ...task, state: newState };
      }
      return task;
    });
    setListTasks(updatedTasks);

  } catch (error) {
    console.error("Failed to update task state:", error);
  }
 
};

const allowDrop = (event) => {
  event.preventDefault();
};

   
     return(
      <div>
       
      <div className="scrum_section" id="scrum_section">
        <div className="column" id="column1" >
          <div className="title">To Do</div>
          <section className="task_list" id="toDo" onDrop={(event) => handleDrop(event, tokenUser, taskId, "toDo")} onDragOver={allowDrop}>
          {todoList.map((task) => (
            <div className='task' key={task.id} draggable  onDragStart={(event) => handleDragStart(event, task.id)}>
              <div className="priority-bar" style={{ backgroundColor: getColorForPriority(task.priority) }}></div>
              <div className ="task-header">
              <div className="task-title">{task.title}</div>
              <div className="task-author">{task.author.username}</div>
              <div className="task-category">{task.category.title}</div>
              
              </div>
              <div className = "task-details">
              <div className='buttons_scrum'>
                <button className='delete_btnS' onClick={() => handleEdit(task.id)}><MdModeEditOutline/></button>
                <button className='task_btnS' onClick={() => handleDeleteTask(tokenUser, task.id)}><MdDelete/></button>
              </div>
              </div>
              
            </div>
          ))}
          </section>
          <button id="btn_task" onClick={handleNewTaskClick}>+ New Task</button>
          {showNewTask && <TaskBoard />}
        </div>
        <div className="column" id="column2" onDrop={(event) => handleDrop(event, tokenUser, taskId, "doing")} onDragOver={allowDrop}>
          <div className="title">Doing</div>
          <section className="task_list" id="doing">
          {doingList.map((task) => (
              <div className='task' key={task.id} draggable onDragStart={(event) => handleDragStart(event, task.id)}>
                  <div className="priority-bar" style={{ backgroundColor: getColorForPriority(task.priority) }}></div>
              <div className ="task-header">
              <div className="task-title">{task.title}</div>
              <div className="task-author">{task.author.username}</div>
              <div className="task-category">{task.category.title}</div>
              
              </div>
              <div className = "task-details">
              <div className='buttons_scrum'>
                <button className='delete_btnS' onClick={() => handleEdit(task.id)} ><MdModeEditOutline/></button>
                <button className='task_btnS' onClick={() => handleDeleteTask(tokenUser, task.id)}><MdDelete/></button>
              </div>
              </div>
              </div>
            ))}
           
          </section>
        </div>
        <div className="column" id="column3" onDrop={(event) => handleDrop(event, tokenUser, taskId, "done")} onDragOver={allowDrop}>
          <div className="title">Done</div>
          <section className="task_list" id="done">
          {doneList.map((task) => (
              <div className='task' key={task.id} draggable onDragStart={(event) => handleDragStart(event, task.id)}>
                  <div className="priority-bar" style={{ backgroundColor: getColorForPriority(task.priority) }}></div>
              <div className ="task-header">
              <div className="task-title">{task.title}</div>
              <div className="task-author">{task.author.username}</div>
              <div className="task-category">{task.category.title}</div>
              
              </div>
              {(pathName === '/principalPage') && (
              <div className = "task-details">
            
              <div className='buttons_scrum'>
                <button className='delete_btnS' onClick={() => handleEdit(task.id)}><MdModeEditOutline/></button>
                <button className='task_btnS' onClick={() => handleDeleteTask(tokenUser, task.id)}><MdDelete/></button>
              </div>
              </div>
              )} 
              </div>
            ))}
          
          </section>
        </div>
      </div>
  
    </div>
 
     )
 }

 export default ScrumBoard;