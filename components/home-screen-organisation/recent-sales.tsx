import React from 'react';
import { StyleSheet } from 'react-native';

import { Text, View } from '../shared';
import SalesCard from './sales-card';

import { THEME } from '~/constants/theme';
import { useTranslation } from 'react-i18next';

const RecentSales = () => {
  const { t } = useTranslation();
  const Sales = [
    {
      name: 'Prince Edward',
      email: 'special@test.mail',
      amount: 3000,
    },
    {
      name: 'Ebenezer Hope',
      email: 'special@test.mail',
      amount: 2500,
    },
    {
      name: 'Ekuke Gideon',
      email: 'special@test.mail',
      amount: 1000,
    },
  ];
  return (
    <View style={styles.container}>
      <View style={styles.headerTextContainer}>
        <Text size="lg" weight="bold">
          {t('Recent Sales')}
        </Text>
        <Text size="lg" style={{ color: THEME.colors.neutral[400] }}>
          {t('See More')}
        </Text>
      </View>
      <SalesCard {...Sales[0]} />
      <SalesCard {...Sales[1]} />
      <SalesCard {...Sales[2]} />
    </View>
  );
};

export default RecentSales;

const styles = StyleSheet.create({
  container: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: THEME.colors.borderLight,
    padding: THEME.spacing.sm,
    marginBottom: 20,
  },
  headerTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: THEME.spacing.md,
  },
});
