import React from 'react';
import { StyleSheet } from 'react-native';

import { Text, View } from '../shared';
import { SalesCardProps } from './type';

import { THEME } from '~/constants/theme';
import { currency } from '~/libs/currency';

const SalesCard = (sale: SalesCardProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.profileBall} />
        <View>
          <Text size="lg" weight="medium">
            {sale.name}
          </Text>
          <Text size="sm" style={{ color: THEME.colors.neutral[400] }}>
            {sale.email}
          </Text>
        </View>
      </View>
      <Text size="xl" weight="bold">{`+ ${currency(sale.amount)}`}</Text>
    </View>
  );
};

export default SalesCard;

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 1,
    borderColor: THEME.colors.borderLight,
    paddingVertical: THEME.spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  profileBall: {
    height: 40,
    width: 40,
    borderRadius: 1000,
    backgroundColor: '#F6C790',
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: THEME.spacing.lg,
  },
});
