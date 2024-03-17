import React, { useEffect } from "react";
import HomePage from '../components/MainPage';
import SideMenu from '../components/SideMenu';
import SearchFields from '../components/SearchFields';
import ScrumBoard from '../components/ScrumBoard';
import MenuProductOwner from '../components/MenuProductOwner';
import {userStore} from '../stores/UserStore';


function PrincipalPage(){

    const tokenObject = userStore(state => state.token);
    const tokenUser = tokenObject.token;
    const { getRole } = userStore();
    const role = getRole();

    
    
   

    return(
        <div>
            
            {role === 'product_owner' && <MenuProductOwner />}
            <HomePage />
            <SideMenu />
            <SearchFields />
            <ScrumBoard />
        </div>
    );
}
    
    export default PrincipalPage;

