import React from 'react';
import { StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import SummaryCard from './summary-card';
import { View, Text } from '../shared';
import Product from '../../assets/icons/products.svg';
import AllMembers from '../../assets/icons/allmembers.svg';
import Dollar from '../../assets/dollar.svg';
import ActiveMembers from '../../assets/icons/activemembers.svg';
import { THEME } from '~/constants/theme';

const Summary = () => {
  const summary = [
    {
      title: 'Total Members',
      amount: '100',
      increase: 20,
      Icon: AllMembers,
    },
    {
      title: 'Total Products',
      amount: '26',
      increase: 150,
      Icon: Product,
    },
    {
      title: 'Subscriptions',
      amount: '126',
      increase: 150,
      Icon: Dollar,
    },
    {
      title: 'Active Members',
      amount: '547',
      increase: 150,
      Icon: ActiveMembers,
    },
  ];
  return (
    <View style={styles.container}>
      <View style={{ gap: THEME.spacing.xs }}>
        <Text size="2xl" weight="bold">
          Dashboard
        </Text>
        <Text size="md" style={{ color: THEME.colors.neutral[300] }}>
          This Month's Summary
        </Text>
      </View>
      <FlatList
        data={summary}
        renderItem={({ item, index }) => <SummaryCard {...item} />}
        contentContainerStyle={{ gap: THEME.spacing.sm }}
        horizontal
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default Summary;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    gap: 15,
  },
});
