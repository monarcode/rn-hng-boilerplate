import { router } from 'expo-router';
import React, { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import AccountSetting from '~/assets/icons/account-setting.svg';
import Business from '~/assets/icons/business.svg';
import Database from '~/assets/icons/database.svg';
import Ellipse from '~/assets/icons/ellipse.svg';
import ExitIcon from '~/assets/icons/exit-icon.svg';
import Globe from '~/assets/icons/globe.svg';
import Notification from '~/assets/icons/notification.svg';
import UserPlus from '~/assets/icons/userplus.svg';
import Users from '~/assets/icons/users.svg';
import Wallet from '~/assets/icons/wallet.svg';
import { Dialog, DialogRef, Text, View } from '~/components/shared';
import { THEME } from '~/constants/theme';
import { useFetchProfile } from '~/hooks/settings/fetchProfile';
import { SettingItem, SettingsSection } from '~/modules/settings/components';
import useAuthStore from '~/store/auth';

const UserSettingsScreen = () => {
  const { t } = useTranslation();
  const insets = useSafeAreaInsets();
  const dialogRef = useRef<DialogRef>(null);
  const resetStore = useAuthStore((state) => state.resetStore);
  const userData = useAuthStore((state) => state.data?.user);
  const userAvatar = useAuthStore((state) => state.data?.user?.avatar_url);
  const { data, isError, isLoading } = useFetchProfile();

  const topInset = insets.top;
  const bottomInset = insets.bottom;

  const handleLogout = () => {
    dialogRef.current?.open();
  };

  const confirmLogout = () => {
    resetStore();
    if (!data?.data) return;
    router.replace('/login');
  };
  return (
    <SafeAreaView
      edges={['top']}
      style={[styles.container, { paddingHorizontal: THEME.spacing.gutter }]}>
      <View style={[styles.header]}>
        <Text size="xl" weight="semiBold">
          {t('Settings')}
        </Text>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.profileInfo}>
          <View style={styles.profileImageContainer}>
            {data?.data?.avatar_url ? (
              <Image
                source={{ uri: `${data?.data?.avatar_url}?${new Date().getTime()}` }}
                style={styles.profileImage}
                key={userAvatar}
              />
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

          <View style={{ marginLeft: THEME.spacing.md }}>
            <Text size="lg" weight="semiBold" style={styles.profileName}>
              {data?.data?.profile?.user_name || `${userData?.first_name} ${userData?.last_name}`}
            </Text>
            <Text style={styles.profileEmail}>{userData?.email}</Text>
          </View>
        </View>

        <SettingsSection title={t('Profile Settings')}>
          {/*
          To enable navigation when using any of the SettingItem components,
          you should call the goto prop within the SettingItem */}
          <SettingItem
            icon={<AccountSetting />}
            title={t('Account')}
            goto={() => router.push('/user/general-profile')}
          />
          <SettingItem
            icon={<Notification />}
            title={t('Notification')}
            goto={() => router.push('/user-settings/notification')}
          />
          <SettingItem
            icon={<Database />}
            title={t('Change Password')}
            goto={() => router.push('/user/change-password')}
          />
          <SettingItem
            icon={<Globe />}
            title={t('Language and Region')}
            goto={() => router.push('/user-settings/language-and-region')}
          />
        </SettingsSection>

        <SettingsSection title={t('Organizational Settings')}>
          <SettingItem
            icon={<UserPlus />}
            title={t('Create Organisation')}
            goto={() => router.push('/(auth)/organisation-sign-up')}
          />
          <SettingItem icon={<Business />} title={t('Manage Organization')} />
          <SettingItem
            icon={<Users />}
            title={t('Members')}
            goto={() => router.push('/user/members')}
          />
        </SettingsSection>
        <SettingsSection title={t('Payment Setting')}>
          <SettingItem
            icon={<Wallet />}
            title={t('Subscription')}
            goto={() => router.push('/user/subscription')}
          />
        </SettingsSection>
        <TouchableOpacity
          style={[styles.logout, { marginBottom: bottomInset }]}
          onPress={handleLogout}>
          <Text size="md" weight="medium" style={{ color: THEME.colors.error }}>
            {t('Log Out')}
          </Text>
          <ExitIcon />
        </TouchableOpacity>

        <Dialog
          ref={dialogRef}
          title={t('Confirm Logout')}
          description="Are you sure you want to log out?"
          showCloseButton={false}>
          <View style={styles.dialogButtons}>
            <TouchableOpacity onPress={() => dialogRef.current?.close()}>
              <Text style={styles.cancelButton}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={confirmLogout}>
              <Text style={styles.confirmButton}>Confirm</Text>
            </TouchableOpacity>
          </View>
        </Dialog>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: THEME.colors.white,
    paddingHorizontal: THEME.spacing.gutter,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileInfo: {
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: THEME.spacing.md,
  },
  profileImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileImage: {
    width: '100%',
    aspectRatio: 1,
    borderRadius: 40,
  },
  profileName: {
    marginBottom: 5,
  },
  profileEmail: {
    color: THEME.colors.neutral[400],
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
  logout: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  dialogButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: THEME.spacing.md,
  },
  cancelButton: {
    color: THEME.colors.neutral[400],
    marginRight: THEME.spacing.md,
  },
  confirmButton: {
    color: THEME.colors.primary,
  },
});

export default UserSettingsScreen;
