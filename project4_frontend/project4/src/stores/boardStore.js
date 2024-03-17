import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';


//controla o aparecimento das tabelas na pagina do scrum master
export const tables = create((set) => ({
    showUserTable: true,
    showCategoriesTable: false,
    showInactiveUsersTable: false,
    showInativeTasksTable:false,
    setShowUserTable: (value) => set({ showUserTable: value }),
    setShowCategoriesTable: (value) => set({ showCategoriesTable: value }),
    setShowInactiveUsersTable: (value) => set({ showInactiveUsersTable: value }),
    setInativeTasksTable: (value) => set({ showInativeTasksTable: value}),
}));

//Controla o aparecimento dos modals
export const showModal = create((set) => ({
    showModalNewCategory: false,
    setShowModalNewCategory: (value) => set({ showModalNewCategory: value }),
    showEditCategory: false,
    setShowEditCategory: (value) => set({ showEditCategory: value }),
    showNewUserModal: false, 
    setShowNewUserModal: (value) => set({ showNewUserModal: value }), 
  }));

  export const editProfileByPO = create((set) => ({
    showEditProfilePO: false,
    setShowEditProfilePO: (value) => set({ showEditProfile: value }),
  }));


  