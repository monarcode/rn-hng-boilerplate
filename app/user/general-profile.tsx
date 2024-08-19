import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import Ellipse from '~/assets/icons/ellipse.svg';
import InstagramLogo from '~/assets/icons/ig-icon.svg';
import LinkedInLogo from '~/assets/icons/linkedin-icon.svg';
import XLogo from '~/assets/icons/x-icon.svg';
import GoBack from '~/components/go-back';
import KeyboardWrapper from '~/components/keyboard-behaviour-wrapper';
import { Button, View, Text, Dialog } from '~/components/shared';
import { FormInput, FormSelect } from '~/components/wrappers';
import { THEME } from '~/constants/theme';
import { useFetchProfile } from '~/hooks/settings/fetchProfile';
import { useProfileForm } from '~/hooks/settings/general-profile/profile-form';
import { useProfileImage } from '~/hooks/settings/general-profile/profile-image';
import { EditProfileFormData } from '~/modules/settings/types/edit-profile';
import useAuthStore from '~/store/auth';

const GeneralProfileSettings = () => {
  const insets = useSafeAreaInsets();
  const bottomInset = insets.bottom;
  const { data, isLoading } = useFetchProfile();
  const authStore = useAuthStore();
  const userData = authStore.data?.user;

  const { selectedImage, handleImagePick, handleRemovePhoto } = useProfileImage(
    userData?.email || ''
  );
  const { form, onSaveChanges, resetForm, loading } = useProfileForm(
    {
      user_name: data?.data?.profile?.user_name || '',
      pronoun: data?.data?.profile?.pronoun || '',
      job_title: data?.data?.profile?.job_title || '',
      department: data?.data?.profile?.department || '',
      bio: data?.data?.profile?.bio || '',
      twitter_link: data?.data?.profile?.twitter_link || '',
      facebook_link: data?.data?.profile?.facebook_link || '',
      linkedin_link: data?.data?.profile?.linkedin_link || '',
    },
    userData?.email || ''
  );

  const [isSuccessDialogOpen, setIsSuccessDialogOpen] = useState(false);

  const handleSaveChanges = async (formData: EditProfileFormData) => {
    const success = await onSaveChanges(formData);
    if (success) {
      setIsSuccessDialogOpen(true);
    }
  };
  const handleDialogClose = () => {
    setIsSuccessDialogOpen(false);
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
              onPress={form.handleSubmit(handleSaveChanges)}
              containerStyle={{ flex: 1 }}
              loading={loading === true}>
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
