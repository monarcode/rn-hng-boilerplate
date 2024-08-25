import React from 'react';
import { Image, StyleSheet } from 'react-native';

import { Text, View } from '../shared';

import { THEME } from '~/constants/theme';

export default function NotificationCard({ data }: any) {
  return (
    <View style={styles.itemWrapper}>
      <View style={styles.profile}>
        <View style={styles.profileImageContainer}>
          <Image
            source={{ uri: 'https://i.pravatar.cc/300' }} // Replace with the actual profile picture URL
            resizeMode="contain"
            style={{ width: '100%', height: '100%' }}
          />
        </View>

        <View style={styles.messageCount}>
          <Text size="sm" weight="medium" style={styles.count}>
            {data.count}
          </Text>
        </View>
      </View>

      <View style={styles.profileInfo}>
        <Text weight="semiBold" style={styles.username}>
          {data.title}
        </Text>
        <Text weight="regular" style={styles.message}>
          {data.description}
        </Text>
      </View>

      <View style={styles.timeWrapper}>
        <Text weight="medium" style={styles.time}>
          {data.timestamp}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  itemWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 16,
  },
  profile: {
    position: 'relative',
    alignSelf: 'flex-start',
  },
  profileImageContainer: {
    width: 50,
    height: 50,
    borderRadius: 96,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#142356',
    backgroundColor: '#f2f2f2',
  },
  messageCount: {
    top: -1,
    right: -5,
    width: 20,
    height: 20,
    borderRadius: 40,
    position: 'absolute',
    alignItems: 'center',
    shadowColor: '#000',
    justifyContent: 'center',
    shadowOffset: { width: 0, height: 2 },
    backgroundColor: '#F8A435',
  },
  count: {
    color: THEME.colors.white,
  },
  profileInfo: {
    flex: 1,
    rowGap: 2.9,
  },
  username: {
    fontSize: 16,
    color: THEME.colors.dark,
  },
  message: {
    fontSize: 14,
    color: THEME.colors.neutral[300],
  },
  timeWrapper: {
    marginRight: 2,
  },
  time: {
    fontSize: 14,
    color: '#52525299',
    textAlign: 'right',
  },
});
