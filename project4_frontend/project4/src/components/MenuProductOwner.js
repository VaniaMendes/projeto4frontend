
import {useState} from 'react';
import { FaUsers } from "react-icons/fa6";
import { MdTask } from "react-icons/md";
import { BiSolidCategoryAlt } from "react-icons/bi";
import {userStore} from '../stores/UserStore';
import React, { useEffect } from "react";
import { FaUserCheck } from "react-icons/fa";
import { FaUserAltSlash } from "react-icons/fa";

function MenuProductOwner(){
   
    const [showButtons, setShowButtons] = useState(false);
    const seeButtons = () => {
        setShowButtons(!showButtons);
    };

    const productOwnerPage = () => {
        window.location.href = './productOwner';
    };

    const inactiveUsers = () => {
        window.location.href = './inactiveUsers';
    };

    const handleCategories = () => {
        window.location.href = './categories';
    };

   
return(

    <div id="menuPO">

    <div className='menuPO'>
        
    <ul>
        <li onClick={seeButtons}> <FaUsers/> Users</li>
        {showButtons && (
                    <ul>
                        <li id='active' onClick={productOwnerPage}><FaUserCheck className='icon'/>Active Users</li>
                        <li id='active' onClick={inactiveUsers}><FaUserAltSlash className='icon'/>Inactive Users</li>
                    </ul>
                )}
        <li> <MdTask/> Inactive Tasks</li>
        <li onClick={handleCategories}><BiSolidCategoryAlt/> Categories</li>
    </ul>
</div>
</div>
)

}

export default MenuProductOwner;