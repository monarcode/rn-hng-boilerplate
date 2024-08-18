import { View, Text } from '../shared';
import { StyleSheet } from 'react-native';
import React from 'react';
import { THEME } from '~/constants/theme';
import { SalesCardProps } from './type';

const SalesCard = (sale: SalesCardProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <View style={styles.profileBall}></View>
        <View>
          <Text size="xl" weight="semiBold">
            {sale.name}
          </Text>
          <Text size="lg" style={{ color: THEME.colors.neutral[400] }}>
            {sale.email}
          </Text>
        </View>
      </View>
      <Text size="xl" weight="bold">{`+ $${parseFloat(sale.amount.toString())}`}</Text>
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
    backgroundColor:'#F6C790'
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: THEME.spacing.lg,
  },
});
