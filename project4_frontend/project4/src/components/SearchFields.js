 import React from "react"
 
function SearchFields(){ 
    return (
 
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

           )
}

export default SearchFields;