import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const userStore = create(
    persist(
        (set) => ({
            token: "", 
            setToken: (token) => set({ token }), 
            getToken: () => userStore.getState().token,
        }),
        {
            name: 'mystore',
            storage: createJSONStorage(() => sessionStorage)
        }
    )
);

export const saveIdCategoryForEdit = create((set) => ({
    categoryId: "",
    updateIDCategory: (newCategoryId) => set({ categoryId: newCategoryId }),
}));