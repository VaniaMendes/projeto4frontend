 import React, { useEffect, useState } from "react"
 import { getAllCategories } from "../endpoints/categories";
 import { getActiveUsers } from "../endpoints/users";
 import { userStore } from "../stores/UserStore";
 import {getFilteredTasks} from '../endpoints/tasks';
 import { NotificationManager } from "react-notifications";
 import {showModal} from '../stores/boardStore';
 import { LuSearchCheck } from "react-icons/lu";
 import { MdOutlineCleaningServices } from "react-icons/md";
 
function SearchFields(){ 

    const tokenObject = userStore((state) => state.token);
    const tokenUser = tokenObject.token;
    const [categories, setCategories] = useState([]);
    const [users, setUsers] = useState([]);
    
    
    const [selectedUsername, setSelectedUsername] = useState("");
    const [selectedCategoryId, setSelectedCategoryId] = useState("");

    const {setFilterOn} = showModal();



useEffect(() => {
    const fetchData = async()=> {
        const categories = await getAllCategories(tokenUser);
        setCategories(categories);
        const users = await getActiveUsers(tokenUser);
        setUsers(users);
 
    };
    fetchData();
},[]);


const handleUserChange = (event) => {
    setSelectedUsername(event.target.value);
};

const handleCategoryChange = (event) => {
    setSelectedCategoryId(event.target.value);
};


const handleFilter = async (tokenUser, selectedUsername, selectedCategoryId) => {
    const result = await getFilteredTasks(tokenUser, selectedUsername, selectedCategoryId);

    if(result !== null){
        userStore.getState().setFilteredTasks(result);//Guarda a lista filtrada no userStore
        setFilterOn(true);

    }else{
        NotificationManager.warning("No tasks found", "", 800);
    }
    

}

const handleResetFilter = () => {
    setSelectedUsername("");
    setSelectedCategoryId("");
    document.getElementById("category").value = "";
    document.getElementById("users").value = "";
    userStore.getState().setFilteredTasks(null);//Limpa a lista filtrada no userStore
    setFilterOn(false);
}


return (
 
 <div className="filter">
               <div className="searchFields">
               <select id="category"  defaultValue="" onChange={handleCategoryChange}>
               <option value="" disabled>Filter by Category</option>
                    {categories.map((category, index) => (
                        <option key={index} value={category.idCategory}>{category.title}</option>
                    ))}
                   
               </select>
               <select id="users" defaultValue="" onChange={handleUserChange}>
               <option value="" disabled>Filter by Users</option>
                    {users.map((user, index) => (
                        <option key={index} value={user.username}>{user.firstName}</option>
                    ))}
               
               </select>
               <div className="search_icon"> <p className="search-icon" onClick={() => handleFilter(tokenUser, selectedUsername, selectedCategoryId)}><LuSearchCheck className='icon-search'/></p></div>
               <div className="reset_search_icon"> <p className="reset-filter-icon" onClick={ handleResetFilter}><MdOutlineCleaningServices className='icon-search'/></p></div>
            </div>
           </div>

           )
}

export default SearchFields;
