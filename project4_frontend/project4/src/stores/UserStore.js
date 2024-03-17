import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const userStore = create(
    persist(
        (set) => ({
            token: "", 
            setToken: (token) => set({ token }), 
            getToken: () => userStore.getState().token,



            role: "",
            setRole: (role) => set({ role }), // Adicionando setRole para atualizar o estado do role
            getRole: () => userStore.getState().role,


            categoryId:"",
            setCategoryId: (categoryId) => set({ categoryId }), // Adicionando setRole para atualizar o estado do role
            getCategoryId: () => userStore.getState().categoryId,

        }),
        {
            name: 'mystore',
            storage: createJSONStorage(() => sessionStorage)
        }
    )
);



