
import MainPage from '../components/MainPage';
import MenuProductOwner from '../components/MenuProductOwner';
import SideMenu from '../components/SideMenu';
import UserTable from '../components/UserTable';
import CategoriesTable from '../components/CategoriesTable';
import InactiveUsersTable from '../components/InativeUsersTable';
import {useState} from 'react'
import {tables} from '../stores/boardStore';


function ProductOwner(){
  const { showUserTable, showCategoriesTable, showInactiveUsersTable } = tables();
  
    return (
      <div>
        {showUserTable && <UserTable />}
        {showCategoriesTable && <CategoriesTable />}
        {showInactiveUsersTable && <InactiveUsersTable />}
        <MainPage/>
        <SideMenu/>
        <MenuProductOwner/>
      </div>
    );
  }

export default ProductOwner;