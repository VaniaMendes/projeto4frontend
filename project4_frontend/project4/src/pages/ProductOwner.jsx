
import MainPage from '../components/MainPage';
import { useState } from 'react';
import SideMenu from '../components/SideMenu';
import MenuProduct_Owner from '../components/menuProduct_Owner';


function Users(){

    return(
        <div>
            <MainPage />
            <SideMenu/>
            <MenuProduct_Owner />
        </div>

    )
}

export default Users;