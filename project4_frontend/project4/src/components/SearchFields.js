 import React, { useEffect, useState } from "react"
 import { getAllCategories } from "../endpoints/categories";
 import { getActiveUsers } from "../endpoints/users";
 import { userStore } from "../stores/UserStore";
 import {getFilteredTasks} from '../endpoints/tasks';
 
function SearchFields(){ 

    const tokenObject = userStore((state) => state.token);
   const tokenUser = tokenObject.token;
    const [categories, setCategories] = useState([]);
    const [users, setUsers] = useState([]);
    const [filteredTasks, setFilteredTasks] = useState([]);
    const [selectedUser, setSelectedUser] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");


useEffect(() => {
    const fetchData = async()=> {
        const categories = await getAllCategories(tokenUser);
        setCategories(categories);
        const users = await getActiveUsers(tokenUser);
        setUsers(users);
        
    };
    fetchData();
},[]);


const handleFilter = async (tokenUser, selectedUser, selectedCategory) => {

    const tasks = await getFilteredTasks(tokenUser, selectedUser, selectedCategory);
    setFilteredTasks(tasks);
    console.log(tasks);
}

const handleUserChange = (event) => {
    setSelectedUser(event.target.value);
};

const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
};



    return (
 
 <div className="filter">
               <div className="searchFields">
               <select id="category"  defaultValue="" onChange={handleCategoryChange}>
               <option value="" disabled>Filter by Category</option>
                    {categories.map((category, index) => (
                        <option key={index} value={category.id}>{category.title}</option>
                    ))}
                   
               </select>
               <select id="users" defaultValue="" onChange={handleUserChange}>
               <option value="" disabled>Filter by Users</option>
                    {users.map((user, index) => (
                        <option key={index} value={user.id}>{user.username}</option>
                    ))}
               
               </select>
               <div className="search_icon"> <p className="search-icon" onClick={handleFilter}>&#128269;</p></div>
               <div className="reset_search_icon"> <p className="reset-filter-icon">&#10006;</p></div>
            </div>
           </div>

           )
}

export default SearchFields;