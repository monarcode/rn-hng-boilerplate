import React from 'react';
import { StyleSheet } from 'react-native';

import { Text, View } from '~/components/shared';
import { THEME } from '~/constants/theme';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text>HomeScreen</Text>
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
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(15, 23, 42, 0.259)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentWrapper: {
    width: '88%',
  },
  content: {
    backgroundColor: THEME.colors.white,
    borderRadius: 6,
    padding: 16,
    width: '100%',
  },
});

export default HomeScreen;
