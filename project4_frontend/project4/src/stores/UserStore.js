import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const userStore = create(
    persist(
        (set) => ({
            token: "", 
            setToken: (token) => set({ token }), 
            getToken: () => userStore.getState().token,

            userType: "", 
            setUserType: (userType) => set({ userType }), 
            getUserType: () => userStore.getState().userType,

        }),
        {
            name: 'mystore',
            storage: createJSONStorage(() => sessionStorage)
        }
    )
);
