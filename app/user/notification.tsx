import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Stack } from 'expo-router';
import React from 'react';
import { StyleSheet, SectionList, ScrollView } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import BasicHeader from '~/components/basic-header';
import { Text, View, Button } from '~/components/shared';
import { THEME } from '~/constants/theme';

const NotificationSettings = () => {
  const insets = useSafeAreaInsets();

  const topInset = insets.top;
  const bottomInset = insets.bottom;

  //  <Button>
  //   Save Changes
  // </Button>

  const notificationSections = [
    {
      title: (
        <Text size="xl" weight="semiBold">
          Notifications Alert
        </Text>
      ),
      data: [
        {
          header: 'Mobile push notifications',
          body: 'Receive push notifications on mentions and comments via your mobile app',
        },
      ],
    },
    {
      title: (
        <Text size="xl" weight="semiBold">
          Email notifications
        </Text>
      ),
      data: [
        {
          header: 'Activity in your workspace',
          body: 'Receive emails when you get comments, mentions, page invites, reminders, access requests, and property changes',
        },
        {
          header: 'Always send email notifications',
          body: 'Receive emails about activity in your workspace, even when you are active on the app',
        },
        {
          header: 'Email digests',
          body: 'Receive email digest every 8 hours for changes to pages you are subscribed to',
        },
        {
          header: 'Announcement and update emails',
          body: 'Receive occasional emails about product launches and new features from notion',
        },
      ],
    },
    {
      title: (
        <Text size="xl" weight="semiBold">
          Slack Notification
        </Text>
      ),
      data: [
        {
          header: 'Activity in your workspace',
          body: 'Receive emails when you get comments, mentions, page invites, reminders, access requests, and property changes',
        },
        {
          header: 'Always send email notifications',
          body: 'Receive emails about activity in your workspace, even when you are active on the app',
        },
        {
          header: 'Email digests',
          body: 'Receive email digest every 8 hours for changes to pages you are subscribed to',
        },
        {
          header: 'Announcement and update emails',
          body: 'Receive occasional emails about product launches and new features from notion',
        },
      ],
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Stack.Screen
        options={{
          header: () => <BasicHeader label="Notifications" />,
        }}
      />
      <SectionList
        contentContainerStyle={styles.section}
        sections={notificationSections}
        renderItem={({ item }) => (
          <View style={styles.sectionBody}>
            <Text size="md" weight="medium">
              {item.header}
            </Text>
            <Text size="sm" weight="regular">
              {item.body}
            </Text>
          </View>
        )}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={styles.sectionHeader}>{title}</Text>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: THEME.spacing.gutter,
    paddingTop: -THEME.spacing.lg,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  section: {
    width: '100%',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    borderColor: 'rgba(188, 188, 188, 0.40)',
    paddingBottom: 11,
    borderBottomWidth: 0.5,
  },
  sectionBody: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    width: '100%',
    paddingBottom: 11,

    gap: 12,
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
});

export default NotificationSettings;
