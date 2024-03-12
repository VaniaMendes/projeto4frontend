import React from 'react';
import MainPage from '../components/MainPage';
import SideMenu from '../components/SideMenu';
import CategoriesTable from '../components/CategoriesTable';
import MenuProductOwner from '../components/MenuProductOwner';

function CategoriesPage(){


    return(
        <div>
            <MainPage />
            <SideMenu/>
            <CategoriesTable/>
            <MenuProductOwner/>
        </div>

    )
}

export default CategoriesPage;