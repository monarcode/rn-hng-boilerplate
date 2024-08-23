import { useMutation } from '@tanstack/react-query';
import Toast from 'react-native-toast-message';

import { AccountSettingsService } from '~/services/password-update';

export function useAccountSettings() {
  return useMutation({
    mutationFn: async (payload: {
      old_password: string;
      new_password: string;
      confirm_new_password: string;
    }) => {
      try {
        const response = await AccountSettingsService.updateUserPassword(payload);
        return response;
      } catch (error) {
        throw new Error('Failed to update password');
      }
    },
    onSuccess: (response) => {
      if (response && response.status_code === 200) {
        Toast.show({
          type: 'success',
          props: { title: 'Success', description: 'Password updated successfully' },
        });
      } else {
        Toast.show({
          type: 'error',
          props: { title: 'Error', description: 'Failed to update password' },
        });
      }
    },
    onError: (error: Error) => {
      Toast.show({
        type: 'error',
        props: { title: 'Error', description: error.message || 'Failed to update password' },
      });
    },
  });
}