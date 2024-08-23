import { useMutation } from '@tanstack/react-query';

import { ProfileService } from '~/services/edit-profile';

export const useUpdateProfilePicture = () => {
  return useMutation({
    mutationFn: ({ photo }: { photo: string }) => ProfileService.uploadPicture(photo),
  });
};
