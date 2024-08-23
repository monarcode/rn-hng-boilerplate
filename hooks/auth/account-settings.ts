import { useMutation } from '@tanstack/react-query';

import { AccountSettingsService } from '~/services/password-update';

export function useAccountSettings() {
  const updateUserPasswordMutation = useMutation({
    mutationFn: (payload: any) => AccountSettingsService.updateUserPassword(payload),
  });

  return {
    updateUserPasswordMutation,
  };
}
