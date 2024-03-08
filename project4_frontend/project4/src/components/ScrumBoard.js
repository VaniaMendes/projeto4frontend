import React from 'react';
import NewTask from './newTask';


function ScrumBoard(){

    const newTask = async (event) => {
       event.preventDefault();
       <div><NewTask/></div>
      
    }
 
     return(
         <div>
             
             <div className="scrum_section" id="scrum_section">
                       
             <div className="column" id="column1">
                <div className="title">To Do</div>
                <section className="task_list" id="toDo"></section>
                <button id="btn_task" onClick={newTask}>+ New Task</button>
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