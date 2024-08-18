import { useMutation } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';

import { queryClient } from '~/libs/query';
import { EditProfileFormData } from '~/modules/settings/types/edit-profile';
import { ProfileService } from '~/services/edit-profile';

export interface UpdateProfileVariables {
  email: string;
  newData: any;
}

export const useUpdateProfileDetails = () => {
  return useMutation({
    mutationFn: async ({ email, newData }: UpdateProfileVariables) => {
      try {
        const response = await ProfileService.updateProfile(email, newData);
        console.log('the response: ', response);
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
      console.error('Error', error);
      Toast.show({
        type: 'error',
        props: { title: 'Error', description: error.message || 'Failed to update profile' },
      });
    },
  });
};
