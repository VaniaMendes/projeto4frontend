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



function ScrumBoard(){

   const tokenObject = userStore((state) => state.token);
   const tokenUser = tokenObject.token;
      
   const [showNewTask, setShowNewTask] = useState(false);
 
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
   }, [tokenUser]);



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
      
      }else{
        NotificationManager.warning("Error deleting task " + taskId.title);
      }
  } catch (error) {
      console.error('Erro ao excluir a tarefa:', error);
  }
  
};
      
      const todoList = listTasks.filter(tasks => tasks.state ==='toDo');
      const doingList = listTasks.filter(tasks => tasks.state ==='doing');
      const doneList = listTasks.filter(tasks => tasks.state ==='done');
   
     return(
      <div>
      <div className="scrum_section" id="scrum_section">
        <div className="column" id="column1">
          <div className="title">To Do</div>
          <section className="task_list" id="toDo">
          {todoList.map((task) => (
            <div className='task' key={task.id}>
              <div className="priority-bar" style={{ backgroundColor: getColorForPriority(task.priority) }}></div>
              <div className="task-title">{task.title}</div>
              <div className="task-author">{task.author.username}</div>
              
              <div className='buttons_scrum'>
                <button className='delete_btnS' ><MdModeEditOutline/></button>
                <button className='task_btnS' onClick={() => handleDeleteTask(tokenUser, task.id)}><MdDelete/></button>
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