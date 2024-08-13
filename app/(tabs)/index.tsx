import React from 'react';
import { StyleSheet } from 'react-native';

import { Text, View } from '~/components/shared';
import { THEME } from '~/constants/theme';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text>Home Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: THEME.spacing.gutter,
    backgroundColor: THEME.colors.white,
  },
});

export default HomeScreen;
