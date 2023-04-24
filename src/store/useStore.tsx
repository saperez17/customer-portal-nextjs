/* eslint-disable no-param-reassign */
import { produce } from 'immer';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { AuthEnumType } from './model/Auth';

export const useStore = create(
  persist(
    (set, _get) => ({
      auth: {
        type: AuthEnumType.login,
        isLoggedIn: false,
      },
      setAuth: (authType: AuthEnumType) =>
        set(
          produce((state: any) => {
            state.auth.type = authType;
          })
        ),
      setLoginStatus: (status: boolean) =>
        set(
          produce((state: any) => {
            state.auth.isLoggedIn = status;
          })
        ),
    }),
    {
      name: 'zustand-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
