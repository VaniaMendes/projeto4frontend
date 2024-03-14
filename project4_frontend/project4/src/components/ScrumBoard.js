import React from 'react';
import NewTask from './newTask';
import {useState, useEffect} from 'react'
import '../format/ScrumBoard.css';
import {getActiveTasks} from '../endpoints/tasks';
import { userStore } from "../stores/UserStore";
import { boardStore } from '../stores/boardStore';


function ScrumBoard(){

   const tokenObject = userStore((state) => state.token);
   const tokenUser = tokenObject.token;

 
   const [showNewTask, setShowNewTask] = useState(false);

   const handleNewTaskClick = () => {
       setShowNewTask(true);
   }

       useEffect(() => {
         const fetchData = async()=> {
             const tasks = await getActiveTasks(tokenUser);
             boardStore.getState().setListTasks(tasks); 
      
         };
          fetchData();
         }, [tokenUser]);

      const listTasks = boardStore.getState().listTasks || [];


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
            {task.title}
            <div className='buttons'>        
              <button className='delete_btn'>&#128465;</button>
              <button className='task_btn'>&#9998;</button>
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