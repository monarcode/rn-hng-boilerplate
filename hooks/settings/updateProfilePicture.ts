import { useMutation } from '@tanstack/react-query';

import { ProfileService } from '~/services/edit-profile';

export const useUpdateProfilePicture = () => {
  return useMutation({
    mutationFn: ({ email, photo }: { email: string; photo: string }) =>
      ProfileService.uploadPicture(email, photo),
  });
};
