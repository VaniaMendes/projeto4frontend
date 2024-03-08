import React from 'react';
import NewTask from './newTask';
import {useState} from 'react'


function ScrumBoard(){

   const [showNewTask, setShowNewTask] = useState(false);

   const handleNewTaskClick = () => {
       setShowNewTask(true);
      
    }
 
     return(
         <div>
             
             <div className="scrum_section" id="scrum_section">
                       
             <div className="column" id="column1">
                <div className="title">To Do</div>
                <section className="task_list" id="toDo"></section>
                <button id="btn_task" onClick={handleNewTaskClick}>+ New Task</button>
                    {showNewTask && <NewTask />}
             </div>
             <div className="column" id="column2">
                <div className="title">Doing</div>
                <section className="task_list" id="doing"></section>
             </div>
             <div className="column" id="column3">
                <div className="title">Done</div>
                <section className="task_list" id="done"></section>
             </div>
          </div>
          </div>
 
     )
 }

 export default ScrumBoard;