import React from 'react';
import { StyleSheet } from 'react-native';

import { Text, View } from '../shared';
import { SalesCardProps } from './type';

import { THEME } from '~/constants/theme';
import { currency } from '~/libs/currency';

const SalesCard = (sale: SalesCardProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.profileBall}></View>
      <View style={styles.profileContainer}>
        <View>
          <Text size="lg" weight="medium">
            {sale.name}
          </Text>
          <Text size="sm" style={{ color: THEME.colors.neutral[400] }}>
            {sale.email}
          </Text>
        </View>
        <Text size="xl" weight="bold">{`+ $${parseFloat(sale.amount.toString())}`}</Text>
      </View>
    </View>
  );
};

export default SalesCard;

const styles = StyleSheet.create({
  container: {
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
    borderBottomWidth: 1,
    width: '85%',
    justifyContent: 'space-between',
    borderColor: '#F2F2F2',
    paddingVertical: THEME.spacing.md,
  },
});
