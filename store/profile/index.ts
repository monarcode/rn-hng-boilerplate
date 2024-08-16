import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { ProfileData, ProfileStore } from '~/types/profile/profile';

const useProfileStore = create<ProfileStore>()(
  persist(
    (set) => ({
      data: null,
      setData: (data: ProfileData) => set({ data }),
      updateProfile: (newData: Partial<ProfileData>) =>
        set((state) => ({
          data: state.data ? { ...state.data, ...newData } : (newData as ProfileData),
        })),
      uploadPicture: (avatarUrl: string) =>
        set((state) => ({
          data: state.data
            ? { ...state.data, avatar_url: avatarUrl }
            : ({ avatar_url: avatarUrl } as ProfileData),
        })),
      deletePicture: () =>
        set((state) => ({
          data: state.data ? { ...state.data, avatar_url: undefined } : null,
        })),
      resetStore: () => set({ data: null }),
    }),
    {
      name: 'profile-store',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);

export default useProfileStore;
