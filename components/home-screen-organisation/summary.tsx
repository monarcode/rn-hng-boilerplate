import React from 'react';
import { StyleSheet } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';

import ActiveMembers from '../../assets/icons/activemembers.svg';
import AllMembers from '../../assets/icons/allmembers.svg';
import Dollar from '../../assets/icons/icondollar.svg';
import Product from '../../assets/icons/products.svg';
import { Text, View } from '../shared';
import SummaryCard from './summary-card';

import { THEME } from '~/constants/theme';

const Summary = () => {
  const summary = [
    {
      title: 'Total Members',
      amount: '100',
      increase: '+ 23 from last month',
      Icon: AllMembers,
      color: '#509DF5',
    },
    {
      title: 'Total Products',
      amount: '26',
      increase: '+ 4 added last month',
      Icon: Product,
      color: '#422AF0',
    },
    {
      title: 'Subscriptions',
      amount: '126',
      increase: '+ 2 from last month',
      Icon: Dollar,
      color: '#F85547',
    },
    {
      title: 'Active Members',
      amount: '547',
      increase: '+ 23 from last month',
      Icon: ActiveMembers,
      color: '#0ED970',
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
        contentContainerStyle={{ gap: THEME.spacing.md, rowGap: 10 }}
        numColumns={2}
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
        columnWrapperStyle={{ gap: 10 }}
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
