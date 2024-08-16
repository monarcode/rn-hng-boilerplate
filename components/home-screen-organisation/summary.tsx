import { StyleSheet } from 'react-native';
import { View, Text } from '../shared';
import React from 'react';
import { THEME } from '~/constants/theme';
import SummaryCard from './summary-card';
import { FlatList } from 'react-native-gesture-handler';
import { SummaryProps } from './type';

const Summary = () => {
  const summary = [
    {
      title: 'Total Revenue',
      amount: '$45,000.00',
      increase: 20,
    },
    {
      title: 'Subscriptions',
      amount: '2350',
      increase: 150,
    },
  ];
  return (
    <View style={styles.container}>
      <View style={{ gap: THEME.spacing.xs }}>
        <Text size="3xl" weight="bold">
          Dashboard
        </Text>
        <Text size="xl" style={{ color: THEME.colors.neutral[300] }}>
          This Month's Summary
        </Text>
      </View>
      <FlatList
        data={summary}
        renderItem={({ item, index }) => <SummaryCard {...item} />}
        contentContainerStyle={{ gap: THEME.spacing.sm }}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default Summary;

const styles = StyleSheet.create({
  container: {
    width: '100%',
    gap: THEME.spacing.md,
  },
});