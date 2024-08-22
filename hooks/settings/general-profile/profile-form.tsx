import { zodResolver } from '@hookform/resolvers/zod';
import { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';

import { useUpdateProfileDetails } from '~/hooks/settings/updateProfileDetails';
import { EditProfileFormData } from '~/modules/settings/types/edit-profile';
import { editProfileFormSchema } from '~/modules/settings/validation-schema/edit-profile';

export const useProfileForm = (initialData: Partial<EditProfileFormData>, userEmail: string) => {
  const [loading, setLoading] = useState(false);
  const { mutate: updateProfile } = useUpdateProfileDetails();

  const form = useForm<EditProfileFormData>({
    resolver: zodResolver(editProfileFormSchema),
    defaultValues: initialData,
  });

  const onSaveChanges = async (data: EditProfileFormData) => {
    try {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      const cleanedData: Partial<EditProfileFormData> = Object.entries(data).reduce(
        (acc, [key, value]) => {
          if (value !== '' && value !== undefined) {
            acc[key as keyof EditProfileFormData] = value;
          }
          return acc;
        },
        {} as Partial<EditProfileFormData>
      );

      await updateProfile({
        email: userEmail,
        newData: cleanedData,
      });

      return true;
    } catch (error) {
      console.error('Error updating profile:', error);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const resetForm = useCallback(() => {
    form.reset(initialData);
  }, [initialData, form]);

  return { form, onSaveChanges, resetForm, loading };
};
