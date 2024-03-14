import React from 'react';
import MainPage from '../components/MainPage';
import SideMenu from '../components/SideMenu';
import CategoriesTable from '../components/CategoriesTable';
import MenuProductOwner from '../components/MenuProductOwner';
import { getAllCategories } from '../endpoints/categories';
import {userStore} from '../stores/UserStore';
import {useEffect, useState} from 'react';
import 'react-toastify/dist/ReactToastify.css';

function CategoriesPage(){
    const tokenObject = userStore(state => state.token);
    const tokenUser = tokenObject.token;
    const [categories, setCategories] = useState(null);

    const forceUpdate = userStore(state => state.forceUpdate)
;
    useEffect(() => {
        const fetchData = async()=> {
                const categories = await getAllCategories(tokenUser);
                setCategories(categories);
                console.log(categories);

         };
         fetchData();
        }, [tokenUser, forceUpdate]);


    return(
        <div>
            <MainPage />
            <SideMenu/>
            <CategoriesTable categories={categories}/>
            <MenuProductOwner/>
        </div>

    )
}

export default CategoriesPage;