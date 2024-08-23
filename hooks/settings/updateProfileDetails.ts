import { useMutation } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';

import { queryClient } from '~/libs/query';
import { ProfileService } from '~/services/edit-profile';

export const useUpdateProfileDetails = () => {
  return useMutation({
    mutationFn: async ({ newData }: { newData: any }) => {
      try {
        const response = await ProfileService.updateProfile(newData);
        return response;
      } catch (error) {
        throw new Error('Failed to update profile');
      }
    },
    onSuccess: (response) => {
      if (response && response.status_code === 200) {
        Toast.show({
          type: 'success',
          props: { title: 'Success', description: 'Profile updated successfully' },
        });

        queryClient.invalidateQueries({ queryKey: ['profile'] });
      } else {
        Toast.show({
          type: 'error',
          props: { title: 'Error', description: 'Failed to update profile' },
        });
      }
    },
    onError: (error: Error) => {
      Toast.show({
        type: 'error',
        props: { title: 'Error', description: error.message || 'Failed to update profile' },
      });
    },
  });
};
