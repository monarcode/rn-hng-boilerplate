import { useMutation } from '@tanstack/react-query';

import { ProfileService } from '~/services/edit-profile';

export const useDeleteProfilePicture = () => {
  return useMutation({
    mutationFn: (email: string) => ProfileService.deletePicture(email),
  });
};
