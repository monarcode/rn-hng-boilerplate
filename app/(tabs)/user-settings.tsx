import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { ReactNode } from 'react';
import { StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import AccountSetting from '~/assets/icons/account-setting.svg';
import Account from '~/assets/icons/account.svg';
import Business from '~/assets/icons/business.svg';
import Database from '~/assets/icons/database.svg';
import Globe from '~/assets/icons/globe.svg';
import Integrate from '~/assets/icons/integrate.svg';
import Notification from '~/assets/icons/notification.svg';
import People from '~/assets/icons/people.svg';
import Wallet from '~/assets/icons/wallet.svg';
import { Text, View } from '~/components/shared';
import { THEME } from '~/constants/theme';

const UserSettingsScreen = () => {
  const insets = useSafeAreaInsets();

  const topInset = insets.top;
  const bottomInset = insets.bottom;

  return (
    <ScrollView style={styles.container}>
      <View style={[styles.header, { paddingTop: topInset, paddingBottom: bottomInset }]}>
        <Text size="lg" weight="semiBold">
          Settings
        </Text>
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
        <SettingItem icon={<Notification />} title="Notification" />
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
  section: {
    marginBottom: THEME.spacing.xl,
  },
  sectionTitle: {
    marginBottom: THEME.spacing.lg,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: THEME.spacing.md - 3,
  },
  settingText: {
    flex: 1,
    marginLeft: THEME.spacing.sm,
  },
});

export default UserSettingsScreen;

const SettingItem = ({ icon, title, goto }: { icon: any; title: string; goto?: () => void }) => (
  <TouchableOpacity style={styles.settingItem} onPress={goto ?? (() => {})}>
    {icon}
    <Text size="md" style={styles.settingText}>
      {title}
    </Text>
    <Ionicons name="chevron-forward" size={16} color={THEME.colors.neutral[300]} />
  </TouchableOpacity>
);

const SettingsSection = ({ title, children }: { title: string; children: ReactNode }) => (
  <View style={styles.section}>
    <Text size="lg" weight="bold" style={styles.sectionTitle}>
      {title}
    </Text>
    {children}
  </View>
);
