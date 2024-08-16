import { Ionicons } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { router } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';

import Ellipse from '~/assets/icons/ellipse.svg';
import InstagramLogo from '~/assets/icons/ig-icon.svg';
import LinkedInLogo from '~/assets/icons/linkedin-icon.svg';
import XLogo from '~/assets/icons/x-icon.svg';
import GoBack from '~/components/go-back';
import KeyboardWrapper from '~/components/keyboard-behaviour-wrapper';
import { Button, View, Text, Dialog } from '~/components/shared';
import { FormInput, FormSelect } from '~/components/wrappers';
import { THEME } from '~/constants/theme';
import { queryClient } from '~/libs/query';
import { EditProfileFormData } from '~/modules/settings/types/edit-profile';
import { editProfileFormSchema } from '~/modules/settings/validation-schema/edit-profile';
import { ProfileService } from '~/services/edit-profile';
import useAuthStore from '~/store/auth';
import useProfileStore from '~/store/profile';
import { pickImage } from '~/utils/profile-image-handler';

type ImageState = {
  uri: string | null;
  status: 'idle' | 'loading' | 'success' | 'error';
  error?: string;
};

type UpdateProfileVariables = {
  email: string;
  newData: Partial<EditProfileFormData>;
};

const GeneralProfileSettings = () => {
  const insets = useSafeAreaInsets();
  const bottomInset = insets.bottom;

  const [selectedImage, setSelectedImage] = useState<ImageState>({
    uri: null,
    status: 'idle',
  });

  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm<EditProfileFormData>({
    resolver: zodResolver(editProfileFormSchema),
    defaultValues: {
      user_name: '',
      pronoun: '',
      job_title: '',
      department: '',
      bio: '',
      twitter_link: '',
      facebook_link: '',
      linkedin_link: '',
    },
  });

  const authStore = useAuthStore();
  const userData = authStore.data?.user; // Get user data from the store

  const profileStore = useProfileStore();
  const profileData = profileStore.data;

  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);

  useEffect(() => {
    if (profileData) {
      form.reset({
        user_name: profileData?.user_name || '',
        pronoun: profileData?.pronoun || '',
        job_title: profileData?.job_title || '',
        department: profileData?.department || '',
        bio: profileData?.bio || '',
        twitter_link: profileData?.twitter_link || '',
        facebook_link: profileData?.facebook_link || '',
        linkedin_link: profileData?.linkedin_link || '',
      });
      setSelectedImage({ uri: profileData.avatar_url || null, status: 'idle' });
    }
  }, [profileData]);
  const updateProfileMutation = useMutation({
    mutationFn: async ({ email, newData }: UpdateProfileVariables) => {
      try {
        const response = await ProfileService.updateProfile(email, newData);
        return response; // Return the response for further processing in onSuccess
      } catch (error) {
        throw new Error('Failed to update profile'); // Ensure that errors are properly thrown
      }
    },
    onSuccess: (response) => {
      if (response && response.status_code === 200) {
        // Update the store with the new profile data
        profileStore.updateProfile(response.data);

              // Log the updated store data to ensure it's being set
      console.log('Profile Store Updated:', profileStore.data);
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

  const updateProfilePictureMutation = useMutation({
    mutationFn: async ({ email, photo }: { email: string; photo: any }) => {
      try {
        const response = await ProfileService.uploadPicture(email, photo);
        return response; // Return the response for further processing in onSuccess
      } catch (error) {
        throw new Error('Failed to update profile picture'); // Ensure that errors are properly thrown
      }
    },
    onSuccess: (response) => {
      if (response && response.status_code === 200) {
        // Update the store with the new avatar URL
        profileStore.uploadPicture(response.data.avatar_url);

        Toast.show({
          type: 'success',
          props: { title: 'Success', description: 'Profile picture updated successfully' },
        });

        queryClient.invalidateQueries({ queryKey: ['profile'] });
      } else {
        Toast.show({
          type: 'error',
          props: { title: 'Error', description: 'Failed to update profile picture' },
        });
      }
    },
    onError: (error: Error) => {
      console.error('Error', error);
      Toast.show({
        type: 'error',
        props: { title: 'Error', description: error.message || 'Failed to update profile picture' },
      });
    },
  });

  /**
   * Handles the image pick process.
   *
   * @returns {Promise<void>} A promise that resolves once the image pick process is completed.
   * @throws {Error} If the profile picture update fails.
   */
  const handleImagePick = async () => {
    try {
      const imageUri = await pickImage();
      if (imageUri) {
        setSelectedImage({ uri: imageUri, status: 'loading' });

        const response = await updateProfilePictureMutation.mutateAsync({
          email: userData?.email || '',
          photo: imageUri,
        });

        if (response?.status_code === 200) {
          // Update the avatar_url in the profile store
          setSelectedImage({ uri: imageUri, status: 'success' });
          profileStore.uploadPicture(imageUri);
        } else {
          throw new Error('Failed to update profile picture');
        }
      }
    } catch (error) {
      setSelectedImage((prev) => ({ ...prev, status: 'error', error: 'Failed to pick image' }));
    }
  };

  const handleRemovePhoto = async () => {
    setSelectedImage({ uri: null, status: 'loading' });

    try {
      const response = await ProfileService.deletePicture(userData?.email || '');

      if (response?.status_code === 200) {
        profileStore.deletePicture();
        Toast.show({
          type: 'success',
          props: { title: 'Success', description: 'Profile picture removed successfully' },
        });
      } else {
        throw new Error(response?.message || 'Failed to remove image');
      }
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
      setSelectedImage({ uri: null, status: 'idle' });
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    }
  };

  const onSaveChanges = async (data: EditProfileFormData) => {
    try {
      setLoading(true);
      const cleanedData: Partial<EditProfileFormData> = Object.entries(data).reduce(
        (acc, [key, value]) => {
          if (value !== '' && value !== undefined) {
            acc[key as keyof EditProfileFormData] = value;
          }
          return acc;
        },
        {} as Partial<EditProfileFormData>
      );

      const updatedData: Partial<EditProfileFormData & { avatar_url?: string }> = {
        ...cleanedData,
        avatar_url: profileStore.data?.avatar_url,
      };

      const response = await updateProfileMutation.mutateAsync({
        email: userData?.email || '',
        newData: updatedData,
      });

      if (response && response.status_code === 200) {
        // Update both ProfileStore and AuthStore
        profileStore.updateProfile(response.data);

        console.log('Profile Store Updated:', profileStore.data);

        setIsSuccessDialogOpen(true);
      } else {
        throw new Error('Failed to update profile');
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        props: { title: 'Error', description: 'Failed to update profile' },
      });
    } finally {
      setLoading(false);
    }
  };

  const resetForm = useCallback(() => {
    // Reset to initial values or empty strings
    form.reset({
      user_name: profileData?.user_name || '',
      pronoun: profileData?.pronoun || '',
      job_title: profileData?.job_title || '',
      department: profileData?.department || '',
      bio: profileData?.bio || '',
      twitter_link: profileData?.twitter_link || '',
      facebook_link: profileData?.facebook_link || '',
      linkedin_link: profileData?.linkedin_link || '',
    });
  }, []);

  const handleDialogClose = () => {
    setIsSuccessDialogOpen(false);
    // Navigate back to the settings screen
    router.back();
  };

  return (
    <KeyboardWrapper>
      <SafeAreaView
        edges={['top', 'bottom']}
        style={[styles.container, { paddingHorizontal: THEME.spacing.gutter }]}>
        <View style={[styles.header, { marginBottom: bottomInset }]}>
          <GoBack />
          <Text size="lg" weight="semiBold">
            Edit Profile
          </Text>
        </View>

        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.contentContainer}
          showsVerticalScrollIndicator={false}>
          <View style={styles.photoSection}>
            <View style={styles.photoPlaceholder}>
              {selectedImage.uri ? (
                <Image source={{ uri: selectedImage.uri }} style={styles.profileImage} />
              ) : (
                <>
                  <Ellipse />
                  <View style={styles.initialsContainer}>
                    <Text size="xl" weight="medium">
                      {userData?.first_name[0]}
                      {userData?.last_name[0]}
                    </Text>
                  </View>
                </>
              )}
            </View>

            <View>
              <TouchableOpacity
                style={styles.uploadButton}
                onPress={selectedImage.uri ? handleRemovePhoto : handleImagePick}>
                <Text style={styles.uploadButtonText}>
                  {selectedImage.uri ? 'Remove Photo' : 'Upload your photo'}
                </Text>
              </TouchableOpacity>
              <Text style={styles.photoHelpText}>
                Photos help your teammates recognize{'\n'}
                you.
              </Text>
            </View>
          </View>

          <View style={styles.formSection}>
            <Text size="xl" weight="semiBold">
              Personal Details
            </Text>
            <FormInput
              name="user_name"
              control={form.control}
              label="Username"
              placeholder="Enter username"
            />

            <FormSelect
              name="pronoun"
              control={form.control}
              label="Pronouns"
              options={[
                { label: 'He/Him', value: 'he' },
                { label: 'She/Her', value: 'she' },
                { label: 'Others', value: 'others' },
              ]}
              placeholder="Select"
            />

            <FormInput
              name="job_title"
              control={form.control}
              label="Your job title"
              placeholder="Enter job title"
            />

            <FormInput
              name="department"
              control={form.control}
              label="Department or team"
              placeholder="Enter department or team"
            />

            <View style={{ rowGap: 9 }}>
              <Text size="md" weight="regular">
                Your email address
              </Text>
              <View style={styles.yourEmailContainer}>
                <Text size="md" weight="medium" style={{ color: THEME.colors.neutral['300'] }}>
                  {userData?.email}
                </Text>
              </View>
            </View>

            <View style={{ rowGap: 9 }}>
              <View style={styles.row}>
                <Text size="xl" weight="semiBold">
                  Bio
                </Text>
                <Ionicons name="chevron-down" size={14} color={THEME.colors.black} />
              </View>
              <FormInput
                name="bio"
                control={form.control}
                placeholder="Type your message here"
                numberOfLines={4}
                multiline
                containerStyle={{ width: '100%', height: 80, alignItems: 'flex-start' }}
                textAlign="left"
              />
              <Text size="sm" style={styles.characterLimit}>
                Maximum of 64 characters
              </Text>
            </View>

            <View style={{ rowGap: 9 }}>
              <View style={styles.row}>
                <Text size="xl" weight="semiBold">
                  Connect Socials
                </Text>
                <Ionicons name="chevron-down" size={14} color={THEME.colors.black} />
              </View>
              <FormInput
                name="twitter_link"
                control={form.control}
                placeholder="Add X Link"
                icon={<XLogo width={16} height={16} color={THEME.colors.black} />}
              />
            </View>
            <FormInput
              name="facebook_link"
              control={form.control}
              placeholder="Add Instagram Link"
              icon={<InstagramLogo width={20} height={20} color={THEME.colors.black} />}
            />

            <FormInput
              name="linkedin_link"
              control={form.control}
              placeholder="Add LinkedIn Link"
              icon={<LinkedInLogo width={20} height={20} color={THEME.colors.black} />}
            />
          </View>

          <View style={[styles.actions, { marginBottom: bottomInset }]}>
            <Button onPress={resetForm} variant="secondary" containerStyle={{ flex: 1 }}>
              Cancel
            </Button>
            <Button
              onPress={form.handleSubmit(onSaveChanges)}
              containerStyle={{ flex: 1 }}
              loading={loading}>
              Save Changes
            </Button>
          </View>
          <Dialog
            open={isSuccessDialogOpen}
            onOpenChange={setIsSuccessDialogOpen}
            title="Profile Updated!"
            description="Your profile has been successfully updated.">
            <Button onPress={handleDialogClose} containerStyle={styles.continueButton}>
              Continue
            </Button>
          </Dialog>
        </ScrollView>
      </SafeAreaView>
    </KeyboardWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.white,
  },
  contentContainer: {
    rowGap: THEME.spacing.lg,
    flexGrow: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    gap: THEME.spacing.sm + 4,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: THEME.fontSize.lg,
    fontWeight: 'bold',
    marginLeft: THEME.spacing.md,
  },
  photoSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: THEME.spacing.md,
  },
  profileImage: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 40,
  },
  photoPlaceholder: {
    width: 80,
    height: 80,
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  initialsContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  uploadButton: {
    marginTop: THEME.spacing.sm,
  },
  uploadButtonText: {
    color: THEME.colors.primary,
    fontSize: THEME.fontSize.md,
  },
  photoHelpText: {
    color: THEME.colors.neutral[400],
    fontSize: THEME.fontSize.sm,
    marginTop: THEME.spacing.xs,
  },
  formSection: {
    rowGap: THEME.spacing.lg,
  },
  yourEmailContainer: {
    borderWidth: 1,
    borderColor: THEME.colors.border,
    padding: 12,
    borderRadius: THEME.spacing.sm,
    opacity: 0.5,
  },
  socialTitle: {
    marginTop: THEME.spacing.xl,
  },
  characterLimit: {
    color: THEME.colors.neutral[400],
    marginTop: THEME.spacing.xs,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: THEME.spacing.xl,
  },
  actions: {
    flexDirection: 'row',
    gap: THEME.spacing.sm + 4,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  continueButton: {
    marginTop: THEME.spacing.lg,
    width: '50%',
    alignSelf: 'flex-end',
  },
});

export default GeneralProfileSettings;
