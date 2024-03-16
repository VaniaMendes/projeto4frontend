import React, {useState} from 'react';
import {getAllInactiveTasks} from '../endpoints/tasks';
import {userStore} from '../stores/UserStore';
import {  useEffect } from 'react';
import '../format/tables.css';
import { IoFilter } from "react-icons/io5";
import { MdDeleteForever } from "react-icons/md";
import { MdTask } from "react-icons/md";
import { FcHighPriority } from "react-icons/fc";
import { FcMediumPriority } from "react-icons/fc";
import { FcLowPriority } from "react-icons/fc";



const InativeTasksTable = () => {

    
    const tokenObject = userStore((state) => state.token);
    const tokenUser = tokenObject.token;
    const [tasks, setTasks] = useState([]);

    const fetchTasks = async () => {
        try {
          const result = await getAllInactiveTasks(tokenUser);
          setTasks(result);
          console.log(result);
        } catch (error) {
          console.error(error);
        }
      };

    useEffect(() => {
        fetchTasks();
      }, []);
  
  
      async function getPriorityColor(priority) {
        let color = ""; 
    
        try {
            if (priority === 100) {
                color = "green";
            } else if (priority === 200) {
                color = "yellow";
            } else if (priority === 300) {
                color = "red";
            }
        } catch (error) {
            console.error("Error getting priority color:", error);
        }
    
        return color;
    }
    

 
  return (

    <div className='table_container'>
            <table className="users_table">
                <thead>
                    <tr>
                        <th className='titleUser'><MdTask className='task_icon' /></th>
                        <th className='titleUser3'>Deleted Tasks</th>
                        <th className='titleUser'></th>
                        <th className='titleUser'></th>
                        <th className='titleUser'></th>
                        <th className='titleUser'></th>
                        <th className='titleUser'>
                            <button className="search_icon"><IoFilter/></button>
                        </th>
                    </tr>
                    <tr>
                       
                        <th>Author</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Initial Date</th>
                        <th>Final Date</th>
                        <th>Priority</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody className='body'>
    {tasks && tasks.map((task, index) => {
                            
        return (
            <tr key={index}>
        
                <td>{task.author.username}</td>
                <td>{task.title}</td>
                <td>{task.description}</td>
                <td>{task.initialDate}</td>
                <td>{task.endDate}</td>
                <td className="colorPriority">
    {task.priority === 100 ? <FcHighPriority /> : task.priority === 200 ? <FcMediumPriority /> : task.priority === 300 ? <FcLowPriority /> : ""}
</td>
                <td>
                    <button className='delete_button'></button>
                </td>
            </tr>
        );
    })}
</tbody>

            </table>
        </div>
    );
};
export default InativeTasksTable;