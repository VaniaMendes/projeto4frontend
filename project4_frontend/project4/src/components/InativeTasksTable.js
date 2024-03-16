import React, {useState} from 'react';
import {getAllInactiveTasks} from '../endpoints/tasks';
import {userStore} from '../stores/UserStore';
import {  useEffect } from 'react';
import '../format/tables.css';
import { IoFilter } from "react-icons/io5";
import { MdDeleteForever } from "react-icons/md";
import { GoTasklist } from "react-icons/go";


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
  
  
      async function handleDeleteForever(tokenUser, username) {

      };

 
  return (

    <div className='table_container'>
    <table className="users_table">
   
    <thead >
        <tr >
        <th className='titleUser'><GoTasklist className='task_icon'/></th>
        <th className='titleUser1'>Deleted Tasks</th>
        <th className='titleUser'></th>
        <th className = 'titleUser'></th>
        <th className = 'titleUser'></th>
        <th className = 'titleUser'></th>
        <th className = 'titleUser'>
          

            <button className="search_icon"></button>
            </th>
            </tr>
       
            <tr>
                <th className='image'>Author</th>
                <th >Title</th>
                <th >Description</th>
                <th >Initial Date</th>
                <th >Final Date</th>
                <th>Priority</th>
                <th></th>

            </tr>
        </thead>
        <tbody className = 'body'>
            {tasks && tasks.map((task, index) => (
                <tr key={index}>
                    <td ><img className='imagem_user' src={task.author.imgURL} alt='user.png' /></td>
                    <td>{task.title}</td>
                    <td>{task.description}</td>
                    <td>{task.initialDate}</td>
                    <td>{task.endDate}
                    </td>
                    <td>{task.priority}</td>
                    <td>
                        
                        <button className='delete_button' onClick={() => handleDeleteForever(tokenUser, task.id)}><MdDeleteForever /></button>
                       
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
    </div>

  )
};
export default InativeTasksTable;