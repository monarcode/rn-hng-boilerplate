import { Ionicons } from '@expo/vector-icons';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import Ellipse from '~/assets/icons/ellipse.svg';
import InstagramLogo from '~/assets/icons/ig-icon.svg';
import LinkedInLogo from '~/assets/icons/linkedin-icon.svg';
import XLogo from '~/assets/icons/x-icon.svg';
import GoBack from '~/components/go-back';
import KeyboardWrapper from '~/components/keyboard-behaviour-wrapper';
import { Button, View, Text } from '~/components/shared';
import { FormInput, FormSelect } from '~/components/wrappers';
import { THEME } from '~/constants/theme';
import { EditProfileFormData } from '~/modules/settings/types/edit-profile';
import { editProfileFormSchema } from '~/modules/settings/validation-schema/edit-profile';
import useAuthStore from '~/store/auth';

const GeneralProfileSettings = () => {
  const insets = useSafeAreaInsets();
  const bottomInset = insets.bottom;

  const [loading, setLoading] = useState<boolean>(false);
  const form = useForm<EditProfileFormData>({
    resolver: zodResolver(editProfileFormSchema),
    defaultValues: {
      username: '',
      pronouns: '',
      jobTitle: '',
      department: '',
      email: '',
      bio: '',
      xLink: '',
      instagramLink: '',
      linkedinLink: '',
    },
  });

  const authStore = useAuthStore();
  const userData = authStore.data?.user; // Get user data from the store

  const onSaveChanges = (data: EditProfileFormData) => {
    console.log(data);
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
              <Ellipse />
              <View style={styles.initialsContainer}>
                <Text size="xl" weight="medium">
                  {userData?.first_name[0]}
                  {userData?.last_name[0]}
                </Text>
              </View>
            </View>
            <View>
              <TouchableOpacity style={styles.uploadButton}>
                <Text style={styles.uploadButtonText}>Upload your photo</Text>
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
              name="username"
              control={form.control}
              label="Username"
              placeholder="Enter username"
            />

            <FormSelect
              name="pronouns"
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
              name="jobTitle"
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

            <FormInput
              name="email"
              control={form.control}
              label="Your email address"
              placeholder="Enter email address"
              keyboardType="email-address"
            />
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
                name="xLink"
                control={form.control}
                placeholder="Add X Link"
                icon={<XLogo width={16} height={16} color={THEME.colors.black} />}
              />
            </View>
            <FormInput
              name="instagramLink"
              control={form.control}
              placeholder="Add Instagram Link"
              icon={<InstagramLogo width={20} height={20} color={THEME.colors.black} />}
            />

            <FormInput
              name="linkedinLink"
              control={form.control}
              placeholder="Add LinkedIn Link"
              icon={<LinkedInLogo width={20} height={20} color={THEME.colors.black} />}
            />
          </View>

          <View style={[styles.actions, { marginBottom: bottomInset }]}>
            <Button onPress={() => {}} variant="secondary" containerStyle={{ flex: 1 }}>
              Cancel
            </Button>
            <Button onPress={() => {}} containerStyle={{ flex: 1 }} loading={loading}>
              Save Changes
            </Button>
          </View>
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
});

export default GeneralProfileSettings;
