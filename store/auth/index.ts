import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { AuthStore } from '~/types/auth/auth-store';

const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      data: null,
      token: null,
      status: 'unauthenticated',
      setData: (data: AuthStore['data']) => set({ data }),
      setToken: (token: AuthStore['token']) => set({ token }),
      setStatus: (status: AuthStore['status']) => set({ status }),
      resetStore: () => set({ data: null, token: null, status: 'unauthenticated' }),
    }),
    {
      name: 'auth-store',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useAuthStore;
