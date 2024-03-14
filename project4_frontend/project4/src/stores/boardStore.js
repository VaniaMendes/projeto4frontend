import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

export const boardStore = create(
    persist(
        (set) => ({
            

            listTasks: null,
            setListTasks: (listTasks) => set({ listTasks }),
            getListTasks: () => boardStore.getState().listTasks,


        }),
        {
            name: 'mystore',
            storage: createJSONStorage(() => sessionStorage)
        }
    )
);
