import React from 'react';
import { StyleSheet } from 'react-native';

import { Text, View } from '../shared';

import { THEME } from '~/constants/theme';

export default function BenefitCard({ benefit }: { benefit: string }) {
  return (
    <View style={styles.container}>
      {benefit && <View style={styles.dot} />}
      <Text size="md" weight="regular" style={{ color: THEME.colors.neutral[300] }}>
        {benefit}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 10,
    backgroundColor: THEME.colors.neutral[300],
  },
});
