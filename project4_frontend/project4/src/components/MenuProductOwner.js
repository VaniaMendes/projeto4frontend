
import {useState} from 'react';
import { FaUsers } from "react-icons/fa6";
import { MdTask } from "react-icons/md";
import { BiSolidCategoryAlt } from "react-icons/bi";

import { FaUserCheck } from "react-icons/fa";
import { FaUserAltSlash } from "react-icons/fa";
import { useNavigate  } from 'react-router-dom';
import {tables} from '../stores/boardStore';

function MenuProductOwner(){
   
   const navigate = useNavigate();
    const [showButtons, setShowButtons] = useState(false);
    const seeButtons = () => {
        setShowButtons(!showButtons);
    };

    const { setShowUserTable, setShowCategoriesTable, setShowInactiveUsersTable, setInativeTasksTable } = tables();


    const handleShowUserTable = () => {
       setShowUserTable(true);
       setShowCategoriesTable(false);
       setShowInactiveUsersTable(false);
       setInativeTasksTable(false);
       navigate('/productOwner');
    }
  

    const handleShowCategoriesTable = () => {
        setShowCategoriesTable(true);
        setShowInactiveUsersTable(false);
        setShowUserTable(false);
        setInativeTasksTable(false);
        navigate('/productOwner');

    };

    const handleInativeUsers = () => {
        setShowInactiveUsersTable(true);
        setShowUserTable(false);
        setShowCategoriesTable(false);
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
        <li className='item_PO' onClick={seeButtons}> <FaUsers/> Users</li>
        {showButtons && (
                    <ul>
                        <li className='item_PO' id='active' onClick={handleShowUserTable}><FaUserCheck className='icon'/>Active</li>
                        <li className='item_PO' id='active' onClick={handleInativeUsers}><FaUserAltSlash className='icon'/>Inactive</li>
                    </ul>
                )}
        <li  className='item_PO'  onClick={handleInativeTasks}> <MdTask/> Deleted Tasks</li>
        <li  className='item_PO'  onClick={handleShowCategoriesTable}><BiSolidCategoryAlt/> Categories</li>
    </ul>
</div>
</div>
)

}

export default MenuProductOwner;