

import { FaUsers } from "react-icons/fa6";
import { useNavigate  } from 'react-router-dom';
import {tables} from '../stores/boardStore';
import { MdTask } from "react-icons/md";

function MenuProductOwner(){
   
   const navigate = useNavigate();
  
    const { setShowUserTable, setShowCategoriesTable, setShowInactiveUsersTable, setInativeTasksTable } = tables();


    const handleShowUserTable = () => {
       setShowUserTable(true);
       setShowCategoriesTable(false);
       setShowInactiveUsersTable(false);
       setInativeTasksTable(false);
       navigate('/productOwner');
    }

    const handleInativeTasks = () => {
        setShowInactiveUsersTable(false);
        setShowUserTable(false);
        setShowCategoriesTable(false);
        setInativeTasksTable(true);
        navigate('/productOwner');
    }
  
return(

    <div className="menuPO1">

    <div className='menuPO'>
        <ul>
 
        <li className='item_PO' onClick={handleShowUserTable}> <FaUsers/> Users</li>
        <li className='item_PO' onClick={handleInativeTasks}> <MdTask/> Deleted Tasks</li>
        </ul>
  
</div>
</div>
)

}

export default MenuProductOwner;

