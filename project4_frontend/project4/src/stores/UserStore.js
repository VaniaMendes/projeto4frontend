import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const userStore = create(
    persist(
        (set) => ({
            token: "", 
            setToken: (token) => set({ token }), 
            getToken: () => userStore.getState().token,

            user:"",
            setUser: (user) => set({ user }), 
            getUser: () => userStore.getState().user,

        }),
        {
            name: 'mystore',
            storage: createJSONStorage(() => sessionStorage)
        }
    )
);
