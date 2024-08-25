import { Stack } from 'expo-router';
import React from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import GoBack from '~/components/go-back';
import NotificationCard from '~/components/notifications/notification-card';
import { Text, View } from '~/components/shared';
import { THEME } from '~/constants/theme';

const NotificationSettings = () => {
  const { top } = useSafeAreaInsets();

  const notifications = [
    {
      id: 1,
      title: 'James Karty',
      count: 2,
      description: 'Do you have it now?',
      timestamp: '2m ago',
    },
    {
      id: 2,
      title: 'Mary Smith',
      count: 1,
      description: 'Your order is on the way.',
      timestamp: '1h ago',
    },
    {
      id: 3,
      title: 'John Doe',
      count: 3,
      description: 'I did not recieve the order',
      timestamp: '1d ago',
    },
    {
      id: 4,
      title: 'Jane Doe',
      count: 5,
      description: 'Your order is ready.',
      timestamp: '3d ago',
    },
    {
      id: 5,
      title: 'Phelickz hng',
      count: 1,
      description: 'I forgot my wallet',
      timestamp: '4d ago',
    },
    {
      id: 6,
      title: 'Emily Davis',
      count: 6,
      description: 'I need to return my order',
      timestamp: '5d ago',
    },
    {
      id: 7,
      title: 'Michael Brown',
      count: 1,
      description: 'I need to pay for my order',
      timestamp: '6d ago',
    },
    {
      id: 8,
      title: 'Sarah Johnson',
      count: 4,
      description: 'How much is it?',
      timestamp: '7d ago',
    },
    {
      id: 9,
      title: 'Michael Brown',
      count: 3,
      description: 'Can you help me with my order?',
      timestamp: '8d ago',
    },
    {
      id: 10,
      count: 2,
      title: 'Sarah Johnson',
      description: 'Where is my order?',
      timestamp: '9d ago',
    },
  ];

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerBackTitleVisible: false,
          headerTitle: '',
          header(props) {
            return (
              <View
                style={{
                  width: '100%',
                  paddingTop: top,
                  paddingBottom: 6,
                  elevation: 1,
                  borderWidth: 1,
                  backgroundColor: THEME.colors.white,
                  borderColor: THEME.colors.borderLight,
                }}>
                <View style={styles.headerContainer}>
                  <View style={styles.headerLeft}>
                    <GoBack />
                    <Text size="xl" weight="semiBold">
                      Notifications
                    </Text>
                  </View>
                </View>
              </View>
            );
          },
        }}
      />

      <FlatList
        data={notifications}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => <NotificationCard data={item} />}
        contentContainerStyle={styles.wrapper}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 18,
    backgroundColor: THEME.colors.white,
  },
  headerContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    gap: THEME.spacing.sm,
  },
  headerLeft: {
    flex: 1,
    flexDirection: 'row',
    gap: THEME.spacing.sm,
    alignItems: 'center',
  },
  wrapper: {
    rowGap: 26,
    paddingTop: THEME.spacing.md,
    paddingBottom: 56,
  },
});

export default NotificationSettings;
