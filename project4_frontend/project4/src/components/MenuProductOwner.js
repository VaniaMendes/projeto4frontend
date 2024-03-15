
import {useState} from 'react';
import { FaUsers } from "react-icons/fa6";
import { MdTask } from "react-icons/md";
import { BiSolidCategoryAlt } from "react-icons/bi";
import userStore from '../stores/UserStore';
import React, { useEffect } from "react";
import { FaUserCheck } from "react-icons/fa";
import { FaUserAltSlash } from "react-icons/fa";
import { useNavigate  } from 'react-router-dom';
import {tables} from '../stores/boardStore';

function MenuProductOwner(){
   
   const navigate = useNavigate();
    const [showButtons, setShowButtons] = useState(false);
    const seeButtons = () => {
        navigate('/productOwner');
        setShowButtons(!showButtons);
    };

    const { setShowUserTable, setShowCategoriesTable, setShowInactiveUsersTable } = tables();

    const handleShowUserTable = () => {
       setShowUserTable(true);
       setShowCategoriesTable(false);
       setShowInactiveUsersTable(false);
    }
  

    const handleShowCategoriesTable = () => {
        setShowCategoriesTable(true);
        setShowInactiveUsersTable(false);
        setShowUserTable(false);
      

    };

    const handleInativeUsers = () => {
        setShowInactiveUsersTable(true);
        setShowUserTable(false);
        setShowCategoriesTable(false);
    
    }

   
return(

    <div id="menuPO">

    <div className='menuPO'>
        
    <ul>
        <li onClick={seeButtons}> <FaUsers/> Users</li>
        {showButtons && (
                    <ul>
                        <li id='active' onClick={handleShowUserTable}><FaUserCheck className='icon'/>Active Users</li>
                        <li id='active' onClick={handleInativeUsers}><FaUserAltSlash className='icon'/>Inactive Users</li>
                    </ul>
                )}
        <li> <MdTask/> Inactive Tasks</li>
        <li onClick={handleShowCategoriesTable}><BiSolidCategoryAlt/> Categories</li>
    </ul>
</div>
</div>
)

}

export default MenuProductOwner;