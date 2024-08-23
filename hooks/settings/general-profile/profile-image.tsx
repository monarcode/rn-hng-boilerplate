import { useState } from 'react';
import Toast from 'react-native-toast-message';

import { useDeleteProfilePicture } from '~/hooks/settings/deleteProfilePicture';
import { useUpdateProfilePicture } from '~/hooks/settings/updateProfilePicture';
import { queryClient } from '~/libs/query';
import { pickImageOrUseCamera, resizeImage } from '~/utils/profile-image-handler';

type ImageState = {
  uri: string | undefined;
  status: 'idle' | 'loading' | 'success' | 'error';
  error?: string;
};

export const useProfileImage = (userEmail: string) => {
  const [selectedImage, setSelectedImage] = useState<ImageState>({
    uri: '',
    status: 'idle',
  });

  const { mutate: deleteProfilePicture } = useDeleteProfilePicture();
  const { mutate: updateProfilePicture } = useUpdateProfilePicture();

  const handleRemovePhoto = async () => {
    setSelectedImage({ uri: undefined, status: 'loading' });
    try {
      deleteProfilePicture();
      Toast.show({
        type: 'success',
        props: { title: 'Success', description: 'Profile picture removed successfully' },
      });
    } catch (error) {
      setSelectedImage((prev) => ({
        ...prev,
        status: 'error',
        error: 'Failed to remove image',
      }));
      Toast.show({
        type: 'error',
        props: { title: 'Error', description: 'Failed to remove image' },
      });
    } finally {
      setSelectedImage({ uri: undefined, status: 'idle' });
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    }
  };

  const handleImagePick = async (): Promise<void> => {
    try {
      const imageUri = await pickImageOrUseCamera();

      if (imageUri) {
        const resizedImageUri = await resizeImage(imageUri);
        updateProfilePicture(
          { photo: resizedImageUri },
          {
            onSuccess: (response) => {
              if (response && response.status_code === 200) {
                setSelectedImage({ uri: response.data.avatar_url, status: 'success' });
                Toast.show({
                  type: 'success',
                  props: { title: 'Success', description: 'Profile picture updated successfully' },
                });
              } else {
                throw new Error('Failed to update profile picture');
              }
            },
            onError: (error) => {
              console.error('Error updating profile picture:', error);
              Toast.show({
                type: 'error',
                props: { title: 'Error', description: 'Failed to update profile picture' },
              });
            },
          }
        );
      }
    } catch (error) {
      setSelectedImage((prev) => ({ ...prev, status: 'error', error: 'Failed to pick image' }));
      Toast.show({
        type: 'error',
        props: { title: 'Error', description: 'Failed to pick image' },
      });
    }
  };

  return { selectedImage, handleRemovePhoto, handleImagePick };
};
