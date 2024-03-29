import { create } from 'zustand';



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
    showModalEditUser:false,
    setShowModalEditUser:(value) => set({ showModalEditUser: value }),

    filterOn: false,
    setFilterOn: (value) => set({ filterOn: value }),
    
  }));

  

  export const updateCategoriesTable = create((set) => ({
    showCategoriesTable: false,
    setShowCategoriesTable: (value) => set({ showCategoriesTable: value }),
  }));

  export const updateUsersTable = create((set) => ({
    showUsersTable: false,
    setShowUsersTable: (value) => set({ showUsersTable: value }),
  }));

  export const showModalNewTask = create((set) => ({
    showNewTask: false,
    setShowNewTask: (value) => set({ showNewTask: value }),
  }));

  export const updateTasksList = create((set) => ({
    updateTasks: false,
    setUpdateTasks: (value) => set({ updateTasks: value }),
  }));


  export const showModalEditTask = create((set) => ({ 
    showEditTask: false,
    setShowEditTask: (value) => set({ showEditTask: value }),

  }));

  export const modeEditOn = create((set) => ({

    modeEdit: false,
    setModeEdit: (value) => set({ modeEdit: value }),
  }));

  export const modeEditTask = create((set) => ({

    editTask: false,
    setEditTask: (value) => set({ editTask: value }),
  }));

  export const showMyTasks = create((set) => ({

    showUserTasks: false,
    setShowUserTasks: (value) => set({ showUserTasks: value }),
  }));


  export const ViewTaskDetails = create((set) => ({
    showTaskDetails: false,
    setShowTaskDetails: (value) => set({ showTaskDetails: value }),
  }));
