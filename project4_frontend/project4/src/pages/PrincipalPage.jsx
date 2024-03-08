import React from 'react';
import HomePage from '../components/MainPage';
import SideMenu from '../components/SideMenu';
import SearchFields from '../components/SearchFields';
import ScrumBoard from '../components/ScrumBoard';



function PrincipalPage(){

    return(
        <div>
            <HomePage />
            <SideMenu/>
            <SearchFields/>
            <ScrumBoard/>
          
            </div>

    )
}
    
    export default PrincipalPage;

