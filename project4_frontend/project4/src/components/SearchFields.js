 import React from "react"
 
function SearchFields(){ 
    return (
 
 <div className="filter">
               <div className="searchFields">
               <select id="category"  defaultValue="">
                   <option value="" disabled>Filter by Category</option>
                   
               </select>
               <select id="users" defaultValue="">
                   <option value="" disabled>Filter by Users</option>
               
               </select>
               <div className="search_icon"> <p className="search-icon">&#128269;</p></div>
               <div className="reset_search_icon"> <p className="reset-filter-icon">&#10006;</p></div>
            </div>
           </div>

           )
}

export default SearchFields;