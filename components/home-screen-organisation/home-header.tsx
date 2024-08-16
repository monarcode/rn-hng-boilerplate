import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { Bell } from 'react-native-feather';

import { HomeHeaderProps } from './type';
import { View, Text } from '../shared';

import { THEME } from '~/constants/theme';

const HomeHeader = (user: HomeHeaderProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.detailsContainer}>
        <Image
          source={
            user.avatar_url
              ? { uri: user.avatar_url }
              : require('../../assets/images/default-profile.png')
          }
        />
        <View>
          <Text size="md" weight="medium" style={{ color: THEME.colors.neutral[300] }}>
            Welcome Back!
          </Text>
          <Text size="2xl" weight="medium">
            {user.first_name}
          </Text>
        </View>
      </View>
      <View>
        <Bell color="black" />
        <View style={styles.notification} />
      </View>
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    borderBottomWidth: 1,
    paddingBottom: THEME.spacing.lg,
    borderColor: THEME.colors.borderLight,
  },
  detailsContainer: {
    flexDirection: 'row',
    gap: THEME.spacing.sm,
    alignItems: 'center',
  },
  notification: {
    height: 12,
    width: 12,
    backgroundColor: 'red',
    position: 'absolute',
    right: 0,
    borderColor: 'white',
    borderWidth: 2,
    borderRadius: 100,
  },
});
