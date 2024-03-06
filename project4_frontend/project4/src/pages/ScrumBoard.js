import React from 'react';
import HomePage from '../components/MainPage';
import SideMenu from '../components/SideMenu';
import SearchFields from '../components/SearchFields';

function ScrumBoard(){
    return(
        <div>
            <HomePage />
            <SideMenu/>
            <SearchFields/>
            
            <section id="scrum_section">
                      
            <div class="column" id="column1">
               <div class="title">To Do</div>
               <section class="task_list" id="toDo"></section>
               <button id="btn_task">&nbsp;+ New Task</button>
            </div>
            <div class="column" id="column2">
               <div class="title">Doing</div>
               <section class="task_list" id="doing"></section>
            </div>
            <div class="column" id="column3">
               <div class="title">Done</div>
               <section class="task_list" id="done"></section>
            </div>
         </section>
         </div>

    )
}
    
    export default ScrumBoard;

