import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import Ellipse from '~/assets/icons/ellipse.svg';
import GoBack from '~/components/go-back';
import KeyboardAwareWrapper from '~/components/keyboard-aware-wrapper';
import { Button, Text, View } from '~/components/shared';
import { FormInput } from '~/components/wrappers';
import { THEME } from '~/constants/theme';
import { useFetchProfile } from '~/hooks/settings/fetchProfile';
import { useProfileForm } from '~/hooks/settings/general-profile/profile-form';
import { useProfileImage } from '~/hooks/settings/general-profile/profile-image';
import { EditProfileFormData } from '~/modules/settings/types/edit-profile';
import useAuthStore from '~/store/auth';

const GeneralProfileSettings = () => {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const bottomInset = insets.bottom;
  const { data, isLoading } = useFetchProfile();
  const authStore = useAuthStore();
  const userData = authStore.data?.user;

  const { selectedImage, handleImagePick, handleRemovePhoto } = useProfileImage(
    data?.data?.profile?.avatar_url || ''
  );
  const { form, onSaveChanges, resetForm, loading } = useProfileForm(
    {
      user_name: data?.data?.profile?.user_name || '',
      bio: data?.data?.profile?.bio || '',
    },
    userData?.email || ''
  );

  const [isBioOpen, setIsBioOpen] = useState(false);

  const handleSaveChanges = async (formData: EditProfileFormData) => {
    const success = await onSaveChanges(formData);
    if (success) {
      router.back();
    }
  };

  return (
    <SafeAreaView
      edges={['top', 'bottom']}
      style={[styles.container, { paddingHorizontal: THEME.spacing.gutter }]}>
      <KeyboardAwareWrapper>
        <View style={[styles.header, { marginBottom: bottomInset }]}>
          <GoBack />
          <Text size="lg" weight="semiBold">
            {t('Edit Profile')}
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
                <Text style={styles.uploadButtonText} size="lg">
                  {selectedImage.uri ? t('Remove Photo') : t('Upload your photo')}
                </Text>
              </TouchableOpacity>
              <Text style={styles.photoHelpText}>
                {t('Photos help your teammates recognize\nyou.')}
              </Text>
            </View>
          </View>

          <View style={styles.formSection}>
            <Text size="xl" weight="semiBold">
              {t('Personal Details')}
            </Text>
            <FormInput
              name="user_name"
              control={form.control}
              label={t('Username')}
              placeholder={t('Enter username')}
            />

            <View style={{ rowGap: 9 }}>
              <Text size="md" weight="regular">
                {t('Your email address')}
              </Text>
              <View style={styles.yourEmailContainer}>
                <Text size="md" weight="medium" style={{ color: THEME.colors.neutral['300'] }}>
                  {userData?.email}
                </Text>
              </View>
            </View>

            <View style={{ rowGap: 9 }}>
              <TouchableOpacity style={styles.row} onPress={() => setIsBioOpen((prev) => !prev)}>
                <Text size="xl" weight="semiBold">
                  {t('Bio')}
                </Text>
                <Ionicons
                  name={isBioOpen ? 'chevron-up' : 'chevron-down'}
                  size={14}
                  color={THEME.colors.black}
                />
              </TouchableOpacity>
              {isBioOpen && (
                <>
                  <FormInput
                    name="bio"
                    control={form.control}
                    placeholder={t('Type your message here')}
                    numberOfLines={4}
                    multiline
                    containerStyle={{ width: '100%', height: 80, alignItems: 'flex-start' }}
                    textAlign="left"
                  />
                  <Text size="sm" style={styles.characterLimit}>
                    {t('Maximum of 64 characters')}
                  </Text>
                </>
              )}
            </View>
          </View>

          <View style={[styles.actions, { marginBottom: bottomInset }]}>
            <Button
              onPress={form.handleSubmit(handleSaveChanges)}
              containerStyle={{ flex: 1 }}
              loading={loading}>
              {t('Save Changes')}
            </Button>
            <Button onPress={resetForm} variant="secondary" containerStyle={{ flex: 1 }}>
              {t('Cancel')}
            </Button>
          </View>
        </ScrollView>
      </KeyboardAwareWrapper>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: THEME.spacing.md,
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
    alignItems: 'flex-start',
  },
  uploadButtonText: {
    color: THEME.colors.primary,
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
    paddingHorizontal: THEME.spacing.sm,
    paddingVertical: THEME.spacing.md,
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
