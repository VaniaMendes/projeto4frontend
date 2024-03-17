
import MainPage from '../components/MainPage';
import MenuProductOwner from '../components/MenuProductOwner';
import SideMenu from '../components/SideMenu';
import UserTable from '../components/UserTable';
import CategoriesTable from '../components/CategoriesTable';
import InactiveUsersTable from '../components/InativeUsersTable';
import {tables} from '../stores/boardStore';
import InativeTasksTable from '../components/InativeTasksTable';


function ProductOwner(){
  const { showUserTable, showCategoriesTable, showInactiveUsersTable, showInativeTasksTable } = tables();
  
    return (
      <div>

        {showUserTable && <UserTable />}
        {showCategoriesTable && <CategoriesTable />}
        {showInactiveUsersTable && <InactiveUsersTable />}
        {showInativeTasksTable && <InativeTasksTable />}
        <MainPage/>
        <SideMenu/>
        <MenuProductOwner/>
      </div>
    );
  }

export default ProductOwner;