import { router, Stack } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StyleSheet } from 'react-native'
import React, { useRef } from 'react';
import { Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import AccountSetting from '~/assets/icons/account-setting.svg';
import Account from '~/assets/icons/account.svg';
import Business from '~/assets/icons/business.svg';
import Database from '~/assets/icons/database.svg';
import Ellipse from '~/assets/icons/ellipse.svg';
import ExitIcon from '~/assets/icons/exit-icon.svg';
import Globe from '~/assets/icons/globe.svg';
import Integrate from '~/assets/icons/integrate.svg';
import Notification from '~/assets/icons/notification.svg';
import People from '~/assets/icons/people.svg';
import Wallet from '~/assets/icons/wallet.svg';
import { Dialog, DialogRef, Text, View } from '~/components/shared';
import { THEME } from '~/constants/theme';
import { SettingItem, SettingsSection } from '~/modules/settings/components';
import useAuthStore from '~/store/auth';
import useProfileStore from '~/store/profile';

const UserSettingsScreen = () => {
  const insets = useSafeAreaInsets();
  const dialogRef = useRef<DialogRef>(null);
  const resetStore = useAuthStore((state) => state.resetStore);
  const profileData = useProfileStore((state) => state.data);
  const userData = useAuthStore((state) => state.data?.user);
  const userAvatar = useAuthStore((state) => state.data?.user?.avatar_url);

  const topInset = insets.top;
  const bottomInset = insets.bottom;

  const handleLogout = () => {
    dialogRef.current?.open();
  };

  const confirmLogout = () => {
    resetStore();
    router.replace('/login');
  };
  return (
    <>
      <Stack.Screen
        options={{
          headerBackTitleVisible: false,
          headerTitle: '',
          header(props) {
            return (
              <View
                style={{
                  width: '100%',
                  paddingTop: topInset,
                  paddingBottom: 4,
                  elevation: 1,
                  borderWidth: 1,
                  backgroundColor: THEME.colors.white,
                  borderColor: THEME.colors.borderLight,
                }}
              />
            );
          },
        }}
      />

      <ScrollView style={styles.container}>
        <View style={[styles.header, { paddingTop: 20, paddingBottom: 8 }]}>
          <Text size="3xl" weight="semiBold">
            Settings
          </Text>
        </View>

      <View style={styles.profileInfo}>
        <View style={styles.profileImageContainer}>
          {profileData?.avatar_url ? (
            <Image
              source={{ uri: `${userData?.avatar_url}?${new Date().getTime()}` }}
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
            {profileData?.user_name || userData?.first_name}
          </Text>
          <Text style={styles.profileEmail}>{userData?.email}</Text>
        </View>

        <View style={styles.profileInfo}>
          <View style={styles.profileImageContainer}>
            <Image source={require('~/assets/profile.png')} style={styles.profileImage} />
          </View>
          <View style={{ marginLeft: THEME.spacing.md }}>
            <Text size="lg" weight="semiBold" style={styles.profileName}>
              DesignKid
            </Text>
            <Text style={styles.profileEmail}>engr.emmysammy1234@gmail.com</Text>
          </View>
        </View>

        <SettingsSection title="Profile Settings">
          {/*
          To enable navigation when using any of the SettingItem components,
          you should call the `goto` prop within the SettingItem */}
          <SettingItem
            icon={<Account />}
            title="General"
            goto={() => router.push('/user/general-profile')}
          />
          <SettingItem icon={<AccountSetting />} title="Account" />
          <SettingItem
            icon={<Notification />}
            title="Notification"
            goto={() => router.push('/user-settings/notification')}
          />
          <SettingItem icon={<Database />} title="Data and Privacy" />
          <SettingItem icon={<Globe />} title="Language and Region" />
        </SettingsSection>

        <SettingsSection title="Organizational Settings">
          <SettingItem icon={<Business />} title="Manage Organization" />
          <SettingItem icon={<People />} title="Members" />
          <SettingItem icon={<Notification />} title="Roles and permissions" />
          <SettingItem icon={<Integrate />} title="Integrations" />
          <SettingItem icon={<Wallet />} title="Payment Information" />
        </SettingsSection>
      </ScrollView>
    </>
      
      <SettingsSection title="Organizational Settings">
        <SettingItem icon={<Business />} title="Manage Organization" />
        <SettingItem icon={<People />} title="Members" goto={() => router.push('/user/members')} />
        <SettingItem icon={<Notification />} title="Roles and permissions" />
        <SettingItem icon={<Integrate />} title="Integrations" />
        <SettingItem icon={<Wallet />} title="Payment Information" />
      </SettingsSection>
      <TouchableOpacity
        style={[styles.logout, { marginBottom: bottomInset }]}
        onPress={handleLogout}>
        <Text size="md" weight="medium" style={{ color: THEME.colors.error }}>
          Log Out
        </Text>
        <ExitIcon />
      </TouchableOpacity>

      <Dialog
        ref={dialogRef}
        title="Confirm Logout"
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
    marginVertical: THEME.spacing.xl,
  },
  profileImageContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileImage: {
    width: '100%',
    aspectRatio: 1,
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
