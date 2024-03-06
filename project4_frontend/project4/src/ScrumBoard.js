import React from 'react';
import HomePage from './HomePage';
import SideMenu from './components/SideMenu';

function ScrumBoard(){
    return(
        <div>
            <HomePage />
            <SideMenu/>
            

            <div class="filter">
               <div class="searchFields">
               <select id="category">
                   <option value="" disabled selected>Filter by Category</option>
                 
               </select>
               <select id="users">
                   <option value="" disabled selected>Filter by Users</option>
                
               </select>
               <div class="search_icon"> <p class="search-icon">&#128269;</p></div>
               <div class="reset_search_icon"> <p class="reset-filter-icon">&#10006;</p></div>
            </div>
           </div>
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
        </div>

    )
}
    
    export default ScrumBoard;

