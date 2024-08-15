import { StyleSheet } from 'react-native';
import { View, Text } from '../shared';
import React from 'react';
import { THEME } from '~/constants/theme';
import { SummaryProps } from './type';
import Dollar from '../../assets/dollar.svg';
import { Dimensions } from 'react-native';

const SummaryCard = (summary: SummaryProps) => {
  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <Text size="lg" weight="bold" style={{ color: THEME.colors.neutral[400] }}>
          {summary.title}
        </Text>
        <Dollar color={THEME.colors.black} width={17} height={17}/>
      </View>
      <View style={{ gap: THEME.spacing.xs }}>
        <Text size="2xl" weight="bold" style={{ color: '#383f4e' }}>
          {summary.amount}
        </Text>
        <Text size="lg">+{summary.increase}% from last month</Text>
      </View>
    </View>
  );
};

export default SummaryCard;

const styles = StyleSheet.create({
  container: {
    borderColor: THEME.colors.borderLight,
    paddingHorizontal: THEME.spacing.gutter,
    paddingVertical: THEME.spacing.xl,
    borderRadius: 15,
    borderWidth: 1,
    gap: THEME.spacing.md,
  },
});
